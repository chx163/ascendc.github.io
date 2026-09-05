import{_ as t,o as e,a as o,b as d}from"./app.C41L12d5.js";const s="/ascendc.github.io/assets/norm_copy.BmEmyGRM.png",i="/ascendc.github.io/assets/compact_copy.B2ulWPw6.png",v=JSON.parse('{"title":"","description":"","frontmatter":{"breadcrumbs":[{"text":"Ascend C算子开发指南","link":"/guide/getting_started/ascend_c_overview_and_learning_path"},{"text":"算子实践参考","link":"/guide/operator_practice/document_structure"},{"text":"SIMD算子性能优化","link":"/guide/operator_practice/simd_operator_optimization/simd_operator_optimization"},{"text":"内存访问","link":"/guide/operator_practice/simd_operator_optimization/memory_access/memory_access"},{"text":"非对齐场景减少无效数据的搬运","link":"/guide/operator_practice/simd_operator_optimization/memory_access/reduce_invalid_data_transfer"}]},"headers":[],"relativePath":"guide/operator_practice/simd_operator_optimization/memory_access/reduce_invalid_data_transfer.md","filePath":"guide/operator_practice/simd_operator_optimization/memory_access/reduce_invalid_data_transfer.md","lastUpdated":1787050286000}'),n={name:"guide/operator_practice/simd_operator_optimization/memory_access/reduce_invalid_data_transfer.md"};function c(p,a,r,l,m,h){return e(),o("div",null,[...a[0]||(a[0]=[d(`<div><article class="markdown-body"><h1>非对齐场景减少无效数据的搬运<span id="ZH-CN_TOPIC_0000002497818522"></span></h1><p>【优先级】中</p><div class="callout callout-note"><p class="callout-title"><svg class="callout-icon" viewBox="0 0 16 16" width="16" height="16"><path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8Zm8-6.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13ZM6.5 7.75A.75.75 0 0 1 7.25 7h1a.75.75 0 0 1 .75.75v2.75h.25a.75.75 0 0 1 0 1.5h-2a.75.75 0 0 1 0-1.5h.25v-2h-.25a.75.75 0 0 1-.75-.75ZM8 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"></path></svg>说明 该性能优化建议适用于如下型号：</p><div data-filter="950"><ul><li>Ascend 950PR/Ascend 950DT</li></ul></div></div><p>【描述】在非对齐数据搬运场景中，Ascend 950PR/Ascend 950DT在基础API层面提供了DataCopyPad接口，该接口支持Normal、Compact（紧凑）两种搬运模式。搬运多块非32B对齐数据块的场景下，使用Compact模式在可以减少搬运的无效数据量，节省带宽。</p><p>假设需要搬运三个数据块，每块数据块大小为48B，数据类型为float类型。除了这三个48字节的数据块之外，其他所有数据均为无效数据。</p><p>【反例】使用DataCopyPad接口进行Normal模式搬运数据</p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>__aicore__ inline void CopyIn(){
    AscendC::LocalTensor&lt;T&gt; xLocal = inQueueX.AllocTensor&lt;T&gt;();
    AscendC::Duplicate&lt;T&gt;(xLocal, 0, count);
    AscendC::DataCopyParams dataCopyParams;
    dataCopyParams.blockCount = 3;
    dataCopyParams.blockLen = 48;
    dataCopyParams.srcStride = 0;
    dataCopyParams.dstStride = 0;
    AscendC::DataCopyPadParams dataCopyPadParams;
    dataCopyPadParams.isPad = 1;
    dataCopyPadParams.leftPadding = 0;
    dataCopyPadParams.rightPadding = 4;
    dataCopyPadParams.paddingValue = 0;
    AscendC::DataCopyPad&lt;T, AscendC::PaddingMode::Normal&gt;(xLocal, xGm, dataCopyParams, dataCopyPadParams);
    inQueueX.EnQue&lt;T&gt;(xLocal);
}
</code></pre></div><p>搬运后Unified Buffer（UB）内数据如下：</p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>[1., 1., 1., 1., 1., 1., 1., 1., 1., 1., 1., 1., 0., 0., 0., 0., 
 1., 1., 1., 1., 1., 1., 1., 1., 1., 1., 1., 1., 0., 0., 0., 0.,
 1., 1., 1., 1., 1., 1., 1., 1., 1., 1., 1., 1., 0., 0., 0., 0.....]
</code></pre></div><p><strong>图1</strong> Normal模式搬运<span id="fig1316440112511"></span><br><img src="`+s+`" alt title="Normal模式搬运"></p><p>如图所示，由于每块数据块为48B，非32B对齐，因此搬运每块数据块时需要插入16B大小的padding数据使得数据32B对齐，最终搬运192B大小的数据到UB，其中包含48B的无效数据。</p><p>【正例】改用Compact模式搬运进行优化</p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>__aicore__ inline void CopyIn(){
    AscendC::LocalTensor&lt;T&gt; xLocal = inQueueX.AllocTensor&lt;T&gt;();
    AscendC::Duplicate&lt;T&gt;(xLocal, 0, count);
    AscendC::DataCopyParams dataCopyParams;
    dataCopyParams.blockCount = 3;
    dataCopyParams.blockLen = 48;
    dataCopyParams.srcStride = 0;
    dataCopyParams.dstStride = 0;
    AscendC::DataCopyPadParams dataCopyPadParams;
    dataCopyPadParams.isPad = 1;
    dataCopyPadParams.leftPadding = 0;
    dataCopyPadParams.rightPadding = 4;
    dataCopyPadParams.paddingValue = 0;
    AscendC::DataCopyPad&lt;T, AscendC::PaddingMode::Compact&gt;(xLocal, xGm, dataCopyParams, dataCopyPadParams);
    inQueueX.EnQue&lt;T&gt;(xLocal);
}
</code></pre></div><p>搬运后UB内数据如下：</p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>[1., 1., 1., 1., 1., 1., 1., 1., 1., 1., 1., 1., 1., 1., 1., 1., 1.,
 1., 1., 1., 1., 1., 1., 1., 1., 1., 1., 1., 1., 1., 1., 1., 1., 1.,
 1., 1., 0., 0., 0., 0....]
</code></pre></div><p><strong>图2</strong> Compact模式搬运<span id="fig203951741467"></span><br><img src="`+i+'" alt title="Compact模式搬运"></p><p>根据Compact模式搬运的示意图，最终搬运了160B大小的数据，其中包含16B的无效数据。</p><p>【总结】通过比较可以发现，搬运多块非32B对齐数据块的场景下，使用Compact模式在可以减少搬运的无效数据量，节省带宽。</p></article></div>',1)])])}const C=t(n,[["render",c]]);export{v as __pageData,C as default};
