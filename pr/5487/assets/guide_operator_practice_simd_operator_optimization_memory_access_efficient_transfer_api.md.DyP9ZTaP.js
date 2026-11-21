import{_ as a,o as e,a as o,b as i}from"./app.DKoEZOcr.js";const r="/ascendc.github.io/pr/5487/assets/pending_data.CNcmO89t.png",h=JSON.parse('{"title":"","description":"","frontmatter":{"breadcrumbs":[{"text":"Ascend C算子开发指南","link":"/guide/getting_started/ascend_c_overview_and_learning_path"},{"text":"算子实践参考","link":"/guide/operator_practice/document_structure"},{"text":"SIMD算子性能优化","link":"/guide/operator_practice/simd_operator_optimization/simd_operator_optimization"},{"text":"内存访问","link":"/guide/operator_practice/simd_operator_optimization/memory_access/memory_access"},{"text":"高效的使用搬运API","link":"/guide/operator_practice/simd_operator_optimization/memory_access/efficient_transfer_api"}]},"headers":[],"relativePath":"guide/operator_practice/simd_operator_optimization/memory_access/efficient_transfer_api.md","filePath":"guide/operator_practice/simd_operator_optimization/memory_access/efficient_transfer_api.md","lastUpdated":1786954352000}'),s={name:"guide/operator_practice/simd_operator_optimization/memory_access/efficient_transfer_api.md"};function n(c,t,p,d,_,l){return e(),o("div",null,[...t[0]||(t[0]=[i('<div><article class="markdown-body"><h1>高效的使用搬运API<span id="ZH-CN_TOPIC_0000001846719836"></span></h1><p>【优先级】高</p><p>【描述】在使用搬运API时，应该尽可能地通过配置搬运控制参数实现连续搬运或者固定间隔搬运，避免使用for循环，二者效率差距极大。如下图示例，图片的每一行为16KB，需要从每一行中搬运前2KB，针对这种场景，使用for循环遍历每行，每次仅能搬运<strong>2</strong>KB。若直接配置DataCopyParams参数（包含srcStride/dstStride/blockLen/blockCount），则可以达到一次搬完的效果，每次搬运<strong>32</strong>KB；参考<a href="transfer_larger_data_blocks.html">尽量一次搬运较大的数据块</a>章节介绍的搬运数据量和实际带宽的关系，建议一次搬完。</p><p><strong>图1</strong> 待搬运数据排布<span id="fig147153323541"></span><br><img src="'+r+`" alt title="待搬运数据排布"></p><p>【反例】</p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>// 搬运数据存在间隔，从GM上每行16KB中搬运2KB数据,共16行
LocalTensor&lt;float&gt; tensorIn;
GlobalTensor&lt;float&gt; tensorGM;
...
constexpr int32_t copyWidth = 2 * 1024 / sizeof(float);
constexpr int32_t imgWidth = 16 * 1024 / sizeof(float);
constexpr int32_t imgHeight = 16;
// 使用for循环，每次只能搬运2K，重复16次
for (int i = 0; i &lt; imgHeight; i++) {
    DataCopy(tensorIn[i * copyWidth], tensorGM[i * imgWidth], copyWidth);
}
</code></pre></div><p>【正例】</p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>LocalTensor&lt;float&gt; tensorIn;
GlobalTensor&lt;float&gt; tensorGM;
...
constexpr int32_t copyWidth = 2 * 1024 / sizeof(float);
constexpr int32_t imgWidth = 16 * 1024 / sizeof(float);
constexpr int32_t imgHeight = 16;
// 通过DataCopy包含DataCopyParams的接口一次搬完
DataCopyParams copyParams;
copyParams.blockCount = imgHeight;
copyParams.blockLen = copyWidth / 8; // 搬运的单位为DataBlock(32Byte)，每个DataBlock内有8个float
copyParams.srcStride = (imgWidth  - copyWidth) / 8; // 表示两次搬运src之间的间隔，单位为DataBlock
copyParams.dstStride = 0; // 连续写，两次搬运之间dst的间隔为0，单位为DataBlock
DataCopy(tensorGM, tensorIn, copyParams);
</code></pre></div></article></div>`,1)])])}const g=a(s,[["render",n]]);export{h as __pageData,g as default};
