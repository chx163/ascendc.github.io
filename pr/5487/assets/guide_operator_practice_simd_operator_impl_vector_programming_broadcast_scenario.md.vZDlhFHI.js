import{_ as e,o as a,a as i,b as n}from"./app.DKoEZOcr.js";const o="/ascendc.github.io/pr/5487/assets/axis_coef.BNFZ8E_h.png",_=JSON.parse('{"title":"","description":"","frontmatter":{"breadcrumbs":[{"text":"Ascend C算子开发指南","link":"/guide/getting_started/ascend_c_overview_and_learning_path"},{"text":"算子实践参考","link":"/guide/operator_practice/document_structure"},{"text":"SIMD算子实现","link":"/guide/operator_practice/simd_operator_impl/simd_operator_impl"},{"text":"矢量编程","link":"/guide/operator_practice/simd_operator_impl/vector_programming/vector_programming"},{"text":"Broadcast场景","link":"/guide/operator_practice/simd_operator_impl/vector_programming/broadcast_scenario"}]},"headers":[],"relativePath":"guide/operator_practice/simd_operator_impl/vector_programming/broadcast_scenario.md","filePath":"guide/operator_practice/simd_operator_impl/vector_programming/broadcast_scenario.md","outlineHeaders":[{"level":2,"title":"Tiling实现","slug":"Tiling实现","link":"#Tiling实现"},{"level":2,"title":"算子类实现","slug":"算子类实现","link":"#算子类实现"}],"lastUpdated":1787050286000}'),s={name:"guide/operator_practice/simd_operator_impl/vector_programming/broadcast_scenario.md"};function l(r,t,c,h,g,d){return a(),i("div",null,[...t[0]||(t[0]=[n('<div><article class="markdown-body"><h1>Broadcast场景<span id="ZH-CN_TOPIC_0000002500548092"></span></h1><p>在某些场景下，可能会存在两个输入shape不相同的情况。由于<a href="../../../../api/SIMD-API/basic_api/memory_vector_compute/basic_arithmetic/Add.html">Add</a>接口只支持对shape相同的输入进行计算，因此需要先对输入进行shape变换，再进行Add计算。本节将对满足Broadcast条件的输入在算子实现中的Broadcast处理进行介绍，其他场景可以参考本章节中提供的思路。</p><div class="callout callout-note"><p class="callout-title"><svg class="callout-icon" viewBox="0 0 16 16" width="16" height="16"><path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8Zm8-6.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13ZM6.5 7.75A.75.75 0 0 1 7.25 7h1a.75.75 0 0 1 .75.75v2.75h.25a.75.75 0 0 1 0 1.5h-2a.75.75 0 0 1 0-1.5h.25v-2h-.25a.75.75 0 0 1-.75-.75ZM8 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"></path></svg>注意</p><p>Broadcast机制通过扩展较小维度的数据，使得不同shape的输入能够进行运算，从而避免了显式的复制操作，提高了计算效率。数据进行Broadcast需满足：两个输入的维度个数相同，并且仅在某一个维度上的长度不同，某一个输入在此维度的长度为1。比如：shape为(32, 8)和 (32, 1)的两个输入可以进行Broadcast，因为它们都是二维，且第一个维度大小相等，而不相等的维度中第二个输入的维度为1，满足条件。</p></div><p>本节中将使用<a href="../../../../api/SIMD-API/adv_api/tensor_transform/Broadcast.html">Broadcast</a>接口，因此输入需满足该API相关约束。同时，由于硬件限制，该API的输入地址需满足32字节对齐。本节以输入维度为2、第二个轴（axis = 1）需要Broadcast为例进行说明。完整的样例代码请参见<a href="https://gitcode.com/cann/asc-devkit/tree/master/examples/01_simd_cpp_api/04_advanced_api/08_transpose/add_broadcast">输入Broadcast的Add算子样例</a>。</p><h2 id="Tiling实现">Tiling实现<span id="zh-cn_topic_0000002201157446_section598962019342"></span><a class="header-anchor" href="#Tiling实现">​</a></h2><p>与输入shape相同的场景相比，在Tiling结构体中增加相应的成员变量，表示是否需要对输入进行Broadcast、需要对哪个维度进行Broadcast、Broadcast的轴需要扩充的倍数。因此新增四个Tiling结构体成员：</p><ul><li>xLen和yLen：表示两个输入的数据长度。</li><li>axis：表示对输入的哪个维度进行Broadcast。</li><li>coef：表示Broadcast的输入需要扩维的倍数。例如，x shape为(m, 1)，y shape为(m, n)，则coef = n。如下图所示，图中相同颜色部分为单次计算的数据块。</li></ul><p><strong>图1</strong> axis=1时coef示意图<span id="zh-cn_topic_0000002201157446_fig202632320133"></span><br><img src="'+o+`" alt title="axis-1时coef示意图"></p><p>Tiling结构体定义代码如下所示：</p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>struct AddCustomTilingData {
    uint32_t xLen;
    uint32_t yLen;
    uint32_t coef;
    uint32_t axis;
    ...
};
</code></pre></div><p>设需要进行Broadcast的输入长度为shorterAxisLen；不需要进行Broadcast的输入长度为totalLength。</p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>constexpr uint32_t BLOCK_SIZE = 32;
...  // 读入数据
uint32_t totalLength = (xLen &gt; yLen)? xLen : yLen;
uint32_t shorterAxisLen = (xLen &lt; yLen)? xLen : yLen;
</code></pre></div><p>使用shorterAxisLen进行分核计算，并使用分核后的长度与coef相乘作为totalLength的分核长度。</p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>constexpr uint32_t BLOCK_SIZE = 32;
uint32_t alignCoef = (tiling-&gt;axis == 0U) ? shorterAxisLen : totalLength / shorterAxisLen;
uint32_t divDimCoef = (tiling-&gt;axis == 0U) ? totalLength / shorterAxisLen : shorterAxisLen;
if (divDimCoef % blockDim == 0U) {
    uint32_t blockLength = divDimCoef / blockDim * alignCoef;    
    ...
} else {
    uint32_t formerNum = (divDimCoef / BUFFER_NUM) % blockDim;
    uint32_t tailNum = blockDim - formerNum;

    uint32_t formerLength = ((divDimCoef / BUFFER_NUM) / blockDim + 1U) * BUFFER_NUM * alignCoef;
    uint32_t tailLength = ((divDimCoef / BUFFER_NUM) / blockDim) * BUFFER_NUM * alignCoef;
    ....
}
</code></pre></div><p>进行核内数据切分时，需要计算Unified Buffer（UB）数据块的数量向coef和BUFFER_NUM对齐之后的数量ubBlockAligned。</p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>uint32_t ubBlockAligned =
        (MAX_AVAILABLE_UB_BLOCK_NUM * alignNum / (alignCoef * BUFFER_NUM) * (alignCoef * BUFFER_NUM) == 0U) ?
            MAX_AVAILABLE_UB_BLOCK_NUM :
            MAX_AVAILABLE_UB_BLOCK_NUM * alignNum / (alignCoef * BUFFER_NUM) * (alignCoef * BUFFER_NUM);
...
tileNum = length / ubBlockAligned;
if (length % ubBlockAligned == 0U || tileNum == 0U) {
    if (tileNum == 0U) {
        tileNum = 1U;
    }
    if (length &lt; ubBlockAligned) {
        tileLength = length;
        lastTileLength = tileLength;
    } else {
        tileLength = ubBlockAligned;
        lastTileLength = tileLength;
    }
} else {
    tileNum++;
    tileLength = ubBlockNum;
    lastTileLength = (uint32_t)(length - (tileNum - 1) * tileLength);
}
</code></pre></div><h2 id="算子类实现">算子类实现<span id="zh-cn_topic_0000002201157446_section1017415713416"></span><a class="header-anchor" href="#算子类实现">​</a></h2><p>在核函数（Kernel）初始化阶段，根据Tiling结构体传入的参数确定对哪个输入进行Broadcast。由于针对输入的第二个轴（axis = 1）进行Broadcast，可以计算出，对于需要进行Broadcast的输入，每个核搬入数据长度为blockLength / coef。</p><p>初始化函数代码如下：</p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>__aicore__ inline void Init(__gm__ uint8_t* x, __gm__ uint8_t* y, __gm__ uint8_t* z, AddCustomTilingData tiling, AscendC::TPipe* pipeIn)
{
    pipe = pipeIn;
    __gm__ uint8_t* longerInputPtr;
    __gm__ uint8_t* shorterInputPtr;
    if (tiling.xLen &gt; tiling.yLen) {
        longerInputPtr = x;
        shorterInputPtr = y;
        this-&gt;shorterAxisLen = tiling.yLen;
    } else {
        longerInputPtr = y;
        shorterInputPtr = x;
        this-&gt;shorterAxisLen = tiling.xLen;
    }
    this-&gt;coef = tiling.coef;
    if (tiling.isEvenCore) {
        this-&gt;tileNum = tiling.tileNum;
        this-&gt;tileLength = tiling.tileLength / BUFFER_NUM;
        this-&gt;lastTileLength = tiling.lastTileLength;
        xGm.SetGlobalBuffer((__gm__ T*)longerInputPtr + tiling.blockLength * AscendC::GetBlockIdx(), tiling.blockLength);
        yGm.SetGlobalBuffer((__gm__ T*)shorterInputPtr, this-&gt;shorterAxisLen);
        zGm.SetGlobalBuffer((__gm__ T*)z + tiling.blockLength * AscendC::GetBlockIdx(), tiling.blockLength);
    } else {
        if (AscendC::GetBlockIdx() &lt; tiling.formerNum) {
            this-&gt;tileNum = tiling.formerTileNum;
            this-&gt;tileLength = tiling.formerTileLength / BUFFER_NUM;
            this-&gt;lastTileLength = tiling.formerLastTileLength;
            xGm.SetGlobalBuffer((__gm__ T*)longerInputPtr + tiling.formerLength * AscendC::GetBlockIdx(), tiling.formerLength);
            yGm.SetGlobalBuffer((__gm__ T*)shorterInputPtr, this-&gt;shorterAxisLen);
            zGm.SetGlobalBuffer((__gm__ T*)z + tiling.formerLength * AscendC::GetBlockIdx(), tiling.formerLength);
        } else {
            this-&gt;tileNum = tiling.tailTileNum;
            this-&gt;tileLength = tiling.tailTileLength / BUFFER_NUM;
            this-&gt;lastTileLength = tiling.tailLastTileLength;
            xGm.SetGlobalBuffer((__gm__ T*)longerInputPtr + tiling.formerLength * tiling.formerNum +
                tiling.tailLength * (AscendC::GetBlockIdx() - tiling.formerNum), tiling.tailLength);
            yGm.SetGlobalBuffer((__gm__ T*)shorterInputPtr, this-&gt;shorterAxisLen);
            zGm.SetGlobalBuffer((__gm__ T*)z + tiling.formerLength * tiling.formerNum +
                tiling.tailLength * (AscendC::GetBlockIdx() - tiling.formerNum), tiling.tailLength);
        }
    }
    pipe-&gt;InitBuffer(inQueueX, BUFFER_NUM, this-&gt;tileLength * sizeof(T));
    pipe-&gt;InitBuffer(inQueueY, BUFFER_NUM, this-&gt;coef * sizeof(T));
    pipe-&gt;InitBuffer(outQueueZ, BUFFER_NUM, this-&gt;tileLength * sizeof(T));
    pipe-&gt;InitBuffer(tmpBuf0, this-&gt;tileLength * sizeof(dataType));
    pipe-&gt;InitBuffer(tmpBuf1, this-&gt;tileLength * sizeof(dataType));
}
</code></pre></div><p>由于数据是向coef对齐的，在数据拷贝的过程中可能会出现地址不满足32字节对齐的场景，因此CopyIn函数中使用<a href="../../../../api/SIMD-API/basic_api/memory_vector_compute/data_move/DataCopyPad_GMToUB.html">DataCopyPad（GM -&gt; UB）</a>、CopyOut函数中使用<a href="../../../../api/SIMD-API/basic_api/memory_vector_compute/data_move/DataCopyPad_UBToGM.html">DataCopyPad（UB -&gt; GM）</a>进行数据拷贝。</p><p>CopyIn函数实现代码如下：</p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>__aicore__ inline void CopyIn(int32_t progress)
{
    AscendC::LocalTensor&lt;T&gt; xLocal = inQueueX.AllocTensor&lt;T&gt;();
    AscendC::LocalTensor&lt;T&gt; yLocal = inQueueY.AllocTensor&lt;T&gt;();
    AscendC::DataCopyExtParams copyParams = {1, (uint32_t)(this-&gt;tileLength * sizeof(T)), 0, 0, 0};
    AscendC::DataCopyPadExtParams&lt;T&gt; padParams = {false, 0, 0, 0};
    AscendC::DataCopyPad&lt;T&gt;(xLocal, xGm[progress * this-&gt;tileLength], copyParams, padParams);
    AscendC::DataCopyPad&lt;T&gt;(yLocal, yGm[(progress % BUFFER_NUM) * this-&gt;tileLength], copyParams,
                                        padParams);
    inQueueX.EnQue(xLocal);
    inQueueY.EnQue(yLocal);
}
</code></pre></div><p>CopyOut函数实现代码如下：</p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>__aicore__ inline void CopyOut(int32_t progress)
{
    AscendC::LocalTensor&lt;T&gt; zLocal = outQueueZ.DeQue&lt;T&gt;();
    AscendC::DataCopyExtParams copyParams = {1, (uint32_t)(this-&gt;tileLength * sizeof(T)), 0, 0, 0};
    AscendC::DataCopyPad&lt;T&gt;(zGm[progress * this-&gt;tileLength], zLocal, copyParams);
    outQueueZ.FreeTensor(zLocal);
}
</code></pre></div><p>在Compute函数中，调用Add接口前需要先对输入进行Broadcast。这里需要计算Broadcast前后的shape。基于前文提到的数据关系，可以计算得出Broadcast前后的shape分别为{tileLength / broadcastCoef, 1}和{tileLength / broadcastCoef, broadcastCoef}。在此基础上对输入进行Broadcast，并将计算结果存入临时空间中，然后进行Add计算。实现代码示例如下所示：</p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>__aicore__ inline void Compute(int32_t progress)
{
    AscendC::LocalTensor&lt;T&gt; xLocal = inQueueX.DeQue&lt;T&gt;();
    AscendC::LocalTensor&lt;T&gt; yLocal = inQueueY.DeQue&lt;T&gt;();
    AscendC::LocalTensor&lt;T&gt; zLocal = outQueueZ.AllocTensor&lt;T&gt;();
    AscendC::LocalTensor&lt;T&gt; broadcastTmpTensor = tmpBuf2.Get&lt;T&gt;();
    uint32_t dstShape[] = {this-&gt;tileLength / this-&gt;coef, this-&gt;coef};
    uint32_t srcShape[] = {this-&gt;tileLength / this-&gt;coef, 1};
    AscendC::Broadcast&lt;T, 2, 1&gt;(broadcastTmpTensor, yLocal, dstShape, srcShape);
    ...
}
</code></pre></div></article></div>`,1)])])}const u=e(s,[["render",l]]);export{_ as __pageData,u as default};
