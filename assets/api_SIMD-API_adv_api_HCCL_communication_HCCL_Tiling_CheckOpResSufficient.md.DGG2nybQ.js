import{_ as e,o as i,a,b as n}from"./app.DlhOLPn6.js";const p=JSON.parse('{"title":"","description":"","frontmatter":{"breadcrumbs":[{"text":"Ascend C API","link":"/api/api_list"},{"text":"SIMD API","link":"/api/SIMD-API/SIMD-API"},{"text":"高阶API","link":"/api/SIMD-API/adv_api/adv_api"},{"text":"HCCL通信类","link":"/api/SIMD-API/adv_api/HCCL_communication/HCCL_communication"},{"text":"HCCL Tiling侧接口","link":"/api/SIMD-API/adv_api/HCCL_communication/HCCL_Tiling/HCCL_Tiling"},{"text":"CheckOpResSufficient","link":"/api/SIMD-API/adv_api/HCCL_communication/HCCL_Tiling/CheckOpResSufficient"}]},"headers":[],"relativePath":"api/SIMD-API/adv_api/HCCL_communication/HCCL_Tiling/CheckOpResSufficient.md","filePath":"api/SIMD-API/adv_api/HCCL_communication/HCCL_Tiling/CheckOpResSufficient.md","outlineHeaders":[{"level":2,"title":"功能说明","slug":"功能说明","link":"#功能说明"},{"level":2,"title":"函数原型","slug":"函数原型","link":"#函数原型"},{"level":2,"title":"参数说明","slug":"参数说明","link":"#参数说明"},{"level":2,"title":"返回值说明","slug":"返回值说明","link":"#返回值说明"},{"level":2,"title":"约束说明","slug":"约束说明","link":"#约束说明"},{"level":2,"title":"调用示例","slug":"调用示例","link":"#调用示例"}],"lastUpdated":1788853351000}'),c={name:"api/SIMD-API/adv_api/HCCL_communication/HCCL_Tiling/CheckOpResSufficient.md"};function l(d,t,o,r,h,s){return i(),a("div",null,[...t[0]||(t[0]=[n(`<div><article class="markdown-body"><h1>CheckOpResSufficient</h1><h2 id="功能说明">功能说明<a class="header-anchor" href="#功能说明">​</a></h2><p>根据输入的Tiling信息，对指定的通信算法所需资源进行预校验，返回检查结果。</p><h2 id="函数原型">函数原型<a class="header-anchor" href="#函数原型">​</a></h2><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>extern HcclResult __attribute__((visibility(&quot;default&quot;))) CheckOpResSufficient(
    HcclComm comm, void* stream, void* mc2Tiling)
</code></pre></div><h2 id="参数说明">参数说明<a class="header-anchor" href="#参数说明">​</a></h2><p><strong>表1</strong> 参数说明</p><table><thead><tr><th>参数名</th><th>输入/输出</th><th>描述</th></tr></thead><tbody><tr><td>comm</td><td>输入</td><td>初始化后的通信域指针。<br>HcclComm类型的定义可参见<a href="https://gitcode.com/cann/hcomm/blob/master/docs/zh/api_ref/comm_mgr_c/data_type_definition/HcclComm.md">HcclComm</a>。</td></tr><tr><td>stream</td><td>输入</td><td>stream类型为aclrtStream，用于维护一些异步操作的执行顺序，确保按照应用程序中的代码调用顺序在Device上执行。stream创建等管理接口请参考<a href="https://hiascend.com/document/redirect/CannCommunityRuntimeApi">《Runtime运行时API》</a>。</td></tr><tr><td>mc2Tiling</td><td>输入</td><td>MC2算子的Tiling信息，通过<a href="GetTiling.html">GetTiling</a>接口组装到算子<a href="TilingData_struct.html">TilingData结构体</a>中。</td></tr></tbody></table><h2 id="返回值说明">返回值说明<a class="header-anchor" href="#返回值说明">​</a></h2><p>返回HcclResult类型的值，具体取值参考下表。</p><p><strong>表2</strong> 返回值说明</p><table><thead><tr><th>返回值</th><th>描述</th></tr></thead><tbody><tr><td>HCCL_SUCCESS</td><td>资源充足。</td></tr><tr><td>HCCL_E_PARA</td><td>参数格式非法，如Tiling版本、数量非法等。</td></tr><tr><td>HCCL_E_PTR</td><td>空指针错误。</td></tr><tr><td>HCCL_E_NOT_SUPPORT</td><td>通信类型、算法路径等不支持。</td></tr><tr><td>HCCL_E_ALG_NOT_SUPPORTED</td><td>算法未注册。</td></tr><tr><td>HCCL_E_RES_NOT_SUFFICIENT</td><td>所选通信算法所需的通信资源不足。</td></tr></tbody></table><h2 id="约束说明">约束说明<a class="header-anchor" href="#约束说明">​</a></h2><ul><li>仅支持CCU通信引擎。</li><li>仅支持rank数量大于1的场景。</li></ul><h2 id="调用示例">调用示例<a class="header-anchor" href="#调用示例">​</a></h2><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>#include &quot;adv_api/hccl/hccl_mc2.h&quot;

extern &quot;C&quot; void NnopbaseGetTilingData(void *executor, void **tilingData, uint64_t *dataLen);

int rankId = 0;
int64_t g_hcclBufferSize = 200;
int g_op_expansion_mode = 6;

int func() {
    ...
    int ret;
    HcclComm comm;
    aclrtStream stream;
    ret = aclrtSetDevice(rankId);
    ret = aclrtCreateStream(&amp;stream);
    ...
    HcclCommConfig config;
    HcclCommConfigInit(&amp;config);
    config.hcclDeterministic = 0;
    config.hcclBufferSize = g_hcclBufferSize;
    config.hcclOpExpansionMode = g_op_expansion_mode;
    strncpy(config.hcclCommName, &quot;testGroup&quot;, sizeof(config.hcclCommName));
    std::string rankTableFile = getenv(&quot;RANK_TABLE_FILE&quot;);
    ...
    ret = HcclCommInitClusterInfoConfig(rankTableFile.c_str(), rankId, &amp;config, &amp;comm);
    ...
    aclOpExecutor *executor = nullptr;
    void *mc2Tiling = nullptr;
    uint64_t tilingLen = 0;
    NnopbaseGetTilingData(executor, &amp;mc2Tiling, &amp;tilingLen);
    ...
    HcclResult checkRet = CheckOpResSufficient(comm, stream, mc2Tiling);
    if (checkRet == HCCL_E_RES_NOT_SUFFICIENT) {
        // 资源不足处理
        ...
    } else {
        // 其他错误，错误处理
        ...
    }
    return 0;
}
</code></pre></div></article></div>`,1)])])}const _=e(c,[["render",l]]);export{p as __pageData,_ as default};
