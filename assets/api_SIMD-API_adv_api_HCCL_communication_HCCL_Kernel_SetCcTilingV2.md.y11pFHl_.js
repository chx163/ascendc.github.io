import{_ as l,o as a,a as t,b as e}from"./app.C41L12d5.js";const g=JSON.parse('{"title":"","description":"","frontmatter":{"breadcrumbs":[{"text":"Ascend C API","link":"/api/api_list"},{"text":"SIMD API","link":"/api/SIMD-API/SIMD-API"},{"text":"高阶API","link":"/api/SIMD-API/adv_api/adv_api"},{"text":"HCCL通信类","link":"/api/SIMD-API/adv_api/HCCL_communication/HCCL_communication"},{"text":"HCCL核函数（Kernel）侧接口","link":"/api/SIMD-API/adv_api/HCCL_communication/HCCL_Kernel/HCCL_Kernel"},{"text":"SetCcTilingV2","link":"/api/SIMD-API/adv_api/HCCL_communication/HCCL_Kernel/SetCcTilingV2"}]},"headers":[],"relativePath":"api/SIMD-API/adv_api/HCCL_communication/HCCL_Kernel/SetCcTilingV2.md","filePath":"api/SIMD-API/adv_api/HCCL_communication/HCCL_Kernel/SetCcTilingV2.md","outlineHeaders":[{"level":2,"title":"产品支持情况","slug":"产品支持情况","link":"#产品支持情况"},{"level":2,"title":"功能说明","slug":"功能说明","link":"#功能说明"},{"level":2,"title":"函数原型","slug":"函数原型","link":"#函数原型"},{"level":2,"title":"参数说明","slug":"参数说明","link":"#参数说明"},{"level":2,"title":"返回值说明","slug":"返回值说明","link":"#返回值说明"},{"level":2,"title":"约束说明","slug":"约束说明","link":"#约束说明"},{"level":2,"title":"调用示例","slug":"调用示例","link":"#调用示例"}],"lastUpdated":1787132628000}'),n={name:"api/SIMD-API/adv_api/HCCL_communication/HCCL_Kernel/SetCcTilingV2.md"};function c(s,i,d,h,C,r){return a(),t("div",null,[...i[0]||(i[0]=[e(`<div><article class="markdown-body"><h1>SetCcTilingV2</h1><h2 id="产品支持情况">产品支持情况<a class="header-anchor" href="#产品支持情况">​</a></h2><div data-filter="950"><ul><li>Ascend 950PR/Ascend 950DT：支持</li></ul></div><div data-filter="A3"><ul><li>Atlas A3 训练系列产品/Atlas A3 推理系列产品：支持</li></ul></div><div data-filter="910b"><ul><li>Atlas A2 训练系列产品/Atlas A2 推理系列产品：支持</li></ul></div><div data-filter="310b"><ul><li>Atlas 200I/500 A2 推理产品：不支持</li></ul></div><div data-filter="310p"><ul><li>Atlas 推理系列产品AI Core：不支持</li><li>Atlas 推理系列产品Vector Core：不支持</li></ul></div><div data-filter="910"><ul><li>Atlas 训练系列产品：不支持</li></ul></div><h2 id="功能说明">功能说明<a class="header-anchor" href="#功能说明">​</a></h2><p>用于设置HCCL客户端中某个通信算法配置的TilingData地址。</p><h2 id="函数原型">函数原型<a class="header-anchor" href="#函数原型">​</a></h2><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>__aicore__ inline int32_t SetCcTilingV2(uint64_t offset)
</code></pre></div><h2 id="参数说明">参数说明<a class="header-anchor" href="#参数说明">​</a></h2><p><strong>表1</strong> 接口参数说明</p><table><thead><tr><th>参数名</th><th>输入/输出</th><th>描述</th></tr></thead><tbody><tr><td>offset</td><td>输入</td><td>通信算法配置<a href="../HCCL_Tiling/TilingData_struct.html#table678914014562">Mc2CcTiling</a>参数地址相对于<a href="../HCCL_Tiling/TilingData_struct.html#table4835205712588">Mc2InitTiling</a>起始地址的偏移。<a href="../HCCL_Tiling/TilingData_struct.html#table678914014562">Mc2CcTiling</a>在Host侧计算得出，具体请参考<a href="../HCCL_Tiling/TilingData_struct.html#table678914014562">表2 Mc2CcTiling参数说明</a>，由框架传递到核函数（Kernel）中使用。</td></tr></tbody></table><h2 id="返回值说明">返回值说明<a class="header-anchor" href="#返回值说明">​</a></h2><ul><li>HCCL_SUCCESS，表示成功。</li><li>HCCL_FAILED，表示失败。</li></ul><h2 id="约束说明">约束说明<a class="header-anchor" href="#约束说明">​</a></h2><ul><li>若调用本接口，必须保证<a href="InitV2.html">InitV2</a>在本接口前被调用。</li><li>Tiling参数相同的同一种通信算法在调用Prepare接口前，只需要调用一次本接口，请参考调用示例：<a href="#li71505119260">类型不同、Tiling参数不同的通信</a>。</li><li>对于同一种通信算法，如果Tiling参数不同，重复调用本接口会覆盖之前的Tiling参数地址，因此需要在调用Prepare接口后再调用本接口设置新的Tiling参数。请参考调用示例：<a href="#li1163031215116">类型相同、Tiling参数不同的通信</a>。</li><li>若调用本接口，必须使用标准C++语法定义TilingData结构体的开发方式。</li></ul><h2 id="调用示例">调用示例<a class="header-anchor" href="#调用示例">​</a></h2><ul><li><p>用户自定义TilingData结构体：</p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>class UserCustomTilingData {
    AscendC::tiling::Mc2InitTiling initTiling;
    AscendC::tiling::Mc2CcTiling allGatherTiling;
    AscendC::tiling::Mc2CcTiling allReduceTiling1;
    AscendC::tiling::Mc2CcTiling allReduceTiling2;
    CustomTiling param;
};
</code></pre></div></li><li><p><span id="li71505119260"></span>类型不同、Tiling参数不同的通信</p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>extern &quot;C&quot; __global__ __aicore__ void userKernel(GM_ADDR aGM, GM_ADDR workspaceGM, GM_ADDR tilingGM)
{
    REGISTER_TILING_DEFAULT(UserCustomTilingData);
    GET_TILING_DATA_WITH_STRUCT(UserCustomTilingData, tilingData, tilingGM);

    Hccl hccl;
    GM_ADDR contextGM = AscendC::GetHcclContext&lt;0&gt;();
    hccl.InitV2(contextGM, &amp;tilingData);

    // 在下发任务之前，通过SetCcTilingV2设置对应的tiling
    if (hccl.SetCcTilingV2(offsetof(UserCustomTilingData, allGatherTiling)) != HCCL_SUCCESS ||
        hccl.SetCcTilingV2(offsetof(UserCustomTilingData, allReduceTiling1)) != HCCL_SUCCESS) {
        return;
    }
    const auto agHandleId = hccl.AllGather&lt;true&gt;(sendBuf, recvBuf, dataCount, HcclDataType::HCCL_DATA_TYPE_FP16);
    hccl.Wait(agHandleId);

    const auto arHandleId = hccl.AllReduce&lt;true&gt;(
        sendBuf, recvBuf, dataCount, HcclDataType::HCCL_DATA_TYPE_FP16, HcclReduceOp::HCCL_REDUCE_SUM);
    hccl.Wait(arHandleId);

    hccl.Finalize();
}
</code></pre></div></li><li><p><span id="li1163031215116"></span>类型相同、Tiling参数不同的通信</p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>extern &quot;C&quot; __global__ __aicore__ void userKernel(GM_ADDR aGM, GM_ADDR workspaceGM, GM_ADDR tilingGM)
{
    REGISTER_TILING_DEFAULT(UserCustomTilingData);
    GET_TILING_DATA_WITH_STRUCT(UserCustomTilingData, tilingData, tilingGM);

    Hccl hccl;
    GM_ADDR contextGM = AscendC::GetHcclContext&lt;0&gt;();
    hccl.InitV2(contextGM, &amp;tilingData);

    // 在下发通信任务之前，通过SetCcTilingV2设置对应的Tiling参数地址
    if (hccl.SetCcTilingV2(offsetof(UserCustomTilingData, allReduceTiling1)) != HCCL_SUCCESS) {
        return;
    }
    const auto arHandleId1 = hccl.AllReduce&lt;true&gt;(
        sendBuf, recvBuf, dataCount, HcclDataType::HCCL_DATA_TYPE_FP16, HcclReduceOp::HCCL_REDUCE_SUM);
    hccl.Wait(arHandleId1);

    // 第二次AllReduce的Tiling参数与第一次不同，在第一次Prepare之后再调用SetCcTilingV2
    if (hccl.SetCcTilingV2(offsetof(UserCustomTilingData, allReduceTiling2)) != HCCL_SUCCESS) {
        return;
    }
    const auto arHandleId2 = hccl.AllReduce&lt;true&gt;(
        sendBuf, recvBuf, dataCount, HcclDataType::HCCL_DATA_TYPE_FP16, HcclReduceOp::HCCL_REDUCE_SUM);
    hccl.Wait(arHandleId2);

    hccl.Finalize();
}
</code></pre></div></li></ul></article></div>`,1)])])}const _=l(n,[["render",c]]);export{g as __pageData,_ as default};
