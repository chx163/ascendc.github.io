import{_ as i,o as e,a,b as n}from"./app.C41L12d5.js";const p=JSON.parse('{"title":"","description":"","frontmatter":{"breadcrumbs":[{"text":"Ascend C API","link":"/api/api_list"},{"text":"SIMD API","link":"/api/SIMD-API/SIMD-API"},{"text":"高阶API","link":"/api/SIMD-API/adv_api/adv_api"},{"text":"归一化操作","link":"/api/SIMD-API/adv_api/normalization/normalization"},{"text":"WelfordFinalize Tiling","link":"/api/SIMD-API/adv_api/normalization/WelfordFinalize-Tiling"}]},"headers":[],"relativePath":"api/SIMD-API/adv_api/normalization/WelfordFinalize-Tiling.md","filePath":"api/SIMD-API/adv_api/normalization/WelfordFinalize-Tiling.md","outlineHeaders":[{"level":2,"title":"功能说明","slug":"功能说明","link":"#功能说明"},{"level":2,"title":"函数原型","slug":"函数原型","link":"#函数原型"},{"level":2,"title":"参数说明","slug":"参数说明","link":"#参数说明"},{"level":2,"title":"返回值说明","slug":"返回值说明","link":"#返回值说明"},{"level":2,"title":"约束说明","slug":"约束说明","link":"#约束说明"},{"level":2,"title":"调用示例","slug":"调用示例","link":"#调用示例"}],"lastUpdated":1787050286000}'),l={name:"api/SIMD-API/adv_api/normalization/WelfordFinalize-Tiling.md"};function r(o,t,s,d,g,h){return e(),a("div",null,[...t[0]||(t[0]=[n(`<div><article class="markdown-body"><h1>WelfordFinalize Tiling</h1><h2 id="功能说明">功能说明<a class="header-anchor" href="#功能说明">​</a></h2><p>Ascend C提供WelfordFinalize Tiling API，方便用户获取WelfordFinalize kernel计算时所需的Tiling参数。</p><p>获取Tiling参数主要步骤如下：</p><p>具体为，通过<strong>GetWelfordFinalizeMaxMinTmpSize</strong>获取WelfordFinalize接口计算所需最大和最小临时空间大小。</p><p>kernel侧WelfordFinalize接口的计算需要开发者预留/申请临时空间，<strong>GetWelfordFinalizeMaxMinTmpSize</strong>用于在host侧获取预留/申请的最大最小临时空间大小，开发者基于此范围选择合适的空间大小作为Tiling参数传递到kernel侧使用。</p><ul><li>为保证功能正确，预留/申请的临时空间大小不能小于最小临时空间大小；</li><li>在最小临时空间-最大临时空间范围内，随着临时空间增大，kernel侧接口计算性能会有一定程度的优化提升。为了达到更好的性能，开发者可以根据实际的内存使用情况进行空间预留/申请。</li></ul><h2 id="函数原型">函数原型<a class="header-anchor" href="#函数原型">​</a></h2><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>void GetWelfordFinalizeMaxMinTmpSize(const AscendC::TensorShape&amp; srcShape, const uint32_t typeSize, const bool isReuseSource, uint32_t&amp; maxValue, uint32_t&amp; minValue)
</code></pre></div><h2 id="参数说明">参数说明<a class="header-anchor" href="#参数说明">​</a></h2><p><strong>表1</strong> GetWelfordFinalizeMaxMinTmpSize接口参数说明</p><table><thead><tr><th>参数名</th><th>输入/输出</th><th>描述</th></tr></thead><tbody><tr><td>srcShape</td><td>输入</td><td>输入inputMean/inputVariance的shape信息{abLength}，参数类型为<a href="../data_structures/TensorShape.html">AscendC::TensorShape</a>。</td></tr><tr><td>typeSize</td><td>输入</td><td>输入inputMean/inputVariance的数据类型大小，单位为字节。比如输入的数据类型为float，此处应传入4。</td></tr><tr><td>isReuseSource</td><td>输入</td><td>是否允许修改源操作数。该参数取值与<a href="WelfordFinalize.html">WelfordFinalize</a>接口一致。</td></tr><tr><td>maxValue</td><td>输出</td><td>WelfordFinalize接口能完成计算所需的最大临时空间大小，超出该值的空间不会被该接口使用。在最小临时空间-最大临时空间范围内，随着临时空间增大，kernel侧接口计算性能会有一定程度的优化提升。为了达到更好的性能，开发者可以根据实际的内存使用情况进行空间预留/申请。最大空间大小为0表示计算不需要临时空间。<br>maxValue仅作为参考值，有可能大于Unified Buffer（UB）剩余空间的大小，该场景下，开发者需要根据UB剩余空间的大小来选取合适的临时空间大小。</td></tr><tr><td>minValue</td><td>输出</td><td>WelfordFinalize接口能完成计算所需最小临时空间大小。为保证功能正确，接口计算时预留/申请的临时空间不能小于该数值。最小空间大小为0表示计算不需要临时空间。</td></tr></tbody></table><h2 id="返回值说明">返回值说明<a class="header-anchor" href="#返回值说明">​</a></h2><p>无</p><h2 id="约束说明">约束说明<a class="header-anchor" href="#约束说明">​</a></h2><p>无</p><h2 id="调用示例">调用示例<a class="header-anchor" href="#调用示例">​</a></h2><ol><li><p>将WelfordFinalizeTiling结构体参数增加至TilingData结构体，作为TilingData结构体的一个字段。</p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>BEGIN_TILING_DATA_DEF(WelfordFinalizeCustomTilingData) // 注册一个tiling的类，以tiling的名字作为入参
    TILING_DATA_FIELD_DEF(uint32_t, isCounts);             // 添加tiling字段
    TILING_DATA_FIELD_DEF(uint32_t, rnLength);
    TILING_DATA_FIELD_DEF(uint32_t, abLength);
    TILING_DATA_FIELD_DEF(uint32_t, rLength);
    TILING_DATA_FIELD_DEF(uint32_t, head);
    TILING_DATA_FIELD_DEF(uint32_t, headLength);
    TILING_DATA_FIELD_DEF(uint32_t, tail);
    TILING_DATA_FIELD_DEF(uint32_t, tailLength);
END_TILING_DATA_DEF;
REGISTER_TILING_DATA_CLASS(
    WelfordFinalizeCustom,
    WelfordFinalizeCustomTilingData) // 将WelfordFinalizeCustomTilingData结构体参数增加至TilingData结构体
</code></pre></div></li><li><p>Tiling实现函数中，首先调用<strong>GetWelfordFinalizeMaxMinTmpSize</strong>接口获取WelfordFinalize接口能完成计算所需最大/最小临时空间大小，根据该范围结合实际的内存使用情况设置合适的空间大小，然后根据输入shape、剩余的可供计算的空间大小等信息获取WelfordFinalize kernel侧接口所需tiling参数。</p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>namespace optiling {
static ge::graphStatus TilingFunc(gert::TilingContext* context)
{
    WelfordFinalizeCustomTilingData tiling;
    const gert::RuntimeAttrs* attrs = context-&gt;GetAttrs();
    const uint32_t isCounts = *(attrs-&gt;GetAttrPointer&lt;uint32_t&gt;(0));
    const uint32_t rnLength = *(attrs-&gt;GetAttrPointer&lt;uint32_t&gt;(1));
    const uint32_t abLength = *(attrs-&gt;GetAttrPointer&lt;uint32_t&gt;(2));
    const uint32_t rLength = *(attrs-&gt;GetAttrPointer&lt;uint32_t&gt;(3));
    const uint32_t head = *(attrs-&gt;GetAttrPointer&lt;uint32_t&gt;(4));
    const uint32_t headLength = *(attrs-&gt;GetAttrPointer&lt;uint32_t&gt;(5));
    const uint32_t tail = *(attrs-&gt;GetAttrPointer&lt;uint32_t&gt;(6));
    const uint32_t tailLength = *(attrs-&gt;GetAttrPointer&lt;uint32_t&gt;(7));

    std::vector&lt;int64_t&gt; srcDims = {abLength};
    AscendC::TensorShape srcShape(srcDims);

    // 本样例中仅作为样例说明，通过GetWelfordFinalizeMaxMinTmpSize获取最小值并传入，来保证功能正确，开发者可以根据需要传入合适的空间大小
    uint32_t maxTmpsize = 0;
    uint32_t minTmpsize = 0;
    AscendC::GetWelfordFinalizeMaxMinTmpSize(srcShape, 4, false, maxTmpsize, minTmpsize);

    // auto ascendcPlatform = platform_ascendc::PlatformAscendC(context-&gt;GetPlatformInfo());
    // AscendC::GetWelfordFinalizeMaxMinTmpSize(srcShape, 4, false, ascendcPlatform, maxTmpsize, minTmpsize);
    ... // 其他逻辑
    context-&gt;SetTilingKey(1);
    tiling.SaveToBuffer(context-&gt;GetRawTilingData()-&gt;GetData(), context-&gt;GetRawTilingData()-&gt;GetCapacity());
    context-&gt;GetRawTilingData()-&gt;SetDataSize(tiling.GetDataSize());
    size_t* currentWorkspace = context-&gt;GetWorkspaceSizes(1);
    currentWorkspace[0] = 0;
    return ge::GRAPH_SUCCESS;
}
} // namespace optiling
</code></pre></div></li><li><p>对应的kernel侧通过在核函数（Kernel）中调用GET_TILING_DATA获取TilingData，继而将TilingData中的WelfordFinalize Tiling信息传入WelfordFinalize接口参与计算。完整的kernel侧样例请参考<a href="WelfordFinalize.html">WelfordFinalize</a>。</p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>extern &quot;C&quot; __global__ __aicore__ void welford_finalize_custom(
    GM_ADDR inputX_gm, GM_ADDR mean_gm, GM_ADDR var_gm, GM_ADDR outputMean_gm, GM_ADDR outputVariance_gm,
    GM_ADDR workspace, GM_ADDR tiling)
{
    GET_TILING_DATA(tilingData, tiling);
    if (TILING_KEY_IS(1)) {
        if (tilingData.isCounts) {
            KernelWelfordFinalize&lt;int32_t, true&gt; op;
            op.Init(
                inputX_gm, mean_gm, var_gm, outputMean_gm, outputVariance_gm, tilingData.rnLength, tilingData.abLength,
                tilingData.rLength, tilingData.head, tilingData.headLength, tilingData.tail, tilingData.tailLength);
            op.Process();
        } else {
            KernelWelfordFinalize&lt;int32_t, false&gt; op;
            op.Init(
                inputX_gm, mean_gm, var_gm, outputMean_gm, outputVariance_gm, tilingData.rnLength, tilingData.abLength,
                tilingData.rLength, tilingData.head, tilingData.headLength, tilingData.tail, tilingData.tailLength);
            op.Process();
        }
    }
}
</code></pre></div></li></ol></article></div>`,1)])])}const _=i(l,[["render",r]]);export{p as __pageData,_ as default};
