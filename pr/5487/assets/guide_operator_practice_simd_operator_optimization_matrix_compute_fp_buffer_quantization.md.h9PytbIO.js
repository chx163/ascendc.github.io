import{_ as e,o as n,a as t,b as i}from"./app.DKoEZOcr.js";const o="/ascendc.github.io/pr/5487/assets/bad_flow_78.BDcrqlTM.png",l="/ascendc.github.io/pr/5487/assets/good_dataflow_79.BUDBpiLR.png",f=JSON.parse('{"title":"","description":"","frontmatter":{"breadcrumbs":[{"text":"Ascend C算子开发指南","link":"/guide/getting_started/ascend_c_overview_and_learning_path"},{"text":"算子实践参考","link":"/guide/operator_practice/document_structure"},{"text":"SIMD算子性能优化","link":"/guide/operator_practice/simd_operator_optimization/simd_operator_optimization"},{"text":"矩阵计算","link":"/guide/operator_practice/simd_operator_optimization/matrix_compute/matrix_compute"},{"text":"通过FP Buffer存放量化参数实现高效随路量化","link":"/guide/operator_practice/simd_operator_optimization/matrix_compute/fp_buffer_quantization"}]},"headers":[],"relativePath":"guide/operator_practice/simd_operator_optimization/matrix_compute/fp_buffer_quantization.md","filePath":"guide/operator_practice/simd_operator_optimization/matrix_compute/fp_buffer_quantization.md","lastUpdated":1787050286000}'),r={name:"guide/operator_practice/simd_operator_optimization/matrix_compute/fp_buffer_quantization.md"};function u(s,a,p,c,_,d){return n(),t("div",null,[...a[0]||(a[0]=[i('<div><article class="markdown-body"><h1>通过FP Buffer存放量化参数实现高效随路量化<span id="ZH-CN_TOPIC_0000001947984233"></span></h1><p>【优先级】高</p><p>【描述】算子实现中对矩阵乘结果进行量化计算时，可将量化参数搬运到Fixpipe Buffer（C2PIPE2GM）上，调用一次Fixpipe接口实现矩阵乘结果的量化计算。相比于将矩阵乘的结果从L0C Buffer（CO1）搬运到GM，再从GM搬运到Unified Buffer（UB），在UB进行量化计算的过程，数据搬运的次数更少，内存使用效率更高。</p><div class="callout callout-note"><p class="callout-title"><svg class="callout-icon" viewBox="0 0 16 16" width="16" height="16"><path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8Zm8-6.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13ZM6.5 7.75A.75.75 0 0 1 7.25 7h1a.75.75 0 0 1 .75.75v2.75h.25a.75.75 0 0 1 0 1.5h-2a.75.75 0 0 1 0-1.5h.25v-2h-.25a.75.75 0 0 1-.75-.75ZM8 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"></path></svg>说明</p><p>本性能优化手段仅针对Atlas A2 训练系列产品/Atlas A2 推理系列产品生效。</p></div><p><strong>图1</strong> 反例数据流图<span id="fig1775910202351"></span><br><img src="'+o+'" alt title="反例数据流图-78"></p><p><strong>图2</strong> 正例数据流图<span id="fig14909105811118"></span><br><img src="'+l+`" alt title="正例数据流图-79"></p><p>【反例】</p><p>对矩阵乘结果进行量化计算的过程如下：</p><ul><li>将矩阵乘的结果从L0C Buffer（CO1）搬运到workspace上；</li><li>再从workspace搬运到UB上；</li><li>将量化参数搬运到UB上，和矩阵乘的结果一起在UB上进行一系列量化计算；</li><li>将最终量化结果从UB搬运到GM上。</li></ul><p>相比于正确示例多增加了L0C Buffer（CO1）-&gt;workspace、workspace-&gt;UB的搬运过程和量化的vector计算。</p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>...
// 该样例仅做示例说明，非完整代码，省略了部分同步控制代码
public:
    __aicore__ inline KernelSample()
    {
        aSize = m * k;
        bSize = k * n;
        cSize = m * n;
    }
    __aicore__ inline void Init(__gm__ uint8_t *a, __gm__ uint8_t *b, __gm__ uint8_t *c, __gm__ uint8_t *deqTensor)
    {
        aGM.SetGlobalBuffer((__gm__ half *)a);
        bGM.SetGlobalBuffer((__gm__ half *)b);
        cGM.SetGlobalBuffer((__gm__ float *)c);
        deqGM.SetGlobalBuffer((__gm__ half *)deqTensor);
        pipe.InitBuffer(inQueueA1, 1, aSize * sizeof(half));
        pipe.InitBuffer(inQueueA2, 1, aSize * sizeof(half));
        pipe.InitBuffer(inQueueB1, 1, bSize * sizeof(half));
        pipe.InitBuffer(inQueueB2, 2, bSize * sizeof(half));
        pipe.InitBuffer(outQueueCO1, 1, cSize * sizeof(float));
        pipe.InitBuffer(inQueueSrc0, 1, cSize * sizeof(float));
        pipe.InitBuffer(inQueueTmp, 1, cSize * sizeof(half));
        pipe.InitBuffer(inQueueDeq, 1, cSize * sizeof(half));
        pipe.InitBuffer(outQueueDst, 1, cSize * sizeof(int8_t));
    }
    __aicore__ inline void Process()
    {
        CopyIn();
        SplitA();
        SplitB();
        Compute();
        CopyOut();
        CopyIn1();
        Compute1();
        CopyOut1();
    }
private:
    __aicore__ inline void CopyIn()
    {
        LocalTensor&lt;half&gt; a1Local = inQueueA1.AllocTensor&lt;half&gt;();
        LocalTensor&lt;half&gt; b1Local = inQueueB1.AllocTensor&lt;half&gt;();
        LocalTensor&lt;half&gt; deqLocal = inQueueDeq.AllocTensor&lt;half&gt;();

        Nd2NzParams dataCopyA1Params;
        dataCopyA1Params.ndNum = 1;
        dataCopyA1Params.nValue = m;
        dataCopyA1Params.dValue = k;
        dataCopyA1Params.srcNdMatrixStride = 0;
        dataCopyA1Params.srcDValue = k;
        dataCopyA1Params.dstNzC0Stride = m;
        dataCopyA1Params.dstNzNStride = 1;
        dataCopyA1Params.dstNzMatrixStride = 0;
        DataCopy(a1Local, aGM, dataCopyA1Params);

        Nd2NzParams dataCopyB1Params;
        dataCopyB1Params.ndNum = 1;
        dataCopyB1Params.nValue = k;
        dataCopyB1Params.dValue = n;
        dataCopyB1Params.srcNdMatrixStride = 0;
        dataCopyB1Params.srcDValue = n;
        dataCopyB1Params.dstNzC0Stride = k;
        dataCopyB1Params.dstNzNStride = 1;
        dataCopyB1Params.dstNzMatrixStride = 0;
        DataCopy(b1Local, bGM, dataCopyB1Params);
        // 将量化参数搬运到UB
        DataCopy(deqLocal, deqGM, cSize);

        inQueueA1.EnQue(a1Local);
        inQueueB1.EnQue(b1Local);
        inQueueDeq.EnQue(deqLocal);
    }
    __aicore__ inline void SplitA()
    {
        ...
    }
    __aicore__ inline void SplitB()
    {
        ...
    }
    __aicore__ inline void Compute()
    {
        LocalTensor&lt;half&gt; a2Local = inQueueA2.DeQue&lt;half&gt;();
        LocalTensor&lt;half&gt; b2Local = inQueueB2.DeQue&lt;half&gt;();
        LocalTensor&lt;float&gt; c1Local = outQueueCO1.AllocTensor&lt;float&gt;();
        MmadParams mmadParams;
        mmadParams.m = m;
        mmadParams.n = n;
        mmadParams.k = k;
        // 矩阵乘
        Mmad(c1Local, a2Local, b2Local, mmadParams); // m*n
        outQueueCO1.EnQue&lt;float&gt;(c1Local);
        inQueueA2.FreeTensor(a2Local);
        inQueueB2.FreeTensor(b2Local);
    }
    __aicore__ inline void CopyOut()
    {
        LocalTensor&lt;float&gt; c1Local = outQueueCO1.DeQue&lt;float&gt;();
        __gm__ uint8_t* usrWorkspace = AscendC::GetUserWorkspace(workspace);
        xGm.SetGlobalBuffer((__gm__ float *)(usrWorkspace));
        FixpipeParamsV220 fixpipeParams;
        fixpipeParams.nSize = n;
        fixpipeParams.mSize = m;
        fixpipeParams.srcStride = m;
        fixpipeParams.dstStride = n;
        fixpipeParams.ndNum = 1;
        fixpipeParams.srcNdStride = 0;
        fixpipeParams.dstNdStride = 0;
        // 将矩阵乘的计算结果从L0C Buffer（CO1）搬运到workspace
        Fixpipe(xGm, c1Local, fixpipeParams);
        outQueueCO1.FreeTensor(c1Local);
    }
    __aicore__ inline void CopyIn1()
    {
        // 将矩阵乘的计算结果从workspace搬运到UB
        LocalTensor&lt;float&gt; src0Local = inQueueSrc0.AllocTensor&lt;float&gt;();
        DataCopy(src0Local, xGm, cSize);
        inQueueSrc0.EnQue(src0Local);
    }
    __aicore__ inline void Compute1()
    {
        LocalTensor&lt;float&gt; src0Local = inQueueSrc0.DeQue&lt;float&gt;();
        LocalTensor&lt;half&gt; tmpLocal = inQueueTmp.AllocTensor&lt;half&gt;();
        LocalTensor&lt;half&gt; deqLocal = inQueueDeq.DeQue&lt;half&gt;();
        LocalTensor&lt;int8_t&gt; dstLocal = outQueueDst.AllocTensor&lt;int8_t&gt;();
        // 量化计算
        Cast(tmpLocal, src0Local, RoundMode::CAST_NONE, cSize);
        LocalTensor&lt;half&gt; tmpHalfBuffer = src0Local.ReinterpretCast&lt;half&gt;();
        Mul(tmpHalfBuffer, tmpLocal, deqLocal, cSize);
        Cast(dstLocal, tmpHalfBuffer, RoundMode::CAST_NONE, cSize);
        outQueueDst.EnQue&lt;int8_t&gt;(dstLocal);
        inQueueSrc0.FreeTensor(src0Local);
        inQueueTmp.FreeTensor(tmpLocal);
        inQueueDeq.FreeTensor(deqLocal);
    }
    __aicore__ inline void CopyOut1()
    {
        ...
    }
private:
    TPipe pipe;
    TQue&lt;TPosition::A1, 1&gt; inQueueA1;
    TQue&lt;TPosition::A2, 1&gt; inQueueA2;
    TQue&lt;TPosition::B1, 1&gt; inQueueB1;
    TQue&lt;TPosition::B2, 1&gt; inQueueB2;
    TQue&lt;TPosition::CO1, 1&gt; outQueueCO1;
    TQue&lt;TPosition::VECIN, 1&gt; inQueueDeq;
    TQue&lt;TPosition::VECIN, 1&gt; inQueueSrc0;
    TQue&lt;TPosition::VECCALC, 1&gt; inQueueTmp;
    TQue&lt;TPosition::VECOUT, 1&gt; outQueueDst;

    GlobalTensor&lt;half&gt; aGM;
    GlobalTensor&lt;half&gt; bGM;
    GlobalTensor&lt;float&gt; cGM;
    GlobalTensor&lt;float&gt; biasGM;
    uint16_t m = 32, k = 32, n = 32;
    uint16_t aSize, bSize, cSize;
    ...
</code></pre></div><p>【正例】</p><p>该算子对矩阵乘的结果进行量化计算时，可将量化参数搬运到FB(Fixpipe Buffer)上，调用一次Fixpipe接口实现矩阵乘结果的量化计算。</p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>...
public:
    __aicore__ inline KernelSample()
    {
        aSize = m * k;
        bSize = k * n;
        cSize = m * n;
        QuantSize = n;
    }
    __aicore__ inline void Init(__gm__ uint8_t *a, __gm__ uint8_t *b, __gm__ uint8_t *c, __gm__ uint8_t *deqTensor)
    {
        aGM.SetGlobalBuffer((__gm__ half *)a);
        bGM.SetGlobalBuffer((__gm__ half *)b);
        cGM.SetGlobalBuffer((__gm__ float *)c);
        deqGM.SetGlobalBuffer((__gm__ uint64_t *)deqTensor);
        pipe.InitBuffer(inQueueA1, 1, aSize * sizeof(half));
        pipe.InitBuffer(inQueueA2, 1, aSize * sizeof(half));
        pipe.InitBuffer(inQueueB1, 1, bSize * sizeof(half));
        pipe.InitBuffer(inQueueB2, 2, bSize * sizeof(half));
        pipe.InitBuffer(outQueueCO1, 1, cSize * sizeof(float));
        pipe.InitBuffer(inQueueDeq1, 1, QuantSize * sizeof(uint64_t));
        pipe.InitBuffer(inQueueDeq, 1, QuantSize * sizeof(uint64_t));
    }
    __aicore__ inline void Process()
    {
        CopyIn();
        SplitA();
        SplitB();
        SplitDeq();
        Compute();
        CopyOut();
    }
private:
    __aicore__ inline void CopyIn()
    {
        LocalTensor&lt;half&gt; a1Local = inQueueA1.AllocTensor&lt;half&gt;();
        LocalTensor&lt;half&gt; b1Local = inQueueB1.AllocTensor&lt;half&gt;();
        LocalTensor&lt;uint64_t&gt; deq1Local = inQueueDeq1.AllocTensor&lt;uint64_t&gt;();

        Nd2NzParams dataCopyA1Params;
        dataCopyA1Params.ndNum = 1;
        dataCopyA1Params.nValue = m;
        dataCopyA1Params.dValue = k;
        dataCopyA1Params.srcNdMatrixStride = 0;
        dataCopyA1Params.srcDValue = k;
        dataCopyA1Params.dstNzC0Stride = m;
        dataCopyA1Params.dstNzNStride = 1;
        dataCopyA1Params.dstNzMatrixStride = 0;
        DataCopy(a1Local, aGM, dataCopyA1Params);

        Nd2NzParams dataCopyB1Params;
        dataCopyB1Params.ndNum = 1;
        dataCopyB1Params.nValue = k;
        dataCopyB1Params.dValue = n;
        dataCopyB1Params.srcNdMatrixStride = 0;
        dataCopyB1Params.srcDValue = n;
        dataCopyB1Params.dstNzC0Stride = k;
        dataCopyB1Params.dstNzNStride = 1;
        dataCopyB1Params.dstNzMatrixStride = 0;
        DataCopy(b1Local, bGM, dataCopyB1Params);
        // 将量化参数搬运到L1上
        DataCopy(deq1Local, deqGM, QuantSize);

        inQueueA1.EnQue(a1Local);
        inQueueB1.EnQue(b1Local);
        inQueueDeq.EnQue(deq1Local);
    }
    __aicore__ inline void SplitA()
    {
        ...
    }
    __aicore__ inline void SplitB()
    {
        ...
    }
    __aicore__ inline void SplitDeq()
    {
        LocalTensor&lt;uint64_t&gt; deq1Local = inQueueDeq1.DeQue&lt;uint64_t&gt;();
        LocalTensor&lt;uint64_t&gt; deqLocal = inQueueDeq.AllocTensor&lt;uint64_t&gt;();
        // 将量化参数从L1-&gt;FB
        DataCopy(deqLocal, deq1Local, { 1, (uint16_t)(QuantSize * sizeof(uint64_t) / 128), 0, 0 });
        inQueueDeq.EnQue&lt;uint64_t&gt;(deqLocal);
        inQueueDeq1.FreeTensor(deq1Local);
    }
    __aicore__ inline void Compute()
    {
        LocalTensor&lt;half&gt; a2Local = inQueueA2.DeQue&lt;half&gt;();
        LocalTensor&lt;half&gt; b2Local = inQueueB2.DeQue&lt;half&gt;();
        LocalTensor&lt;float&gt; c1Local = outQueueCO1.AllocTensor&lt;float&gt;();
        MmadParams mmadParams;
        mmadParams.m = m;
        mmadParams.n = n;
        mmadParams.k = k;
        // 矩阵乘
        Mmad(c1Local, a2Local, b2Local, mmadParams); // m*n
        outQueueCO1.EnQue&lt;float&gt;(c1Local);
        inQueueA2.FreeTensor(a2Local);
        inQueueB2.FreeTensor(b2Local);
    }
    __aicore__ inline void CopyOut()
    {
        LocalTensor&lt;float&gt; c1Local = outQueueCO1.DeQue&lt;float&gt;();
        LocalTensor&lt;uint64_t&gt; deqLocal = inQueueDeq.DeQue&lt;uint64_t&gt;();
        SetFixpipeNz2ndFlag(1, 0, 0);
        DataCopyCO12DstParams dataCopyParams;
        dataCopyParams.nSize = n;
        dataCopyParams.mSize = m;
        dataCopyParams.srcStride = m;
        dataCopyParams.dstStride = n;
        dataCopyParams.quantPre = QuantMode_t::VQF322B8_PRE;
        dataCopyParams.nz2ndEn = true;
        // 将矩阵乘进行量化后的计算结果搬出
        DataCopy(cGM, c1Local, DataCopyCO12DstParams);
        outQueueCO1.FreeTensor(c1Local);
    }

private:
    TPipe pipe;
    TQue&lt;QuePosition::A1, 1&gt; inQueueA1;
    TQue&lt;QuePosition::A2, 1&gt; inQueueA2;
    TQue&lt;QuePosition::B1, 1&gt; inQueueB1;
    TQue&lt;QuePosition::B2, 1&gt; inQueueB2;
    TQue&lt;QuePosition::C1, 1&gt; inQueueDeq1;
    TQue&lt;QuePosition::C2PIPE2GM, 1&gt; inQueueDeq;
    TQue&lt;QuePosition::CO1, 1&gt; outQueueCO1;
    GlobalTensor&lt;half&gt; aGM;
    GlobalTensor&lt;half&gt; bGM;
    GlobalTensor&lt;float&gt; cGM;
    GlobalTensor&lt;uint64_t&gt; deqTensorGM;
    uint16_t m = 32, k = 32, n = 32;
    uint16_t aSize, bSize, cSize, QuantSize;
    ...
</code></pre></div></article></div>`,1)])])}const g=e(r,[["render",u]]);export{f as __pageData,g as default};
