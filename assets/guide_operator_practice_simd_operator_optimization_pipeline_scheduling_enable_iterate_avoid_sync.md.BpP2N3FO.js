import{_ as t,o as a,a as n,b as i}from"./app.C41L12d5.js";const o="/ascendc.github.io/assets/sync_msg.CdEB4EEb.png",s="/ascendc.github.io/assets/async_msg.CHyiAzW-.png",I=JSON.parse('{"title":"","description":"","frontmatter":{"breadcrumbs":[{"text":"Ascend C算子开发指南","link":"/guide/getting_started/ascend_c_overview_and_learning_path"},{"text":"算子实践参考","link":"/guide/operator_practice/document_structure"},{"text":"SIMD算子性能优化","link":"/guide/operator_practice/simd_operator_optimization/simd_operator_optimization"},{"text":"流水编排","link":"/guide/operator_practice/simd_operator_optimization/pipeline_scheduling/pipeline_scheduling"},{"text":"启用Iterate或IterateAll异步接口避免AIC/AIV同步依赖","link":"/guide/operator_practice/simd_operator_optimization/pipeline_scheduling/enable_iterate_avoid_sync"}]},"headers":[],"relativePath":"guide/operator_practice/simd_operator_optimization/pipeline_scheduling/enable_iterate_avoid_sync.md","filePath":"guide/operator_practice/simd_operator_optimization/pipeline_scheduling/enable_iterate_avoid_sync.md","lastUpdated":1786954352000}'),r={name:"guide/operator_practice/simd_operator_optimization/pipeline_scheduling/enable_iterate_avoid_sync.md"};function c(l,e,p,d,_,g){return a(),n("div",null,[...e[0]||(e[0]=[i('<div><article class="markdown-body"><h1>启用Iterate或IterateAll异步接口避免AIC/AIV同步依赖<span id="ZH-CN_TOPIC_0000001893695885"></span></h1><p>【优先级】高</p><p>【描述】在MIX场景，即AIC（AI Cube核）和AIV（AI Vector核）混合编程中，调用Matmul Iterate或者IterateAll时，AIV发送消息到AIC启动Matmul计算。若通过Iterate&lt;true&gt;同步方式，如<a href="#fig99236286201">图1同步方式消息发送示意图</a>，每次调用都会触发一次消息发送，而通过Iterate&lt;false&gt;异步方式，如<a href="#fig1511392207">图2 异步方式消息发送示意图</a>，仅第一次需要发送消息，后续无需发送消息，从而减少Cube与Vector核间交互，减少核间通信开销。因此，MIX场景推荐使用Iterate&lt;false&gt;或者IterateAll&lt;false&gt;异步接口（注意：使用异步接口时需要设置Workspace）。</p><p><strong>图1</strong> 同步方式消息发送示意图<span id="fig99236286201"></span><br><img src="'+o+'" alt title="同步方式消息发送示意图"></p><p><strong>图2</strong> 异步方式消息发送示意图<span id="fig1511392207"></span><br><img src="'+s+`" alt title="异步方式消息发送示意图"></p><p>【反例】</p><p>MIX场景使用Iterate接口的同步方式。</p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>TQueBind&lt;TPosition::CO2, TPosition::VECIN&gt;  qVecIn;
TQueBind&lt;TPosition::VECIN, TPosition::VECOUT&gt;  qVecOut;
mm.SetTensorA(gmA);
mm.SetTensorB(gmB);
int16_t scalar = 2;

while(mm.template Iterate()){
    auto cInUB = qVecIn.AllocTensor&lt;float&gt;();
    mm.GetTensorC(cInUB);
    qVecIn.EnQue(cInUB);
    cInUB = qVecIn.DeQue&lt;float&gt;();
    auto cOutUB = qVecOut.AllocTensor&lt;float&gt;();
    Muls(cOutUB, cInUB, scalar, baseM*baseN);
    qVecIn.FreeTensor(cInUB);
    ...
}
</code></pre></div><p>【正例】</p><p>MIX场景使用Iterate接口的异步方式。</p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>TQueBind&lt;TPosition::CO2, TPosition::VECIN&gt;  qVecIn;
TQueBind&lt;TPosition::VECIN, TPosition::VECOUT&gt;  qVecOut;
mm.SetTensorA(gmA);
mm.SetTensorB(gmB);
mm.SetWorkspace(workspace, size);//其中，workspace为临时空间的物理地址，size为singleCoreM*singleCoreN大小的矩阵C占用的内存大小：singleCoreM*singleCoreN*sizeof(float)
int16_t scalar = 2;

while(mm.template Iterate&lt;false&gt;()){
    auto cInUB = qVecIn.AllocTensor&lt;float&gt;();
    mm.GetTensorC(cInUB);
    qVecIn.EnQue(cInUB);
    cInUB = qVecIn.DeQue&lt;float&gt;();
    auto cOutUB = qVecOut.AllocTensor&lt;float&gt;();
    Muls(cOutUB, cInUB, scalar, baseM*baseN);
    qVecIn.FreeTensor(cInUB);
    ...
}
</code></pre></div></article></div>`,1)])])}const u=t(r,[["render",c]]);export{I as __pageData,u as default};
