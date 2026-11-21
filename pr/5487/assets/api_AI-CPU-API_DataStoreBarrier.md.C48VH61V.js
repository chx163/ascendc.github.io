import{_ as e,o as n,a,b as l}from"./app.DKoEZOcr.js";const _=JSON.parse('{"title":"","description":"","frontmatter":{"breadcrumbs":[{"text":"Ascend C API","link":"/api/api_list"},{"text":"AI CPU API","link":"/api/AI-CPU-API/AI-CPU-API"},{"text":"DataStoreBarrier","link":"/api/AI-CPU-API/DataStoreBarrier"}]},"headers":[],"relativePath":"api/AI-CPU-API/DataStoreBarrier.md","filePath":"api/AI-CPU-API/DataStoreBarrier.md","outlineHeaders":[{"level":2,"title":"产品支持情况","slug":"产品支持情况","link":"#产品支持情况"},{"level":2,"title":"功能说明","slug":"功能说明","link":"#功能说明"},{"level":2,"title":"需要包含的头文件","slug":"需要包含的头文件","link":"#需要包含的头文件"},{"level":2,"title":"函数原型","slug":"函数原型","link":"#函数原型"},{"level":2,"title":"参数说明","slug":"参数说明","link":"#参数说明"},{"level":2,"title":"返回值说明","slug":"返回值说明","link":"#返回值说明"},{"level":2,"title":"约束说明","slug":"约束说明","link":"#约束说明"},{"level":2,"title":"调用示例","slug":"调用示例","link":"#调用示例"}],"lastUpdated":1787050286000}'),i={name:"api/AI-CPU-API/DataStoreBarrier.md"};function s(o,t,r,c,d,h){return n(),a("div",null,[...t[0]||(t[0]=[l(`<div><article class="markdown-body"><h1>DataStoreBarrier<span id="ZH-CN_TOPIC_0000002517444769"></span></h1><h2 id="产品支持情况">产品支持情况<a class="header-anchor" href="#产品支持情况">​</a></h2><ul><li>Ascend 950PR/Ascend 950DT：支持</li><li>Atlas A3 训练系列产品/Atlas A3 推理系列产品：支持</li><li>Atlas A2 训练系列产品/Atlas A2 推理系列产品：支持</li><li>Atlas 200I/500 A2 推理产品：不支持</li><li>Atlas 推理系列产品AI Core：不支持</li><li>Atlas 推理系列产品Vector Core：不支持</li><li>Atlas 训练系列产品：不支持</li></ul><h2 id="功能说明">功能说明<span id="section259105813316"></span><a class="header-anchor" href="#功能说明">​</a></h2><p>数据同步屏障指令，该指令会阻塞当前线程执行，确保所有先前的写内存操作完成并对其它硬件单元可见后，才继续执行后续指令。用于AI CPU与AI Core多核之间的数据一致性。</p><h2 id="需要包含的头文件">需要包含的头文件<span id="section78885814919"></span><a class="header-anchor" href="#需要包含的头文件">​</a></h2><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>#include &quot;aicpu_api.h&quot;
</code></pre></div><h2 id="函数原型">函数原型<span id="section2067518173415"></span><a class="header-anchor" href="#函数原型">​</a></h2><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>DataStoreBarrier(void)
</code></pre></div><h2 id="参数说明">参数说明<span id="section158061867342"></span><a class="header-anchor" href="#参数说明">​</a></h2><p>无</p><h2 id="返回值说明">返回值说明<span id="section640mcpsimp"></span><a class="header-anchor" href="#返回值说明">​</a></h2><p>无</p><h2 id="约束说明">约束说明<span id="section43265506459"></span><a class="header-anchor" href="#约束说明">​</a></h2><ul><li>该接口仅支持通过&lt;&lt;&lt;...&gt;&gt;&gt;调用，并在异构编译场景使用。</li></ul><h2 id="调用示例">调用示例<span id="section82241477610"></span><a class="header-anchor" href="#调用示例">​</a></h2><p>在AI CPU算子核函数（Kernel）侧实现代码中调用AscendC::DataStoreBarrier()，确保AI CPU算子对Tiling数据的修改写入内存，使得AI Core算子能够正确读取Tiling数据：</p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>namespace KernelInfo {
struct TilingInfo {
    uint64_t lock; // AI CPU/AI Core之间同步的锁
    int8_t type;
    int8_t mode;
    int8_t len;
};
struct KernelArgs {
    uint32_t *xDevice;
    uint32_t *yDevice;
    uint32_t *zDevice;
    TilingInfo *ti; // 与AI Core共享的参数，用于同步tiling选择
};
}

template&lt;typename T, int8_t mode, int8_t len&gt;
__aicore__ void hello_world_impl(GM_ADDR m)
{
    if constexpr (std::is_same_v&lt;T, float&gt;) {
       AscendC::printf(&quot;Hello World: float mode %d len %d.\\n&quot;, mode, len);
    } else if constexpr (std::is_same_v&lt;T, int&gt;) {
       AscendC::printf(&quot;Hello World: int mode %d len %d.\\n&quot;, mode, len);
    }
}

// AI Core算子总入口
// tilingInfo: 和AI CPU算子共同传递的参数，用于数据共享
template&lt;typename T, int8_t mode, int8_t len&gt;
__mix__(1,2) __global__ __aicore__ void hello_world(GM_ADDR m, GM_ADDR TilingPtr)
{
     __gm__ struct KernelInfo::TilingInfo *ti = (__gm__ struct KernelInfo::TilingInfo *)TilingPtr;
    AscendC::GlobalTensor&lt;uint64_t&gt; lock;
    lock.SetGlobalBuffer(reinterpret_cast&lt;__gm__ uint64_t *&gt;(&amp;ti-&gt;lock));
    if ASCEND_IS_AIV {
        if (AscendC::GetBlockIdx() == 0) {
            while (*reinterpret_cast&lt;volatile __gm__ uint64_t*&gt;(lock.GetPhyAddr(0)) == 0) {   // 下沉模式，AI Core等待AICPU tiling计算完成
                AscendC::DataCacheCleanAndInvalid&lt;uint64_t, AscendC::CacheLine::SINGLE_CACHE_LINE,
                    AscendC::DcciDst::CACHELINE_OUT&gt;(lock);    //直接访问Global Memory，获取最新数据
            }
        }
    }
    // 上面是1个核等待AI CPU tiling计算完成，这里进行核间同步
    AscendC::SyncAll&lt;false&gt;();
    // 根据tiling参数值选择不同模板
    if (ti-&gt;type ==0 &amp;&amp; ti-&gt;mode == 1 &amp;&amp; ti-&gt;len == 2) {
        hello_world_impl&lt;float, 1, 2&gt;(m);
    } else if (ti-&gt;type == 1 &amp;&amp; ti-&gt;mode == 2 &amp;&amp; ti-&gt;len == 4) {
        hello_world_impl&lt;int, 2, 4&gt;(m);
    }
    // 执行完留一个核释放lock
    if ASCEND_IS_AIV {
        if (AscendC::GetBlockIdx() == 0) {
            lock.SetValue(0, 0);  // 刷新lock
            AscendC::DataCacheCleanAndInvalid&lt;uint64_t, AscendC::CacheLine::SINGLE_CACHE_LINE,
                AscendC::DcciDst::CACHELINE_OUT&gt;(lock);    //刷新Dcache，同步与GM之间的数据
        }
    }
}

extern &quot;C&quot; __global__ __aicpu__ uint32_t MyAicpuKernel(void *arg)
{
    KernelInfo::KernelArgs* cfg = (KernelInfo::KernelArgs*)arg;
    AscendC::printf(&quot;MyAicpuKernel inited!\\n&quot;);
    cfg-&gt;ti-&gt;lock = 1;
    cfg-&gt;ti-&gt;type = 1;
    cfg-&gt;ti-&gt;mode = 2;
    cfg-&gt;ti-&gt;len = 4;
    AscendC::DataStoreBarrier(); // 对tilingInfo进行写同步
    AscendC::printf(&quot;MyAicpuKernel inited type %d mode %d len %d end!\\n&quot;, cfg-&gt;ti-&gt;type, cfg-&gt;ti-&gt;mode, cfg-&gt;ti-&gt;len);
    return 0;
}
</code></pre></div></article></div>`,1)])])}const A=e(i,[["render",s]]);export{_ as __pageData,A as default};
