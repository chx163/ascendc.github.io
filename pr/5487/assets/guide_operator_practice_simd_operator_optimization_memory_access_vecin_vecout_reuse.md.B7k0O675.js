import{_ as t,o,a as n,b as a}from"./app.DKoEZOcr.js";const i="/ascendc.github.io/pr/5487/assets/fig_1.DO4qUTOf.png",m=JSON.parse('{"title":"","description":"","frontmatter":{"breadcrumbs":[{"text":"Ascend C算子开发指南","link":"/guide/getting_started/ascend_c_overview_and_learning_path"},{"text":"算子实践参考","link":"/guide/operator_practice/document_structure"},{"text":"SIMD算子性能优化","link":"/guide/operator_practice/simd_operator_optimization/simd_operator_optimization"},{"text":"内存访问","link":"/guide/operator_practice/simd_operator_optimization/memory_access/memory_access"},{"text":"纯搬运类算子VECIN和VECOUT建议复用","link":"/guide/operator_practice/simd_operator_optimization/memory_access/vecin_vecout_reuse"}]},"headers":[],"relativePath":"guide/operator_practice/simd_operator_optimization/memory_access/vecin_vecout_reuse.md","filePath":"guide/operator_practice/simd_operator_optimization/memory_access/vecin_vecout_reuse.md","lastUpdated":1787050286000}'),c={name:"guide/operator_practice/simd_operator_optimization/memory_access/vecin_vecout_reuse.md"};function r(s,e,p,l,_,d){return o(),n("div",null,[...e[0]||(e[0]=[a(`<div><article class="markdown-body"><h1>纯搬运类算子VECIN和VECOUT建议复用<span id="ZH-CN_TOPIC_0000001893038937"></span></h1><p>【优先级】高</p><p>【描述】纯搬运类算子在执行时并不涉及实际vector计算，若存在冗余的vector指令，会导致算子整体执行时间变长。这种场景可以使用Ascend C针对纯搬运类算子提供的TQueBind接口，该接口可以将Unified Buffer（UB，VECIN）与UB（VECOUT）绑定，省略将数据从UB（VECIN）拷贝到UB（VECOUT）的步骤，从而避免vector的无谓消耗。</p><p>【反例】</p><p>此段代码为了保证数据搬入和数据搬出之间的流水同步，存在LocalTensor -&gt; LocalTensor的DataCopy指令。</p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>template &lt;typename ComputeT&gt; class KernelExample {
 public:
     ...
     __aicore__ inline void Process(...)
     {
         for (int i = 0; i &lt; iLen; ++i) {
             ... 
             auto iLocal = QueI.AllocTensor&lt;ComputeT&gt;();
             DataCopy(iLocal, inGm[i * 32], size);
             QueI.EnQue(iLocal);
             iLocal = QueI.DeQue&lt;ComputeT&gt;();
             for (int j = 0; j &lt; jLen; ++j) { 
                 ...
                 auto oLocal = QueO.AllocTensor&lt;ComputeT&gt;();
                 DataCopy(oLocal, iLocal, size); // LocalTensor -&gt; LocalTensor的DataCopy指令,以实现数据从UB（VECIN）到UB（VECOUT）的搬运
                 QueO.EnQue(oLocal);

                 auto oLocal = QueO.DeQue&lt;ComputeT&gt;();
                 DataCopyPad(outGm[j], oLocal, ...);
                 QueO.FreeTensor(oLocal);
             }
             QueI.FreeTensor(iLocal);
         }
     }

 private:
     ... 
     TQue&lt;TPosition::VECIN, BUFFER_NUM&gt; QueI;
     TQue&lt;TPosition::VECOUT, BUFFER_NUM&gt; QueO;
     ...
 };

 extern &quot;C&quot; __global__ __aicore__ void example_kernel(...)
 {
     ...
     op.Process(...);
 }
</code></pre></div><p>【正例】</p><p>将LocalTensor -&gt; LocalTensor的DataCopy指令替换为TQueBind接口，减少将UB（VECIN）拷贝到UB（VECOUT）的步骤，从而避免了冗余拷贝。</p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>template &lt;typename ComputeT&gt; class KernelExample {
 public:
     ...
     __aicore__ inline void Process(...)
     {
         for (int i = 0; i &lt; iLen; ++i) {
             ... 
             auto bindLocal = queBind.AllocTensor&lt;ComputeT&gt;();
             DataCopy(bindLocal, inGm[i * 32], size);
             queBind.EnQue(bindLocal);
             bindLocal = queBind.DeQue&lt;ComputeT&gt;();
             for (int j = 0; j &lt; jlen; ++j) {
                 ...
                 DataCopyPad(outGm[j], bindLocal, ...);
             }
             queBind.FreeTensor(bindLocal);
         }
     }

 private:
     ... 
     TQueBind&lt;TPosition::VECIN, TPosition::VECOUT, BUFFER_NUM&gt; queBind; // 使用TQueBind替换原来的QueI，QueO
     ...
 };

 extern &quot;C&quot; __global__ __aicore__ void example_kernel(...)
 {
     ...
     op.Process(...);
 }
</code></pre></div><p>【性能对比】</p><p><strong>图1</strong> aiv_vec_time优化前后对比<span id="fig74881227195511"></span></p><p><img src="`+i+'" alt></p><p>如上图所示，将反例中DataCopy指令替换为TQueBind之后有明显优化。由于省略了数据从UB（VECIN）拷贝到UB（VECOUT）的步骤，aiv_vec_time几乎缩减为0。</p></article></div>',1)])])}const v=t(c,[["render",r]]);export{m as __pageData,v as default};
