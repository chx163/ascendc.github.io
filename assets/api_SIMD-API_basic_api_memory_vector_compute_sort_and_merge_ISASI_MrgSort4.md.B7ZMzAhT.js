import{_ as a,o as n,a as p,b as t}from"./app.B47EjQll.js";const g=JSON.parse('{"title":"","description":"","frontmatter":{"breadcrumbs":[{"text":"Ascend C API","link":"/api/api_list"},{"text":"SIMD API","link":"/api/SIMD-API/SIMD-API"},{"text":"基础API","link":"/api/SIMD-API/basic_api/basic_api"},{"text":"Memory矢量计算","link":"/api/SIMD-API/basic_api/memory_vector_compute/memory_vector_compute"},{"text":"排序组合（ISASI）","link":"/api/SIMD-API/basic_api/memory_vector_compute/sort_and_merge_ISASI/sort_and_merge_ISASI"},{"text":"MrgSort4","link":"/api/SIMD-API/basic_api/memory_vector_compute/sort_and_merge_ISASI/MrgSort4"}]},"headers":[],"relativePath":"api/SIMD-API/basic_api/memory_vector_compute/sort_and_merge_ISASI/MrgSort4.md","filePath":"api/SIMD-API/basic_api/memory_vector_compute/sort_and_merge_ISASI/MrgSort4.md","outlineHeaders":[{"level":2,"title":"产品支持情况","slug":"产品支持情况","link":"#产品支持情况"},{"level":2,"title":"功能说明","slug":"功能说明","link":"#功能说明"},{"level":2,"title":"函数原型","slug":"函数原型","link":"#函数原型"},{"level":2,"title":"参数说明","slug":"参数说明","link":"#参数说明"},{"level":2,"title":"数据类型","slug":"数据类型","link":"#数据类型"},{"level":2,"title":"约束说明","slug":"约束说明","link":"#约束说明"},{"level":2,"title":"调用示例","slug":"调用示例","link":"#调用示例"}],"lastUpdated":1793607416000}'),l={name:"api/SIMD-API/basic_api/memory_vector_compute/sort_and_merge_ISASI/MrgSort4.md"};function c(o,s,e,r,i,d){return n(),p("div",null,[...s[0]||(s[0]=[t(`<div><article class="markdown-body"><h1>MrgSort4<span id="ZH-CN_TOPIC_0000001493137873"></span></h1><h2 id="产品支持情况">产品支持情况<span id="section1550532418810"></span><a class="header-anchor" href="#产品支持情况">​</a></h2><div data-filter="950"><ul><li>Ascend 950PR&amp;950DT系列产品：不支持</li></ul></div><div data-filter="A3"><ul><li>Atlas A3系列产品：不支持</li></ul></div><div data-filter="910b"><ul><li>Atlas A2系列产品：不支持</li></ul></div><div data-filter="310b"><ul><li>Atlas 200I/500 A2推理产品：不支持</li></ul></div><div data-filter="310p"><ul><li>Atlas推理系列产品AI Core：支持</li></ul></div><div data-filter="310p"><ul><li>Atlas推理系列产品Vector Core：不支持</li></ul></div><div data-filter="910"><ul><li>Atlas训练系列产品：支持</li></ul></div><h2 id="功能说明">功能说明<span id="section618mcpsimp"></span><a class="header-anchor" href="#功能说明">​</a></h2><p>将已经排好序的最多4条Region Proposals队列，排列并合并成1条队列，结果按照score域由大到小排序。</p><h2 id="函数原型">函数原型<span id="section620mcpsimp"></span><a class="header-anchor" href="#函数原型">​</a></h2><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>template &lt;typename T&gt;
__aicore__ inline void MrgSort4(const LocalTensor&lt;T&gt;&amp; dst, const MrgSortSrcList&lt;T&gt;&amp; src, const MrgSort4Info&amp; params)
</code></pre></div><h2 id="参数说明">参数说明<span id="section622mcpsimp"></span><a class="header-anchor" href="#参数说明">​</a></h2><p><strong>表1</strong> 模板参数说明</p><p><span id="table4835205712588"></span></p><table><thead><tr><th>参数名</th><th>描述</th></tr></thead><tbody><tr><td>T</td><td>操作数数据类型。</td></tr></tbody></table><p><strong>表2</strong> 接口参数说明</p><p><span id="table8955841508"></span></p><table><thead><tr><th>参数名</th><th>输入/输出</th><th>含义</th></tr></thead><tbody><tr><td>dst</td><td>输出</td><td>目的操作数，存储经过排序后的Region Proposals。<br>类型为<a href="../../data_structures/LocalTensor/LocalTensor.html">LocalTensor</a>，支持的TPosition为VECIN/VECCALC/VECOUT。<br>LocalTensor的起始地址需要保证16字节对齐（针对half数据类型），32字节对齐（针对float数据类型）。</td></tr><tr><td>src</td><td>输入</td><td>源操作数，4个Region Proposals队列，并且每个Region Proposal队列都已经排好序，类型为MrgSortSrcList结构体，具体定义见下方代码。<br>Region Proposal队列的数据类型与目的操作数保持一致。src1、src2、src3、src4类型为<a href="../../data_structures/LocalTensor/LocalTensor.html">LocalTensor</a>，支持的TPosition为VECIN/VECCALC/VECOUT。<br>LocalTensor的起始地址需要保证16字节对齐（针对half数据类型），32字节对齐（针对float数据类型）。</td></tr><tr><td>params</td><td>输入</td><td>排序所需参数，类型为MrgSort4Info结构体。<br>具体定义请参考\${INSTALL_DIR}/asc/include/basic_api/kernel_struct_proposal.h，\${INSTALL_DIR}请替换为CANN软件安装后文件存储路径。<br>参数说明请参考<a href="#table7515358184615">表3</a>。</td></tr></tbody></table><p>MrgSortSrcList结构体定义如下：</p><div class="code-block"><div class="code-header"><span class="lang-label">C++</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code><span class="k">template</span><span class="w"> </span><span class="o">&lt;</span><span class="k">typename</span><span class="w"> </span><span class="nc">T</span><span class="o">&gt;</span><span class="w"> </span><span class="k">struct</span><span class="w"> </span><span class="nc">MrgSortSrcList</span><span class="w"> </span><span class="p">{</span>
<span class="w">    </span><span class="n">__aicore__</span><span class="w"> </span><span class="nf">MrgSortSrcList</span><span class="p">()</span><span class="w"> </span><span class="p">{}</span>
<span class="w">    </span><span class="n">__aicore__</span><span class="w"> </span><span class="nf">MrgSortSrcList</span><span class="p">(</span><span class="k">const</span><span class="w"> </span><span class="n">LocalTensor</span><span class="o">&lt;</span><span class="n">T</span><span class="o">&gt;&amp;</span><span class="w"> </span><span class="n">src1In</span><span class="p">,</span><span class="w"> </span><span class="k">const</span><span class="w"> </span><span class="n">LocalTensor</span><span class="o">&lt;</span><span class="n">T</span><span class="o">&gt;&amp;</span><span class="w"> </span><span class="n">src2In</span><span class="p">,</span><span class="w"> </span><span class="k">const</span><span class="w"> </span><span class="n">LocalTensor</span><span class="o">&lt;</span><span class="n">T</span><span class="o">&gt;&amp;</span><span class="w"> </span><span class="n">src3In</span><span class="p">,</span>
<span class="w">        </span><span class="k">const</span><span class="w"> </span><span class="n">LocalTensor</span><span class="o">&lt;</span><span class="n">T</span><span class="o">&gt;&amp;</span><span class="w"> </span><span class="n">src4In</span><span class="p">)</span>
<span class="w">    </span><span class="p">{</span>
<span class="w">        </span><span class="n">src1</span><span class="w"> </span><span class="o">=</span><span class="w"> </span><span class="n">src1In</span><span class="p">[</span><span class="mi">0</span><span class="p">];</span>
<span class="w">        </span><span class="n">src2</span><span class="w"> </span><span class="o">=</span><span class="w"> </span><span class="n">src2In</span><span class="p">[</span><span class="mi">0</span><span class="p">];</span>
<span class="w">        </span><span class="n">src3</span><span class="w"> </span><span class="o">=</span><span class="w"> </span><span class="n">src3In</span><span class="p">[</span><span class="mi">0</span><span class="p">];</span>
<span class="w">        </span><span class="n">src4</span><span class="w"> </span><span class="o">=</span><span class="w"> </span><span class="n">src4In</span><span class="p">[</span><span class="mi">0</span><span class="p">];</span>
<span class="w">    </span><span class="p">}</span>
<span class="w">    </span><span class="n">LocalTensor</span><span class="o">&lt;</span><span class="n">T</span><span class="o">&gt;</span><span class="w"> </span><span class="n">src1</span><span class="p">;</span><span class="w"> </span><span class="c1">// 第一个已经排好序的Region Proposals队列</span>
<span class="w">    </span><span class="n">LocalTensor</span><span class="o">&lt;</span><span class="n">T</span><span class="o">&gt;</span><span class="w"> </span><span class="n">src2</span><span class="p">;</span><span class="w"> </span><span class="c1">// 第二个已经排好序的Region Proposals队列</span>
<span class="w">    </span><span class="n">LocalTensor</span><span class="o">&lt;</span><span class="n">T</span><span class="o">&gt;</span><span class="w"> </span><span class="n">src3</span><span class="p">;</span><span class="w"> </span><span class="c1">// 第三个已经排好序的Region Proposals队列</span>
<span class="w">    </span><span class="n">LocalTensor</span><span class="o">&lt;</span><span class="n">T</span><span class="o">&gt;</span><span class="w"> </span><span class="n">src4</span><span class="p">;</span><span class="w"> </span><span class="c1">// 第四个已经排好序的Region Proposals队列</span>
<span class="p">};</span>
</code></pre></div><p><strong>表3</strong> MrgSort4Info参数说明</p><p><span id="table7515358184615"></span></p><table><thead><tr><th>参数名称</th><th>输入/输出</th><th>含义</th></tr></thead><tbody><tr><td>elementLengths</td><td>输入</td><td>四个源Region Proposals队列的长度（Region Proposal数目），类型为长度为4的uint16_t数据类型的数组，理论上每个元素取值范围[0, 4095]，但不能超出Unified Buffer（UB）的存储空间。</td></tr><tr><td>ifExhaustedSuspension</td><td>输入</td><td>某条队列耗尽后，指令是否需要停止，类型为bool，默认false。</td></tr><tr><td>validBit</td><td>输入</td><td>有效队列个数，取值如下：3：前两条队列有效<br>7：前三条队列有效<br>15：四条队列全部有效</td></tr><tr><td>repeatTimes</td><td>输入</td><td>迭代次数，每一次源操作数和目的操作数跳过四个队列总长度。取值范围：repeatTimes∈[1,255]。<br>repeatTimes参数生效是有条件的，需要同时满足以下四个条件：四个源Region Proposals队列的长度一致<br>四个源Region Proposals队列连续存储<br>ifExhaustedSuspension = False<br>validBit=15</td></tr></tbody></table><h2 id="数据类型">数据类型<a class="header-anchor" href="#数据类型">​</a></h2><div data-filter="910"><p>Atlas训练系列产品，支持的数据类型为：half。</p></div><div data-filter="310p"><p>Atlas推理系列产品AI Core，支持的数据类型为：half/float。</p></div><h2 id="约束说明">约束说明<span id="section633mcpsimp"></span><a class="header-anchor" href="#约束说明">​</a></h2><ul><li><p>当存在proposal[i]与proposal[j]的score值相同时，如果i&gt;j，则proposal[j]将首先被选出来，排在前面。</p></li><li><p>操作数地址对齐要求请参见<a href="../../../general_description_and_constraints.html#section796754519912">通用地址对齐约束</a>。</p></li><li><p>不支持源操作数与目的操作数之间存在地址重叠。</p></li></ul><h2 id="调用示例">调用示例<span id="section642mcpsimp"></span><a class="header-anchor" href="#调用示例">​</a></h2><p>详细示例请参考<a href="https://gitcode.com/cann/asc-devkit/tree/master/examples/01_simd_cpp_api/03_basic_api/01_memory_vector_compute/region_proposal_sort">RegionProposalSort样例</a>。</p><p>接口使用样例</p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>// Region Proposals的创建如下所示
// AscendC::ProposalConcat(vconcatWorkLocal[0], srcLocal[0], repeat, mode);
// AscendC::RpSort16(vconcatWorkLocal[0], vconcatWorkLocal[0], repeat);

// vconcatWorkLocal为已经创建并且完成排序的4个Region Proposals，每个Region Proposal数目是16个
// 输入数据先经过ProposalConcat将连续元素合入Region Proposal内对应位置，然后经过RpSort16对Region Proposals中的score域对其进行排序才是各个vconcatWorkLocal。

struct MrgSortSrcList&lt;half&gt; srcList(vconcatWorkLocal[0], vconcatWorkLocal[1], vconcatWorkLocal[2], vconcatWorkLocal[3]);
// 四个源Region Proposals队列的长度都是16
uint16_t elementLengths[4] = {16, 16, 16, 16};
// false表示某条队列耗尽后，指令不需要停止。15表示四条队列都是有效队列。repeat=1，1次迭代
struct MrgSort4Info srcInfo(elementLengths, false, 15, 1);
AscendC::MrgSort4(dstLocal, srcList, srcInfo);
</code></pre></div><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>示例结果
输入数据(src_gm):
[-38.1    82.7   -40.75  -54.62   21.67  -58.53   25.94  -79.5   -61.44
  26.7   -27.45   48.78   86.75  -18.1   -58.8    62.38   46.38  -78.94
 -87.7   -13.81  -13.25   46.94  -47.8   -50.44   34.16   20.3    80.1
 -94.1    52.4   -42.75   83.4    80.44  -66.8   -82.7   -91.44  -95.6
  66.2   -30.97  -36.53   61.66   24.92  -45.1    38.97  -34.62  -69.8
  59.1    34.22   11.695 -33.47   52.1    -4.832  46.88   56.78   71.4
  13.29  -35.78   52.44  -46.03   83.8    83.56   71.3    -9.086 -65.06
  46.25 ]

// 输入数据先经过ProposalConcat将连续元素合入Region Proposal内对应位置，然后经过RpSort16对Region Proposals中的score域对其进行排序后变成4个vconcatWorkLocal，4个合并后是输出。

输出数据(dst_gm):
[
0.0       0.0       0.0       0.0       86.75     0.0       0.0       0.0
0.0       0.0       0.0       83.8      0.0       0.0       0.0       0.0
0.0       0.0       83.56     0.0       0.0       0.0       0.0       0.0
0.0       83.4      0.0       0.0       0.0       0.0       0.0       0.0
82.7      0.0       0.0       0.0       0.0       0.0       0.0       80.44
0.0       0.0       0.0       0.0       0.0       0.0       0.0       80.1
0.0       0.0       0.0       0.0       0.0       0.0       71.4      0.0
0.0       0.0       0.0       0.0       0.0       71.3      0.0       0.0
0.0       0.0       0.0       0.0       66.2      0.0       0.0       0.0
0.0       0.0       0.0       62.38     0.0       0.0       0.0       0.0
0.0       0.0       61.66     0.0       0.0       0.0       0.0       0.0
0.0       59.1      0.0       0.0       0.0       0.0       0.0       0.0
56.78     0.0       0.0       0.0       0.0       0.0       0.0       52.44
0.0       0.0       0.0       0.0       0.0       0.0       52.4      0.0
0.0       0.0       0.0       0.0       0.0       52.1      0.0       0.0
0.0       0.0       0.0       0.0       0.0       48.78     0.0       0.0
0.0       0.0       0.0       0.0       46.94     0.0       0.0       0.0
0.0       0.0       0.0       46.88     0.0       0.0       0.0       0.0
0.0       0.0       46.38     0.0       0.0       0.0       0.0       0.0
0.0       46.25     0.0       0.0       0.0       0.0       0.0       0.0
38.97     0.0       0.0       0.0       0.0       0.0       0.0       34.22
0.0       0.0       0.0       0.0       0.0       0.0       34.16     0.0
0.0       0.0       0.0       0.0       0.0       26.7      0.0       0.0
0.0       0.0       0.0       0.0       25.94     0.0       0.0       0.0
0.0       0.0       0.0       24.92     0.0       0.0       0.0       0.0
0.0       0.0       21.67     0.0       0.0       0.0       0.0       0.0
0.0       20.3      0.0       0.0       0.0       0.0       0.0       0.0
0.0       13.29     0.0       0.0       0.0       0.0       0.0       0.0
11.695    0.0       0.0       0.0       0.0       0.0       0.0       -4.832
0.0       0.0       0.0       0.0       0.0       0.0       -9.086    0.0
0.0       0.0       0.0       0.0       0.0       -13.25    0.0       0.0
0.0       0.0       0.0       0.0       -13.81    0.0       0.0       0.0
0.0       0.0       0.0       -18.1     0.0       0.0       0.0       0.0
0.0       0.0       0.0       -27.45    0.0       0.0       0.0       0.0
0.0       0.0       -30.97    0.0       0.0       0.0       0.0       0.0
0.0       -33.47    0.0       0.0       0.0       0.0       0.0       0.0
-34.62    0.0       0.0       0.0       0.0       0.0       0.0       -35.78
0.0       0.0       0.0       0.0       0.0       0.0       -36.53    0.0
0.0       0.0       0.0       0.0       0.0       -38.1     0.0       0.0
0.0       0.0       0.0       0.0       -40.75    0.0       0.0       0.0
0.0       0.0       0.0       -42.75    0.0       0.0       0.0       0.0
0.0       0.0       -45.1     0.0       0.0       0.0       0.0       0.0
0.0       -46.03    0.0       0.0       0.0       0.0       0.0       0.0
-47.8     0.0       0.0       0.0       0.0       0.0       0.0       0.0
-50.44    0.0       0.0       0.0       0.0       0.0       0.0       -54.62
0.0       0.0       0.0       0.0       0.0       0.0       -58.53    0.0
0.0       0.0       0.0       0.0       0.0       -58.8     0.0       0.0
0.0       0.0       0.0       0.0       -61.44    0.0       0.0       0.0
0.0       0.0       0.0       -65.06    0.0       0.0       0.0       0.0
0.0       0.0       -66.8     0.0       0.0       0.0       0.0       0.0
0.0       -69.8     0.0       0.0       0.0       0.0       0.0       0.0
-78.94    0.0       0.0       0.0       0.0       0.0       0.0       -79.5
0.0       0.0       0.0       0.0       0.0       0.0       -82.7     0.0
0.0       0.0       0.0       0.0       0.0       -87.7     0.0       0.0
0.0       0.0       0.0       0.0       -91.44    0.0       0.0       0.0
0.0       0.0       0.0       -94.1     0.0       0.0       0.0       0.0
0.0       0.0       0.0       -95.6     0.0       0.0       0.0       0.0
]
</code></pre></div></article></div>`,1)])])}const v=a(l,[["render",c]]);export{g as __pageData,v as default};
