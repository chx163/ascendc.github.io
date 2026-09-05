import{_ as e,o as n,a as t,b as i}from"./app.C41L12d5.js";const o="/ascendc.github.io/assets/bad_flow.BjtcSQFH.png",l="/ascendc.github.io/assets/good_dataflow.BQ3RdAJK.png",f=JSON.parse('{"title":"","description":"","frontmatter":{"breadcrumbs":[{"text":"Ascend C算子开发指南","link":"/guide/getting_started/ascend_c_overview_and_learning_path"},{"text":"算子实践参考","link":"/guide/operator_practice/document_structure"},{"text":"SIMD算子性能优化","link":"/guide/operator_practice/simd_operator_optimization/simd_operator_optimization"},{"text":"矩阵计算","link":"/guide/operator_practice/simd_operator_optimization/matrix_compute/matrix_compute"},{"text":"通过BT Buffer实现高效的bias计算","link":"/guide/operator_practice/simd_operator_optimization/matrix_compute/bt_buffer_bias_compute"}]},"headers":[],"relativePath":"guide/operator_practice/simd_operator_optimization/matrix_compute/bt_buffer_bias_compute.md","filePath":"guide/operator_practice/simd_operator_optimization/matrix_compute/bt_buffer_bias_compute.md","lastUpdated":1787050286000}'),r={name:"guide/operator_practice/simd_operator_optimization/matrix_compute/bt_buffer_bias_compute.md"};function s(u,a,p,c,_,d){return n(),t("div",null,[...a[0]||(a[0]=[i('<div><article class="markdown-body"><h1>通过BT Buffer实现高效的bias计算<span id="ZH-CN_TOPIC_0000001918185182"></span></h1><p>【优先级】高</p><p>【描述】算子中进行带bias的矩阵乘计算时，可将bias数据搬运至Bias Table Buffer（C2）上，调用一次Mmad接口实现矩阵乘加bias的计算，或者直接调用Matmul高阶API完成功能。相比于先将矩阵乘的结果从L0C Buffer（CO1）搬运到GM上，再搬运到Unified Buffer（UB）上进行加bias的过程，减少了数据搬运的次数，可提升内存使用效率。数据流图对比如下：</p><p><strong>图1</strong> 反例数据流图<span id="fig1598718171213"></span><br><img src="'+o+'" alt title="反例数据流图"></p><p><strong>图2</strong> 正例数据流图<span id="fig12618184193220"></span><br><img src="'+l+`" alt title="正例数据流图"></p><p>【反例】</p><p>该算子进行带bias的矩阵乘计算时，过程如下：</p><ul><li>将矩阵乘的计算结果从L0C Buffer（CO1）搬运到workspace上；</li><li>从workspace搬运到UB上；</li><li>在UB上进行加bias的运算；</li><li>最后将结果搬运到GM。</li></ul><p>当循环n次该计算过程，则分别增加了n次L0C Buffer（CO1）-&gt;workspace、workspace-&gt;UB的搬运。</p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>// 该样例仅做示例说明，非完整代码，省略了部分同步控制代码
public:
    __aicore__ inline KernelSample()
    {
        aSize = m * k;
        bSize = k * n;
        cSize = m * n;
    }
    __aicore__ inline void Init(__gm__ uint8_t *a, __gm__ uint8_t *b, __gm__ uint8_t *bias, __gm__ uint8_t *c)
    {
        aGM.SetGlobalBuffer((__gm__ half *)a);
        bGM.SetGlobalBuffer((__gm__ half *)b);
        cGM.SetGlobalBuffer((__gm__ float *)c);
        biasGM.SetGlobalBuffer((__gm__ float *)bias);
        pipe.InitBuffer(inQueueA1, 1, aSize * sizeof(half));
        pipe.InitBuffer(inQueueA2, 1, aSize * sizeof(half));
        pipe.InitBuffer(inQueueB1, 1, bSize * sizeof(half));
        pipe.InitBuffer(inQueueB2, 2, bSize * sizeof(half));
        pipe.InitBuffer(outQueueCO1, 1, cSize * sizeof(float));
        pipe.InitBuffer(inQueueBias, 1, n * sizeof(float));
        pipe.InitBuffer(inQueueSrc0, 1, cSize * sizeof(float));
        pipe.InitBuffer(outQueueDst, 1, cSize * sizeof(float));

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
        LocalTensor&lt;float&gt; biasLocal = inQueueBias.AllocTensor&lt;float&gt;();

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
        // 将bias搬运到UB
        DataCopy(biasLocal, biasGM, n);

        inQueueA1.EnQue(a1Local);
        inQueueB1.EnQue(b1Local);
        inQueueBias.EnQue(biasLocal);
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
        PipeBarrier&lt;PIPE_ALL&gt;();
        // 将矩阵乘的计算结果从workspace搬运到UB
        LocalTensor&lt;float&gt; src0Local = inQueueSrc0.AllocTensor&lt;float&gt;();
        DataCopy(src0Local, xGm, cSize);
        inQueueSrc0.EnQue(src0Local);
    }
    __aicore__ inline void Compute1()
    {
        LocalTensor&lt;float&gt; src0Local = inQueueSrc0.DeQue&lt;float&gt;();
        LocalTensor&lt;float&gt; biasLocal = inQueueBias.DeQue&lt;float&gt;();
        LocalTensor&lt;float&gt; dstLocal = outQueueDst.AllocTensor&lt;float&gt;();
        BinaryRepeatParams addRepeatParams;
        addRepeatParams.dstRepStride = 8;
        addRepeatParams.src0RepStride = 8;
        addRepeatParams.src1RepStride = 0;
        // 加bias的运算
        Add(dstLocal, src0Local, biasLocal, 32, m, addRepeatParams);
        outQueueDst.EnQue&lt;float&gt;(dstLocal);
        inQueueSrc0.FreeTensor(src0Local);
        inQueueBias.FreeTensor(biasLocal);
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
    TQue&lt;TPosition::VECIN, 1&gt; inQueueBias;
    TQue&lt;TPosition::VECIN, 1&gt; inQueueSrc0;
    TQue&lt;TPosition::VECOUT, 1&gt; outQueueDst;

    GlobalTensor&lt;half&gt; aGM;
    GlobalTensor&lt;half&gt; bGM;
    GlobalTensor&lt;float&gt; cGM;
    GlobalTensor&lt;float&gt; biasGM;
    uint16_t m = 32, k = 32, n = 32;
    uint16_t aSize, bSize, cSize;  
...
</code></pre></div><p>【正例】</p><p>该算子进行带bias的矩阵乘计算时，先将bias搬运到BT上，调用一次Mmad接口实现矩阵乘加bias的计算。</p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>...
// 该样例仅做示例说明，非完整代码，省略了部分同步控制代码
public:
    __aicore__ inline KernelSample()
    {
        aSize = m * k;
        bSize = k * n;
        cSize = m * n;
    }
    __aicore__ inline void Init(__gm__ uint8_t *a, __gm__ uint8_t *b, __gm__ uint8_t *bias, __gm__ uint8_t *c)
    {
        aGM.SetGlobalBuffer((__gm__ half *)a);
        bGM.SetGlobalBuffer((__gm__ half *)b);
        cGM.SetGlobalBuffer((__gm__ float *)c);
        biasGM.SetGlobalBuffer((__gm__ float *)bias);
        pipe.InitBuffer(inQueueA1, 1, aSize * sizeof(half));
        pipe.InitBuffer(inQueueA2, 1, aSize * sizeof(half));
        pipe.InitBuffer(inQueueB1, 1, bSize * sizeof(half));
        pipe.InitBuffer(inQueueB2, 2, bSize * sizeof(half));
        pipe.InitBuffer(outQueueCO1, 1, cSize * sizeof(float));
        pipe.InitBuffer(inQueueC1, 1, n * sizeof(float));
        pipe.InitBuffer(outQueueC2, 1, n * sizeof(float));
    }
    __aicore__ inline void Process()
    {
        CopyIn();
        SplitA();
        SplitB();
        SplitBias();
        Compute();
        CopyOut();
    }
private:
    __aicore__ inline void CopyIn()
    {
        LocalTensor&lt;half&gt; a1Local = inQueueA1.AllocTensor&lt;half&gt;();
        LocalTensor&lt;half&gt; b1Local = inQueueB1.AllocTensor&lt;half&gt;();
        LocalTensor&lt;float&gt; bias1Local = inQueueC1.AllocTensor&lt;float&gt;();

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
        // 将bias从GM搬运到L1
        DataCopy(bias1Local, biasGM, n);

        inQueueA1.EnQue(a1Local);
        inQueueB1.EnQue(b1Local);
        inQueueC1.EnQue(bias1Local);
    }
    __aicore__ inline void SplitA()
    {
        ...
    }
    __aicore__ inline void SplitB()
    {
        ...
    }
    __aicore__ inline void SplitBias()
    {
        LocalTensor&lt;float&gt; bias1Local = inQueueC1.DeQue&lt;float&gt;();
        LocalTensor&lt;float&gt; bias2Local = outQueueC2.AllocTensor&lt;float&gt;();
        // 将bias从L1搬运到BT
        DataCopy(bias2Local, bias1Local, { 1, (uint16_t)(n * sizeof(float) / 64), 0, 0 });
        outQueueC2.EnQue&lt;float&gt;(bias2Local);
        inQueueC1.FreeTensor(bias1Local);
    }
    __aicore__ inline void Compute()
    {
        LocalTensor&lt;half&gt; a2Local = inQueueA2.DeQue&lt;half&gt;();
        LocalTensor&lt;half&gt; b2Local = inQueueB2.DeQue&lt;half&gt;();
        LocalTensor&lt;float&gt; bias2Local = outQueueC2.DeQue&lt;float&gt;();
        LocalTensor&lt;float&gt; c1Local = outQueueCO1.AllocTensor&lt;float&gt;();
        MmadParams mmadParams;
        mmadParams.m = m;
        mmadParams.n = n;
        mmadParams.k = k;
        mmadParams.cmatrixInitVal = false;
        // 矩阵乘
        Mmad(c1Local, a2Local, b2Local, bias2Local, mmadParams);
        outQueueCO1.EnQue&lt;float&gt;(c1Local);
        inQueueA2.FreeTensor(a2Local);
        inQueueB2.FreeTensor(b2Local);
        outQueueC2.FreeTensor(bias2Local);
    }
    __aicore__ inline void CopyOut()
    {
        LocalTensor&lt;float&gt; c1Local = outQueueCO1.DeQue&lt;float&gt;();
        FixpipeParamsV220 fixpipeParams;
        fixpipeParams.nSize = n;
        fixpipeParams.mSize = m;
        fixpipeParams.srcStride = m;
        fixpipeParams.dstStride = n;

        fixpipeParams.ndNum = 1;
        fixpipeParams.srcNdStride = 0;
        fixpipeParams.dstNdStride = 0;
        Fixpipe(cGM, c1Local, fixpipeParams);
        outQueueCO1.FreeTensor(c1Local);
    }
private:
    TPipe pipe;
    TQue&lt;TPosition::A1, 1&gt; inQueueA1;
    TQue&lt;TPosition::A2, 1&gt; inQueueA2;
    TQue&lt;TPosition::B1, 1&gt; inQueueB1;
    TQue&lt;TPosition::B2, 1&gt; inQueueB2;
    TQue&lt;TPosition::CO1, 1&gt; outQueueCO1;
    TQue&lt;TPosition::C1, 1&gt; inQueueC1;
    TQue&lt;TPosition::C2, 1&gt; outQueueC2;

    GlobalTensor&lt;half&gt; aGM;
    GlobalTensor&lt;half&gt; bGM;
    GlobalTensor&lt;float&gt; cGM;
    GlobalTensor&lt;float&gt; biasGM;
    uint16_t m = 32, k = 32, n = 32;
    uint16_t aSize, bSize, cSize;
</code></pre></div></article></div>`,1)])])}const b=e(r,[["render",s]]);export{f as __pageData,b as default};
