import{_ as t,o as n,a as e,b as a}from"./app.C41L12d5.js";const r=JSON.parse('{"title":"","description":"","frontmatter":{"breadcrumbs":[{"text":"Ascend C算子开发指南","link":"/guide/getting_started/ascend_c_overview_and_learning_path"},{"text":"编程指南","link":"/guide/programming_guide/document_structure"},{"text":"高级编程","link":"/guide/programming_guide/advanced_programming/advanced_programming"},{"text":"算子入图开发","link":"/guide/programming_guide/advanced_programming/operator_graph_development/overview"},{"text":"开启Tiling下沉","link":"/guide/programming_guide/advanced_programming/operator_graph_development/enable_tiling_sink"}]},"headers":[],"relativePath":"guide/programming_guide/advanced_programming/operator_graph_development/enable_tiling_sink.md","filePath":"guide/programming_guide/advanced_programming/operator_graph_development/enable_tiling_sink.md","lastUpdated":1787050286000}'),l={name:"guide/programming_guide/advanced_programming/operator_graph_development/enable_tiling_sink.md"};function s(o,i,p,g,c,_){return n(),e("div",null,[...i[0]||(i[0]=[a(`<div><article class="markdown-body"><h1>开启Tiling下沉<span id="ZH-CN_TOPIC_0000002130625528"></span></h1><p>在静态图模式下，可以通过<strong>整图下沉</strong>优化调度性能。将完整的计算图一次性下发至Device侧，后续执行则无需Host参与，由Device自主完成计算，从而减少Host-Device交互开销，提升执行效率。部分算子的Tiling计算依赖运行时输入的具体数值（<strong>Tiling值依赖</strong>），需在执行时动态计算Tiling参数。针对该场景，可采用<strong>Tiling下沉</strong>优化方案：将Tiling计算下沉至Device侧的AI CPU上执行，从而实现计算全程在Device侧高效完成。</p><div class="callout callout-note"><p class="callout-title"><svg class="callout-icon" viewBox="0 0 16 16" width="16" height="16"><path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8Zm8-6.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13ZM6.5 7.75A.75.75 0 0 1 7.25 7h1a.75.75 0 0 1 .75.75v2.75h.25a.75.75 0 0 1 0 1.5h-2a.75.75 0 0 1 0-1.5h.25v-2h-.25a.75.75 0 0 1-.75-.75ZM8 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"></path></svg>说明</p><ul><li>基于新版本CANN包（支持Tiling下沉特性）编译生成的Tiling下沉算子，不兼容旧版CANN（不支持Tiling下沉特性）运行环境。</li><li>当前仅融合算子（矢量计算和矩阵计算融合）支持进行Tiling下沉。</li><li>Tiling下沉功能仅支持如下产品型号： <div data-filter="A3"><ul><li>Atlas A3 训练系列产品/Atlas A3 推理系列产品</li></ul></div><div data-filter="910b"><ul><li>Atlas A2 训练系列产品/Atlas A2 推理系列产品</li></ul></div><div data-filter="950"><ul><li>Ascend 950PR/Ascend 950DT，暂不支持</li></ul></div></li></ul></div><p>自定义算子开启Tiling下沉的步骤如下，完整样例请参考<a href="https://gitcode.com/cann/asc-devkit/tree/master/examples/01_simd_cpp_api/02_features/99_acl_based/00_acl_compilation/custom_op">Tiling下沉算子样例</a>。</p><p>Tiling下沉场景下，算子工程的op_host目录结构如下，Tiling实现文件需单独放在一个cpp文件中，示例中为add_custom_tiling_sink_tiling.cpp。</p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>├── op_host
│   ├── add_custom_tiling_sink.cpp // 算子原型定义、InferShape、InferDataType实现
│   ├── add_custom_tiling_sink_tiling.cpp // Tiling函数实现
│   ├── add_custom_tiling_sink_tiling.h // TilingData结构体定义、Tiling函数声明
│   └── CMakeLists.txt
</code></pre></div><p>以AddCustom算子为例，讲解关键代码文件的具体实现方法如下：</p><ul><li><p>在add_custom_tiling_sink_tiling.h中进行Tiling实现函数的声明</p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>#ifndef ADD_CUSTOM_TILING_SINK_TILING_H
#define ADD_CUSTOM_TILING_SINK_TILING_H
#include &quot;register/op_def_registry.h&quot;
namespace optiling {
    ge::graphStatus AddCustomSinkTilingFunc(gert::TilingContext* context); // Tiling函数声明
} // namespace optiling
#endif // ADD_CUSTOM_TILING_SINK_TILING_H
</code></pre></div></li><li><p>算子原型定义、InferShape、InferDataType实现文件add_custom_tiling_sink.cpp，需包含add_custom_tiling_sink_tiling.h，进行Tiling函数和算子原型定义的关联。</p><p>Tiling下沉仅适用于存在Tiling值依赖（即当InferShape不依赖输入值，仅Tiling计算需要输入值）且算子输入为非Const类型的场景，本示例中的输入y通过ValueDepend配置了非Const类型的Tiling值依赖。</p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>#include &quot;add_custom_tiling_sink_tiling.h&quot; // 包含头文件

// ...

namespace ops {
class AddCustomTilingSink : public OpDef {
public:
    explicit AddCustomTilingSink(const char *name) : OpDef(name)
    {
        this-&gt;Input(&quot;x&quot;)
            .ParamType(REQUIRED)
            .DataType({ge::DT_FLOAT})
            .Format({ge::FORMAT_ND});
        this-&gt;Input(&quot;y&quot;)
            .ParamType(REQUIRED)
            .DataType({ge::DT_FLOAT})
            .Format({ge::FORMAT_ND})
            .ValueDepend(OPTIONAL, DependScope::TILING); // 表示输入y为Tiling值依赖
        this-&gt;Output(&quot;z&quot;)
            .ParamType(REQUIRED)
            .DataType({ge::DT_FLOAT})
            .Format({ge::FORMAT_ND});

        this-&gt;SetInferShape(ge::InferShape).SetInferDataType(ge::InferDataType);

        this-&gt;AICore().SetTiling(optiling::AddCustomSinkTilingFunc); // Tiling函数和算子原型定义的关联
        
        // 请替换为实际的昇腾AI处理器型号
        this-&gt;AICore().AddConfig(&quot;ascendxxx&quot;);
    }
};
OP_ADD(AddCustomTilingSink);
} // namespace ops
</code></pre></div></li><li><p>Tiling函数的实现文件add_custom_tiling_sink_tiling.cpp</p><ul><li>Tiling函数中通过判断值依赖InputTensor即输入y的数据指针是否为空指针来确认当前是否处于编译期。Tiling下沉场景，编译期需要为算子分配内存，包括其所需的workspace。为了保证运行时的高效性，编译期应根据算子的执行需求，合理设置所需的workspace最大值，以避免内存不足或浪费。AddCustomTilingSink样例不需要用户workspace，不涉及设置，此处设置为固定值仅作为示例。</li><li>完成下沉Tiling函数注册：包含device_op_impl_registry.h头文件，使用宏DEVICE_IMPL_OP_OPTILING进行注册。</li></ul><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>#include &quot;../../op_kernel/add_custom_tiling_sink/add_custom_tiling_sink_tiling_struct.h&quot;
#include &quot;add_custom_tiling_sink_tiling.h&quot;
#include &quot;register/device_op_impl_registry.h&quot;
#include &quot;tiling/platform/platform_ascendc.h&quot;
namespace optiling {
static constexpr uint32_t NUM_BLOCKS = 8;
static constexpr uint32_t TILE_NUM = 3;
static constexpr size_t MAX_WORKSPACE_SIZE = 32; // 算子所需用户workspace空间最大值，AddCustomTilingSink算子本身逻辑无需用户workspace空间，此处设置为固定值仅作为示例
static constexpr size_t DEFAULT_WORKSPACE_SIZE = 0;
ge::graphStatus AddCustomSinkTilingFunc(gert::TilingContext *context)
{
    TilingSinkTilingData *tiling = context-&gt;GetTilingData&lt;TilingSinkTilingData&gt;();
    uint32_t totalLength = context-&gt;GetInputTensor(0)-&gt;GetShapeSize();
    context-&gt;SetSimdNumBlocks(NUM_BLOCKS);
    tiling-&gt;totalLength = totalLength;
    tiling-&gt;tileNum = TILE_NUM;
    size_t *currentWorkspace = context-&gt;GetWorkspaceSizes(1);
    auto platform = platform_ascendc::PlatformAscendC(context-&gt;GetPlatformInfo());
    size_t sysWorkspaceSize = platform.GetLibApiWorkSpaceSize();
    currentWorkspace[0] = sysWorkspaceSize + DEFAULT_WORKSPACE_SIZE; // 设置运行时workspace大小，此处为系统workspace空间 + 用户workspace空间
    if (context-&gt;GetInputTensor(1) != nullptr &amp;&amp; context-&gt;GetInputTensor(1)-&gt;GetData&lt;float&gt;() == nullptr) {
        // 通过判断值依赖InputTensor的Data是否为空指针来确认当前是否处于编译期。
        // Tiling下沉场景，编译期需要为算子分配内存，包括其所需的workspace。为了保证运行时的高效性，编译期应根据算子的执行需求，合理设置所需的workspace最大值，以避免内存不足或浪费。
        currentWorkspace[0] = sysWorkspaceSize + MAX_WORKSPACE_SIZE; // 设置编译期workspace大小，此处为系统workspace空间 + 用户workspace空间最大值
    }
    return ge::GRAPH_SUCCESS;
}
DEVICE_IMPL_OP_OPTILING(AddCustomTilingSink).Tiling(optiling::AddCustomSinkTilingFunc); // 下沉tiling函数注册
} // namespace optiling
</code></pre></div></li><li><p>算子核函数（Kernel）实现</p><p>当前Tiling下沉仅支持融合算子，为了模拟融合算子场景，通过<a href="../../../../api/SIMD-API/basic_api/Kernel-Tiling/set_Kernel_type.html">KERNEL_TASK_TYPE_DEFAULT</a>接口强制指定算子在AIC、AIV混合场景运行。</p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>extern &quot;C&quot; __global__ __aicore__ void add_custom_tiling_sink(GM_ADDR x, GM_ADDR y, GM_ADDR z, GM_ADDR workspace, GM_ADDR tiling)
{
    REGISTER_TILING_DEFAULT(TilingSinkTilingData);
    GET_TILING_DATA(tiling_data, tiling);
    KERNEL_TASK_TYPE_DEFAULT(KERNEL_TYPE_MIX_AIC_1_2); // 将算子强制指定在AIC、AIV混合场景运行，模拟融合算子场景
    if ASCEND_IS_AIC {
        return;
    }
    AscendC::KernelAdd op;
    op.Init(x, y, z, tiling_data.totalLength, tiling_data.tileNum);
    op.Process();
}
</code></pre></div></li><li><p>修改op_host目录下的编译脚本CMakeLists.txt，添加Tiling下沉编译命令。具体代码如下所示：</p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>npu_op_device_tiling_library(cust_opmaster SHARED  # 任务名称，固定为cust_opmaster
    add_custom_tiling_sink/add_custom_tiling_sink_tiling.cpp  # Tiling函数实现代码源文件
)
</code></pre></div></li></ul></article></div>`,1)])])}const h=t(l,[["render",s]]);export{r as __pageData,h as default};
