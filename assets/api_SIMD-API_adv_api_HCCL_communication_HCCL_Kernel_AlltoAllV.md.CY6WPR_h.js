import{_ as n,o as l,a as e,b as a}from"./app.C41L12d5.js";const s="/ascendc.github.io/assets/AlltoAllV.CLdqTw4x.png",i="/ascendc.github.io/assets/alltoallv_4rank_no_split.D7LKsL5j.png",r="/ascendc.github.io/assets/4rank_unequal_no_split.2IsL_j-c.png",_=JSON.parse('{"title":"","description":"","frontmatter":{"breadcrumbs":[{"text":"Ascend C API","link":"/api/api_list"},{"text":"SIMD API","link":"/api/SIMD-API/SIMD-API"},{"text":"高阶API","link":"/api/SIMD-API/adv_api/adv_api"},{"text":"HCCL通信类","link":"/api/SIMD-API/adv_api/HCCL_communication/HCCL_communication"},{"text":"HCCL核函数（Kernel）侧接口","link":"/api/SIMD-API/adv_api/HCCL_communication/HCCL_Kernel/HCCL_Kernel"},{"text":"AlltoAllV","link":"/api/SIMD-API/adv_api/HCCL_communication/HCCL_Kernel/AlltoAllV"}]},"headers":[],"relativePath":"api/SIMD-API/adv_api/HCCL_communication/HCCL_Kernel/AlltoAllV.md","filePath":"api/SIMD-API/adv_api/HCCL_communication/HCCL_Kernel/AlltoAllV.md","outlineHeaders":[{"level":2,"title":"产品支持情况","slug":"产品支持情况","link":"#产品支持情况"},{"level":2,"title":"功能说明","slug":"功能说明","link":"#功能说明"},{"level":2,"title":"函数原型","slug":"函数原型","link":"#函数原型"},{"level":2,"title":"参数说明","slug":"参数说明","link":"#参数说明"},{"level":2,"title":"返回值说明","slug":"返回值说明","link":"#返回值说明"},{"level":2,"title":"约束说明","slug":"约束说明","link":"#约束说明"},{"level":2,"title":"调用示例","slug":"调用示例","link":"#调用示例"}],"lastUpdated":1787132628000}'),c={name:"api/SIMD-API/adv_api/HCCL_communication/HCCL_Kernel/AlltoAllV.md"};function d(o,t,u,p,C,A){return l(),e("div",null,[...t[0]||(t[0]=[a('<div><article class="markdown-body"><h1>AlltoAllV</h1><h2 id="产品支持情况">产品支持情况<a class="header-anchor" href="#产品支持情况">​</a></h2><div data-filter="950"><ul><li>Ascend 950PR/Ascend 950DT：支持</li></ul></div><div data-filter="A3"><ul><li>Atlas A3 训练系列产品/Atlas A3 推理系列产品：支持</li></ul></div><div data-filter="910b"><ul><li>Atlas A2 训练系列产品/Atlas A2 推理系列产品：不支持</li></ul></div><div data-filter="310b"><ul><li>Atlas 200I/500 A2 推理产品：不支持</li></ul></div><div data-filter="310p"><ul><li>Atlas 推理系列产品AI Core：不支持</li><li>Atlas 推理系列产品Vector Core：不支持</li></ul></div><div data-filter="910"><ul><li>Atlas 训练系列产品：不支持</li></ul></div><h2 id="功能说明">功能说明<a class="header-anchor" href="#功能说明">​</a></h2><p>集合通信AlltoAllV的任务下发接口，返回该任务的标识handleId给用户。AlltoAll是AlltoAllV的一个子集，AlltoAll要求所有卡的收发数据量相同，AlltoAllV则不需要数据量相同，使用上更加灵活。</p><p>AlltoAllV的功能为：通信域内的卡互相发送和接收数据，并且定制每张卡给其它卡发送的数据量和从其它卡接收的数据量，以及定制发送和接收的数据在内存中的偏移。结合原型中的参数，描述接口功能，具体为：第i张卡发送sendBuf内存中第j块数据到第j张卡，该块数据在sendBuf中偏移为sdispls[j]的位置，且数据量为sendCounts[j]，第j张卡将该数据存放到本卡recvBuf中偏移为rdispls[i]的位置，接收数据量为recvCounts[i]，这里的sendCounts[j]与recvCounts[i]需要相等。注意：这里的偏移和数据量均为数据的个数，单位为sizeof(sendType)。</p><p><img src="'+s+`" alt></p><h2 id="函数原型">函数原型<a class="header-anchor" href="#函数原型">​</a></h2><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>template &lt;bool commit = false&gt;
__aicore__ inline HcclHandle AlltoAllV(GM_ADDR sendBuf, void* sendCounts, void* sdispls, HcclDataType sendType, GM_ADDR recvBuf, void* recvCounts, void* rdispls, HcclDataType recvType, uint8_t repeat = 1)
</code></pre></div><h2 id="参数说明">参数说明<a class="header-anchor" href="#参数说明">​</a></h2><p><strong>表1</strong> 模板参数说明</p><table><thead><tr><th>参数名</th><th>输入/输出</th><th>描述</th></tr></thead><tbody><tr><td>commit</td><td>输入</td><td>bool类型。参数取值如下：<br>true：在调用Prepare接口时，Commit同步通知服务端可以执行该通信任务。<br>false：在调用Prepare接口时，不通知服务端执行该通信任务。</td></tr></tbody></table><p><strong>表2</strong> 接口参数说明</p><table><thead><tr><th>参数名</th><th>输入/输出</th><th>描述</th></tr></thead><tbody><tr><td>sendBuf</td><td>输入</td><td>源数据buffer地址。</td></tr><tr><td>sendCounts</td><td>输入</td><td>本卡向通信域内其它每张卡发送的数据量，sendCounts[i]表示本卡发送到第i张卡rank_i的数据量，单位是sizeof(sendType)。<br><br>sendCounts是一个uint64_t类型的数组，数组长度必须为通信域内总rank数。<br><br>例如：sendBuf内数据的数据类型为fp16，sendCounts[0]=1，sendCounts[1]=2，表示本rank给rank0发送1个fp16数据，给rank1发送2个fp16数据。</td></tr><tr><td>sdispls</td><td>输入</td><td>本卡向其它卡发送的数据在sendBuf中的偏移，sdispls[i]=n表示本卡发送给rank_i的数据块在sendBuf中的偏移数据量为n。<br><br>sdispls是一个uint64_t类型的数组，数组长度必须为通信域内总rank数。</td></tr><tr><td>sendType</td><td>输入</td><td>sendBuf内数据的数据类型，目前支持HcclDataType包含的全部数据类型，HcclDataType详细可参考<a href="HCCL_usage.html#table116710585514">表1</a>。</td></tr><tr><td>recvBuf</td><td>输出</td><td>目的数据buffer地址，集合通信结果输出到此buffer中。</td></tr><tr><td>recvCounts</td><td>输入</td><td>本卡从其它卡接收的数据量，recvCounts[i]表示本rank接收到的来自rank_i的数据个数，单位是sizeof(recvType)。<br><br>recvCounts是一个uint64_t类型的数组，数组长度必须为通信域内总rank数。<br><br>例如：recvBuf内数据的数据类型为fp16，recvCounts[0]=1，recvCounts[1]=2，表示本rank接收到rank0的1个fp16数据，接收到rank1的2个fp16数据。</td></tr><tr><td>rdispls</td><td>输入</td><td>本卡接收的数据存放在recvBuf中的偏移，rdispls[i]=n表示本卡接收到的rank_i的数据块在recvBuf中的偏移数据量为n。<br><br>rdispls是一个uint64_t类型的数组，数组长度必须为通信域内总rank数。</td></tr><tr><td>recvType</td><td>输入</td><td>recvBuf内数据的数据类型，目前支持HcclDataType包含的全部数据类型，HcclDataType详细可参考<a href="HCCL_usage.html#table116710585514">表1</a>。<br><br>注意：recvType和sendType必须一致。</td></tr><tr><td>repeat</td><td>输入</td><td>一次下发的AlltoAllV通信任务个数。repeat取值≥1，默认值为1。当repeat&gt;1时，每个AlltoAllV任务的sendBuf\\sendCounts\\recvBuf\\recvCounts参数不变，sdispls和rdispls由服务端更新，每一轮任务i的更新公式如下：<br><br>sdispls[i] = sdispls[i] + sendCounts[i], i∈[0, sdispls.size())<br><br>rdispls[i] = rdispls[i] + recvCounts[i], i∈[0, rdispls.size())<br><br>注意：当设置repeat&gt;1时，须根据此计算公式，规划通信内存。</td></tr></tbody></table><h2 id="返回值说明">返回值说明<a class="header-anchor" href="#返回值说明">​</a></h2><p>返回该任务的标识handleId，handleId大于等于0。调用失败时，返回 -1。</p><h2 id="约束说明">约束说明<a class="header-anchor" href="#约束说明">​</a></h2><ul><li>调用本接口前确保已调用过<a href="InitV2.html">InitV2</a>和<a href="SetCcTilingV2.html">SetCcTilingV2</a>接口。</li><li>若HCCL对象的<a href="HCCL_template_params.html#hccl-template-params">config模板参数</a>未指定下发通信任务的核，该接口只能在AIC核或者AIV核两者之一上调用。若HCCL对象的<a href="HCCL_template_params.html#hccl-template-params">config模板参数</a>中指定了下发通信任务的核，则该接口可以在AIC核和AIV核上同时调用，接口内部会根据指定的核的类型，只在AIC核、AIV核二者之一下发该通信任务。</li><li>一个通信域内，所有Prepare接口和InterHcclGroupSync接口的总调用次数不能超过63。</li><li>每张卡发送给卡rank_j的数据量sendCounts[j]，与rank_j接收对应卡rank_i的数据量recvCounts[i]，必须相等。</li></ul><div data-filter="A3"><ul><li>对于Atlas A3 训练系列产品/Atlas A3 推理系列产品，一个通信域内，最大支持128卡通信。</li></ul></div><div data-filter="950"><ul><li>对于Ascend 950PR/Ascend 950DT，一个通信域内，所有Prepare接口的总调用次数不能超过63。</li><li>对于Ascend 950PR/Ascend 950DT，通信服务端为CCU时，默认仅支持FullMesh算法，并且单次最大通信数据量不能超过256M。</li></ul></div><h2 id="调用示例">调用示例<a class="header-anchor" href="#调用示例">​</a></h2><ul><li><p>使用AlltoAllV接口等效实现4卡间的AlltoAll通信</p><p>4张卡调用AlltoAllV接口。非多轮切分场景下，每张卡上的数据块和数据量一致，如下图中每张卡的A\\B\\C\\D数据块，数据量均为dataCount。</p><p><strong>图1</strong> 非切分场景下4卡AlltoAllV图示<br><img src="`+i+`" alt title="非切分场景下4卡AlltoAllV图示"></p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>extern &quot;C&quot; __global__ __aicore__ void alltoallv_custom(GM_ADDR xGM, GM_ADDR yGM, GM_ADDR workspaceGM, GM_ADDR tilingGM)
{
    constexpr uint32_t rankNum = 4U;
    constexpr uint32_t dataCount = 10U; // 假设图中A\\B\\C\\D数据块的个数均为10个
    uint64_t sendCounts[rankNum] = {0};
    uint64_t sDisplacements[rankNum] = {0};
    uint64_t recvCounts[rankNum] = {0};
    uint64_t rDisplacements[rankNum] = {0};
    for (uint32_t i = 0U; i &lt; rankNum; ++i) {
        sendCounts[i] = dataCount;
        sDisplacements[i] = i * dataCount;
        recvCounts[i] = dataCount;
        rDisplacements[i] = i * dataCount;
    }
    auto sendBuf = xGM; // xGM为AlltoAllV的输入GM地址
    auto recvBuf = yGM; // yGM为AlltoAllV的输出GM地址
    auto dtype = HcclDataType::HCCL_DATA_TYPE_FP16;
    REGISTER_TILING_DEFAULT(AllToAllVCustomTilingData); // AllToAllVCustomTilingData为对应算子头文件定义的结构体
    GET_TILING_DATA_WITH_STRUCT(AllToAllVCustomTilingData, tilingData, tilingGM);

    Hccl hccl;
    GM_ADDR contextGM = AscendC::GetHcclContext&lt;0&gt;(); // AscendC自定义算子kernel中，通过此方式获取HCCL context

    if (AscendC::g_coreType == AIV) { // 指定AIV核通信
        hccl.InitV2(contextGM, &amp;tilingData);
        auto ret = hccl.SetCcTilingV2(offsetof(AllToAllVCustomTilingData, alltoallvCcTiling));
        if (ret != HCCL_SUCCESS) {
            return;
        }
        auto handleId1 = hccl.AlltoAllV&lt;true&gt;(
            sendBuf, sendCounts, sDisplacements, dtype, recvBuf, recvCounts, rDisplacements, dtype);

        hccl.Wait(handleId1);
        AscendC::SyncAll&lt;true&gt;(); // 全AIV核同步，防止0核执行过快，提前调用hccl.Finalize()接口，导致其他核Wait卡死
        hccl.Finalize();
    }
}
</code></pre></div></li><li><p>使用AlltoAllV接口实现4卡间不同数据量的数据收发</p><p>如下图所示，每个rank下的方格中数字表示发送或接收的数据个数，以rank1为例进行说明：rank1分别向rank0、rank1、rank2、rank3发送2、2、3、2个数据，并分别从rank0、rank1、rank2、rank3接收3、2、4、3个数据，对应的代码示例如下。</p><p><strong>图2</strong> 非切分场景下4卡不均匀收发<br><img src="`+r+`" alt title="非切分场景下4卡不均匀收发"></p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>extern &quot;C&quot; __global__ __aicore__ void alltoallv_custom(GM_ADDR xGM, GM_ADDR yGM, GM_ADDR workspaceGM, GM_ADDR tilingGM)
{
    constexpr uint32_t rankNum = 4U;
    uint64_t sendCounts[rankNum] = {0};
    uint64_t sDisplacements[rankNum] = {0};
    uint64_t recvCounts[rankNum] = {0};
    uint64_t rDisplacements[rankNum] = {0};
    auto sendBuf = xGM; // xGM为AlltoAllV的输入GM地址
    auto recvBuf = yGM; // yGM为AlltoAllV的输出GM地址
    auto dtype = HcclDataType::HCCL_DATA_TYPE_FP16;
    REGISTER_TILING_DEFAULT(AllToAllVCustomTilingData); // AllToAllVCustomTilingData为对应算子头文件定义的结构体
    GET_TILING_DATA_WITH_STRUCT(AllToAllVCustomTilingData, tilingData, tilingGM);

    Hccl hccl;
    GM_ADDR contextGM = AscendC::GetHcclContext&lt;0&gt;(); // AscendC自定义算子kernel中，通过此方式获取HCCL context

    if (AscendC::g_coreType == AIV) { // 指定AIV核通信
        hccl.InitV2(contextGM, &amp;tilingData);
        auto ret = hccl.SetCcTilingV2(offsetof(AllToAllVCustomTilingData, alltoallvCcTiling));
        if (ret != HCCL_SUCCESS) {
            return;
        }
        if (hccl.GetRankId() == 0) {
            sendCounts[0] = 3;
            sendCounts[1] = 3;
            sendCounts[2] = 3;
            sendCounts[3] = 3;
            sDisplacements[1] = 3;
            sDisplacements[2] = 6;
            sDisplacements[3] = 9;
            recvCounts[0] = 3;
            recvCounts[1] = 2;
            recvCounts[2] = 1;
            recvCounts[3] = 3;
            rDisplacements[1] = 3;
            rDisplacements[2] = 5;
            rDisplacements[3] = 6;
        } else if (hccl.GetRankId() == 1) {
            sendCounts[0] = 2;
            sendCounts[1] = 2;
            sendCounts[2] = 3;
            sendCounts[3] = 2;
            sDisplacements[1] = 2;
            sDisplacements[2] = 4;
            sDisplacements[3] = 7;
            recvCounts[0] = 3;
            recvCounts[1] = 2;
            recvCounts[2] = 4;
            recvCounts[3] = 3;
            rDisplacements[1] = 3;
            rDisplacements[2] = 5;
            rDisplacements[3] = 9;
        } else if (hccl.GetRankId() == 2) {
            sendCounts[0] = 1;
            sendCounts[1] = 4;
            sendCounts[2] = 4;
            sendCounts[3] = 4;
            sDisplacements[1] = 1;
            sDisplacements[2] = 5;
            sDisplacements[3] = 9;
            recvCounts[0] = 3;
            recvCounts[1] = 3;
            recvCounts[2] = 4;
            recvCounts[3] = 3;
            rDisplacements[1] = 3;
            rDisplacements[2] = 6;
            rDisplacements[3] = 10;
        } else if (hccl.GetRankId() == 3) {
            sendCounts[0] = 3;
            sendCounts[1] = 3;
            sendCounts[2] = 3;
            sendCounts[3] = 3;
            sDisplacements[1] = 3;
            sDisplacements[2] = 6;
            sDisplacements[3] = 9;
            recvCounts[0] = 3;
            recvCounts[1] = 2;
            recvCounts[2] = 4;
            recvCounts[3] = 3;
            rDisplacements[1] = 3;
            rDisplacements[2] = 5;
            rDisplacements[3] = 9;
        }
        auto handleId = hccl.AlltoAllV&lt;true&gt;(
            sendBuf, sendCounts, sDisplacements, dtype, recvBuf, recvCounts, rDisplacements, dtype);

        hccl.Wait(handleId);
        AscendC::SyncAll&lt;true&gt;(); // 全AIV核同步，防止0核执行过快，提前调用hccl.Finalize()接口，导致其他核Wait卡死
        hccl.Finalize();
    }
}
</code></pre></div></li></ul></article></div>`,1)])])}const v=n(c,[["render",d]]);export{_ as __pageData,v as default};
