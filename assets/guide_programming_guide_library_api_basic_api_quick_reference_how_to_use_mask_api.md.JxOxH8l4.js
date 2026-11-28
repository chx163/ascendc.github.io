import{_ as a,o as e,a as s,b as r}from"./app.BGziXukh.js";const A=JSON.parse('{"title":"","description":"","frontmatter":{"breadcrumbs":[{"text":"Ascend C算子开发指南","link":"/guide/getting_started/ascend_c_overview_and_learning_path"},{"text":"编程指南","link":"/guide/programming_guide/programming_guide"},{"text":"C++类库API","link":"/guide/programming_guide/library_api/library_api"},{"text":"基础API","link":"/guide/programming_guide/library_api/basic_api/basic_api"},{"text":"常用操作速查指导","link":"/guide/programming_guide/library_api/basic_api/quick_reference/quick_reference"},{"text":"如何使用掩码操作API","link":"/guide/programming_guide/library_api/basic_api/quick_reference/how_to_use_mask_api"}]},"headers":[],"relativePath":"guide/programming_guide/library_api/basic_api/quick_reference/how_to_use_mask_api.md","filePath":"guide/programming_guide/library_api/basic_api/quick_reference/how_to_use_mask_api.md","lastUpdated":1795158538000}'),d={name:"guide/programming_guide/library_api/basic_api/quick_reference/how_to_use_mask_api.md"};function l(c,t,n,o,i,p){return e(),s("div",null,[...t[0]||(t[0]=[r(`<div><article class="markdown-body"><h1>如何使用掩码操作API<span id="ZH-CN_TOPIC_0000002305974105"></span></h1><p>Mask用于控制矢量计算中参与计算的元素个数，支持以下工作模式及配置方式：</p><p><strong>表1</strong> Mask工作模式<span id="zh-cn_topic_0000002267504584_table414483923116"></span></p><table><thead><tr><th>工作模式</th><th>说明</th></tr></thead><tbody><tr><td>Normal模式</td><td>默认模式，支持单次迭代内的Mask能力，需要开发者配置迭代次数，额外进行尾块的计算。<br><strong>Normal模式下，Mask用来控制单次迭代内参与计算的元素个数。</strong><br>通过调用SetMaskNorm设置Normal模式。</td></tr><tr><td>Counter模式</td><td>简化模式，直接传入计算数据量，自动推断迭代次数，不需要开发者去感知迭代次数、处理非对齐尾块的操作；但是不具备单次迭代内的Mask能力。<br><strong>Counter模式下，Mask表示整个矢量计算参与计算的元素个数。</strong><br>通过调用SetMaskCount设置Counter模式。</td></tr></tbody></table><p><strong>表2</strong> Mask配置方式<span id="zh-cn_topic_0000002267504584_table642464733119"></span></p><table><thead><tr><th>配置方式</th><th>说明</th></tr></thead><tbody><tr><td>接口传参（默认）</td><td>通过矢量计算API的入参直接传递Mask值。矢量计算API的模板参数isSetMask（仅部分API支持）用于控制接口传参还是外部API配置，默认值为true，表示接口传参。Mask对应于高维切分计算API中的mask/mask[]参数或者tensor前n个数据计算API中的calCount参数。</td></tr><tr><td>外部API配置</td><td>调用SetVectorMask接口设置Mask值，矢量计算API的模板参数isSetMask设置为false，接口入参中的Mask参数（对应于高维切分计算API中的mask/mask[]参数或者tensor前n个数据计算API中的calCount参数）不生效。适用于Mask参数相同，多次重复使用的场景，无需在矢量计算API内部反复设置，会有一定的性能优势。</td></tr></tbody></table><p>Mask操作的使用方式如下：</p><p><strong>表3</strong> Mask操作的使用方式<span id="zh-cn_topic_0000002267504584_table1957843418427"></span></p><table><thead><tr><th>配置方式</th><th>工作模式</th><th>前 n个数据计算API</th><th>高维切分计算API</th></tr></thead><tbody><tr><td>接口传参</td><td>Normal模式</td><td>不涉及。</td><td>isSetMask模板参数设置为true，通过接口入参传入Mask，根据使用场景配置dataBlockStride、repeatStride、repeatTime参数。</td></tr><tr><td>接口传参</td><td>Counter模式</td><td>isSetMask模板参数设置为true，通过接口入参传入Mask。</td><td>  • isSetMask模板参数设置为true，通过接口入参传入Mask。<br>  • 根据使用场景配置dataBlockStride、repeatStride参数。repeatTime传入固定值即可，建议统一设置为1，该值不生效。</td></tr><tr><td>外部API配置</td><td>Normal模式</td><td>不涉及。</td><td>调用SetVectorMask设置Mask，之后调用高维切分计算API。<br>  • isSetMask模板参数设置为false，接口入参中的mask值设置为占位符MASK_PLACEHOLDER，用于占位，无实际含义。<br>  • 根据使用场景配置repeatTime、dataBlockStride、repeatStride参数。</td></tr><tr><td>外部API配置</td><td>Counter模式</td><td>调用SetVectorMask设置Mask，之后调用前n个数据计算API，isSetMask模板参数设置为false；接口入参中的calCount建议设置成1。</td><td>调用SetVectorMask设置Mask，之后调用高维切分计算API。<br>  • isSetMask模板参数设置为false；接口入参中的mask值设置为MASK_PLACEHOLDER，用于占位，无实际含义。<br>  • 根据使用场景配置dataBlockStride、repeatStride参数。repeatTime传入固定值即可，建议统一设置为1，该值不生效。</td></tr></tbody></table><p>典型场景的使用示例如下：</p><ul><li><p>场景1：Normal模式 + 外部API配置 + 高维切分计算API</p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>AscendC::LocalTensor&lt;half&gt; dstLocal;
AscendC::LocalTensor&lt;half&gt; src0Local;
AscendC::LocalTensor&lt;half&gt; src1Local;

// 1、设置Normal模式
AscendC::SetMaskNorm();
// 2、设置Mask
AscendC::SetVectorMask&lt;half, AscendC::MaskMode::NORMAL&gt;(0xffffffffffffffff, 0xffffffffffffffff);  // 逐bit模式
// SetVectorMask&lt;half, MaskMode::NORMAL&gt;(128);  // 连续模式

// 3、多次调用矢量计算API, isSetMask模板参数设置为false，接口入参中的mask值设置为占位符MASK_PLACEHOLDER，用于占位，无实际含义
// 根据使用场景配置repeatTime、dataBlockStride、repeatStride参数
// dstBlkStride, src0BlkStride, src1BlkStride = 1,单次迭代内数据连续读取和写入
// dstRepStride, src0RepStride, src1RepStride = 8,相邻迭代间数据连续读取和写入
AscendC::Add&lt;half, false&gt;(dstLocal, src0Local, src1Local, AscendC::MASK_PLACEHOLDER, 1, { 1, 1, 1, 8, 8, 8 });
AscendC::Sub&lt;half, false&gt;(src0Local, dstLocal, src1Local, AscendC::MASK_PLACEHOLDER, 1, { 1, 1, 1, 8, 8, 8 });
AscendC::Mul&lt;half, false&gt;(src1Local, dstLocal, src0Local, AscendC::MASK_PLACEHOLDER, 1, { 1, 1, 1, 8, 8, 8 });
// 4、恢复Mask值为默认值
AscendC::ResetMask();
</code></pre></div></li><li><p>场景2：Counter模式 + 外部API配置 + 高维切分计算API</p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>AscendC::LocalTensor&lt;half&gt; dstLocal;
AscendC::LocalTensor&lt;half&gt; src0Local;
AscendC::LocalTensor&lt;half&gt; src1Local;
int32_t len = 128;  // 参与计算的元素个数
// 1、设置Counter模式
AscendC::SetMaskCount();
// 2、设置Mask
AscendC::SetVectorMask&lt;half, AscendC::MaskMode::COUNTER&gt;(len);
// 3、多次调用矢量计算API, isSetMask模板参数设置为false；接口入参中的mask值设置为MASK_PLACEHOLDER，用于占位，无实际含义
// 根据使用场景正确配置dataBlockStride、repeatStride参数。repeatTime传入固定值即可，建议统一设置为1，该值不生效
AscendC::Add&lt;half, false&gt;(dstLocal, src0Local, src1Local, AscendC::MASK_PLACEHOLDER, 1, { 1, 1, 1, 8, 8, 8 });
AscendC::Sub&lt;half, false&gt;(src0Local, dstLocal, src1Local, AscendC::MASK_PLACEHOLDER, 1, { 1, 1, 1, 8, 8, 8 });
AscendC::Mul&lt;half, false&gt;(src1Local, dstLocal, src0Local, AscendC::MASK_PLACEHOLDER, 1, { 1, 1, 1, 8, 8, 8 });
// 4、恢复工作模式
AscendC::SetMaskNorm();
// 5、恢复Mask值为默认值
AscendC::ResetMask();
</code></pre></div></li><li><p>场景3：Counter模式 + 外部API配置 + 前n个数据计算接口配合使用</p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>AscendC::LocalTensor&lt;half&gt; dstLocal;
AscendC::LocalTensor&lt;half&gt; src0Local;
half num = 2; 
// 1、设置Mask
AscendC::SetVectorMask&lt;half, AscendC::MaskMode::COUNTER&gt;(128); // 参与计算的元素个数为128
// 2、调用前n个数据计算API，isSetMask模板参数设置为false；接口入参中的calCount建议设置成1。
AscendC::Adds&lt;half, false&gt;(dstLocal, src0Local, num, 1);
AscendC::Muls&lt;half, false&gt;(dstLocal, src0Local, num, 1);
// 3、恢复工作模式
AscendC::SetMaskNorm();
// 4、恢复Mask值为默认值
AscendC::ResetMask();
</code></pre></div></li></ul><div class="callout callout-note"><p class="callout-title"><svg class="callout-icon" viewBox="0 0 16 16" width="16" height="16"><path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8Zm8-6.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13ZM6.5 7.75A.75.75 0 0 1 7.25 7h1a.75.75 0 0 1 .75.75v2.75h.25a.75.75 0 0 1 0 1.5h-2a.75.75 0 0 1 0-1.5h.25v-2h-.25a.75.75 0 0 1-.75-.75ZM8 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"></path></svg>说明</p><ul><li>前n个数据计算API接口内部会设置工作模式为Counter模式，所以如果前n个数据计算API配合Counter模式使用时，无需手动调用<a href="../../../../../api/SIMD-API/basic_api/memory_vector_compute/mask_operations/SetMaskCount.html">SetMaskCount</a>设置Counter模式。</li><li>所有手动使用Counter模式的场景，使用完毕后，需要调用<a href="../../../../../api/SIMD-API/basic_api/memory_vector_compute/mask_operations/SetMaskNorm.html">SetMaskNorm</a>恢复工作模式。</li><li>调用<a href="../../../../../api/SIMD-API/basic_api/memory_vector_compute/mask_operations/SetVectorMask.html">SetVectorMask</a>设置Mask，使用完毕后，需要调用<a href="../../../../../api/SIMD-API/basic_api/memory_vector_compute/mask_operations/ResetMask.html">ResetMask</a>恢复Mask值为默认值。</li><li>使用高维切分计算API配套Counter模式使用时，比前n个数据计算API增加了可间隔的计算，支持dataBlockStride、repeatStride参数。</li></ul></div></article></div>`,1)])])}const _=a(d,[["render",l]]);export{A as __pageData,_ as default};
