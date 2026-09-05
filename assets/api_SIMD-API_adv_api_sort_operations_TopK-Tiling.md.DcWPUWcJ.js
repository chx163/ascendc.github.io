import{_ as n,o as e,a as i,b as a}from"./app.C41L12d5.js";const _=JSON.parse('{"title":"","description":"","frontmatter":{"breadcrumbs":[{"text":"Ascend C API","link":"/api/api_list"},{"text":"SIMD API","link":"/api/SIMD-API/SIMD-API"},{"text":"高阶API","link":"/api/SIMD-API/adv_api/adv_api"},{"text":"排序操作","link":"/api/SIMD-API/adv_api/sort_operations/sort_operations"},{"text":"TopK Tiling","link":"/api/SIMD-API/adv_api/sort_operations/TopK-Tiling"}]},"headers":[],"relativePath":"api/SIMD-API/adv_api/sort_operations/TopK-Tiling.md","filePath":"api/SIMD-API/adv_api/sort_operations/TopK-Tiling.md","outlineHeaders":[{"level":2,"title":"功能说明","slug":"功能说明","link":"#功能说明"},{"level":2,"title":"函数原型","slug":"函数原型","link":"#函数原型"},{"level":2,"title":"参数说明","slug":"参数说明","link":"#参数说明"},{"level":2,"title":"返回值说明","slug":"返回值说明","link":"#返回值说明"},{"level":2,"title":"约束说明","slug":"约束说明","link":"#约束说明"},{"level":2,"title":"调用示例","slug":"调用示例","link":"#调用示例"}],"lastUpdated":1787050286000}'),o={name:"api/SIMD-API/adv_api/sort_operations/TopK-Tiling.md"};function s(l,t,d,r,c,p){return e(),i("div",null,[...t[0]||(t[0]=[a(`<div><article class="markdown-body"><h1>TopK Tiling</h1><h2 id="功能说明">功能说明<a class="header-anchor" href="#功能说明">​</a></h2><p>用于获取TopK Tiling参数。</p><p>Ascend C提供TopK Tiling API，方便用户获取TopK kernel计算时所需的Tiling参数。</p><p>获取Tiling参数主要分为如下两步：</p><ol><li><p>获取TopK接口计算所需最小和最大临时空间大小，注意该步骤不是必须的，只是作为一个参考，供合理分配计算空间。</p></li><li><p>获取TopK kernel侧接口所需tiling参数。</p><p>TopK Tiling结构体的定义如下，开发者无需关注该tiling结构的具体信息，只需要传递到kernel侧，传入TopK高阶API接口，直接进行使用即可。</p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>struct TopkTiling {
    int32_t tmpLocalSize = 0;
    int32_t allDataSize = 0;
    int32_t innerDataSize = 0;
    uint32_t sortRepeat = 0;
    int32_t mrgSortRepeat = 0;
    int32_t kAlignFourBytes = 0;
    int32_t kAlignTwoBytes = 0;
    int32_t maskOffset = 0;
    int32_t maskVreducev2FourBytes = 0;
    int32_t maskVreducev2TwoBytes = 0;
    int32_t mrgSortSrc1offset = 0;
    int32_t mrgSortSrc2offset = 0;
    int32_t mrgSortSrc3offset = 0;
    int32_t mrgSortTwoQueueSrc1Offset = 0;
    int32_t mrgFourQueueTailPara1 = 0;
    int32_t mrgFourQueueTailPara2 = 0;
    int32_t srcIndexOffset = 0;
    uint32_t copyUbToUbBlockCount = 0;
    int32_t topkMrgSrc1MaskSizeOffset = 0;
    int32_t topkNSmallSrcIndexOffset = 0;
    uint32_t vreduceValMask0 = 0;
    uint32_t vreduceValMask1 = 0;
    uint32_t vreduceIdxMask0 = 0;
    uint32_t vreduceIdxMask1 = 0;
    uint16_t vreducehalfValMask0 = 0;
    uint16_t vreducehalfValMask1 = 0;
    uint16_t vreducehalfValMask2 = 0;
    uint16_t vreducehalfValMask3 = 0;
    uint16_t vreducehalfValMask4 = 0;
    uint16_t vreducehalfValMask5 = 0;
    uint16_t vreducehalfValMask6 = 0;
    uint16_t vreducehalfValMask7 = 0;
};
</code></pre></div></li></ol><h2 id="函数原型">函数原型<a class="header-anchor" href="#函数原型">​</a></h2><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>bool GetTopKMaxMinTmpSize(const platform_ascendc::PlatformAscendC&amp; ascendcPlatform, const int32_t inner, const int32_t outter, const bool isReuseSource, const bool isInitIndex, enum TopKMode mode, const bool isLargest, const uint32_t dataTypeSize, uint32_t&amp; maxValue, uint32_t&amp; minValue)
</code></pre></div><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>bool GetTopKMaxMinTmpSize(const int32_t inner, const int32_t outter, const int32_t k, const bool isReuseSource, const bool isInitIndex, enum TopKMode mode, const bool isLargest, AscendC::TensorDataType dataType, const TopKConfig&amp; config, uint32_t&amp; maxValue, uint32_t&amp; minValue)
</code></pre></div><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>bool TopKTilingFunc(const platform_ascendc::PlatformAscendC&amp; ascendcPlatform, const int32_t inner, const int32_t outter, const int32_t k, const uint32_t dataTypeSize, const bool isInitIndex, enum TopKMode mode, const bool isLargest, optiling::TopkTiling&amp; topKTiling)
</code></pre></div><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>bool TopKTilingFunc(const platform_ascendc::PlatformAscendC&amp; ascendcPlatform, const int32_t inner, const int32_t outter, const int32_t k, const uint32_t dataTypeSize, const bool isInitIndex, enum TopKMode mode, const bool isLargest, AscendC::tiling::TopkTiling&amp; topKTiling)
</code></pre></div><h2 id="参数说明">参数说明<a class="header-anchor" href="#参数说明">​</a></h2><p><strong>表1</strong> GetTopKMaxMinTmpSize接口参数列表</p><table><thead><tr><th>接口</th><th>输入/输出</th><th>功能</th></tr></thead><tbody><tr><td>ascendcPlatform</td><td>输入</td><td>传入硬件平台的信息，PlatformAscendC定义请参见<a href="../../../Utils-API/platform_info/PlatformAscendC/constructor_and_destructor.html">构造及析构函数</a>。</td></tr><tr><td>inner</td><td>输入</td><td>表示TopK接口输入srcLocal的内轴长度，该参数的取值为32的整数倍。</td></tr><tr><td>outter</td><td>输入</td><td>表示TopK接口输入srcLocal的外轴长度。</td></tr><tr><td>k</td><td>输入</td><td>获取前k个最大值或最小值及其对应的索引。</td></tr><tr><td>isReuseSource</td><td>输入</td><td>中间变量是否能够复用输入内存。与kernel侧接口的isReuseSrc保持一致。</td></tr><tr><td>isInitIndex</td><td>输入</td><td>是否传入输入数据对应的索引，与kernel侧接口一致。</td></tr><tr><td>mode</td><td>输入</td><td>选择TopKMode::TOPK_NORMAL模式或者TopKMode::TOPK_NSMALL模式，与kernel侧接口一致。</td></tr><tr><td>isLargest</td><td>输入</td><td>表示降序/升序，true表示降序，false表示升序。与kernel侧接口一致。</td></tr><tr><td>dataType</td><td>输入</td><td>表示待排序数据的数据类型，参数类型为<a href="../data_structures/TensorDataType.html">AscendC::TensorDataType</a>。该参数的取值与核函数（Kernel）接口参数srcLocal的数据类型保持一致。</td></tr><tr><td>config</td><td>输入</td><td>TopK计算的相关配置，TopKConfig类型定义如下方代码所示，包括算法选择、取最大值或最小值、是否对结果排序。该参数的配置需要与TopK核函数（Kernel）接口模板参数的配置保持一致。<br>algo：选择的排序算法。默认为MERGE_SORT算法，当前仅支持RADIX_SELECT算法，用户需要显式指定algo为TopKAlgo::RADIX_SELECT。<br>order：表示获取前k个最大值或者获取前k个最小值，取值如下：UNSET：默认值，按照函数参数isLargest的配置实现。isLargest为true时，取前k个最大值及其对应的索引，isLargest为false，取前k个最小值及其对应的索引。LARGEST：表示取前k个最大值及其对应的索引。取值为LARGEST时，函数参数isLargest的配置不生效。SMALLEST：表示取前k个最小值及其对应的索引。取值为SMALLEST时，函数参数isLargest的配置不生效。<br>sorted：表示是否对输出结果进行排序。取值为true，对输出结果进行排序；取值为false，不对输出结果进行排序。</td></tr><tr><td>dataTypeSize</td><td>输入</td><td>参与计算的srcLocal数据类型的大小，比如half=2， float=4</td></tr><tr><td>maxValue</td><td>输出</td><td>TopK接口内部完成计算需要的最大临时空间大小，单位是Byte。<br> 说明：maxValue仅作为参考值，有可能大于UB剩余空间的大小，该场景下，开发者需要根据UB剩余空间的大小来选取合适的临时空间大小。</td></tr><tr><td>minValue</td><td>输出</td><td>TopK接口内部完成计算需要的最小临时空间大小，单位是Byte。</td></tr></tbody></table><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>struct TopKConfig {
    TopKAlgo algo = TopKAlgo::MERGE_SORT;
    TopKOrder order = TopKOrder::UNSET;
    bool sorted = true;
};
enum class TopKAlgo { RADIX_SELECT, MERGE_SORT };
enum class TopKOrder { UNSET, LARGEST, SMALLEST };
</code></pre></div><p><strong>表2</strong> TopKTilingFunc接口参数列表</p><table><thead><tr><th>接口</th><th>输入/输出</th><th>功能</th></tr></thead><tbody><tr><td>ascendcPlatform</td><td>输入</td><td>传入硬件平台的信息，PlatformAscendC定义请参见<a href="../../../Utils-API/platform_info/PlatformAscendC/constructor_and_destructor.html">构造及析构函数</a>。</td></tr><tr><td>inner</td><td>输入</td><td>表示TopK接口输入srcLocal的内轴长度，该参数的取值为32的整数倍。</td></tr><tr><td>outter</td><td>输入</td><td>表示TopK接口输入srcLocal的外轴长度。</td></tr><tr><td>k</td><td>输入</td><td>获取前k个最大值或最小值及其对应的索引。</td></tr><tr><td>dataTypeSize</td><td>输入</td><td>参与计算的srcLocal数据类型的大小，比如half=2， float=4。</td></tr><tr><td>isInitIndex</td><td>输入</td><td>是否传入输入数据对应的索引，与kernel侧接口一致。</td></tr><tr><td>mode</td><td>输入</td><td>选择TopKMode::TOPK_NORMAL模式或者TopKMode::TOPK_NSMALL模式，与kernel侧接口一致。</td></tr><tr><td>isLargest</td><td>输入</td><td>表示降序/升序，true表示降序，false表示升序。与kernel侧接口一致。</td></tr><tr><td>topKTiling</td><td>输出</td><td>输出TopK接口所需的tiling信息。</td></tr></tbody></table><h2 id="返回值说明">返回值说明<a class="header-anchor" href="#返回值说明">​</a></h2><p>GetTopKMaxMinTmpSize返回值为true/false，true表示成功拿到TopK接口内部计算需要的最大和最小临时空间大小；false表示获取失败。</p><p>TopKTilingFunc返回值为true/false，true表示成功拿到TopK的Tiling各项参数值；false表示获取失败。</p><h2 id="约束说明">约束说明<a class="header-anchor" href="#约束说明">​</a></h2><p>无</p><h2 id="调用示例">调用示例<a class="header-anchor" href="#调用示例">​</a></h2><p>如下样例介绍了使用TopK高阶API时host侧获取Tiling参数的流程以及该参数如何在kernel侧使用。</p><ol><li><p>将TopK Tiling结构体参数增加至TilingData结构体，作为TilingData结构体的一个字段。</p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>namespace optiling {
BEGIN_TILING_DATA_DEF(TilingData)
    TILING_DATA_FIELD_DEF(uint32_t, totalLength);
    TILING_DATA_FIELD_DEF(uint32_t, tilenum);
    // 添加其他tiling字段
    ...
    TILING_DATA_FIELD_DEF(int32_t, k);
    TILING_DATA_FIELD_DEF(bool, islargest);
    TILING_DATA_FIELD_DEF(bool, isinitindex);
    TILING_DATA_FIELD_DEF(bool, ishasfinish);
    TILING_DATA_FIELD_DEF(uint32_t, tmpsize);
    TILING_DATA_FIELD_DEF(int32_t, outter);
    TILING_DATA_FIELD_DEF(int32_t, inner);
    TILING_DATA_FIELD_DEF(int32_t, n);
    TILING_DATA_FIELD_DEF(int32_t, order);
    TILING_DATA_FIELD_DEF(int32_t, sorted);
    TILING_DATA_FIELD_DEF_STRUCT(TopkTiling, topkTilingData);
END_TILING_DATA_DEF;
REGISTER_TILING_DATA_CLASS(TopkCustom, TilingData)
} // namespace optiling
</code></pre></div></li><li><p>Tiling实现函数中，首先调用GetTopKMaxMinTmpSize接口获取TopK接口能完成计算所需最大/最小临时空间大小，根据该范围结合实际的内存使用情况设置合适的空间大小；然后根据输入shape等信息获取TopK kernel侧接口所需tiling参数。MERGE_SORT算法参考如下调用示例。</p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>namespace optiling {
const uint32_t NUM_BLOCKS = 8;
const uint32_t TILE_NUM = 8;
const int32_t OUTTER = 2;
const int32_t INNER = 32;
const int32_t N = 32;
const int32_t K = 8;
const bool IS_LARGEST = true;
const bool IS_INITINDEX = true;
const bool IS_REUSESOURCE = false;
static ge::graphStatus TilingFunc(gert::TilingContext* context)
{
    TilingData tiling;
    uint32_t totalLength = context-&gt;GetInputTensor(0)-&gt;GetShapeSize();
    context-&gt;SetSimdNumBlocks(NUM_BLOCKS);
    tiling.set_totalLength(totalLength);
    tiling.set_tileNum(TILE_NUM);
    tiling.set_k(K);
    tiling.set_outter(OUTTER);
    tiling.set_inner(INNER);
    tiling.set_n(N);
    tiling.set_islargest(IS_LARGEST);
    tiling.set_isinitindex(IS_INITINDEX);
    // 设置其他Tiling参数
    ...
    // 本样例中仅作为样例说明，通过GetTopKMaxMinTmpSize获取最小值并传入，来保证功能正确，开发者可以根据需要传入合适的空间大小。
    uint32_t maxsize = 0;
    uint32_t minsize = 0;
    uint32_t dtypesize = 4; // float类型
    auto ascendcPlatform = platform_ascendc::PlatformAscendC(context-&gt;GetPlatformInfo());
    AscendC::TopKTilingFunc(
        ascendcPlatform, tiling.inner, tiling.outter, tiling.k, dtypesize, tiling.isinitindex,
        AscendC::TopKMode::TOPK_NSMALL, tiling.islargest, tiling.topkTilingData);
    AscendC::GetTopKMaxMinTmpSize(
        ascendcPlatform, tiling.inner, tiling.outter, IS_REUSESOURCE, tiling.isinitindex,
        AscendC::TopKMode::TOPK_NSMALL, tiling.islargest, dtypesize, maxsize, minsize);
    tiling.set_tmpsize(minsize);
    ... // 其他逻辑
    tiling.SaveToBuffer(context-&gt;GetRawTilingData()-&gt;GetData(), context-&gt;GetRawTilingData()-&gt;GetCapacity());
    context-&gt;GetRawTilingData()-&gt;SetDataSize(tiling.GetDataSize());
    size_t* currentWorkspace = context-&gt;GetWorkspaceSizes(1);
    currentWorkspace[0] = 0;
    return ge::GRAPH_SUCCESS;
}
} // namespace optiling
</code></pre></div><p>RADIX_SELECT算法参考如下调用示例。</p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>namespace optiling {
static ge::graphStatus TilingFunc(gert::TilingContext* context)
{
    std::map&lt;AscendC::TensorDataType, uint32_t&gt; dtypeSizes = {{AscendC::TensorDataType::DT_UINT32, 4}, {AscendC::TensorDataType::DT_INT32, 4}};
    RadixtopkCustomTilingData tiling;
    const gert::RuntimeAttrs* attrs = context-&gt;GetAttrs();
    const uint32_t is_init_index = *(attrs-&gt;GetAttrPointer&lt;uint32_t&gt;(0));
    const uint32_t is_reuse_src = *(attrs-&gt;GetAttrPointer&lt;uint32_t&gt;(1));
    const uint32_t order = *(attrs-&gt;GetAttrPointer&lt;uint32_t&gt;(2));
    const uint32_t is_largest = *(attrs-&gt;GetAttrPointer&lt;uint32_t&gt;(3));
    const uint32_t outter = *(attrs-&gt;GetAttrPointer&lt;uint32_t&gt;(4));
    const uint32_t inner = *(attrs-&gt;GetAttrPointer&lt;uint32_t&gt;(5));
    const uint32_t n = *(attrs-&gt;GetAttrPointer&lt;uint32_t&gt;(6));
    const uint32_t k = *(attrs-&gt;GetAttrPointer&lt;uint32_t&gt;(7));
    const uint32_t k_pad = *(attrs-&gt;GetAttrPointer&lt;uint32_t&gt;(8));
    const uint32_t sorted = *(attrs-&gt;GetAttrPointer&lt;uint32_t&gt;(9));
    const uint32_t top_mode = *(attrs-&gt;GetAttrPointer&lt;uint32_t&gt;(10));

    auto xDType = context-&gt;GetInputTensor(0)-&gt;GetDataType();
    uint32_t typeSize = dtypeSizes.at(xDType);
    AscendC::TopKConfig config;
    config.algo = AscendC::TopKAlgo::RADIX_SELECT;
    if (order == 1) {
        config.order = AscendC::TopKOrder::LARGEST;
    } else if (order == 2) {
        config.order = AscendC::TopKOrder::SMALLEST;
    } else {
        config.order = AscendC::TopKOrder::UNSET;
    }
    if (sorted == 0) {
        config.sorted = false;
    } else {
        config.sorted = true;
    }
    uint32_t maxValue = 0;
    uint32_t minValue = 0;

    if (top_mode == 0) {
        AscendC::GetTopKMaxMinTmpSize(
            inner, outter, k, is_reuse_src, is_init_index, AscendC::TopKMode::TOPK_NORMAL, is_largest, xDType, config,
            maxValue, minValue);
        context-&gt;SetTilingKey(0);
    } else {
        AscendC::GetTopKMaxMinTmpSize(
            inner, outter, k, is_reuse_src, is_init_index, AscendC::TopKMode::TOPK_NSMALL, is_largest, xDType, config,
            maxValue, minValue);
        context-&gt;SetTilingKey(1);
    }
    context-&gt;SetSimdNumBlocks(1);
    tiling.set_is_init_index(is_init_index);
    tiling.set_is_reuse_src(is_reuse_src);
    tiling.set_order(order);
    tiling.set_is_largest(is_largest);
    tiling.set_outter(outter);
    tiling.set_inner(inner);
    tiling.set_n(n);
    tiling.set_k(k);
    tiling.set_k_pad(k_pad);
    tiling.set_sorted(sorted);
    tiling.set_top_mode(top_mode);
    tiling.SaveToBuffer(context-&gt;GetRawTilingData()-&gt;GetData(), context-&gt;GetRawTilingData()-&gt;GetCapacity());
    context-&gt;GetRawTilingData()-&gt;SetDataSize(tiling.GetDataSize());
    size_t* currentWorkspace = context-&gt;GetWorkspaceSizes(1);
    currentWorkspace[0] = 0;
    return ge::GRAPH_SUCCESS;
}
} // namespace optiling
</code></pre></div></li><li><p>对应的kernel侧通过在核函数（Kernel）中调用GET_TILING_DATA获取TilingData，继而将TilingData中的TopK Tiling信息传入TopK接口参与计算。完整的kernel侧样例请参考<a href="TopK.html#section94691236101419">调用示例</a>。</p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>extern &quot;C&quot; __global__ __aicore__ void topk_custom(
    GM_ADDR srcVal, GM_ADDR srcIdx, GM_ADDR finishLocal, GM_ADDR dstVal, GM_ADDR dstIdx, GM_ADDR tiling)
{
    GET_TILING_DATA(tilingData, tiling);
    KernelTopK&lt;float, true, true, false, false, AscendC::TopKMode::TOPK_NSMALL&gt; op;
    op.Init(
        srcVal, srcIdx, finishLocal, dstVal, dstIdx, tilingData.k, tilingData.islargest, tilingData.tmpsize,
        tilingData.outter, tilingData.inner, tilingData.n, tilingData.topkTilingData);
    op.Process();
}
</code></pre></div></li></ol></article></div>`,1)])])}const T=n(o,[["render",s]]);export{_ as __pageData,T as default};
