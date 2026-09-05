import{_ as i,o as t,a as n,b as e}from"./app.C41L12d5.js";const p=JSON.parse('{"title":"","description":"","frontmatter":{"breadcrumbs":[{"text":"Ascend C API","link":"/api/api_list"},{"text":"SIMD API","link":"/api/SIMD-API/SIMD-API"},{"text":"基础API","link":"/api/SIMD-API/basic_api/basic_api"},{"text":"Kernel Tiling","link":"/api/SIMD-API/basic_api/Kernel-Tiling/Kernel-Tiling"},{"text":"REGISTER_NONE_TILING","link":"/api/SIMD-API/basic_api/Kernel-Tiling/REGISTER_NONE_TILING"}]},"headers":[],"relativePath":"api/SIMD-API/basic_api/Kernel-Tiling/REGISTER_NONE_TILING.md","filePath":"api/SIMD-API/basic_api/Kernel-Tiling/REGISTER_NONE_TILING.md","outlineHeaders":[{"level":2,"title":"产品支持情况","slug":"产品支持情况","link":"#产品支持情况"},{"level":2,"title":"功能说明","slug":"功能说明","link":"#功能说明"},{"level":2,"title":"函数原型","slug":"函数原型","link":"#函数原型"},{"level":2,"title":"参数说明","slug":"参数说明","link":"#参数说明"},{"level":2,"title":"约束说明","slug":"约束说明","link":"#约束说明"},{"level":2,"title":"调用示例","slug":"调用示例","link":"#调用示例"}],"lastUpdated":1788159000000}'),l={name:"api/SIMD-API/basic_api/Kernel-Tiling/REGISTER_NONE_TILING.md"};function s(_,a,c,r,T,h){return t(),n("div",null,[...a[0]||(a[0]=[e(`<div><article class="markdown-body"><h1>REGISTER_NONE_TILING<span id="ZH-CN_TOPIC_0000002473236240"></span></h1><h2 id="产品支持情况">产品支持情况<span id="section1550532418810"></span><a class="header-anchor" href="#产品支持情况">​</a></h2><div data-filter="950"><ul><li>Ascend 950PR/Ascend 950DT：支持</li></ul></div><div data-filter="A3"><ul><li>Atlas A3 训练系列产品/Atlas A3 推理系列产品：支持</li></ul></div><div data-filter="910b"><ul><li>Atlas A2 训练系列产品/Atlas A2 推理系列产品：支持</li></ul></div><div data-filter="310b"><ul><li>Atlas 200I/500 A2 推理产品：不支持</li></ul></div><div data-filter="310p"><ul><li>Atlas 推理系列产品AI Core：不支持</li></ul></div><div data-filter="310p"><ul><li>Atlas 推理系列产品Vector Core：不支持</li></ul></div><div data-filter="910"><ul><li>Atlas 训练系列产品：不支持</li></ul></div><h2 id="功能说明">功能说明<span id="zh-cn_topic_0000001526206862_section212607105720"></span><a class="header-anchor" href="#功能说明">​</a></h2><p>在核函数（Kernel）侧使用标准C++语法自定义的TilingData结构体时，若用户不确定需要注册哪些结构体，可使用该接口告知框架侧需使用未注册的标准C++语法来定义TilingData，并配套<a href="GET_TILING_DATA_WITH_STRUCT.html">GET_TILING_DATA_WITH_STRUCT</a>，<a href="GET_TILING_DATA_MEMBER.html">GET_TILING_DATA_MEMBER</a>，<a href="GET_TILING_DATA_PTR_WITH_STRUCT.html">GET_TILING_DATA_PTR_WITH_STRUCT</a>来获取对应的TilingData。</p><h2 id="函数原型">函数原型<span id="zh-cn_topic_0000001526206862_section1630753514297"></span><a class="header-anchor" href="#函数原型">​</a></h2><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>REGISTER_NONE_TILING
</code></pre></div><h2 id="参数说明">参数说明<span id="zh-cn_topic_0000001526206862_section129451113125413"></span><a class="header-anchor" href="#参数说明">​</a></h2><p>无</p><h2 id="约束说明">约束说明<span id="zh-cn_topic_0000001526206862_section65498832"></span><a class="header-anchor" href="#约束说明">​</a></h2><ul><li>暂不支持核函数（Kernel）直调工程。</li><li>使用<a href="GET_TILING_DATA.html">GET_TILING_DATA</a>需提供默认注册的TilingData结构体，但本接口不注册TilingData结构体，故不支持与<a href="GET_TILING_DATA.html">5.11.1-GET_TILING_DATA</a>组合使用。</li><li>不支持和<a href="REGISTER_TILING_DEFAULT.html">REGISTER_TILING_DEFAULT</a>或<a href="REGISTER_TILING_FOR_TILINGKEY.html">REGISTER_TILING_FOR_TILINGKEY</a>混用，即不支持注册TilingData结构体的场景与非注册场景混合使用。</li></ul><h2 id="调用示例">调用示例<span id="zh-cn_topic_0000001526206862_section97001499599"></span><a class="header-anchor" href="#调用示例">​</a></h2><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code># Tiling模板库提供方，无法预知用户实例化何种TilingData结构体
template &lt;class BrcDag&gt;
struct BroadcastBaseTilingData {
    int32_t scheMode;
    int32_t shapeLen;
    int32_t ubSplitAxis;
    int32_t ubFormer;
    int32_t ubTail;
    int64_t ubOuter;
    int64_t blockFormer;
    int64_t blockTail;
    int64_t dimProductBeforeUbInner;
    int64_t elemNum;
    int64_t blockNum;
    int64_t outputDims[BROADCAST_MAX_DIMS_NUM];
    int64_t outputStrides[BROADCAST_MAX_DIMS_NUM];
    int64_t inputDims[BrcDag::InputSize][2]; // 整块 + 尾块
    int64_t inputBrcDims[BrcDag::CopyBrcSize][BROADCAST_MAX_DIMS_NUM];
    int64_t inputVecBrcDims[BrcDag::VecBrcSize][BROADCAST_MAX_DIMS_NUM];
    int64_t inputStrides[BrcDag::InputSize][BROADCAST_MAX_DIMS_NUM];
    int64_t inputBrcStrides[BrcDag::CopyBrcSize][BROADCAST_MAX_DIMS_NUM];
    int64_t inputVecBrcStrides[BrcDag::VecBrcSize];
    char scalarData[BROADCAST_MAX_SCALAR_BYTES];
};

template &lt;uint64_t schMode, class BrcDag&gt; class BroadcastSch {
public:
    __aicore__ inline explicit BroadcastSch(GM_ADDR&amp; tmpTiling)
        : tiling(tmpTiling)
    {}
    template &lt;class... Args&gt;
    __aicore__ inline void Process(Args... args)
    {
        REGISTER_NONE_TILING; // 告知框架侧使用未注册的TilingData结构体
        if constexpr (schMode == 1) {
            GET_TILING_DATA_WITH_STRUCT(BroadcastBaseTilingData&lt;BrcDag&gt;, tilingData, tiling);
            GET_TILING_DATA_MEMBER(BroadcastBaseTilingData&lt;BrcDag&gt;, blockNum, blockNumVar, tiling);
            TPipe pipe;
            BroadcastNddmaSch&lt;BrcDag, false&gt; sch(&amp;tilingData); // 获取Schedule
            sch.Init(&amp;pipe, args...);
            sch.Process();
        }   else if constexpr (schMode == 202) {
            GET_TILING_DATA_PTR_WITH_STRUCT(BroadcastOneDimTilingDataAdvance, tilingDataPtr, tiling);
            BroadcastOneDimAdvanceSch&lt;BrcDag&gt; sch(tilingDataPtr); // 获取Schedule
            sch.Init(args...);
            sch.Process();
        }
    }
public:
    GM_ADDR tiling;
};
</code></pre></div><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>#用户通过传入schMode, OpDag模板参数来实例化模板库
using namespace AscendC;
template &lt;uint64_t schMode&gt;
__global__ __aicore__ void mul(GM_ADDR x1, GM_ADDR x2, GM_ADDR y, GM_ADDR workspace, GM_ADDR tiling)
{
    if constexpr (std::is_same&lt;DTYPE_X1, int8_t&gt;::value) {
        // int8
        using OpDag = MulDag::MulInt8Op::OpDag;
        BroadcastSch&lt;schMode, OpDag&gt; sch(tiling);
        sch.Process(x1, x2, y);
    } else if constexpr (std::is_same&lt;DTYPE_X1, uint8_t&gt;::value) {
        // uint8
        using OpDag = MulDag::MulUint8Op::OpDag;
        BroadcastSch&lt;schMode, OpDag&gt; sch(tiling);
        sch.Process(x1, x2, y);
    }
}
</code></pre></div></article></div>`,1)])])}const o=i(l,[["render",s]]);export{p as __pageData,o as default};
