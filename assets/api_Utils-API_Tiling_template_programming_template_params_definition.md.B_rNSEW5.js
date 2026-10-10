import{_ as t,o as C,a as T,b as A}from"./app.UgfkfLuP.js";const N=JSON.parse('{"title":"","description":"","frontmatter":{"breadcrumbs":[{"text":"Ascend C API","link":"/api/api_list"},{"text":"Utils API<a npu_parse_enabled=\\"true\\"></a>","link":"/api/Utils-API/Utils-API"},{"text":"Tiling模板编程","link":"/api/Utils-API/Tiling_template_programming/Tiling_template_programming"},{"text":"模板参数定义","link":"/api/Utils-API/Tiling_template_programming/template_params_definition"}]},"headers":[],"relativePath":"api/Utils-API/Tiling_template_programming/template_params_definition.md","filePath":"api/Utils-API/Tiling_template_programming/template_params_definition.md","outlineHeaders":[{"level":2,"title":"功能说明","slug":"功能说明","link":"#功能说明"},{"level":2,"title":"函数原型","slug":"函数原型","link":"#函数原型"},{"level":2,"title":"参数说明","slug":"参数说明","link":"#参数说明"},{"level":2,"title":"返回值说明","slug":"返回值说明","link":"#返回值说明"},{"level":2,"title":"约束说明","slug":"约束说明","link":"#约束说明"}],"lastUpdated":1791450810000}'),r={name:"api/Utils-API/Tiling_template_programming/template_params_definition.md"};function a(e,_,E,n,L,S){return C(),T("div",null,[..._[0]||(_[0]=[A(`<div><article class="markdown-body"><h1>模板参数定义<span id="ZH-CN_TOPIC_0000002139071917"></span></h1><h2 id="功能说明">功能说明<span id="zh-cn_topic_0000001867289945_zh-cn_topic_0000001389787297_section36583473819"></span><a class="header-anchor" href="#功能说明">​</a></h2><p>通过以下函数原型进行模板参数ASCENDC_TPL_ARGS_DECL和模板参数组合ASCENDC_TPL_ARGS_SEL（即可使用的模板）的定义。详细内容请参考<a href="Tiling_template_programming.html">Tiling模板编程</a>。</p><h2 id="函数原型">函数原型<span id="zh-cn_topic_0000001867289945_zh-cn_topic_0000001389787297_section13230182415108"></span><a class="header-anchor" href="#函数原型">​</a></h2><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>// ParamStruct是存放用户设置的模板参数ASCENDC_TPL_ARGS_DECL和模板参数组合ASCENDC_TPL_ARGS_SEL的结构体，用作后续的Tilingkey与模板参数之间的编解码，用户无需关注
struct ParamStruct {
    const char* name;
    uint32_t paramType;
    uint8_t bitWidth;
    std::vector&lt;uint64_t&gt; vals;
    const char* macroType;
    ParamStruct(const char* inName, uint32_t inParamType, uint8_t inBitWidth, std::vector&lt;uint64_t&gt; inVals,
        const char* inMacroType):
        name(inName), paramType(inParamType), bitWidth(inBitWidth), vals(std::move(inVals)),
        macroType(inMacroType) {}
};
using TilingDeclareParams = std::vector&lt;ParamStruct&gt;;
using TilingSelectParams = std::vector&lt;std::vector&lt;ParamStruct&gt;&gt;;

// 模板参数定义相关接口
#define ASCENDC_TPL_DTYPE_DECL(x, ...) ParamStruct{#x, ASCENDC_TPL_DTYPE, ASCENDC_TPL_8_BW, {__VA_ARGS__}, &quot;DECL&quot;}
#define ASCENDC_TPL_DATATYPE_DECL(x, ...) ParamStruct{#x, ASCENDC_TPL_DTYPE, ASCENDC_TPL_8_BW, {__VA_ARGS__}, &quot;DECL&quot;}
#define ASCENDC_TPL_FORMAT_DECL(x, ...) ParamStruct{#x, ASCENDC_TPL_FORMAT, ASCENDC_TPL_8_BW, {__VA_ARGS__}, &quot;DECL&quot;}
#define ASCENDC_TPL_UINT_DECL(x, bw, ...) ParamStruct{#x, ASCENDC_TPL_UINT, bw, {__VA_ARGS__}, &quot;DECL&quot;}
#define ASCENDC_TPL_BOOL_DECL(x, ...) ParamStruct{#x, ASCENDC_TPL_BOOL, ASCENDC_TPL_1_BW, {__VA_ARGS__}, &quot;DECL&quot;}
#define ASCENDC_TPL_KERNEL_TYPE_DECL(x, ...) ParamStruct{#x, ASCENDC_TPL_SHARED_KERNEL_TYPE, ASCENDC_TPL_8_BW, {__VA_ARGS__}, &quot;DECL&quot;}

#define ASCENDC_TPL_DTYPE_SEL(x, ...) ParamStruct{#x, ASCENDC_TPL_DTYPE, ASCENDC_TPL_8_BW, {__VA_ARGS__}, &quot;SEL&quot;}
#define ASCENDC_TPL_DATATYPE_SEL(x, ...) ParamStruct{#x, ASCENDC_TPL_DTYPE, ASCENDC_TPL_8_BW, {__VA_ARGS__}, &quot;SEL&quot;}
#define ASCENDC_TPL_FORMAT_SEL(x, ...) ParamStruct{#x, ASCENDC_TPL_FORMAT, ASCENDC_TPL_8_BW, {__VA_ARGS__}, &quot;SEL&quot;}
#define ASCENDC_TPL_UINT_SEL(x, ...) ParamStruct{#x, ASCENDC_TPL_UINT, 0, {__VA_ARGS__}, &quot;SEL&quot;}
#define ASCENDC_TPL_BOOL_SEL(x, ...) ParamStruct{#x, ASCENDC_TPL_BOOL, ASCENDC_TPL_1_BW, {__VA_ARGS__}, &quot;SEL&quot;}
#define ASCENDC_TPL_TILING_STRUCT_SEL(x, ...)
#define ASCENDC_TPL_KERNEL_TYPE_SEL(...) ParamStruct{&quot;kernel_type&quot;, ASCENDC_TPL_KERNEL_TYPE, ASCENDC_TPL_8_BW, {__VA_ARGS__}, &quot;SEL&quot;}
#define ASCENDC_TPL_DETERMINISTIC_SEL(...) ParamStruct{&quot;deterministic&quot;, ASCENDC_TPL_DETERMINISTIC, ASCENDC_TPL_1_BW, {__VA_ARGS__}, &quot;SEL&quot;}
#define ASCENDC_TPL_SHARED_KERNEL_TYPE_SEL(x, ...) ParamStruct{#x, ASCENDC_TPL_SHARED_KERNEL_TYPE, ASCENDC_TPL_8_BW, {__VA_ARGS__}, &quot;SEL&quot;}

#define ASCENDC_TPL_ARGS_DECL(x, ...) static TilingDeclareParams g_tilingDeclareParams{ __VA_ARGS__ }
#define ASCENDC_TPL_ARGS_SEL(...) { __VA_ARGS__}
#define ASCENDC_TPL_SEL(...) static TilingSelectParams g_tilingSelectParams{ __VA_ARGS__ }
</code></pre></div><h2 id="参数说明">参数说明<span id="zh-cn_topic_0000001867289945_zh-cn_topic_0000001389787297_section75395119104"></span><a class="header-anchor" href="#参数说明">​</a></h2><p><strong>表1</strong> Tiling模板参数定义说明</p><table><thead><tr><th>宏</th><th>功能描述</th><th>参数解释</th></tr></thead><tbody><tr><td>ASCENDC_TPL_ARGS_DECL(args0, ...)</td><td>用于定义算子的模板参数。</td><td>args0：表示算子Optype。<br>args1-argsn：后续为若干个DTYPE、FORMAT、UINT、BOOL、KERNEL_TYPE的模板参数定义，分别通过ASCENDC_TPL_DTYPE_DECL、ASCENDC_TPL_DATATYPE_DECL、ASCENDC_TPL_FORMAT_DECL、ASCENDC_TPL_UINT_DECL、ASCENDC_TPL_BOOL_DECL，ASCENDC_TPL_KERNEL_TYPE_DECL进行定义。</td></tr><tr><td>ASCENDC_TPL_DTYPE_DECL(args0, ...)</td><td>自定义DataType类型的模板参数定义。</td><td>args0：参数名。<br>args1-argsn：后续若干个参数为穷举的自定义DataType枚举值。</td></tr><tr><td>ASCENDC_TPL_DATATYPE_DECL(args0, ...)</td><td>原生DataType类型的模板参数定义。</td><td>args0：参数名。<br>args1-argsn：存在两种情况，后续若干个参数为穷举的原生DataType选项；或者为对应的输入参数的索引值（使用ASCENDC_TPL_INPUT(x)进行指定，其中x为对应数值）或对应输出参数的索引值（使用ASCENDC_TPL_OUTPUT(x)进行指定，其中x为对应数值），注意：存在多个时，仅第一个生效。<br>支持设置的原生DataType取值如下。</td></tr><tr><td>ASCENDC_TPL_FORMAT_DECL(args0, ...)</td><td>支持两种模式：<br>1. 均为自定义Format类型的模板参数定义。<br>2. 均为原生Format类型的模板参数定义。</td><td>args0：参数名。<br>args1-argsn：存在两种模式：<br>1. 后续若干个参数为穷举的自定义Format枚举值。<br>2. 该模式存在两种情况：后续若干个参数为穷举的原生Format选项；或者对应的输入参数的索引值（使用ASCENDC_TPL_INPUT(x)进行指定，其中x为对应数值）或对应输出参数的索引值（使用ASCENDC_TPL_OUTPUT(x)进行指定，其中x为对应数值），注意：存在多个时，仅第一个生效。<br>支持设置的原生Format选项如下。</td></tr><tr><td>ASCENDC_TPL_UINT_DECL(args0, args1, args2, ...)</td><td>自定义UINT类型（无符号整形）的模板参数定义。</td><td>args0：参数名。<br>args1：最大位宽，模板参数的个数不能超过最大位宽。<br>args2：参数定义的模式。支持以下三种模式：<br>ASCENDC_TPL_UI_RANGE：范围模式，设置该模式，后续紧跟着第一个值表示范围个数，第一个值后面的每两个数值为一组分别表示该范围的起、终位置；注意定义的范围个数要和后续的组数保持一致。**举例：**ASCENDC_TPL_UINT_DECL(args0, args1,ASCENDC_TPL_UI_RANGE,2,0,2,3,5)表示2组参数，这2组参数范围为{0, 2}，{3, 5}，因此该参数定义的UINT参数合法值为{0, 1, 2, 3, 4, 5}。<br>ASCENDC_TPL_UI_LIST：穷举模式，设置该模式，则表示后续将穷举出所有的参数值。**举例：**ASCENDC_TPL_UINT_DECL(args0, args1,ASCENDC_TPL_UI_LIST,10,12,13,9,8,7,6)表示1组穷举参数，[10, 12, 13, 9, 8, 7, 6]为穷举值，因此该参数定义的UINT参数合法值为{10, 12, 13, 9, 8, 7, 6}。<br>ASCENDC_TPL_UI_MIX：混合模式，设置该模式，则表示前n个数值为范围模式的参数定义，后m个数值为穷举模式的参数定义。**举例：**ASCENDC_TPL_UINT_DECL(args0, args1,ASCENDC_TPL_UI_MIX,2,0,2,3, 5, 10, 12, 13, 9, 8)表示2组穷举参数，这2组范围为{0, 2}, {3, 5}，[10, 12, 13, 9, 8]为穷举值，因此该参数定义的UINT参数合法值为{0, 1, 2, 3, 4, 5, 10, 12, 13, 9, 8}。<br>args3-argsn：对应不同范围模式的参数数值。</td></tr><tr><td>ASCENDC_TPL_BOOL_DECL(args0, ...)</td><td>自定义bool类型的模板参数定义。</td><td>args0：参数名。<br>args1-args2：取值范围0，1。</td></tr><tr><td>ASCENDC_TPL_KERNEL_TYPE_DECL(args0, ...)</td><td>定义算子模板参数的核函数（Kernel）类型。</td><td>args0：参数名。<br>args1-argsn：后续为若干核函数（Kernel）类型。<br>当前支持的核函数（Kernel）类型如下：<br>ASCENDC_TPL_AIV_ONLY // 算子执行时仅启动AI Core上的Vector核<br>ASCENDC_TPL_AIC_ONLY // 算子执行时仅启动AI Core上的Cube核<br>ASCENDC_TPL_MIX_AIV_1_0 // AIC、AIV混合场景下，算子执行时仅会启动AI Core上的Vector核<br>ASCENDC_TPL_MIX_AIC_1_0 // AIC、AIV混合场景下，算子执行时仅会启动AI Core上的Cube核<br>ASCENDC_TPL_MIX_AIC_1_1 // AIC、AIV混合场景下，算子执行时会同时启动AI Core上的Cube核和Vector核，比例为1：1<br>ASCENDC_TPL_MIX_AIC_1_2 // AIC、AIV混合场景下，算子执行时会同时启动AI Core上的Cube核和Vector核，比例为1：2<br>ASCENDC_TPL_AICORE // 算子执行时仅会启动AI Core<br>ASCENDC_TPL_VECTORCORE // 该参数为预留参数，当前版本暂不支持<br>ASCENDC_TPL_MIX_AICORE // 该参数为预留参数，当前版本暂不支持<br>ASCENDC_TPL_MIX_VECTOR_CORE // 算子执行时会同时启动AI Core和Vector Core<br>本接口只允许与ASCENDC_TPL_SHARED_KERNEL_TYPE_SEL(args0, ...)配合使用。</td></tr></tbody></table><p>ASCENDC_TPL_DATATYPE_DECL支持设置的原生DataType取值如下：</p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>C_DT_FLOAT
C_DT_FLOAT16
C_DT_INT8
C_DT_INT32
C_DT_UINT8
C_DT_INT16
C_DT_UINT16
C_DT_UINT32
C_DT_INT64
C_DT_UINT64
C_DT_DOUBLE
C_DT_BOOL
C_DT_COMPLEX64
C_DT_BF16
C_DT_INT4
C_DT_UINT1
C_DT_INT2
C_DT_COMPLEX32
C_DT_HIFLOAT8
C_DT_FLOAT8_E5M2
C_DT_FLOAT8_E4M3FN
C_DT_FLOAT4_E2M1
C_DT_FLOAT4_E1M2
</code></pre></div><p>ASCENDC_TPL_FORMAT_DECL支持设置的原生Format选项如下：</p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>C_FORMAT_NCHW
C_FORMAT_NHWC
C_FORMAT_ND
C_FORMAT_NC1HWC0
C_FORMAT_FRACTAL_Z
C_FORMAT_NC1C0HWPAD
C_FORMAT_NHWC1C0
C_FORMAT_FSR_NCHW
C_FORMAT_FRACTAL_DECONV
C_FORMAT_C1HWNC0
C_FORMAT_FRACTAL_DECONV_TRANSPOSE
C_FORMAT_FRACTAL_DECONV_SP_STRIDE_TRANS
C_FORMAT_NC1HWC0_C04
C_FORMAT_FRACTAL_Z_C04
C_FORMAT_CHWN
C_FORMAT_FRACTAL_DECONV_SP_STRIDE8_TRANS
C_FORMAT_HWCN
C_FORMAT_NC1KHKWHWC0
C_FORMAT_BN_WEIGHT
C_FORMAT_FILTER_HWCK
C_FORMAT_HASHTABLE_LOOKUP_LOOKUPS
C_FORMAT_HASHTABLE_LOOKUP_KEYS
C_FORMAT_HASHTABLE_LOOKUP_VALUE
C_FORMAT_HASHTABLE_LOOKUP_OUTPUT
C_FORMAT_HASHTABLE_LOOKUP_HITS
C_FORMAT_C1HWNCoC0
C_FORMAT_MD
C_FORMAT_NDHWC
C_FORMAT_FRACTAL_ZZ
C_FORMAT_FRACTAL_NZ
C_FORMAT_NCDHW
C_FORMAT_DHWCN
C_FORMAT_NDC1HWC0
C_FORMAT_FRACTAL_Z_3D
C_FORMAT_CN
C_FORMAT_NC
C_FORMAT_DHWNC
C_FORMAT_FRACTAL_Z_3D_TRANSPOSE
C_FORMAT_FRACTAL_ZN_LSTM
C_FORMAT_FRACTAL_Z_G
C_FORMAT_RESERVED
C_FORMAT_ALL
C_FORMAT_NULL
C_FORMAT_ND_RNN_BIAS
C_FORMAT_FRACTAL_ZN_RNN
C_FORMAT_NYUV
C_FORMAT_NYUV_A
C_FORMAT_NCL
C_FORMAT_FRACTAL_Z_WINO
C_FORMAT_C1HWC0
C_FORMAT_FRACTAL_NZ_C0_16
C_FORMAT_FRACTAL_NZ_C0_32
C_FORMAT_FRACTAL_NZ_C0_2
C_FORMAT_FRACTAL_NZ_C0_4
C_FORMAT_FRACTAL_NZ_C0_8
</code></pre></div><p><strong>表2</strong> Tiling模板参数组合定义</p><table><thead><tr><th>宏</th><th>功能描述</th><th>参数解释</th></tr></thead><tbody><tr><td>ASCENDC_TPL_SEL(...)</td><td>算子的模板参数整体组合。</td><td>包含多个算子的模板参数组合。</td></tr><tr><td>ASCENDC_TPL_ARGS_SEL(...)</td><td>算子的模板参数组合。</td><td>一个算子的模板参数组合。</td></tr><tr><td>ASCENDC_TPL_KERNEL_TYPE_SEL(args0)</td><td>用于设置算子模板参数组合的核函数（Kernel）类型，但该参数并不能作为核函数（Kernel）的模板参数传入。</td><td>args0：该模板参数组合下，算子的核函数（Kernel）类型。如不选择将走自动推导流程，ASCENDC_TPL_SEL下的所有算子对于是否选择核函数（Kernel）类型需要保持一致。<br>当前支持的核函数（Kernel）类型如下：<br>ASCENDC_TPL_AIV_ONLY // 算子执行时仅启动AI Core上的Vector核<br>ASCENDC_TPL_AIC_ONLY // 算子执行时仅启动AI Core上的Cube核<br>ASCENDC_TPL_MIX_AIV_1_0 // AIC、AIV混合场景下，算子执行时仅会启动AI Core上的Vector核<br>ASCENDC_TPL_MIX_AIC_1_0 // AIC、AIV混合场景下，算子执行时仅会启动AI Core上的Cube核<br>ASCENDC_TPL_MIX_AIC_1_1 // AIC、AIV混合场景下，算子执行时会同时启动AI Core上的Cube核和Vector核，比例为1：1<br>ASCENDC_TPL_MIX_AIC_1_2 // AIC、AIV混合场景下，算子执行时会同时启动AI Core上的Cube核和Vector核，比例为1：2<br>ASCENDC_TPL_AICORE // 算子执行时仅会启动AI Core<br>ASCENDC_TPL_VECTORCORE // 该参数为预留参数，当前版本暂不支持<br>ASCENDC_TPL_MIX_AICORE // 该参数为预留参数，当前版本暂不支持<br>ASCENDC_TPL_MIX_VECTOR_CORE // 算子执行时会同时启动AI Core和Vector Core<br>通过本接口配置核函数（Kernel）类型，核函数（Kernel）类型的取值范围同KERNEL_TASK_TYPE_DEFAULT接口一致，详见<a href="../../SIMD-API/basic_api/Kernel-Tiling/set_Kernel_type.html">设置核函数（Kernel）类型</a>。</td></tr><tr><td>ASCENDC_TPL_DTYPE_SEL(args0, ...)</td><td>自定义DataType类型的模板参数组合。</td><td>args0：表示参数名。<br>args1-argsn ：后续若干个参数为ASCENDC_TPL_DTYPE_DECL中定义的参数范围子集。</td></tr><tr><td>ASCENDC_TPL_DATATYPE_SEL(args0, ...)</td><td>原生DataType类型的模板参数组合。</td><td>args0：表示参数名。<br>args1-argsn ：后续若干个参数为ASCENDC_TPL_DATATYPE_DECL中定义的参数选项范围的子集。</td></tr><tr><td>ASCENDC_TPL_FORMAT_SEL(args0, ...)</td><td>Format类型的模板参数组合。</td><td>args0：表示参数名。<br>args1-argsn：后续若干个参数为ASCENDC_TPL_FORMAT_DECL中定义的参数选项范围子集。</td></tr><tr><td>ASCENDC_TPL_UINT_SEL(args0, args1, args2, ...)</td><td>UINT类型的模板参数组合。</td><td>args0：表示参数名。<br>args1：参数定义的模式。支持如下取值：<br>ASCENDC_TPL_UI_RANGE：范围模式。<br>ASCENDC_TPL_UI_LIST：穷举模式。<br>ASCENDC_TPL_UI_MIX：混合模式。<br>args2-argsn：后续若干个参数为ASCENDC_TPL_UINT_DECL中定义的参数范围子集。<br>模式和参数的配置方式参考ASCENDC_TPL_UINT_DECL(args0, args1, args2, ...)。</td></tr><tr><td>ASCENDC_TPL_BOOL_SEL(args0, ...)</td><td>bool类型的模板参数组合。</td><td>args0：表示参数名。<br>args1-args2 ：后续若干个参数为ASCENDC_TPL_BOOL_DECL定义的参数范围子集。</td></tr><tr><td>ASCENDC_TPL_DETERMINISTIC_SEL(args0)</td><td>该组模板参数组合用于配置是否开启确定性计算。</td><td>args0: 表示参数名，可选值范围[true, false, 1, 0]，其中[true/1]表示该组模板参数组合开启确定性计算，[false/0]表示不开启确定性计算。需要注意，该值不作为算子的模板参数入参，在开启该值编译时，会添加&quot;-DDETERMINISTIC_MODE=1&quot;,同时会生成以&quot;_deterministic&quot;结尾的json与.o文件，例如：&quot;AddCustomTemplate_816f04e052850554f4b3cacb35f8e8c6_deterministic.json&quot;/&quot;AddCustomTemplate_816f04e052850554f4b3cacb35f8e8c6_deterministic.o&quot;。<br>备注：若通过ASCENDC_TPL_DETERMINISTIC_SEL(true)接口编译出了确定性计算的版本，在算子调用时，通常需要打开确定性计算的开关，例如通过aclnn单算子调用时，需要使用aclrtCtxSetSysParamOpt接口进行相关配置。<br>该参数仅支持如下型号：<br>Atlas A3系列产品<br>Atlas A2系列产品</td></tr><tr><td>ASCENDC_TPL_TILING_STRUCT_SEL(args0)</td><td>用于为当前模板参数组合指定Tiling结构体，该结构体不作为核函数（Kernel）模板参数传入。</td><td>args0：表示当前模板参数组合使用的Tiling结构体名。该接口只能在ASCENDC_TPL_ARGS_SEL(...)中使用，不参与ASCENDC_TPL_SEL_PARAM(...)或GET_TPL_TILING_KEY(...)的参数顺序，也不参与TilingKey编码。<br>未配置本接口的模板参数组合，将使用REGISTER_TILING_DEFAULT注册的默认Tiling结构体。使用本接口时，必须通过REGISTER_TILING_DEFAULT提供默认Tiling结构体。</td></tr><tr><td>ASCENDC_TPL_SHARED_KERNEL_TYPE_SEL(args0, ...)</td><td>设置算子模板参数组合的核函数（Kernel）类型，该参数可以作为核函数（Kernel）的模板参数传入。</td><td>args0: 参数名<br>args1-argsn: 该模板参数组合下，算子的核函数（Kernel）类型，后续参数为若干核函数（Kernel）类型。该接口不能与ASCENDC_TPL_KERNEL_TYPE_SEL接口同时使用。<br>若同时使用KERNEL_TASK_TYPE_DEFAULT(value)接口，本接口优先级更高。</td></tr></tbody></table><h2 id="返回值说明">返回值说明<span id="zh-cn_topic_0000001867289945_zh-cn_topic_0000001389787297_section25791320141317"></span><a class="header-anchor" href="#返回值说明">​</a></h2><p>无。</p><h2 id="约束说明">约束说明<span id="zh-cn_topic_0000001867289945_zh-cn_topic_0000001389787297_section19165124931511"></span><a class="header-anchor" href="#约束说明">​</a></h2><p>对模板参数定义的取值进行修改或新增后，需要重新编译自定义算子包，不能再继续使用之前的算子二进制。</p></article></div>`,1)])])}const i=t(r,[["render",a]]);export{N as __pageData,i as default};
