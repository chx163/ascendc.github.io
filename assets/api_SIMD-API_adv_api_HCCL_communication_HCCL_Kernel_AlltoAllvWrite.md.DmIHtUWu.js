import{_ as e,o as a,a as l,b as i}from"./app.C41L12d5.js";const n="/ascendc.github.io/assets/251208103727744.B95An86J.png",p=JSON.parse('{"title":"","description":"","frontmatter":{"breadcrumbs":[{"text":"Ascend C API","link":"/api/api_list"},{"text":"SIMD API","link":"/api/SIMD-API/SIMD-API"},{"text":"高阶API","link":"/api/SIMD-API/adv_api/adv_api"},{"text":"HCCL通信类","link":"/api/SIMD-API/adv_api/HCCL_communication/HCCL_communication"},{"text":"HCCL核函数（Kernel）侧接口","link":"/api/SIMD-API/adv_api/HCCL_communication/HCCL_Kernel/HCCL_Kernel"},{"text":"AlltoAllvWrite","link":"/api/SIMD-API/adv_api/HCCL_communication/HCCL_Kernel/AlltoAllvWrite"}]},"headers":[],"relativePath":"api/SIMD-API/adv_api/HCCL_communication/HCCL_Kernel/AlltoAllvWrite.md","filePath":"api/SIMD-API/adv_api/HCCL_communication/HCCL_Kernel/AlltoAllvWrite.md","outlineHeaders":[{"level":2,"title":"产品支持情况","slug":"产品支持情况","link":"#产品支持情况"},{"level":2,"title":"功能说明","slug":"功能说明","link":"#功能说明"},{"level":2,"title":"函数原型","slug":"函数原型","link":"#函数原型"},{"level":2,"title":"参数说明","slug":"参数说明","link":"#参数说明"},{"level":2,"title":"返回值说明","slug":"返回值说明","link":"#返回值说明"},{"level":2,"title":"约束说明","slug":"约束说明","link":"#约束说明"},{"level":2,"title":"调用示例","slug":"调用示例","link":"#调用示例"}],"lastUpdated":1787132628000}'),d={name:"api/SIMD-API/adv_api/HCCL_communication/HCCL_Kernel/AlltoAllvWrite.md"};function s(r,t,c,_,o,h){return a(),l("div",null,[...t[0]||(t[0]=[i('<div><article class="markdown-body"><h1>AlltoAllvWrite</h1><h2 id="产品支持情况">产品支持情况<a class="header-anchor" href="#产品支持情况">​</a></h2><div data-filter="950"><ul><li>Ascend 950PR/Ascend 950DT：支持</li></ul></div><div data-filter="A3"><ul><li>Atlas A3 训练系列产品/Atlas A3 推理系列产品：不支持</li></ul></div><div data-filter="910b"><ul><li>Atlas A2 训练系列产品/Atlas A2 推理系列产品：不支持</li></ul></div><div data-filter="310b"><ul><li>Atlas 200I/500 A2 推理产品：不支持</li></ul></div><div data-filter="310p"><ul><li>Atlas 推理系列产品AI Core：不支持</li><li>Atlas 推理系列产品Vector Core：不支持</li></ul></div><div data-filter="910"><ul><li>Atlas 训练系列产品：不支持</li></ul></div><h2 id="功能说明">功能说明<a class="header-anchor" href="#功能说明">​</a></h2><p>集合通信AlltoAllvWrite的任务下发接口，返回该任务的标识handleId给用户。</p><p>AlltoAllvWrite的功能为：通信域内的卡互相发送和接收数据，并且定制每张卡给其它卡发送的数据量和从其它卡接收的数据量，以及定制发送和接收的数据在内存中的偏移。结合原型中的参数，描述接口功能，具体为：本卡发送地址偏移为sendOffsets[i]字节且大小为sendSizes[i]字节的数据给第i张卡，remoteWinOffset表示本卡数据写入对端window的偏移，localDataSize表示各张对端卡写入本卡的数据大小。注意：这里的偏移和数据量均为字节数。</p><p><img src="'+n+`" alt></p><h2 id="函数原型">函数原型<a class="header-anchor" href="#函数原型">​</a></h2><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>template &lt;bool commit = false&gt;
__aicore__ inline HcclHandle AlltoAllvWrite(GM_ADDR usrIn, GM_ADDR sendOffsets, GM_ADDR sendSizes, uint64_t remoteWinOffset, uint64_t localDataSize)
</code></pre></div><h2 id="参数说明">参数说明<a class="header-anchor" href="#参数说明">​</a></h2><p><strong>表1</strong> 模板参数说明</p><table><thead><tr><th>参数名</th><th>输入/输出</th><th>描述</th></tr></thead><tbody><tr><td>commit</td><td>输入</td><td>bool类型。参数取值如下：<br>true：在调用Prepare接口时，Commit同步通知服务端可以执行该通信任务。<br>false：在调用Prepare接口时，不通知服务端执行该通信任务。</td></tr></tbody></table><p><strong>表2</strong> 接口参数说明</p><table><thead><tr><th>参数名</th><th>输入/输出</th><th>描述</th></tr></thead><tbody><tr><td>usrIn</td><td>输入</td><td>源数据buffer地址。</td></tr><tr><td>sendOffsets</td><td>输入</td><td>待发送的每个分片的偏移，以字节为单位。</td></tr><tr><td>sendSizes</td><td>输入</td><td>待发送的每个分片的数据大小，以字节为单位。</td></tr><tr><td>remoteWinOffset</td><td>输入</td><td>本卡数据写入对端window的偏移，以字节为单位。</td></tr><tr><td>localDataSize</td><td>输入</td><td>各张对端卡写入本卡的数据大小，以字节为单位。</td></tr></tbody></table><h2 id="返回值说明">返回值说明<a class="header-anchor" href="#返回值说明">​</a></h2><p>返回该任务的标识handleId，handleId大于等于0。调用失败时，返回 -1。</p><h2 id="约束说明">约束说明<a class="header-anchor" href="#约束说明">​</a></h2><ul><li>调用本接口前确保已调用过<a href="InitV2.html">InitV2</a>和<a href="SetCcTilingV2.html">SetCcTilingV2</a>接口。</li><li>若HCCL对象的<a href="HCCL_template_params.html#hccl-template-params">模板参数config</a>未指定下发通信任务的核，则该接口只能在AIC核或者AIV核两者之一上调用。若HCCL对象的<a href="HCCL_template_params.html#hccl-template-params">模板参数config</a>指定了下发通信任务的核，则该接口可以在AIC核和AIV核上同时调用，接口内部根据指定的核的类型，在对应的AIC核、AIV核二者之一下发该通信任务。</li><li>一个通信域内，所有Prepare接口和InterHcclGroupSync接口的总调用次数不能超过63。</li></ul><div data-filter="950"><ul><li>对于Ascend 950PR/Ascend 950DT，通信服务端为CCU时，默认仅支持FullMesh算法，并且单次最大通信数据量不能超过256M。</li></ul></div><h2 id="调用示例">调用示例<a class="header-anchor" href="#调用示例">​</a></h2><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>extern &quot;C&quot; __global__ __aicore__ void alltoallvwrite_custom(
    GM_ADDR xGM, GM_ADDR yGM, GM_ADDR workspaceGM, GM_ADDR tilingGM)
{
    REGISTER_TILING_DEFAULT(
        AllToAllVWriteCustomTilingData); // AllToAllVWriteCustomTilingData为对应算子头文件定义的结构体
    GET_TILING_DATA_WITH_STRUCT(AllToAllVWriteCustomTilingData, tilingData, tilingGM);

    auto&amp;&amp; cfg = tilingData.param;
    uint32_t M = cfg.M;
    uint32_t K = cfg.K;
    uint32_t dataType = cfg.dataType;
    uint32_t dataTypeSize = cfg.dataTypeSize;

    KERNEL_TASK_TYPE_DEFAULT(KERNEL_TYPE_MIX_AIC_1_2);
    Hccl&lt;HcclServerType::HCCL_SERVER_TYPE_CCU&gt; hccl;
    GM_ADDR context = GetHcclContext&lt;HCCL_GROUP_ID_0&gt;();
    hccl.InitV2(context, &amp;tilingData);
    hccl.SetCcTilingV2(offsetof(AllToAllVCustomV3TilingData, mc2CcTiling));
    uint32_t rankDim = hccl.GetRankDim();
    uint32_t rankId = hccl.GetRankId();

    uint64_t perRankDataSize_ = M * K * dataTypeSize / rankDim;
    GM_ADDR sendSizeGM_ = workspaceGM;
    GM_ADDR sendOffsetGM_ = sendSizeGM_ + rankDim * sizeof(uint64_t) * 2;
    __gm__ uint64_t* sendSizes = reinterpret_cast&lt;__gm__ uint64_t*&gt;(sendSizeGM_);
    __gm__ uint64_t* sendOffsets = reinterpret_cast&lt;__gm__ uint64_t*&gt;(sendOffsetGM_);
    // 当前ccu通信都是双die，所以sendSize和sendOffset需要等分切成die0和die1的数据
    for (uint32_t i = 0U; i &lt; rankDim; i++) { 
        sendSizes[i] = perRankDataSize_ / 2;
        sendSizes[i + rankDim] = perRankDataSize_ - perRankDataSize_ / 2;
        sendOffsets[i] = i * perRankDataSize_;
        sendOffsets[i + rankDim] = i * perRankDataSize_ + sendSizes[i];
    }
    uint64_t remoteWinOffset = rankId * perRankDataSize_;
    uint64_t localDataSize = perRankDataSize_;
    if (TILING_KEY_IS(1000UL)) {
        if ASCEND_IS_AIV {
            AscendC::HcclHandle handleId = -1;
            handleId = hccl.AlltoAllvWrite&lt;true&gt;(xGM, sendOffsetGM_, sendSizeGM_, remoteWinOffset, localDataSize);
            hccl.Wait(handleId);
            AscendC::SyncAll&lt;true&gt;(); // 全AIV核同步，防止0核执行过快，提前调用hccl.Finalize()接口，导致其他核Wait卡死
            hccl.Finalize();
        }
    }
}
</code></pre></div></article></div>`,1)])])}const u=e(d,[["render",s]]);export{p as __pageData,u as default};
