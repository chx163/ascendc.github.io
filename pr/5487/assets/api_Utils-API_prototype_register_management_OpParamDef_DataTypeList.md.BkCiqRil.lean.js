import{_ as e,o as n,a as c,c as t,d as a}from"./app.DKoEZOcr.js";const T=JSON.parse('{"title":"","description":"","frontmatter":{"breadcrumbs":[{"text":"Ascend C API","link":"/api/api_list"},{"text":"Utils API","link":"/api/Utils-API/Utils-API"},{"text":"原型注册与管理","link":"/api/Utils-API/prototype_register_management/prototype_register_management"},{"text":"OpParamDef","link":"/api/Utils-API/prototype_register_management/OpParamDef/OpParamDef"},{"text":"DataTypeList","link":"/api/Utils-API/prototype_register_management/OpParamDef/DataTypeList"}]},"headers":[],"relativePath":"api/Utils-API/prototype_register_management/OpParamDef/DataTypeList.md","filePath":"api/Utils-API/prototype_register_management/OpParamDef/DataTypeList.md","outlineHeaders":[{"level":2,"title":"功能说明","slug":"功能说明","link":"#功能说明"},{"level":2,"title":"函数原型","slug":"函数原型","link":"#函数原型"},{"level":2,"title":"参数说明","slug":"参数说明","link":"#参数说明"},{"level":2,"title":"返回值说明","slug":"返回值说明","link":"#返回值说明"},{"level":2,"title":"约束说明","slug":"约束说明","link":"#约束说明"},{"level":2,"title":"调用示例","slug":"调用示例","link":"#调用示例"}],"lastUpdated":1785986301000}'),p={name:"api/Utils-API/prototype_register_management/OpParamDef/DataTypeList.md"};function i(h,_,s,o,l,d){return n(),c("div",null,[..._[0]||(_[0]=[t("div",null,[t("article",{class:"markdown-body"},[t("h1",null,[a("DataTypeList"),t("span",{id:"ZH-CN_TOPIC_0000002078492700"})]),t("h2",{id:"功能说明"},[a("功能说明"),t("span",{id:"zh-cn_topic_0000001991854801_zh-cn_topic_0000001526115138_zh-cn_topic_0000001525424352_section36583473819"}),t("a",{class:"header-anchor",href:"#功能说明"},"​")]),t("p",null,"定义算子参数数据类型。如果某个输入/输出支持的数据类型支持和其他所有输入/输出支持的数据类型、数据格式组合使用，可以使用该接口定义数据类型。"),t("p",null,[a("使用"),t("a",{href:"DataType.html"},"DataType"),a("配置数据类型时，算子参数的数据类型和格式必须通过显式组合配置，每个组合包含完整的输入/输出数据类型与数据格式的对应关系。如下的示例中表示：当输入x和y数据类型为DT_FLOAT16时，对应的输出z数据类型也为DT_FLOAT16，支持的数据格式要求为FORMAT_ND。")]),t("div",{class:"code-block"},[t("div",{class:"code-header"},[t("span",{class:"lang-label"},"Text"),t("button",{class:"copy-btn",title:"复制代码"},[t("svg",{width:"16",height:"16",viewBox:"0 0 16 16"},[t("path",{d:"M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"}),t("path",{d:"M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"})])])]),t("pre",{class:"highlight"},[t("code",null,`class AddCustom : public OpDef {
public:
    AddCustom(const char* name) : OpDef(name)
    {
        this->Input("x")
            .ParamType(REQUIRED)
            .DataType({ge::DT_FLOAT16, ge::DT_FLOAT, ge::DT_INT32})
            .Format({ge::FORMAT_ND, ge::FORMAT_ND, ge::FORMAT_ND});
        this->Input("y")
            .ParamType(REQUIRED)
            .DataType({ge::DT_FLOAT16, ge::DT_FLOAT, ge::DT_INT32})
            .Format({ge::FORMAT_ND, ge::FORMAT_ND, ge::FORMAT_ND});
        this->Output("z")
            .ParamType(REQUIRED)
            .DataType({ge::DT_FLOAT16, ge::DT_FLOAT, ge::DT_INT32})
            .Format({ge::FORMAT_ND, ge::FORMAT_ND, ge::FORMAT_ND});
        ...
    }
};
`)])]),t("p",null,"如果某个输入/输出支持的数据类型支持和其他所有输入/输出支持的数据类型、数据格式组合使用，使用DataType接口需要写成如下的格式，表示当输入x为DT_FLOAT16时，支持输入y和输入z的所有数据类型、数据格式组合。"),t("div",{class:"code-block"},[t("div",{class:"code-header"},[t("span",{class:"lang-label"},"Text"),t("button",{class:"copy-btn",title:"复制代码"},[t("svg",{width:"16",height:"16",viewBox:"0 0 16 16"},[t("path",{d:"M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"}),t("path",{d:"M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"})])])]),t("pre",{class:"highlight"},[t("code",null,`class XxxCustom : public OpDef {
public:
    XxxCustom(const char* name) : OpDef(name)
    {
        this->Input("x")
            .ParamType(REQUIRED)
            .DataType({ge::DT_FLOAT16, ge::DT_FLOAT16, ge::DT_FLOAT16})
            .Format({ge::FORMAT_ND, ge::FORMAT_ND, ge::FORMAT_ND});
        this->Input("y")
            .ParamType(REQUIRED)
            .DataType({ge::DT_FLOAT16, ge::DT_FLOAT, ge::DT_INT32})
            .Format({ge::FORMAT_ND, ge::FORMAT_ND, ge::FORMAT_ND});
        this->Output("z")
            .ParamType(REQUIRED)
            .DataType({ge::DT_FLOAT16, ge::DT_FLOAT, ge::DT_INT32})
            .Format({ge::FORMAT_ND, ge::FORMAT_ND, ge::FORMAT_ND});
        ...
    }
};
`)])]),t("p",null,"此时可以通过DataTypeList指定数据类型，无需重复列出，例如："),t("div",{class:"code-block"},[t("div",{class:"code-header"},[t("span",{class:"lang-label"},"Text"),t("button",{class:"copy-btn",title:"复制代码"},[t("svg",{width:"16",height:"16",viewBox:"0 0 16 16"},[t("path",{d:"M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"}),t("path",{d:"M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"})])])]),t("pre",{class:"highlight"},[t("code",null,`class XxxCustom : public OpDef {
public:
    XxxCustom(const char* name) : OpDef(name)
    {
        this->Input("x")
            .ParamType(REQUIRED)
            .DataTypeList({ge::DT_FLOAT16})
            .Format({ge::FORMAT_ND, ge::FORMAT_ND, ge::FORMAT_ND});
        this->Input("y")
            .ParamType(REQUIRED)
            .DataType({ge::DT_FLOAT16, ge::DT_FLOAT, ge::DT_INT32})
            .Format({ge::FORMAT_ND, ge::FORMAT_ND, ge::FORMAT_ND});
        this->Output("z")
            .ParamType(REQUIRED)
            .DataType({ge::DT_FLOAT16, ge::DT_FLOAT, ge::DT_INT32})
            .Format({ge::FORMAT_ND, ge::FORMAT_ND, ge::FORMAT_ND});
        ...
    }
};
`)])]),t("h2",{id:"函数原型"},[a("函数原型"),t("span",{id:"zh-cn_topic_0000001991854801_zh-cn_topic_0000001526115138_zh-cn_topic_0000001525424352_section13230182415108"}),t("a",{class:"header-anchor",href:"#函数原型"},"​")]),t("div",{class:"code-block"},[t("div",{class:"code-header"},[t("span",{class:"lang-label"},"Text"),t("button",{class:"copy-btn",title:"复制代码"},[t("svg",{width:"16",height:"16",viewBox:"0 0 16 16"},[t("path",{d:"M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"}),t("path",{d:"M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"})])])]),t("pre",{class:"highlight"},[t("code",null,`OpParamDef &DataTypeList(std::vector<ge::DataType> types)
`)])]),t("h2",{id:"参数说明"},[a("参数说明"),t("span",{id:"zh-cn_topic_0000001991854801_zh-cn_topic_0000001526115138_zh-cn_topic_0000001525424352_section75395119104"}),t("a",{class:"header-anchor",href:"#参数说明"},"​")]),t("p",null,[t("span",{id:"zh-cn_topic_0000001991854801_zh-cn_topic_0000001526115138_zh-cn_topic_0000001575944081_table111938719446"})]),t("table",null,[t("thead",{align:"left"},[t("tr",{id:"zh-cn_topic_0000001991854801_zh-cn_topic_0000001526115138_zh-cn_topic_0000001575944081_row6223476444"},[t("th",{class:"cellrowborder",valign:"top",width:"17.22%",id:"mcps1.1.4.1.1"},[t("p",{id:"zh-cn_topic_0000001991854801_zh-cn_topic_0000001526115138_zh-cn_topic_0000001575944081_p10223674448"},[t("span",{id:"zh-cn_topic_0000001991854801_zh-cn_topic_0000001526115138_zh-cn_topic_0000001575944081_p10223674448"}),t("span",{id:"zh-cn_topic_0000001991854801_zh-cn_topic_0000001526115138_zh-cn_topic_0000001575944081_p10223674448"}),a("参数")])]),t("th",{class:"cellrowborder",valign:"top",width:"15.340000000000002%",id:"mcps1.1.4.1.2"},[t("p",{id:"zh-cn_topic_0000001991854801_zh-cn_topic_0000001526115138_zh-cn_topic_0000001575944081_p645511218169"},[t("span",{id:"zh-cn_topic_0000001991854801_zh-cn_topic_0000001526115138_zh-cn_topic_0000001575944081_p645511218169"}),t("span",{id:"zh-cn_topic_0000001991854801_zh-cn_topic_0000001526115138_zh-cn_topic_0000001575944081_p645511218169"}),a("输入/输出")])]),t("th",{class:"cellrowborder",valign:"top",width:"67.44%",id:"mcps1.1.4.1.3"},[t("p",{id:"zh-cn_topic_0000001991854801_zh-cn_topic_0000001526115138_zh-cn_topic_0000001575944081_p1922337124411"},[t("span",{id:"zh-cn_topic_0000001991854801_zh-cn_topic_0000001526115138_zh-cn_topic_0000001575944081_p1922337124411"}),t("span",{id:"zh-cn_topic_0000001991854801_zh-cn_topic_0000001526115138_zh-cn_topic_0000001575944081_p1922337124411"}),a("说明")])])])]),t("tbody",null,[t("tr",{id:"zh-cn_topic_0000001991854801_zh-cn_topic_0000001526115138_zh-cn_topic_0000001575944081_row152234713443"},[t("td",{class:"cellrowborder",valign:"top",width:"17.22%",headers:"mcps1.1.4.1.1 "},[t("p",{id:"zh-cn_topic_0000001991854801_zh-cn_topic_0000001526115138_zh-cn_topic_0000001575944081_p318615392613"},[t("span",{id:"zh-cn_topic_0000001991854801_zh-cn_topic_0000001526115138_zh-cn_topic_0000001575944081_p318615392613"}),t("span",{id:"zh-cn_topic_0000001991854801_zh-cn_topic_0000001526115138_zh-cn_topic_0000001575944081_p318615392613"}),t("strong",{id:"zh-cn_topic_0000001991854801_b1871392631720"},[t("span",{id:"zh-cn_topic_0000001991854801_b1871392631720"}),t("span",{id:"zh-cn_topic_0000001991854801_b1871392631720"}),a("types")])])]),t("td",{class:"cellrowborder",valign:"top",width:"15.340000000000002%",headers:"mcps1.1.4.1.2 "},[t("p",{id:"zh-cn_topic_0000001991854801_zh-cn_topic_0000001526115138_zh-cn_topic_0000001575944081_p320343694214"},[t("span",{id:"zh-cn_topic_0000001991854801_zh-cn_topic_0000001526115138_zh-cn_topic_0000001575944081_p320343694214"}),t("span",{id:"zh-cn_topic_0000001991854801_zh-cn_topic_0000001526115138_zh-cn_topic_0000001575944081_p320343694214"}),a("输入")])]),t("td",{class:"cellrowborder",valign:"top",width:"67.44%",headers:"mcps1.1.4.1.3 "},[t("p",{id:"zh-cn_topic_0000001991854801_zh-cn_topic_0000001526115138_p096733515614"},[t("span",{id:"zh-cn_topic_0000001991854801_zh-cn_topic_0000001526115138_p096733515614"}),t("span",{id:"zh-cn_topic_0000001991854801_zh-cn_topic_0000001526115138_p096733515614"}),a("算子参数数据类型。")])])])])]),t("h2",{id:"返回值说明"},[a("返回值说明"),t("span",{id:"zh-cn_topic_0000001991854801_zh-cn_topic_0000001526115138_zh-cn_topic_0000001525424352_section25791320141317"}),t("a",{class:"header-anchor",href:"#返回值说明"},"​")]),t("p",null,[a("OpParamDef算子定义，OpParamDef请参考"),t("a",{href:"OpParamDef.html"},"OpParamDef"),a("。")]),t("h2",{id:"约束说明"},[a("约束说明"),t("span",{id:"zh-cn_topic_0000001991854801_zh-cn_topic_0000001526115138_zh-cn_topic_0000001525424352_section19165124931511"}),t("a",{class:"header-anchor",href:"#约束说明"},"​")]),t("ul",null,[t("li",null,"同一输入/输出不能同时设置DataType和DataTypeList。"),t("li",null,[a("本接口不支持和"),t("a",{href:"UnknownShapeFormat_deprecated.html"},"UnknownShapeFormat"),a("同时使用。")])]),t("h2",{id:"调用示例"},[a("调用示例"),t("span",{id:"zh-cn_topic_0000001991854801_zh-cn_topic_0000001526115138_zh-cn_topic_0000001575944081_section320753512363"}),t("a",{class:"header-anchor",href:"#调用示例"},"​")]),t("div",{class:"code-block"},[t("div",{class:"code-header"},[t("span",{class:"lang-label"},"Text"),t("button",{class:"copy-btn",title:"复制代码"},[t("svg",{width:"16",height:"16",viewBox:"0 0 16 16"},[t("path",{d:"M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"}),t("path",{d:"M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"})])])]),t("pre",{class:"highlight"},[t("code",null,`class AddCustom : public OpDef {
public:
    AddCustom(const char* name) : OpDef(name)
    {
        this->Input("x")
            .ParamType(REQUIRED)
            .DataTypeList({ge::DT_FLOAT})
            .Format({ge::FORMAT_ND, ge::FORMAT_NCHW});
        this->Input("x1")
             ......
    }
};
`)])])])],-1)])])}const D=e(p,[["render",i]]);export{T as __pageData,D as default};
