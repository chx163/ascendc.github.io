import{_ as e,o as a,a as s,b as n}from"./app.C41L12d5.js";const h=JSON.parse('{"title":"","description":"","frontmatter":{"breadcrumbs":[{"text":"Ascend C算子开发指南","link":"/guide/getting_started/ascend_c_overview_and_learning_path"},{"text":"编程指南","link":"/guide/programming_guide/document_structure"},{"text":"附录","link":"/guide/programming_guide/appendix/show_kernel_debug_data_tool"},{"text":"常用操作","link":"/guide/programming_guide/appendix/common_operations/develop_dynamic_input_operator"},{"text":"如何开发动态输入算子","link":"/guide/programming_guide/appendix/common_operations/develop_dynamic_input_operator"}]},"headers":[],"relativePath":"guide/programming_guide/appendix/common_operations/develop_dynamic_input_operator.md","filePath":"guide/programming_guide/appendix/common_operations/develop_dynamic_input_operator.md","lastUpdated":1787050286000}'),i={name:"guide/programming_guide/appendix/common_operations/develop_dynamic_input_operator.md"};function c(o,t,p,r,l,d){return a(),s("div",null,[...t[0]||(t[0]=[n(`<div><article class="markdown-body"><h1>如何开发动态输入算子<span id="ZH-CN_TOPIC_0000002098772922"></span></h1><p>动态输入算子是指算子的输入个数是动态的，例如AddN，将N个输入tensor累加到一起，输出一个tensor，输入tensor的个数是不固定的。动态输入算子的开发在构造和解析输入数据方面有差异：核函数（Kernel）的入参采用ListTensorDesc的结构存储输入数据信息，对应的，调用时需构造TensorList结构保存参数信息。下面基于kernel直调和工程化算子开发两种开发方式分别介绍具体开发流程。</p><div class="callout callout-note"><p class="callout-title"><svg class="callout-icon" viewBox="0 0 16 16" width="16" height="16"><path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8Zm8-6.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13ZM6.5 7.75A.75.75 0 0 1 7.25 7h1a.75.75 0 0 1 .75.75v2.75h.25a.75.75 0 0 1 0 1.5h-2a.75.75 0 0 1 0-1.5h.25v-2h-.25a.75.75 0 0 1-.75-.75ZM8 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"></path></svg>说明</p><p>下文仅列出代码片段，完整样例请参考<a href="https://gitcode.com/cann/asc-devkit/tree/master/examples/01_simd_cpp_api/03_basic_api/04_memory_management/list_tensor_desc_input">动态输入算子样例</a>。</p></div><ul><li><p>kernel直调</p><ul><li><p>参考<a href="../../../../api/SIMD-API/basic_api/aux_data_structures/ListTensorDesc.html">ListTensorDesc</a>数据结构自行定义ListTensorDesc和TensorDesc结构体，并将实际的输入数据保存至ListTensorDesc结构中。示例如下:</p><p>ptrOffset传入为ListTensorDesc首地址和数据指针首地址dataPtr之间的偏移量，tensorDesc中保存两个输入的tensor描述信息， dataPtr传入为保存输入数据的地址指针。</p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>constexpr uint32_t SHAPE_DIM = 2;
    struct TensorDesc {
        uint32_t dim{SHAPE_DIM};
        uint32_t index;
        uint64_t shape[SHAPE_DIM] = {8, 2048};
    };

    TensorDesc xDesc;
    xDesc.index = 0;
    TensorDesc yDesc;
    yDesc.index = 1;

    constexpr uint32_t TENSOR_DESC_NUM = 2;
    struct ListTensorDesc {
        uint64_t ptrOffset;
        TensorDesc tensorDesc[TENSOR_DESC_NUM];
        uintptr_t dataPtr[TENSOR_DESC_NUM];
    } inputDesc;

    inputDesc = {(1 + (1 + SHAPE_DIM) * TENSOR_DESC_NUM) * sizeof(uint64_t), {xDesc, yDesc}, {(uintptr_t)xDevice, (uintptr_t)yDevice}};
</code></pre></div></li><li><p>kernel侧调用时，直接传入ListTensorDesc表达的输入信息。示例如下：</p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>// Allocate ListTensorDesc device memory
    ret = aclrtMalloc((void **)&amp;inputDescInDevice, sizeof(ListTensorDesc), ACL_MEM_MALLOC_HUGE_FIRST);
    assert(ret == ACL_SUCCESS &amp;&amp; &quot;aclrtMalloc inputDescInDevice failed!&quot;);

    // Copy ListTensorDesc to device
    ret = aclrtMemcpy(inputDescInDevice, sizeof(ListTensorDesc), &amp;inputDesc, sizeof(ListTensorDesc),
                        ACL_MEMCPY_HOST_TO_DEVICE);
    assert(ret == ACL_SUCCESS &amp;&amp; &quot;aclrtMemcpy inputDesc to device failed!&quot;);

    list_tensor_desc_input_custom&lt;&lt;&lt;numBlocks, 0, stream&gt;&gt;&gt;(inputDescInDevice, zDevice, tiling);
</code></pre></div></li><li><p>kernel侧算子实现，入参需传入动态结构的数据（srcList），并使用AscendC::ListTensorDesc结构做解析。示例如下：</p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>__global__ __vector__ void list_tensor_desc_input_custom(GM_ADDR srcList, GM_ADDR z, AddCustomTilingData tiling)
{
    AscendC::ListTensorDesc keyListTensorDescInit((__gm__ void*)srcList);
    GM_ADDR x = (__gm__ uint8_t*)keyListTensorDescInit.GetDataPtr&lt;__gm__ uint8_t&gt;(0);
    GM_ADDR y = (__gm__ uint8_t*)keyListTensorDescInit.GetDataPtr&lt;__gm__ uint8_t&gt;(1);
}
</code></pre></div></li></ul></li><li><p>工程化算子开发</p><ul><li><p>单算子调用时，构造List类型tensor并传入。</p><p>使用aclCreateTensor创建tensor后，需调用aclCreateTensorList，将创建好的tensor组成List形式，如下所示。</p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>inputTensorList = aclCreateTensorList(inputTensor_.data(), inputTensor_.size());
</code></pre></div><p>获取算子使用的workspace空间大小接口的入参，也需使用aclTensorList结构参数，用来计算workspace的大小，调用示例如下。</p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>// 获取算子使用的workspace空间大小
aclnnStatus aclnnAddNCustomGetWorkspaceSize(const aclTensorList *srcList, const aclTensor *out, uint64_t *workspaceSize, aclOpExecutor **executor);
</code></pre></div></li><li><p>算子原型定义中，输入数据的参数类型设置为动态，示例如下。</p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>this-&gt;Input(&quot;srcList&quot;)
    .ParamType(DYNAMIC)
    .DataType({ge::DT_FLOAT16})
    .Format({ge::FORMAT_ND});
</code></pre></div></li><li><p>host侧算子实现，获取动态输入信息的接口，需使用对应的动态接口。</p><p>例如，Tiling函数和InferShape函数中，GetDynamicInputShape接口用于获取动态输入的shape信息，InferDataType函数中，GetDynamicInputDataType接口用于获取动态输入的数据类型，示例如下。</p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>namespace ge {
static graphStatus InferShape(gert::InferShapeContext *context)
{
    const gert::Shape *x1_shape = context-&gt;GetDynamicInputShape(0, 0);
    gert::Shape *y_shape = context-&gt;GetOutputShape(0);
    *y_shape = *x1_shape;
    return GRAPH_SUCCESS;
}

static graphStatus InferDataType(gert::InferDataTypeContext *context)
{
    const auto inputDataType = context-&gt;GetDynamicInputDataType(0, 0);
    context-&gt;SetOutputDataType(0, inputDataType);
    return ge::GRAPH_SUCCESS;
}
} // namespace ge
</code></pre></div></li><li><p>kernel侧算子实现，入参需传入动态结构的数据，并使用AscendC::ListTensorDesc结构做解析。</p><p>核函数（Kernel）入参需传入动态结构的数据，例如GM_ADDR srcList，示例如下。</p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>extern &quot;C&quot; __global__ __aicore__ void addn_custom(GM_ADDR srcList, GM_ADDR z, GM_ADDR workspace, GM_ADDR tiling)
</code></pre></div><p>对传入的参数srcList，需使用AscendC::ListTensorDesc结构做解析，得到每个tensor的具体信息，示例如下。</p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>AscendC::ListTensorDesc keyListTensorDescInit((__gm__ void*)srcList);
GM_ADDR x = (__gm__ uint8_t*)keyListTensorDescInit.GetDataPtr&lt;__gm__ uint8_t&gt;(0);
GM_ADDR y = (__gm__ uint8_t*)keyListTensorDescInit.GetDataPtr&lt;__gm__ uint8_t&gt;(1);
</code></pre></div></li></ul></li></ul></article></div>`,1)])])}const v=e(i,[["render",c]]);export{h as __pageData,v as default};
