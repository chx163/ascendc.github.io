import{_ as e,o as _,a,c as t,d as n}from"./app.C41L12d5.js";const z=JSON.parse('{"title":"","description":"","frontmatter":{"breadcrumbs":[{"text":"Ascend C API","link":"/api/api_list"},{"text":"Utils API","link":"/api/Utils-API/Utils-API"},{"text":"原型注册与管理","link":"/api/Utils-API/prototype_register_management/prototype_register_management"},{"text":"OpParamDef","link":"/api/Utils-API/prototype_register_management/OpParamDef/OpParamDef"},{"text":"Version","link":"/api/Utils-API/prototype_register_management/OpParamDef/Version"}]},"headers":[],"relativePath":"api/Utils-API/prototype_register_management/OpParamDef/Version.md","filePath":"api/Utils-API/prototype_register_management/OpParamDef/Version.md","outlineHeaders":[{"level":2,"title":"功能说明","slug":"功能说明","link":"#功能说明"},{"level":2,"title":"函数原型","slug":"函数原型","link":"#函数原型"},{"level":2,"title":"参数说明","slug":"参数说明","link":"#参数说明"},{"level":2,"title":"返回值说明","slug":"返回值说明","link":"#返回值说明"},{"level":2,"title":"约束说明","slug":"约束说明","link":"#约束说明"}],"lastUpdated":1785997882000}'),i={name:"api/Utils-API/prototype_register_management/OpParamDef/Version.md"};function o(p,c,s,l,r,h){return _(),a("div",null,[...c[0]||(c[0]=[t("div",null,[t("article",{class:"markdown-body"},[t("h1",null,[n("Version"),t("span",{id:"ZH-CN_TOPIC_0000002114052041"})]),t("h2",{id:"功能说明"},[n("功能说明"),t("span",{id:"zh-cn_topic_0000001797014949_zh-cn_topic_0000001526594958_zh-cn_topic_0000001525424352_section36583473819"}),t("a",{class:"header-anchor",href:"#功能说明"},"​")]),t("p",null,"算子编译部署后，会自动生成单算子API(aclnnxxx)接口，接口中的输入输出参数和算子原型定义中保持一致。"),t("p",null,[n("新增可选输入时，为了保持原有单算子API(aclnnxxx)接口的兼容性，可以通过Version接口配置aclnn接口的版本号，版本号需要从1开始配，且应该连续配置（和"),t("a",{href:"../OpAttrDef/OpAttrDef_functions.html"},"可选属性"),n("统一编号）。配置后，自动生成的aclnn接口会携带版本号。高版本号的接口会包含低版本号接口的所有参数。如下样例所示的原型定义：")]),t("div",{class:"code-block"},[t("div",{class:"code-header"},[t("span",{class:"lang-label"},"Text"),t("button",{class:"copy-btn",title:"复制代码"},[t("svg",{width:"16",height:"16",viewBox:"0 0 16 16"},[t("path",{d:"M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"}),t("path",{d:"M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"})])])]),t("pre",{class:"highlight"},[t("code",null,`class AddCustom : public OpDef {
   public:
    explicit AddCustom(const char* name) : OpDef(name) {
        this->Input("x")
            .ParamType(DYNAMIC)
            .DataType({ge::DT_FLOAT16, ge::DT_FLOAT})
            .Format({ge::FORMAT_ND, ge::FORMAT_ND});
        this->Input("x1")
            .ParamType(OPTIONAL)
            .Version(1)
            .DataType({ge::DT_FLOAT16, ge::DT_FLOAT})
            .Format({ge::FORMAT_ND, ge::FORMAT_ND});
        this->Input("x2")
            .ParamType(OPTIONAL)
            .Version(2)
            .DataType({ge::DT_FLOAT16, ge::DT_FLOAT})
            .Format({ge::FORMAT_ND, ge::FORMAT_ND});
        this->Output("y")
            .ParamType(DYNAMIC)
            .DataType({ge::DT_FLOAT16, ge::DT_FLOAT})
            .Format({ge::FORMAT_ND, ge::FORMAT_ND});
        this->AICore().AddConfig("xxx");
    }
};
OP_ADD(AddCustom);
`)])]),t("p",null,"会自动生成3个版本的aclnn接口，定义如下："),t("div",{class:"code-block"},[t("div",{class:"code-header"},[t("span",{class:"lang-label"},"Text"),t("button",{class:"copy-btn",title:"复制代码"},[t("svg",{width:"16",height:"16",viewBox:"0 0 16 16"},[t("path",{d:"M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"}),t("path",{d:"M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"})])])]),t("pre",{class:"highlight"},[t("code",null,`aclnnStatus aclnnAddCustomGetWorkspaceSize(
    const aclTensorList *x,
    const aclTensorList *out,
    uint64_t *workspaceSize,
    aclOpExecutor **executor);
aclnnStatus aclnnAddCustom(
    void *workspace,
    uint64_t workspaceSize,
    aclOpExecutor *executor,
    const aclrtStream stream);

aclnnStatus aclnnAddCustomV1GetWorkspaceSize(
    const aclTensorList *x,
    const aclTensor *x1Optional,
    const aclTensorList *out,
    uint64_t *workspaceSize,
    aclOpExecutor **executor);
aclnnStatus aclnnAddCustomV1(
    void *workspace,
    uint64_t workspaceSize,
    aclOpExecutor *executor,
    const aclrtStream stream);

aclnnStatus aclnnAddCustomV2GetWorkspaceSize(
    const aclTensorList *x,
    const aclTensor *x1Optional,
    const aclTensor *x2Optional,
    const aclTensorList *out,
    uint64_t *workspaceSize,
    aclOpExecutor **executor);
aclnnStatus aclnnAddCustomV2(
    void *workspace,
    uint64_t workspaceSize,
    aclOpExecutor *executor,
    const aclrtStream stream);
`)])]),t("h2",{id:"函数原型"},[n("函数原型"),t("span",{id:"zh-cn_topic_0000001797014949_zh-cn_topic_0000001526594958_zh-cn_topic_0000001525424352_section13230182415108"}),t("a",{class:"header-anchor",href:"#函数原型"},"​")]),t("div",{class:"code-block"},[t("div",{class:"code-header"},[t("span",{class:"lang-label"},"Text"),t("button",{class:"copy-btn",title:"复制代码"},[t("svg",{width:"16",height:"16",viewBox:"0 0 16 16"},[t("path",{d:"M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"}),t("path",{d:"M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"})])])]),t("pre",{class:"highlight"},[t("code",null,`OpParamDef &Version(uint32_t version)
`)])]),t("h2",{id:"参数说明"},[n("参数说明"),t("span",{id:"zh-cn_topic_0000001797014949_zh-cn_topic_0000001526594958_zh-cn_topic_0000001525424352_section75395119104"}),t("a",{class:"header-anchor",href:"#参数说明"},"​")]),t("p",null,[t("span",{id:"zh-cn_topic_0000001797014949_zh-cn_topic_0000001526594958_zh-cn_topic_0000001575944081_table111938719446"})]),t("table",null,[t("thead",{align:"left"},[t("tr",{id:"zh-cn_topic_0000001797014949_zh-cn_topic_0000001526594958_zh-cn_topic_0000001575944081_row6223476444"},[t("th",{class:"cellrowborder",valign:"top",width:"17.22%",id:"mcps1.1.4.1.1"},[t("p",{id:"zh-cn_topic_0000001797014949_zh-cn_topic_0000001526594958_zh-cn_topic_0000001575944081_p10223674448"},[t("span",{id:"zh-cn_topic_0000001797014949_zh-cn_topic_0000001526594958_zh-cn_topic_0000001575944081_p10223674448"}),t("span",{id:"zh-cn_topic_0000001797014949_zh-cn_topic_0000001526594958_zh-cn_topic_0000001575944081_p10223674448"}),n("参数")])]),t("th",{class:"cellrowborder",valign:"top",width:"15.340000000000002%",id:"mcps1.1.4.1.2"},[t("p",{id:"zh-cn_topic_0000001797014949_zh-cn_topic_0000001526594958_zh-cn_topic_0000001575944081_p645511218169"},[t("span",{id:"zh-cn_topic_0000001797014949_zh-cn_topic_0000001526594958_zh-cn_topic_0000001575944081_p645511218169"}),t("span",{id:"zh-cn_topic_0000001797014949_zh-cn_topic_0000001526594958_zh-cn_topic_0000001575944081_p645511218169"}),n("输入/输出")])]),t("th",{class:"cellrowborder",valign:"top",width:"67.44%",id:"mcps1.1.4.1.3"},[t("p",{id:"zh-cn_topic_0000001797014949_zh-cn_topic_0000001526594958_zh-cn_topic_0000001575944081_p1922337124411"},[t("span",{id:"zh-cn_topic_0000001797014949_zh-cn_topic_0000001526594958_zh-cn_topic_0000001575944081_p1922337124411"}),t("span",{id:"zh-cn_topic_0000001797014949_zh-cn_topic_0000001526594958_zh-cn_topic_0000001575944081_p1922337124411"}),n("说明")])])])]),t("tbody",null,[t("tr",{id:"zh-cn_topic_0000001797014949_zh-cn_topic_0000001526594958_zh-cn_topic_0000001575944081_row152234713443"},[t("td",{class:"cellrowborder",valign:"top",width:"17.22%",headers:"mcps1.1.4.1.1 "},[t("p",{id:"zh-cn_topic_0000001797014949_zh-cn_topic_0000001526594958_zh-cn_topic_0000001575944081_p318615392613"},[t("span",{id:"zh-cn_topic_0000001797014949_zh-cn_topic_0000001526594958_zh-cn_topic_0000001575944081_p318615392613"}),t("span",{id:"zh-cn_topic_0000001797014949_zh-cn_topic_0000001526594958_zh-cn_topic_0000001575944081_p318615392613"}),t("strong",{id:"zh-cn_topic_0000001797014949_b97895303465"},[t("span",{id:"zh-cn_topic_0000001797014949_b97895303465"}),t("span",{id:"zh-cn_topic_0000001797014949_b97895303465"}),n("version")])])]),t("td",{class:"cellrowborder",valign:"top",width:"15.340000000000002%",headers:"mcps1.1.4.1.2 "},[t("p",{id:"zh-cn_topic_0000001797014949_zh-cn_topic_0000001526594958_zh-cn_topic_0000001575944081_p320343694214"},[t("span",{id:"zh-cn_topic_0000001797014949_zh-cn_topic_0000001526594958_zh-cn_topic_0000001575944081_p320343694214"}),t("span",{id:"zh-cn_topic_0000001797014949_zh-cn_topic_0000001526594958_zh-cn_topic_0000001575944081_p320343694214"}),n("输入")])]),t("td",{class:"cellrowborder",valign:"top",width:"67.44%",headers:"mcps1.1.4.1.3 "},[t("p",{id:"zh-cn_topic_0000001797014949_zh-cn_topic_0000001526594958_p096733515614"},[t("span",{id:"zh-cn_topic_0000001797014949_zh-cn_topic_0000001526594958_p096733515614"}),t("span",{id:"zh-cn_topic_0000001797014949_zh-cn_topic_0000001526594958_p096733515614"}),n("指定的版本号。")])])])])]),t("h2",{id:"返回值说明"},[n("返回值说明"),t("span",{id:"zh-cn_topic_0000001797014949_zh-cn_topic_0000001526594958_zh-cn_topic_0000001525424352_section25791320141317"}),t("a",{class:"header-anchor",href:"#返回值说明"},"​")]),t("p",null,[n("OpParamDef算子定义，OpParamDef请参考"),t("a",{href:"OpParamDef.html"},"OpParamDef"),n("。")]),t("h2",{id:"约束说明"},[n("约束说明"),t("span",{id:"zh-cn_topic_0000001797014949_zh-cn_topic_0000001526594958_zh-cn_topic_0000001525424352_section19165124931511"}),t("a",{class:"header-anchor",href:"#约束说明"},"​")]),t("p",null,"无")])],-1)])])}const m=e(i,[["render",o]]);export{z as __pageData,m as default};
