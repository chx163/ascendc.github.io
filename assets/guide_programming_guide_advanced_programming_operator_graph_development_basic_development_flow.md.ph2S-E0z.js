import{_ as t,o as p,a as s,c as e,d as a}from"./app.C41L12d5.js";const h="/ascendc.github.io/assets/shape_dtype.Cw9KZlC3.png",g=JSON.parse('{"title":"","description":"","frontmatter":{"breadcrumbs":[{"text":"Ascend C算子开发指南","link":"/guide/getting_started/ascend_c_overview_and_learning_path"},{"text":"编程指南","link":"/guide/programming_guide/document_structure"},{"text":"高级编程","link":"/guide/programming_guide/advanced_programming/advanced_programming"},{"text":"算子入图开发","link":"/guide/programming_guide/advanced_programming/operator_graph_development/overview"},{"text":"基本开发流程","link":"/guide/programming_guide/advanced_programming/operator_graph_development/basic_development_flow"}]},"headers":[],"relativePath":"guide/programming_guide/advanced_programming/operator_graph_development/basic_development_flow.md","filePath":"guide/programming_guide/advanced_programming/operator_graph_development/basic_development_flow.md","outlineHeaders":[{"level":2,"title":"datatype推导","slug":"datatype推导","link":"#datatype推导"},{"level":2,"title":"shape推导","slug":"shape推导","link":"#shape推导"},{"level":2,"title":"InferShapeRange实现","slug":"InferShapeRange实现","link":"#InferShapeRange实现"},{"level":2,"title":"InferShape时获取属性、输入","slug":"InferShape时获取属性、输入","link":"#InferShape时获取属性、输入"},{"level":2,"title":"数据依赖","slug":"数据依赖","link":"#数据依赖"}],"lastUpdated":1786949923000}'),l={name:"guide/programming_guide/advanced_programming/operator_graph_development/basic_development_flow.md"};function i(r,n,o,c,d,_){return p(),s("div",null,[...n[0]||(n[0]=[e("div",null,[e("article",{class:"markdown-body"},[e("h1",null,[a("基本开发流程"),e("span",{id:"ZH-CN_TOPIC_0000001985333472"})]),e("p",null,[a("该开发流程以"),e("a",{href:"../aclnn_operator_development/overview.html"},"工程化算子开发"),a("为基础，除了需要提供工程化算子开发中的算子实现文件外，还需要额外交付算子入图的代码文件。本节仅提供算子入图代码文件的开发指导。")]),e("p",null,"假设下图是我们需要使用的网络模型，您可能会想直接逐个算子调用，根据输入tensor得到输出tensor就可以完成网络的运行，但在图模式场景下，实际的网络模型生成过程中，会先进行tensor shape以及datatype的推导。这样可以让我们在图执行之前，就知道各tensor的数据类型和形状，提前校验其正确性；同时提前推理出算子的输出张量描述，包括张量的形状、数据类型及数据排布格式等信息，算子构图准备阶段就可以为所有的张量静态分配内存，避免动态内存分配带来的开销。"),e("p",null,"下面的网络模型经过shape和datatype推导之后，可以得到灰色底纹框中的推导信息："),e("p",null,[e("strong",null,"图1"),a(" shape与datatype推导示意图"),e("span",{id:"fig1729122183718"}),e("br"),e("img",{src:h,alt:"",title:"shape与datatype推导示意图"})]),e("p",null,"除了tiling实现外，算子入图时需要额外提供的实现代码有以下几种："),e("ul",null,[e("li",null,"datatype推导：根据算子的输入datatype、算子逻辑及算子属性等信息，推理出算子的输出张量datatype。"),e("li",null,"shape推导：根据算子的输入shape、算子逻辑及算子属性等信息，推理出算子的输出张量shape。"),e("li",null,"ShapeRange推导：编译时无法推导输出shape，只能推导输出shape range，执行完才能得出输出shape。在下发时需要按照输出shape range来申请最大输出内存，该类算子需要提供ShapeRange推导函数。"),e("li",null,"声明数据依赖：部分算子在InferShape时，需要依赖某个输入的具体值才可以进行，这类算子被称为“数据依赖算子”，对应的输入被称为“数据依赖输入”。该类算子在注册时，需要声明其数据依赖输入。")]),e("p",null,"下表列出了不同类型的算子对上述实现代码的要求。"),e("p",null,[e("strong",null,"表1"),a(" 不同的类型的算子对入图实现代码的要求")]),e("p",null,[e("span",{id:"table772183710452"})]),e("table",null,[e("thead",{align:"left"},[e("tr",{id:"row1372110374457"},[e("th",{class:"cellrowborder",valign:"top",width:"35.8%",id:"mcps1.2.3.1.1"},[e("p",{id:"p572263714456"},[e("span",{id:"p572263714456"}),e("span",{id:"p572263714456"}),a("分类")])]),e("th",{class:"cellrowborder",valign:"top",width:"64.2%",id:"mcps1.2.3.1.2"},[e("p",{id:"p117222376454"},[e("span",{id:"p117222376454"}),e("span",{id:"p117222376454"}),a("对入图实现代码的要求")])])])]),e("tbody",null,[e("tr",{id:"row1672217377453"},[e("td",{class:"cellrowborder",valign:"top",width:"35.8%",headers:"mcps1.2.3.1.1 "},[e("p",{id:"p197221937114512"},[e("span",{id:"p197221937114512"}),e("span",{id:"p197221937114512"}),a("根据输入shape可以推导出输出shape。")])]),e("td",{class:"cellrowborder",valign:"top",width:"64.2%",headers:"mcps1.2.3.1.2 "},[e("span",{id:"ul126301833144813"}),e("span",{id:"ul126301833144813"}),e("ul",{id:"ul126301833144813"},[e("li",null,"shape推导"),e("li",null,"datatype推导")])])]),e("tr",{id:"row1472216375456"},[e("td",{class:"cellrowborder",valign:"top",width:"35.8%",headers:"mcps1.2.3.1.1 "},[e("p",{id:"p87221437114518"},[e("span",{id:"p87221437114518"}),e("span",{id:"p87221437114518"}),a("依赖输入的value才能推导出输出shape，即数据依赖算子。如Reshape算子，依赖shape输入的value才能推导出输出shape。")])]),e("td",{class:"cellrowborder",valign:"top",width:"64.2%",headers:"mcps1.2.3.1.2 "},[e("span",{id:"ul51966562363"}),e("span",{id:"ul51966562363"}),e("ul",{id:"ul51966562363"},[e("li",null,"shape推导"),e("li",null,"datatype推导"),e("li",null,"声明数据依赖")])])]),e("tr",{id:"row16722103711454"},[e("td",{class:"cellrowborder",valign:"top",width:"35.8%",headers:"mcps1.2.3.1.1 "},[e("p",{id:"p1272233734515"},[e("span",{id:"p1272233734515"}),e("span",{id:"p1272233734515"}),a("编译时无法推导输出shape，只能推导输出shape range，执行完才能得出输出shape。")])]),e("td",{class:"cellrowborder",valign:"top",width:"64.2%",headers:"mcps1.2.3.1.2 "},[e("span",{id:"ul71712171414"}),e("span",{id:"ul71712171414"}),e("ul",{id:"ul71712171414"},[e("li",null,"Shape推导（必选）"),e("li",null,"DataType推导（必选）"),e("li",null,"ShapeRange推导（必选）"),e("li",null,"声明数据依赖（按需）")])])])])]),e("p",null,"实际开发时通过固定的datatype和shape推导原型实现推导函数，然后再通过SetInferShape、SetInferDataType接口来关联对应的shape推导函数，样例如下。"),e("div",{class:"code-block"},[e("div",{class:"code-header"},[e("span",{class:"lang-label"},"Text"),e("button",{class:"copy-btn",title:"复制代码"},[e("svg",{width:"16",height:"16",viewBox:"0 0 16 16"},[e("path",{d:"M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"}),e("path",{d:"M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"})])])]),e("pre",{class:"highlight"},[e("code",null,`namespace ge {
static graphStatus InferShape(gert::InferShapeContext *context)
{
    ...
    return GRAPH_SUCCESS;
}

static graphStatus InferDataType(gert::InferDataTypeContext *context)
{
    ...
    return ge::GRAPH_SUCCESS;
}
} // namespace ge


namespace ops {
class AddCustom : public OpDef {
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
        // 根据用户的算子调用方式决定需不需要注册图模式调用方式下需要
        this->SetInferShape(ge::InferShape);
        this->SetInferShapeRange(ge::InferShapeRange);
        this->SetInferDataType(ge::InferDataType);  
        this->AICore()
            .SetTiling(optiling::TilingFunc);
        // 请替换为实际的昇腾AI处理器型号
        this->AICore().AddConfig("ascendxxx");
    }
};
OP_ADD(AddCustom);
} // namespace ops
`)])]),e("h2",{id:"datatype推导"},[a("datatype推导"),e("span",{id:"section1145010781013"}),e("a",{class:"header-anchor",href:"#datatype推导"},"​")]),e("p",null,"以AddCustom算子为例，InferDataType的实现如下所示。该样例中输出tensor的数据类型与输入tensor的数据类型相同，所以直接将任意一个输入tensor的数据类型赋给输出tensor即可。"),e("div",{class:"code-block"},[e("div",{class:"code-header"},[e("span",{class:"lang-label"},"Text"),e("button",{class:"copy-btn",title:"复制代码"},[e("svg",{width:"16",height:"16",viewBox:"0 0 16 16"},[e("path",{d:"M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"}),e("path",{d:"M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"})])])]),e("pre",{class:"highlight"},[e("code",null,`namespace ge {
static graphStatus InferDataType(gert::InferDataTypeContext* context)
{
    const auto inputDataType = context->GetInputDataType(0);
    context->SetOutputDataType(0, inputDataType);
    return ge::GRAPH_SUCCESS;
}
} // namespace ge
`)])]),e("p",null,"如下示例则给出了更灵活的datatype推导样例，当输入的数据类型为DT_INT4时，其输出的数据类型为DT_INT32。"),e("div",{class:"code-block"},[e("div",{class:"code-header"},[e("span",{class:"lang-label"},"Text"),e("button",{class:"copy-btn",title:"复制代码"},[e("svg",{width:"16",height:"16",viewBox:"0 0 16 16"},[e("path",{d:"M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"}),e("path",{d:"M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"})])])]),e("pre",{class:"highlight"},[e("code",null,`ge::graphStatus InferDataTypeForFoo(gert::InferDataTypeContext* context) {

    if (context->GetInputDataType(0) == DT_INT4) {
        context->SetOutputDataType(0, DT_INT32);
    }
}
`)])]),e("h2",{id:"shape推导"},[a("shape推导"),e("span",{id:"section358205411221"}),e("a",{class:"header-anchor",href:"#shape推导"},"​")]),e("p",null,"简单的shape推导逻辑可以使用Follow接口来表达，比如输出shape和输入shape相同的情况。示例如下：输出“y1”Follow输入“x1”场景，指定Follow模式为SHAPE，此时“y1”的shape将会和“x1”保持一致。"),e("div",{class:"code-block"},[e("div",{class:"code-header"},[e("span",{class:"lang-label"},"Text"),e("button",{class:"copy-btn",title:"复制代码"},[e("svg",{width:"16",height:"16",viewBox:"0 0 16 16"},[e("path",{d:"M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"}),e("path",{d:"M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"})])])]),e("pre",{class:"highlight"},[e("code",null,`this->Input("x1")
    .ParamType(REQUIRED)
    .DataType({ge::DT_FLOAT, ge::DT_FLOAT})
    .Format({ge::FORMAT_ND, ge::FORMAT_ND});
this->Input("x2")
    .ParamType(REQUIRED)
    .DataType({ge::DT_FLOAT, ge::DT_FLOAT})
    .Format({ge::FORMAT_ND, ge::FORMAT_ND});
this->Output("y1")
    .ParamType(REQUIRED)
    .DataType({ge::DT_FLOAT, ge::DT_FLOAT})
    .Format({ge::FORMAT_ND, ge::FORMAT_ND})
    .Follow("x1", FollowType::SHAPE);
`)])]),e("p",null,"无法在原型定义中通过Follow表达的情况需要开发者编写InferShape函数，InferShape函数的原型是固定的，如下示例，接受一个InferShapeContext作为输入，从此context上可以获取到输入、输出的shape指针等内容。输入shape为const类型，因此InferShape时，输入shape是只读、不允许修改的。InferShape成功后，返回ge::GRAPH_SUCCESS，其他返回值被认为推导失败。推导失败后，执行过程结束退出。"),e("p",null,"以ReShape算子为例，InferShape的实现如下所示。根据第1个输入（shape输入）的值，Reshape算子将第0个输入（x输入）的shape做变换，并输出到其第0个输出（y输出）上。Reshape的InferShape实现为："),e("div",{class:"code-block"},[e("div",{class:"code-header"},[e("span",{class:"lang-label"},"Text"),e("button",{class:"copy-btn",title:"复制代码"},[e("svg",{width:"16",height:"16",viewBox:"0 0 16 16"},[e("path",{d:"M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"}),e("path",{d:"M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"})])])]),e("pre",{class:"highlight"},[e("code",null,`ge::graphStatus InferShapeForReshape(InferShapeContext *context) {
const gert::Shape *x_shape = context->GetInputShape(0);        // 获取第0个输入的shape
const gert::Tensor *shape_tensor = context->GetInputTensor(1); // 获取第1个输入的tensor
gert::Shape *output_shape = context->GetOutputShape(0);
if (x_shape == nullptr || shape_tensor == nullptr || output_shape == nullptr) {
    // 防御式编程，不应该出现的场景，打印错误并返回失败
    return ge::GRAPH_FAILED;
}

auto reshape_size = static_cast<int32_t>(shape_tensor->GetShapeSize());
if (reshape_size < 1) {
    // 防御式编程，不应该出现的场景，打印错误并返回失败
    return ge::GRAPH_FAILED;
}

// 根据原型信息，Reshape的shape输入支持INT32与INT64两类，根据不同的类型进入对应的模板函数中做真正的shape变换操作
if (shape_tensor->GetDataType() == ge::DT_INT32) {
    int32_t *reshape_data = shape_tensor->GetData<int32_t>();
    return ReshapeInferShapeImpl<int32_t>(reshape_data, *x_shape, *output_shape, reshape_size);
} else {
    int64_t *reshape_data = shape_tensor->GetData<int64_t>();
    return ReshapeInferShapeImpl<int64_t>(reshape_data, *x_shape, *output_shape, reshape_size);
}
}
`)])]),e("p",null,"InferShapeContext public继承自ExtendedKernelContext，因此ExtendedKernelContext中提供的方法如获取算子type、name、属性等接口均可以在InferShapeContext实例中调用。"),e("div",{class:"callout callout-caution"},[e("p",{class:"callout-title"},[e("svg",{class:"callout-icon",viewBox:"0 0 16 16",width:"16",height:"16"},[e("path",{d:"M4.47.22A.749.749 0 0 1 5 0h6c.199 0 .389.079.53.22l4.25 4.25c.141.14.22.331.22.53v6a.749.749 0 0 1-.22.53l-4.25 4.25A.749.749 0 0 1 11 16H5a.749.749 0 0 1-.53-.22L.22 11.53A.749.749 0 0 1 0 11V5c0-.199.079-.389.22-.53Zm.84 1.28L1.5 5.31v5.38l3.81 3.81h5.38l3.81-3.81V5.31L10.69 1.5ZM8 4a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 8 4Zm0 8a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"})]),a("注意")]),e("ul",null,[e("li",null,"InferShape推导函数和Follow接口不能混用，即不支持部分输出采用Infershape推导、部分输出采用Follow推导的情况。若用户同时使用了InferShape函数和Follow接口，以用户的InferShape函数为准，需要保证在InferShape函数中能够推导出所有的输出shape。"),e("li",null,[a("为了效率考虑，调用InferShape函数时，框架不会为输出shape做初始化，因此，在InferShape函数中，可以认为输出是"),e("strong",null,"未初始化"),a("的状态。如果在InferShape时，希望通过Append方式操作输出shape，需要先将输出shape的DimNum清零，以防止出现未定义行为。")])])]),e("h2",{id:"InferShapeRange实现"},[a("InferShapeRange实现"),e("span",{id:"section1168614153115"}),e("a",{class:"header-anchor",href:"#InferShapeRange实现"},"​")]),e("p",null,"某些算子的输出Shape在计算完成后才能确定。比如unique算子，其Shape的推导逻辑如下："),e("p",null,"给定一维Tensor x，找到其中不重复的元素，返回去重后的Tensor y，输出idx与输入x大小相同，保存x每个元素在y中的索引。"),e("div",{class:"code-block"},[e("div",{class:"code-header"},[e("span",{class:"lang-label"},"Text"),e("button",{class:"copy-btn",title:"复制代码"},[e("svg",{width:"16",height:"16",viewBox:"0 0 16 16"},[e("path",{d:"M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"}),e("path",{d:"M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"})])])]),e("pre",{class:"highlight"},[e("code",null,`# tensor 'x' is [1, 1, 2, 4, 4, 4, 7, 8, 8]               x shape[9]
y, idx = unique(x)
y ==> [1, 2, 4, 7, 8]                                      y shape[5] 
idx ==> [0, 0, 1, 2, 2, 2, 3, 4, 4]                        idx shape[9]
`)])]),e("p",null,"由此可知，y的shape在编译时为[-1]，unique执行后shape才确定。"),e("p",null,"在入图场景执行时，需要在执行前分配输出内存，而内存的大小依赖于输出Shape和数据类型。对于此类算子，由于输出Shape在执行后才能确定，因此需要根据输出Shape的范围，按照最大范围申请输出内存，以确保有足够的空间供计算函数写入输出Tensor。"),e("p",null,"这种场景下，开发者需要自行实现InferShapeRange函数，来推导输出Shape的范围。下面以unique算子为例子，介绍InferShapeRange函数的实现方法。"),e("div",{class:"code-block"},[e("div",{class:"code-header"},[e("span",{class:"lang-label"},"Text"),e("button",{class:"copy-btn",title:"复制代码"},[e("svg",{width:"16",height:"16",viewBox:"0 0 16 16"},[e("path",{d:"M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"}),e("path",{d:"M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"})])])]),e("pre",{class:"highlight"},[e("code",null,`ge::graphStatus UniqueInferShapeRangeFunc(gert::InferShapeRangeContext *context) {
  // 取输入的shape range
  auto x_shape_range = context->GetInputShapeRange(0U);
  OPS_CHECK_NULL_WITH_CONTEXT(context, x_shape_range);
  OPS_CHECK_NULL_WITH_CONTEXT(context, x_shape_range->GetMax());
  OPS_CHECK_NULL_WITH_CONTEXT(context, x_shape_range->GetMin());

  // 开始计算y输出的shape range
  auto y_shape_range = context->GetOutputShapeRange(0U);
  OPS_CHECK_NULL_WITH_CONTEXT(context, y_shape_range);
  y_shape_range->GetMax()->SetDimNum(1); // 一维向量，rank为1
  y_shape_range->GetMin()->SetDimNum(1);

  auto x_max_shape = x_shape_range->GetMax();
  auto x_shape_dimnum = x_max_shape->GetDim(0); // x为一维Tensor，其shape为[n]， x_shape_dimnum表示x输入的元素个数n
  if (x_shape_dimnum == 1) {
    // 若x输入只有1个元素，不存在去重，y的shape轴最小最大均为1. 因此range为[1~1]
    y_shape_range->GetMax()->SetDim(0, 1);
    y_shape_range->GetMin()->SetDim(0, 1);
  } else {
    // 若x输入有0个元素，或者大于1个元素，去重后，y的元素个数最小为x的min，最大为x的max
    y_shape_range->GetMax()->SetDim(0, x_shape_dimnum);
    y_shape_range->GetMin()->SetDim(0, x_shape_range->GetMin());
  }

  // 开始计算输出idx的shape range
  // 输出idx表示x元素在y中的索引，其元素个数与x相等，因此shape range与x一致
  auto idx_shape_range = context->GetOutputShapeRange(1U);
  OPS_CHECK_NULL_WITH_CONTEXT(context, idx_shape_range);
  *(idx_shape_range->GetMax()) = *(x_shape_range->GetMax());
  *(idx_shape_range->GetMin()) = *(x_shape_range->GetMin());

  return ge::GRAPH_SUCCESS;
}
`)])]),e("h2",{id:"InferShape时获取属性、输入"},[a("InferShape时获取属性、输入"),e("span",{id:"section108351240182418"}),e("a",{class:"header-anchor",href:"#InferShape时获取属性、输入"},"​")]),e("p",null,"在InferShape、Tiling时，可以通过context实例获取算子IR属性值，所谓IR属性，是指在IR注册时定义的属性，以TransData算子为例："),e("div",{class:"code-block"},[e("div",{class:"code-header"},[e("span",{class:"lang-label"},"Text"),e("button",{class:"copy-btn",title:"复制代码"},[e("svg",{width:"16",height:"16",viewBox:"0 0 16 16"},[e("path",{d:"M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"}),e("path",{d:"M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"})])])]),e("pre",{class:"highlight"},[e("code",null,`namespace ops {
class TransData : public OpDef {
public:
    explicit TransData(const char *name) : OpDef(name)
    {
        this->Input("src")
             ...
        this->Output("dst")
             ...
        this->Attr("src_format")
            .AttrType(REQUIRED)
            .String();
        this->Attr("dst_format")
            .AttrType(REQUIRED)
            .String();
        this->Attr("group")
            .AttrType(OPTIONAL)           
           .Int(1);
        ...
    }
};
OP_ADD(TransData);
} // namespace ops
`)])]),e("p",null,"其原型定义中声明了src_format、dst_format、group三个属性，可以通过如下方式获取算子属性："),e("div",{class:"code-block"},[e("div",{class:"code-header"},[e("span",{class:"lang-label"},"Text"),e("button",{class:"copy-btn",title:"复制代码"},[e("svg",{width:"16",height:"16",viewBox:"0 0 16 16"},[e("path",{d:"M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"}),e("path",{d:"M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"})])])]),e("pre",{class:"highlight"},[e("code",null,`ge::graphStatus ExampleGetTransDataAttr(TilingContext *context) {
  // 获取所有属性
  const RuntimeAttrs *attrs = context->GetAttrs();
  ASSERT_NOT_NULL(attrs);
  
  // 按照在原型定义中的顺序，使用index获取属性，index从0开始计数
  const char *src_format = attrs->GetAttrPointer<char>(0);  // 获取src_format，src_format是第一个属性，因此index为0
  const char *dst_format = attrs->GetAttrPointer<char>(1);  // 获取dst_format，dst_format是第二个属性，因此index为1
  const int64_t group = attrs->GetAttrPointer<int64_t>(2);  // 获取group，group是第三个属性，因此index为2
  
  return ge::GRAPH_SUCCESS;
}
`)])]),e("p",null,"通过index而不是字符串name来索引输入输出，对于带有OPTIONAL、DYNAMIC类型输入的算子，可能出现实例化后，单纯通过index无法索引到具体输入的问题，以DynamicRNNV3算子为例："),e("div",{class:"code-block"},[e("div",{class:"code-header"},[e("span",{class:"lang-label"},"Text"),e("button",{class:"copy-btn",title:"复制代码"},[e("svg",{width:"16",height:"16",viewBox:"0 0 16 16"},[e("path",{d:"M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"}),e("path",{d:"M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"})])])]),e("pre",{class:"highlight"},[e("code",null,`namespace ops {
class DynamicRNNV3 : public OpDef {
public:
    explicit DynamicRNNV3(const char *name) : OpDef(name)
    {
        this->Input("x")
             .ParamType(REQUIRED)
             ...
        this->Input("w")
             .ParamType(REQUIRED)
             ...
        this->Input("b")
             .ParamType(REQUIRED)
             ...
        this->Input("seq_length")
             .ParamType(OPTIONAL)
             ...
        this->Input("init_h")
             .ParamType(OPTIONAL)
             ...
        this->Input("init_c")
             .ParamType(OPTIONAL)
             ...
        this->Input("wci")
             .ParamType(OPTIONAL)
             ...
        this->Input("wcf")
             .ParamType(OPTIONAL)
             ...
        this->Input("mask")
             .ParamType(OPTIONAL)
             ...
        this->Input("mask")
             .ParamType(OPTIONAL)
             ...
        this->Input("project")
             .ParamType(OPTIONAL)
             ...
       
        ...
    }
};
OP_ADD(DynamicRNNV3);
} // namespace ops
`)])]),e("p",null,"由于DynamicRNNV3算子有连续的多个optional输入，这导致init_h及其后面的输入的实例化后index都是不确定的，对于这种类型的算子，可以通过GetOptionalInputShape传入原型对应的index来获取对应的输入shape等数据，以InferShape为例："),e("div",{class:"code-block"},[e("div",{class:"code-header"},[e("span",{class:"lang-label"},"Text"),e("button",{class:"copy-btn",title:"复制代码"},[e("svg",{width:"16",height:"16",viewBox:"0 0 16 16"},[e("path",{d:"M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"}),e("path",{d:"M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"})])])]),e("pre",{class:"highlight"},[e("code",null,`ge::graphStatus InferShapeForDynamicRNNV3(InferShapeContext *context) {
  // 对于前两个输入，不受到optional或dynamic的影响，可以按照常规方法获取输入shape
  auto x_shape = context->GetInputShape(0);
  auto w_shape = context->GetInputShape(1);
  if (x_shape == nullptr || w_shape == nullptr) {
    return ge::GRAPH_FAILED;
  }

  int64_t state_size = 0;
  // 在原型定义上，project是第11个输入(从0开始计数)
  constexpr int64_t kProjectInputIndex = 11;

  // 受到前面optional输入影响的，project实例化后输入的index是不确定的，通过GetOptionalInputShape来获取对应的输入shape，
  // GetOptionalInputShape的入参为原型上对应的index
  auto project_shape = context->GetOptionalInputShape(kProjectInputIndex);
  if (project_shape != nullptr) {
    if (project_shape->GetDimNum() < 2) {
      return ge::GRAPH_FAILED;
    }
    state_size = project_shape->GetDim(1);
  }
  // 更多的infershape逻辑...
  return ge::GRAPH_SUCCESS;
}
`)])]),e("p",null,"对于dynamic类型的输入，实例化后的输入可能是一到多个，对于此类输入，获取方式为："),e("div",{class:"code-block"},[e("div",{class:"code-header"},[e("span",{class:"lang-label"},"Text"),e("button",{class:"copy-btn",title:"复制代码"},[e("svg",{width:"16",height:"16",viewBox:"0 0 16 16"},[e("path",{d:"M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"}),e("path",{d:"M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"})])])]),e("pre",{class:"highlight"},[e("code",null,`// ir_index：此输入在原型定义中的index，从0开始计数
// relative_index：该输入实例化后的相对index，从0开始计数，例如某个DYNAMIC_INPUT实例化了3个，要取第二个，那么relative_index = 1
auto shape = context->GetDynamicInputShape(ir_index, relative_index);
`)])]),e("p",null,"本节举例的获取optional、dynamic输入的方式，在InferShape、Tiling函数中均可以调用。"),e("h2",{id:"数据依赖"},[a("数据依赖"),e("span",{id:"section0610144611487"}),e("a",{class:"header-anchor",href:"#数据依赖"},"​")]),e("p",null,"一般来说，具备输入shape后，算子可以通过InferShape推导出输出shape。然而部分算子在InferShape时，需要依赖某个输入的具体值才可以进行，这类算子被称为“数据依赖算子”，对应的输入被称为“数据依赖输入”。以Reshape算子为例，其依据shape输入的描述，对输入的shape做调整，因此Reshape算子依赖shape输入的值。这类算子需要在原型定义时通过ValueDepend接口声明对应的输入为数据依赖输入。"),e("div",{class:"code-block"},[e("div",{class:"code-header"},[e("span",{class:"lang-label"},"Text"),e("button",{class:"copy-btn",title:"复制代码"},[e("svg",{width:"16",height:"16",viewBox:"0 0 16 16"},[e("path",{d:"M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"}),e("path",{d:"M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"})])])]),e("pre",{class:"highlight"},[e("code",null,`namespace ops {
class Reshape : public OpDef {
public:
    explicit Reshape(const char *name) : OpDef(name)
    {
        ...
        this->Input("shape")
             .ParamType(REQUIRED)
             ...
             .ValueDepend(REQUIRED) // 声明ReShape算子的shape输入为数据依赖输入
        ...
    }
};
OP_ADD(Reshape);
} // namespace ops
`)])]),e("p",null,"根据第1个输入（shape输入）的值，Reshape算子将第0个输入（x输入）的shape做变换，并输出到其第0个输出（y输出）上。Reshape的InferShape实现为："),e("div",{class:"code-block"},[e("div",{class:"code-header"},[e("span",{class:"lang-label"},"Text"),e("button",{class:"copy-btn",title:"复制代码"},[e("svg",{width:"16",height:"16",viewBox:"0 0 16 16"},[e("path",{d:"M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"}),e("path",{d:"M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"})])])]),e("pre",{class:"highlight"},[e("code",null,`// shape变换具体实现
template<typename T>
ge::graphStatus ReshapeInferShapeImpl(const T *reshape_dims, const gert::Shape &x_shape, gert::Shape &output_shape, int32_t reshape_rank) {
    constexpr T UNKNOWN_DIM = -1;
    // 将算子输出的维度数设置为reshape后的维度数reshape_rank
    output_shape.SetDimNum(reshape_rank);
    auto x_shape_size = x_shape.GetShapeSize();
    int64_t output_shapesize = 1;
    size_t unknown_dim_idx = std::numeric_limits<size_t>::max();
    for (int32_t i = 0; i < reshape_rank; i++) {
        if (reshape_dims[i] != UNKNOWN_DIM) {  // reshape后某一轴的维度值不为-1 
            output_shape.SetDim(i, reshape_dims[i]);  // 设置输出的维度值为reshape后的维度值
            output_shapesize *= reshape_dims[i];  // 计算当前输出元素数量
        } else {
            output_shape.SetDim(i, 1);  // reshape后某一轴的维度值为-1，临时设置输出的维度值为1，后续计算后看是否可以推导出确定值，并记录未知维度的索引
            unknown_dim_idx = i;
        }
    }
    if (unknown_dim_idx == std::numeric_limits<size_t>::max() && output_shapesize == x_shape_size) {
        return ge::GRAPH_SUCCESS;  // 不存在未知维度，且输出shape size和输入x的shape size一致，直接返回成功
    } else if (unknown_dim_idx != std::numeric_limits<size_t>::max() && x_shape_size % output_shapesize == 0) {
        output_shape.SetDim(unknown_dim_idx, x_shape_size / output_shapesize); // 存在未知维度，根据输入shape动态调整未知维度值保持总元素个数不变
        return ge::GRAPH_SUCCESS;
    }
    return ge::GRAPH_FAILED;
}

ge::graphStatus InferShapeForReshape(InferShapeContext *context) {
    const gert::Shape *x_shape = context->GetInputShape(0);        // 获取第0个输入的shape
    const gert::Tensor *shape_tensor = context->GetInputTensor(1); // 获取第1个输入的tensor
    gert::Shape *output_shape = context->GetOutputShape(0);
    if (x_shape == nullptr || shape_tensor == nullptr || output_shape == nullptr) {
        // 防御式编程，不应该出现的场景，打印错误并返回失败
        return ge::GRAPH_FAILED;
    }

    auto reshape_size = static_cast<int32_t>(shape_tensor->GetShapeSize());
    if (reshape_size < 1) {
        // 防御式编程，不应该出现的场景，打印错误并返回失败
        return ge::GRAPH_FAILED;
    }

    // 根据原型信息，Reshape的shape输入支持INT32与INT64两类，根据不同的类型进入对应的模板函数中做真正的shape变换操作
    if (shape_tensor->GetDataType() == ge::DT_INT32) {
        int32_t *reshape_data = shape_tensor->GetData<int32_t>();
        return ReshapeInferShapeImpl<int32_t>(reshape_data, *x_shape, *output_shape, reshape_size);
    } else {
        int64_t *reshape_data = shape_tensor->GetData<int64_t>();
        return ReshapeInferShapeImpl<int64_t>(reshape_data, *x_shape, *output_shape, reshape_size);
    }
}
`)])]),e("div",{class:"callout callout-caution"},[e("p",{class:"callout-title"},[e("svg",{class:"callout-icon",viewBox:"0 0 16 16",width:"16",height:"16"},[e("path",{d:"M4.47.22A.749.749 0 0 1 5 0h6c.199 0 .389.079.53.22l4.25 4.25c.141.14.22.331.22.53v6a.749.749 0 0 1-.22.53l-4.25 4.25A.749.749 0 0 1 11 16H5a.749.749 0 0 1-.53-.22L.22 11.53A.749.749 0 0 1 0 11V5c0-.199.079-.389.22-.53Zm.84 1.28L1.5 5.31v5.38l3.81 3.81h5.38l3.81-3.81V5.31L10.69 1.5ZM8 4a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 8 4Zm0 8a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"})]),a("注意")]),e("ul",null,[e("li",null,"只有声明过数据依赖的输入，才可以在InferShape时调用GetInputTensor等获取tensor的接口获取其对应的tensor数据。若对一个未声明数据依赖的输入调用GetInputTensor等获取tensor的接口，只能在tensor中获取到正确的shape、format、datatype信息，无法获取到真实的tensor数据地址（获取到的地址为nullptr）。"),e("li",null,"从tensor中获取tensor_data时(GetData<int32_t>或GetData<int64_t>)，使用者需要保证获取的数据类型是正确的，否则行为是未定义的。")])])])],-1)])])}const m=t(l,[["render",i]]);export{g as __pageData,m as default};
