import{_ as t,o as i,a,b as n}from"./app.C41L12d5.js";const _=JSON.parse('{"title":"","description":"","frontmatter":{"breadcrumbs":[{"text":"Ascend C算子开发指南","link":"/guide/getting_started/ascend_c_overview_and_learning_path"},{"text":"编程指南","link":"/guide/programming_guide/document_structure"},{"text":"C++类库API","link":"/guide/programming_guide/library_api/library_api"},{"text":"高阶API","link":"/guide/programming_guide/library_api/advanced_api/overview"},{"text":"常用操作速查指导","link":"/guide/programming_guide/library_api/advanced_api/quick_reference/how_to_use_tiling_headers"},{"text":"如何使用核函数（Kernel）侧临时空间","link":"/guide/programming_guide/library_api/advanced_api/quick_reference/how_to_use_kernel_temp_space"}]},"headers":[],"relativePath":"guide/programming_guide/library_api/advanced_api/quick_reference/how_to_use_kernel_temp_space.md","filePath":"guide/programming_guide/library_api/advanced_api/quick_reference/how_to_use_kernel_temp_space.md","lastUpdated":1787050286000}'),r={name:"guide/programming_guide/library_api/advanced_api/quick_reference/how_to_use_kernel_temp_space.md"};function s(p,e,o,c,u,l){return i(),a("div",null,[...e[0]||(e[0]=[n(`<div><article class="markdown-body"><h1>如何使用核函数（Kernel）侧临时空间<span id="ZH-CN_TOPIC_0000002522740421"></span></h1><p>核函数（Kernel）侧接口的内部实现一般涉及复杂的数学计算，需要额外的临时空间来存储计算过程中的中间变量。除矩阵计算、HCCL通信类、卷积计算等，对于多数高阶API中临时空间的处理，开发者可以通过核函数（Kernel）侧接口的入参sharedTmpBuffer传入提前申请的临时空间、通过接口框架申请临时空间两种方式。</p><ul><li>通过sharedTmpBuffer入参传入，核函数（Kernel）侧接口使用该传入的Tensor作为临时空间。该方式下，开发者可以自行管理sharedTmpBuffer内存空间，并在接口调用完成后，复用该部分内存，内存不会反复申请释放，灵活性较高，内存利用率也较高。</li><li>接口框架申请临时空间，开发者无需在核函数（Kernel）侧申请临时空间，但是需要预留临时空间的大小，即在分配内存空间时，应在可用空间大小中减去需预留的临时空间大小。</li></ul><p>无论开发者采用上述哪种方式，在申请Tensor空间或预留临时空间时，都需要提前获取核函数（Kernel）侧接口所需的临时空间大小BufferSize，为此相应类别API中提供了GetxxxMaxMinTmpSize接口，用于获取所需预留空间的大小范围，其中xxx为对应的核函数（Kernel）侧接口。开发者在Host侧调用GetxxxMaxMinTmpSize接口，获取预留/申请的最大和最小临时空间的字节数，基于此范围选择合适的空间大小作为Tiling参数传递到核函数（Kernel）侧使用。</p><ul><li>为保证功能正确，预留/申请的临时空间大小不能小于最小临时空间大小；</li><li>在最小临时空间-最大临时空间范围内，随着临时空间增大，核函数（Kernel）侧接口计算性能会有一定程度的优化提升。为了达到更好的性能，开发者可以根据实际的内存使用情况进行空间预留/申请。</li></ul><p>以下以Asin接口为例，示例使用<a href="../../../../../api/SIMD-API/adv_api/data_structures/TensorShape.html">AscendC::TensorShape</a>描述输入数据的Tensor形状：</p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>// 算子输入的数据类型T为half，isReuseSource传入默认值false
auto shape_input = context-&gt;GetInputTensor(0)-&gt;GetOriginShape();    
std::vector&lt;int64_t&gt; srcDims = {shape_input.GetDim(0), shape_input.GetDim(1)};
uint32_t srcSize = 1;
for (auto dim : srcDims) {
    srcSize *= dim;
}
uint32_t typeSize = 2;
AscendC::TensorShape shape(srcDims);
uint32_t minValue = 0;
uint32_t maxValue = 0;
AscendC::GetAsinMaxMinTmpSize(shape, typeSize, false, maxValue, minValue);

auto platformInfo = context-&gt;GetPlatformInfo();
auto ascendcPlatform = platform_ascendc::PlatformAscendC(platformInfo);
uint64_t tailSize = 0; // Unified Buffer（UB）剩余空间大小
ascendcPlatform.GetCoreMemSize(platform_ascendc::CoreMemType::UB, tailSize); // 本样例中使用完整的ub空间，实际情况下tailSize需要减掉用户已使用的UB空间
auto tmpSize = tailSize &gt;= maxValue ? maxValue : tailSize;

AsinCustomTilingData tiling;
tiling.set_tmpBufferSize(tmpSize); // 将临时空间大小设置为Tiling参数
</code></pre></div><p>另外，多数高阶API中提供了GetxxxTmpBufferFactorSize接口，该接口用于获取maxLiveNodeCnt和extraBuf，maxLiveNodeCnt表示临时空间是单次计算数据量所占空间的多少倍；extraBuf表示核函数（Kernel）侧接口所需的临时空间大小的字节数。在固定空间大小的情况下，通过maxLiveNodeCnt和extraBuf可以推算算子单次最大计算元素数量。</p><p>推算示例如下：</p><ul><li><p>算子实现需要调用Mean接口，开发者为其预留currBuff大小的空间（即总可用空间），利用GetMeanTmpBufferFactorSize接口得到maxLiveNodeCnt、extraBuf输出值，可推导算子单次最大计算元素数量为：</p><p>currentShapeSize = (currBuff - extraBuf) / maxLiveNodeCnt / typeSize</p></li><li><p>算子实现需要调用两个核函数（Kernel）侧API KernelIntf1、KernelIntf2，利用两个GetXxxTmpBufferFactorSize（其中Xxx为需要调用的两个高阶API）接口的两组输出值(maxLiveNodeCnt、extraBuf)以及当前现有的临时空间currBuff，推导单次最大计算元素数量currentShapeSize为：</p><p>currentShapeSize1 = (currBuff - extraBuf1) / maxLiveNodeCnt1 / typeSize</p><p>currentShapeSize2 = (currBuff - extraBuf2) / maxLiveNodeCnt2 / typeSize</p><p>currentShapeSize = min(currentShapeSize1 , currentShapeSize2)</p></li></ul><p>注意上文中的currBuff表示接口计算可用的空间，需要去除用户输入输出等空间。</p><p>以算子中需要同时调用Asin、Acos接口为例：</p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>// 算子输入的数据类型T为half
auto shape_input = context-&gt;GetInputTensor(0)-&gt;GetOriginShape();
std::vector&lt;int64_t&gt; srcDims = { shape_input.GetDim(0), shape_input.GetDim(1) };
uint32_t srcSize = 1;
uint32_t srcCurSize = 1;
for (auto dim : srcDims) {
    srcSize *= dim;
}
uint32_t typeSize = 2;

auto platformInfo = context-&gt;GetPlatformInfo();
auto ascendcPlatform = platform_ascendc::PlatformAscendC(platformInfo);
uint64_t tailSize = 0; // UB剩余空间大小
ascendcPlatform.GetCoreMemSize(platform_ascendc::CoreMemType::UB, tailSize);

uint32_t asinMaxLiveNodeCount = 0;
uint32_t asinExtraBuf = 0;

uint32_t acosMaxLiveNodeCount = 0;
uint32_t acosExtraBuf = 0;

AscendC::GetAsinTmpBufferFactorSize(typeSize, asinMaxLiveNodeCount, asinExtraBuf);
AscendC::GetAcosTmpBufferFactorSize(typeSize, acosMaxLiveNodeCount, acosExtraBuf);
// tmp的大小需要减去UB上调用api接口输入和输出占用的大小
// 该示例中包括Asin接口的输入输出，以及Acos的输入输出，其中Asin接口的输出作为Acos的输入，因此一共需要3份src的空间大小
auto tmpSize = tailSize - srcSize * typeSize * 3;
assert(tmpSize &gt;= asinExtraBuf);
assert(tmpSize &gt;= acosExtraBuf);
// 计算Asin算子单次最大计算元素数量
if (asinMaxLiveNodeCount != 0) {
    srcAsinCurSize = (tmpSize - asinExtraBuf) / asinMaxLiveNodeCount / typeSize;
} else {
    srcAsinCurSize = srcSize;
}
// 计算Acos算子单次最大计算元素数量
if (acosMaxLiveNodeCount != 0) {
    srcAcosCurSize = (tmpSize - acosExtraBuf) / acosMaxLiveNodeCount / typeSize; 
} else {
    srcAcosCurSize = srcSize;
}
srcCurSize = std::min(srcAsinCurSize, srcAcosCurSize);

AsinCustomTilingData tiling;
tiling.set_srcCurSize(srcCurSize); // 将单次最大计算元素数量设置为Tiling参数
</code></pre></div></article></div>`,1)])])}const m=t(r,[["render",s]]);export{_ as __pageData,m as default};
