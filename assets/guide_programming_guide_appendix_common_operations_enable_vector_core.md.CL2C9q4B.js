import{_ as t,o,a,b as r}from"./app.C41L12d5.js";const m=JSON.parse('{"title":"","description":"","frontmatter":{"breadcrumbs":[{"text":"Ascend C算子开发指南","link":"/guide/getting_started/ascend_c_overview_and_learning_path"},{"text":"编程指南","link":"/guide/programming_guide/document_structure"},{"text":"附录","link":"/guide/programming_guide/appendix/show_kernel_debug_data_tool"},{"text":"常用操作","link":"/guide/programming_guide/appendix/common_operations/develop_dynamic_input_operator"},{"text":"如何在矢量编程时启用Vector Core","link":"/guide/programming_guide/appendix/common_operations/enable_vector_core"}]},"headers":[],"relativePath":"guide/programming_guide/appendix/common_operations/enable_vector_core.md","filePath":"guide/programming_guide/appendix/common_operations/enable_vector_core.md","lastUpdated":1787050286000}'),n={name:"guide/programming_guide/appendix/common_operations/enable_vector_core.md"};function c(i,e,l,s,_,d){return o(),a("div",null,[...e[0]||(e[0]=[r(`<div><article class="markdown-body"><h1>如何在矢量编程时启用Vector Core<span id="ZH-CN_TOPIC_0000001883181813"></span></h1><p>针对Atlas 推理系列产品，其硬件架构除了AI Core外，还额外设置了单独的Vector Core，作为AI Core中Vector计算单元的补充，从而缓解Vector计算瓶颈。Vector Core只包括了两种基础计算资源：向量计算单元（Vector Unit）和标量计算单元（Scalar Unit），分别用于完成向量与标量的数据计算。矢量算子开发时，启用Vector Core，算子执行时会同时启动AI Core和Vector Core，这些核并行执行相同的核函数（Kernel）代码。</p><p>本节将重点介绍如何启用Atlas 推理系列产品中的Vector Core。学习本节内容之前，建议您先熟悉<a href="../../../operator_practice/simd_operator_impl/vector_programming/overview.html">算子实现</a>、<a href="../kernel_direct_call_from_sample.html">基于样例工程完成Kernel直调</a>、<a href="../../advanced_programming/aclnn_operator_development/overview.html">工程化算子开发</a>的相关内容，掌握基于AI Core的算子端到端开发流程。在此基础上本章将重点阐述启用Vector Core时的差异点。具体如下：</p><ol><li><p>完成算子kernel侧开发时，需要通过宏<a href="../../../../api/SIMD-API/basic_api/Kernel-Tiling/set_Kernel_type.html">KERNEL_TASK_TYPE_DEFAULT</a>启用Vector Core，算子执行时会同时启动AI Core和Vector Core，此时AI Core会当成Vector Core使用。如下的代码样例展示了启用Vector Core的方法：</p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>extern &quot;C&quot; __global__ __aicore__ void add_custom(__gm__ uint8_t *x, __gm__ uint8_t *y, __gm__ uint8_t *z, __gm__ uint8_t *workspace, __gm__ uint8_t *tiling)
{
    GET_TILING_DATA(tilingData, tiling);
    if (workspace == nullptr) {
        return;
    }
    GM_ADDR usr = AscendC::GetUserWorkspace(workspace);
    KernelAdd op;
    op.Init(x, y, z, tilingData.numBlocks, tilingData.totalLength, tilingData.tileNum);
    KERNEL_TASK_TYPE_DEFAULT(KERNEL_TYPE_MIX_VECTOR_CORE); // 启用VectorCore
    if (TILING_KEY_IS(1)) {
        op.Process1();
    } else if (TILING_KEY_IS(2)) {
        op.Process2();
    }
    // ...
}
</code></pre></div></li><li><p>完成host侧tiling开发时，设置的numBlocks代表的是AI Core和Vector Core的总数，比如用户在host侧设置numBlocks为10，则会启动总数为10的AI Core和Vector Core；为保证启动Vector Core，设置数值应大于AI Core的核数。您可以通过<a href="../../../../api/Utils-API/platform_info/PlatformAscendC/GetCoreNumAic.html">GetCoreNumAic</a>接口获取AI Core的核数，<a href="../../../../api/Utils-API/platform_info/PlatformAscendC/GetCoreNumVector.html">GetCoreNumVector</a>接口获取Vector Core的核数。如下代码片段，分别为使用kernel直调工程和自定义算子工程时的设置样例，此处设置为AI Core和Vector Core的总和，表示所有AI Core和Vector Core都启动。</p><ul><li><p>kernel直调工程</p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>auto ascendcPlatform = platform_ascendc::PlatformAscendCManager::GetInstance();
auto totalCoreNum = ascendcPlatform.GetCoreNumAic();
// ASCENDXXX请替换为实际的版本型号
if (ascendcPlatform.GetSocVersion() == platform_ascendc::SocVersion::ASCENDXXX) {
   totalCoreNum = totalCoreNum + ascendcPlatform.GetCoreNumVector();
}
...
kernel_name&lt;&lt;&lt;totalCoreNum, 0, stream&gt;&gt;&gt;(argument list);
</code></pre></div></li><li><p>自定义算子工程</p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>// 配套的host侧tiling函数示例：
ge::graphStatus TilingFunc(gert::TilingContext* context)
{	
    // 启用VectorCore，将numBlocks置为AI Core中vector核数 + Vector Core中的vector核数
    auto ascendcPlatform = platform_ascendc::PlatformAscendC(platformInfo);
    auto totalCoreNum = ascendcPlatform.GetCoreNumAic();
    // ASCENDXXX请替换为实际的版本型号
    if (ascendcPlatform.GetSocVersion() == platform_ascendc::SocVersion::ASCENDXXX) {
       totalCoreNum = totalCoreNum + ascendcPlatform.GetCoreNumVector();
    }
    context-&gt;SetSimdNumBlocks(totalCoreNum);
}
</code></pre></div></li></ul></li></ol><div class="callout callout-note"><p class="callout-title"><svg class="callout-icon" viewBox="0 0 16 16" width="16" height="16"><path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8Zm8-6.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13ZM6.5 7.75A.75.75 0 0 1 7.25 7h1a.75.75 0 0 1 .75.75v2.75h.25a.75.75 0 0 1 0 1.5h-2a.75.75 0 0 1 0-1.5h.25v-2h-.25a.75.75 0 0 1-.75-.75ZM8 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"></path></svg>说明</p><ul><li>请参考<a href="../../../../api/api_list.html">Ascend C API</a>中具体API支持的型号，来判断API接口是否支持Atlas 推理系列产品Vector Core。</li><li>支持Vector Core后，因为AI Core和Vector Core会分别执行，通过不同的任务进行调度，所以不支持核间同步指令，如IBSet、IBWait、SyncAll等。</li><li>算子计算溢出（输入inf/nan或计算结果超出范围）时，需注意AI Core和Vector Core结果表现不一致，AI Core仅支持饱和模式，Vector Core仅支持inf/nan模式。</li></ul></div></article></div>`,1)])])}const h=t(n,[["render",c]]);export{m as __pageData,h as default};
