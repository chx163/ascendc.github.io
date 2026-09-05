import{_ as a,o as e,a as i,b as n}from"./app.C41L12d5.js";const m=JSON.parse('{"title":"","description":"","frontmatter":{"breadcrumbs":[{"text":"Ascend C API","link":"/api/api_list"},{"text":"SIMD API","link":"/api/SIMD-API/SIMD-API"},{"text":"高阶API","link":"/api/SIMD-API/adv_api/adv_api"},{"text":"归一化操作","link":"/api/SIMD-API/adv_api/normalization/normalization"},{"text":"Normalize Tiling","link":"/api/SIMD-API/adv_api/normalization/Normalize-Tiling"}]},"headers":[],"relativePath":"api/SIMD-API/adv_api/normalization/Normalize-Tiling.md","filePath":"api/SIMD-API/adv_api/normalization/Normalize-Tiling.md","outlineHeaders":[{"level":2,"title":"功能说明","slug":"功能说明","link":"#功能说明"},{"level":2,"title":"函数原型","slug":"函数原型","link":"#函数原型"},{"level":2,"title":"参数说明","slug":"参数说明","link":"#参数说明"},{"level":2,"title":"返回值说明","slug":"返回值说明","link":"#返回值说明"},{"level":2,"title":"约束说明","slug":"约束说明","link":"#约束说明"},{"level":2,"title":"调用示例","slug":"调用示例","link":"#调用示例"}],"lastUpdated":1787050286000}'),l={name:"api/SIMD-API/adv_api/normalization/Normalize-Tiling.md"};function r(o,t,s,p,d,h){return e(),i("div",null,[...t[0]||(t[0]=[n(`<div><article class="markdown-body"><h1>Normalize Tiling</h1><h2 id="功能说明">功能说明<a class="header-anchor" href="#功能说明">​</a></h2><p>Ascend C提供Normalize Tiling API，方便用户获取Normalize kernel计算时所需的Tiling参数。</p><p>具体为，通过GetNormalizeMaxMinTmpSize获取Normalize接口计算所需最大和最小临时空间大小。</p><p>kernel侧Normalize接口的计算需要开发者预留/申请临时空间，GetNormalizeMaxMinTmpSize用于在host侧获取预留/申请的最大最小临时空间大小，开发者基于此范围选择合适的空间大小作为Tiling参数传递到kernel侧使用。</p><ul><li>为保证功能正确，预留/申请的临时空间大小不能小于最小临时空间大小；</li><li>在最小临时空间-最大临时空间范围内，随着临时空间增大，kernel侧接口计算性能会有一定程度的优化提升。为了达到更好的性能，开发者可以根据实际的内存使用情况进行空间预留/申请。</li></ul><h2 id="函数原型">函数原型<a class="header-anchor" href="#函数原型">​</a></h2><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>void GetNormalizeMaxMinTmpSize(const AscendC::TensorShape&amp; srcShape, const uint32_t typeSizeU, const uint32_t typeSizeT, const bool isReuseSource, const bool isComputeRstd, const bool isOnlyOutput, uint32_t&amp; maxValue, uint32_t&amp; minValue)
</code></pre></div><h2 id="参数说明">参数说明<a class="header-anchor" href="#参数说明">​</a></h2><p><strong>表1</strong> GetNormalizeMaxMinTmpSize接口参数说明</p><table><thead><tr><th>参数名</th><th>输入/输出</th><th>描述</th></tr></thead><tbody><tr><td>srcShape</td><td>输入</td><td>Normalize输入数据inputX的shape信息{A, R}，参数类型为<a href="../data_structures/TensorShape.html">AscendC::TensorShape</a>。</td></tr><tr><td>typeSizeU</td><td>输入</td><td>输入数据gamma, beta的数据类型大小，单位为字节。比如输入的数据类型为float，此处应传入4。</td></tr><tr><td>typeSizeT</td><td>输入</td><td>输入数据inputX的数据类型大小，单位为字节。比如输入的数据类型为float，此处应传入4。</td></tr><tr><td>isReuseSource</td><td>输入</td><td>是否复用源操作数的内存空间，与<a href="Normalize.html">Normalize</a>接口一致。</td></tr><tr><td>isComputeRstd</td><td>输入</td><td>是否计算rstd。该参数的取值只支持true。</td></tr><tr><td>isOnlyOutput</td><td>输入</td><td>是否只输出y，不输出标准差的倒数rstd。当前该参数仅支持取值为false，表示y和rstd的结果全部输出。</td></tr><tr><td>maxValue</td><td>输出</td><td>输出Normalize接口所需的tiling信息（最大临时空间大小）。<br><br>Normalize接口能完成计算所需的最大临时空间大小，超出该值的空间不会被该接口使用。在最小临时空间-最大临时空间范围内，随着临时空间增大，kernel侧接口计算性能会有一定程度的优化提升。为了达到更好的性能，开发者可以根据实际的内存使用情况进行空间预留/申请。<br>maxValue仅作为参考值，有可能大于Unified Buffer（UB）剩余空间的大小，该场景下，开发者需要根据UB剩余空间的大小来选取合适的临时空间大小。</td></tr><tr><td>minValue</td><td>输出</td><td>输出Normalize接口所需的tiling信息（最小临时空间大小）。<br><br>Normalize接口能完成计算所需最小临时空间大小。为保证功能正确，接口计算时预留/申请的临时空间不能小于该数值。</td></tr></tbody></table><h2 id="返回值说明">返回值说明<a class="header-anchor" href="#返回值说明">​</a></h2><p>无</p><h2 id="约束说明">约束说明<a class="header-anchor" href="#约束说明">​</a></h2><p>无</p><h2 id="调用示例">调用示例<a class="header-anchor" href="#调用示例">​</a></h2><ol><li><p>将Normalize接口所需参数增加至TilingData结构体，作为TilingData结构体的一个字段。</p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>BEGIN_TILING_DATA_DEF(NormalizeCustomTilingData)
    TILING_DATA_FIELD_DEF(float, epsilon);
    TILING_DATA_FIELD_DEF(uint32_t, isNoBeta);
    TILING_DATA_FIELD_DEF(uint32_t, isNoGamma);
    TILING_DATA_FIELD_DEF(uint32_t, isOnlyOutput);
    TILING_DATA_FIELD_DEF(uint32_t, aLength);
    TILING_DATA_FIELD_DEF(uint32_t, rLength);
    TILING_DATA_FIELD_DEF(uint32_t, rLengthWithPadding);
    ... // 添加其他tiling字段
END_TILING_DATA_DEF;
</code></pre></div></li><li><p>Tiling实现函数中，首先调用<strong>GetNormalizeMaxMinTmpSize</strong>接口获取Normalize接口能完成计算所需最大/最小临时空间大小，根据该范围结合实际的内存使用情况设置合适的空间大小，然后根据输入shape、剩余的可供计算的空间大小等信息获取Normalize kernel侧接口所需tiling参数。</p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>namespace optiling {
static ge::graphStatus TilingFunc(gert::TilingContext* context)
{
    NormalizeCustomTilingData tiling;
    const gert::RuntimeAttrs* attrs = context-&gt;GetAttrs();
    const float epsilon = *(attrs-&gt;GetAttrPointer&lt;float&gt;(0));
    const uint32_t isNoBeta = *(attrs-&gt;GetAttrPointer&lt;uint32_t&gt;(1));
    const uint32_t isNoGamma = *(attrs-&gt;GetAttrPointer&lt;uint32_t&gt;(2));
    const uint32_t isOnlyOutput = *(attrs-&gt;GetAttrPointer&lt;uint32_t&gt;(3));
    const gert::StorageShape* x1_shape = context-&gt;GetInputShape(0);
    ... // 其他逻辑
    const gert::Shape shape = x1_shape-&gt;GetStorageShape();
    uint32_t aLength = shape.GetDim(0);
    uint32_t rLength = shape.GetDim(1);
    uint32_t rLengthWithPadding = (rLength + alignNum - 1) / alignNum * alignNum;
    std::vector&lt;int64_t&gt; srcDims = {aLength, rLength};
    AscendC::TensorShape srcShape(srcDims);

    uint32_t maxTmpsize = 0;
    uint32_t minTmpsize = 0;

    AscendC::GetNormalizeMaxMinTmpSize(
        srcShape, typeSizeU, typeSizeT, false, true, isOnlyOutput, maxTmpsize, minTmpsize);
    // auto ascendcPlatform = platform_ascendc::PlatformAscendC(context-&gt;GetPlatformInfo());
    // AscendC::GetNormalizeMaxMinTmpSize(srcShape, typeSizeU, typeSizeT, false, true, isOnlyOutput, ascendcPlatform,
    // maxTmpsize, minTmpsize);

    ... // 其他逻辑
    context-&gt;SetTilingKey(1);
    tiling.SaveToBuffer(context-&gt;GetRawTilingData()-&gt;GetData(), context-&gt;GetRawTilingData()-&gt;GetCapacity());
    context-&gt;GetRawTilingData()-&gt;SetDataSize(tiling.GetDataSize());
    size_t* currentWorkspace = context-&gt;GetWorkspaceSizes(1);
    currentWorkspace[0] = 0;
    return ge::GRAPH_SUCCESS;
}
} // namespace optiling
</code></pre></div></li><li><p>对应的kernel侧通过在核函数（Kernel）中调用GET_TILING_DATA获取TilingData，继而将TilingData中的Normalize Tiling信息传入Normalize接口参与计算。完整的kernel侧样例请参考<a href="Normalize.html">Normalize</a>。</p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>extern &quot;C&quot; __global__ __aicore__ void normalize_custom(
    GM_ADDR x, GM_ADDR mean, GM_ADDR variance, GM_ADDR gamma, GM_ADDR beta, GM_ADDR rstd, GM_ADDR y, GM_ADDR workspace,
    GM_ADDR tiling)
{
    GET_TILING_DATA(tilingData, tiling);
    float epsilon = tilingData.epsilon;
    NormalizePara para(tilingData.aLength, tilingData.rLength, tilingData.rLengthWithPadding);
    if (TILING_KEY_IS(1)) {
        if (!tilingData.isNoBeta &amp;&amp; !tilingData.isNoGamma) {
            KernelNormalize&lt;NLCFG_NORM&gt; op;
            op.Init(x, mean, variance, gamma, beta, rstd, y, epsilon, para);
            op.Process();
        } else if (!tilingData.isNoBeta &amp;&amp; tilingData.isNoGamma) {
            KernelNormalize&lt;NLCFG_NOGAMMA&gt; op;
            op.Init(x, mean, variance, gamma, beta, rstd, y, epsilon, para);
            op.Process();
        } else if (tilingData.isNoBeta &amp;&amp; !tilingData.isNoGamma) {
            KernelNormalize&lt;NLCFG_NOBETA&gt; op;
            op.Init(x, mean, variance, gamma, beta, rstd, y, epsilon, para);
            op.Process();
        } else if (tilingData.isNoBeta &amp;&amp; tilingData.isNoGamma) {
            KernelNormalize&lt;NLCFG_NOOPT&gt; op;
            op.Init(x, mean, variance, gamma, beta, rstd, y, epsilon, para);
            op.Process();
        }
    }
}
</code></pre></div></li></ol></article></div>`,1)])])}const g=a(l,[["render",r]]);export{m as __pageData,g as default};
