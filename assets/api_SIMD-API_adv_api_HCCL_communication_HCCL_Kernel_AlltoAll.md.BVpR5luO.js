import{_ as l,o as a,a as e,b as i}from"./app.C41L12d5.js";const n="/ascendc.github.io/assets/AlltoAll.BN31VXNs.png",d="/ascendc.github.io/assets/alltoall_4rank_no_multisplit.CCHyvvIv.png",o="/ascendc.github.io/assets/alltoall_4rank_3split.B2Ke3xtr.png",c="/ascendc.github.io/assets/first_round_4rank_alltoall.jd9tWHT7.png",v=JSON.parse('{"title":"","description":"","frontmatter":{"breadcrumbs":[{"text":"Ascend C API","link":"/api/api_list"},{"text":"SIMD API","link":"/api/SIMD-API/SIMD-API"},{"text":"高阶API","link":"/api/SIMD-API/adv_api/adv_api"},{"text":"HCCL通信类","link":"/api/SIMD-API/adv_api/HCCL_communication/HCCL_communication"},{"text":"HCCL核函数（Kernel）侧接口","link":"/api/SIMD-API/adv_api/HCCL_communication/HCCL_Kernel/HCCL_Kernel"},{"text":"AlltoAll","link":"/api/SIMD-API/adv_api/HCCL_communication/HCCL_Kernel/AlltoAll"}]},"headers":[],"relativePath":"api/SIMD-API/adv_api/HCCL_communication/HCCL_Kernel/AlltoAll.md","filePath":"api/SIMD-API/adv_api/HCCL_communication/HCCL_Kernel/AlltoAll.md","outlineHeaders":[{"level":2,"title":"产品支持情况","slug":"产品支持情况","link":"#产品支持情况"},{"level":2,"title":"功能说明","slug":"功能说明","link":"#功能说明"},{"level":2,"title":"函数原型","slug":"函数原型","link":"#函数原型"},{"level":2,"title":"参数说明","slug":"参数说明","link":"#参数说明"},{"level":2,"title":"返回值说明","slug":"返回值说明","link":"#返回值说明"},{"level":2,"title":"约束说明","slug":"约束说明","link":"#约束说明"},{"level":2,"title":"调用示例","slug":"调用示例","link":"#调用示例"}],"lastUpdated":1787132628000}'),r={name:"api/SIMD-API/adv_api/HCCL_communication/HCCL_Kernel/AlltoAll.md"};function s(A,t,u,h,p,_){return a(),e("div",null,[...t[0]||(t[0]=[i('<div><article class="markdown-body"><h1>AlltoAll</h1><h2 id="产品支持情况">产品支持情况<a class="header-anchor" href="#产品支持情况">​</a></h2><div data-filter="950"><ul><li>Ascend 950PR/Ascend 950DT：支持</li></ul></div><div data-filter="A3"><ul><li>Atlas A3 训练系列产品/Atlas A3 推理系列产品：支持</li></ul></div><div data-filter="910b"><ul><li>Atlas A2 训练系列产品/Atlas A2 推理系列产品：支持</li></ul></div><div data-filter="310b"><ul><li>Atlas 200I/500 A2 推理产品：不支持</li></ul></div><div data-filter="310p"><ul><li>Atlas 推理系列产品AI Core：不支持</li><li>Atlas 推理系列产品Vector Core：不支持</li></ul></div><div data-filter="910"><ul><li>Atlas 训练系列产品：不支持</li></ul></div><h2 id="功能说明">功能说明<a class="header-anchor" href="#功能说明">​</a></h2><p>集合通信AlltoAll的任务下发接口，返回该任务的标识handleId给用户。AlltoAll的功能为：每张卡向通信域内所有卡发送相同数据量的数据，并从所有卡接收相同数据量的数据。结合原型中的参数，描述接口功能，具体为，第j张卡接收到来自第i张卡的sendBuf中第j块数据，并将该数据存放到本卡recvBuf中第i块的位置。</p><p><img src="'+n+`" alt></p><h2 id="函数原型">函数原型<a class="header-anchor" href="#函数原型">​</a></h2><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>template &lt;bool commit = false&gt;
__aicore__ inline HcclHandle AlltoAll(GM_ADDR sendBuf, GM_ADDR recvBuf, uint64_t dataCount, HcclDataType dataType, uint64_t strideCount = 0, uint8_t repeat = 1)
</code></pre></div><h2 id="参数说明">参数说明<a class="header-anchor" href="#参数说明">​</a></h2><p><strong>表1</strong> 模板参数说明</p><table><thead><tr><th>参数名</th><th>输入/输出</th><th>描述</th></tr></thead><tbody><tr><td>commit</td><td>输入</td><td>bool类型。参数取值如下：<br>true：在调用Prepare接口时，Commit同步通知服务端可以执行该通信任务。<br>false：在调用Prepare接口时，不通知服务端执行该通信任务。</td></tr></tbody></table><p><strong>表2</strong> 接口参数说明</p><table><thead><tr><th>参数名</th><th>输入/输出</th><th>描述</th></tr></thead><tbody><tr><td>sendBuf</td><td>输入</td><td>源数据buffer地址。</td></tr><tr><td>recvBuf</td><td>输出</td><td>目的数据buffer地址，集合通信结果输出到此buffer中。</td></tr><tr><td>dataCount</td><td>输入</td><td>本卡向通信域内其它每张卡收发的数据量，单位为sizeof(dataType)。<br><br>例如，通信域内共4张卡，每张卡的sendBuf中均有4个fp16的数据，那么dataCount=1。</td></tr><tr><td>dataType</td><td>输入</td><td>AlltoAll操作的数据类型，目前支持HcclDataType包含的全部数据类型，HcclDataType详细可参考<a href="HCCL_usage.html#table116710585514">表1</a>。</td></tr><tr><td>strideCount</td><td>输入</td><td>多轮切分场景下，一次AlltoAll任务中，每张卡内参与通信的数据块间的间隔。默认值为0，表示数据块内存连续。<br>strideCount=0，每张卡内参与通信的数据块内存连续。卡rank_j收到来自卡rank_i的sendBuf中第j块数据，且数据块间的偏移数据量为j*dataCount，并将该数据存放于本卡recvBuf中第i块的位置，且偏移数据量为i*dataCount。<br>strideCount&gt;0，每张卡内参与通信的相邻数据块的起始地址偏移数据量为strideCount。卡rank_j收到来自卡rank_i的sendBuf中第j块数据，且数据块间的偏移数据量为j*strideCount，并将该数据存放于本卡recvBuf中第i块的位置，且偏移数据量为i*strideCount。<br><br>注意：上述的偏移数据量为数据个数，单位为sizeof(dataType)。</td></tr><tr><td>repeat</td><td>输入</td><td>一次下发的AlltoAll通信任务个数。repeat取值≥1，默认值为1。当repeat&gt;1时，每轮AlltoAll任务的sendBuf和recvBuf地址由服务端更新，每一轮任务i的更新公式如下：<br><br>sendBuf[i] = sendBuf + dataCount * sizeof(datatype) * i, i∈[0, repeat)<br><br>recvBuf[i] = recvBuf + dataCount * sizeof(datatype) * i, i∈[0, repeat)<br><br>注意：当设置repeat&gt;1时，须与strideCount参数配合使用，规划通信数据地址。</td></tr></tbody></table><h2 id="返回值说明">返回值说明<a class="header-anchor" href="#返回值说明">​</a></h2><p>返回该任务的标识handleId，handleId大于等于0。调用失败时，返回 -1。</p><h2 id="约束说明">约束说明<a class="header-anchor" href="#约束说明">​</a></h2><ul><li>调用本接口前确保已调用过<a href="InitV2.html">InitV2</a>和<a href="SetCcTilingV2.html">SetCcTilingV2</a>接口。</li><li>若HCCL对象的<a href="HCCL_template_params.html#hccl-template-params">config模板参数</a>未指定下发通信任务的核，该接口只能在AIC核或者AIV核两者之一上调用。若HCCL对象的<a href="HCCL_template_params.html#hccl-template-params">config模板参数</a>中指定了下发通信任务的核，则该接口可以在AIC核和AIV核上同时调用，接口内部会根据指定的核的类型，只在AIC核、AIV核二者之一下发该通信任务。</li></ul><div data-filter="950"><ul><li>对于Ascend 950PR/Ascend 950DT，通信服务端为CCU时，默认仅支持FullMesh算法，并且单次最大通信数据量不能超过256M。</li><li>对于Ascend 950PR/Ascend 950DT，一个通信域内，所有Prepare接口的总调用次数不能超过63。</li></ul></div><div data-filter="910b"><ul><li>对于Atlas A2 训练系列产品/Atlas A2 推理系列产品，一个通信域内，所有Prepare接口的总调用次数不能超过63。</li></ul></div><div data-filter="A3"><ul><li>对于Atlas A3 训练系列产品/Atlas A3 推理系列产品，一个通信域内，所有Prepare接口和InterHcclGroupSync接口的总调用次数不能超过63。</li><li>对于Atlas A3 训练系列产品/Atlas A3 推理系列产品，一个通信域内，最大支持128卡通信。</li></ul></div><h2 id="调用示例">调用示例<a class="header-anchor" href="#调用示例">​</a></h2><ul><li><p>非多轮切分场景</p><p>4张卡执行AlltoAll通信任务。非多轮切分场景下，每张卡上的数据块和数据量一致，如下图中每张卡的A\\B\\C\\D数据块，数据量均为dataCount。</p><p><strong>图1</strong> 非多轮切分场景下4卡AlltoAll通信<br><img src="`+d+`" alt title="非多轮切分场景下4卡AlltoAll通信"></p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>extern &quot;C&quot; __global__ __aicore__ void alltoall_custom(GM_ADDR xGM, GM_ADDR yGM, GM_ADDR workspaceGM, GM_ADDR tilingGM)
{
    constexpr uint64_t dataCount = 128U;               // 数据量
    auto sendBuf = xGM;                                // xGM为AlltoAll的输入GM地址
    auto recvBuf = yGM;                                // yGM为AlltoAll的输出GM地址
    REGISTER_TILING_DEFAULT(AllToAllCustomTilingData); // AllToAllCustomTilingData为对应算子头文件定义的结构体
    GET_TILING_DATA_WITH_STRUCT(AllToAllCustomTilingData, tilingData, tilingGM);

    Hccl hccl;
    GM_ADDR contextGM = AscendC::GetHcclContext&lt;0&gt;(); // AscendC自定义算子kernel中，通过此方式获取HCCL context

    if (AscendC::g_coreType == AIV) { // 指定AIV核通信
        hccl.InitV2(contextGM, &amp;tilingData);
        auto ret = hccl.SetCcTilingV2(offsetof(AllToAllCustomTilingData, alltoallCcTiling));
        if (ret != HCCL_SUCCESS) {
            return;
        }
        HcclHandle handleId = hccl.AlltoAll&lt;true&gt;(sendBuf, recvBuf, dataCount, HcclDataType::HCCL_DATA_TYPE_FP16);
        hccl.Wait(handleId);
        AscendC::SyncAll&lt;true&gt;(); // AIV核全同步，防止0核执行过快，提前调用hccl.Finalize()接口，导致其他核Wait卡死
        hccl.Finalize();
    }
}
</code></pre></div></li><li><p>多轮切分场景</p><p>开启多轮切分，等效处理上述非多轮切分示例的通信。在每张卡的数据均分成4块（A\\B\\C\\D）的基础上，将每一块继续切分若干块。本例中继续切分3块，如下图所示，被继续切分成的3块数据包括，2个数据量为tileLen的数据块，1个数据量为tailLen的尾块。切分后，需要分3轮进行AlltoAll通信任务，将等效上述非多轮切分的通信结果。</p><p><strong>图2</strong> 3轮切分场景下4卡AlltoAll通信<br><img src="`+o+'" alt title="3轮切分场景下4卡AlltoAll通信"></p><p>具体实现为，第1轮通信，每个rank上0-0\\1-0\\2-0\\3-0数据块进行AlltoAll处理；同一个卡上，参与通信的相邻数据块的间隔为参数strideCount的取值。第2轮通信，每个rank上0-1\\1-1\\2-1\\3-1数据块进行AlltoAll处理。第3轮通信，每个rank上0-2\\1-2\\2-2\\3-2数据块进行AlltoAll处理。第1轮通信的图示及代码示例如下。</p><p><strong>图3</strong> 第一轮4卡AlltoAll示意图<br><img src="'+c+`" alt title="第一轮4卡AlltoAll示意图"></p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>extern &quot;C&quot; __global__ __aicore__ void alltoall_custom(GM_ADDR xGM, GM_ADDR yGM, GM_ADDR workspaceGM, GM_ADDR tilingGM)
{
    constexpr uint32_t tileNum = 2U;                   // 首块数量
    constexpr uint64_t tileLen = 128U;                 // 首块数据个数
    constexpr uint32_t tailNum = 1U;                   // 尾块数量
    constexpr uint64_t tailLen = 100U;                 // 尾块数据个数
    auto sendBuf = xGM;                                // xGM为AlltoAll的输入GM地址
    auto recvBuf = yGM;                                // yGM为AlltoAll的输出GM地址
    REGISTER_TILING_DEFAULT(AllToAllCustomTilingData); // AllToAllCustomTilingData为对应算子头文件定义的结构体
    GET_TILING_DATA_WITH_STRUCT(AllToAllCustomTilingData, tilingData, tilingGM);

    Hccl hccl;
    GM_ADDR contextGM = AscendC::GetHcclContext&lt;0&gt;(); // AscendC自定义算子kernel中，通过此方式获取HCCL context

    if (AscendC::g_coreType == AIV) { // 指定AIV核通信
        hccl.InitV2(contextGM, &amp;tilingData);
        auto ret = hccl.SetCcTilingV2(offsetof(AllToAllCustomTilingData, alltoallCcTiling));
        if (ret != HCCL_SUCCESS) {
            return;
        }
        uint64_t strideCount = tileLen * tileNum + tailLen * tailNum;
        // 2个首块处理
        HcclHandle handleId1 =
            hccl.AlltoAll&lt;true&gt;(sendBuf, recvBuf, tileLen, HcclDataType::HCCL_DATA_TYPE_FP16, strideCount, tileNum);
        // 1个尾块处理
        constexpr uint32_t kSizeOfFloat16 = 2U;
        sendBuf += tileLen * tileNum * kSizeOfFloat16;
        recvBuf += tileLen * tileNum * kSizeOfFloat16;
        HcclHandle handleId2 =
            hccl.AlltoAll&lt;true&gt;(sendBuf, recvBuf, tailLen, HcclDataType::HCCL_DATA_TYPE_FP16, strideCount, tailNum);

        for (uint8_t i = 0; i &lt; tileNum; i++) {
            hccl.Wait(handleId1);
        }
        hccl.Wait(handleId2);
        AscendC::SyncAll&lt;true&gt;(); // 全AIV核同步，防止0核执行过快，提前调用hccl.Finalize()接口，导致其他核Wait卡死
        hccl.Finalize();
    }
}
</code></pre></div></li></ul></article></div>`,1)])])}const f=l(r,[["render",s]]);export{v as __pageData,f as default};
