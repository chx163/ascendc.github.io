import{_ as t,o as a,a as e,b as i}from"./app.DKoEZOcr.js";const p=JSON.parse('{"title":"","description":"","frontmatter":{"breadcrumbs":[{"text":"Ascend C API","link":"/api/api_list"},{"text":"SIMD API","link":"/api/SIMD-API/SIMD-API"},{"text":"高阶API","link":"/api/SIMD-API/adv_api/adv_api"},{"text":"HCCL通信类","link":"/api/SIMD-API/adv_api/HCCL_communication/HCCL_communication"},{"text":"HCCL核函数（Kernel）侧接口","link":"/api/SIMD-API/adv_api/HCCL_communication/HCCL_Kernel/HCCL_Kernel"},{"text":"InterHcclGroupSync","link":"/api/SIMD-API/adv_api/HCCL_communication/HCCL_Kernel/InterHcclGroupSync"}]},"headers":[],"relativePath":"api/SIMD-API/adv_api/HCCL_communication/HCCL_Kernel/InterHcclGroupSync.md","filePath":"api/SIMD-API/adv_api/HCCL_communication/HCCL_Kernel/InterHcclGroupSync.md","outlineHeaders":[{"level":2,"title":"产品支持情况","slug":"产品支持情况","link":"#产品支持情况"},{"level":2,"title":"功能说明","slug":"功能说明","link":"#功能说明"},{"level":2,"title":"函数原型","slug":"函数原型","link":"#函数原型"},{"level":2,"title":"参数说明","slug":"参数说明","link":"#参数说明"},{"level":2,"title":"返回值说明","slug":"返回值说明","link":"#返回值说明"},{"level":2,"title":"约束说明","slug":"约束说明","link":"#约束说明"},{"level":2,"title":"调用示例","slug":"调用示例","link":"#调用示例"}],"lastUpdated":1787132628000}'),n={name:"api/SIMD-API/adv_api/HCCL_communication/HCCL_Kernel/InterHcclGroupSync.md"};function c(o,l,r,d,h,s){return a(),e("div",null,[...l[0]||(l[0]=[i(`<div><article class="markdown-body"><h1>InterHcclGroupSync</h1><h2 id="产品支持情况">产品支持情况<a class="header-anchor" href="#产品支持情况">​</a></h2><div data-filter="950"><ul><li>Ascend 950PR/Ascend 950DT：不支持</li></ul></div><div data-filter="A3"><ul><li>Atlas A3 训练系列产品/Atlas A3 推理系列产品：支持</li></ul></div><div data-filter="910b"><ul><li>Atlas A2 训练系列产品/Atlas A2 推理系列产品：不支持</li></ul></div><div data-filter="310b"><ul><li>Atlas 200I/500 A2 推理产品：不支持</li></ul></div><div data-filter="310p"><ul><li>Atlas 推理系列产品AI Core：不支持</li><li>Atlas 推理系列产品Vector Core：不支持</li></ul></div><div data-filter="910"><ul><li>Atlas 训练系列产品：不支持</li></ul></div><h2 id="功能说明">功能说明<a class="header-anchor" href="#功能说明">​</a></h2><p>用于等待一个跨通信域的通信任务完成。调用该接口后，本通信域后续下发的通信任务，均等待指定的srcGroupID通信域中的srcHandleID通信任务执行完成，才开始执行。</p><h2 id="函数原型">函数原型<a class="header-anchor" href="#函数原型">​</a></h2><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>__aicore__ inline void InterHcclGroupSync(int8_t srcGroupID, HcclHandle srcHandleID)
</code></pre></div><h2 id="参数说明">参数说明<a class="header-anchor" href="#参数说明">​</a></h2><table><thead><tr><th>参数名</th><th>输入/输出</th><th>描述</th></tr></thead><tbody><tr><td>srcGroupID</td><td>输入</td><td>通信域编号，即后续通信任务所等待的通信任务所在的通信域编号。</td></tr><tr><td>srcHandleID</td><td>输入</td><td>通信任务，即后续通信任务所等待的通信任务的标识HcclHandle。</td></tr></tbody></table><h2 id="返回值说明">返回值说明<a class="header-anchor" href="#返回值说明">​</a></h2><p>无</p><h2 id="约束说明">约束说明<a class="header-anchor" href="#约束说明">​</a></h2><ul><li>调用本接口前确保已调用过<a href="InitV2.html">InitV2</a>和<a href="SetCcTilingV2.html">SetCcTilingV2</a>接口。</li><li>本接口在AIC核或者AIV核上调用必须与对应的Prepare接口的调用核保持一致。</li><li>一个通信域内，所有Prepare接口和InterHcclGroupSync接口的总调用次数不能超过63。</li></ul><h2 id="调用示例">调用示例<a class="header-anchor" href="#调用示例">​</a></h2><p>本示例构造一个通信融合算子，该算子有1个输入xGM，2个输出alltoallGM和allgatherGM，另有tilingGM传入tiling数据。算子内有2个通信域，首先通信域0对输入进行AlltoAll通信，将结果输出至alltoallGM。当结果数据输出到alltoallGM完成后，通信域1将该结果alltoallGM作为AllGather通信的输入，并将通信结果输出至allgatherGM。</p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>extern &quot;C&quot; __global__ __aicore__ void alltoall_allgather_custom(GM_ADDR xGM, GM_ADDR alltoallGM, GM_ADDR allgatherGM, GM_ADDR tilingGM)
{
    REGISTER_TILING_DEFAULT(
        AlltoAllAllGatherCustomTilingData); // AlltoAllAllGatherCustomTilingData为对应算子头文件定义的结构体
    GET_TILING_DATA_WITH_STRUCT(AlltoAllAllGatherCustomTilingData, tilingData, tilingGM);
    GM_ADDR contextGM0 = AscendC::GetHcclContext&lt;0&gt;();
    GM_ADDR contextGM1 = AscendC::GetHcclContext&lt;1&gt;();

    Hccl hccl0;
    Hccl hccl1;
    HcclDataType dtype = HcclDataType::HCCL_DATA_TYPE_FP16;
    const uint64_t dataCount = 10U;
    const uint64_t strideCount = 0U;
    if (AscendC::g_coreType == AIV) { // 仅使用AIV核进行通信
        hccl0.InitV2(contextGM0, &amp;tilingData);
        hccl1.InitV2(contextGM1, &amp;tilingData);
        hccl0.SetCcTilingV2(offsetof(AlltoAllAllGatherCustomTilingData, alltoallTiling));
        hccl1.SetCcTilingV2(offsetof(AlltoAllAllGatherCustomTilingData, allgatherTiling));

        // 通信域0下发1个AlltoAll任务
        auto group0_handle = hccl0.AlltoAll(xGM, alltoallGM, dataCount, dtype, strideCount);

        // 通信域1下发跨域依赖任务，保证通信域1后续的AllGather任务在通信域0的AlltoAll执行结束后，才开始执行
        hccl1.InterHcclGroupSync(0, group0_handle);
        // 通信域1下发1个AllGather任务
        auto group1_handle = hccl1.AllGather(alltoallGM, allgatherGM, dataCount, dtype, strideCount);

        hccl0.Commit(group0_handle);
        hccl1.Commit(group1_handle);
        hccl0.Wait(group0_handle);
        hccl1.Wait(group1_handle);

        AscendC::SyncAll&lt;true&gt;(); // 全AIV核同步，防止0核执行过快，提前调用hccl.Finalize()接口，导致其他核Wait卡死
        hccl0.Finalize();
        hccl1.Finalize();
    }
}
</code></pre></div></article></div>`,1)])])}const _=t(n,[["render",c]]);export{p as __pageData,_ as default};
