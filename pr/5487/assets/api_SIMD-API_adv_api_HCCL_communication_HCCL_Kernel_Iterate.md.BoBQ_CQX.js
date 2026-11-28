import{_ as e,o as l,a,b as n}from"./app.DKoEZOcr.js";const i="/ascendc.github.io/pr/5487/assets/alltoallv_pairwise_steps.D8piw9mf.png",u=JSON.parse('{"title":"","description":"","frontmatter":{"breadcrumbs":[{"text":"Ascend C API","link":"/api/api_list"},{"text":"SIMD API","link":"/api/SIMD-API/SIMD-API"},{"text":"高阶API","link":"/api/SIMD-API/adv_api/adv_api"},{"text":"HCCL通信类","link":"/api/SIMD-API/adv_api/HCCL_communication/HCCL_communication"},{"text":"HCCL核函数（Kernel）侧接口","link":"/api/SIMD-API/adv_api/HCCL_communication/HCCL_Kernel/HCCL_Kernel"},{"text":"Iterate","link":"/api/SIMD-API/adv_api/HCCL_communication/HCCL_Kernel/Iterate"}]},"headers":[],"relativePath":"api/SIMD-API/adv_api/HCCL_communication/HCCL_Kernel/Iterate.md","filePath":"api/SIMD-API/adv_api/HCCL_communication/HCCL_Kernel/Iterate.md","outlineHeaders":[{"level":2,"title":"产品支持情况","slug":"产品支持情况","link":"#产品支持情况"},{"level":2,"title":"功能说明","slug":"功能说明","link":"#功能说明"},{"level":2,"title":"函数原型","slug":"函数原型","link":"#函数原型"},{"level":2,"title":"参数说明","slug":"参数说明","link":"#参数说明"},{"level":2,"title":"返回值说明","slug":"返回值说明","link":"#返回值说明"},{"level":2,"title":"约束说明","slug":"约束说明","link":"#约束说明"},{"level":2,"title":"调用示例","slug":"调用示例","link":"#调用示例"}],"lastUpdated":1787132628000}'),s={name:"api/SIMD-API/adv_api/HCCL_communication/HCCL_Kernel/Iterate.md"};function c(d,t,r,o,h,_){return l(),a("div",null,[...t[0]||(t[0]=[n('<div><article class="markdown-body"><h1>Iterate</h1><h2 id="产品支持情况">产品支持情况<a class="header-anchor" href="#产品支持情况">​</a></h2><div data-filter="950"><ul><li>Ascend 950PR/Ascend 950DT：不支持</li></ul></div><div data-filter="A3"><ul><li>Atlas A3 训练系列产品/Atlas A3 推理系列产品：支持</li></ul></div><div data-filter="910b"><ul><li>Atlas A2 训练系列产品/Atlas A2 推理系列产品：不支持</li></ul></div><div data-filter="310b"><ul><li>Atlas 200I/500 A2 推理产品：不支持</li></ul></div><div data-filter="310p"><ul><li>Atlas 推理系列产品AI Core：不支持</li><li>Atlas 推理系列产品Vector Core：不支持</li></ul></div><div data-filter="910"><ul><li>Atlas 训练系列产品：不支持</li></ul></div><h2 id="功能说明">功能说明<a class="header-anchor" href="#功能说明">​</a></h2><p>在某些算法下，一次完整的集合通信任务可以细分为多个步骤，对每个步骤的数据完成点对点的通信任务，称为细粒度通信。以通信算法&quot;AlltoAll=level0:fullmesh;level1:pairwise&quot;、通信步长为1的AlltoAllV通信任务为例，这里参数level0代表配置Server（昇腾AI Server，通常是8卡或16卡的昇腾NPU设备组成的服务器形态的统称）内通信算法，参数level1代表配置Server间通信算法，fullmesh为全连接通信算法，pairwise为逐对通信算法；如下图所示，该示例展示了AlltoAllV通信的所有待发送数据、每一步通信完成后各卡收到的数据。</p><p><strong>图1</strong> 使用pairwise算法的AlltoAllV通信步骤示意图<br><img src="'+i+`" alt title="使用pairwise算法的AlltoAllV通信步骤示意图"></p><p>在通算融合算子中，通过调用本接口，结合对应的Prepare原语，获取通信算法每一步的输入或输出，让计算、通信实现更精细粒度的流水排布，从而获得更好的性能收益。</p><h2 id="函数原型">函数原型<a class="header-anchor" href="#函数原型">​</a></h2><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>template &lt;bool sync = true&gt;
__aicore__ inline int32_t Iterate(HcclHandle handleId, uint16_t* seqSlices, uint16_t seqSliceLen)
</code></pre></div><h2 id="参数说明">参数说明<a class="header-anchor" href="#参数说明">​</a></h2><p><strong>表1</strong> 模板参数说明</p><table><thead><tr><th>参数名</th><th>输入/输出</th><th>描述</th></tr></thead><tbody><tr><td>sync</td><td>输入</td><td>bool类型。是否需要等待当前通信步骤完成再进行后续计算或通信任务，参数取值如下：<br>true：默认值，表示阻塞并等待当前通信步骤完成。该参数取值为true时，无需再调用<a href="Wait.html">Wait</a>接口等待通信任务完成。<br>false：表示不等待当前通信步骤完成。</td></tr></tbody></table><p><strong>表2</strong> 接口参数说明</p><table><thead><tr><th>参数名</th><th>输入/输出</th><th>描述</th></tr></thead><tbody><tr><td>handleId</td><td>输入</td><td>对应通信任务的标识ID，只能使用Prepare原语接口的返回值。<br>using HcclHandle = int8_t;</td></tr><tr><td>seqSlices</td><td>输出</td><td>由用户申请的栈空间，用于保存当前通信步骤的输入或输出数据块的索引下标。在先计算后通信场景，该参数返回当前通信步骤需要的输入数据块索引；在先通信后计算场景，该参数返回当前通信步骤的输出数据块索引。</td></tr><tr><td>seqSliceLen</td><td>输入</td><td>seqSlices数组的长度。根据算法的通信步长及算法逻辑，取每一步通信需要保存的数据块索引个数为该数组长度。</td></tr></tbody></table><h2 id="返回值说明">返回值说明<a class="header-anchor" href="#返回值说明">​</a></h2><ul><li><p>当通信任务未结束时：</p><ul><li>在先计算后通信场景，返回值为当前通信步骤需要的输入数据块数量，与参数seqSliceLen数值相同。</li><li>在先通信后计算场景，返回值为当前通信步骤产生的输出数据块数量，与参数seqSliceLen数值相同。</li></ul></li><li><p>当通信任务结束后，返回值为0。</p></li></ul><h2 id="约束说明">约束说明<a class="header-anchor" href="#约束说明">​</a></h2><ul><li>调用本接口前确保已调用过<a href="InitV2.html">InitV2</a>和<a href="SetCcTilingV2.html">SetCcTilingV2</a>接口。</li><li>入参handleId只能使用Prepare原语对应接口的返回值。</li><li>本接口当前支持的通信算法为&quot;AlltoAll=level0:fullmesh;level1:pairwise&quot;。</li></ul><h2 id="调用示例">调用示例<a class="header-anchor" href="#调用示例">​</a></h2><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>extern &quot;C&quot; __global__ __aicore__ void alltoallv_custom(
    GM_ADDR sendBuf, GM_ADDR recvBuf, GM_ADDR workspaceGM, GM_ADDR tilingGM)
{
    // 指定AIV核通信
    if (AscendC::g_coreType != AIV) {
        return;
    }

    constexpr uint32_t RANK_NUM = 4U;
    constexpr uint32_t STEP_SIZE = 1U; // 细粒度通信步长，通常使用SetStepSize接口设置，示例代码简化成1
    constexpr uint64_t sendCounts[RANK_NUM][RANK_NUM] = {{3, 3, 3, 3}, {2, 2, 3, 2}, {1, 4, 4, 4}, {3, 3, 3, 3}};
    constexpr uint64_t sDisplacements[RANK_NUM][RANK_NUM] = {{0, 3, 6, 9}, {0, 2, 4, 7}, {0, 1, 5, 9}, {0, 3, 6, 9}};
    constexpr uint64_t recvCounts[RANK_NUM][RANK_NUM] = {{3, 2, 1, 3}, {3, 2, 4, 3}, {3, 3, 4, 3}, {3, 2, 4, 3}};
    constexpr uint64_t rDisplacements[RANK_NUM][RANK_NUM] = {{0, 3, 5, 6}, {0, 3, 5, 9}, {0, 3, 6, 10}, {0, 3, 5, 9}};
    HcclDataType dtype = HcclDataType::HCCL_DATA_TYPE_FP16;
    REGISTER_TILING_DEFAULT(AllToAllVCustomTilingData); // AllToAllVCustomTilingData为对应算子头文件定义的结构体
    GET_TILING_DATA_WITH_STRUCT(AllToAllVCustomTilingData, tilingData, tilingGM);
    GM_ADDR contextGM = AscendC::GetHcclContext&lt;0&gt;(); // AscendC自定义算子kernel中，通过此方式获取HCCL context
    Hccl hccl;
    hccl.InitV2(contextGM, &amp;tilingData);
    auto ret = hccl.SetCcTilingV2(offsetof(AllToAllVCustomTilingData, alltoallvCcTiling));
    if (ret != HCCL_SUCCESS) {
        return;
    }
    const uint32_t selfRankId = hccl.GetRankId();
    // 当通信任务为&quot;AlltoAll=level0:fullmesh;level1:pairwise&quot;时
    // 1. 每步通信产生的数据块数量等于STEP_SIZE
    // 2. 总的通信步数为RANK_NUM/STEP_SIZE*repeat
    uint16_t sliceInfo[STEP_SIZE];

    if (TILING_KEY_IS(1000UL)) {
        // 通算融合中的“先通信后计算”场景，即每一步都是先通信，再将通信的输出作为计算的输入并执行计算
        const auto handleId = hccl.AlltoAllV&lt;true&gt;(
            sendBuf, sendCounts[selfRankId], sDisplacements[selfRankId], dtype, recvBuf, recvCounts[selfRankId],
            rDisplacements[selfRankId], dtype);
        // 模板参数sync = true，表示该接口会阻塞等待每一步通信结果，并将输出数据块的下标索引填入sliceInfo中
        while (hccl.Iterate&lt;true&gt;(handleId, sliceInfo, sizeof(sliceInfo) / sizeof(sliceInfo[0]))) {
            // 每一步通信的输出数据块的下标索引保存在sliceInfo中，可以插入相应的计算流程，实现细粒度的通算融合
        }
        // Iterate已经会阻塞等待，因此不再需要Wait
        // hccl.Wait(handleId);
    } else if (TILING_KEY_IS(1001UL)) {
        // 通算融合中的“先计算后通信”场景，即每一步都是先计算，再将计算的结果作为通信的输入并提交通信事务
        const uint8_t tileNum = 2U;
        const auto handleId = hccl.AlltoAllV&lt;false&gt;(
            sendBuf, sendCounts[selfRankId], sDisplacements[selfRankId], dtype, recvBuf, recvCounts[selfRankId],
            rDisplacements[selfRankId], dtype, tileNum);
        for (uint8_t i = 0; i &lt; tileNum; ++i) {
            for (uint8_t j = 0; j &lt; RANK_NUM; ++j) {
                // 模板参数sync = false，表示该接口不会阻塞等待，只会将当前这一步通信的输入数据块填入sliceInfo中
                if (hccl.Iterate&lt;false&gt;(handleId, sliceInfo, sizeof(sliceInfo) / sizeof(sliceInfo[0])) &lt;= 0) {
                    break;
                }
                // sliceInfo表示相对地址偏移，需要结合sDisplacements进行GM地址的运算，保证通信的输入正确
                // 计算完之后需要核间同步，再通过Commit接口通知服务端进行集合通信
                hccl.Commit(handleId);
            }
        }
        for (uint8_t i = 0; i &lt; tileNum * RANK_NUM; ++i) {
            hccl.Wait(handleId);
        }
    }
    AscendC::SyncAll&lt;true&gt;();
    hccl.Finalize();
}
</code></pre></div></article></div>`,1)])])}const A=e(s,[["render",c]]);export{u as __pageData,A as default};
