import{_ as e,o as a,a as l,b as i}from"./app.DKoEZOcr.js";const p=JSON.parse('{"title":"","description":"","frontmatter":{"breadcrumbs":[{"text":"Ascend C API","link":"/api/api_list"},{"text":"SIMD API","link":"/api/SIMD-API/SIMD-API"},{"text":"高阶API","link":"/api/SIMD-API/adv_api/adv_api"},{"text":"HCCL通信类","link":"/api/SIMD-API/adv_api/HCCL_communication/HCCL_communication"},{"text":"HCCL Tiling侧接口","link":"/api/SIMD-API/adv_api/HCCL_communication/HCCL_Tiling/HCCL_Tiling"},{"text":"v2版本TilingData（废弃）","link":"/api/SIMD-API/adv_api/HCCL_communication/HCCL_Tiling/v2_TilingData_deprecated"}]},"headers":[],"relativePath":"api/SIMD-API/adv_api/HCCL_communication/HCCL_Tiling/v2_TilingData_deprecated.md","filePath":"api/SIMD-API/adv_api/HCCL_communication/HCCL_Tiling/v2_TilingData_deprecated.md","outlineHeaders":[{"level":2,"title":"功能说明","slug":"功能说明","link":"#功能说明"},{"level":2,"title":"参数说明","slug":"参数说明","link":"#参数说明"},{"level":2,"title":"约束说明","slug":"约束说明","link":"#约束说明"},{"level":2,"title":"调用示例","slug":"调用示例","link":"#调用示例"}],"lastUpdated":1785895910000}'),n={name:"api/SIMD-API/adv_api/HCCL_communication/HCCL_Tiling/v2_TilingData_deprecated.md"};function o(r,t,d,c,g,s){return a(),l("div",null,[...t[0]||(t[0]=[i(`<div><article class="markdown-body"><h1>v2版本TilingData（废弃）</h1><div class="callout callout-note"><p class="callout-title"><svg class="callout-icon" viewBox="0 0 16 16" width="16" height="16"><path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8Zm8-6.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13ZM6.5 7.75A.75.75 0 0 1 7.25 7h1a.75.75 0 0 1 .75.75v2.75h.25a.75.75 0 0 1 0 1.5h-2a.75.75 0 0 1 0-1.5h.25v-2h-.25a.75.75 0 0 1-.75-.75ZM8 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"></path></svg>说明</p><p>该结构体废弃，并将在后续版本移除，请不要使用该结构体。无需直接对该结构体中的成员进行设置，统一使用HCCL Tiling提供的接口设置即可。</p></div><h2 id="功能说明">功能说明<a class="header-anchor" href="#功能说明">​</a></h2><p>AI CPU启动下发通信任务前，需获取固定的通信配置，如<a href="#table4835205712588">表1</a>所示。在算子实现中，由Tiling组装通信配置项，通过配置固定参数和固定参数顺序的Tiling Data，将通信配置信息在调用AI CPU通信接口时传递给AI CPU。</p><h2 id="参数说明">参数说明<a class="header-anchor" href="#参数说明">​</a></h2><p><strong>表1</strong> v2版本HCCL TilingData参数说明</p><p><span id="table4835205712588"></span></p><table><thead><tr><th>参数名</th><th>描述</th></tr></thead><tbody><tr><td>version</td><td>uint32_t类型。用于区分TilingData版本。<br><br>v2版本的TilingData结构体中，version字段仅支持取值为2。<br><br>注意：该字段在v2版本TilingData中的位置，同v1版本的preparePosition字段。当该字段取值为2时，为v2版本的结构体，当取值为1时，为v1版本的结构体，请使用<a href="v1_TilingData_deprecated.html#table4835205712588">Mc2Msg结构体</a>。</td></tr><tr><td>mc2HcommCnt</td><td>uint32_t类型。表示各通信域中通信任务总个数。当前该参数支持的最大取值为3。</td></tr><tr><td>serverCfg</td><td><a href="#table96371578575">Mc2ServerCfg</a>类型。集合通信server端通用参数配置。</td></tr><tr><td>hcom</td><td><a href="#table13131010011">Mc2HcommCfg</a>类型。各通信域中每个通信任务的参数配置。在通信算子TilingData的定义中，根据各通信域中通信任务总个数，共需要定义mc2HcommCnt个Mc2HcommCfg结构体。例如：mc2HcommCnt=2，则需要依次定义2个<a href="#table13131010011">Mc2HcommCfg</a>类型的参数，自定义参数名，比如hcom1、hcom2。</td></tr></tbody></table><p><a id="table96371578575"></a><strong>表2</strong> Mc2ServerCfg结构体说明</p><table><thead><tr><th>参数名</th><th>描述</th></tr></thead><tbody><tr><td>version</td><td>预留字段，不需要配置。</td></tr><tr><td>debugMode</td><td>预留字段，不需要配置。</td></tr><tr><td>sendArgIndex</td><td>预留字段，不需要配置。</td></tr><tr><td>recvArgIndex</td><td>预留字段，不需要配置。</td></tr><tr><td>commOutArgIndex</td><td>预留字段，不需要配置。</td></tr><tr><td>reserved</td><td>预留字段，不需要配置。</td></tr></tbody></table><p><a id="table13131010011"></a><strong>表3</strong> Mc2HcommCfg结构体说明</p><table><thead><tr><th>参数名</th><th>描述</th></tr></thead><tbody><tr><td>skipLocalRankCopy</td><td>预留字段，不需要配置。</td></tr><tr><td>skipBufferWindowCopy</td><td>预留字段，不需要配置。</td></tr><tr><td>stepSize</td><td>预留字段，不需要配置。</td></tr><tr><td>reserved</td><td>预留字段，不需要配置。</td></tr><tr><td>groupName</td><td>当前通信任务所在的通信域。char*类型，支持最大长度128。</td></tr><tr><td>algConfig</td><td>通信算法配置。char*类型，支持最大长度128。<br><br>当前支持的取值为：<br>&quot;AllGather=level0:doublering&quot;：AllGather通信任务。<br>&quot;ReduceScatter=level0:doublering&quot;：ReduceScatter通信任务。<br>&quot;AlltoAll=level0:fullmesh;level1:pairwise&quot;：AlltoAllV通信任务。</td></tr><tr><td>opType</td><td>表示通信任务类型。uint32_t类型，取值详见<a href="HCCL_Tiling_constructor.html#table2469980529">HcclCMDType</a>参数说明。</td></tr><tr><td>reduceType</td><td>归约操作类型，仅对有归约操作的通信任务生效。uint32_t类型，取值详见<a href="../HCCL_Kernel/HCCL_usage.html#table2469980529">HcclReduceOp</a>参数说明。</td></tr></tbody></table><h2 id="约束说明">约束说明<a class="header-anchor" href="#约束说明">​</a></h2><ul><li>如果需要使用v2版本的Tiling结构体，必须设置Tiling结构体的第一个参数version=2。</li><li>算子的Tiling Data结构需要完整包含<a href="#table4835205712588">v2版本HCCL TilingData参数</a>，其中各参数需要严格按照对应参数的结构来定义。</li></ul><h2 id="调用示例">调用示例<a class="header-anchor" href="#调用示例">​</a></h2><p>如下为自定义算子AlltoallvDoubleCommCustom的算子原型。该算子有两对输入输出，其中x1、y1是ep通信域的AlltoAllV任务的输入输出，x2、y2是tp通信域的AlltoAllV任务的输入输出。</p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>namespace ops {
class AlltoallvDoubleCommCustom : public OpDef {
public:
    explicit AlltoallvDoubleCommCustom(const char* name) : OpDef(name)
    {
        this-&gt;Input(&quot;x1&quot;)
            .ParamType(REQUIRED)
            .DataType({ge::DT_FLOAT16, ge::DT_BF16})
            .Format({ge::FORMAT_ND, ge::FORMAT_ND})
            .UnknownShapeFormat({ge::FORMAT_ND, ge::FORMAT_ND});
        this-&gt;Input(&quot;x2&quot;)
            .ParamType(REQUIRED)
            .DataType({ge::DT_FLOAT16, ge::DT_BF16})
            .Format({ge::FORMAT_ND, ge::FORMAT_ND})
            .UnknownShapeFormat({ge::FORMAT_ND, ge::FORMAT_ND})
            .IgnoreContiguous();
        this-&gt;Output(&quot;y1&quot;)
            .ParamType(REQUIRED)
            .DataType({ge::DT_FLOAT16, ge::DT_BF16})
            .Format({ge::FORMAT_ND, ge::FORMAT_ND})
            .UnknownShapeFormat({ge::FORMAT_ND, ge::FORMAT_ND});
        this-&gt;Output(&quot;y2&quot;)
            .ParamType(REQUIRED)
            .DataType({ge::DT_FLOAT16, ge::DT_BF16})
            .Format({ge::FORMAT_ND, ge::FORMAT_ND})
            .UnknownShapeFormat({ge::FORMAT_ND, ge::FORMAT_ND});
        this-&gt;Attr(&quot;group_ep&quot;).AttrType(REQUIRED).String();
        this-&gt;Attr(&quot;group_tp&quot;).AttrType(REQUIRED).String();
        this-&gt;Attr(&quot;ep_world_size&quot;).AttrType(REQUIRED).Int();
        this-&gt;Attr(&quot;tp_world_size&quot;).AttrType(REQUIRED).Int();
        this-&gt;AICore().SetTiling(optiling::AlltoAllVDoubleCommCustomTilingFunc);
        this-&gt;AICore().AddConfig(&quot;ascendxxx&quot;); // ascendxxx请修改为对应的AI处理器型号。
        this-&gt;MC2().HcclGroup({&quot;group_ep&quot;, &quot;group_tp&quot;});
    }
};
OP_ADD(AlltoallvDoubleCommCustom);
} // namespace ops
</code></pre></div><p>如下为该自定义算子Tiling Data声明和实现。</p><p>该自定义算子Tiling Data的声明中：首先定义version字段，设置为2，表明为v2版本的通信算子Tiling结构体。其次，定义mc2HcommCnt字段，本例AlltoallvDoubleCommCustom算子的kernel实现中，共2个AlltoAllV通信任务，该参数取值为2。然后定义server通用参数配置，Mc2ServerCfg。最后，定义2个Mc2HcommCfg结构体，表示各通信域中的每个通信任务参数配置。</p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>// HCCL TilingData声明
BEGIN_TILING_DATA_DEF(AlltoallvDoubleCommCustomTilingData)
    TILING_DATA_FIELD_DEF(uint32_t, version); // HCCL tiling结构体的版本，设为2
    // 各通信域中的通信算子总个数，当前最多支持3个。AlltoallvDoubleCommCustom算子kernel实现中每个通信域中均用了1个AlltoAllV，因此设为2
    TILING_DATA_FIELD_DEF(uint32_t, mc2HcommCnt);
    TILING_DATA_FIELD_DEF_STRUCT(Mc2ServerCfg, serverCfg); // server通用参数配置，融合算子级
    // 各通信域中的每个通信任务参数配置，算子级，共有mc2HcommCnt个Mc2HcommCfg
    TILING_DATA_FIELD_DEF_STRUCT(Mc2HcommCfg, hcom1); 
    TILING_DATA_FIELD_DEF_STRUCT(Mc2HcommCfg, hcom2);
END_TILING_DATA_DEF;

REGISTER_TILING_DATA_CLASS(AlltoallvDoubleCommCustom, AlltoallvDoubleCommCustomTilingData);
</code></pre></div><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>// HCCL TilingData配置片段
static ge::graphStatus AlltoAllVDoubleCommCustomTilingFunc(gert::TilingContext* context)
{
    char* group1 = const_cast&lt;char*&gt;(context-&gt;GetAttrs()-&gt;GetAttrPointer&lt;char&gt;(0));
    char* group2 = const_cast&lt;char*&gt;(context-&gt;GetAttrs()-&gt;GetAttrPointer&lt;char&gt;(1));

    AlltoallvDoubleCommCustomTilingData tiling;
    tiling.set_version(2);
    tiling.set_mc2HcommCnt(2);
    tiling.serverCfg.set_debugMode(0);

    tiling.hcom1.set_opType(8);
    tiling.hcom1.set_reduceType(4);
    tiling.hcom1.set_groupName(group1);
    tiling.hcom1.set_algConfig(&quot;AlltoAll=level0:fullmesh;level1:pairwise&quot;);

    tiling.hcom2.set_opType(8);
    tiling.hcom2.set_reduceType(4);
    tiling.hcom2.set_groupName(group2);
    tiling.hcom2.set_algConfig(&quot;AlltoAll=level0:fullmesh;level1:pairwise&quot;);

    tiling.SaveToBuffer(context-&gt;GetRawTilingData()-&gt;GetData(), context-&gt;GetRawTilingData()-&gt;GetCapacity());
    context-&gt;GetRawTilingData()-&gt;SetDataSize(tiling.GetDataSize());
    return ge::GRAPH_SUCCESS;
}
</code></pre></div></article></div>`,1)])])}const m=e(n,[["render",o]]);export{p as __pageData,m as default};
