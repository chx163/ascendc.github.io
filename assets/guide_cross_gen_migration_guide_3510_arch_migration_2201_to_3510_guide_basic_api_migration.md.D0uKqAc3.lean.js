import{_ as e,o as t,a as s,c as a,d as n}from"./app.C41L12d5.js";const o="/ascendc.github.io/assets/fig_1_zn.C6ZV-qx8.png",i="/ascendc.github.io/assets/fig_2_zn.D3zTLFXT.png",c="/ascendc.github.io/assets/fig_3_zn.CnSevajZ.png",d="/ascendc.github.io/assets/fig_4_zn.DUtxEHyW.png",g=JSON.parse('{"title":"","description":"","frontmatter":{"breadcrumbs":[{"text":"Ascend C算子开发指南","link":"/guide/getting_started/ascend_c_overview_and_learning_path"},{"text":"跨代迁移兼容性指南","link":"/guide/cross_gen_migration_guide/overview"},{"text":"3510架构迁移指导","link":"/guide/cross_gen_migration_guide/3510_arch_migration/2201_to_3510_arch_changes"},{"text":"2201迁移3510指导","link":"/guide/cross_gen_migration_guide/3510_arch_migration/2201_to_3510_guide/basic_api_migration"},{"text":"基础API迁移指导","link":"/guide/cross_gen_migration_guide/3510_arch_migration/2201_to_3510_guide/basic_api_migration"}]},"headers":[],"relativePath":"guide/cross_gen_migration_guide/3510_arch_migration/2201_to_3510_guide/basic_api_migration.md","filePath":"guide/cross_gen_migration_guide/3510_arch_migration/2201_to_3510_guide/basic_api_migration.md","outlineHeaders":[{"level":2,"title":"矢量计算","slug":"矢量计算","link":"#矢量计算"},{"level":2,"title":"数据搬运","slug":"数据搬运","link":"#数据搬运"},{"level":2,"title":"矩阵计算","slug":"矩阵计算","link":"#矩阵计算"},{"level":2,"title":"系统变量访问","slug":"系统变量访问","link":"#系统变量访问"},{"level":2,"title":"调测API","slug":"调测API","link":"#调测API"}],"lastUpdated":1788177019000}'),r={name:"guide/cross_gen_migration_guide/3510_arch_migration/2201_to_3510_guide/basic_api_migration.md"};function h(u,l,_,p,A,C){return t(),s("div",null,[...l[0]||(l[0]=[a("div",null,[a("article",{class:"markdown-body"},[a("h1",null,[n("基础API迁移指导"),a("span",{id:"ZH-CN_TOPIC_0000002470508258"})]),a("p",null,[n("本节针对"),a("a",{href:"../../../programming_guide/language_extension/simd_builtin_keywords.html#npu-arch"},"NPU架构版本3510"),n("的芯片变更对基础API兼容性产生的影响进行说明，并提供基础API的兼容性适配方案。")]),a("h2",{id:"矢量计算"},[n("矢量计算"),a("a",{id:"vector-compute"}),a("a",{class:"header-anchor",href:"#矢量计算"},"​")]),a("ul",null,[a("li",null,[a("p",null,[a("strong",null,"3510架构默认不支持Subnormal功能。")]),a("p",null,[a("strong",null,"说明"),n("：Subnormal浮点数指的是指数位全为0、尾数不为0的浮点数，用于表示比最小正常数更小的值，避免“下溢为0”。3510版本默认不支持Subnormal，Subnormal浮点数在计算中被视为0。")]),a("p",null,[a("strong",null,"兼容方案"),n("：对于支持config参数的基础API，可以通过设置config模板参数来配置Subnormal计算模式。对于不传入config参数的部分基础API及高阶API，可通过编译选项"),a("code",null,"--cce-ftz"),n("配置Subnormal处理方式，该选项默认为"),a("code",null,"true"),n("。"),a("code",null,"--cce-ftz=false"),n("时保留Subnormal，"),a("code",null,"--cce-ftz=true"),n("时采用FTZ（Flush-To-Zero）模式。软件模拟通过精度扩展等方式处理Subnormal数据，避免其下溢为0。")]),a("p",null,[a("strong",null,"表1"),n(" 涉及Subnormal的API和config参数说明")]),a("p",null,[a("span",{id:"table288510533427"})]),a("table",null,[a("thead",{align:"left"},[a("tr",{id:"row388575318425"},[a("th",{class:"cellrowborder",align:"center",valign:"top",width:"27%",id:"mcps1.2.3.1.1"},[a("p",{id:"p12885175314420"},[a("span",{id:"p12885175314420"}),a("span",{id:"p12885175314420"}),n("Ascend C基础API")])]),a("th",{class:"cellrowborder",align:"center",valign:"top",width:"73%",id:"mcps1.2.3.1.2"},[a("p",{id:"p1288585311428"},[a("span",{id:"p1288585311428"}),a("span",{id:"p1288585311428"}),n("兼容说明")])])])]),a("tbody",null,[a("tr",{id:"row188851453184214"},[a("td",{class:"cellrowborder",align:"center",valign:"top",width:"27%",headers:"mcps1.2.3.1.1 "},[a("p",{id:"p1188545310427"},[a("span",{id:"p1188545310427"}),a("span",{id:"p1188545310427"}),n("Exp、Ln、Reciprocal、Sqrt、Rsqrt、Div")])]),a("td",{class:"cellrowborder",align:"left",valign:"top",width:"73%",headers:"mcps1.2.3.1.2 "},[a("p",{id:"p1055013361204"},[a("span",{id:"p1055013361204"}),a("span",{id:"p1055013361204"}),n("以Ln接口为例来进行说明。")]),a("p",{id:"p151399151208"},[a("span",{id:"p151399151208"}),a("span",{id:"p151399151208"}),n("通过LnConfig结构体的参数algo来配置Subnormal计算模式。algo取值如下：")]),a("span",{id:"ul118851253124216"}),a("span",{id:"ul118851253124216"}),a("ul",{id:"ul118851253124216"},[a("li",null,"LnAlgo::INTRINSIC，Subnormal处理方式受编译选项--cce-ftz控制，该选项默认为true。"),a("li",null,"LnAlgo::PRECISION_1ULP_FTZ_TRUE，使用单指令计算得出结果，采用FTZ模式。"),a("li",null,"LnAlgo::PRECISION_1ULP_FTZ_FALSE，支持Subnormal数据计算。")]),a("p",{id:"p9885135319427"},[a("span",{id:"p9885135319427"}),a("span",{id:"p9885135319427"}),n("该参数默认值DEFAULT_LN_CONFIG的取值如下：")]),a("span",{id:"screen18681133513203"}),a("span",{id:"screen18681133513203"}),a("pre",{class:"screen",codetype:"Cpp",id:"screen18681133513203"},"constexpr LnConfig DEFAULT_LN_CONFIG = { LnAlgo::INTRINSIC };")])])])]),a("p",null,"可以参考以下代码片段："),a("div",{class:"code-block"},[a("div",{class:"code-header"},[a("span",{class:"lang-label"},"Text"),a("button",{class:"copy-btn",title:"复制代码"},[a("svg",{width:"16",height:"16",viewBox:"0 0 16 16"},[a("path",{d:"M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"}),a("path",{d:"M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"})])])]),a("pre",{class:"highlight"},[a("code",null,`// 定义模板参数
constexpr AscendC::LnConfig CONFIG = {
    AscendC::LnAlgo::PRECISION_1ULP_FTZ_FALSE
};
constexpr uint32_t DATA_COUNT = 1024;
constexpr uint32_t xAddr = 0;
constexpr uint32_t yAddr = xAddr + DATA_COUNT * sizeof(half);

// 核函数（Kernel）入口：使用__vector__显式声明Vector核函数（Kernel），搭配C++ Tensor方式编程
__vector__ __global__ void ln_custom(__gm__ uint8_t* src, __gm__ uint8_t* dst)
{
    // C++ Tensor需要手动调用InitSocState初始化全局状态寄存器
    AscendC::InitSocState();

    AscendC::GlobalTensor<half> srcGlobal;
    AscendC::GlobalTensor<half> dstGlobal;
    srcGlobal.SetGlobalBuffer((__gm__ half*)src, DATA_COUNT);
    dstGlobal.SetGlobalBuffer((__gm__ half*)dst, DATA_COUNT);

    // 直接构造指定地址和存储位置的LocalTensor（C++ Tensor方式）
    AscendC::LocalTensor<half> srcLocal(AscendC::TPosition::VECCALC, xAddr, DATA_COUNT);
    AscendC::LocalTensor<half> dstLocal(AscendC::TPosition::VECCALC, yAddr, DATA_COUNT);

    AscendC::DataCopy(srcLocal, srcGlobal, DATA_COUNT);
    AscendC::SetFlag<AscendC::HardEvent::MTE2_V>(EVENT_ID0);
    AscendC::WaitFlag<AscendC::HardEvent::MTE2_V>(EVENT_ID0);

    // 调用Ln基础API，传入模板参数
    AscendC::Ln<half, CONFIG>(dstLocal, srcLocal, DATA_COUNT);

    AscendC::SetFlag<AscendC::HardEvent::V_MTE3>(EVENT_ID0);
    AscendC::WaitFlag<AscendC::HardEvent::V_MTE3>(EVENT_ID0);
    AscendC::DataCopy(dstGlobal, dstLocal, DATA_COUNT);

    AscendC::PipeBarrier<PIPE_ALL>();
}
`)])]),a("p",null,[n("在3510架构下，部分基础API和高阶API在未传入config参数时，其Subnormal处理方式受编译选项"),a("code",null,"--cce-ftz"),n("影响，该选项默认为"),a("code",null,"true"),n("。基础API包括Exp、Ln、Reciprocal、Sqrt、Rsqrt和Div；高阶API包括Gelu、Sigmoid、Silu、SoftMax、SoftmaxFlash、SoftmaxFlashV2、SoftmaxFlashV3、Swish、Digamma、Erf、Lgamma、Power、Tanh、BatchNorm和RmsNorm等。关于该编译选项的适用范围及产品限制，请参考"),a("a",{href:"../../../programming_guide/compilation_and_execution/operator_compilation/ai_core_operator_compilation.html"},"AI-Core算子编译基本用法"),n("。")])])]),a("h2",{id:"数据搬运"},[n("数据搬运"),a("span",{id:"section7530159122210"}),a("a",{class:"header-anchor",href:"#数据搬运"},"​")]),a("ul",null,[a("li",null,[a("p",null,[a("strong",null,"DataCopy接口不支持L1 Buffer->GM通路。")]),a("p",null,[a("strong",null,"说明"),n("：硬件删除L1 Buffer到GM的通路，无法将数据从L1 Buffer直接搬运到GM中。现有接口不支持L1 Buffer到GM的直接搬运。")]),a("p",null,[a("strong",null,"兼容方案"),n("：对于纯Cube计算场景：在GM多分配一个单位矩阵，通过Mmad矩阵乘法计算输出到L0C Buffer，再从L0C Buffer通过Fixpipe搬运到GM。对于Vector和Cube计算融合场景，可以通过L1 Buffer搬运到Unified Buffer（UB），再搬运到GM。以下以纯Cube计算场景为例进行说明，介绍算子核心流程，具体可参考"),a("a",{href:"https://gitcode.com/cann/asc-devkit/tree/master/examples/01_simd_cpp_api/06_compatibility_guide/data_copy_l1togm"},"L1到GM搬运兼容性样例"),n("。")]),a("ol",null,[a("li",null,[a("p",null,"将矩阵A从GM搬运到L1 Buffer。"),a("div",{class:"code-block"},[a("div",{class:"code-header"},[a("span",{class:"lang-label"},"Text"),a("button",{class:"copy-btn",title:"复制代码"},[a("svg",{width:"16",height:"16",viewBox:"0 0 16 16"},[a("path",{d:"M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"}),a("path",{d:"M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"})])])]),a("pre",{class:"highlight"},[a("code",null,`__aicore__ inline void CopyGmToL1A(AscendC::LocalTensor<T> a1Local)
{
    AscendC::Nd2NzParams intriParams1{1, M, K, 0, K, M, 1, 0};
    AscendC::DataCopy(a1Local, aGlobal, intriParams1);
}
`)])])]),a("li",null,[a("p",null,"将矩阵B（矩阵B为单位矩阵）从GM搬运到L1 Buffer。"),a("div",{class:"code-block"},[a("div",{class:"code-header"},[a("span",{class:"lang-label"},"Text"),a("button",{class:"copy-btn",title:"复制代码"},[a("svg",{width:"16",height:"16",viewBox:"0 0 16 16"},[a("path",{d:"M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"}),a("path",{d:"M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"})])])]),a("pre",{class:"highlight"},[a("code",null,`__aicore__ inline void CopyGmToL1B(AscendC::LocalTensor<U> b1Local)
{
    AscendC::Nd2NzParams intriParams2{1, K, N, 0, N, K, 1, 0};
    AscendC::DataCopy(b1Local, bGlobal, intriParams2);
}
`)])])]),a("li",null,[a("p",null,"将矩阵A从L1 Buffer搬运到L0A Buffer。"),a("div",{class:"code-block"},[a("div",{class:"code-header"},[a("span",{class:"lang-label"},"Text"),a("button",{class:"copy-btn",title:"复制代码"},[a("svg",{width:"16",height:"16",viewBox:"0 0 16 16"},[a("path",{d:"M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"}),a("path",{d:"M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"})])])]),a("pre",{class:"highlight"},[a("code",null,`__aicore__ inline void Load2DL1AToL0A(AscendC::LocalTensor<T> a1Local, AscendC::LocalTensor<T> a2Local)
{
    AscendC::LoadData2DParamsV2 loadDataParams;
    ...
    AscendC::LoadData(a2Local, a1Local, loadDataParams);
}
`)])])]),a("li",null,[a("p",null,"将矩阵B从L1 Buffer搬运到L0B Buffer。"),a("div",{class:"code-block"},[a("div",{class:"code-header"},[a("span",{class:"lang-label"},"Text"),a("button",{class:"copy-btn",title:"复制代码"},[a("svg",{width:"16",height:"16",viewBox:"0 0 16 16"},[a("path",{d:"M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"}),a("path",{d:"M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"})])])]),a("pre",{class:"highlight"},[a("code",null,`__aicore__ inline void Load2DL1BToL0B(AscendC::LocalTensor<U> b1Local, AscendC::LocalTensor<U> b2Local)
{
    AscendC::LoadData2DParamsV2 loadDataParams;
    ...
    AscendC::LoadData(b2Local, b1Local, loadDataParams);
}
`)])])]),a("li",null,[a("p",null,"进行Mmad矩阵计算，结果输出到L0C Buffer。"),a("div",{class:"code-block"},[a("div",{class:"code-header"},[a("span",{class:"lang-label"},"Text"),a("button",{class:"copy-btn",title:"复制代码"},[a("svg",{width:"16",height:"16",viewBox:"0 0 16 16"},[a("path",{d:"M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"}),a("path",{d:"M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"})])])]),a("pre",{class:"highlight"},[a("code",null,`__aicore__ inline void Compute(
    AscendC::LocalTensor<S> co1Local, AscendC::LocalTensor<T> a2Local, AscendC::LocalTensor<U> b2Local)
{
    AscendC::MmadParams mmadParams;
    ...
    AscendC::Mmad(co1Local, a2Local, b2Local, mmadParams);
}
`)])])]),a("li",null,[a("p",null,"通过FixPipe将矩阵C从L0C Buffer拷贝到GM。"),a("div",{class:"code-block"},[a("div",{class:"code-header"},[a("span",{class:"lang-label"},"Text"),a("button",{class:"copy-btn",title:"复制代码"},[a("svg",{width:"16",height:"16",viewBox:"0 0 16 16"},[a("path",{d:"M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"}),a("path",{d:"M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"})])])]),a("pre",{class:"highlight"},[a("code",null,`__aicore__ inline void CopyL0CToGm(AscendC::LocalTensor<S> co1Local)
{
    AscendC::FixpipeParamsV220 fixpipeParams;
    ...
    AscendC::Fixpipe<S, S, AscendC::CFG_ROW_MAJOR>(cGlobal, co1Local, fixpipeParams);
}
`)])])])])]),a("li",null,[a("p",null,[a("strong",null,"不支持SetLoadDataBoundary接口。")]),a("p",null,[a("strong",null,"说明"),n("：3510架构硬件删除了L1 Buffer的边界值设定相关寄存器，不再支持SetLoadDataBoundary接口。该接口用于设置LoadData（卷积数据搬运）时L1 Buffer的边界值。如果指令在处理源操作数时，源操作数在L1 Buffer上的地址超出设置的边界，则会从L1 Buffer的起始地址开始读取数据。设置为0表示无边界，可以使用整个L1 Buffer。")]),a("p",null,[a("strong",null,"兼容方案"),n("：")]),a("ul",null,[a("li",null,[a("a",{href:"../../../programming_guide/language_extension/simd_builtin_keywords.html#npu-arch"},"NPU架构版本2201"),n("的接口参数boundaryValue设置为0时与3510架构版本等价。")]),a("li",null,[n("如果需要在L1 Buffer上循环读取操作数，需要将对应的LoadData（卷积数据搬运）接口手动拆分成多条指令，手动绕回。具体代码可参考"),a("a",{href:"https://gitcode.com/cann/asc-devkit/tree/master/examples/01_simd_cpp_api/06_compatibility_guide/set_loaddata_boundary"},"SetLoadDataBoundary兼容性样例"),n("。")])]),a("p",null,[a("img",{src:o,alt:""})]),a("p",null,"如上图所示，以L1 Buffer到L0A Buffer的搬运为例。矩阵A为half数据类型，大小为32 * 32的矩阵，假设边界为512B，可以重复搬运数据到L0A Buffer，在每次搬运时设置目的操作数的地址偏移量。"),a("ol",null,[a("li",null,[a("p",null,"将矩阵A从GM搬运到L1 Buffer。"),a("div",{class:"code-block"},[a("div",{class:"code-header"},[a("span",{class:"lang-label"},"Text"),a("button",{class:"copy-btn",title:"复制代码"},[a("svg",{width:"16",height:"16",viewBox:"0 0 16 16"},[a("path",{d:"M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"}),a("path",{d:"M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"})])])]),a("pre",{class:"highlight"},[a("code",null,`__aicore__ inline void CopyGmToA1Nd2Nz(AscendC::LocalTensor<T>& leftMatrix)
{
    AscendC::Nd2NzParams nd2nzParams;
    ...
    AscendC::DataCopy(leftMatrix, aGlobal, nd2nzParams);
}
`)])])]),a("li",null,[a("p",null,"将矩阵B从GM搬运到L1 Buffer。"),a("div",{class:"code-block"},[a("div",{class:"code-header"},[a("span",{class:"lang-label"},"Text"),a("button",{class:"copy-btn",title:"复制代码"},[a("svg",{width:"16",height:"16",viewBox:"0 0 16 16"},[a("path",{d:"M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"}),a("path",{d:"M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"})])])]),a("pre",{class:"highlight"},[a("code",null,`__aicore__ inline void CopyGmToB1Nd2Nz(AscendC::LocalTensor<U>& rightMatrix)
{
    AscendC::Nd2NzParams nd2nzParams;
    ...
    AscendC::DataCopy(rightMatrix, bGlobal, nd2nzParams);
}
`)])])]),a("li",null,[a("p",null,"将矩阵A从L1 Buffer搬运到L0A Buffer。"),a("div",{class:"code-block"},[a("div",{class:"code-header"},[a("span",{class:"lang-label"},"Text"),a("button",{class:"copy-btn",title:"复制代码"},[a("svg",{width:"16",height:"16",viewBox:"0 0 16 16"},[a("path",{d:"M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"}),a("path",{d:"M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"})])])]),a("pre",{class:"highlight"},[a("code",null,`__aicore__ inline void Load3DA1ToL0A(AscendC::LocalTensor<T>& leftMatrix, AscendC::LocalTensor<T>& a2)
    {
        AscendC::LoadData3DParamsV2Pro loadData3dParamsPro;
        ...
#if defined(__NPU_ARCH__) && (__NPU_ARCH__ == 2201)
        ...
        AscendC::SetLoadDataRepeat({0, 1, 0});
        AscendC::SetLoadDataBoundary(1024);
        AscendC::LoadData(a2, leftMatrix, loadData3dParamsPro);
#elif defined(__NPU_ARCH__) && (__NPU_ARCH__ == 3510)
        uint16_t dstStride = AscendC::DivCeil(M / 2, 16);
        ...
        AscendC::SetLoadDataRepeatWithStride({0, 1, 0, dstStride});
        // 多次调用LoadData进行手动绕回
        AscendC::LoadData(a2, leftMatrix, loadData3dParamsPro);
        AscendC::LocalTensor<T> a3 = a2[256];
        AscendC::LoadData(a3, leftMatrix, loadData3dParamsPro);
        AscendC::LocalTensor<T> a4 = a2[512];
        AscendC::LoadData(a4, leftMatrix, loadData3dParamsPro);
        AscendC::LocalTensor<T> a5 = a2[768];
        AscendC::LoadData(a5, leftMatrix, loadData3dParamsPro);
#endif
    }
`)])])]),a("li",null,[a("p",null,"将矩阵B从L1 Buffer搬运到L0B Buffer。"),a("div",{class:"code-block"},[a("div",{class:"code-header"},[a("span",{class:"lang-label"},"Text"),a("button",{class:"copy-btn",title:"复制代码"},[a("svg",{width:"16",height:"16",viewBox:"0 0 16 16"},[a("path",{d:"M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"}),a("path",{d:"M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"})])])]),a("pre",{class:"highlight"},[a("code",null,`__aicore__ inline void Load3DB1ToL0B(AscendC::LocalTensor<U>& rightMatrix, AscendC::LocalTensor<U>& b2)
    {
        AscendC::LoadData3DParamsV2<U> loadData3dParams;
        ...
        uint8_t padList[AscendC::PAD_SIZE] = {0, 0, 0, 0};
        static constexpr AscendC::IsResetLoad3dConfig LOAD3D_CONFIG = {false, false};
        AscendC::SetFmatrix(N, 1, padList, AscendC::FmatrixMode::FMATRIX_LEFT);
#if defined(__NPU_ARCH__) && (__NPU_ARCH__ == 2201)
        AscendC::SetLoadDataRepeat({0, 1, 0});
        AscendC::SetLoadDataBoundary(0);
        AscendC::SetLoadDataPaddingValue(0);
        AscendC::LoadData<U, LOAD3D_CONFIG>(b2, rightMatrix, loadData3dParams);
#elif defined(__NPU_ARCH__) && (__NPU_ARCH__ == 3510)
        uint16_t dstStride = AscendC::DivCeil(N, 16);
        AscendC::SetLoadDataRepeatWithStride({0, 1, 0, dstStride});
        AscendC::SetLoadDataPaddingValue(0);
        AscendC::LoadDataWithStride<U, LOAD3D_CONFIG>(b2, rightMatrix, loadData3dParams);
#endif
    }
`)])])]),a("li",null,[a("p",null,"矩阵计算。"),a("div",{class:"code-block"},[a("div",{class:"code-header"},[a("span",{class:"lang-label"},"Text"),a("button",{class:"copy-btn",title:"复制代码"},[a("svg",{width:"16",height:"16",viewBox:"0 0 16 16"},[a("path",{d:"M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"}),a("path",{d:"M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"})])])]),a("pre",{class:"highlight"},[a("code",null,`__aicore__ inline void Compute(AscendC::LocalTensor<T>& a2, AscendC::LocalTensor<U>& b2,
                            AscendC::LocalTensor<V>& co1Local)
{
    AscendC::MmadParams mmadParams;
    ...
    AscendC::Mmad(co1Local, a2, b2, mmadParams);
}
`)])])]),a("li",null,[a("p",null,"将矩阵C从L0C Buffer搬运到GM。"),a("div",{class:"code-block"},[a("div",{class:"code-header"},[a("span",{class:"lang-label"},"Text"),a("button",{class:"copy-btn",title:"复制代码"},[a("svg",{width:"16",height:"16",viewBox:"0 0 16 16"},[a("path",{d:"M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"}),a("path",{d:"M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"})])])]),a("pre",{class:"highlight"},[a("code",null,`__aicore__ inline void CopyL0CToGm(AscendC::LocalTensor<V>& co1Local, const AscendC::GlobalTensor<S>& gm)
{
    AscendC::FixpipeParamsV220 fixpipeParams(N, static_cast<uint16_t>(M),
                                    AscendC::DivCeil(M, AscendC::BLOCK_CUBE) * AscendC::BLOCK_CUBE, static_cast<uint16_t>(N), 0);
    ...
    AscendC::Fixpipe<S, V, AscendC::CFG_ROW_MAJOR>(gm, co1Local, fixpipeParams);
}
`)])])])])])]),a("h2",{id:"矩阵计算"},[n("矩阵计算"),a("span",{id:"section17560113713122"}),a("a",{class:"header-anchor",href:"#矩阵计算"},"​")]),a("ul",null,[a("li",null,[a("p",null,[a("strong",null,"Cube计算单元删除int4b_t数据类型。")]),a("p",null,[a("strong",null,"说明"),n("：相较于2201架构版本，3510架构版本的Cube计算单元不支持int4b_t。相关的基础API有LoadData、Mmad和LoadDataWithTranspose，这些接口不再支持int4b_t。")]),a("p",null,[a("strong",null,"兼容方案"),n("：算子侧通过编写CV融合算子在Vector Core进行int4b_t到int8_t的Cast转换，再通过UB搬运到L1后进行Mmad计算。具体代码可参考"),a("a",{href:"https://gitcode.com/cann/asc-devkit/tree/master/examples/01_simd_cpp_api/06_compatibility_guide/matmul_s4"},"int4数据类型下Matmul兼容性样例"),n("。图层面可以在该算子前增加Cast节点进行int4b_t到int8_t的转换。")]),a("ol",null,[a("li",null,[a("p",null,"在Vector Core进行int4b_t到int8_t的Cast转换，转换后的数据保存到新的GM空间中。"),a("div",{class:"code-block"},[a("div",{class:"code-header"},[a("span",{class:"lang-label"},"Text"),a("button",{class:"copy-btn",title:"复制代码"},[a("svg",{width:"16",height:"16",viewBox:"0 0 16 16"},[a("path",{d:"M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"}),a("path",{d:"M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"})])])]),a("pre",{class:"highlight"},[a("code",null,`__aicore__ inline void Unzip(AscendC::GlobalTensor<int8_t>& dstGlobalTensor,
    AscendC::GlobalTensor<int8_t>& srcGlobalTensor, uint32_t count)
{
    constexpr uint32_t oneBlockBytes = 32;
    uint32_t srcAddr = 0;
    uint32_t tmpAddr = srcAddr + AscendC::AlignUp(count * sizeof(int8_t), oneBlockBytes);
    uint32_t dstAddr = tmpAddr + AscendC::AlignUp(count * 2 * sizeof(half), oneBlockBytes);

    AscendC::LocalTensor<int8_t> srcLocalTensor(AscendC::TPosition::VECCALC, srcAddr, count);
    AscendC::LocalTensor<half> tmpTensor(AscendC::TPosition::VECCALC, tmpAddr, count * 2);
    AscendC::LocalTensor<int8_t> dstLocalTensor(AscendC::TPosition::VECCALC, dstAddr, count * 2);

    AscendC::DataCopy(srcLocalTensor, srcGlobalTensor, count);
    AscendC::SetFlag<AscendC::HardEvent::MTE2_V>(EVENT_ID0);
    AscendC::WaitFlag<AscendC::HardEvent::MTE2_V>(EVENT_ID0);

    AscendC::LocalTensor<AscendC::int4b_t> int4SrcLocalTensor =
        srcLocalTensor.ReinterpretCast<AscendC::int4b_t>();
    AscendC::Cast<half, AscendC::int4b_t>(tmpTensor, int4SrcLocalTensor, AscendC::RoundMode::CAST_NONE, count * 2);
    AscendC::PipeBarrier<PIPE_V>();
    AscendC::Cast<int8_t, half>(dstLocalTensor, tmpTensor, AscendC::RoundMode::CAST_CEIL, count * 2);

    AscendC::SetFlag<AscendC::HardEvent::V_MTE3>(EVENT_ID0);
    AscendC::WaitFlag<AscendC::HardEvent::V_MTE3>(EVENT_ID0);
    AscendC::DataCopy(dstGlobalTensor, dstLocalTensor, count * 2);
}
`)])])]),a("li",null,[a("p",null,"进行int8_t数据类型的矩阵计算。"),a("div",{class:"code-block"},[a("div",{class:"code-header"},[a("span",{class:"lang-label"},"Text"),a("button",{class:"copy-btn",title:"复制代码"},[a("svg",{width:"16",height:"16",viewBox:"0 0 16 16"},[a("path",{d:"M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"}),a("path",{d:"M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"})])])]),a("pre",{class:"highlight"},[a("code",null,`__aicore__ inline void RunMatmul()
{
    ...
    int offsetA = 0;
    int offsetB = 0;
    int offsetC = 0;
    ...
    auto gmA = aGlobal[offsetA];
    auto gmB = bGlobal[offsetB];
    auto gmC = cGlobal[offsetC];

    AscendC::Matmul<A_TYPE, B_TYPE, C_TYPE, BIAS_TYPE, CFG_MDL> mm;
    mm.SetSubBlockIdx(0);
    mm.Init(&tiling, pipe);
    mm.SetTensorA(gmA, false);
    mm.SetTensorB(gmB, false);
    mm.IterateAll(gmC);
}
`)])])])])]),a("li",null,[a("p",null,[a("strong",null,"L0A Buffer分形改变，从Zz转换为Nz格式。")]),a("p",null,[a("strong",null,"说明"),n("：涉及的API有LoadData、Mmad和LoadDataWithTranspose。")]),a("ul",null,[a("li",null,[a("p",null,"2201架构版本，参与矩阵乘计算（A * B = C）时， ABC矩阵的数据排布格式分别为Zz，Zn，Nz。A、B、C矩阵分别位于L0A Buffer、L0B Buffer、L0C Buffer。"),a("p",null,"矩阵A：每个分形矩阵内部是行主序，分形矩阵之间是行主序。分形Shape为16 x (32B/sizeof(AType))，大小为512Byte。"),a("p",null,"矩阵B：每个分形矩阵内部是列主序，分形矩阵之间是行主序。分形Shape为 (32B/sizeof(BType)) x 16，大小为512Byte。"),a("p",null,"矩阵C：每个分形矩阵内部是行主序，分形矩阵之间是列主序。分形Shape为16 x 16，大小为256个元素。"),a("p",null,[a("img",{src:i,alt:""})])]),a("li",null,[a("p",null,"3510架构版本，参与矩阵乘计算（A * B = C）时， ABC矩阵的数据排布格式分别为Nz，Zn，Nz。"),a("p",null,"矩阵A：每个分形矩阵内部是行主序，分形矩阵之间是列主序。其Shape为16 x (32B/sizeof(AType))，大小为512Byte。"),a("p",null,"矩阵B：每个分形矩阵内部是列主序，分形矩阵之间是行主序。其Shape为 (32B/sizeof(BType)) x 16，大小为512Byte。"),a("p",null,"矩阵C：每个分形矩阵内部是行主序，分形矩阵之间是列主序。其Shape为16 x 16，大小为256个元素。"),a("p",null,[a("img",{src:c,alt:""})])])]),a("p",null,[a("strong",null,"兼容方案"),n("：非L0A Buffer切分的场景兼容2201版本，L0A Buffer切分的场景需要根据新的分形重新适配。具体代码可参考"),a("a",{href:"https://gitcode.com/cann/asc-devkit/tree/master/examples/01_simd_cpp_api/06_compatibility_guide/pattern_transformation"},"pattern_transformation兼容性样例"),n("。")]),a("p",null,"在2201架构中，矩阵计算要求左矩阵为ZZ分形（3510中为NZ），右矩阵为ZN分形，由于L1 Buffer的数据分形为NZ，所以2201架构下将左矩阵从L1 Buffer搬运到L0A Buffer需要额外做NZ分形到ZZ分形的转换，3510架构下则不用转换分形。"),a("p",null,[a("img",{src:d,alt:""})]),a("p",null,"分形变化带来的变动主要体现在L1 Buffer到L0A Buffer的搬运过程，以下代码片段进行展示："),a("div",{class:"code-block"},[a("div",{class:"code-header"},[a("span",{class:"lang-label"},"Text"),a("button",{class:"copy-btn",title:"复制代码"},[a("svg",{width:"16",height:"16",viewBox:"0 0 16 16"},[a("path",{d:"M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"}),a("path",{d:"M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"})])])]),a("pre",{class:"highlight"},[a("code",null,`__aicore__ inline void DataLoadA(AscendC::LocalTensor<T> a1, AscendC::LocalTensor<T> a2)
    {
#if defined(__NPU_ARCH__) && (__NPU_ARCH__ == 2201)
        constexpr uint32_t mBlocks = M / CUBE_BLOCK;
        constexpr uint32_t kBlocks = K * sizeof(T) / C0_SIZE;
        int srcOffset = 0;
        int dstOffset = 0;
        for (uint32_t i = 0; i < mBlocks; ++i) {
            AscendC::LoadData2DParams loadDataParams;
            loadDataParams.repeatTimes = kBlocks;
            loadDataParams.srcStride = mBlocks;
            loadDataParams.ifTranspose = false;
            AscendC::LoadData(a2[dstOffset], a1[srcOffset], loadDataParams);
            srcOffset += CUBE_BLOCK * CUBE_BLOCK;
            dstOffset += K * CUBE_BLOCK;
        }
#elif defined(__NPU_ARCH__) && (__NPU_ARCH__ == 3510)
        AscendC::LoadData2DParamsV2 loadDataParams;
        loadDataParams.mStartPosition = 0;
        loadDataParams.kStartPosition = 0;
        loadDataParams.mStep = AscendC::DivCeil(M, CUBE_BLOCK);
        loadDataParams.kStep = AscendC::DivCeil(K * sizeof(T), C0_SIZE);
        loadDataParams.srcStride = AscendC::DivCeil(M, CUBE_BLOCK);
        loadDataParams.dstStride = AscendC::DivCeil(M, CUBE_BLOCK);
        loadDataParams.sid = 0;
        loadDataParams.ifTranspose = false;
        AscendC::LoadData(a2, a1, loadDataParams);
#endif
    }
`)])])]),a("li",null,[a("p",null,[a("strong",null,"3510架构版本硬件架构删除4：2结构化稀疏功能。"),a("span",{id:"li69092585134"})]),a("p",null,[a("strong",null,"说明"),n("：LoadDataWithSparse用于将存储在L1 Buffer中的512B稠密权重矩阵搬运到L0B buffer，并同时读取128B的索引矩阵以实现稠密矩阵的稀疏化。由于3510架构版本不支持结构化稀疏功能，因此LoadDataWithSparse在此版本中并不适用。另一方面，MmadWithSparse负责执行矩阵乘加操作，其中右矩阵B为稠密矩阵，需要通过调用LoadDataWithSparse进行载入。由于3510架构不支持LoadDataWithSparse，因此MmadWithSparse也无法在3510架构版本中使用。")]),a("p",null,[a("strong",null,"兼容方案"),n("：在算子侧可以不调用LoadDatawithSparse进行矩阵稠密转稀疏操作，然后使用Mmad进行正常的稠密矩阵计算。稀疏矩阵相关算法可参考MmadWithSparse中的介绍。")])]),a("li",null,[a("p",null,[a("strong",null,"3510架构版本删除GM->L0A Buffer/L0B Buffer通路")]),a("p",null,[a("strong",null,"说明"),n("：硬件删除GM->L0A Buffer/L0B Buffer通路，调用LoadData时，不再支持这些通路。")]),a("p",null,[a("strong",null,"兼容方案"),n("：实现GM->L0A Buffer/L0B Buffer搬运需拆分成两步进行，先从GM搬运到L1 Buffer，再从L1 Buffer搬运到L0A Buffer、L0B Buffer。")]),a("p",null,"以GM->L1 Buffer->L0A Buffer通路为例可以参考以下步骤："),a("ol",null,[a("li",null,[a("p",null,"将矩阵A从GM搬运到L1 Buffer。"),a("div",{class:"code-block"},[a("div",{class:"code-header"},[a("span",{class:"lang-label"},"Text"),a("button",{class:"copy-btn",title:"复制代码"},[a("svg",{width:"16",height:"16",viewBox:"0 0 16 16"},[a("path",{d:"M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"}),a("path",{d:"M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"})])])]),a("pre",{class:"highlight"},[a("code",null,`__aicore__ inline void CopyGmToA1(AscendC::LocalTensor<T>& leftMatrix)
{
    AscendC::Nd2NzParams intriParams1{1, 64, 128, 0, 128, 64, 1, 0};
    AscendC::DataCopy(leftMatrix, aGlobal, intriParams1);
}
`)])])]),a("li",null,[a("p",null,"将矩阵A从L1 Buffer搬运到L0A Buffer。"),a("div",{class:"code-block"},[a("div",{class:"code-header"},[a("span",{class:"lang-label"},"Text"),a("button",{class:"copy-btn",title:"复制代码"},[a("svg",{width:"16",height:"16",viewBox:"0 0 16 16"},[a("path",{d:"M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"}),a("path",{d:"M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"})])])]),a("pre",{class:"highlight"},[a("code",null,`__aicore__ inline void Load2DA1ToL0A(AscendC::LocalTensor<T>& a1, AscendC::LocalTensor<T>& a2)
{
    AscendC::LoadData2DParamsV2 loadDataParams;
    ...
    AscendC::LoadData(a2, a1, loadDataParams);
}
`)])])])])]),a("li",null,[a("p",null,[a("strong",null,"3510架构版本删除L0A Buffer/L0B Buffer初始化的相关硬件指令。")]),a("p",null,[a("strong",null,"说明"),n("：Fill接口将特定存储位置的LocalTensor初始化为某一具体数值，不支持直接初始化L0A Buffer、L0B Buffer。")]),a("p",null,[a("strong",null,"兼容方案"),n("：先通过Fill接口初始化L1 Buffer，再通过LoadData接口将L1 Buffer上的数据搬运到L0A Buffer、L0B Buffer。具体代码可参考"),a("a",{href:"https://gitcode.com/cann/asc-devkit/tree/master/examples/01_simd_cpp_api/06_compatibility_guide/fill"},"Fill兼容性样例"),n("。")]),a("p",null,"以GM->L1 Buffer->L0A Buffer的数据通路为例："),a("ol",null,[a("li",null,[a("p",null,"初始化L1 Buffer。"),a("div",{class:"code-block"},[a("div",{class:"code-header"},[a("span",{class:"lang-label"},"Text"),a("button",{class:"copy-btn",title:"复制代码"},[a("svg",{width:"16",height:"16",viewBox:"0 0 16 16"},[a("path",{d:"M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"}),a("path",{d:"M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"})])])]),a("pre",{class:"highlight"},[a("code",null,`__aicore__ inline void InitConstA1(AscendC::LocalTensor<T>& a1Local)
{
    AscendC::Fill(a1Local, {1, static_cast<uint16_t>(M * K * sizeof(T) / 32), 0, 1});
}
`)])])]),a("li",null,[a("p",null,"调用LoadData接口将L1 Buffer上的数据搬运到L0A Buffer。"),a("div",{class:"code-block"},[a("div",{class:"code-header"},[a("span",{class:"lang-label"},"Text"),a("button",{class:"copy-btn",title:"复制代码"},[a("svg",{width:"16",height:"16",viewBox:"0 0 16 16"},[a("path",{d:"M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"}),a("path",{d:"M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"})])])]),a("pre",{class:"highlight"},[a("code",null,`__aicore__ inline void Load2DA1ToA2(AscendC::LocalTensor<T>& a1Local, AscendC::LocalTensor<T>& a2Local)
{
    AscendC::LoadData2DParamsV2 loadDataParams;
    ...
    AscendC::LoadData(a2Local, a1Local, loadDataParams);
}
`)])])])])])]),a("h2",{id:"系统变量访问"},[n("系统变量访问"),a("span",{id:"section34615332215"}),a("a",{class:"header-anchor",href:"#系统变量访问"},"​")]),a("ul",null,[a("li",null,[a("p",null,[a("strong",null,"不支持CheckLocalMemoryIA，3510架构版本相关寄存器删除。")]),a("p",null,[a("strong",null,"说明"),n("：CheckLocalMemoryIA监视设定范围内的UB读写行为，如果监视到有设定范围的读写行为则会出现EXCEPTION报错，未监视到设定范围的读写行为则不会报错。")]),a("p",null,[a("strong",null,"兼容方案"),n("：该接口为调测接口，对功能无影响。")])])]),a("h2",{id:"调测API"},[n("调测API"),a("span",{id:"section12611957102116"}),a("a",{class:"header-anchor",href:"#调测API"},"​")]),a("ul",null,[a("li",null,[a("p",null,[a("strong",null,"L1 Buffer上不支持Tensor信息的打印。")]),a("p",null,[a("strong",null,"说明"),n("：因芯片删除L1 Buffer->GM通路，不支持L1 Buffer->GM的功能。")]),a("p",null,[a("strong",null,"兼容方案"),n("：该接口为调测接口，对功能无影响。")])])])])],-1)])])}const L=e(r,[["render",h]]);export{g as __pageData,L as default};
