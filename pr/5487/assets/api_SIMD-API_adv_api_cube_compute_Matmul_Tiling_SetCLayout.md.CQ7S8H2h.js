import{_ as a,o as e,a as i,b as n}from"./app.DKoEZOcr.js";const p=JSON.parse('{"title":"","description":"","frontmatter":{"breadcrumbs":[{"text":"Ascend C API","link":"/api/api_list"},{"text":"SIMD API","link":"/api/SIMD-API/SIMD-API"},{"text":"高阶API","link":"/api/SIMD-API/adv_api/adv_api"},{"text":"矩阵计算","link":"/api/SIMD-API/adv_api/cube_compute/cube_compute"},{"text":"Matmul Tiling类","link":"/api/SIMD-API/adv_api/cube_compute/Matmul_Tiling/Matmul_Tiling"},{"text":"SetCLayout","link":"/api/SIMD-API/adv_api/cube_compute/Matmul_Tiling/SetCLayout"}]},"headers":[],"relativePath":"api/SIMD-API/adv_api/cube_compute/Matmul_Tiling/SetCLayout.md","filePath":"api/SIMD-API/adv_api/cube_compute/Matmul_Tiling/SetCLayout.md","outlineHeaders":[{"level":2,"title":"功能说明","slug":"功能说明","link":"#功能说明"},{"level":2,"title":"函数原型","slug":"函数原型","link":"#函数原型"},{"level":2,"title":"参数说明","slug":"参数说明","link":"#参数说明"},{"level":2,"title":"返回值说明","slug":"返回值说明","link":"#返回值说明"},{"level":2,"title":"约束说明","slug":"约束说明","link":"#约束说明"},{"level":2,"title":"调用示例","slug":"调用示例","link":"#调用示例"}],"lastUpdated":1785895910000}'),l={name:"api/SIMD-API/adv_api/cube_compute/Matmul_Tiling/SetCLayout.md"};function o(_,t,d,r,s,c){return e(),i("div",null,[...t[0]||(t[0]=[n(`<div><article class="markdown-body"><h1>SetCLayout</h1><h2 id="功能说明">功能说明<a class="header-anchor" href="#功能说明">​</a></h2><p>设置C矩阵的Layout轴信息，包括<a href="../Matmul_Kernel/IterateBatch.html">B、S、N、G、D轴</a>。对于BSNGD、SBNGD、BNGS1S2 Layout格式，调用<a href="../Matmul_Kernel/IterateBatch.html">IterateBatch</a>接口之前，需要在Host侧Tiling实现中通过本接口设置C矩阵的Layout轴信息。</p><h2 id="函数原型">函数原型<a class="header-anchor" href="#函数原型">​</a></h2><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>int32_t SetCLayout(int32_t b, int32_t s, int32_t n, int32_t g, int32_t d)
</code></pre></div><h2 id="参数说明">参数说明<a class="header-anchor" href="#参数说明">​</a></h2><p><strong>表1</strong> 参数说明</p><table><thead><tr><th>参数名</th><th>输入/输出</th><th>描述</th></tr></thead><tbody><tr><td>b</td><td>输入</td><td>C矩阵Layout的B轴信息</td></tr><tr><td>s</td><td>输入</td><td>C矩阵Layout的S轴信息</td></tr><tr><td>n</td><td>输入</td><td>C矩阵Layout的N轴信息</td></tr><tr><td>g</td><td>输入</td><td>C矩阵Layout的G轴信息</td></tr><tr><td>d</td><td>输入</td><td>C矩阵Layout的D轴信息</td></tr></tbody></table><h2 id="返回值说明">返回值说明<a class="header-anchor" href="#返回值说明">​</a></h2><p>-1表示设置失败； 0表示设置成功。</p><h2 id="约束说明">约束说明<a class="header-anchor" href="#约束说明">​</a></h2><p>对于BSNGD、SBNGD、BNGS1S2 Layout格式，调用<a href="../Matmul_Kernel/IterateBatch.html">IterateBatch</a>接口之前，需要在Host侧Tiling实现中通过本接口设置C矩阵的Layout轴信息。</p><h2 id="调用示例">调用示例<a class="header-anchor" href="#调用示例">​</a></h2><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>auto ascendcPlatform = platform_ascendc::PlatformAscendC(context-&gt;GetPlatformInfo());
matmul_tiling::MultiCoreMatmulTiling tiling(ascendcPlatform);
int32_t M = 32;
int32_t N = 256;
int32_t K = 64;
tiling.SetDim(1);
tiling.SetAType(matmul_tiling::TPosition::GM, matmul_tiling::CubeFormat::ND, matmul_tiling::DataType::DT_FLOAT16);
tiling.SetBType(matmul_tiling::TPosition::GM, matmul_tiling::CubeFormat::ND, matmul_tiling::DataType::DT_FLOAT16);
tiling.SetCType(matmul_tiling::TPosition::GM, matmul_tiling::CubeFormat::ND, matmul_tiling::DataType::DT_FLOAT);
tiling.SetBiasType(matmul_tiling::TPosition::GM, matmul_tiling::CubeFormat::ND, matmul_tiling::DataType::DT_FLOAT);
tiling.SetShape(M, N, K);
tiling.SetOrgShape(M, N, K);
tiling.SetBias(true);
tiling.SetBufferSpace(-1, -1, -1);

constexpr int32_t A_BNUM = 2;
constexpr int32_t A_SNUM = 32;
constexpr int32_t A_GNUM = 3;
constexpr int32_t A_DNUM = 64;
constexpr int32_t B_BNUM = 2;
constexpr int32_t B_SNUM = 256;
constexpr int32_t B_GNUM = 3;
constexpr int32_t B_DNUM = 64;
constexpr int32_t C_BNUM = 2;
constexpr int32_t C_SNUM = 32;
constexpr int32_t C_GNUM = 3;
constexpr int32_t C_DNUM = 256;
constexpr int32_t BATCH_NUM = 3;
tiling.SetALayout(A_BNUM, A_SNUM, 1, A_GNUM, A_DNUM);
tiling.SetBLayout(B_BNUM, B_SNUM, 1, B_GNUM, B_DNUM);
tiling.SetCLayout(C_BNUM, C_SNUM, 1, C_GNUM, C_DNUM); // 设置C矩阵排布
tiling.SetBatchNum(BATCH_NUM);
tiling.SetBufferSpace(-1, -1, -1);

optiling::TCubeTiling tilingData;
int ret = tiling.GetTiling(tilingData);
</code></pre></div></article></div>`,1)])])}const u=a(l,[["render",o]]);export{p as __pageData,u as default};
