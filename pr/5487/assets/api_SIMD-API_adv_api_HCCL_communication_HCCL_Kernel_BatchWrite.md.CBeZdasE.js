import{_ as a,o as n,a as e,b as i}from"./app.DKoEZOcr.js";const l="/ascendc.github.io/pr/5487/assets/batchwrite_diagram.CC9IJBh3.png",p=JSON.parse('{"title":"","description":"","frontmatter":{"breadcrumbs":[{"text":"Ascend C API","link":"/api/api_list"},{"text":"SIMD API","link":"/api/SIMD-API/SIMD-API"},{"text":"高阶API","link":"/api/SIMD-API/adv_api/adv_api"},{"text":"HCCL通信类","link":"/api/SIMD-API/adv_api/HCCL_communication/HCCL_communication"},{"text":"HCCL核函数（Kernel）侧接口","link":"/api/SIMD-API/adv_api/HCCL_communication/HCCL_Kernel/HCCL_Kernel"},{"text":"BatchWrite","link":"/api/SIMD-API/adv_api/HCCL_communication/HCCL_Kernel/BatchWrite"}]},"headers":[],"relativePath":"api/SIMD-API/adv_api/HCCL_communication/HCCL_Kernel/BatchWrite.md","filePath":"api/SIMD-API/adv_api/HCCL_communication/HCCL_Kernel/BatchWrite.md","outlineHeaders":[{"level":2,"title":"产品支持情况","slug":"产品支持情况","link":"#产品支持情况"},{"level":2,"title":"功能说明","slug":"功能说明","link":"#功能说明"},{"level":2,"title":"函数原型","slug":"函数原型","link":"#函数原型"},{"level":2,"title":"参数说明","slug":"参数说明","link":"#参数说明"},{"level":2,"title":"返回值说明","slug":"返回值说明","link":"#返回值说明"},{"level":2,"title":"约束说明","slug":"约束说明","link":"#约束说明"},{"level":2,"title":"调用示例","slug":"调用示例","link":"#调用示例"}],"lastUpdated":1787132628000}'),c={name:"api/SIMD-API/adv_api/HCCL_communication/HCCL_Kernel/BatchWrite.md"};function d(o,t,r,s,h,u){return n(),e("div",null,[...t[0]||(t[0]=[i('<div><article class="markdown-body"><h1>BatchWrite</h1><h2 id="产品支持情况">产品支持情况<a class="header-anchor" href="#产品支持情况">​</a></h2><div data-filter="950"><ul><li>Ascend 950PR/Ascend 950DT：不支持</li></ul></div><div data-filter="A3"><ul><li>Atlas A3 训练系列产品/Atlas A3 推理系列产品：支持</li></ul></div><div data-filter="910b"><ul><li>Atlas A2 训练系列产品/Atlas A2 推理系列产品：支持</li></ul></div><div data-filter="310b"><ul><li>Atlas 200I/500 A2 推理产品：不支持</li></ul></div><div data-filter="310p"><ul><li>Atlas 推理系列产品AI Core：不支持</li><li>Atlas 推理系列产品Vector Core：不支持</li></ul></div><div data-filter="910"><ul><li>Atlas 训练系列产品：不支持</li></ul></div><h2 id="功能说明">功能说明<a class="header-anchor" href="#功能说明">​</a></h2><p>集合通信BatchWrite的任务下发接口，返回该任务的标识handleId给用户。BatchWrite实现了一种点对点通信，这是一种直接传输数据的通信模式，能够同时将多份数据发送到不同的Global Memory地址上。</p><div data-filter="A3"><p>对于Atlas A3 训练系列产品/Atlas A3 推理系列产品，BatchWrite通信支持在相同或不同的昇腾AI Server之间进行。</p></div><div data-filter="910b"><p>对于Atlas A2 训练系列产品/Atlas A2 推理系列产品，BatchWrite通信必须在不同昇腾AI Server（通常是8卡或16卡的昇腾NPU设备组成的服务器形态的统称）之间进行。</p></div><p><strong>图1</strong> BatchWrite示意图<br><img src="'+l+`" alt title="BatchWrite示意图"></p><h2 id="函数原型">函数原型<a class="header-anchor" href="#函数原型">​</a></h2><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>template &lt;bool commit = false&gt;
__aicore__ inline HcclHandle BatchWrite(GM_ADDR batchWriteInfo, uint32_t itemNum, uint16_t queueID = 0U)
</code></pre></div><h2 id="参数说明">参数说明<a class="header-anchor" href="#参数说明">​</a></h2><p><strong>表1</strong> 模板参数说明</p><table><thead><tr><th>参数名</th><th>输入/输出</th><th>描述</th></tr></thead><tbody><tr><td>commit</td><td>输入</td><td>bool类型。参数取值如下：<br>true：在调用Prepare接口时，Commit同步通知服务端可以执行该通信任务。<br>false：在调用Prepare接口时，不通知服务端执行该通信任务。</td></tr></tbody></table><p><strong>表2</strong> 接口参数说明</p><table><thead><tr><th>参数名</th><th>输入/输出</th><th>描述</th></tr></thead><tbody><tr><td>batchWriteInfo</td><td>输入</td><td>通信任务信息的Global Memory地址。一组通信数据的相关信息必须按指定的格式保存，在执行通信任务时，可以同时指定多组通信任务信息，执行通信任务时批量发送数据。结构体定义如下代码所示。<span data-filter="A3"><br><br>对于Atlas A3 训练系列产品/Atlas A3 推理系列产品：<br>type：预留参数，取值为0。<br>res1[5]：预留参数，无需填写该值。<br>length：待拷贝数据的长度。<br>srcAddrLow：待拷贝数据的源地址低32位。<br>srcAddrHigh：待拷贝数据的源地址高32位。<br>dstAddrLow：待拷贝数据的目的地址低32位。<br>dstAddrHigh：待拷贝数据的目的地址高32位。<br>res2[4]：预留参数，无需填写该值。</span><span data-filter="910b"><br><br>对于Atlas A2 训练系列产品/Atlas A2 推理系列产品：<br>localBuf：本端发送数据的window地址。<br>remoteBuf：对端接收数据的window地址。<br>count：该通信任务发送的数据个数。<br>dataType：该通信任务发送的数据类型，支持的类型可参考<a href="HCCL_usage.html#table116710585514">HcclDataType参数说明</a>。<br>remoteRankId：该通信任务发送数据的目的卡卡号。</span></td></tr><tr><td>itemNum</td><td>输入</td><td>批量任务的个数。该参数取值必须与batchWriteInfo中通信任务信息的组数一致。<span data-filter="A3"><br><br>对于Atlas A3 训练系列产品/Atlas A3 推理系列产品，该参数取值不能大于等于2048。</span></td></tr><tr><td>queueID</td><td>输入</td><td>指定当前通信所在的队列ID，默认值为0。<span data-filter="910b"><br><br>Atlas A2 训练系列产品/Atlas A2 推理系列产品，该参数仅支持取值为0。</span></td></tr></tbody></table><div data-filter="A3"><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>// Atlas A3 训练系列产品/Atlas A3 推理系列产品
struct BatchWriteItem {
    uint64_t type;
    uint32_t res1[5];
    uint32_t length;
    uint32_t srcAddrLow;
    uint32_t srcAddrHigh;
    uint32_t dstAddrLow;
    uint32_t dstAddrHigh;
    uint32_t res2[4];
};
</code></pre></div></div><div data-filter="910b"><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>// Atlas A2 训练系列产品/Atlas A2 推理系列产品
struct BatchWriteItem {
    uint64_t localBuf;
    uint64_t remoteBuf;
    uint64_t count;
    uint32_t dataType;
    uint32_t remoteRankId;
};
</code></pre></div></div><h2 id="返回值说明">返回值说明<a class="header-anchor" href="#返回值说明">​</a></h2><p>返回该任务的标识handleId，handleId大于等于0。调用失败时，返回 -1。</p><h2 id="约束说明">约束说明<a class="header-anchor" href="#约束说明">​</a></h2><ul><li>调用本接口前确保已调用过<a href="InitV2.html">InitV2</a>和<a href="SetCcTilingV2.html">SetCcTilingV2</a>接口。</li><li>若HCCL对象的<a href="HCCL_template_params.html#hccl-template-params">config模板参数</a>未指定下发通信任务的核，该接口只能在AIC核或者AIV核两者之一上调用。若HCCL对象的<a href="HCCL_template_params.html#hccl-template-params">config模板参数</a>中指定了下发通信任务的核，则该接口可以在AIC核和AIV核上同时调用，接口内部会根据指定的核的类型，只在AIC核、AIV核二者之一下发该通信任务。</li><li>一个通信域内，所有Prepare接口和InterHcclGroupSync接口的总调用次数不能超过63。</li></ul><div data-filter="910b"><ul><li>对于Atlas A2 训练系列产品/Atlas A2 推理系列产品，当前接口仅支持不同AI Server间的通信，同时通信任务信息中指定的目的卡号不能是本卡号。</li></ul></div><ul><li>通信任务信息写入batchWriteInfo前，必须通过调用<a href="../../../basic_api/cache_control/DataCacheCleanAndInvalid.html">DataCacheCleanAndInvalid</a>接口，保证预期的数据成功刷新到Global Memory上。</li></ul><h2 id="调用示例">调用示例<a class="header-anchor" href="#调用示例">​</a></h2><div data-filter="910b"><ul><li><p>不同AI Server之间的点对点通信</p><p>在Atlas A2 训练系列产品/Atlas A2 推理系列产品上，假设本卡要将不同的数据分别发送到其它AI Server的2卡、3卡的指定位置，通过调用一次BatchWrite接口，实现批量点对点通信。</p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>struct BatchWriteItem {
    uint64_t localBuf;     // 本端发送数据的window地址
    uint64_t remoteBuf;    // 对端接收数据的window地址
    uint64_t count;        // 发送的数据个数
    uint32_t dataType;     // 发送的数据类型
    uint32_t remoteRankId; // 发送数据的目的卡号
}; // 按接口的约定定义格式

extern &quot;C&quot; __global__ __aicore__ void BatchWrite_custom(GM_ADDR inputGM, GM_ADDR workspace, GM_ADDR tilingGM)
{
    REGISTER_TILING_DEFAULT(BatchWriteCustomTilingData); // BatchWriteCustomTilingData为对应算子头文件定义的结构体
    GET_TILING_DATA_WITH_STRUCT(BatchWriteCustomTilingData, tilingData, tilingGM);
    GM_ADDR contextGM = AscendC::GetHcclContext&lt;0&gt;();

    if constexpr (g_coreType == AscendC::AIV) {
        Hccl hccl;
        hccl.InitV2(contextGM, &amp;tilingData);
        hccl.SetCcTilingV2(offsetof(BatchWriteCustomTilingData, mc2CcTiling));

        __gm__ BatchWriteItem* sendInfo = reinterpret_cast&lt;__gm__ BatchWriteItem*&gt;(workspace);

        // 需要提前将待发送的数据从inputGM搬运到localBuf所填的window地址上
        sendInfo-&gt;localBuf = hccl.GetWindowsOutAddr(hccl.GetRankId());
        // 对端的接收地址也要是window地址，接收端需要考虑是否搬运到输出或者workspace上
        sendInfo-&gt;remoteBuf = hccl.GetWindowsInAddr(2U);
        sendInfo-&gt;count = 16U;
        sendInfo-&gt;dataType = HcclDataType::HCCL_DATA_TYPE_FP16;
        sendInfo-&gt;remoteRankId = 2U;

        // 可以组装多个通信任务，实现批量发送
        (sendInfo + 1)-&gt;localBuf = hccl.GetWindowsOutAddr(hccl.GetRankId());
        (sendInfo + 1)-&gt;remoteBuf = hccl.GetWindowsInAddr(3U);
        (sendInfo + 1)-&gt;count = 32U;
        (sendInfo + 1)-&gt;dataType = HcclDataType::HCCL_DATA_TYPE_BFP16;
        (sendInfo + 1)-&gt;remoteRankId = 3U;

        // 确保cache中的数据已刷新到GM地址上
        GlobalTensor&lt;int64_t&gt; tempTensor;
        tempTensor.SetGlobalBuffer((__gm__ int64_t*)sendInfo);
        DataCacheCleanAndInvalid&lt;int64_t, CacheLine::SINGLE_CACHE_LINE, DcciDst::CACHELINE_OUT&gt;(tempTensor);

        auto handleId = hccl.BatchWrite&lt;true&gt;(sendInfo, 2U);
        // wait仅表示本端发送完毕，对端是否接收到数据需要在对端判断
        hccl.Wait(handleId);
        AscendC::SyncAll();
        hccl.Finalize();
    }
}
</code></pre></div><p>当通信数据量较大时，可以在Tiling流程中调用SetAicpuBlockDim接口来设置AI CPU的核数。算子内部将自动在多个AI CPU核中选择最优的核进行通信，以实现更优的性能。建议将可调度的AI CPU核数设置为5。</p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>static ge::graphStatus BatchWriteTilingFunc(gert::TilingContext* context)
{
    // 省略无关代码
    auto ascendcPlatform = platform_ascendc::PlatformAscendC(context-&gt;GetPlatformInfo());
    const auto aicCoreNum = ascendcPlatform.GetCoreNumAic();
    auto coreNum = use_aiv ? aicCoreNum * 2 : aicCoreNum;
    context-&gt;SetAicpuBlockDim(5U);
    context-&gt;SetSimdNumBlocks(coreNum);
    context-&gt;SetTilingKey(1000);

    // 省略无关代码
    SdmaBatchWriteCustomTilingData* tiling = context-&gt;GetTilingData&lt;SdmaBatchWriteCustomTilingData&gt;();
    AscendC::Mc2CcTilingConfig mc2CcTilingConfig(groupName, HCCL_CMD_BATCH_WRITE, &quot;BatchWrite=level0:fullmesh&quot;, 0);
    mc2CcTilingConfig.GetTiling(tiling-&gt;mc2InitTiling);
    mc2CcTilingConfig.GetTiling(tiling-&gt;mc2CcTiling);
    return ge::GRAPH_SUCCESS;
}
</code></pre></div></li></ul></div><div data-filter="A3"><ul><li><p><span id="batchwrite_multi_queue"></span>多个队列的点对点通信</p><p>在Atlas A3 训练系列产品/Atlas A3 推理系列产品上，假设要将一段数据分别拷贝到两个不同的Global Memory上，可以通过调用一次BatchWrite接口，实现批量点对点通信。</p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>struct BatchWriteItem {
    uint64_t type;
    uint32_t res1[5];
    uint32_t length;
    uint32_t srcAddrLow;
    uint32_t srcAddrHigh;
    uint32_t dstAddrLow;
    uint32_t dstAddrHigh;
    uint32_t res2[4];
}; // 按接口的约定定义格式

extern &quot;C&quot; __global__ __aicore__ void BatchWrite_custom(
    GM_ADDR inputGM, GM_ADDR outputGM1, GM_ADDR outputGM2, GM_ADDR workspace, GM_ADDR tilingGM)
{
    REGISTER_TILING_DEFAULT(BatchWriteCustomTilingData); // BatchWriteCustomTilingData为对应算子头文件定义的结构体
    GET_TILING_DATA_WITH_STRUCT(BatchWriteCustomTilingData, tilingData, tilingGM);
    GM_ADDR contextGM = AscendC::GetHcclContext&lt;0&gt;();

    if constexpr (g_coreType == AscendC::AIV) {
        Hccl hccl;
        hccl.InitV2(contextGM, &amp;tilingData);
        hccl.SetCcTilingV2(offsetof(BatchWriteCustomTilingData, mc2CcTiling));

        __gm__ BatchWriteItem* sendInfo = reinterpret_cast&lt;__gm__ BatchWriteItem*&gt;(inputGM);

        sendInfo-&gt;type = 0UL;
        sendInfo-&gt;length = 64U;
        sendInfo-&gt;srcAddrLow = static_cast&lt;uint32_t&gt;((uint64_t)(inputGM) &amp; 0xFFFFFFFF);
        sendInfo-&gt;srcAddrHigh = static_cast&lt;uint32_t&gt;(((uint64_t)(inputGM) &gt;&gt; 32) &amp; 0xFFFFFFFF);
        sendInfo-&gt;dstAddrLow = static_cast&lt;uint32_t&gt;((uint64_t)(outputGM1) &amp; 0xFFFFFFFF);
        sendInfo-&gt;dstAddrHigh = static_cast&lt;uint32_t&gt;(((uint64_t)(outputGM1) &gt;&gt; 32) &amp; 0xFFFFFFFF);

        // 可以组装多个通信任务，实现批量发送
        (sendInfo + 1)-&gt;type = 0UL;
        (sendInfo + 1)-&gt;length = 64U;
        (sendInfo + 1)-&gt;srcAddrLow = static_cast&lt;uint32_t&gt;((uint64_t)(inputGM) &amp; 0xFFFFFFFF);
        (sendInfo + 1)-&gt;srcAddrHigh = static_cast&lt;uint32_t&gt;(((uint64_t)(inputGM) &gt;&gt; 32) &amp; 0xFFFFFFFF);
        (sendInfo + 1)-&gt;dstAddrLow = static_cast&lt;uint32_t&gt;((uint64_t)(outputGM2) &amp; 0xFFFFFFFF);
        (sendInfo + 1)-&gt;dstAddrHigh = static_cast&lt;uint32_t&gt;(((uint64_t)(outputGM2) &gt;&gt; 32) &amp; 0xFFFFFFFF);

        // 确保cache中的数据已刷新到GM地址上
        GlobalTensor&lt;int64_t&gt; tempTensor;
        tempTensor.SetGlobalBuffer((__gm__ int64_t*)sendInfo);
        DataCacheCleanAndInvalid&lt;int64_t, CacheLine::SINGLE_CACHE_LINE, DcciDst::CACHELINE_OUT&gt;(tempTensor);

        // 分别将两次拷贝部署在队列0、队列1上
        auto handleId0 = hccl.BatchWrite&lt;true&gt;(sendInfo, 1U, 0U);
        auto handleId1 = hccl.BatchWrite&lt;true&gt;(sendInfo, 1U, 1U);

        // 在所有队列上阻塞BatchWrite通信任务，所有队列将等到通信任务全部完成后再继续往下执行，实现所有队列的同步
        const uint16_t queueNum = hccl.GetQueueNum();
        for (uint16_t i = 0U; i &lt; queueNum; ++i) {
            hccl.QueueBarrier&lt;ScopeType::ALL&gt;(i);
        }

        // Finalize可以无需等待服务端的通信任务全部完成即可退出，尽早释放AIV核心资源
        hccl.Finalize&lt;false&gt;();
        AscendC::SyncAll();
    }
}
</code></pre></div><p>当通信数据量较大时，可以在Tiling流程中调用SetAicpuBlockDim、<a href="../HCCL_Tiling/SetCommBlockNum.html">SetCommBlockNum</a>、<a href="../HCCL_Tiling/SetQueueNum.html">SetQueueNum</a>接口，通过并发机制提升算子的性能。</p><p>在如下示例代码中，参与BatchWrite通信的核数为24，通信队列的数量为2，总的队列数=24*2，即48；与此同时，服务端AI CPU的核数为4，这样每个AI CPU核只需要负责编排48/4即12个通信队列上的任务即可，提升了通信效率。</p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>static ge::graphStatus BatchWriteTilingFunc(gert::TilingContext* context)
{
    // 省略无关代码
    auto ascendcPlatform = platform_ascendc::PlatformAscendC(context-&gt;GetPlatformInfo());
    const auto aicCoreNum = ascendcPlatform.GetCoreNumAic();
    auto coreNum = use_aiv ? aicCoreNum * 2 : aicCoreNum;
    context-&gt;SetAicpuBlockDim(4U);
    context-&gt;SetSimdNumBlocks(coreNum);
    context-&gt;SetTilingKey(1000);

    // 省略无关代码
    SdmaBatchWriteCustomTilingData* tiling = context-&gt;GetTilingData&lt;SdmaBatchWriteCustomTilingData&gt;();
    AscendC::Mc2CcTilingConfig mc2CcTilingConfig(groupName, HCCL_CMD_BATCH_WRITE, &quot;BatchWrite=level0:fullmesh&quot;, 0);
    mc2CcTilingConfig.SetCommBlockNum(24U);
    mc2CcTilingConfig.SetQueueNum(2U);
    mc2CcTilingConfig.GetTiling(tiling-&gt;mc2InitTiling);
    mc2CcTilingConfig.GetTiling(tiling-&gt;mc2CcTiling);
    return ge::GRAPH_SUCCESS;
}
</code></pre></div></li></ul></div></article></div>`,1)])])}const _=a(c,[["render",d]]);export{p as __pageData,_ as default};
