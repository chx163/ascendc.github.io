import{_ as n,o as a,a as o,b as i}from"./app.DKoEZOcr.js";const q=JSON.parse('{"title":"","description":"","frontmatter":{"breadcrumbs":[{"text":"Ascend C API","link":"/api/api_list"},{"text":"SIMD API","link":"/api/SIMD-API/SIMD-API"},{"text":"高阶API","link":"/api/SIMD-API/adv_api/adv_api"},{"text":"HCCL通信类","link":"/api/SIMD-API/adv_api/HCCL_communication/HCCL_communication"},{"text":"HCCL Tiling侧接口","link":"/api/SIMD-API/adv_api/HCCL_communication/HCCL_Tiling/HCCL_Tiling"},{"text":"v1版本TilingData（废弃）","link":"/api/SIMD-API/adv_api/HCCL_communication/HCCL_Tiling/v1_TilingData_deprecated"}]},"headers":[],"relativePath":"api/SIMD-API/adv_api/HCCL_communication/HCCL_Tiling/v1_TilingData_deprecated.md","filePath":"api/SIMD-API/adv_api/HCCL_communication/HCCL_Tiling/v1_TilingData_deprecated.md","outlineHeaders":[{"level":2,"title":"功能说明","slug":"功能说明","link":"#功能说明"},{"level":2,"title":"参数说明","slug":"参数说明","link":"#参数说明"},{"level":2,"title":"约束说明","slug":"约束说明","link":"#约束说明"},{"level":2,"title":"调用示例","slug":"调用示例","link":"#调用示例"}],"lastUpdated":1785895910000}'),e={name:"api/SIMD-API/adv_api/HCCL_communication/HCCL_Tiling/v1_TilingData_deprecated.md"};function d(u,t,_,r,l,D){return a(),o("div",null,[...t[0]||(t[0]=[i(`<div><article class="markdown-body"><h1>v1版本TilingData（废弃）</h1><div class="callout callout-note"><p class="callout-title"><svg class="callout-icon" viewBox="0 0 16 16" width="16" height="16"><path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8Zm8-6.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13ZM6.5 7.75A.75.75 0 0 1 7.25 7h1a.75.75 0 0 1 .75.75v2.75h.25a.75.75 0 0 1 0 1.5h-2a.75.75 0 0 1 0-1.5h.25v-2h-.25a.75.75 0 0 1-.75-.75ZM8 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"></path></svg>说明</p><p>该结构体废弃，并将在后续版本移除，请不要使用该结构体。无需直接对该结构体中的成员进行设置，统一使用HCCL Tiling提供的接口设置即可。 对于本节介绍的TilingData结构体，当构建通信计算融合算子时，通算融合算子的TilingData结构体中，计算Tiling结构体部分必须在本节的通信Tiling结构体后追加。 对于v1和v2两个版本的TilingData，Tiling结构体的第一个uint32_t字段用于区分两个版本，即<a href="#table4835205712588">v1版本</a>的preparePosition字段，<a href="v2_TilingData_deprecated.html#table4835205712588">v2版本</a>的version字段。若使用v2版本的Tiling结构体，则必须设置version=2；若使用v1版本的Tiling结构体，则设置preparePosition=1。用户使用任意版本的TilingData时，都必须严格按照对应版本的Tiling结构体，将其作为算子TilingData结构体的组成部分。</p></div><h2 id="功能说明">功能说明<a class="header-anchor" href="#功能说明">​</a></h2><p>AI CPU启动下发通信任务前，需获取固定的通信配置<a href="#table4835205712588">Mc2Msg</a>。在算子实现中，由Tiling组装通信配置项，通过配置固定参数和固定参数顺序的Tiling Data，将通信配置信息在调用AI CPU通信接口时传递给AI CPU。</p><h2 id="参数说明">参数说明<a class="header-anchor" href="#参数说明">​</a></h2><p><strong>表1</strong> Mc2Msg参数说明</p><p><span id="table4835205712588"></span></p><table><thead><tr><th>参数名</th><th>描述</th></tr></thead><tbody><tr><td>preparePosition</td><td>设置服务端组装任务的方式，用户需要在Tiling中显式赋值，uint32_t类型，当前支持的取值如下：<br><br>1：AI CPU与AI Core通过通信任务机制实现消息传递和任务下发；由AI Core侧通过消息通知时设置为1，即算子中使用<a href="../HCCL_Kernel/HCCL_Kernel.html">HCCL</a>时设置为1。</td></tr><tr><td>sendOff</td><td>预留参数，不可配置。</td></tr><tr><td>recvOff</td><td>预留参数，不可配置。</td></tr><tr><td>tailSendOff</td><td>预留参数，不可配置。</td></tr><tr><td>tailRecvOff</td><td>预留参数，不可配置。</td></tr><tr><td>sendCnt</td><td>预留参数，不可配置。</td></tr><tr><td>recvCnt</td><td>预留参数，不可配置。</td></tr><tr><td>tailSendCnt</td><td>预留参数，不可配置。</td></tr><tr><td>tailRecvCnt</td><td>预留参数，不可配置。</td></tr><tr><td>totalCnt</td><td>预留参数，不可配置。</td></tr><tr><td>turnNum</td><td>预留参数，不可配置。</td></tr><tr><td>tailNum</td><td>预留参数，不可配置。</td></tr><tr><td>stride</td><td>预留参数，不可配置。</td></tr><tr><td>workspaceOff</td><td>预留参数，不可配置。</td></tr><tr><td>notifyOff</td><td>预留参数，不可配置。</td></tr><tr><td>notifyBeginCnt</td><td>预留参数，不可配置。</td></tr><tr><td>notifyEndCnt</td><td>预留参数，不可配置。</td></tr><tr><td>useBufferType</td><td>设置通信算法获取输入数据的位置，uint8_t类型，参数取值如下：<br>0：默认值，默认通信输入不放在windows中，其中windows为其他卡可访问的共享缓冲区。<br>1：通信输入不放在windows中，当前该参数取值1与取值0的功能一致。<br>2：通信输入放在windows中，仅适用于AllReduce算法。</td></tr><tr><td>funID</td><td>预留参数，不可配置。</td></tr><tr><td>dataType</td><td>预留参数，不可配置。</td></tr><tr><td>groupNum</td><td>预留参数，不可配置。</td></tr><tr><td>reuseMode</td><td>预留参数，不可配置。</td></tr><tr><td>commType</td><td>预留参数，不可配置。</td></tr><tr><td>reduceOp</td><td>预留参数，不可配置。</td></tr><tr><td>commOrder</td><td>预留参数，不可配置。</td></tr><tr><td>waitPolicy</td><td>预留参数，不可配置。</td></tr><tr><td>rspPolicy</td><td>预留参数，不可配置。</td></tr><tr><td>exitPolicy</td><td>预留参数，不可配置。</td></tr><tr><td>commAlg</td><td>设置具体通信算法，用户需要在Tiling中显式赋值，uint8_t类型，当前支持的取值如下：<br><br>1：FullMesh算法，即NPU之间的全连接，任意两个NPU之间可以直接进行数据收发。</td></tr><tr><td>taskType</td><td>预留参数，不可配置。</td></tr><tr><td>debugMode</td><td>预留参数，不可配置。</td></tr><tr><td>stepSize</td><td>预留参数，不可配置。</td></tr><tr><td>sendArgIndex</td><td>预留参数，不可配置。</td></tr><tr><td>recvArgIndex</td><td>预留参数，不可配置。</td></tr><tr><td>commOutArgIndex</td><td>预留参数，不可配置。</td></tr><tr><td>hasCommOut</td><td>本卡的通信算法的计算结果是否输出到recvBuf（目的数据buffer地址）。仅AllGather算法与AlltoAll算法支持配置该参数。uint8_t类型，参数取值如下：<br>0：不输出本卡通信算法的计算结果。在无需输出通信结果时，配置参数值为0，此时不会拷贝本卡的通信结果数据，可提升算子性能。例如，在8卡场景下，本卡只取其他卡的部分数据，这时可配置本参数为0。<br>1：输出本卡通信算法的计算结果。</td></tr><tr><td>reserve</td><td>保留字段。</td></tr><tr><td>reserve2</td><td>保留字段。</td></tr></tbody></table><h2 id="约束说明">约束说明<a class="header-anchor" href="#约束说明">​</a></h2><ul><li>算子的Tiling Data结构需要按顺序完整包含<a href="#table4835205712588">Mc2Msg参数</a>。</li><li>AI CPU需获取固定数据结构的通信配置，算子注册Tiling Data时保持该结构的一致性。</li></ul><div data-filter="A3"><ul><li>Atlas A3 训练系列产品/Atlas A3 推理系列产品暂不支持该版本TilingData。</li></ul></div><h2 id="调用示例">调用示例<a class="header-anchor" href="#调用示例">​</a></h2><p>以自定义算子AllGatherMatmulCustom为例，如下为该算子的算子原型，&quot;gather_out&quot;为通信任务AllGather的输出。</p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>[
    {
        &quot;op&quot;: &quot;AllGatherMatmulCustom&quot;,
        &quot;input_desc&quot;: [
            {
                &quot;name&quot;: &quot;x1&quot;,
                &quot;param_type&quot;: &quot;required&quot;,
                &quot;format&quot;: [
                    &quot;ND&quot;,
		    &quot;ND&quot;
                ],
                &quot;type&quot;: [
                    &quot;float16&quot;,
                    &quot;bfloat16&quot;
                ]
            },
            {
                &quot;name&quot;: &quot;x2&quot;,
                &quot;param_type&quot;: &quot;required&quot;,
                &quot;format&quot;: [
                    &quot;ND&quot;,
		    &quot;ND&quot;
                ],
                &quot;type&quot;: [
                    &quot;float16&quot;,
                    &quot;bfloat16&quot;
                ]
            },
            {
                &quot;name&quot;: &quot;bias&quot;,
                &quot;param_type&quot;: &quot;optional&quot;,
                &quot;format&quot;: [
                    &quot;ND&quot;,
		    &quot;ND&quot;
                ],
                &quot;type&quot;: [
                    &quot;float16&quot;,
                    &quot;bfloat16&quot;
                ]
            }
        ],
        &quot;output_desc&quot;:[
            {
                &quot;name&quot;: &quot;y&quot;,
                &quot;param_type&quot;: &quot;required&quot;,
                &quot;format&quot;: [
                    &quot;ND&quot;,
		    &quot;ND&quot;
                ],
                &quot;type&quot;: [
                    &quot;float16&quot;,
                    &quot;bfloat16&quot;
                ]
            },
            {
                &quot;name&quot;: &quot;gather_out&quot;,
                &quot;param_type&quot;: &quot;required&quot;,
                &quot;format&quot;: [
                    &quot;ND&quot;,
		    &quot;ND&quot;
                ],
                &quot;type&quot;: [
                    &quot;float16&quot;,
                    &quot;bfloat16&quot;
                ]
            }
        ],
        &quot;attr&quot;: [
            {
                &quot;name&quot;: &quot;group&quot;,
                &quot;type&quot;: &quot;string&quot;,
                &quot;default_value&quot;:&quot;&quot;,
                &quot;param_type&quot;:&quot;required&quot;
            },
            {
                &quot;name&quot;: &quot;rank_size&quot;,
                &quot;type&quot;: &quot;int&quot;,
                &quot;default_value&quot;:0,
                &quot;param_type&quot;:&quot;optional&quot;
            },
            {
                &quot;name&quot;: &quot;is_gather_out&quot;,
                &quot;type&quot;: &quot;bool&quot;,
                &quot;default_value&quot;:true,
                &quot;param_type&quot;:&quot;optional&quot;
            }
        ]
    }
]
</code></pre></div><p>算子的Tiling Data结构需要按顺序完整包含Mc2Msg参数，如下为算子Tiling Data代码示例。</p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>// 声明Mc2Msg结构
BEGIN_TILING_DATA_DEF(Mc2Msg)
TILING_DATA_FIELD_DEF(uint32_t, preparePosition);
TILING_DATA_FIELD_DEF(uint32_t, sendOff);
TILING_DATA_FIELD_DEF(uint32_t, recvOff);
TILING_DATA_FIELD_DEF(uint32_t, tailSendOff);
TILING_DATA_FIELD_DEF(uint32_t, tailRecvOff);
TILING_DATA_FIELD_DEF(uint64_t, sendCnt);
TILING_DATA_FIELD_DEF(uint32_t, recvCnt);
TILING_DATA_FIELD_DEF(uint32_t, tailSendCnt);
TILING_DATA_FIELD_DEF(uint32_t, tailRecvCnt);
TILING_DATA_FIELD_DEF(uint32_t, totalCnt);
TILING_DATA_FIELD_DEF(uint32_t, turnNum);
TILING_DATA_FIELD_DEF(uint32_t, tailNum);
TILING_DATA_FIELD_DEF(uint32_t, stride);
TILING_DATA_FIELD_DEF(uint32_t, workspaceOff);
TILING_DATA_FIELD_DEF(uint32_t, notifyOff);
TILING_DATA_FIELD_DEF(uint16_t, notifyBeginCnt);
TILING_DATA_FIELD_DEF(uint16_t, notifyEndCnt);
TILING_DATA_FIELD_DEF(uint8_t, useBufferType);
TILING_DATA_FIELD_DEF(uint8_t, funID);
TILING_DATA_FIELD_DEF(uint8_t, dataType);
TILING_DATA_FIELD_DEF(uint8_t, groupNum);
TILING_DATA_FIELD_DEF(uint8_t, reuseMode);
TILING_DATA_FIELD_DEF(uint8_t, commType);
TILING_DATA_FIELD_DEF(uint8_t, reduceOp);
TILING_DATA_FIELD_DEF(uint8_t, commOrder);
TILING_DATA_FIELD_DEF(uint8_t, waitPolicy);
TILING_DATA_FIELD_DEF(uint8_t, rspPolicy);
TILING_DATA_FIELD_DEF(uint8_t, exitPolicy);
TILING_DATA_FIELD_DEF(uint8_t, commAlg);
TILING_DATA_FIELD_DEF(uint8_t, taskType);
TILING_DATA_FIELD_DEF(uint8_t, debugMode);
TILING_DATA_FIELD_DEF(uint8_t, stepSize);
TILING_DATA_FIELD_DEF(uint8_t, sendArgIndex);
TILING_DATA_FIELD_DEF(uint8_t, recvArgIndex);
TILING_DATA_FIELD_DEF(uint8_t, commOutArgIndex);
TILING_DATA_FIELD_DEF(uint8_t, hasCommOut);
TILING_DATA_FIELD_DEF(uint8_t, reserve);
TILING_DATA_FIELD_DEF(uint32_t, reserve2);
END_TILING_DATA_DEF;
REGISTER_TILING_DATA_CLASS(Mc2MsgOp, Mc2Msg)

BEGIN_TILING_DATA_DEF(AllGatherMatmulCustomTilingData)
TILING_DATA_FIELD_DEF_STRUCT(Mc2Msg, msg);
END_TILING_DATA_DEF;
</code></pre></div><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>// 配置Mc2Msg
AllGatherMatmulCustomTilingData tiling;
tiling.msg.set_preparePosition(1);
tiling.msg.set_commAlg(1);
tiling.msg.set_useBufferType(1);
tiling.msg.set_hasCommOut(1);
</code></pre></div></article></div>`,1)])])}const s=n(e,[["render",d]]);export{q as __pageData,s as default};
