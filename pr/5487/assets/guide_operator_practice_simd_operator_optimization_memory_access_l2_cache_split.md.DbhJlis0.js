import{_ as n,o as t,a,b as i}from"./app.DKoEZOcr.js";const o="/ascendc.github.io/pr/5487/assets/no_l2_cache_split.BY-VBjIk.png",_="/ascendc.github.io/pr/5487/assets/l2_cache_split.DyyvDkUS.png",d=JSON.parse('{"title":"","description":"","frontmatter":{"breadcrumbs":[{"text":"Ascend C算子开发指南","link":"/guide/getting_started/ascend_c_overview_and_learning_path"},{"text":"算子实践参考","link":"/guide/operator_practice/document_structure"},{"text":"SIMD算子性能优化","link":"/guide/operator_practice/simd_operator_optimization/simd_operator_optimization"},{"text":"内存访问","link":"/guide/operator_practice/simd_operator_optimization/memory_access/memory_access"},{"text":"L2 Cache切分","link":"/guide/operator_practice/simd_operator_optimization/memory_access/l2_cache_split"}]},"headers":[],"relativePath":"guide/operator_practice/simd_operator_optimization/memory_access/l2_cache_split.md","filePath":"guide/operator_practice/simd_operator_optimization/memory_access/l2_cache_split.md","lastUpdated":1786954352000}'),c={name:"guide/operator_practice/simd_operator_optimization/memory_access/l2_cache_split.md"};function l(s,e,r,p,L,h){return t(),a("div",null,[...e[0]||(e[0]=[i('<div><article class="markdown-body"><h1>L2 Cache切分<span id="ZH-CN_TOPIC_0000001893038949"></span></h1><p>【优先级】：高</p><p>【描述】假设，AI处理器的L2 Cache大小为192MB，L2 Cache读写混合带宽约为7TB/s，而GM的带宽约为1.6TB/s，两者之间存在较大差距。搬入或搬出相同数据量的情况下，访问L2 Cache读写数据比GM更快。若数据无法命中L2 Cache，即需要访问的数据不在L2 Cache内，导致需要去GM上读写，带宽利用效率较低，最终算子搬入或搬出数据变为算子整个运行过程的性能瓶颈。切分策略建议：当输入和输出数据的数据量超过L2 Cache大小时，Tiling中开启L2 Cache切分策略。</p><p>【反例】</p><p>假设输入数据大小为InputTotalSize，L2 Cache大小为L2CacheSize，InputTotalSize = L2CacheSize * 2，总核数为20个核，数据未切分，整体一次完成计算。假设20个核一次可以处理共L2CacheSize的数据，则每个核至少两次读取输入数据。</p><p><strong>图1</strong> 未开启L2 Cache切分<span id="fig126831114552"></span><br><img src="'+o+`" alt title="未开启L2-Cache切分"></p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>constexpr int32_t TOTAL_LENGTH = InputTotalSize / sizeof(half);
constexpr int32_t USE_CORE_NUM = 20;
constexpr int32_t TILE_NUM = 2;
constexpr int32_t BLOCK_LENGTH = TOTAL_LENGTH / USE_CORE_NUM;
constexpr int32_t TILE_LENGTH = BLOCK_LENGTH / TILE_NUM;

class KernelSample {
public:
    __aicore__ inline KernelSample() {}
    __aicore__ inline void Init(__gm__ uint8_t* x)
    {
        xGm.SetGlobalBuffer((__gm__ half*)x + BLOCK_LENGTH * GetBlockIdx(), BLOCK_LENGTH);
        yGm.SetGlobalBuffer((__gm__ half*)y + BLOCK_LENGTH * GetBlockIdx(), BLOCK_LENGTH);
        pipe.InitBuffer(inQueueX, 1, BLOCK_LENGTH * sizeof(half));
        pipe.InitBuffer(inQueueY, 1, BLOCK_LENGTH * sizeof(half));
    }
    __aicore__ inline void Process()
    {
        // 示例演示对输入数据加2的运算
        constexpr int32_t loopCount = 2;
        for (int32_t i = 0; i &lt; loopCount; i++) {
            // 外层的每次循环对输入数据进行加1的运算
            for (int32_t j = 0; j &lt; TILE_NUM; j++) {
                // 内层循环分别处理每个核第0块和第1块数据
                CopyIn(j);
                Compute();
                CopyOut(j);
            }
        }
    }
private:
    __aicore__ inline void CopyIn(int32_t process)
    {
        LocalTensor&lt;half&gt; xLocal = inQueueX.AllocTensor&lt;half&gt;();
        // 对于每个核，除了首次读取外，读取第0块数据时，L2 Cache内缓存的是第1块数据；
        // 对于每个核，读取第1块数据时，L2 Cache内缓存的是第0块数据；
        // 每个核需要4次读取GM上的数据
        DataCopy(xLocal, xGm[process * TILE_LENGTH], TILE_LENGTH );
        inQueueX.EnQue(xLocal);
    }
    __aicore__ inline void Compute()
    {
        LocalTensor&lt;half&gt; yLocal = inQueueY.AllocTensor&lt;half&gt;();
        LocalTensor&lt;half&gt; xLocal = inQueueX.DeQue&lt;half&gt;();
        Adds(yLocal, xLocal, 1, TILE_LENGTH);   
        inQueueY.EnQue&lt;half&gt;(yLocal);
        inQueueX.FreeTensor(xLocal);
    }
    __aicore__ inline void CopyOut(int32_t process)
    {
        LocalTensor&lt;half&gt; yLocal = inQueueY.DeQue&lt;half&gt;();
        DataCopy(yGm[process * TILE_LENGTH], yLocal, TILE_LENGTH);
        inQueueY.FreeTensor(yLocal);
    }
}
...
</code></pre></div><p>【正例】</p><p>假设输入数据大小为InputTotalSize，L2 Cache大小为L2CacheSize，InputTotalSize = L2CacheSize * 2，能使用的总核数为20个核，输入数据均等切分成2份数据，则整体分两次进行计算，每次的计算量为L2CacheSize，第一次20个核先计算前L2CacheSize个数据，第二次20个核计算后L2CacheSize个数据。每次计算前读取的数据能够命中L2 Cache，提升算子性能。</p><p><strong>图2</strong> 开启L2 Cache切分<span id="fig1623673819553"></span><br><img src="`+_+`" alt title="开启L2-Cache切分"></p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>constexpr int32_t TOTAL_LENGTH = InputTotalSize / sizeof(half);
constexpr int32_t TILE_NUM = 2;
constexpr int32_t USE_CORE_NUM = 20;
constexpr int32_t TILE_LENGTH = TOTAL_LENGTH / TILE_NUM;
constexpr int32_t BLOCK_LENGTH = TILE_LENGTH / USE_CORE_NUM;

class KernelSample {
public:
    __aicore__ inline KernelSample() {}
    __aicore__ inline void Init(__gm__ uint8_t* x, __gm__ uint8_t* y, int32_t index)
    {
        xGm.SetGlobalBuffer((__gm__ half*)x + BLOCK_LENGTH * GetBlockIdx() + index * TILE_LENGTH, BLOCK_LENGTH);
        yGm.SetGlobalBuffer((__gm__ half*)y + BLOCK_LENGTH * GetBlockIdx() + index * TILE_LENGTH, BLOCK_LENGTH);
        pipe.InitBuffer(inQueueX, 1, BLOCK_LENGTH * sizeof(half));
        pipe.InitBuffer(inQueueY, 1, BLOCK_LENGTH * sizeof(half));
    }
    __aicore__ inline void Process()
    {
        // 示例演示对输入数据加2的运算
        constexpr int32_t loopCount = 2;
        for (int32_t i = 0; i &lt; loopCount; i++) {
            // 每次循环对输入数据进行加1的运算
            CopyIn();
            Compute();
            CopyOut();
        }
    }
private:
    __aicore__ inline void CopyIn()
    {
        LocalTensor&lt;half&gt; xLocal = inQueueX.AllocTensor&lt;half&gt;();
        // 对于每个核，除了首次读取外，第二次读取可以命中L2 Cache；
        // 每个核2次读取GM上的数据，2次访问L2 Cache读数据
        DataCopy(xLocal, xGm, BLOCK_LENGTH );
        inQueueX.EnQue(xLocal);
    }
    __aicore__ inline void Compute()
    {
        LocalTensor&lt;half&gt; yLocal = inQueueY.AllocTensor&lt;half&gt;();
        LocalTensor&lt;half&gt; xLocal = inQueueX.DeQue&lt;half&gt;();
        Adds(yLocal, xLocal, 1, BLOCK_LENGTH);   
        inQueueY.EnQue&lt;half&gt;(yLocal);
        inQueueX.FreeTensor(xLocal);
    }
    __aicore__ inline void CopyOut()
    {
        LocalTensor&lt;half&gt; yLocal = inQueueY.DeQue&lt;half&gt;();
        DataCopy(yGm, yLocal, BLOCK_LENGTH);
        inQueueY.FreeTensor(yLocal);
    }
}
...

extern &quot;C&quot; __global__ __aicore__ void simple_kernel(__gm__ uint8_t* srcGm, __gm__ uint8_t* dstGm)
{
    AscendC::KernelSample op;
    // 输入数据均等切分成2份数据进行计算
    for (int32_t i = 0; i &lt; TILE_NUM; i++) {
        op.Init(srcGm, dstGm, i);
        op.Process();
    }
}
...
</code></pre></div><p>更多完整样例请参考<a href="https://gitcode.com/cann/asc-devkit/tree/master/examples/01_simd_cpp_api/04_advanced_api/00_matmul/matmul_l2cache">L2 Cache切分的算子样例</a>。</p></article></div>`,1)])])}const T=n(c,[["render",l]]);export{d as __pageData,T as default};
