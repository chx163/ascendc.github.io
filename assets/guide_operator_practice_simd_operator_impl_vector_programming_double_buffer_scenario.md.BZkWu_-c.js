import{_ as e,o as i,a as n,b as a}from"./app.C41L12d5.js";const l="/ascendc.github.io/assets/dbuf_split.DbMmyCJr.png",d=JSON.parse('{"title":"","description":"","frontmatter":{"breadcrumbs":[{"text":"Ascend C算子开发指南","link":"/guide/getting_started/ascend_c_overview_and_learning_path"},{"text":"算子实践参考","link":"/guide/operator_practice/document_structure"},{"text":"SIMD算子实现","link":"/guide/operator_practice/simd_operator_impl/simd_operator_impl"},{"text":"矢量编程","link":"/guide/operator_practice/simd_operator_impl/vector_programming/vector_programming"},{"text":"DoubleBuffer场景","link":"/guide/operator_practice/simd_operator_impl/vector_programming/double_buffer_scenario"}]},"headers":[],"relativePath":"guide/operator_practice/simd_operator_impl/vector_programming/double_buffer_scenario.md","filePath":"guide/operator_practice/simd_operator_impl/vector_programming/double_buffer_scenario.md","outlineHeaders":[{"level":2,"title":"Tiling实现","slug":"Tiling实现","link":"#Tiling实现"},{"level":2,"title":"算子类实现","slug":"算子类实现","link":"#算子类实现"}],"lastUpdated":1787050286000}'),o={name:"guide/operator_practice/simd_operator_impl/vector_programming/double_buffer_scenario.md"};function h(g,t,s,r,c,_){return i(),n("div",null,[...t[0]||(t[0]=[a('<div><article class="markdown-body"><h1>DoubleBuffer场景<span id="ZH-CN_TOPIC_0000002532228161"></span></h1><p>因存在算子中多次搬入搬出数据的场景，为充分利用硬件资源，实现多流水并行，引入<a href="../../../technical_appendix/concepts_and_terms/performance_optimization/double_buffer.html">DoubleBuffer</a>机制。<a href="../../../technical_appendix/concepts_and_terms/performance_optimization/double_buffer.html">DoubleBuffer</a>是通过将输入数据分成大小相等的两块，充分利用AI Core的硬件资源，实现数据搬入、计算、数据搬出的并行执行方式。下面以“核间不均分，核内不均分”的样例为例，介绍算子中DoubleBuffer的实现。</p><p><strong>图1</strong> DoubleBuffer数据切分示意图<span id="zh-cn_topic_0000002236197681_fig68713182104"></span><br><img src="'+l+`" alt title="DoubleBuffer数据切分示意图"></p><h2 id="Tiling实现">Tiling实现<span id="zh-cn_topic_0000002236197681_section1967484164119"></span><a class="header-anchor" href="#Tiling实现">​</a></h2><p>开启DoubleBuffer后，每一个数据块会分成大小相等的两块，因此，若要开启DoubleBuffer，要求数据总量应该能够均分。为了简化处理，将可用的Unified Buffer（UB）空间以32字节为粒度，分成n块dataBlock，如果n不是偶数，则减1，这样就可以保证一套代码兼容开启或不开启DoubleBuffer功能。对应步骤如下：</p><ol><li><p>判断数据总长度totalLength是否满足32字节对齐，如不满足，则计算totalLength向上32字节对齐后的长度totalLengthAligned。</p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>constexpr uint32_t BLOCK_SIZE = 32;
// 为方便计算，这里根据数据类型定义变量alignNum作为对齐数
uint32_t alignNum = BLOCK_SIZE / dataTypeSize;
// totalLength为数据总量
uint32_t totalLengthAligned = (totalLength % alignNum == 0)?
        totalLength : ((totalLength + alignNum - 1) / alignNum) * alignNum;
</code></pre></div></li><li><p>根据totalLengthAligned，计算每个核的计算数据长度blockLength，分核策略可参照<a href="multi_core_tiling/tail_core_split.html">尾核切分</a>。</p></li><li><p>计算其余Tiling参数。</p><p>对当前UB可用空间以32字节为粒度，进行切分，计算出数据块个数UB_BLOCK_NUM。根据是否开启DoubleBuffer计算出当前可用的最大数据块个数，记作MAX_AVAILABLE_UB_BLOCK_NUM。最后，以MAX_AVAILABLE_UB_BLOCK_NUM为粒度，对blockLength进行切分。为方便演示，如下代码直接给出UB_BLOCK_NUM，作为当前UB可用空间包含的block（32字节）数。</p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>constexpr uint32_t BUFFER_NUM = 2;
constexpr uint32_t UB_BLOCK_NUM = 21;  // UB最大可以使用的block数量
constexpr uint32_t MAX_AVAILABLE_UB_BLOCK_NUM = UB_BLOCK_NUM / BUFFER_NUM * BUFFER_NUM;

tileNum = blockLength / (alignNum * MAX_AVAILABLE_UB_BLOCK_NUM);
if (tileNum == 0) {
    // 单核需要计算的长度小于UB可用空间，按照仅有尾块处理
    tileLength = 0;
    lastTileLength = (blockLength + alignNum - 1) / alignNum * alignNum;
} else if ((blockLength / alignNum) % MAX_AVAILABLE_UB_BLOCK_NUM == 0) {
    // 单核的计算量能被当前可用UB空间均分，仅有主块，无尾块
    tileLength = MAX_AVAILABLE_UB_BLOCK_NUM * alignNum;
    lastTileLength = 0;
} else {
    // 同时有主块和尾块
    tileLength = MAX_AVAILABLE_UB_BLOCK_NUM * alignNum;
    lastTileLength = blockLength - tileNum * tileLength;
}
</code></pre></div></li></ol><h2 id="算子类实现">算子类实现<span id="zh-cn_topic_0000002236197681_section09641704120"></span><a class="header-anchor" href="#算子类实现">​</a></h2><p>不开启DoubleBuffer时，只需要对每个核上最后一个分块的起始地址做处理；开启DoubleBuffer后，需要处理的数据块长度变成原来的一半，所以需要对最后两个数据块的起始地址做处理。</p><p>开启DoubleBuffer，参考<a href="../../../../api/SIMD-API/basic_api/resource_management/TPipe/InitBuffer.html">InitBuffer接口函数原型</a>，将num参数配置成2，即BUFFER_NUM。</p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>this-&gt;initBufferLength = AscendC::Std::max(this-&gt;tileLength, this-&gt;lastTileLength);
pipe.InitBuffer(inQueueX, BUFFER_NUM, this-&gt;initBufferLength * sizeof(dataType));
pipe.InitBuffer(inQueueY, BUFFER_NUM, this-&gt;initBufferLength * sizeof(dataType));
pipe.InitBuffer(outQueueZ, BUFFER_NUM, this-&gt;initBufferLength * sizeof(dataType));
</code></pre></div><p>同时在计算核内每个数据块的长度时，考虑DoubleBuffer场景，需要将Buffer数量，即BUFFER_NUM=2带入计算。</p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>this-&gt;tileLength = tiling.tileLength / BUFFER_NUM;
</code></pre></div><p>由于无法保证尾块满足DoubleBuffer的条件，因此不对尾块进行切分。</p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>this-&gt;lastTileLength = tiling.lastTileLength;
</code></pre></div><p>Init函数实现代码如下：</p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>__aicore__ inline void Init(__gm__ uint8_t* x, __gm__ uint8_t* y, __gm__ uint8_t* z, AddCustomTilingData tiling)
{
    if (tiling.isEvenCore) {
        this-&gt;blockLength = tiling.blockLength;
        this-&gt;tileNum = tiling.tileNum;
        this-&gt;tileLength = tiling.tileLength / BUFFER_NUM;
        this-&gt;lastTileLength = tiling.lastTileLength;

        xGm.SetGlobalBuffer((__gm__ dataType *)x + this-&gt;blockLength * AscendC::GetBlockIdx(), this-&gt;blockLength);
        yGm.SetGlobalBuffer((__gm__ dataType *)y + this-&gt;blockLength * AscendC::GetBlockIdx(), this-&gt;blockLength);
        zGm.SetGlobalBuffer((__gm__ dataType *)z + this-&gt;blockLength * AscendC::GetBlockIdx(), this-&gt;blockLength);
    } else {
        if (AscendC::GetBlockIdx() &lt; tiling.formerNum) {
            this-&gt;tileNum = tiling.formerTileNum;
            this-&gt;tileLength = tiling.formerTileLength / BUFFER_NUM;
            this-&gt;lastTileLength = tiling.formerLastTileLength;

            xGm.SetGlobalBuffer((__gm__ dataType *)x + tiling.formerLength * AscendC::GetBlockIdx(), tiling.formerLength);
            yGm.SetGlobalBuffer((__gm__ dataType *)y + tiling.formerLength * AscendC::GetBlockIdx(), tiling.formerLength);
            zGm.SetGlobalBuffer((__gm__ dataType *)z + tiling.formerLength * AscendC::GetBlockIdx(), tiling.formerLength);
        } else {
            this-&gt;tileNum = tiling.tailTileNum;
            this-&gt;tileLength = tiling.tailTileLength / BUFFER_NUM;
            this-&gt;lastTileLength = tiling.tailLastTileLength;

            xGm.SetGlobalBuffer((__gm__ dataType *)x + tiling.formerLength * tiling.formerNum +
                tiling.tailLength * (AscendC::GetBlockIdx() - tiling.formerNum), tiling.tailLength);
            yGm.SetGlobalBuffer((__gm__ dataType *)y + tiling.formerLength * tiling.formerNum +
                tiling.tailLength * (AscendC::GetBlockIdx() - tiling.formerNum), tiling.tailLength);
            zGm.SetGlobalBuffer((__gm__ dataType *)z + tiling.formerLength * tiling.formerNum +
                tiling.tailLength * (AscendC::GetBlockIdx() - tiling.formerNum), tiling.tailLength);
        }
    }

    uint32_t initBufferLength = AscendC::Std::max(this-&gt;tileLength, this-&gt;lastTileLength);
    pipe.InitBuffer(inQueueX, BUFFER_NUM, initBufferLength * sizeof(dataType));
    pipe.InitBuffer(inQueueY, BUFFER_NUM, initBufferLength * sizeof(dataType));
    pipe.InitBuffer(outQueueZ, BUFFER_NUM, initBufferLength * sizeof(dataType));
}
</code></pre></div><p>由于开启DoubleBuffer后，切分后的主块数据块个数翻倍，在Process函数中，需要将BUFFER_NUM带入计算循环次数；尾块独立计算，不开启DoubleBuffer。后续主尾块在CopyIn、Compute、CopyOut阶段中的处理，与<a href="multi_core_tiling/tail_block_even_split.html">尾块均分</a>相同。</p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>__aicore__ inline void Process()
{
    // 主块进行DoubleBuffer计算，所以loopCount得乘以2
    uint32_t loopCount = this-&gt;tileNum * BUFFER_NUM;
    for (uint32_t i = 0; i &lt; loopCount; i++) {
        // CopyIn：DataCopy(xLocal, xGm[i * this-&gt;tileLength], this-&gt;tileLength);
        //         DataCopy(yLocal, yGm[i * this-&gt;tileLength], this-&gt;tileLength);
        // Compute：Add(zLocal, xLocal, yLocal, this-&gt;tileLength);;
        // CopyOut：DataCopy(zGm[i * this-&gt;tileLength], zLocal, this-&gt;tileLength);;
    }
    // 尾块进行计算, 不做DoubleBuffer操作
    if (this-&gt;lastTileLength &gt; 0U) {
        // CopyIn：DataCopy(xLocal, xGm[loopCount], this-&gt;lastTileLength);
        //         DataCopy(yLocal, yGm[loopCount], this-&gt;lastTileLength);
        // Compute：Add(zLocal, xLocal, yLocal, this-&gt;lastTileLength);;
        // CopyOut：DataCopy(zGm[loopCount], zLocal, this-&gt;lastTileLength);;
    }
}
</code></pre></div></article></div>`,1)])])}const u=e(o,[["render",h]]);export{d as __pageData,u as default};
