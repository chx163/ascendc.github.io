import{_ as t,o as a,a as _,c as i,d as n}from"./app.C41L12d5.js";const g=JSON.parse('{"title":"","description":"","frontmatter":{"breadcrumbs":[{"text":"Ascend C API","link":"/api/api_list"},{"text":"SIMD API","link":"/api/SIMD-API/SIMD-API"},{"text":"基础API","link":"/api/SIMD-API/basic_api/basic_api"},{"text":"Kernel Tiling","link":"/api/SIMD-API/basic_api/Kernel-Tiling/Kernel-Tiling"},{"text":"REGISTER_TILING_FOR_TILINGKEY","link":"/api/SIMD-API/basic_api/Kernel-Tiling/REGISTER_TILING_FOR_TILINGKEY"}]},"headers":[],"relativePath":"api/SIMD-API/basic_api/Kernel-Tiling/REGISTER_TILING_FOR_TILINGKEY.md","filePath":"api/SIMD-API/basic_api/Kernel-Tiling/REGISTER_TILING_FOR_TILINGKEY.md","outlineHeaders":[{"level":2,"title":"产品支持情况","slug":"产品支持情况","link":"#产品支持情况"},{"level":2,"title":"功能说明","slug":"功能说明","link":"#功能说明"},{"level":2,"title":"函数原型","slug":"函数原型","link":"#函数原型"},{"level":2,"title":"参数说明","slug":"参数说明","link":"#参数说明"},{"level":2,"title":"约束说明","slug":"约束说明","link":"#约束说明"},{"level":2,"title":"调用示例","slug":"调用示例","link":"#调用示例"}],"lastUpdated":1788159000000}'),e={name:"api/SIMD-API/basic_api/Kernel-Tiling/REGISTER_TILING_FOR_TILINGKEY.md"};function c(p,l,s,o,d,h){return a(),_("div",null,[...l[0]||(l[0]=[i("div",null,[i("article",{class:"markdown-body"},[i("h1",null,[n("REGISTER_TILING_FOR_TILINGKEY"),i("span",{id:"ZH-CN_TOPIC_0000002087702626"})]),i("h2",{id:"产品支持情况"},[n("产品支持情况"),i("span",{id:"section1550532418810"}),i("a",{class:"header-anchor",href:"#产品支持情况"},"​")]),i("div",{"data-filter":"950"},[i("ul",null,[i("li",null,"Ascend 950PR/Ascend 950DT：支持")])]),i("div",{"data-filter":"A3"},[i("ul",null,[i("li",null,"Atlas A3 训练系列产品/Atlas A3 推理系列产品：支持")])]),i("div",{"data-filter":"910b"},[i("ul",null,[i("li",null,"Atlas A2 训练系列产品/Atlas A2 推理系列产品：支持")])]),i("div",{"data-filter":"310b"},[i("ul",null,[i("li",null,"Atlas 200I/500 A2 推理产品：支持")])]),i("div",{"data-filter":"310p"},[i("ul",null,[i("li",null,"Atlas 推理系列产品AI Core：支持")])]),i("div",{"data-filter":"310p"},[i("ul",null,[i("li",null,"Atlas 推理系列产品Vector Core：支持")])]),i("div",{"data-filter":"910"},[i("ul",null,[i("li",null,"Atlas 训练系列产品：不支持")])]),i("h2",{id:"功能说明"},[n("功能说明"),i("span",{id:"zh-cn_topic_0000001526206862_section212607105720"}),i("a",{class:"header-anchor",href:"#功能说明"},"​")]),i("p",null,"用于在kernel侧注册与TilingKey相匹配的TilingData自定义结构体；该接口需提供一个逻辑表达式，逻辑表达式以字符串“TILING_KEY_VAR”代指实际TilingKey，表达TilingKey所满足的范围。"),i("h2",{id:"函数原型"},[n("函数原型"),i("span",{id:"zh-cn_topic_0000001526206862_section1630753514297"}),i("a",{class:"header-anchor",href:"#函数原型"},"​")]),i("div",{class:"code-block"},[i("div",{class:"code-header"},[i("span",{class:"lang-label"},"Text"),i("button",{class:"copy-btn",title:"复制代码"},[i("svg",{width:"16",height:"16",viewBox:"0 0 16 16"},[i("path",{d:"M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"}),i("path",{d:"M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"})])])]),i("pre",{class:"highlight"},[i("code",null,`REGISTER_TILING_FOR_TILINGKEY(EXPRESSION, TILING_STRUCT)
`)])]),i("h2",{id:"参数说明"},[n("参数说明"),i("span",{id:"zh-cn_topic_0000001526206862_section129451113125413"}),i("a",{class:"header-anchor",href:"#参数说明"},"​")]),i("p",null,[i("span",{id:"zh-cn_topic_0000001526206862_zh-cn_topic_0000001389783361_table111938719446"})]),i("table",null,[i("thead",{align:"left"},[i("tr",{id:"zh-cn_topic_0000001526206862_zh-cn_topic_0000001389783361_row6223476444"},[i("th",{class:"cellrowborder",valign:"top",width:"17.22%",id:"mcps1.1.4.1.1"},[i("p",{id:"zh-cn_topic_0000001526206862_zh-cn_topic_0000001389783361_p10223674448"},[i("span",{id:"zh-cn_topic_0000001526206862_zh-cn_topic_0000001389783361_p10223674448"}),i("span",{id:"zh-cn_topic_0000001526206862_zh-cn_topic_0000001389783361_p10223674448"}),n("参数")])]),i("th",{class:"cellrowborder",valign:"top",width:"15.340000000000002%",id:"mcps1.1.4.1.2"},[i("p",{id:"zh-cn_topic_0000001526206862_zh-cn_topic_0000001389783361_p645511218169"},[i("span",{id:"zh-cn_topic_0000001526206862_zh-cn_topic_0000001389783361_p645511218169"}),i("span",{id:"zh-cn_topic_0000001526206862_zh-cn_topic_0000001389783361_p645511218169"}),n("输入/输出")])]),i("th",{class:"cellrowborder",valign:"top",width:"67.44%",id:"mcps1.1.4.1.3"},[i("p",{id:"zh-cn_topic_0000001526206862_zh-cn_topic_0000001389783361_p1922337124411"},[i("span",{id:"zh-cn_topic_0000001526206862_zh-cn_topic_0000001389783361_p1922337124411"}),i("span",{id:"zh-cn_topic_0000001526206862_zh-cn_topic_0000001389783361_p1922337124411"}),n("说明")])])])]),i("tbody",null,[i("tr",{id:"zh-cn_topic_0000001526206862_zh-cn_topic_0000001389783361_row152234713443"},[i("td",{class:"cellrowborder",valign:"top",width:"17.22%",headers:"mcps1.1.4.1.1 "},[i("p",{id:"zh-cn_topic_0000001526206862_zh-cn_topic_0000001389783361_p2340183613156"},[i("span",{id:"zh-cn_topic_0000001526206862_zh-cn_topic_0000001389783361_p2340183613156"}),i("span",{id:"zh-cn_topic_0000001526206862_zh-cn_topic_0000001389783361_p2340183613156"}),n("EXPRESSION")])]),i("td",{class:"cellrowborder",valign:"top",width:"15.340000000000002%",headers:"mcps1.1.4.1.2 "},[i("p",{id:"p137163271873"},[i("span",{id:"p137163271873"}),i("span",{id:"p137163271873"}),n("输入")])]),i("td",{class:"cellrowborder",valign:"top",width:"67.44%",headers:"mcps1.1.4.1.3 "},[i("p",{id:"p1190216251682"},[i("span",{id:"p1190216251682"}),i("span",{id:"p1190216251682"}),n("EXPRESSION为逻辑运算，其中用TILING_KEY_VAR指代TilingKey。")])])]),i("tr",{id:"zh-cn_topic_0000001526206862_row1239183183016"},[i("td",{class:"cellrowborder",valign:"top",width:"17.22%",headers:"mcps1.1.4.1.1 "},[i("p",{id:"p17557191817713"},[i("span",{id:"p17557191817713"}),i("span",{id:"p17557191817713"}),n("TILING_STRUCT")])]),i("td",{class:"cellrowborder",valign:"top",width:"15.340000000000002%",headers:"mcps1.1.4.1.2 "},[i("p",{id:"zh-cn_topic_0000001526206862_p7239938308"},[i("span",{id:"zh-cn_topic_0000001526206862_p7239938308"}),i("span",{id:"zh-cn_topic_0000001526206862_p7239938308"}),n("输入")])]),i("td",{class:"cellrowborder",valign:"top",width:"67.44%",headers:"mcps1.1.4.1.3 "},[i("p",{id:"zh-cn_topic_0000001526206862_p72396320307"},[i("span",{id:"zh-cn_topic_0000001526206862_p72396320307"}),i("span",{id:"zh-cn_topic_0000001526206862_p72396320307"}),n("用户注册的与TilingKey相匹配的TilingData自定义结构体。")])])])])]),i("h2",{id:"约束说明"},[n("约束说明"),i("span",{id:"zh-cn_topic_0000001526206862_section65498832"}),i("a",{class:"header-anchor",href:"#约束说明"},"​")]),i("ul",null,[i("li",null,"使用该接口时，需确保已使用REGISTER_TILING_DEFAULT注册默认的用户自定义TilingData结构体，用于告知框架侧用户使用标准C++语法来定义TilingData。"),i("li",null,"EXPRESSION当前支持位运算：&、|、~、^；移位运算符：<<、>>；算术运算：+、-、*、/、%；条件运算符：==、!=、>、<、>=、<=；逻辑与&&、或||以及()。优先级同C++。"),i("li",null,"若TilingData结构体在命名空间内，注册时需要携带对应的命名空间作用域符。"),i("li",null,"不支持同个TilingKey指向不同TilingData结构体，会出现拦截报错。"),i("li",null,"暂不支持kernel直调工程。")]),i("h2",{id:"调用示例"},[n("调用示例"),i("span",{id:"zh-cn_topic_0000001526206862_section97001499599"}),i("a",{class:"header-anchor",href:"#调用示例"},"​")]),i("div",{class:"code-block"},[i("div",{class:"code-header"},[i("span",{class:"lang-label"},"Text"),i("button",{class:"copy-btn",title:"复制代码"},[i("svg",{width:"16",height:"16",viewBox:"0 0 16 16"},[i("path",{d:"M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"}),i("path",{d:"M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"})])])]),i("pre",{class:"highlight"},[i("code",null,`extern "C" __global__ __aicore__ void add_custom(__gm__ uint8_t *x, __gm__ uint8_t *y, __gm__ uint8_t *z, __gm__ uint8_t *tiling)
{
    REGISTER_TILING_DEFAULT(optiling::TilingData);  // 注册用户默认自定义TilingData结构体
    REGISTER_TILING_FOR_TILINGKEY("TILING_KEY_VAR == 1", optiling::TilingDataA); // 注册TilingKey为1的TilingData结构体
    REGISTER_TILING_FOR_TILINGKEY("(TILING_KEY_VAR >= 10) && (TILING_KEY_VAR <= 15)", optiling::TilingDataB); // 注册TilingKey在[10,15]之间的TilingData结构体
    REGISTER_TILING_FOR_TILINGKEY("TILING_KEY_VAR & 0xFF", optiling::TilingDataC); // 注册TilingKey低8位为1的TilingData结构体
    if (TILING_KEY_IS(1)) {
        GET_TILING_DATA_WITH_STRUCT(optiling::TilingDataA, tilingData, tiling);
        ......
    } else if (TILING_KEY_IS(11)) {
        GET_TILING_DATA_WITH_STRUCT(optiling::TilingDataB, tilingData, tiling);
        ......
    } else if (TILING_KEY_IS(14)) {
        GET_TILING_DATA_WITH_STRUCT(optiling::TilingDataB, tilingData, tiling);
        ......
    } else if (TILING_KEY_IS(255)) {
        GET_TILING_DATA_WITH_STRUCT(optiling::TilingDataC, tilingData, tiling);
        ......
    } else {
        GET_TILING_DATA(tilingData, tiling);
        ......
    }
}
`)])]),i("p",null,"使用标准C++语法注册tiling结构体："),i("div",{class:"code-block"},[i("div",{class:"code-header"},[i("span",{class:"lang-label"},"Text"),i("button",{class:"copy-btn",title:"复制代码"},[i("svg",{width:"16",height:"16",viewBox:"0 0 16 16"},[i("path",{d:"M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"}),i("path",{d:"M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"})])])]),i("pre",{class:"highlight"},[i("code",null,`class TilingDataA{
public:
    ...
};
class TilingDataB{
public:
    ...
};
class TilingDataC{
public:
    ...
};
`)])]),i("p",null,"配套的host侧tiling函数示例："),i("div",{class:"code-block"},[i("div",{class:"code-header"},[i("span",{class:"lang-label"},"Text"),i("button",{class:"copy-btn",title:"复制代码"},[i("svg",{width:"16",height:"16",viewBox:"0 0 16 16"},[i("path",{d:"M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"}),i("path",{d:"M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"})])])]),i("pre",{class:"highlight"},[i("code",null,`ge::graphStatus TilingFunc(gert::TilingContext* context)
{
    // 其他代码逻辑
    ...
    if(condition1){
        context->SetTilingKey(1);
        optiling::TilingDataA *Addtiling = context->GetTilingData<optiling::TilingDataA>();
        ...
    } else if (condition2){
        context->SetTilingKey(11);
        optiling::TilingDataB *Addtiling = context->GetTilingData<optiling::TilingDataB >();
        ...
    } else if (condition3){
        context->SetTilingKey(14);
        optiling::TilingDataB *Addtiling = context->GetTilingData<optiling::TilingDataB >();
        ...
    } else if (condition4){
        context->SetTilingKey(255);
        optiling::TilingDataC *Addtiling = context->GetTilingData<optiling::TilingDataC >();
        ...
    }
    ...
    // 其他代码逻辑
}
`)])])])],-1)])])}const I=t(e,[["render",c]]);export{g as __pageData,I as default};
