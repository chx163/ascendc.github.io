import{_ as a,o as e,a as i,b as n}from"./app.DKoEZOcr.js";const g=JSON.parse('{"title":"","description":"","frontmatter":{"breadcrumbs":[{"text":"Ascend C API","link":"/api/api_list"},{"text":"SIMD API","link":"/api/SIMD-API/SIMD-API"},{"text":"高阶API","link":"/api/SIMD-API/adv_api/adv_api"},{"text":"归一化操作","link":"/api/SIMD-API/adv_api/normalization/normalization"},{"text":"LayerNorm Tiling","link":"/api/SIMD-API/adv_api/normalization/LayerNorm-Tiling"}]},"headers":[],"relativePath":"api/SIMD-API/adv_api/normalization/LayerNorm-Tiling.md","filePath":"api/SIMD-API/adv_api/normalization/LayerNorm-Tiling.md","outlineHeaders":[{"level":2,"title":"功能说明","slug":"功能说明","link":"#功能说明"},{"level":2,"title":"函数原型","slug":"函数原型","link":"#函数原型"},{"level":2,"title":"参数说明","slug":"参数说明","link":"#参数说明"},{"level":2,"title":"返回值说明","slug":"返回值说明","link":"#返回值说明"},{"level":2,"title":"约束说明","slug":"约束说明","link":"#约束说明"},{"level":2,"title":"调用示例","slug":"调用示例","link":"#调用示例"}],"lastUpdated":1787050286000}'),l={name:"api/SIMD-API/adv_api/normalization/LayerNorm-Tiling.md"};function o(r,t,s,h,p,c){return e(),i("div",null,[...t[0]||(t[0]=[n(`<div><article class="markdown-body"><h1>LayerNorm Tiling</h1><h2 id="功能说明">功能说明<a class="header-anchor" href="#功能说明">​</a></h2><p>Ascend C提供一组LayerNorm Tiling API，方便用户获取LayerNorm kernel计算时所需的Tiling参数。</p><p>获取Tiling参数主要分为如下两步：</p><ol><li><p>先通过<strong>GetLayerNormMaxMinTmpSize</strong>获取LayerNorm接口计算所需最大和最小临时空间大小，用于合理分配计算空间。</p><p>kernel侧LayerNorm接口的计算需要开发者预留/申请临时空间，<strong>GetLayerNormMaxMinTmpSize</strong>用于在host侧获取预留/申请的最大最小临时空间大小，开发者基于此范围选择合适的空间大小作为Tiling参数传递到kernel侧使用。</p><ul><li>为保证功能正确，预留/申请的临时空间大小不能小于最小临时空间大小；</li><li>在最小临时空间-最大临时空间范围内，随着临时空间增大，kernel侧接口计算性能会有一定程度的优化提升。为了达到更好的性能，开发者可以根据实际的内存使用情况进行空间预留/申请。</li></ul></li><li><p>通过<strong>GetLayerNormNDTilingInfo</strong>获取LayerNorm kernel侧接口所需tiling参数，需要传入输入shape，剩余的可供LayerNorm接口计算的空间大小和计算的数据类型。</p><p>LayerNorm Tiling结构体的定义如下，开发者无需关注该Tiling结构的具体信息，只需要传递到kernel侧，传入LayerNorm高阶API接口，直接进行使用即可。</p><ul><li><p>输出归一化结果、均值和方差的LayerNorm接口所需的Tiling结构体</p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>struct LayerNormTiling {
    uint32_t bLength = 0;
    uint32_t sLength = 0;
    uint32_t hLength = 0;
    uint32_t originalHLength = 0;
    uint32_t inputXSize = 0;
    uint32_t meanVarSize = 0;
    uint32_t numberOfTmpBuf = 0;
    uint32_t meanTmpTensorPos = 0;
    uint32_t meanTmpTensorSize = 0;
    uint32_t varianceTmpTensorPos = 0;
    uint32_t varianceTmpTensorSize = 0;
    uint32_t tmpBufSize = 0;
    uint32_t oneTmpSize = 0;
    uint32_t firstTmpStartPos = 0;
    uint32_t secondTmpStartPos = 0;
    uint32_t thirdTmpStartPos = 0;
    uint32_t loopRound = 0;
    uint32_t inputRoundSize = 0;
    uint32_t inputTailSize = 0;
    uint32_t inputTailPos = 0;
    uint32_t meanVarRoundSize = 0;
    uint32_t meanVarTailSize = 0;
    uint32_t meanVarTailPos = 0;
    uint32_t bshCurLength = 0;
    uint32_t bsCurLength = 0;
    float lastDimValueBack = 0.0;
};
</code></pre></div></li><li><p>输出归一化结果、均值和标准差的倒数的LayerNorm接口所需的Tiling结构体</p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>struct LayerNormSeparateTiling {
    uint32_t aLength = 0;
    uint32_t rLength = 0;
    uint32_t halfAddRepeatTimes = 0;
    uint32_t rHeadLength = 0;
    float k2Rec = 0;
    float k2RRec = 0;
    uint32_t inputXSize = 0;
    uint32_t meanVarSize = 0;
    uint32_t numberOfTmpBuf = 0;
    uint32_t varianceTmpTensorPos = 0;
    uint32_t varianceTmpTensorSize = 0;
    uint32_t tmpBufSize = 0;
    uint32_t oneTmpSize = 0;
    uint32_t firstTmpStartPos = 0;
    uint32_t secondTmpStartPos = 0;
    uint32_t thirdTmpStartPos = 0;
    uint32_t loopRound = 0;
    uint32_t inputRoundSize = 0;
    uint32_t inputTailSize = 0;
    uint32_t inputTailPos = 0;
    uint32_t meanVarRoundSize = 0;
    uint32_t meanVarTailSize = 0;
    uint32_t meanVarTailPos = 0;
    uint32_t arCurLength = 0;
    uint32_t aCurLength = 0;
    float rValueBack = 0;
};
</code></pre></div></li></ul></li></ol><h2 id="函数原型">函数原型<a class="header-anchor" href="#函数原型">​</a></h2><div class="callout callout-note"><p class="callout-title"><svg class="callout-icon" viewBox="0 0 16 16" width="16" height="16"><path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8Zm8-6.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13ZM6.5 7.75A.75.75 0 0 1 7.25 7h1a.75.75 0 0 1 .75.75v2.75h.25a.75.75 0 0 1 0 1.5h-2a.75.75 0 0 1 0-1.5h.25v-2h-.25a.75.75 0 0 1-.75-.75ZM8 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"></path></svg>说明</p><p>GetLayerNormNDTillingInfo接口废弃，并将在后续版本移除，请不要使用该接口。请使用GetLayerNormNDTilingInfo接口。</p></div><ul><li><p>GetLayerNormMaxMinTmpSize接口</p><ul><li><p>输出归一化结果、均值和方差的LayerNorm接口所需的临时空间</p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>void GetLayerNormMaxMinTmpSize(const AscendC::TensorShape&amp; srcShape, const uint32_t typeSize, const bool isReuseSource, uint32_t&amp; maxValue, uint32_t&amp; minValue)
</code></pre></div></li><li><p>输出归一化结果、均值和标准差的倒数的LayerNorm接口所需的临时空间</p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>void GetLayerNormMaxMinTmpSize(const AscendC::TensorShape&amp; srcShape, const uint32_t typeSize, const bool isReuseSource, const bool isComputeRstd, const bool isOnlyOutput, uint32_t&amp; maxValue, uint32_t&amp; minValue)
</code></pre></div></li></ul></li><li><p>GetLayerNormNDTilingInfo/GetLayerNormNDTillingInfo接口</p><ul><li><p>输出归一化结果、均值和方差的LayerNorm接口所需的tiling参数</p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>void GetLayerNormNDTilingInfo(const AscendC::TensorShape&amp; srcShape, const uint32_t stackBufferSize, const uint32_t typeSize, const bool isReuseSource, optiling::LayerNormTiling&amp; tiling)
</code></pre></div><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>void GetLayerNormNDTilingInfo(const AscendC::TensorShape&amp; srcShape, const uint32_t stackBufferSize, const uint32_t typeSize, const bool isReuseSource, AscendC::tiling::LayerNormTiling&amp; tiling)
</code></pre></div></li><li><p>输出归一化结果、均值和方差的LayerNorm接口所需的tiling参数（不推荐使用）</p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>void GetLayerNormNDTillingInfo(const AscendC::TensorShape&amp; srcShape, const uint32_t stackBufferSize, const uint32_t typeSize, const bool isReuseSource, optiling::LayerNormTiling&amp; tilling)
</code></pre></div></li><li><p>输出归一化结果、均值和标准差的倒数的LayerNorm接口所需的tiling参数</p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>void GetLayerNormNDTilingInfo(const AscendC::TensorShape&amp; srcShape, const uint32_t stackBufferSize, const uint32_t typeSize, const bool isReuseSource, const bool isComputeRstd, optiling::LayerNormSeparateTiling&amp; tiling)
</code></pre></div><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>void GetLayerNormNDTilingInfo(const AscendC::TensorShape&amp; srcShape, const uint32_t stackBufferSize, const uint32_t typeSize, const bool isReuseSource, const bool isComputeRstd, AscendC::tiling::LayerNormSeparateTiling&amp; tiling)
</code></pre></div></li></ul></li></ul><h2 id="参数说明">参数说明<a class="header-anchor" href="#参数说明">​</a></h2><p><strong>表1</strong> GetLayerNormMaxMinTmpSize接口参数列表</p><table><thead><tr><th>接口</th><th>输入/输出</th><th>功能</th></tr></thead><tbody><tr><td>srcShape</td><td>输入</td><td>输出归一化结果、均值和方差的LayerNorm接口：<br>输入数据inputX的shape信息{B, S, storageHLength, originHLength}，参数类型为<a href="../data_structures/TensorShape.html">AscendC::TensorShape</a>，包括当前输入的inputX的shape信息，以及地址对齐前（如存在H轴补齐操作）的原有shape信息。<br>在API支持的场景下，storageHLength和originHLength保持一致。<br><br>输出归一化结果、均值和标准差的倒数的LayerNorm接口：<br>输入数据inputX的shape信息{A, R}，A轴长度可以在kernel接口中动态指定，但范围不能超过此参数中A的大小。</td></tr><tr><td>typeSize</td><td>输入</td><td>输入数据inputX的数据类型大小，单位为字节。比如输入的数据类型为half，此处应传入2。</td></tr><tr><td>isReuseSource</td><td>输入</td><td>是否复用源操作数的内存空间，与<a href="LayerNorm.html">LayerNorm</a>接口一致。</td></tr><tr><td>isComputeRstd</td><td>输入</td><td>是否计算标准差的倒数rstd。用于Tiling中区分选择的LayerNorm API。</td></tr><tr><td>isOnlyOutput</td><td>输入</td><td>是否只输出y，不输出均值mean与标准差的倒数rstd。当前该参数仅支持false，y、mean和rstd的结果全都输出。</td></tr><tr><td>maxValue</td><td>输出</td><td>输出LayerNorm接口所需的tiling信息（最大临时空间大小）。<br><br>LayerNorm接口能完成计算所需的最大临时空间大小，超出该值的空间不会被该接口使用。在最小临时空间-最大临时空间范围内，随着临时空间增大，kernel侧接口计算性能会有一定程度的优化提升。为了达到更好的性能，开发者可以根据实际的内存使用情况进行空间预留/申请。<br>maxValue仅作为参考值，有可能大于Unified Buffer（UB）剩余空间的大小，该场景下，开发者需要根据UB剩余空间的大小来选取合适的临时空间大小。</td></tr><tr><td>minValue</td><td>输出</td><td>输出LayerNorm接口所需的tiling信息（最小临时空间大小）。<br><br>LayerNorm接口能完成计算所需最小临时空间大小。为保证功能正确，接口计算时预留/申请的临时空间不能小于该数值。</td></tr></tbody></table><p><strong>表2</strong> GetLayerNormNDTilingInfo和GetLayerNormNDTillingInfo接口参数列表</p><table><thead><tr><th>参数名称</th><th>输入/输出</th><th>含义</th></tr></thead><tbody><tr><td>srcShape</td><td>输入</td><td>输出归一化结果、均值和方差的LayerNorm接口：<br>输入数据inputX的shape信息{B, S, storageHLength, originHLength}，参数类型为<a href="../data_structures/TensorShape.html">AscendC::TensorShape</a>，包括当前输入的inputX的shape信息，以及地址对齐前（如存在H轴补齐操作）的原有shape信息。<br><br>输出归一化结果、均值和标准差的倒数的LayerNorm接口：<br>输入数据inputX的shape信息{A, R}，A轴长度可以在kernel接口中动态指定，但范围不能超过此参数中A的大小。</td></tr><tr><td>stackBufferSize</td><td>输入</td><td>可供LayerNorm接口使用的空间大小，单位Byte。</td></tr><tr><td>typeSize</td><td>输入</td><td>输入的数据类型大小，单位为字节。比如输入的数据类型为half，此处应传入2。</td></tr><tr><td>isReuseSource</td><td>输入</td><td>是否可以复用inputX的内存空间。</td></tr><tr><td>isComputeRstd</td><td>输入</td><td>是否计算标准差的倒数rstd。用于Tiling中区分选择的LayerNorm API。</td></tr><tr><td>tilling</td><td>输出</td><td>输入数据的切分信息。</td></tr></tbody></table><h2 id="返回值说明">返回值说明<a class="header-anchor" href="#返回值说明">​</a></h2><p>无</p><h2 id="约束说明">约束说明<a class="header-anchor" href="#约束说明">​</a></h2><p>无</p><h2 id="调用示例">调用示例<a class="header-anchor" href="#调用示例">​</a></h2><p>如下样例介绍了使用输出方差的LayerNorm高阶API时，host侧获取Tiling参数的流程以及该参数如何在kernel侧使用。样例中输入Tensor的shape大小为[2, 16, 64]，输入的数据类型为half。</p><ol><li><p>将LayerNormTiling结构体参数增加至TilingData结构体，作为TilingData结构体的一个字段。</p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>BEGIN_TILING_DATA_DEF(TilingData)             // 注册一个tiling的类，以tiling的名字作为入参
    TILING_DATA_FIELD_DEF(uint32_t, totalLength); // 添加tiling字段，总计算数据量
    TILING_DATA_FIELD_DEF(uint32_t, tileNum);     // 添加tiling字段，每个核上总计算数据分块个数
    ...                                           // 添加其他tiling字段
    TILING_DATA_FIELD_DEF_STRUCT(
        LayerNormTiling, layernormTilingData); // 将LayerNormTiling结构体参数增加至TilingData结构体
END_TILING_DATA_DEF;
</code></pre></div></li><li><p>Tiling实现函数中，首先调用GetLayerNormMaxMinTmpSize接口获取LayerNorm接口能完成计算所需最大/最小临时空间大小，根据该范围结合实际的内存使用情况设置合适的空间大小，然后调用GetLayerNormNDTilingInfo接口根据输入shape、剩余的可供计算的空间大小等信息获取LayerNorm kernel侧接口所需tiling参数。</p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>namespace optiling {
const uint32_t NUM_BLOCKS = 8;
const uint32_t TILE_NUM = 8;
static ge::graphStatus TilingFunc(gert::TilingContext* context)
{
    TilingData tiling;
    uint32_t totalLength = context-&gt;GetInputTensor(0)-&gt;GetShapeSize();
    context-&gt;SetSimdNumBlocks(NUM_BLOCKS);
    tiling.set_totalLength(totalLength);
    tiling.set_tileNum(TILE_NUM);
    // 设置其他Tiling参数
    ...
    // {B, S, storageHLength, originHLength}
    std::vector&lt;int64_t&gt; shapeVec = {2, 16, 64, 64};
    AscendC::TensorShape srcShape(shapeVec);
    // 本样例中仅作为样例说明，通过GetLayerNormMaxMinTmpSize获取最小值并传入，来保证功能正确，开发者可以根据需要传入合适的空间大小
    uint32_t max;
    uint32_t min;
    AscendC::GetLayerNormMaxMinTmpSize(srcShape, sizeof(half), false, max, min);
    // 获取Layernorm Tiling参数
    AscendC::GetLayerNormNDTilingInfo(srcShape, min, sizeof(half), false, tiling.layernormTilingData);
    ... // 其他逻辑
    tiling.SaveToBuffer(context-&gt;GetRawTilingData()-&gt;GetData(), context-&gt;GetRawTilingData()-&gt;GetCapacity());
    context-&gt;GetRawTilingData()-&gt;SetDataSize(tiling.GetDataSize());
    context-&gt;SetTilingKey(1);
    return ge::GRAPH_SUCCESS;
}
} // namespace optiling
</code></pre></div></li><li><p>对应的kernel侧通过在核函数（Kernel）中调用GET_TILING_DATA获取TilingData，继而将TilingData中的LayerNormTiling信息传入LayerNorm接口参与计算。</p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>extern &quot;C&quot; __global__ __aicore__ void func_custom(GM_ADDR x, GM_ADDR y, GM_ADDR z, GM_ADDR workspace, GM_ADDR tiling)
{
    GET_TILING_DATA(tilingData, tiling);
    KernelFunc op;
    op.Init(x, y, z, tilingData.totalLength, tilingData.tileNum, tilingData.layernormTilingData);
    if (TILING_KEY_IS(1)) {
        op.Process();
    }
}
</code></pre></div></li></ol><p>如下样例介绍了使用输出标准差的倒数的LayerNorm高阶API时，host侧获取Tiling参数的流程以及该参数如何在kernel侧使用。样例中输入Tensor的shape大小为[2, 64]，输入的数据类型为half。</p><ol><li><p>将LayerNormTiling结构体参数增加至TilingData结构体，作为TilingData结构体的一个字段。</p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>BEGIN_TILING_DATA_DEF(TilingData)                    // 注册一个tiling的类，以tiling的名字作为入参
    TILING_DATA_FIELD_DEF(uint32_t, aLength);            // 添加tiling字段，a轴长度
    TILING_DATA_FIELD_DEF(uint32_t, rLengthWithPadding); // 添加tiling字段，r轴对齐32B后的长度
    ...                                                  // 添加其他tiling字段
    TILING_DATA_FIELD_DEF_STRUCT(
        LayerNormSeparateTiling, layernormTilingData); // 将LayerNormSeparateTiling结构体参数增加至TilingData结构体
END_TILING_DATA_DEF;
</code></pre></div></li><li><p>Tiling实现函数中，首先调用GetLayerNormMaxMinTmpSize接口获取LayerNorm接口能完成计算所需最大/最小临时空间大小，根据该范围结合实际的内存使用情况设置合适的空间大小，然后调用GetLayerNormNDTilingInfo接口根据输入shape、剩余的可供计算的空间大小等信息获取LayerNorm kernel侧接口所需tiling参数。</p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>namespace optiling {
const uint32_t NUM_BLOCKS = 1;
const uint32_t TILE_NUM = 8;
static ge::graphStatus TilingFunc(gert::TilingContext* context)
{
    TilingData tiling;
    uint32_t totalLength = context-&gt;GetInputTensor(0)-&gt;GetShapeSize();
    context-&gt;SetSimdNumBlocks(NUM_BLOCKS);
    tiling.set_totalLength(totalLength);
    tiling.set_tileNum(TILE_NUM);
    // 设置其他Tiling参数
    ...
    // {A, R}
    std::vector&lt;int64_t&gt; shapeVec = {2, 64};
    AscendC::TensorShape srcShape(shapeVec);
    // 本样例中仅作为样例说明，通过GetLayerNormMaxMinTmpSize获取最小值并传入，来保证功能正确，开发者可以根据需要传入合适的空间大小
    uint32_t max;
    uint32_t min;
    AscendC::GetLayerNormMaxMinTmpSize(srcShape, sizeof(half), false, true, false, max, min);
    // 获取Layernorm Tiling参数
    AscendC::GetLayerNormNDTilingInfo(srcShape, min, sizeof(half), false, true, tiling.layernormTilingData);
    // auto ascendcPlatform = platform_ascendc::PlatformAscendC(context-&gt;GetPlatformInfo());
    // AscendC::GetLayerNormMaxMinTmpSize(srcShape, sizeof(half), false, true, false, ascendcPlatform, max, min);
    // 获取Layernorm Tiling参数
    // AscendC::GetLayerNormNDTilingInfo(srcShape, min, sizeof(half), false, true, ascendcPlatform,
    // tiling.layernormTilingData);
    ... // 其他逻辑
    tiling.SaveToBuffer(context-&gt;GetRawTilingData()-&gt;GetData(), context-&gt;GetRawTilingData()-&gt;GetCapacity());
    context-&gt;GetRawTilingData()-&gt;SetDataSize(tiling.GetDataSize());
    context-&gt;SetTilingKey(1);
    return ge::GRAPH_SUCCESS;
}
} // namespace optiling
</code></pre></div></li><li><p>对应的kernel侧通过在核函数（Kernel）中调用GET_TILING_DATA获取TilingData，继而将TilingData中的LayerNormTiling信息传入LayerNorm接口参与计算。</p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>extern &quot;C&quot; __global__ __aicore__ void func_custom(
    GM_ADDR x, GM_ADDR gamma, GM_ADDR beta, GM_ADDR mean, GM_ADDR rstd, GM_ADDR y, GM_ADDR workspace, GM_ADDR tiling)
{
    GET_TILING_DATA(tilingData, tiling);
    float epsilon = tilingData.epsilon;
    AscendC::LayerNormPara para(tilingData.aLength, tilingData.rLengthWithPadding);
    KernelFunc op;
    op.Init(x, gamma, beta, mean, rstd, y, epsilon, para, tilingData.layernormTilingData);
    if (TILING_KEY_IS(1)) {
        op.Process();
    }
}
</code></pre></div></li></ol></article></div>`,1)])])}const m=a(l,[["render",o]]);export{g as __pageData,m as default};
