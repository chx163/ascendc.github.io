import{_ as a,o as i,a as e,b as n}from"./app.DKoEZOcr.js";const g=JSON.parse('{"title":"","description":"","frontmatter":{"breadcrumbs":[{"text":"Ascend C API","link":"/api/api_list"},{"text":"SIMD API","link":"/api/SIMD-API/SIMD-API"},{"text":"高阶API","link":"/api/SIMD-API/adv_api/adv_api"},{"text":"归一化操作","link":"/api/SIMD-API/adv_api/normalization/normalization"},{"text":"BatchNorm Tiling","link":"/api/SIMD-API/adv_api/normalization/BatchNorm-Tiling"}]},"headers":[],"relativePath":"api/SIMD-API/adv_api/normalization/BatchNorm-Tiling.md","filePath":"api/SIMD-API/adv_api/normalization/BatchNorm-Tiling.md","outlineHeaders":[{"level":2,"title":"功能说明","slug":"功能说明","link":"#功能说明"},{"level":2,"title":"函数原型","slug":"函数原型","link":"#函数原型"},{"level":2,"title":"参数说明","slug":"参数说明","link":"#参数说明"},{"level":2,"title":"返回值说明","slug":"返回值说明","link":"#返回值说明"},{"level":2,"title":"约束说明","slug":"约束说明","link":"#约束说明"},{"level":2,"title":"调用示例","slug":"调用示例","link":"#调用示例"}],"lastUpdated":1787050286000}'),l={name:"api/SIMD-API/adv_api/normalization/BatchNorm-Tiling.md"};function o(h,t,s,r,c,d){return i(),e("div",null,[...t[0]||(t[0]=[n(`<div><article class="markdown-body"><h1>BatchNorm Tiling</h1><h2 id="功能说明">功能说明<a class="header-anchor" href="#功能说明">​</a></h2><p>BatchNorm Tiling API用于获取BatchNorm kernel计算时所需的Tiling参数。获取Tiling参数主要分为如下两步：</p><ol><li><p>通过<strong>GetBatchNormMaxMinTmpSize</strong>获取BatchNorm接口计算所需最大和最小临时空间大小。</p><p>kernel侧BatchNorm接口的计算需要开发者预留/申请临时空间，<strong>GetBatchNormMaxMinTmpSize</strong>用于在host侧获取预留/申请的最大最小临时空间大小，开发者基于此范围选择合适的空间大小作为Tiling参数传递到kernel侧使用。</p><ul><li>为保证功能正确，预留/申请的临时空间大小不能小于最小临时空间大小；</li><li>在最小临时空间-最大临时空间范围内，随着临时空间增大，kernel侧接口计算性能会有一定程度的优化提升。为了达到更好的性能，开发者可以根据实际的内存使用情况进行空间预留/申请。</li></ul></li><li><p>通过<strong>GetBatchNormNDTilingInfo</strong>获取BatchNorm kernel侧接口所需tiling参数。</p><p>BatchNorm Tiling结构体的定义如下，开发者无需关注该tiling结构的具体信息，只需要传递到kernel侧，传入BatchNorm高阶API接口，直接进行使用即可。</p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>struct BatchNormTiling {
    uint32_t originalBLength = 0;
    uint32_t meanVarSize = 0;
    uint32_t meanTmpTensorPos = 0;
    uint32_t varianceTmpTensorPos = 0;
    uint32_t tmpBufSize = 0;
    uint32_t oneTmpSize = 0;
    uint32_t firstTmpStartPos = 0;
    uint32_t secondTmpStartPos = 0;
    uint32_t thirdTmpStartPos = 0;
    uint32_t loopRound = 0;
    uint32_t inputTailSize = 0;
    uint32_t inputTailPos = 0;
    uint32_t meanVarTailSize = 0;
    uint32_t meanVarTailPos = 0;
    uint32_t bshCurLength = 0;
    uint32_t shCurLength = 0;
    float firstDimValueBack = 0;
    uint32_t castHalfRepStride = 0;
    uint32_t shCurLengthBlockNum = 0;
    uint32_t castHalfOutRepStride = 0;
};
</code></pre></div></li></ol><h2 id="函数原型">函数原型<a class="header-anchor" href="#函数原型">​</a></h2><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>bool GetBatchNormMaxMinTmpSize(const AscendC::TensorShape&amp; srcShape, const AscendC::TensorShape&amp; originSrcShape, const uint32_t typeSize, const bool isReuseSource, uint32_t&amp; maxValue,uint32_t&amp; minValue, const bool isBasicBlock = false)
</code></pre></div><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>bool GetBatchNormNDTilingInfo(const AscendC::TensorShape&amp; srcShape, const AscendC::TensorShape&amp; originSrcShape, const uint32_t stackBufferByteSize, const uint32_t typeSize, const bool isReuseSource, optiling::BatchNormTiling&amp; tilling, const bool isBasicBlock = false)
</code></pre></div><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>bool GetBatchNormNDTilingInfo(const AscendC::TensorShape&amp; srcShape, const AscendC::TensorShape&amp; originSrcShape, const uint32_t stackBufferByteSize, const uint32_t typeSize, const bool isReuseSource, AscendC::tiling::BatchNormTiling&amp; tilling, const bool isBasicBlock = false)
</code></pre></div><h2 id="参数说明">参数说明<a class="header-anchor" href="#参数说明">​</a></h2><p><strong>表1</strong> GetBatchNormMaxMinTmpSize接口参数说明</p><table><thead><tr><th>参数名</th><th>输入/输出</th><th>描述</th></tr></thead><tbody><tr><td>srcShape</td><td>输入</td><td>输入数据inputX的shape信息[B, S, H]，参数类型为<a href="../data_structures/TensorShape.html">AscendC::TensorShape</a>，S*H需要32B对齐。</td></tr><tr><td>originSrcShape</td><td>输入</td><td>输入数据inputX的originshape信息[originB, originS, originH]，参数类型为<a href="../data_structures/TensorShape.html">AscendC::TensorShape</a>。</td></tr><tr><td>typeSize</td><td>输入</td><td>输入的数据类型大小，单位为字节。比如输入的数据类型为half，此处应传入2。</td></tr><tr><td>isReuseSource</td><td>输入</td><td>中间变量是否能够复用输入内存。该参数预留，传入默认值false即可。</td></tr><tr><td>maxValue</td><td>输出</td><td>BatchNorm接口能完成计算所需的最大临时空间大小，超出max的空间不会被该接口使用。在min-max范围内，预留/申请空间越大，接口计算性能越好。为了达到更好的性能，开发者可以根据实际的内存使用情况进行空间预留/申请。maxValue为0表示计算不需要临时空间。<br>maxValue仅作为参考值，有可能大于Unified Buffer（UB）剩余空间的大小，该场景下，开发者需要根据UB剩余空间的大小来选取合适的临时空间大小。</td></tr><tr><td>minValue</td><td>输出</td><td>BatchNorm接口能完成计算所需最小临时空间大小。为保证功能正确，接口计算时预留/申请的临时空间不能小于min的数值。最小空间为0表示计算不需要临时空间。</td></tr><tr><td>isBasicBlock</td><td>输入</td><td>是否开启基本块，与BatchNorm接口一致。</td></tr></tbody></table><p><strong>表2</strong> GetBatchNormNDTilingInfo接口参数列表：</p><table><thead><tr><th>参数名称</th><th>输入/输出</th><th>含义</th></tr></thead><tbody><tr><td>srcShape</td><td>输入</td><td>输入数据inputX的shape信息[B, S, H]，参数类型为<a href="../data_structures/TensorShape.html">AscendC::TensorShape</a>，S*H需要32B对齐。</td></tr><tr><td>originSrcShape</td><td>输入</td><td>输入数据inputX的originshape信息[originB, originS, originH]，参数类型为<a href="../data_structures/TensorShape.html">AscendC::TensorShape</a>。</td></tr><tr><td>stackBufferByteSize</td><td>输入</td><td>可供BatchNorm接口使用的空间大小，单位Byte。</td></tr><tr><td>typeSize</td><td>输入</td><td>输入数据类型的字节大小。</td></tr><tr><td>isReuseSource</td><td>输入</td><td>中间变量是否能够复用输入内存。该参数预留，传入默认值false即可。</td></tr><tr><td>tilling</td><td>输出</td><td>输入数据的切分信息。</td></tr><tr><td>isBasicBlock</td><td>输入</td><td>是否开启基本块，与BatchNorm接口一致。</td></tr></tbody></table><h2 id="返回值说明">返回值说明<a class="header-anchor" href="#返回值说明">​</a></h2><ul><li>GetBatchNormMaxMinTmpSize返回值为true/false，true表示成功拿到BatchNorm接口内部计算需要的最大和最小临时空间大小；false表示获取失败。</li><li>GetBatchNormNDTilingInfo返回类型为true/false，true表示成功拿到BatchNorm的Tiling各项参数值；false表示获取失败。</li></ul><h2 id="约束说明">约束说明<a class="header-anchor" href="#约束说明">​</a></h2><p>无</p><h2 id="调用示例">调用示例<a class="header-anchor" href="#调用示例">​</a></h2><p>如下样例介绍了host侧获取Tiling参数的流程以及该参数如何在kernel侧使用。样例中输入Tensor的shape大小为[16，16，16]，输入的数据类型为half。</p><ol><li><p>将BatchNormTiling结构体参数增加至TilingData结构体，作为TilingData结构体的一个字段。</p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>BEGIN_TILING_DATA_DEF(TilingData)                 // 注册一个tiling的类，以tiling的名字作为入参
    TILING_DATA_FIELD_DEF(uint32_t, tileNum);         // 添加tiling字段，每个核上总计算数据分块个数
    TILING_DATA_FIELD_DEF(uint32_t, bLength);         // 添加tiling字段，输入shape的b维度长度
    TILING_DATA_FIELD_DEF(uint32_t, sLength);         // 添加tiling字段，输入shape的s维度长度
    TILING_DATA_FIELD_DEF(uint32_t, hLength);         // 添加tiling字段，输入shape的h维度长度
    TILING_DATA_FIELD_DEF(uint32_t, originalBLength); // 添加tiling字段，输入shape原始b维度长度
    ...                                               // 添加其他tiling字段
    TILING_DATA_FIELD_DEF_STRUCT(
        BatchNormTiling, batchNormTilingData); // 将BatchNormTiling结构体参数增加至TilingData结构体
END_TILING_DATA_DEF;
</code></pre></div></li><li><p>Tiling实现函数中，首先调用<strong>GetBatchNormMaxMinTmpSize</strong>接口获取BatchNorm接口能完成计算所需最大/最小临时空间大小，根据该范围结合实际的内存使用情况设置合适的空间大小，然后根据输入shape、剩余的可供计算的空间大小等信息获取BatchNorm kernel侧接口所需tiling参数。</p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>namespace optiling {
const uint32_t NUM_BLOCKS = 8;
const uint32_t TILE_NUM = 8;
static ge::graphStatus TilingFunc(gert::TilingContext* context)
{
    TilingData tiling;
    uint32_t totalLength = context-&gt;GetInputTensor(0)-&gt;GetShapeSize();
    context-&gt;SetSimdNumBlocks(NUM_BLOCKS);
    tiling.set_tileNum(TILE_NUM);
    // 设置其他Tiling参数
    ...
    std::vector&lt;int64_t&gt; shapeVec = {16, 16, 16};   //{b,s,h}
    std::vector&lt;int64_t&gt; originShapeVec = {15, 16, 16}; //{originB,originS,originH}
    AscendC::TensorShape srcShape(shapeVec);
    AscendC::TensorShape originSrcShape(originShapeVec);
    uint32_t minSize = 0;
    uint32_t maxSize = 0;
    // 本样例中仅作为样例说明，通过GetBatchNormMaxMinTmpSize获取最小值并传入，来保证功能正确，开发者可以根据需要传入合适的空间大小
    AscendC::GetBatchNormMaxMinTmpSize(srcShape, originSrcShape, sizeof(half), false, maxSize, minSize, false);
    // 获取BatchNorm Tiling参数
    AscendC::GetBatchNormNDTilingInfo(
        srcShape, originSrcShape, minSize, sizeof(half), false, tiling.batchNormTilingData, false);
    ... // 其他逻辑
    tiling.SaveToBuffer(context-&gt;GetRawTilingData()-&gt;GetData(), context-&gt;GetRawTilingData()-&gt;GetCapacity());
    context-&gt;GetRawTilingData()-&gt;SetDataSize(tiling.GetDataSize());
    context-&gt;SetTilingKey(1);
    return ge::GRAPH_SUCCESS;
}
} // namespace optiling
</code></pre></div></li><li><p>对应的kernel侧通过在核函数（Kernel）中调用GET_TILING_DATA获取TilingData，继而将TilingData中的BatchNormTiling信息传入BatchNorm接口参与计算。完整的kernel侧样例请参考<a href="BatchNorm.html">BatchNorm</a>。</p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>extern &quot;C&quot; __global__ __aicore__ void func_custom(
    GM_ADDR inputX_gm, GM_ADDR gamm_gm, GM_ADDR beta_gm, GM_ADDR output_gm, GM_ADDR outputMean_gm,
    GM_ADDR outputVariance_gm, GM_ADDR tiling)
{
    GET_TILING_DATA(tilingData, tiling);
    KernelBatchnorm&lt;half, false, false&gt; op;
    op.Init(inputX_gm, gamm_gm, beta_gm, output_gm, outputMean_gm, outputVariance_gm, tilingData.batchNormTilingData);
    if (TILING_KEY_IS(1)) {
        op.Process();
    }
}
</code></pre></div></li></ol></article></div>`,1)])])}const m=a(l,[["render",o]]);export{g as __pageData,m as default};
