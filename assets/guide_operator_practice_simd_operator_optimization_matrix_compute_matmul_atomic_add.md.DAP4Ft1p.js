import{_ as e,o as a,a as o,b as n}from"./app.C41L12d5.js";const i="/ascendc.github.io/assets/mm_atomic.BbW2QrLF.png",T=JSON.parse('{"title":"","description":"","frontmatter":{"breadcrumbs":[{"text":"Ascend C算子开发指南","link":"/guide/getting_started/ascend_c_overview_and_learning_path"},{"text":"算子实践参考","link":"/guide/operator_practice/document_structure"},{"text":"SIMD算子性能优化","link":"/guide/operator_practice/simd_operator_optimization/simd_operator_optimization"},{"text":"矩阵计算","link":"/guide/operator_practice/simd_operator_optimization/matrix_compute/matrix_compute"},{"text":"Matmul开启AtomicAdd选项","link":"/guide/operator_practice/simd_operator_optimization/matrix_compute/matmul_atomic_add"}]},"headers":[],"relativePath":"guide/operator_practice/simd_operator_optimization/matrix_compute/matmul_atomic_add.md","filePath":"guide/operator_practice/simd_operator_optimization/matrix_compute/matmul_atomic_add.md","lastUpdated":1787050286000}'),_={name:"guide/operator_practice/simd_operator_optimization/matrix_compute/matmul_atomic_add.md"};function m(l,t,d,p,c,s){return a(),o("div",null,[...t[0]||(t[0]=[n(`<div><article class="markdown-body"><h1>Matmul开启AtomicAdd选项<span id="ZH-CN_TOPIC_0000001925216954"></span></h1><p>【优先级】中</p><p>【描述】__对于Matmul得到的结果矩阵C(m, n)，若后续需要和GM上的矩阵D(m, n)进行Add操作，则可以在GetTensorC接口或者IterateAll接口的GM通路上，将enAtomic参数设为1，开启AtomicAdd累加操作，在搬出矩阵C到GM时，矩阵C的结果将直接累加到矩阵D的GM地址上，从而实现与矩阵D的Add操作。</p><p>【反例】</p><p>将Matmul的结果矩阵C和GM上的矩阵D分别搬到Unified Buffer（UB）上，做完Add操作后，结果再搬出到GM。这样至少要多分配一块UB内存给矩阵D，假设在分离架构的处理器上执行，将多做三次搬运操作（矩阵C从GM搬到UB、矩阵D从GM搬到UB、Add结果从UB搬出到GM）。</p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>template &lt;class A_TYPE, class B_TYPE, class C_TYPE, class BIAS_TYPE&gt;
 __aicore__ inline void MatMulKernel(...)
 {
    ...
    AscendC::Matmul&lt;A_TYPE, B_TYPE, C_TYPE, BIAS_TYPE, CFG_MDL&gt; mm;
    TPipe pipe;
    REGIST_MATMUL_OBJ(&amp;pipe, GetSysWorkSpacePtr(), mm);

    mm.SetTensorA(gm_a);
    mm.SetTensorB(gm_b);
    mm.SetBias(gm_bias);
    mm.IterateAll(gm_c);
    
    DataCopy(local_c, gm_c, c_size);
    DataCopy(local_d, gm_d, d_size);
    event_t eventIdMTE2ToV = static_cast&lt;event_t&gt;(GetTPipePtr()-&gt;FetchEventID(HardEvent::MTE2_V));
    SetFlag&lt;HardEvent::MTE2_V&gt;(eventIdMTE2ToV);
    WaitFlag&lt;HardEvent::MTE2_V&gt;(eventIdMTE2ToV);
    Add(local_d, local_d, local_c, d_size);
    DataCopy(gm_d, local_d, d_size);
    ...
 }

 extern &quot;C&quot; __global__ __aicore__ void example_kernel(...)
 {
     ...
     typedef AscendC::MatmulType&lt;TPosition::GM, CubeFormat::ND, half&gt; aType; 
     typedef AscendC::MatmulType&lt;TPosition::GM, CubeFormat::ND, half&gt; bType; 
     typedef AscendC::MatmulType&lt;TPosition::GM, CubeFormat::ND, float&gt; cType; 
     typedef AscendC::MatmulType&lt;TPosition::GM, CubeFormat::ND, float&gt; biasType;
     MatMulKernel&lt;aType, bType, cType, biasType&gt;(...);
     ...
 }
</code></pre></div><p>【正例】</p><p>计算Matmul结果时，调用IterateAll接口或者GetTensorC接口搬运到矩阵D的GM地址上，同时将接口中enAtomic参数设为1，搬出到GM时，Matmul结果矩阵C会累加到矩阵D上，从而得到两个矩阵Add后的结果。</p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>template &lt;class A_TYPE, class B_TYPE, class C_TYPE, class BIAS_TYPE&gt;
 __aicore__ inline void MatMulKernel(...)
 {
    ...
    AscendC::Matmul&lt;A_TYPE, B_TYPE, C_TYPE, BIAS_TYPE, CFG_MDL&gt; mm;
    TPipe pipe;
    REGIST_MATMUL_OBJ(&amp;pipe, GetSysWorkSpacePtr(), mm);

    mm.SetTensorA(gm_a);
    mm.SetTensorB(gm_b);
    mm.SetBias(gm_bias);

    mm.IterateAll(gm_d, 1); // IterateAll接口中的enAtomic设为1
    // while (mm. Iterate()) {
        // mm.GetTensorC(gm_d, 1);     // GetTensorC接口中的enAtomic设为1
    // }
    ...
 }

 extern &quot;C&quot; __global__ __aicore__ void example_kernel(...)
 {
     ...
     typedef AscendC::MatmulType&lt;TPosition::GM, CubeFormat::ND, half&gt; aType; 
     typedef AscendC::MatmulType&lt;TPosition::GM, CubeFormat::ND, half&gt; bType; 
     typedef AscendC::MatmulType&lt;TPosition::GM, CubeFormat::ND, float&gt; cType; 
     typedef AscendC::MatmulType&lt;TPosition::GM, CubeFormat::ND, float&gt; biasType;
     MatMulKernel&lt;aType, bType, cType, biasType&gt;(...);
     ...
 }
</code></pre></div><p>【性能对比】</p><p><strong>图1</strong> Matmul开启AtomicAdd选项前后性能对比<span id="fig1924944205516"></span><br><img src="`+i+'" alt title="Matmul开启AtomicAdd选项前后性能对比"></p><p>以矩阵维度M=64，N=256，K=256，矩阵D为(64, 256)为例，Matmul开启AtomicAdd选项前后的性能对比如上图所示，平均cycle数从开启AtomicAdd选项前的154181变为开启后的135054，性能优化12.4%。因此在这种场景下，开启AtomicAdd选项能获取更优的性能。</p></article></div>',1)])])}const u=e(_,[["render",m]]);export{T as __pageData,u as default};
