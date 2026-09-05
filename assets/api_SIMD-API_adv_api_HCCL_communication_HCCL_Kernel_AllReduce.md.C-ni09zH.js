import{_ as t,o as l,a,b as i}from"./app.C41L12d5.js";const n="/ascendc.github.io/assets/allreduce.DTwgBFNx.png",c="/ascendc.github.io/assets/allreduce_3split_example.EXeqqoBC.png",d="/ascendc.github.io/assets/250902140829537_gai.ClPXJJrA.png",r="/ascendc.github.io/assets/per_rank_data_split.C0wXDAfE.png",s="/ascendc.github.io/assets/allreduce_4rank_diagram.BlWk0Zyj.png",f=JSON.parse('{"title":"","description":"","frontmatter":{"breadcrumbs":[{"text":"Ascend C API","link":"/api/api_list"},{"text":"SIMD API","link":"/api/SIMD-API/SIMD-API"},{"text":"高阶API","link":"/api/SIMD-API/adv_api/adv_api"},{"text":"HCCL通信类","link":"/api/SIMD-API/adv_api/HCCL_communication/HCCL_communication"},{"text":"HCCL核函数（Kernel）侧接口","link":"/api/SIMD-API/adv_api/HCCL_communication/HCCL_Kernel/HCCL_Kernel"},{"text":"AllReduce","link":"/api/SIMD-API/adv_api/HCCL_communication/HCCL_Kernel/AllReduce"}]},"headers":[],"relativePath":"api/SIMD-API/adv_api/HCCL_communication/HCCL_Kernel/AllReduce.md","filePath":"api/SIMD-API/adv_api/HCCL_communication/HCCL_Kernel/AllReduce.md","outlineHeaders":[{"level":2,"title":"产品支持情况","slug":"产品支持情况","link":"#产品支持情况"},{"level":2,"title":"功能说明","slug":"功能说明","link":"#功能说明"},{"level":2,"title":"函数原型","slug":"函数原型","link":"#函数原型"},{"level":2,"title":"参数说明","slug":"参数说明","link":"#参数说明"},{"level":2,"title":"返回值说明","slug":"返回值说明","link":"#返回值说明"},{"level":2,"title":"约束说明","slug":"约束说明","link":"#约束说明"},{"level":2,"title":"调用示例","slug":"调用示例","link":"#调用示例"}],"lastUpdated":1787132628000}'),u={name:"api/SIMD-API/adv_api/HCCL_communication/HCCL_Kernel/AllReduce.md"};function o(_,e,p,A,h,C){return l(),a("div",null,[...e[0]||(e[0]=[i('<div><article class="markdown-body"><h1>AllReduce</h1><h2 id="产品支持情况">产品支持情况<a class="header-anchor" href="#产品支持情况">​</a></h2><div data-filter="950"><ul><li>Ascend 950PR/Ascend 950DT：支持</li></ul></div><div data-filter="A3"><ul><li>Atlas A3 训练系列产品/Atlas A3 推理系列产品：支持</li></ul></div><div data-filter="910b"><ul><li>Atlas A2 训练系列产品/Atlas A2 推理系列产品：支持</li></ul></div><div data-filter="310b"><ul><li>Atlas 200I/500 A2 推理产品：不支持</li></ul></div><div data-filter="310p"><ul><li>Atlas 推理系列产品AI Core：不支持</li><li>Atlas 推理系列产品Vector Core：不支持</li></ul></div><div data-filter="910"><ul><li>Atlas 训练系列产品：不支持</li></ul></div><h2 id="功能说明">功能说明<a class="header-anchor" href="#功能说明">​</a></h2><p>集合通信算子AllReduce的任务下发接口，返回该任务的标识handleId给用户。AllReduce功能为：将通信域内所有节点的同名张量进行reduce操作后，再把结果发送到所有节点的输出buffer。</p><p><img src="'+n+`" alt></p><h2 id="函数原型">函数原型<a class="header-anchor" href="#函数原型">​</a></h2><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>template &lt;bool commit = false&gt;
__aicore__ inline HcclHandle AllReduce(GM_ADDR sendBuf, GM_ADDR recvBuf, uint64_t count, HcclDataType dataType, HcclReduceOp op, uint8_t repeat = 1)
</code></pre></div><h2 id="参数说明">参数说明<a class="header-anchor" href="#参数说明">​</a></h2><p><strong>表1</strong> 模板参数说明</p><table><thead><tr><th>参数名</th><th>输入/输出</th><th>描述</th></tr></thead><tbody><tr><td>commit</td><td>输入</td><td>bool类型。参数取值如下：<br>true：在调用Prepare接口时，Commit同步通知服务端可以执行该通信任务。<br>false：在调用Prepare接口时，不通知服务端执行该通信任务。</td></tr></tbody></table><p><strong>表2</strong> 接口参数说明</p><table><thead><tr><th>参数名</th><th>输入/输出</th><th>描述</th></tr></thead><tbody><tr><td>sendBuf</td><td>输入</td><td>源数据buffer地址。</td></tr><tr><td>recvBuf</td><td>输出</td><td>目的数据buffer地址，集合通信结果输出到此buffer中。</td></tr><tr><td>count</td><td>输入</td><td>参与AllReduce操作的数据个数，比如只有一个int32数据参与，则count=1。</td></tr><tr><td>dataType</td><td>输入</td><td>AllReduce操作的数据类型，目前支持float、half（即float16）、int8_t、int16_t、int32_t、bfloat16_t数据类型，即支持取值为HCCL_DATA_TYPE_FP32、HCCL_DATA_TYPE_FP16、HCCL_DATA_TYPE_INT8、HCCL_DATA_TYPE_INT16、HCCL_DATA_TYPE_INT32、HCCL_DATA_TYPE_BFP16。HcclDataType数据类型的介绍请参考<a href="HCCL_usage.html#table116710585514">表1</a>。</td></tr><tr><td>op</td><td>输入</td><td>Reduce的操作类型，目前支持sum、max、min操作类型，即支持取值为HCCL_REDUCE_SUM、HCCL_REDUCE_MAX、HCCL_REDUCE_MIN。HcclReduceOp数据类型的介绍请参考<a href="HCCL_usage.html#table2469980529">表2</a>。</td></tr><tr><td>repeat</td><td>输入</td><td>一次下发的AllReduce通信任务个数。repeat取值≥1，默认值为1。当repeat&gt;1时，每个AllReduce任务的sendBuf和recvBuf地址由服务端自动算出，计算公式如下：<br><br>sendBuf[i] = sendBuf + count* sizeof(datatype) * i, i∈[0, repeat)<br><br>recvBuf[i] = recvBuf + count* sizeof(datatype) * i, i∈[0, repeat)<br><br>注意：当设置repeat&gt;1时，须与count参数配合使用，规划通信数据地址。</td></tr></tbody></table><p><strong>图1</strong> AllReduce三轮切分通信示例<br><img src="`+c+'" alt="AllReduce三轮切分通信示例"></p><h2 id="返回值说明">返回值说明<a class="header-anchor" href="#返回值说明">​</a></h2><p>返回该任务的标识handleId，handleId大于等于0。调用失败时，返回 -1。</p><h2 id="约束说明">约束说明<a class="header-anchor" href="#约束说明">​</a></h2><ul><li>调用本接口前确保已调用过<a href="InitV2.html">InitV2</a>和<a href="SetCcTilingV2.html">SetCcTilingV2</a>接口。</li><li>若HCCL对象的<a href="HCCL_template_params.html#hccl-template-params">config模板参数</a>未指定下发通信任务的核，该接口只能在AIC核或者AIV核两者之一上调用。若HCCL对象的<a href="HCCL_template_params.html#hccl-template-params">config模板参数</a>中指定了下发通信任务的核，则该接口可以在AIC核和AIV核上同时调用，接口内部会根据指定的核的类型，只在AIC核、AIV核二者之一下发该通信任务。</li></ul><div data-filter="910b"><ul><li>对于Atlas A2 训练系列产品/Atlas A2 推理系列产品，一个通信域内，所有Prepare接口的总调用次数不能超过63。</li></ul></div><div data-filter="A3"><ul><li>对于Atlas A3 训练系列产品/Atlas A3 推理系列产品，一个通信域内，所有Prepare接口和InterHcclGroupSync接口的总调用次数不能超过63。</li></ul></div><div data-filter="950"><ul><li>对于Ascend 950PR/Ascend 950DT，一个通信域内，所有Prepare接口的总调用次数不能超过63。</li><li>对于Ascend 950PR/Ascend 950DT，通信服务端为CCU时，最大支持8卡的全链接，默认仅支持FullMesh算法，并且单次最大通信数据量不能超过256M。</li></ul></div><h2 id="调用示例">调用示例<a class="header-anchor" href="#调用示例">​</a></h2><ul><li><p>非多轮切分场景</p><p>如下图所示，4张卡上均有count=300个float16数据，每张卡从xGM内存中获取到本卡数据，各卡的数据进行reduce sum计算后，将结果输出到各卡的yGM。</p><p><strong>图2</strong> 非多轮切分场景下4卡AllReduce通信</p><p><img src="'+d+`" alt></p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>extern &quot;C&quot; __global__ __aicore__ void all_reduce_custom(GM_ADDR xGM, GM_ADDR yGM, GM_ADDR workspaceGM, GM_ADDR tilingGM)
{
    auto sendBuf = xGM;       // xGM为AllReduce的输入GM地址
    auto recvBuf = yGM;       // yGM为AllReduce的输出GM地址
    uint64_t sendCount = 300; // 每张卡上均有300个float16的数据
    HcclReduceOp reduceOp = HcclReduceOp::HCCL_REDUCE_SUM;
    REGISTER_TILING_DEFAULT(AllReduceCustomTilingData); // AllReduceCustomTilingData为对应算子头文件定义的结构体
    GET_TILING_DATA_WITH_STRUCT(AllReduceCustomTilingData, tilingData, tilingGM);

    Hccl hccl;
    GM_ADDR contextGM = AscendC::GetHcclContext&lt;0&gt;(); // AscendC自定义算子kernel中，通过此方式获取HCCL context

    if (AscendC::g_coreType == AIV) { // 指定AIV核通信
        hccl.InitV2(contextGM, &amp;tilingData);
        auto ret = hccl.SetCcTilingV2(offsetof(AllReduceCustomTilingData, mc2CcTiling));
        if (ret) {
            return;
        }
        HcclHandle handleId1 =
            hccl.AllReduce&lt;true&gt;(sendBuf, recvBuf, sendCount, HcclDataType::HCCL_DATA_TYPE_FP16, reduceOp);
        hccl.Wait(handleId1);
        AscendC::SyncAll&lt;true&gt;(); // 全AIV核同步，防止0核执行过快，提前调用hccl.Finalize()接口，导致其他核Wait卡死
        hccl.Finalize();
    }
}
</code></pre></div></li><li><p>多轮切分场景</p><p>开启多轮切分，等效处理上述非多轮切分示例的通信。如下图所示，每张卡的300个float16数据，被切分为2个首块数据，1个尾块数据。每个首块的数据量tileLen为128个float16数据，尾块的数据量tailLen为44个float16数据。在算子内部实现时，需要对切分后的数据分3轮进行AllReduce通信任务，将等效上述非多轮切分的通信结果。</p><p><strong>图3</strong> 各卡数据切分示意图<br><img src="`+r+'" alt="各卡数据切分示意图"></p><p>具体实现为，第1轮通信，每个rank上0-0\\1-0\\2-0\\3-0数据块进行AllReduce处理。第2轮通信，每个rank上0-1\\1-1\\2-1\\3-1数据块进行AllReduce处理。第3轮通信，每个rank上0-2\\1-2\\2-2\\3-2数据块进行AllReduce处理，图示及代码示例如下。</p><p><strong>图4</strong> 4卡AllReduce示意图<br><img src="'+s+`" alt="4卡AllReduce示意图"></p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>extern &quot;C&quot; __global__ __aicore__ void all_reduce_custom(GM_ADDR xGM, GM_ADDR yGM, GM_ADDR workspaceGM, GM_ADDR tilingGM)
{
    constexpr uint32_t tileNum = 2U;   // 首块数量
    constexpr uint64_t tileLen = 128U; // 首块数据个数
    constexpr uint32_t tailNum = 1U;   // 尾块数量
    constexpr uint64_t tailLen = 44U;  // 尾块数据个数
    auto sendBuf = xGM;                // xGM为AllReduce的输入GM地址
    auto recvBuf = yGM;                // yGM为AllReduce的输出GM地址
    HcclReduceOp reduceOp = HcclReduceOp::HCCL_REDUCE_SUM;
    REGISTER_TILING_DEFAULT(AllReduceCustomTilingData); // AllReduceCustomTilingData为对应算子头文件定义的结构体
    GET_TILING_DATA_WITH_STRUCT(AllReduceCustomTilingData, tilingData, tilingGM);

    Hccl hccl;
    GM_ADDR contextGM = AscendC::GetHcclContext&lt;0&gt;(); // AscendC自定义算子kernel中，通过此方式获取HCCL context
    if (AscendC::g_coreType == AIV) {                 // 指定AIV核通信
        hccl.InitV2(contextGM, &amp;tilingData);
        auto ret = hccl.SetCcTilingV2(offsetof(AllReduceCustomTilingData, mc2CcTiling));
        if (ret != HCCL_SUCCESS) {
            return;
        }
        // 2个首块处理
        constexpr uint32_t tileRepeat = tileNum;
        // 除了sendBuf和recvBuf入参不同，对2个首块处理的其余参数相同。故使用repeat=2，第2个首块AllReduce任务的sendBuf、recvBuf将由API内部自行更新
        HcclHandle handleId1 =
            hccl.AllReduce&lt;true&gt;(sendBuf, recvBuf, tileLen, HcclDataType::HCCL_DATA_TYPE_FP16, reduceOp, tileRepeat);
        // 1个尾块处理
        constexpr uint32_t kSizeOfFloat16 = 2U;
        sendBuf += tileLen * tileNum * kSizeOfFloat16;
        recvBuf += tileLen * tileNum * kSizeOfFloat16;
        constexpr uint32_t tailRepeat = tailNum;
        HcclHandle handleId2 =
            hccl.AllReduce&lt;true&gt;(sendBuf, recvBuf, tailLen, HcclDataType::HCCL_DATA_TYPE_FP16, reduceOp, tailRepeat);

        for (uint8_t i = 0; i &lt; tileRepeat; i++) {
            hccl.Wait(handleId1);
        }
        hccl.Wait(handleId2);
        AscendC::SyncAll&lt;true&gt;(); // 全AIV核同步，防止0核执行过快，提前调用hccl.Finalize()接口，导致其他核Wait卡死
        hccl.Finalize();
    }
}
</code></pre></div></li></ul></article></div>`,1)])])}const v=t(u,[["render",o]]);export{f as __pageData,v as default};
