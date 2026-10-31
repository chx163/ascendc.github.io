import{_ as e,o as n,a as t,b as i}from"./app.DKoEZOcr.js";const o="/ascendc.github.io/pr/5487/assets/bad_flow_80.kMAWCeXe.png",l="/ascendc.github.io/pr/5487/assets/good_dataflow_81.CU-VHe9n.png",f=JSON.parse('{"title":"","description":"","frontmatter":{"breadcrumbs":[{"text":"Ascend C算子开发指南","link":"/guide/getting_started/ascend_c_overview_and_learning_path"},{"text":"算子实践参考","link":"/guide/operator_practice/document_structure"},{"text":"SIMD算子性能优化","link":"/guide/operator_practice/simd_operator_optimization/simd_operator_optimization"},{"text":"矩阵计算","link":"/guide/operator_practice/simd_operator_optimization/matrix_compute/matrix_compute"},{"text":"通过L0C Buffer数据暂存实现高效的矩阵乘结果累加","link":"/guide/operator_practice/simd_operator_optimization/matrix_compute/l0c_buffer_matmul_accumulate"}]},"headers":[],"relativePath":"guide/operator_practice/simd_operator_optimization/matrix_compute/l0c_buffer_matmul_accumulate.md","filePath":"guide/operator_practice/simd_operator_optimization/matrix_compute/l0c_buffer_matmul_accumulate.md","lastUpdated":1787050286000}'),r={name:"guide/operator_practice/simd_operator_optimization/matrix_compute/l0c_buffer_matmul_accumulate.md"};function u(s,a,c,p,m,_){return n(),t("div",null,[...a[0]||(a[0]=[i('<div><article class="markdown-body"><h1>通过L0C Buffer数据暂存实现高效的矩阵乘结果累加<span id="ZH-CN_TOPIC_0000001918025254"></span></h1><p>【优先级】高 __</p><p>【描述】算子实现中对矩阵乘的结果进行累加时（比如矩阵A1 * B1 + A2 * B2...结果的累加），可将前一次矩阵乘的结果暂存在L0C Buffer（CO1）上，调用Mmad接口实现矩阵乘结果累加。相比于每次矩阵乘的结果从L0C Buffer（CO1）搬运到GM上，再搬运到Unified Buffer（UB）上进行累加计算，可减少数据搬运的次数，提升内存使用效率。</p><p><strong>图1</strong> 反例数据流图<span id="fig1739115131882"></span><br><img src="'+o+'" alt title="反例数据流图-80"></p><p><strong>图2</strong> 正例数据流图<span id="fig1831565712115"></span><br><img src="'+l+`" alt title="正例数据流图-81"></p><p>【反例】</p><p>优化前，算子进行2次矩阵乘结果累加的过程如下：</p><ul><li>将前一次矩阵乘的计算结果从L0C Buffer（CO1）搬运到workspace上，再从workspace搬运到UB上；</li><li>下一次矩阵乘计算重复完成上述步骤将结果搬运到UB上；</li><li>在UB上将2次矩阵乘的结果相加。</li></ul><p>当需要累加n次矩阵乘时，分别增加了n次L0C Buffer（CO1）-&gt;workspace、workspace-&gt;UB搬运以及n次Add运算。</p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>...
// 该样例仅做示例说明，非完整代码，省略了部分同步控制代码
public:
    __aicore__ inline KernelSample()
    {
        aSize = m * k;
        bSize = k * n;
        cSize = m * n;
    }
    __aicore__ inline void Init(__gm__ uint8_t *a, __gm__ uint8_t *b, __gm__ uint8_t *c)
    {
        aGM.SetGlobalBuffer((__gm__ half *)a);
        bGM.SetGlobalBuffer((__gm__ half *)b);
        cGM.SetGlobalBuffer((__gm__ float *)c);
        pipe.InitBuffer(inQueueA1, 1, aSize * sizeof(half));
        pipe.InitBuffer(inQueueA2, 1, aSize * sizeof(half));
        pipe.InitBuffer(inQueueB1, 1, bSize * sizeof(half));
        pipe.InitBuffer(inQueueB2, 2, bSize * sizeof(half));
        pipe.InitBuffer(outQueueCO1, 1, cSize * sizeof(float));
        pipe.InitBuffer(inQueueSrc0, 1, cSize * sizeof(float));
        pipe.InitBuffer(inQueueSrc1, 1, cSize * sizeof(float));
        pipe.InitBuffer(outQueueDst, 1, cSize * sizeof(float));

    }
    __aicore__ inline void Process()
    {
        // 第一次矩阵乘计算
        CopyIn();
        SplitA();
        SplitB();
        Compute();
        // 将第一次矩阵乘的结果搬出
        CopyOut();
        // 将第一次矩阵乘的结果搬运到UB
        CopyIn1();
        // 第二次矩阵乘计算
        Compute1();
        // 将第一次矩阵乘的结果搬出
        CopyOut1();
        // 将第二次矩阵乘的结果搬运到UB
        CopyIn1();
        // 将两次矩阵乘的结果累加
        Compute2();
        CopyOut2();
    }
private:
    __aicore__ inline void CopyIn()
    {
        LocalTensor&lt;half&gt; a1Local = inQueueA1.AllocTensor&lt;half&gt;();
        LocalTensor&lt;half&gt; b1Local = inQueueB1.AllocTensor&lt;half&gt;();

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

        inQueueA1.EnQue&lt;half&gt;(a1Local);
        inQueueB1.EnQue&lt;half&gt;(b1Local);
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
        Mmad(c1Local, a2Local, b2Local, mmadParams);
        outQueueCO1.EnQue&lt;float&gt;(c1Local);
        inQueueA2.EnQue&lt;half&gt;(a2Local);
        inQueueB2.EnQue&lt;half&gt;(b2Local);
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
        outQueueCO1.EnQue&lt;float&gt;(c1Local);
    }
    __aicore__ inline void CopyIn1()
    {
        LocalTensor&lt;float&gt; src0Local = inQueueSrc0.AllocTensor&lt;float&gt;();
        // 将矩阵乘的计算结果从workspace搬运到UB
        DataCopy(src0Local, xGm, cSize);
        inQueueSrc0.EnQue&lt;float&gt;(src0Local);
    }
    __aicore__ inline void Compute1()
    {
        LocalTensor&lt;half&gt; a2Local = inQueueA2.DeQue&lt;half&gt;();
        LocalTensor&lt;half&gt; b2Local = inQueueB2.DeQue&lt;half&gt;();
        LocalTensor&lt;float&gt; c1Local = outQueueCO1.DeQue&lt;float&gt;();
        MmadParams mmadParams;
        mmadParams.m = m;
        mmadParams.n = n;
        mmadParams.k = k;
        // 矩阵乘
        Mmad(c1Local, a2Local, b2Local, mmadParams);
        outQueueCO1.EnQue&lt;float&gt;(c1Local);
        inQueueA2.FreeTensor(a2Local);
        inQueueB2.FreeTensor(b2Local);
    }
    __aicore__ inline void CopyOut1()
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
        // 将矩阵乘的计算结果从L0C Buffer（CO1）搬运到workspace
        Fixpipe(xGm, c1Local, fixpipeParams);
        outQueueCO1.FreeTensor(c1Local);
    }
    __aicore__ inline void CopyIn2()
    {
        PipeBarrier&lt;PIPE_ALL&gt;();
        LocalTensor&lt;float&gt; src1Local = inQueueSrc1.AllocTensor&lt;float&gt;();
        // 将矩阵乘的计算结果从workspace搬运到UB
        DataCopy(src1Local, xGm, cSize);
        inQueueSrc1.EnQue&lt;float&gt;(src1Local);
    }
    __aicore__ inline void Compute2()
    {
        LocalTensor&lt;float&gt; src0Local = inQueueSrc0.DeQue&lt;float&gt;();
        LocalTensor&lt;float&gt; src1Local = inQueueSrc1.DeQue&lt;float&gt;();
        LocalTensor&lt;float&gt; dstLocal = outQueueDst.AllocTensor&lt;float&gt;();
        // 两次矩阵乘的结果相加
        Add(dstLocal, src0Local, src1Local, cSize);
        outQueueDst.EnQue&lt;float&gt;(dstLocal);
        inQueueSrc0.FreeTensor(src0Local);
        inQueueSrc1.FreeTensor(src1Local);
    }
    __aicore__ inline void CopyOut2()
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
    TQue&lt;TPosition::VECIN, 1&gt; inQueueSrc0;
    TQue&lt;TPosition::VECIN, 1&gt; inQueueSrc1;
    TQue&lt;TPosition::VECOUT, 1&gt; outQueueDst;

    GlobalTensor&lt;half&gt; aGM;
    GlobalTensor&lt;half&gt; bGM;
    GlobalTensor&lt;float&gt; cGM;
    uint16_t m = 32, k = 32, n = 32;
    uint16_t aSize, bSize, cSize;  
...
</code></pre></div><p>【正例】</p><p>通过优化，算子对矩阵乘结果累加时，可将前一次矩阵乘的结果暂存在L0C上，通过Mmad接口参数cmatrixInitVal和cmatrixSource配置C矩阵的初始值，只调用2次Mmad接口实现2次矩阵乘结果累加。</p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>...
// 该样例仅做示例说明，非完整代码，省略了部分同步控制代码
public:
    __aicore__ inline KernelSample()
    {
        aSize = m * k;
        bSize = k * n;
        cSize = m * n;
    }
    __aicore__ inline void Init(__gm__ uint8_t *a, __gm__ uint8_t *b, __gm__ uint8_t *c)
    {
        aGM.SetGlobalBuffer((__gm__ half *)a);
        bGM.SetGlobalBuffer((__gm__ half *)b);
        cGM.SetGlobalBuffer((__gm__ float *)c);
        pipe.InitBuffer(inQueueA1, 1, aSize * sizeof(half));
        pipe.InitBuffer(inQueueA2, 1, aSize * sizeof(half));
        pipe.InitBuffer(inQueueB1, 1, bSize * sizeof(half));
        pipe.InitBuffer(inQueueB2, 2, bSize * sizeof(half));
        pipe.InitBuffer(outQueueCO1, 1, cSize * sizeof(float));
    }
    __aicore__ inline void Process()
    {
        CopyIn();
        SplitA();
        SplitB();
        Compute();
        CopyOut();
    }
private:
    __aicore__ inline void CopyIn()
    {
        LocalTensor&lt;half&gt; a1Local = inQueueA1.AllocTensor&lt;half&gt;();
        LocalTensor&lt;half&gt; b1Local = inQueueB1.AllocTensor&lt;half&gt;();

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

        inQueueA1.EnQue(a1Local);
        inQueueB1.EnQue(b1Local);
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
        // 第一次矩阵乘
        Mmad(c1Local, a2Local, b2Local, mmadParams);
        PipeBarrier&lt;PIPE_M&gt;();
        // 第二次矩阵乘累加第一次矩阵乘的结果
        mmadParams.cmatrixInitVal = false;
        Mmad(c1Local, a2Local, b2Local, c1Local, mmadParams);
        outQueueCO1.EnQue&lt;float&gt;(c1Local);
        inQueueA2.FreeTensor(a2Local);
        inQueueB2.FreeTensor(b2Local);
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

    GlobalTensor&lt;half&gt; aGM;
    GlobalTensor&lt;half&gt; bGM;
    GlobalTensor&lt;dst_T&gt; cGM;
    uint16_t m = 32, k = 32, n = 32;
    uint16_t aSize, bSize, cSize;
</code></pre></div></article></div>`,1)])])}const g=e(r,[["render",u]]);export{f as __pageData,g as default};
