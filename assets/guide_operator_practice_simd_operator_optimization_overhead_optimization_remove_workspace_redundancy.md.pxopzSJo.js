import{_ as e,o as a,a as i,b as s}from"./app.C41L12d5.js";const g=JSON.parse('{"title":"","description":"","frontmatter":{"breadcrumbs":[{"text":"Ascend C算子开发指南","link":"/guide/getting_started/ascend_c_overview_and_learning_path"},{"text":"算子实践参考","link":"/guide/operator_practice/document_structure"},{"text":"SIMD算子性能优化","link":"/guide/operator_practice/simd_operator_optimization/simd_operator_optimization"},{"text":"头尾开销优化","link":"/guide/operator_practice/simd_operator_optimization/overhead_optimization/overhead_optimization"},{"text":"核函数内删除Workspace相关冗余操作","link":"/guide/operator_practice/simd_operator_optimization/overhead_optimization/remove_workspace_redundancy"}]},"headers":[],"relativePath":"guide/operator_practice/simd_operator_optimization/overhead_optimization/remove_workspace_redundancy.md","filePath":"guide/operator_practice/simd_operator_optimization/overhead_optimization/remove_workspace_redundancy.md","lastUpdated":1787050286000}'),_={name:"guide/operator_practice/simd_operator_optimization/overhead_optimization/remove_workspace_redundancy.md"};function n(o,t,p,c,r,l){return a(),i("div",null,[...t[0]||(t[0]=[s(`<div><article class="markdown-body"><h1>核函数（Kernel）内删除Workspace相关冗余操作<span id="ZH-CN_TOPIC_0000002499260290"></span></h1><p>【优先级】中</p><p>【描述】在Ascend C算子工程中，编写核函数（Kernel）时传入的参数workspace已经直接赋值为用户Workspace，因此无需再通过SetSysWorkspace和GetUserWorkspace来设置和获取Workspace。减少这些冗余判断后，编译器可以在不使用该参数的情况下进一步优化未用到的workspace变量。</p><p>【反例】</p><p>fast_gelu函数的参数workspace等价于用户workspace，且不为空，仍然对workspace进行判空，并且设置SetSysWorkspace和GetUserWorkspace来获取用户Workspace。</p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>template &lt;uint64_t schMode, uint64_t dType&gt;
__global__ __aicore__ void fast_gelu(__gm__ uint8_t* x, __gm__ uint8_t* y, __gm__ uint8_t* workspace, __gm__ uint8_t* tiling)
{
    // 反例，冗余判断
    if (workspace == nullptr) {
        return;
    }
    SetSysWorkspace(workspace);
    __gm__ uint8_t* userWS = GetUserWorkspace(workspace);
    if (userWS == nullptr) {
        return;
    }
    REGISTER_TILING_DEFAULT(EleBaseTilingDataV2);
    GET_TILING_DATA_WITH_STRUCT(EleBaseTilingDataV2, tilingData, tiling);
    KERNEL_TASK_TYPE_DEFAULT(KERNEL_TYPE_AIV_ONLY);
    TPipe pipe;
    if constexpr (dType == static_cast&lt;uint64_t&gt;(TPL_FP16)) {
        ElementwiseSch&lt;schMode, FastGeluDag::FastGeluNeedCast&lt;half&gt;::OpDag&gt; sch(&amp;tilingData, &amp;pipe);
        sch.Init(x, y);
        sch.Process();
    } else if constexpr (dType == static_cast&lt;uint64_t&gt;(TPL_BF16)) {
        ElementwiseSch&lt;schMode, FastGeluDag::FastGeluNeedCast&lt;bfloat16_t&gt;::OpDag&gt; sch(&amp;tilingData, &amp;pipe);
        sch.Init(x, y);
        sch.Process();
    } else if constexpr (dType == static_cast&lt;uint64_t&gt;(TPL_FP32)) {
        ElementwiseSch&lt;schMode, FastGeluDag::FastGeluNoCast&lt;float&gt;::OpDag&gt; sch(&amp;tilingData, &amp;pipe);
        sch.Init(x, y);
        sch.Process();
    }
}
</code></pre></div><p>【正例】</p><p>fast_gelu函数中删除对workspace参数进行空指针判断，也无需设置SetSysWorkspace和通过GetUserWorkspace来获取Workspace。</p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>template &lt;uint64_t schMode, uint64_t dType&gt;
__global__ __aicore__ void fast_gelu(__gm__ uint8_t* x, __gm__ uint8_t* y, __gm__ uint8_t* workspace, __gm__ uint8_t* tiling)
{
    REGISTER_TILING_DEFAULT(EleBaseTilingDataV2);
    GET_TILING_DATA_WITH_STRUCT(EleBaseTilingDataV2, tilingData, tiling);
    KERNEL_TASK_TYPE_DEFAULT(KERNEL_TYPE_AIV_ONLY);
    TPipe pipe;
    if constexpr (dType == static_cast&lt;uint64_t&gt;(TPL_FP16)) {
        ElementwiseSch&lt;schMode, FastGeluDag::FastGeluNeedCast&lt;half&gt;::OpDag&gt; sch(&amp;tilingData, &amp;pipe);
        sch.Init(x, y);
        sch.Process();
    } else if constexpr (dType == static_cast&lt;uint64_t&gt;(TPL_BF16)) {
        ElementwiseSch&lt;schMode, FastGeluDag::FastGeluNeedCast&lt;bfloat16_t&gt;::OpDag&gt; sch(&amp;tilingData, &amp;pipe);
        sch.Init(x, y);
        sch.Process();
    } else if constexpr (dType == static_cast&lt;uint64_t&gt;(TPL_FP32)) {
        ElementwiseSch&lt;schMode, FastGeluDag::FastGeluNoCast&lt;float&gt;::OpDag&gt; sch(&amp;tilingData, &amp;pipe);
        sch.Init(x, y);
        sch.Process();
    }
}
</code></pre></div></article></div>`,1)])])}const h=e(_,[["render",n]]);export{g as __pageData,h as default};
