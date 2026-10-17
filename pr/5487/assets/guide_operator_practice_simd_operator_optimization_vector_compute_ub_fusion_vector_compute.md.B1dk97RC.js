import{_ as o,o as e,a as n,b as a}from"./app.DKoEZOcr.js";const l="/ascendc.github.io/pr/5487/assets/flow_compare.BAVmgS25.png",f=JSON.parse('{"title":"","description":"","frontmatter":{"breadcrumbs":[{"text":"Ascend C算子开发指南","link":"/guide/getting_started/ascend_c_overview_and_learning_path"},{"text":"算子实践参考","link":"/guide/operator_practice/document_structure"},{"text":"SIMD算子性能优化","link":"/guide/operator_practice/simd_operator_optimization/simd_operator_optimization"},{"text":"矢量计算","link":"/guide/operator_practice/simd_operator_optimization/vector_compute/vector_compute"},{"text":"通过Unified Buffer融合实现连续vector计算","link":"/guide/operator_practice/simd_operator_optimization/vector_compute/ub_fusion_vector_compute"}]},"headers":[],"relativePath":"guide/operator_practice/simd_operator_optimization/vector_compute/ub_fusion_vector_compute.md","filePath":"guide/operator_practice/simd_operator_optimization/vector_compute/ub_fusion_vector_compute.md","lastUpdated":1787050286000}'),c={name:"guide/operator_practice/simd_operator_optimization/vector_compute/ub_fusion_vector_compute.md"};function i(r,t,s,_,u,p){return e(),n("div",null,[...t[0]||(t[0]=[a('<div><article class="markdown-body"><h1>通过Unified Buffer融合实现连续vector计算<span id="ZH-CN_TOPIC_0000001918025250"></span></h1><p>【优先级】高</p><p>【描述】算子实现中涉及多次vector计算，且前一次计算输出是后一次计算输入的情况下，可将前一次计算输出暂存在Unified Buffer（UB）上直接作为下一次计算的输入，不需要将前一次的计算输出从UB搬运到GM后再从GM搬运到UB。这种UB融合的方式可以减少搬入搬出次数，实现连续vector计算，提升内存使用效率。数据流图对比如下：</p><p><strong>图1</strong> 数据流图对比<span id="fig9257105941218"></span><br><img src="'+l+`" alt title="数据流图对比"></p><p>【反例】</p><p>该算子的计算逻辑为进行Exp计算后再进行Abs计算。计算过程中先把源操作数从GM搬运到UB进行Exp计算，Exp计算完成后将Exp的结果从UB搬运到GM；再从GM中把Exp的结果搬运到UB上作为Abs计算的输入，Abs计算完成后将目的操作数结果从UB搬运到GM。整个过程从GM搬进搬出共4次。当需要进行的vector计算为n次时，从GM搬进搬出共需要2n次。</p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>class KernelSample {
public:
    __aicore__ inline KernelSample() {}
    __aicore__ inline void Init(__gm__ uint8_t* src0Gm, __gm__ uint8_t* dstGm)
    {
        src0Global.SetGlobalBuffer((__gm__ float*)src0Gm);
        dstGlobal.SetGlobalBuffer((__gm__ float*)dstGm);
        pipe.InitBuffer(inQueueSrc0, 1, 1024 * sizeof(float));
        pipe.InitBuffer(outQueueDst, 1, 1024 * sizeof(float));
    }
    __aicore__ inline void Process()
    {
        CopyIn();
        Compute();
        CopyOut();
        CopyIn1();
        Compute1();
        CopyOut1();
    }

private:
    __aicore__ inline void CopyIn()
    {
        LocalTensor&lt;float&gt; src0Local = inQueueSrc0.AllocTensor&lt;float&gt;();
        DataCopy(src0Local, src0Global, 1024);
        inQueueSrc0.EnQue(src0Local);
    }
    __aicore__ inline void Compute()
    {
        LocalTensor&lt;float&gt; src0Local = inQueueSrc0.DeQue&lt;float&gt;();
        LocalTensor&lt;float&gt; dstLocal = outQueueDst.AllocTensor&lt;float&gt;();
        Exp(dstLocal, src0Local, 1024);
        outQueueDst.EnQue&lt;float&gt;(dstLocal);
        inQueueSrc0.FreeTensor(src0Local);
    }
    __aicore__ inline void CopyOut()
    {
        LocalTensor&lt;float&gt; dstLocal = outQueueDst.DeQue&lt;float&gt;();
        DataCopy(dstGlobal, dstLocal, 1024);
        outQueueDst.FreeTensor(dstLocal);
    }
    __aicore__ inline void CopyIn1()
    {
        LocalTensor&lt;float&gt; src0Local = inQueueSrc0.AllocTensor&lt;float&gt;();
        DataCopy(src0Local, dstGlobal, 1024);
        inQueueSrc0.EnQue(src0Local);
    }
    __aicore__ inline void Compute1()
    {
        LocalTensor&lt;float&gt; src0Local = inQueueSrc0.DeQue&lt;float&gt;();
        LocalTensor&lt;float&gt; dstLocal = outQueueDst.AllocTensor&lt;float&gt;();
        Abs(dstLocal, src0Local, 1024);
        outQueueDst.EnQue&lt;float&gt;(dstLocal);
        inQueueSrc0.FreeTensor(src0Local);
    }
    __aicore__ inline void CopyOut1()
    {
        LocalTensor&lt;float&gt; dstLocal = outQueueDst.DeQue&lt;float&gt;();
        DataCopy(dstGlobal, dstLocal, 1024);
        outQueueDst.FreeTensor(dstLocal);
    }

private:
    TPipe pipe;
    TQue&lt;TPosition::VECIN, 1&gt; inQueueSrc0;
    TQue&lt;TPosition::VECOUT, 1&gt; outQueueDst;
    GlobalTensor&lt;float&gt; src0Global, dstGlobal;
};
</code></pre></div><p>【正例】</p><p>使用UB融合方式后，在UB上进行连续vector计算时，前一次的结果可直接作为后一次计算的输入，继续在UB上进行计算，不需要中间的搬进搬出，只需在开始计算时将源操作数搬运到UB，以及全部计算结束后将最终结果从UB搬运到GM，共2次搬进搬出。</p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>class KernelSample {
public:
    __aicore__ inline KernelSample() {}
    __aicore__ inline void Init(__gm__ uint8_t* src0Gm, __gm__ uint8_t* dstGm)
    {
        src0Global.SetGlobalBuffer((__gm__ float*)src0Gm);
        dstGlobal.SetGlobalBuffer((__gm__ float*)dstGm);
        pipe.InitBuffer(inQueueSrc0, 1, 1024 * sizeof(float));
        pipe.InitBuffer(outQueueDst, 1, 1024 * sizeof(float));
    }
    __aicore__ inline void Process()
    {
        CopyIn();
        Compute();
        CopyOut();
    }

private:
    __aicore__ inline void CopyIn()
    {
        LocalTensor&lt;float&gt; src0Local = inQueueSrc0.AllocTensor&lt;float&gt;();
        DataCopy(src0Local, src0Global, 1024);
        inQueueSrc0.EnQue(src0Local);
    }
    __aicore__ inline void Compute()
    {
        LocalTensor&lt;float&gt; src0Local = inQueueSrc0.DeQue&lt;float&gt;();
        LocalTensor&lt;float&gt; dstLocal = outQueueDst.AllocTensor&lt;float&gt;();
        Exp(dstLocal, src0Local, 1024);
        Abs(dstLocal, dstLocal, 1024);
        outQueueDst.EnQue&lt;float&gt;(dstLocal);
        inQueueSrc0.FreeTensor(src0Local);
    }
    __aicore__ inline void CopyOut()
    {
        LocalTensor&lt;float&gt; dstLocal = outQueueDst.DeQue&lt;float&gt;();
        DataCopy(dstGlobal, dstLocal, 1024);
        outQueueDst.FreeTensor(dstLocal);
    }

private:
    TPipe pipe;
    TQue&lt;TPosition::VECIN, 1&gt; inQueueSrc0;
    TQue&lt;TPosition::VECOUT, 1&gt; outQueueDst;
    GlobalTensor&lt;float&gt; src0Global, dstGlobal;
};
</code></pre></div></article></div>`,1)])])}const g=o(c,[["render",i]]);export{f as __pageData,g as default};
