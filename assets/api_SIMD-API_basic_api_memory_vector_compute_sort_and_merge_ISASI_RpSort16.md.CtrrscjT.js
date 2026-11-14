import{_ as a,o as e,a as n,b as s}from"./app.BGziXukh.js";const _=JSON.parse('{"title":"","description":"","frontmatter":{"breadcrumbs":[{"text":"Ascend C API","link":"/api/api_list"},{"text":"SIMD API","link":"/api/SIMD-API/SIMD-API"},{"text":"基础API","link":"/api/SIMD-API/basic_api/basic_api"},{"text":"Memory矢量计算","link":"/api/SIMD-API/basic_api/memory_vector_compute/memory_vector_compute"},{"text":"排序组合（ISASI）","link":"/api/SIMD-API/basic_api/memory_vector_compute/sort_and_merge_ISASI/sort_and_merge_ISASI"},{"text":"RpSort16","link":"/api/SIMD-API/basic_api/memory_vector_compute/sort_and_merge_ISASI/RpSort16"}]},"headers":[],"relativePath":"api/SIMD-API/basic_api/memory_vector_compute/sort_and_merge_ISASI/RpSort16.md","filePath":"api/SIMD-API/basic_api/memory_vector_compute/sort_and_merge_ISASI/RpSort16.md","outlineHeaders":[{"level":2,"title":"产品支持情况","slug":"产品支持情况","link":"#产品支持情况"},{"level":2,"title":"功能说明","slug":"功能说明","link":"#功能说明"},{"level":2,"title":"函数原型","slug":"函数原型","link":"#函数原型"},{"level":2,"title":"参数说明","slug":"参数说明","link":"#参数说明"},{"level":2,"title":"数据类型","slug":"数据类型","link":"#数据类型"},{"level":2,"title":"约束说明","slug":"约束说明","link":"#约束说明"},{"level":2,"title":"调用示例","slug":"调用示例","link":"#调用示例"}],"lastUpdated":1794554078000}'),l={name:"api/SIMD-API/basic_api/memory_vector_compute/sort_and_merge_ISASI/RpSort16.md"};function i(o,t,r,d,p,c){return e(),n("div",null,[...t[0]||(t[0]=[s(`<div><article class="markdown-body"><h1>RpSort16<span id="ZH-CN_TOPIC_0000001443137898"></span></h1><h2 id="产品支持情况">产品支持情况<span id="section1550532418810"></span><a class="header-anchor" href="#产品支持情况">​</a></h2><div data-filter="950"><ul><li>Ascend 950PR&amp;950DT系列产品：不支持</li></ul></div><div data-filter="A3"><ul><li>Atlas A3系列产品：不支持</li></ul></div><div data-filter="910b"><ul><li>Atlas A2系列产品：不支持</li></ul></div><div data-filter="310b"><ul><li>Atlas 200I/500 A2推理产品：不支持</li></ul></div><div data-filter="310p"><ul><li>Atlas推理系列产品AI Core：支持</li></ul></div><div data-filter="310p"><ul><li>Atlas推理系列产品Vector Core：不支持</li></ul></div><div data-filter="910"><ul><li>Atlas训练系列产品：支持</li></ul></div><h2 id="功能说明">功能说明<span id="section618mcpsimp"></span><a class="header-anchor" href="#功能说明">​</a></h2><p>根据Region Proposals中的score域对其进行排序（score大的排前面），每次排16个Region Proposals。</p><h2 id="函数原型">函数原型<span id="section620mcpsimp"></span><a class="header-anchor" href="#函数原型">​</a></h2><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>template &lt;typename T&gt;
__aicore__ inline void RpSort16(const LocalTensor&lt;T&gt;&amp; dst, const LocalTensor&lt;T&gt;&amp; src, const int32_t repeatTime)
</code></pre></div><h2 id="参数说明">参数说明<span id="section622mcpsimp"></span><a class="header-anchor" href="#参数说明">​</a></h2><p><strong>表1</strong> 模板参数说明</p><p><span id="table4835205712588"></span></p><table><thead><tr><th>参数名</th><th>描述</th></tr></thead><tbody><tr><td>T</td><td>操作数数据类型。</td></tr></tbody></table><p><strong>表2</strong> 参数说明</p><p><span id="table16397194910519"></span></p><table><thead><tr><th>参数名称</th><th>输入/输出</th><th>含义</th></tr></thead><tbody><tr><td>dst</td><td>输出</td><td>目的操作数，存储经过排序后的Region Proposals。<br>类型为<a href="../../data_structures/LocalTensor/LocalTensor.html">LocalTensor</a>，支持的TPosition为VECIN/VECCALC/VECOUT。<br>LocalTensor的起始地址需要32字节对齐。</td></tr><tr><td>src</td><td>输入</td><td>源操作数，存储未经过排序的Region Proposals。<br>类型为<a href="../../data_structures/LocalTensor/LocalTensor.html">LocalTensor</a>，支持的TPosition为VECIN/VECCALC/VECOUT。<br>LocalTensor的起始地址需要32字节对齐。</td></tr><tr><td>repeatTime</td><td>输入</td><td>重复迭代次数，int32_t类型，每次排16个Region Proposals。取值范围：repeatTime∈[0,255]。</td></tr></tbody></table><h2 id="数据类型">数据类型<a class="header-anchor" href="#数据类型">​</a></h2><div data-filter="910"><p>Atlas训练系列产品，支持的数据类型为：half。</p></div><div data-filter="310p"><p>Atlas推理系列产品AI Core，支持的数据类型为：half/float。</p></div><h2 id="约束说明">约束说明<span id="section633mcpsimp"></span><a class="header-anchor" href="#约束说明">​</a></h2><ul><li>用户需保证src和dst中存储的Region Proposal数目大于实际所需数据，否则会存在tensor越界错误。</li><li>当存在proposal[i]与proposal[j]的score值相同时，如果i&gt;j，则proposal[j]将首先被选出来，排在前面。</li><li>操作数地址对齐要求请参见<a href="../../../general_description_and_constraints.html#alignment_requirements">通用地址对齐约束</a>。</li></ul><h2 id="调用示例">调用示例<span id="section642mcpsimp"></span><a class="header-anchor" href="#调用示例">​</a></h2><p>详细示例请参考<a href="https://gitcode.com/cann/asc-devkit/tree/master/examples/01_simd_cpp_api/03_basic_api/01_memory_vector_compute/region_proposal_sort">RegionProposalSort样例</a>。</p><ul><li><p>接口使用样例</p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>// ProposalConcat将连续元素合入Region Proposal内对应位置
// repeatTime = 2,对2个Region Proposal进行排序，model=4起始位置为4
AscendC::ProposalConcat(dstLocal, srcLocal, 2, 4);
AscendC::RpSort16(dstLocal, dstLocal, 2);
</code></pre></div><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>示例结果
输入数据srcLocal:
[ -1.624 -42.3   -54.12   91.25  -99.4    36.72   67.44  -66.3   -52.53
   3.377 -62.47  -15.85  -31.47    3.143  58.47  -83.75 21.58   63.47    
   7.234  35.16  -39.72   37.8    73.06  -98.7    44.1 -77.2    67.2    
   19.62  -87.9   -14.875  15.86  -77.75]
经过ProposalConcat后的dstLocal数据，repeat=2计算32个元素，model=4起始位置为4
[  
 0.        0.      0.      0.
-1.624     0.      0.      0.      0.      0.      0.      0.
-42.3      0.      0.      0.      0.      0.      0.      0.
-54.12     0.      0.      0.      0.      0.      0.      0.
91.25      0.      0.      0.      0.      0.      0.      0.
-99.4      0.      0.      0.      0.      0.      0.      0.
36.72      0.      0.      0.      0.      0.      0.      0.
67.44      0.      0.      0.      0.      0.      0.      0.
-66.3      0.      0.      0.      0.      0.      0.      0.
-52.53     0.      0.      0.      0.      0.      0.      0.
3.377      0.      0.      0.      0.      0.      0.      0.
-62.47     0.      0.      0.      0.      0.      0.      0.
-15.85     0.      0.      0.      0.      0.      0.      0.
-31.47     0.      0.      0.      0.      0.      0.      0.
3.143      0.      0.      0.      0.      0.      0.      0.
58.47      0.      0.      0.      0.      0.      0.      0.
-83.75     0.      0.      0.      0.      0.      0.      0.
21.58      0.      0.      0.      0.      0.      0.      0.
63.47      0.      0.      0.      0.      0.      0.      0.
7.234      0.      0.      0.      0.      0.      0.      0.
35.16      0.      0.      0.      0.      0.      0.      0.
-39.72     0.      0.      0.      0.      0.      0.      0.
37.8       0.      0.      0.      0.      0.      0.      0.
73.06      0.      0.      0.      0.      0.      0.      0.
-98.7      0.      0.      0.      0.      0.      0.      0.
44.1       0.      0.      0.      0.      0.      0.      0.
-77.2      0.      0.      0.      0.      0.      0.      0.
67.2       0.      0.      0.      0.      0.      0.      0.
19.62      0.      0.      0.      0.      0.      0.      0.
-87.9      0.      0.      0.      0.      0.      0.      0.
-14.875    0.      0.      0.      0.      0.      0.      0.
15.86      0.      0.      0.      0.      0.      0.      0.
-77.75     0.      0.      0.     
]
输出数据(dst_gm):
 [
 0.      0.      0.      0.
 91.25   0.      0.      0.      0.      0.      0.      0.
 67.44   0.      0.      0.      0.      0.      0.      0.
 58.47   0.      0.      0.      0.      0.      0.      0.
 36.72   0.      0.      0.      0.      0.      0.      0.
 3.377   0.      0.      0.      0.      0.      0.      0.
 3.143   0.      0.      0.      0.      0.      0.      0.
 -1.624  0.      0.      0.      0.      0.      0.      0.
 -15.85  0.      0.      0.      0.      0.      0.      0.
 -31.47  0.      0.      0.      0.      0.      0.      0.
 -42.3   0.      0.      0.      0.      0.      0.      0.
 -52.53  0.      0.      0.      0.      0.      0.      0.
 -54.12  0.      0.      0.      0.      0.      0.      0.
 -62.47  0.      0.      0.      0.      0.      0.      0.
 -66.3   0.      0.      0.      0.      0.      0.      0
 -83.75  0.      0.      0.      0.      0.      0.      0.
 -99.4   0.      0.      0.      0.      0.      0.      0.
 73.06   0.      0.      0.      0.      0.      0.      0.
 67.2    0.      0.      0.      0.      0.      0.      0.
 63.47   0.      0.      0.      0.      0.      0.      0.
 44.1    0.      0.      0.      0.      0.      0.      0.
 37.8    0.      0.      0.      0.      0.      0.      0.
 35.16   0.      0.      0.      0.      0.      0.      0.
 21.58   0.      0.      0.      0.      0.      0.      0.
 19.62   0.      0.      0.      0.      0.      0.      0.
 15.86   0.      0.      0.      0.      0.      0.      0.
 7.234   0.      0.      0.      0.      0.      0.      0.
 -14.875 0.      0.      0.      0.      0.      0.      0.
 -39.72  0.      0.      0.      0.      0.      0.      0.
 -77.2   0.      0.      0.      0.      0.      0.      0.
 -77.75  0.      0.      0.      0.      0.      0.      0.
 -87.9   0.      0.      0.      0.      0.      0.      0.
 -98.7   0.      0.      0.
 ]
</code></pre></div></li></ul></article></div>`,1)])])}const v=a(l,[["render",i]]);export{_ as __pageData,v as default};
