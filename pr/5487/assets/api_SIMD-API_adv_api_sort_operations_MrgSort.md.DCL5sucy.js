import{_ as e,o as a,a as s,b as l}from"./app.DKoEZOcr.js";const i="/ascendc.github.io/pr/5487/assets/mrgsort4_01.zFxNrLCp.png",r="/ascendc.github.io/pr/5487/assets/mrgsort4_02.DEM9tmYp.png",g=JSON.parse('{"title":"","description":"","frontmatter":{"breadcrumbs":[{"text":"Ascend C API","link":"/api/api_list"},{"text":"SIMD API","link":"/api/SIMD-API/SIMD-API"},{"text":"高阶API","link":"/api/SIMD-API/adv_api/adv_api"},{"text":"排序操作","link":"/api/SIMD-API/adv_api/sort_operations/sort_operations"},{"text":"MrgSort","link":"/api/SIMD-API/adv_api/sort_operations/MrgSort"}]},"headers":[],"relativePath":"api/SIMD-API/adv_api/sort_operations/MrgSort.md","filePath":"api/SIMD-API/adv_api/sort_operations/MrgSort.md","outlineHeaders":[{"level":2,"title":"产品支持情况","slug":"产品支持情况","link":"#产品支持情况"},{"level":2,"title":"功能说明","slug":"功能说明","link":"#功能说明"},{"level":2,"title":"函数原型","slug":"函数原型","link":"#函数原型"},{"level":2,"title":"参数说明","slug":"参数说明","link":"#参数说明"},{"level":2,"title":"返回值说明","slug":"返回值说明","link":"#返回值说明"},{"level":2,"title":"约束说明","slug":"约束说明","link":"#约束说明"},{"level":2,"title":"调用示例","slug":"调用示例","link":"#调用示例"}],"lastUpdated":1787132628000}'),n={name:"api/SIMD-API/adv_api/sort_operations/MrgSort.md"};function o(d,t,c,h,p,v){return a(),s("div",null,[...t[0]||(t[0]=[l('<div><article class="markdown-body"><h1>MrgSort</h1><h2 id="产品支持情况">产品支持情况<a class="header-anchor" href="#产品支持情况">​</a></h2><div data-filter="950"><ul><li>Ascend 950PR/Ascend 950DT：支持</li></ul></div><div data-filter="A3"><ul><li>Atlas A3 训练系列产品/Atlas A3 推理系列产品：支持</li></ul></div><div data-filter="910b"><ul><li>Atlas A2 训练系列产品/Atlas A2 推理系列产品：支持</li></ul></div><div data-filter="310b"><ul><li>Atlas 200I/500 A2 推理产品：不支持</li></ul></div><div data-filter="310p"><ul><li>Atlas 推理系列产品AI Core：支持</li><li>Atlas 推理系列产品Vector Core：不支持</li></ul></div><div data-filter="910"><ul><li>Atlas 训练系列产品：不支持</li></ul></div><h2 id="功能说明">功能说明<a class="header-anchor" href="#功能说明">​</a></h2><p>将已经排好序的最多4条队列，合并排列成1条队列，结果按照score域由大到小排序，排布方式如下：</p><div data-filter="950"><p>Ascend 950PR/Ascend 950DT采用方式一。</p></div><div data-filter="A3"><p>Atlas A3 训练系列产品/Atlas A3 推理系列产品采用方式一。</p></div><div data-filter="910b"><p>Atlas A2 训练系列产品/Atlas A2 推理系列产品采用方式一。</p></div><div data-filter="310p"><p>Atlas 推理系列产品AI Core采用方式二。</p></div><ul><li><p>排布方式一：</p><p>MrgSort处理的数据一般是经过Sort处理后的数据，也就是Sort接口的输出，队列的结构如下所示：</p><ul><li><p>数据类型为float，每个结构占据8Bytes。</p><p><img src="'+i+'" alt></p></li><li><p>数据类型为half，每个结构也占据8Bytes，中间有2Bytes保留。</p><p><img src="'+r+`" alt></p></li></ul></li><li><p>排布方式二：Region Proposal排布</p><p>输入输出数据均为Region Proposal，具体请参见<a href="Sort.html">Sort</a>中的排布方式二。</p></li></ul><h2 id="函数原型">函数原型<a class="header-anchor" href="#函数原型">​</a></h2><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>template &lt;typename T, bool isExhaustedSuspension = false&gt;
__aicore__ inline void MrgSort(const LocalTensor&lt;T&gt;&amp; dst, const MrgSortSrcList&lt;T&gt;&amp; sortList, const uint16_t elementCountList[4], uint32_t sortedNum[4], uint16_t validBit, const int32_t repeatTime)
</code></pre></div><h2 id="参数说明">参数说明<a class="header-anchor" href="#参数说明">​</a></h2><p><strong>表1</strong> 模板参数说明</p><table><thead><tr><th>参数名</th><th>描述</th></tr></thead><tbody><tr><td>T</td><td>操作数的数据类型。支持的数据类型为：half、float。</td></tr><tr><td>isExhaustedSuspension</td><td>某条队列耗尽（即该队列已经全部排序到目的操作数）后，是否需要停止合并。类型为bool，参数取值如下：<br>false：直到所有队列耗尽完才停止合并。<br>true：某条队列耗尽后，停止合并。<br><br>默认值为false。</td></tr></tbody></table><p><strong>表2</strong> 接口参数说明</p><table><thead><tr><th>参数名</th><th>输入/输出</th><th>描述</th></tr></thead><tbody><tr><td>dst</td><td>输出</td><td>目的操作数，存储经过排序后的数据。<br><br>类型为<a href="../../basic_api/data_structures/LocalTensor/LocalTensor.html">LocalTensor</a>，支持的TPosition为VECIN/VECCALC/VECOUT。</td></tr><tr><td>sortList</td><td>输入</td><td>源操作数，支持2-4个队列，并且每个队列都已经排好序，类型为MrgSortSrcList结构体，具体请参考下表。MrgSortSrcList中传入要合并的队列，定义如下方代码所示。</td></tr><tr><td>elementCountList</td><td>输入</td><td>四个源队列的长度（排序方式一：8Bytes结构的数目，排序方式二：16*sizeof(T)Bytes结构的数目），类型为长度为4的uint16_t数据类型的数组，理论上每个元素取值范围[0, 4095]，但不能超出UB的存储空间。</td></tr><tr><td>sortedNum</td><td>输出</td><td>耗尽模式下（即isExhaustedSuspension为true时），停止合并时每个队列已排序的元素个数。</td></tr><tr><td>validBit</td><td>输入</td><td>有效队列个数，取值如下：<br>0b11：前两条队列有效<br>0b111：前三条队列有效<br>0b1111：四条队列全部有效</td></tr><tr><td>repeatTime</td><td>输入</td><td>迭代次数，每一次源操作数和目的操作数跳过四个队列总长度。取值范围：repeatTime∈[1,255]。<br>repeatTime参数生效是有条件的，需要同时满足以下四个条件：<br>srcLocal包含四条队列并且validBit=15。<br>四个源队列的长度一致。<br>四个源队列连续存储。<br>isExhaustedSuspension为false。</td></tr></tbody></table><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>template &lt;typename T&gt;
struct MrgSortSrcList {
    LocalTensor&lt;T&gt; src1;
    LocalTensor&lt;T&gt; src2;
    LocalTensor&lt;T&gt; src3; // 当要合并的队列个数小于3，可以为空tensor
    LocalTensor&lt;T&gt; src4; // 当要合并的队列个数小于4，可以为空tensor
};
</code></pre></div><p><strong>表3</strong> MrgSortSrcList参数说明</p><table><thead><tr><th>参数名称</th><th>输入/输出</th><th>含义</th></tr></thead><tbody><tr><td>src1</td><td>输入</td><td>源操作数，第一个已经排好序的队列。<br><br>类型为<a href="../../basic_api/data_structures/LocalTensor/LocalTensor.html">LocalTensor</a>，支持的TPosition为VECIN/VECCALC/VECOUT。<br><br>数据类型与目的操作数保持一致。支持的数据类型为：half、float。</td></tr><tr><td>src2</td><td>输入</td><td>源操作数，第二个已经排好序的队列。<br><br>类型为<a href="../../basic_api/data_structures/LocalTensor/LocalTensor.html">LocalTensor</a>，支持的TPosition为VECIN/VECCALC/VECOUT。<br><br>数据类型与目的操作数保持一致。支持的数据类型为：half、float。</td></tr><tr><td>src3</td><td>输入</td><td>源操作数，第三个已经排好序的队列。<br><br>类型为<a href="../../basic_api/data_structures/LocalTensor/LocalTensor.html">LocalTensor</a>，支持的TPosition为VECIN/VECCALC/VECOUT。<br><br>数据类型与目的操作数保持一致。支持的数据类型为：half、float。</td></tr><tr><td>src4</td><td>输入</td><td>源操作数，第四个已经排好序的队列。<br><br>类型为<a href="../../basic_api/data_structures/LocalTensor/LocalTensor.html">LocalTensor</a>，支持的TPosition为VECIN/VECCALC/VECOUT。<br><br>数据类型与目的操作数保持一致。支持的数据类型为：half、float。</td></tr></tbody></table><h2 id="返回值说明">返回值说明<a class="header-anchor" href="#返回值说明">​</a></h2><p>无</p><h2 id="约束说明">约束说明<a class="header-anchor" href="#约束说明">​</a></h2><ul><li>当存在score[i]与score[j]相同时，如果i&gt;j，则score[j]将首先被选出来，排在前面，即index的顺序与输入顺序一致。</li><li>每次迭代内的数据会进行排序，不同迭代间的数据不会进行排序。</li><li>操作数地址对齐要求请参见<a href="../../general_description_and_constraints.html#section796754519912">通用地址对齐约束</a>。</li></ul><h2 id="调用示例">调用示例<span id="section642mcpsimp"></span><a class="header-anchor" href="#调用示例">​</a></h2><ul><li><p>处理128个half类型数据。</p><p>该样例适用于：</p><div data-filter="950"><p>Ascend 950PR/Ascend 950DT</p></div><div data-filter="910b"><p>Atlas A2 训练系列产品/Atlas A2 推理系列产品</p></div><div data-filter="A3"><p>Atlas A3 训练系列产品/Atlas A3 推理系列产品</p></div><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>uint32_t elementCount = 128;                // 元素个数
uint32_t calcBufferSize = elementCount * 8; // 每个元素占据8字节
uint32_t tmpBufferSize = elementCount * 8;
uint32_t sortedLocalSize = elementCount * 4;
uint32_t sortRepeatTimes = elementCount / 32;
uint32_t extractRepeatTimes = elementCount / 32;
uint32_t sortTmpLocalSize = elementCount * 4;

uint32_t singleMergeTmpElementCount = elementCount / 4;
uint32_t baseOffset = AscendC::GetSortOffset&lt;half&gt;(singleMergeTmpElementCount);
// sortList：待合并的有序队列列表
AscendC::MrgSortSrcList sortList = AscendC::MrgSortSrcList(
    sortedLocal[0], sortedLocal[baseOffset], sortedLocal[2 * baseOffset], sortedLocal[3 * baseOffset]);
uint16_t singleDataSize = elementCount / 4; // 队列长度
const uint16_t elementCountList[4] = {singleDataSize, singleDataSize, singleDataSize, singleDataSize}; // 4个队列的长度
uint32_t sortedNum[4];
// 合并sortList中的4条队列
AscendC::MrgSort&lt;half, false&gt;(sortTmpLocal, sortList, elementCountList, sortedNum, 0b1111, 1);
</code></pre></div><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>示例结果
输入数据(srcValueGm): 128个half类型数据
[31 30 29 ... 2 1 0
 63 62 61 ... 34 33 32
 95 94 93 ... 66 65 64
 127 126 125 ... 98 97 96]
输入数据(srcIndexGm):
[31 30 29 ... 2 1 0
 63 62 61 ... 34 33 32
 95 94 93 ... 66 65 64
 127 126 125 ... 98 97 96]
输出数据(dstValueGm):
[127 126 125 ... 2 1 0]
输出数据(dstIndexGm):
[127 126 125 ... 2 1 0]
</code></pre></div></li><li><p>处理64个half类型数据。</p><p>该样例适用于：</p><div data-filter="310p"><p>Atlas 推理系列产品AI Core</p></div><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>uint32_t elementCount = 64; // 元素个数
// 单条队列元素个数
uint32_t singleMergeTmpElementCount = elementCount / 4;
uint32_t baseOffset = AscendC::GetSortOffset&lt;half&gt;(singleMergeTmpElementCount);
// sortList：待合并的有序队列列表
AscendC::MrgSortSrcList sortList = AscendC::MrgSortSrcList(
    sortedLocal[0], sortedLocal[baseOffset], sortedLocal[2 * baseOffset], sortedLocal[3 * baseOffset]);
uint16_t singleDataSize = elementCount / 4; // 队列长度
const uint16_t elementCountList[4] = {singleDataSize, singleDataSize, singleDataSize, singleDataSize}; // 4个队列的长度
uint32_t sortedNum[4];
// 合并sortList中的4条队列
AscendC::MrgSort&lt;half, false&gt;(sortTmpLocal, sortList, elementCountList, sortedNum, 0b1111, 1);
</code></pre></div><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>示例结果
输入数据(srcValueGm): 64个half类型数据
[15 14 13 ... 2 1 0
 31 30 29 ... 18 17 16
 47 46 45 ... 34 33 32
 63 62 61 ... 50 49 48]
输入数据(srcIndexGm):
[15 14 13 ... 2 1 0
 31 30 29 ... 18 17 16
 47 46 45 ... 34 33 32
 63 62 61 ... 50 49 48]
输出数据(dstValueGm):
[63 62 61 ... 2 1 0]
输出数据(dstIndexGm):
[63 62 61 ... 2 1 0]
</code></pre></div></li></ul></article></div>`,1)])])}const b=e(n,[["render",o]]);export{g as __pageData,b as default};
