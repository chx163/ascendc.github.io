import{_ as l,o as p,a as n,c as a,d as e}from"./app.DKoEZOcr.js";const _=JSON.parse('{"title":"","description":"","frontmatter":{"breadcrumbs":[{"text":"Ascend C算子开发指南","link":"/guide/getting_started/ascend_c_overview_and_learning_path"},{"text":"编程指南","link":"/guide/programming_guide/document_structure"},{"text":"编译与运行","link":"/guide/programming_guide/compilation_and_execution/compilation_and_execution"},{"text":"算子编译","link":"/guide/programming_guide/compilation_and_execution/operator_compilation/bisheng_compiler"},{"text":"AI CPU算子编译基本用法","link":"/guide/programming_guide/compilation_and_execution/operator_compilation/ai_cpu_operator_compilation"}]},"headers":[],"relativePath":"guide/programming_guide/compilation_and_execution/operator_compilation/ai_cpu_operator_compilation.md","filePath":"guide/programming_guide/compilation_and_execution/operator_compilation/ai_cpu_operator_compilation.md","outlineHeaders":[{"level":2,"title":"通过bisheng命令行编译","slug":"通过bisheng命令行编译","link":"#通过bisheng命令行编译"},{"level":2,"title":"AI CPU算子常用编译选项","slug":"AI-CPU算子常用编译选项","link":"#AI-CPU算子常用编译选项"},{"level":2,"title":"CMake方式编译","slug":"CMake方式编译","link":"#CMake方式编译"}],"lastUpdated":1787900896000}'),s={name:"guide/programming_guide/compilation_and_execution/operator_compilation/ai_cpu_operator_compilation.md"};function d(c,i,t,o,r,h){return p(),n("div",null,[...i[0]||(i[0]=[a("div",null,[a("article",{class:"markdown-body"},[a("h1",null,[e("AI CPU算子编译"),a("span",{id:"ZH-CN_TOPIC_0000002522571023"})]),a("p",null,[e("与AI Core算子只需一个"),a("code",null,".asc"),e("文件即可编译生成可执行文件不同，AI CPU算子需要同时包含"),a("code",null,".aicpu"),e("文件（核函数（Kernel）定义）和"),a("code",null,".asc"),e("文件（通过内核调用符调用核函数（Kernel））才能编译生成可执行文件。")]),a("h2",{id:"通过bisheng命令行编译"},[e("通过bisheng命令行编译"),a("span",{id:"section153291123460"}),a("a",{class:"header-anchor",href:"#通过bisheng命令行编译"},"​")]),a("p",null,[e("下文基于一个Hello World打印样例来讲解如何通过bisheng命令行编译AI CPU算子。该样例包含"),a("code",null,"hello_world.aicpu"),e("文件（AI CPU核函数（Kernel）定义）和"),a("code",null,"main.asc"),e("文件（通过内核调用符调用AI CPU核函数（Kernel））。")]),a("p",null,"hello_world.aicpu文件内容如下："),a("div",{class:"code-block"},[a("div",{class:"code-header"},[a("span",{class:"lang-label"},"Text"),a("button",{class:"copy-btn",title:"复制代码"},[a("svg",{width:"16",height:"16",viewBox:"0 0 16 16"},[a("path",{d:"M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"}),a("path",{d:"M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"})])])]),a("pre",{class:"highlight"},[a("code",null,`#include "aicpu_api.h"

__global__ __aicpu__ uint32_t hello_world(void *args)
{
    AscendC::printf("Hello World!!!\\n");
    return 0;
}
`)])]),a("p",null,"Host侧使用内核调用符<<<...>>>进行AI CPU算子的调用， main.asc示例代码如下："),a("div",{class:"code-block"},[a("div",{class:"code-header"},[a("span",{class:"lang-label"},"Text"),a("button",{class:"copy-btn",title:"复制代码"},[a("svg",{width:"16",height:"16",viewBox:"0 0 16 16"},[a("path",{d:"M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"}),a("path",{d:"M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"})])])]),a("pre",{class:"highlight"},[a("code",null,`#include "acl/acl.h"

struct KernelArgs {
    int mode;
};

extern __global__ __aicpu__ uint32_t hello_world(void *args);

int32_t main(int argc, char const *argv[])
{
    aclInit(nullptr);
    int32_t deviceId = 0;
    aclrtSetDevice(deviceId);
    aclrtStream stream = nullptr;
    aclrtCreateStream(&stream);

    struct KernelArgs args = {0};
    constexpr uint32_t numBlocks = 1;
    hello_world<<<numBlocks, nullptr, stream>>>(&args, sizeof(KernelArgs));
    aclrtSynchronizeStream(stream);

    aclrtDestroyStream(stream);
    aclrtResetDevice(deviceId);
    aclFinalize();
    return 0;
}
`)])]),a("p",null,"开发者可以使用bisheng命令行将hello_world.aicpu与main.asc分别编译成.o，再链接成为可执行文件，编译命令如下："),a("ul",null,[a("li",null,"编译hello_world.aicpu时，通过-I指定依赖头文件所在路径；通过--cce-aicpu-laicpu_api为Device链接依赖的库libaicpu_api.a，通过--cce-aicpu-L指定libaicpu_api.a的库路径；通过--cce-aicpu-toolkit-path指定AI CPU编译工具链路径；通过--cce-aicpu-sysroot指定AI CPU编译所使用的系统根目录。"),a("li",null,"编译main.asc时，通过--npu-arch编译选项指定对应的架构版本号。")]),a("p",null,[a("code",null,"${INSTALL_DIR}"),e("请替换为CANN软件安装后文件存储路径。以root用户安装为例，安装后文件默认存储路径为：/usr/local/Ascend/cann。")]),a("p",null,[e("各产品型号对应的架构版本号请通过"),a("a",{href:"../../language_extension/simd_builtin_keywords.html#npu-arch"},"对应关系表"),e("进行查询。")]),a("div",{class:"code-block"},[a("div",{class:"code-header"},[a("span",{class:"lang-label"},"Text"),a("button",{class:"copy-btn",title:"复制代码"},[a("svg",{width:"16",height:"16",viewBox:"0 0 16 16"},[a("path",{d:"M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"}),a("path",{d:"M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"})])])]),a("pre",{class:"highlight"},[a("code",null,"bisheng -O2 hello_world.aicpu --cce-aicpu-L${INSTALL_DIR}/lib64/device/lib64 --cce-aicpu-laicpu_api --cce-aicpu-toolkit-path=${INSTALL_DIR}/toolkit/toolchain/hcc/bin --cce-aicpu-sysroot=${INSTALL_DIR}/toolkit/toolchain/hcc/sysroot -I${INSTALL_DIR}/asc/include/aicpu_api -c -o hello_world.aicpu.o\nbisheng --npu-arch=dav-2201 main.asc -c -o main.asc.o\nbisheng hello_world.aicpu.o main.asc.o -o demo\n")])]),a("p",null,[e("上文我们通过一个入门示例介绍了使用bisheng命令行编译生成可执行文件的示例。除此之外，使用bisheng命令行也支持编译生成AI CPU算子的动态库与静态库，用户可在asc代码中通过内核调用符<<<...>>>调用AI CPU算子的核函数（Kernel），并在编译asc代码源文件生成可执行文件的时候，链接AI CPU动态库或者静态库，注意：若单独编译AI CPU算子代码生成动态库、静态库时，需要手动链接"),a("a",{href:"ai_core_operator_compilation.html#%E5%86%85%E7%BD%AE%E9%93%BE%E6%8E%A5%E5%BA%93"},"表格中的库文件"),e("。")]),a("ul",null,[a("li",null,[a("p",null,"编译生成算子动态库"),a("div",{class:"code-block"},[a("div",{class:"code-header"},[a("span",{class:"lang-label"},"Text"),a("button",{class:"copy-btn",title:"复制代码"},[a("svg",{width:"16",height:"16",viewBox:"0 0 16 16"},[a("path",{d:"M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"}),a("path",{d:"M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"})])])]),a("pre",{class:"highlight"},[a("code",null,`# 编译test_aicpu.cpp生成算子动态库
# -lxxx表示默认链接库
# bisheng -shared -x aicpu test_aicpu.cpp -o libtest_aicpu.so -lxxx ...
`)])])]),a("li",null,[a("p",null,"编译生成算子静态库"),a("div",{class:"code-block"},[a("div",{class:"code-header"},[a("span",{class:"lang-label"},"Text"),a("button",{class:"copy-btn",title:"复制代码"},[a("svg",{width:"16",height:"16",viewBox:"0 0 16 16"},[a("path",{d:"M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"}),a("path",{d:"M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"})])])]),a("pre",{class:"highlight"},[a("code",null,`# 编译test_aicpu.cpp生成算子静态库
# -lxxx表示默认链接库
# bisheng -lib -x aicpu test_aicpu.cpp -o libtest_aicpu.a -lxxx ...
`)])])])]),a("h2",{id:"AI-CPU算子常用编译选项"},[e("AI CPU算子常用编译选项"),a("span",{id:"section345885113142"}),a("a",{class:"header-anchor",href:"#AI-CPU算子常用编译选项"},"​")]),a("p",null,"AI CPU算子常用的编译选项说明如下："),a("p",null,[a("span",{id:"table9126181131320"})]),a("table",null,[a("thead",{align:"left"},[a("tr",{id:"row312711101316"},[a("th",{class:"cellrowborder",valign:"top",width:"33.63636363636363%",id:"mcps1.1.4.1.1"},[a("p",{id:"p71271711201318"},[a("span",{id:"p71271711201318"}),a("span",{id:"p71271711201318"}),a("strong",{id:"b01279110139"},[a("span",{id:"b01279110139"}),a("span",{id:"b01279110139"}),e("选项")])])]),a("th",{class:"cellrowborder",valign:"top",width:"9.676767676767676%",id:"mcps1.1.4.1.2"},[a("p",{id:"p1212711115131"},[a("span",{id:"p1212711115131"}),a("span",{id:"p1212711115131"}),a("strong",{id:"b101271011101310"},[a("span",{id:"b101271011101310"}),a("span",{id:"b101271011101310"}),e("是否必需")])])]),a("th",{class:"cellrowborder",valign:"top",width:"56.686868686868685%",id:"mcps1.1.4.1.3"},[a("p",{id:"p8127121151311"},[a("span",{id:"p8127121151311"}),a("span",{id:"p8127121151311"}),a("strong",{id:"b15127191120134"},[a("span",{id:"b15127191120134"}),a("span",{id:"b15127191120134"}),e("说明")])])])])]),a("tbody",null,[a("tr",{id:"row8127161113135"},[a("td",{class:"cellrowborder",valign:"top",width:"33.63636363636363%",headers:"mcps1.1.4.1.1 "},[a("p",{id:"p131279114139"},[a("span",{id:"p131279114139"}),a("span",{id:"p131279114139"}),e("-help")])]),a("td",{class:"cellrowborder",valign:"top",width:"9.676767676767676%",headers:"mcps1.1.4.1.2 "},[a("p",{id:"p61271711121318"},[a("span",{id:"p61271711121318"}),a("span",{id:"p61271711121318"}),e("否")])]),a("td",{class:"cellrowborder",valign:"top",width:"56.686868686868685%",headers:"mcps1.1.4.1.3 "},[a("p",{id:"p14127201181312"},[a("span",{id:"p14127201181312"}),a("span",{id:"p14127201181312"}),e("查看帮助。")])])]),a("tr",{id:"row19128611141312"},[a("td",{class:"cellrowborder",valign:"top",width:"33.63636363636363%",headers:"mcps1.1.4.1.1 "},[a("p",{id:"p17128511131312"},[a("span",{id:"p17128511131312"}),a("span",{id:"p17128511131312"}),e("-x")])]),a("td",{class:"cellrowborder",valign:"top",width:"9.676767676767676%",headers:"mcps1.1.4.1.2 "},[a("p",{id:"p13128181141318"},[a("span",{id:"p13128181141318"}),a("span",{id:"p13128181141318"}),e("否")])]),a("td",{class:"cellrowborder",valign:"top",width:"56.686868686868685%",headers:"mcps1.1.4.1.3 "},[a("p",{id:"p4128101191320"},[a("span",{id:"p4128101191320"}),a("span",{id:"p4128101191320"}),e("指定编译语言。")]),a("p",{id:"p21281116136"},[a("span",{id:"p21281116136"}),a("span",{id:"p21281116136"}),e("指定为aicpu时表示AI CPU算子编程语言。")])])]),a("tr",{id:"row10128111115130"},[a("td",{class:"cellrowborder",valign:"top",width:"33.63636363636363%",headers:"mcps1.1.4.1.1 "},[a("p",{id:"p3128191110133"},[a("span",{id:"p3128191110133"}),a("span",{id:"p3128191110133"}),e("-o <file>")])]),a("td",{class:"cellrowborder",valign:"top",width:"9.676767676767676%",headers:"mcps1.1.4.1.2 "},[a("p",{id:"p181287119131"},[a("span",{id:"p181287119131"}),a("span",{id:"p181287119131"}),e("否")])]),a("td",{class:"cellrowborder",valign:"top",width:"56.686868686868685%",headers:"mcps1.1.4.1.3 "},[a("p",{id:"p812861131314"},[a("span",{id:"p812861131314"}),a("span",{id:"p812861131314"}),e("指定输出文件的名称和位置。")])])]),a("tr",{id:"row7128911121316"},[a("td",{class:"cellrowborder",valign:"top",width:"33.63636363636363%",headers:"mcps1.1.4.1.1 "},[a("p",{id:"p2012821151310"},[a("span",{id:"p2012821151310"}),a("span",{id:"p2012821151310"}),e("-c")])]),a("td",{class:"cellrowborder",valign:"top",width:"9.676767676767676%",headers:"mcps1.1.4.1.2 "},[a("p",{id:"p11128151116138"},[a("span",{id:"p11128151116138"}),a("span",{id:"p11128151116138"}),e("否")])]),a("td",{class:"cellrowborder",valign:"top",width:"56.686868686868685%",headers:"mcps1.1.4.1.3 "},[a("p",{id:"p131281311121315"},[a("span",{id:"p131281311121315"}),a("span",{id:"p131281311121315"}),e("编译生成目标文件。")])])]),a("tr",{id:"row15128151111314"},[a("td",{class:"cellrowborder",valign:"top",width:"33.63636363636363%",headers:"mcps1.1.4.1.1 "},[a("p",{id:"p1312831111136"},[a("span",{id:"p1312831111136"}),a("span",{id:"p1312831111136"}),e("-shared，--shared")])]),a("td",{class:"cellrowborder",valign:"top",width:"9.676767676767676%",headers:"mcps1.1.4.1.2 "},[a("p",{id:"p91289111133"},[a("span",{id:"p91289111133"}),a("span",{id:"p91289111133"}),e("否")])]),a("td",{class:"cellrowborder",valign:"top",width:"56.686868686868685%",headers:"mcps1.1.4.1.3 "},[a("p",{id:"p10128171112137"},[a("span",{id:"p10128171112137"}),a("span",{id:"p10128171112137"}),e("编译生成动态链接库。")])])]),a("tr",{id:"row512881114134"},[a("td",{class:"cellrowborder",valign:"top",width:"33.63636363636363%",headers:"mcps1.1.4.1.1 "},[a("p",{id:"p1912841161317"},[a("span",{id:"p1912841161317"}),a("span",{id:"p1912841161317"}),e("-lib")])]),a("td",{class:"cellrowborder",valign:"top",width:"9.676767676767676%",headers:"mcps1.1.4.1.2 "},[a("p",{id:"p212813114130"},[a("span",{id:"p212813114130"}),a("span",{id:"p212813114130"}),e("否")])]),a("td",{class:"cellrowborder",valign:"top",width:"56.686868686868685%",headers:"mcps1.1.4.1.3 "},[a("p",{id:"p612811111131"},[a("span",{id:"p612811111131"}),a("span",{id:"p612811111131"}),e("编译生成静态链接库。")])])]),a("tr",{id:"row1912891101318"},[a("td",{class:"cellrowborder",valign:"top",width:"33.63636363636363%",headers:"mcps1.1.4.1.1 "},[a("p",{id:"p81287111130"},[a("span",{id:"p81287111130"}),a("span",{id:"p81287111130"}),e("-g")])]),a("td",{class:"cellrowborder",valign:"top",width:"9.676767676767676%",headers:"mcps1.1.4.1.2 "},[a("p",{id:"p1212811115139"},[a("span",{id:"p1212811115139"}),a("span",{id:"p1212811115139"}),e("否")])]),a("td",{class:"cellrowborder",valign:"top",width:"56.686868686868685%",headers:"mcps1.1.4.1.3 "},[a("p",{id:"p41281811131314"},[a("span",{id:"p41281811131314"}),a("span",{id:"p41281811131314"}),e("编译时增加调试信息。")])])]),a("tr",{id:"row1128911201315"},[a("td",{class:"cellrowborder",valign:"top",width:"33.63636363636363%",headers:"mcps1.1.4.1.1 "},[a("p",{id:"p2128161131317"},[a("span",{id:"p2128161131317"}),a("span",{id:"p2128161131317"}),e("-fPIC")])]),a("td",{class:"cellrowborder",valign:"top",width:"9.676767676767676%",headers:"mcps1.1.4.1.2 "},[a("p",{id:"p112871121316"},[a("span",{id:"p112871121316"}),a("span",{id:"p112871121316"}),e("否")])]),a("td",{class:"cellrowborder",valign:"top",width:"56.686868686868685%",headers:"mcps1.1.4.1.3 "},[a("p",{id:"p1912817114131"},[a("span",{id:"p1912817114131"}),a("span",{id:"p1912817114131"}),e("告知编译器产生位置无关代码。")])])]),a("tr",{id:"row3128151113131"},[a("td",{class:"cellrowborder",valign:"top",width:"33.63636363636363%",headers:"mcps1.1.4.1.1 "},[a("p",{id:"p312831171319"},[a("span",{id:"p312831171319"}),a("span",{id:"p312831171319"}),e("-O")])]),a("td",{class:"cellrowborder",valign:"top",width:"9.676767676767676%",headers:"mcps1.1.4.1.2 "},[a("p",{id:"p14128131114137"},[a("span",{id:"p14128131114137"}),a("span",{id:"p14128131114137"}),e("否")])]),a("td",{class:"cellrowborder",valign:"top",width:"56.686868686868685%",headers:"mcps1.1.4.1.3 "},[a("p",{id:"p1412851101319"},[a("span",{id:"p1412851101319"}),a("span",{id:"p1412851101319"}),e("用于指定编译器的优化级别，当前支持-O3，-O2，-O0。")])])]),a("tr",{id:"row118491817141416"},[a("td",{class:"cellrowborder",valign:"top",width:"33.63636363636363%",headers:"mcps1.1.4.1.1 "},[a("p",{id:"p1565513583296"},[a("span",{id:"p1565513583296"}),a("span",{id:"p1565513583296"}),e("--cce-aicpu-L")])]),a("td",{class:"cellrowborder",valign:"top",width:"9.676767676767676%",headers:"mcps1.1.4.1.2 "},[a("p",{id:"p2655195822910"},[a("span",{id:"p2655195822910"}),a("span",{id:"p2655195822910"}),e("否")])]),a("td",{class:"cellrowborder",valign:"top",width:"56.686868686868685%",headers:"mcps1.1.4.1.3 "},[a("p",{id:"p365515813296"},[a("span",{id:"p365515813296"}),a("span",{id:"p365515813296"}),e("指定AI CPU Device依赖的库路径。")])])]),a("tr",{id:"row49581340171415"},[a("td",{class:"cellrowborder",valign:"top",width:"33.63636363636363%",headers:"mcps1.1.4.1.1 "},[a("p",{id:"p196884185304"},[a("span",{id:"p196884185304"}),a("span",{id:"p196884185304"}),e("--cce-aicpu-l")])]),a("td",{class:"cellrowborder",valign:"top",width:"9.676767676767676%",headers:"mcps1.1.4.1.2 "},[a("p",{id:"p17688161833011"},[a("span",{id:"p17688161833011"}),a("span",{id:"p17688161833011"}),e("否")])]),a("td",{class:"cellrowborder",valign:"top",width:"56.686868686868685%",headers:"mcps1.1.4.1.3 "},[a("p",{id:"p1688918113011"},[a("span",{id:"p1688918113011"}),a("span",{id:"p1688918113011"}),e("指定AI CPU Device依赖的库。")])])])])]),a("h2",{id:"CMake方式编译"},[e("CMake方式编译"),a("span",{id:"section1121825118533"}),a("a",{class:"header-anchor",href:"#CMake方式编译"},"​")]),a("p",null,"项目中可以使用CMake来更简便地使用毕昇编译器编译AI CPU算子，生成可执行文件、动态库、静态库或二进制文件。"),a("p",null,[e("仍以"),a("a",{href:"#section153291123460"},"通过bisheng命令行编译"),e("中介绍的Hello World打印样例为例，除了代码实现文件，还需要在工程目录下准备一个CMakeLists.txt。")]),a("div",{class:"code-block"},[a("div",{class:"code-header"},[a("span",{class:"lang-label"},"Text"),a("button",{class:"copy-btn",title:"复制代码"},[a("svg",{width:"16",height:"16",viewBox:"0 0 16 16"},[a("path",{d:"M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"}),a("path",{d:"M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"})])])]),a("pre",{class:"highlight"},[a("code",null,`├── hello_world.aicpu // AI CPU算子核函数（Kernel）定义
├── main.asc // AI CPU算子核函数（Kernel）调用
└── CMakeLists.txt
`)])]),a("p",null,"CMakeLists.txt内容如下："),a("div",{class:"code-block"},[a("div",{class:"code-header"},[a("span",{class:"lang-label"},"Text"),a("button",{class:"copy-btn",title:"复制代码"},[a("svg",{width:"16",height:"16",viewBox:"0 0 16 16"},[a("path",{d:"M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"}),a("path",{d:"M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"})])])]),a("pre",{class:"highlight"},[a("code",null,`cmake_minimum_required(VERSION 3.16)
# 1、find_package()是CMake中用于查找和配置Ascend C编译工具链的命令
find_package(ASC REQUIRED) 
find_package(AICPU REQUIRED) 

# 2、指定项目支持的语言包括ASC、AICPU和CXX，ASC表示支持使用毕昇编译器对Ascend C编程语言进行编译，AI CPU表示支持使用毕昇编译器对AI CPU算子进行编译
project(kernel_samples LANGUAGES ASC AICPU CXX)

# 3、使用CMake接口编译可执行文件
add_executable(demo
    hello_world.aicpu
    main.asc
)

#4、由于存在ASC与AI CPU语言，需要指定链接器
set_target_properties(demo PROPERTIES LINKER_LANGUAGE ASC)  # 指定链接使用语言

target_compile_options(demo PRIVATE
    # --npu-arch用于指定NPU的架构版本，dav-后为架构版本号
    # <COMPILE_LANGUAGE:ASC>:表明该编译选项仅对语言ASC生效
    $<$<COMPILE_LANGUAGE:ASC>:--npu-arch=dav-2201>
)
`)])]),a("p",null,[e("各产品型号对应的架构版本号请通过"),a("a",{href:"../../language_extension/simd_builtin_keywords.html#npu-arch"},"对应关系表"),e("进行查询。")]),a("p",null,"如果需要CMake编译编译生成动态库、静态库，下面提供了更详细具体的编译示例："),a("ul",null,[a("li",null,[a("p",null,"编译.cpp文件生成动态库"),a("div",{class:"code-block"},[a("div",{class:"code-header"},[a("span",{class:"lang-label"},"Text"),a("button",{class:"copy-btn",title:"复制代码"},[a("svg",{width:"16",height:"16",viewBox:"0 0 16 16"},[a("path",{d:"M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"}),a("path",{d:"M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"})])])]),a("pre",{class:"highlight"},[a("code",null,`# 将.cpp文件置为ASC属性，启用Ascend C语言进行编译
set_source_files_properties(
    add_custom_base.cpp 
    sub_custom_base.cpp
    PROPERTIES LANGUAGE ASC
)

# 将.cpp文件置为AICPU属性，支持AI CPU算子编译
set_source_files_properties(
    aicpu_kernel.cpp
    PROPERTIES LANGUAGE AICPU
)

add_library(kernel_lib SHARED
    add_custom_base.cpp 
    sub_custom_base.cpp
    aicpu_kernel.cpp # 支持AI CPU算子与AI Core算子一起打包为动态库
)

target_compile_options(kernel_lib PRIVATE
    $<$<COMPILE_LANGUAGE:ASC>:--npu-arch=dav-2201>
)

# AI CPU算子编译时，需要手动链接以下依赖库（若指定链接语言为ASC时，不需要手动链接以下库）
target_link_libraries(kernel_lib PRIVATE
    ascendc_runtime
    profapi
    unified_dlog
    ascendcl
    runtime
    c_sec
    mmpa
    error_manager
    ascend_dump
)

add_executable(demo
    main.asc
)
target_link_libraries(demo PRIVATE
    kernel_lib
)
`)])])]),a("li",null,[a("p",null,"编译.asc文件与.aicpu文件生成静态库"),a("div",{class:"code-block"},[a("div",{class:"code-header"},[a("span",{class:"lang-label"},"Text"),a("button",{class:"copy-btn",title:"复制代码"},[a("svg",{width:"16",height:"16",viewBox:"0 0 16 16"},[a("path",{d:"M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"}),a("path",{d:"M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"})])])]),a("pre",{class:"highlight"},[a("code",null,`# .asc文件会默认启用Ascend C语言进行编译，.aicpu文件会默认启用AICPU语言进行编译，不需要通过set_source_files_properties进行设置
add_library(kernel_lib STATIC
    add_custom_base.asc 
    sub_custom_base.asc
    aicpu_kernel.aicpu  # 可支持AI CPU算子与AI Core算子一起打包为静态库
)

target_compile_options(kernel_lib PRIVATE
    $<$<COMPILE_LANGUAGE:ASC>:--npu-arch=dav-2201>
)

add_executable(demo
    main.asc
)
target_link_libraries(demo PRIVATE
    kernel_lib
)
`)])])])])])],-1)])])}const g=l(s,[["render",d]]);export{_ as __pageData,g as default};
