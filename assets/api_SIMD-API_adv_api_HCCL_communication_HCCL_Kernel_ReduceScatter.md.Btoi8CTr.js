import{_ as e,o as a,a as l,b as i}from"./app.BGziXukh.js";const n="/ascendc.github.io/assets/ReduceScatter.lYl5fhvv.png",c="/ascendc.github.io/assets/reducescatter_example.Cas_q9E_.png",r="/ascendc.github.io/assets/ReduceScatter_gai.CNIShsDB.png",d="/ascendc.github.io/assets/per_rank_data_split_59.Uponlf12.png",u="/ascendc.github.io/assets/first_round_4rank_reducescatter.DMZn2Cq7.png",A=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"api/SIMD-API/adv_api/HCCL_communication/HCCL_Kernel/ReduceScatter.md","filePath":"api/SIMD-API/adv_api/HCCL_communication/HCCL_Kernel/ReduceScatter.md","outlineHeaders":[{"level":2,"title":"产品支持情况","slug":"产品支持情况","link":"#产品支持情况"},{"level":2,"title":"功能说明","slug":"功能说明","link":"#功能说明"},{"level":2,"title":"函数原型","slug":"函数原型","link":"#函数原型"},{"level":2,"title":"参数说明","slug":"参数说明","link":"#参数说明"},{"level":3,"title":"数据类型","slug":"数据类型","link":"#数据类型"},{"level":3,"title":"op说明","slug":"op说明","link":"#op说明"},{"level":2,"title":"返回值说明","slug":"返回值说明","link":"#返回值说明"},{"level":2,"title":"约束说明","slug":"约束说明","link":"#约束说明"},{"level":2,"title":"调用示例","slug":"调用示例","link":"#调用示例"}],"lastUpdated":1795596375000}'),s={name:"api/SIMD-API/adv_api/HCCL_communication/HCCL_Kernel/ReduceScatter.md"};function o(p,t,h,_,C,f){return a(),l("div",null,[...t[0]||(t[0]=[i('<div><article class="markdown-body"><h1>ReduceScatter</h1><h2 id="产品支持情况">产品支持情况<a class="header-anchor" href="#产品支持情况">​</a></h2><div data-filter="950"><ul><li>Ascend 950PR&amp;950DT系列产品：支持</li></ul></div><div data-filter="A3"><ul><li>Atlas A3系列产品：支持</li></ul></div><div data-filter="910b"><ul><li>Atlas A2系列产品：支持</li></ul></div><div data-filter="310b"><ul><li>Atlas 200I/500 A2推理产品：不支持</li></ul></div><div data-filter="310p"><ul><li>Atlas推理系列产品AI Core：不支持</li><li>Atlas推理系列产品Vector Core：不支持</li></ul></div><div data-filter="910"><ul><li>Atlas训练系列产品：不支持</li></ul></div><h2 id="功能说明">功能说明<a class="header-anchor" href="#功能说明">​</a></h2><p>集合通信算子ReduceScatter的任务下发接口，返回该任务的标识handleId给用户。ReduceScatter的功能为：将所有rank的输入相加（或其他归约操作）后，再把结果按照rank编号均匀分散到各个rank的输出buffer，每个进程拿到其他进程1/ranksize份的数据进行归约操作。</p><p><img src="'+n+`" alt></p><h2 id="函数原型">函数原型<a class="header-anchor" href="#函数原型">​</a></h2><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>template &lt;bool commit = false&gt;
__aicore__ inline HcclHandle ReduceScatter(GM_ADDR sendBuf, GM_ADDR recvBuf, uint64_t recvCount, HcclDataType dataType, HcclReduceOp op, uint64_t strideCount, uint8_t repeat = 1)
</code></pre></div><h2 id="参数说明">参数说明<a class="header-anchor" href="#参数说明">​</a></h2><p><strong>表1</strong> 模板参数说明</p><table><thead><tr><th>参数名</th><th>输入/输出</th><th>描述</th></tr></thead><tbody><tr><td>commit</td><td>输入</td><td>bool类型。参数取值如下：<br>true：在调用Prepare接口时，Commit同步通知服务端可以执行该通信任务。<br>false：在调用Prepare接口时，不通知服务端执行该通信任务。</td></tr></tbody></table><p><strong>表2</strong> 接口参数说明</p><table><thead><tr><th>参数名</th><th>输入/输出</th><th>描述</th></tr></thead><tbody><tr><td>sendBuf</td><td>输入</td><td>源数据buffer地址。</td></tr><tr><td>recvBuf</td><td>输出</td><td>目的数据buffer地址，集合通信结果输出到此buffer中。</td></tr><tr><td>recvCount</td><td>输入</td><td>参与ReduceScatter操作的recvBuf的数据个数；sendBuf的数据个数等于recvCount * rank size。</td></tr><tr><td>dataType</td><td>输入</td><td>ReduceScatter操作的数据类型。不同产品和通信服务端支持的数据类型请参见<a href="#%E6%95%B0%E6%8D%AE%E7%B1%BB%E5%9E%8B">数据类型</a>。HcclDataType数据类型的介绍请参考<a href="HCCL_usage.html#table116710585514">表1</a>。</td></tr><tr><td>op</td><td>输入</td><td>ReduceScatter的操作类型。支持的操作类型及约束请参见<a href="#op%E8%AF%B4%E6%98%8E">op说明</a>。HcclReduceOp数据类型的介绍请参考<a href="HCCL_usage.html#table2469980529">表2</a>。</td></tr><tr><td>strideCount</td><td>输入</td><td>当将一张卡上sendBuf中的数据scatter到多张卡的recvBuf时，需要用strideCount参数表示sendBuf上相邻数据块间的起始地址的偏移量。<br>strideCount=0，表示从当前卡发送数据给其它卡时，相邻数据块保持地址连续。本卡发送数据到卡rank[i]，且本卡数据块在sendBuf中的偏移为i*recvCount。非多轮切分场景下，推荐用户设置该参数为0。<br>strideCount&gt;0，表示从当前卡发送数据给其它卡时，相邻数据块在sendBuf中起始地址的偏移数据量为strideCount。本卡发送数据到卡rank[i]，且本卡数据块在SendBuf中的偏移为i*strideCount。<br><br>注意：上述的偏移数据量为数据个数，单位为sizeof(dataType)。</td></tr><tr><td>repeat</td><td>输入</td><td>一次下发的ReduceScatter通信任务个数。repeat取值≥1，默认值为1。当repeat&gt;1时，每个ReduceScatter任务的sendBuf和recvBuf地址由服务端自动算出，计算公式如下：<br><br>sendBuf[i] = sendBuf + recvCount * sizeof(datatype) * i, i∈[0, repeat)<br><br>recvBuf[i] = recvBuf + recvCount * sizeof(datatype) * i, i∈[0, repeat)<br><br>注意：当设置repeat&gt;1时，须与strideCount参数配合使用，规划通信数据地址。</td></tr></tbody></table><h3 id="数据类型">数据类型<a class="header-anchor" href="#数据类型">​</a></h3><p>不同产品和通信服务端支持的数据类型如下。</p><div data-filter="950"><ul><li><p>对于Ascend 950PR&amp;950DT系列产品：</p><ul><li>通信服务端为AI CPU时，支持int8_t、int16_t、half、bfloat16_t、int32_t、float、int64_t、uint64_t、double。</li><li>通信服务端为CCU时，支持int16_t、half、bfloat16_t、int32_t、float；int8_t的使用须满足<a href="#op%E8%AF%B4%E6%98%8E">op说明</a>中的输入输出类型和算法约束。</li></ul></li></ul></div><div data-filter="A3"><ul><li>对于Atlas A3系列产品，支持int8_t、int16_t、half、bfloat16_t、int32_t、float、int64_t。</li></ul></div><div data-filter="910b"><ul><li>对于Atlas A2系列产品，支持int8_t、int16_t、half、bfloat16_t、int32_t、float、int64_t。</li></ul></div><h3 id="op说明">op说明<a class="header-anchor" href="#op说明">​</a></h3><div data-filter="950"><ul><li><p>对于Ascend 950PR&amp;950DT系列产品：</p><ul><li>AI CPU服务端：支持sum、prod、max、min操作，其中prod操作不支持int16_t、bfloat16_t数据类型。</li><li>CCU服务端：仅支持sum、max、min操作。使用int8_t输入时，须选择支持int8_t的通信算法，并满足以下输入输出类型约束；当前CCU自动选路的部分算法不支持int8_t。 <ul><li>sum操作：仅适用于所选通信算法支持int8_t输入、浮点输出归约的场景。须通过<a href="../HCCL_Tiling/SetReduceType.html">SetReduceType</a>将输出类型设置为half、bfloat16_t、float三者之一。</li><li>max、min操作：输出类型须与输入类型一致。</li></ul></li></ul></li></ul></div><div data-filter="A3"><ul><li>对于Atlas A3系列产品，通信服务端为AI CPU，支持sum、prod、max、min操作，其中prod操作不支持int16_t、bfloat16_t数据类型。</li></ul></div><div data-filter="910b"><ul><li>对于Atlas A2系列产品，通信服务端为AI CPU，支持sum、prod、max、min操作，其中prod操作不支持int16_t、bfloat16_t数据类型。</li></ul></div><p><strong>图1</strong> ReduceScatter通信示例</p><p><img src="`+c+'" alt="ReduceScatter通信示例-58"></p><p>以上图为例，假设4张卡的场景，每份数据被切分为3块（TileCnt为3），每张卡上的0-0、0-1、0-2数据最终reduce+scatter到卡rank0的recvBuf上，其余的每块1-y、2-y、3-y数据类似，最终分别reduce+scatter到卡rank1、rank2和rank3的recvBuf上。因此，对一张卡上的数据需要调用3次ReduceScatter接口，完成每份数据的3块切分数据的通信。对于每一份数据，本接口中参数recvCount为TileLen，strideCount为TileLen*TileCnt（即数据块0-0和1-0间隔的数据个数）。由于本例为内存连续场景，因此也可以只调用1次ReduceScatter接口，并将repeat参数设置为3。</p><h2 id="返回值说明">返回值说明<a class="header-anchor" href="#返回值说明">​</a></h2><p>返回该任务的标识handleId，handleId大于等于0。调用失败时，返回 -1。</p><h2 id="约束说明">约束说明<a class="header-anchor" href="#约束说明">​</a></h2><ul><li>调用本接口前确保已调用过<a href="InitV2.html">InitV2</a>和<a href="SetCcTilingV2.html">SetCcTilingV2</a>接口。</li><li>若HCCL对象的<a href="HCCL_template_params.html#hccl-template-params">config模板参数</a>未指定下发通信任务的核，该接口只能在AIC核或者AIV核两者之一上调用。若HCCL对象的<a href="HCCL_template_params.html#hccl-template-params">config模板参数</a>中指定了下发通信任务的核，则该接口可以在AIC核和AIV核上同时调用，接口内部会根据指定的核的类型，只在AIC核、AIV核二者之一下发该通信任务。</li></ul><div data-filter="910b"><ul><li>对于Atlas A2系列产品，一个通信域内，所有Prepare接口的总调用次数不能超过63。</li></ul></div><div data-filter="A3"><ul><li>对于Atlas A3系列产品，一个通信域内，所有Prepare接口和InterHcclGroupSync接口的总调用次数不能超过63。</li></ul></div><div data-filter="950"><ul><li>对于Ascend 950PR&amp;950DT系列产品，一个通信域内，所有Prepare接口的总调用次数不能超过63。</li><li>对于Ascend 950PR&amp;950DT系列产品，通信服务端为CCU时，最大支持8卡的全连接，默认仅支持FullMesh算法，并且单次最大通信数据量不能超过256M。</li></ul></div><h2 id="调用示例">调用示例<a class="header-anchor" href="#调用示例">​</a></h2><ul><li><p>非多轮切分场景</p><p>如下图所示，4张卡上均有300 * 4=1200个float16数据，每张卡从xGM内存中获取到本卡数据，对各卡数据完成reduce sum计算后的结果数据，进行scatter处理，最终每张卡都得到300个reduce sum后的float16数据。</p><p><strong>图2</strong> 非多轮切分场景下4卡ReduceScatter通信</p><p><img src="'+r+`" alt></p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>extern &quot;C&quot; __global__ __aicore__ void reduce_scatter_custom(
    GM_ADDR xGM, GM_ADDR yGM, GM_ADDR workspaceGM, GM_ADDR tilingGM)
{
    auto sendBuf = xGM;       // xGM为ReduceScatter的输入GM地址
    auto recvBuf = yGM;       // yGM为ReduceScatter的输出GM地址
    uint64_t recvCount = 300; // 每张卡的通信结果数据个数
    uint64_t strideCount = 0; // 非切分场景strideCount可设置为0
    HcclReduceOp reduceOp = HcclReduceOp::HCCL_REDUCE_SUM;
    REGISTER_TILING_DEFAULT(ReduceScatterCustomTilingData); // ReduceScatterCustomTilingData为对应算子头文件定义的结构体
    GET_TILING_DATA_WITH_STRUCT(ReduceScatterCustomTilingData, tilingData, tilingGM);

    Hccl hccl;
    GM_ADDR contextGM = AscendC::GetHcclContext&lt;0&gt;(); // AscendC自定义算子核函数（Kernel）中，通过此方式获取HCCL context
    if (AscendC::g_coreType == AIV) {                 // 指定AIV核通信
        hccl.InitV2(contextGM, &amp;tilingData);
        auto ret = hccl.SetCcTilingV2(offsetof(ReduceScatterCustomTilingData, reduceScatterCcTiling));
        if (ret != HCCL_SUCCESS) {
            return;
        }
        HcclHandle handleId1 = hccl.ReduceScatter&lt;true&gt;(
            sendBuf, recvBuf, recvCount, HcclDataType::HCCL_DATA_TYPE_FP16, reduceOp, strideCount);
        hccl.Wait(handleId1);
        AscendC::SyncAll&lt;true&gt;(); // 全AIV核同步，防止0核执行过快，提前调用hccl.Finalize()接口，导致其他核Wait卡死
        hccl.Finalize();
    }
}
</code></pre></div></li><li><p>多轮切分场景</p><p>开启多轮切分，等效处理上述非多轮切分示例的通信。如下图所示，每张卡的每份300个float16数据，被切分为2个首块，1个尾块。每个首块的数据量tileLen为128个float16数据，尾块的数据量tailLen为44个float16数据。在算子内部实现时，需要对切分后的数据分3轮进行ReduceScatter通信任务，将等效上述非多轮切分的通信结果。</p><p><strong>图3</strong> 各卡数据切分示意图<br><img src="`+d+'" alt="各卡数据切分示意图-59"></p><p>具体实现为，第1轮通信，每个rank上的0-0\\1-0\\2-0\\3-0数据块进行ReduceScatter处理。第2轮通信，每个rank上0-1\\1-1\\2-1\\3-1数据块进行ReduceScatter处理。第3轮通信，每个rank上0-2\\1-2\\2-2\\3-2数据块进行ReduceScatter处理。每一轮通信的输入数据中，各卡上相邻数据块的起始地址间隔的数据个数为strideCount，以第一轮通信结果为例，rank0的0-0数据块和1-0数据块，或者1-0数据块和2-0数据块，两个相邻数据块起始地址间隔的数据量strideCount = 2*tileLen+1*tailLen=300。</p><p><strong>图4</strong> 第一轮4卡ReduceScatter示意图<br><img src="'+u+`" alt="第一轮4卡ReduceScatter示意图"></p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>extern &quot;C&quot; __global__ __aicore__ void reduce_scatter_custom(
    GM_ADDR xGM, GM_ADDR yGM, GM_ADDR workspaceGM, GM_ADDR tilingGM)
{
    constexpr uint32_t tileNum = 2U;   // 首块数量
    constexpr uint64_t tileLen = 128U; // 首块数据个数
    constexpr uint32_t tailNum = 1U;   // 尾块数量
    constexpr uint64_t tailLen = 44U;  // 尾块数据个数
    auto sendBuf = xGM;                // xGM为ReduceScatter的输入GM地址
    auto recvBuf = yGM;                // yGM为ReduceScatter的输出GM地址
    HcclReduceOp reduceOp = HcclReduceOp::HCCL_REDUCE_SUM;
    uint64_t strideCount = tileLen * tileNum + tailLen * tailNum;
    REGISTER_TILING_DEFAULT(ReduceScatterCustomTilingData); // ReduceScatterCustomTilingData为对应算子头文件定义的结构体
    GET_TILING_DATA_WITH_STRUCT(ReduceScatterCustomTilingData, tilingData, tilingGM);

    Hccl hccl;
    GM_ADDR contextGM = AscendC::GetHcclContext&lt;0&gt;(); // AscendC自定义算子核函数（Kernel）中，通过此方式获取HCCL context
    if (AscendC::g_coreType == AIV) {                 // 指定AIV核通信
        hccl.InitV2(contextGM, &amp;tilingData);
        auto ret = hccl.SetCcTilingV2(offsetof(ReduceScatterCustomTilingData, reduceScatterCcTiling));
        if (ret != HCCL_SUCCESS) {
            return;
        }
        // 2个首块处理
        constexpr uint32_t tileRepeat = tileNum;
        // 除了sendBuf和recvBuf入参不同，处理2个首块的其余参数相同。故使用repeat=2，第2个首块ReduceScatter任务的sendBuf、recvBuf将由API内部自行更新
        HcclHandle handleId1 = hccl.ReduceScatter&lt;true&gt;(
            sendBuf, recvBuf, tileLen, HcclDataType::HCCL_DATA_TYPE_FP16, reduceOp, strideCount, tileRepeat);
        // 1个尾块处理
        constexpr uint32_t kSizeOfFloat16 = 2U;
        sendBuf += tileLen * tileNum * kSizeOfFloat16;
        recvBuf += tileLen * tileNum * kSizeOfFloat16;
        constexpr uint32_t tailRepeat = tailNum;
        HcclHandle handleId2 = hccl.ReduceScatter&lt;true&gt;(
            sendBuf, recvBuf, tailLen, HcclDataType::HCCL_DATA_TYPE_FP16, reduceOp, strideCount, tailRepeat);

        for (uint8_t i = 0; i &lt; tileRepeat; i++) {
            hccl.Wait(handleId1);
        }
        hccl.Wait(handleId2);
        AscendC::SyncAll&lt;true&gt;(); // 全AIV核同步，防止0核执行过快，提前调用hccl.Finalize()接口，导致其他核Wait卡死
        hccl.Finalize();
    }
}
</code></pre></div></li></ul></article></div>`,1)])])}const g=e(s,[["render",o]]);export{A as __pageData,g as default};
