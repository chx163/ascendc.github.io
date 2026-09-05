import{_ as a,o as e,a as n,b as i}from"./app.DKoEZOcr.js";const c="/ascendc.github.io/pr/5487/assets/pytorch_deploy.Cxh4HhI0.png",m=JSON.parse('{"title":"","description":"","frontmatter":{"breadcrumbs":[{"text":"Ascend C算子开发指南","link":"/guide/getting_started/ascend_c_overview_and_learning_path"},{"text":"编程指南","link":"/guide/programming_guide/document_structure"},{"text":"高级编程","link":"/guide/programming_guide/advanced_programming/advanced_programming"},{"text":"AI框架算子适配","link":"/guide/programming_guide/advanced_programming/ai_framework_adaptation/overview"},{"text":"PyTorch框架","link":"/guide/programming_guide/advanced_programming/ai_framework_adaptation/pytorch_framework"}]},"headers":[],"relativePath":"guide/programming_guide/advanced_programming/ai_framework_adaptation/pytorch_framework.md","filePath":"guide/programming_guide/advanced_programming/ai_framework_adaptation/pytorch_framework.md","outlineHeaders":[{"level":2,"title":"torch.library","slug":"torch.library","link":"#torch.library"},{"level":2,"title":"Pybind","slug":"Pybind","link":"#Pybind"}],"lastUpdated":1787050286000}'),r={name:"guide/programming_guide/advanced_programming/ai_framework_adaptation/pytorch_framework.md"};function o(d,t,s,l,p,h){return e(),n("div",null,[...t[0]||(t[0]=[i('<div><article class="markdown-body"><h1>PyTorch框架<span id="ZH-CN_TOPIC_0000001918449130"></span></h1><p>通过PyTorch框架进行模型的训练、推理时，会调用很多算子进行计算。开发者开发的自定义算子如果需要集成部署到PyTorch框架，有如下几种方式：</p><ul><li>核函数（Kernel）直调：通过适配torch.library或Pybind注册自定义算子，可以实现PyTorch框架调用算子核函数（Kernel）程序。</li><li>单算子API调用：该模式下的适配插件开发流程和具体样例请参见 <a href="https://www.hiascend.com/document/detail/zh/Pytorch/latest/index/index.html">《TorchNPU》</a>中的“开发指南 &gt; 框架特性 &gt; 自定义算子适配开发 &gt; 基于OpPlugin算子适配开发”章节。</li><li>图模式调用：自定义算子在Pytorch图模式下的适配开发指导请参见 <a href="https://www.hiascend.com/document/detail/zh/Pytorch/latest/index/index.html">《TorchNPU》</a>中的“TorchAir &gt; 自定义算子入图”章节。</li></ul><p><strong>图1</strong> Pytorch框架部署方式<span id="fig1969201074516"></span><br><img src="'+c+`" alt title="Pytorch框架部署方式"></p><p><strong>本节主要提供通过torch.library与Pybind注册自定义算子并实现PyTorch框架调用算子核函数（Kernel）程序的指导。</strong></p><ul><li>torch.library是用于扩展PyTorch核心算子库的API集合。它允许开发者创建新的算子、并为其提供自定义实现。</li><li>Pybind是一个开源的C++和Python之间的桥接工具，它旨在使C++代码能够无缝地集成到Python环境中。</li></ul><p>Pybind适用于快速将C++函数暴露给Python，实现高效接口绑定。但其生成的算子无法被PyTorch的算子系统识别，不具备schema定义与图追踪能力，因此不支持torch.compile优化。相比之下，torch.library提供了与PyTorch核心算子系统深度集成的机制，支持算子注册、schema定义和图追踪能力，是支持torch.compile的必要条件。开发者可根据需求选择对应方式。</p><h2 id="torch.library">torch.library<span id="section9528173218278"></span><a class="header-anchor" href="#torch.library">​</a></h2><p>下面代码以add_custom（Add自定义算子为例）算子为例，介绍通过torch.library如何调用算子核函数（Kernel）程序，文档中仅介绍核心步骤，完整样例请参考<a href="https://gitcode.com/cann/asc-devkit/tree/master/examples/01_simd_cpp_api/02_features/00_framework/00_pytorch/torch_library">torch.library样例</a>。</p><ol><li><p>环境准备。</p><p>除了按照<a href="../../../getting_started/environment_setup.html">环境准备</a>进行CANN软件包的安装，还需要安装以下依赖：</p><p><a href="https://www.hiascend.com/document/detail/zh/Pytorch/latest/configandinstg/instg/docs/zh/installation_guide/installation_description.md">安装TorchNPU</a></p></li><li><p>实现NPU上的自定义算子。</p><p>包括算子核函数（Kernel）实现，并使用&lt;&lt;&lt;&gt;&gt;&gt;接口调用算子核函数（Kernel）完成指定的运算。样例中的c10_npu::getCurrentNPUStream接口用于获取当前npu流，返回值类型NPUStream，使用方式请参考 <a href="https://www.hiascend.com/document/detail/zh/Pytorch/latest/index/index.html">《TorchNPU》</a>中的“API &gt; 自定义API”。</p><p>需要注意的是，本样例的输入x，y的内存是在外层的Python调用脚本中分配的。</p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>namespace ascendc_ops {
at::Tensor ascendc_add(const at::Tensor&amp; x, const at::Tensor&amp; y)
{
    // 运行资源申请，通过c10_npu::getCurrentNPUStream()的函数获取当前NPU上的流
    auto aclStream = c10_npu::getCurrentNPUStream().stream(false);
    // 分配Device侧输出内存
    at::Tensor z = at::empty_like(x);
    uint32_t numBlocks = 8;
    uint32_t totalLength = 1;
    for (uint32_t size : x.sizes()) {
        totalLength *= size;
    }
    // 用&lt;&lt;&lt;&gt;&gt;&gt;接口调用核函数（Kernel）完成指定的运算
    add_custom&lt;&lt;&lt;numBlocks, 0, aclStream&gt;&gt;&gt;((uint8_t*)(x.mutable_data_ptr()), (uint8_t*)(y.mutable_data_ptr()), (uint8_t*)(z.mutable_data_ptr()), totalLength);
    // 将Device上的运算结果拷贝回Host并释放申请的资源
    return z;
}
} // namespace ascendc_ops
</code></pre></div></li><li><p>自定义算子的注册。</p><p>PyTorch提供TORCH_LIBRARY宏作为自定义算子注册的核心接口，用于创建并初始化自定义算子库，注册后在Python侧可以通过torch.ops.namespace.op_name方式进行调用。TORCH_LIBRARY_IMPL用于将算子逻辑绑定到特定的DispatchKey（PyTorch设备调度标识），针对NPU设备，需要将算子实现注册到PrivateUse1这一专属的DispatchKey上。</p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>// 注册算子到torch.library
TORCH_LIBRARY(ascendc_ops, m)
{
    m.def(&quot;ascendc_add(Tensor x, Tensor y) -&gt; Tensor&quot;);
}

// 注册PrivateUse1实现，NPU设备
TORCH_LIBRARY_IMPL(ascendc_ops, PrivateUse1, m)
{
    m.impl(&quot;ascendc_add&quot;, TORCH_FN(ascendc_ops::ascendc_add));
}
</code></pre></div></li><li><p>编译生成算子动态库。</p></li><li><p>使用Python测试脚本进行测试。</p><p>在add_custom_test.py中，首先通过torch.ops.load_library加载生成的自定义算子库，调用注册的ascendc_add函数，并通过对比NPU输出与CPU标准加法结果来验证自定义算子的数值正确性。</p></li></ol><h2 id="Pybind">Pybind<span id="section1788413437123"></span><a class="header-anchor" href="#Pybind">​</a></h2><p>下面代码以add_custom算子为例，介绍通过Pybind方式实现Pytorch脚本中调用自定义算子的流程。文档中仅介绍核心步骤，完整样例请参考<a href="https://gitcode.com/cann/asc-devkit/tree/master/examples/01_simd_cpp_api/02_features/00_framework/00_pytorch/pybind">Pybind样例</a>。</p><ol><li><p>环境准备。</p><p>除了按照<a href="../../../getting_started/environment_setup.html">环境准备</a>进行CANN软件包的安装，还需要安装以下依赖：</p><ul><li><p><a href="https://www.hiascend.com/document/detail/zh/Pytorch/latest/configandinstg/instg/docs/zh/installation_guide/installation_description.md">安装TorchNPU</a></p></li><li><p>安装pybind11</p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>pip3 install pybind11 expecttest
</code></pre></div></li></ul></li><li><p>实现NPU上的自定义算子。</p><p>包括算子核函数（Kernel）实现，并使用&lt;&lt;&lt;&gt;&gt;&gt;接口调用算子核函数（Kernel）完成指定的运算。样例中的c10_npu::getCurrentNPUStream接口用于获取当前npu流，返回值类型NPUStream，使用方式请参考 <a href="https://www.hiascend.com/document/detail/zh/Pytorch/latest/index/index.html">《TorchNPU》</a>中的“API &gt; 自定义API”。</p><p>需要注意的是，本样例的输入x，y的内存是在Python调用脚本中分配的。</p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>// Pybind和PyTorch调用所需的头文件
#include &lt;pybind11/pybind11.h&gt;
#include &lt;torch/extension.h&gt;

#include &quot;torch_npu/csrc/core/npu/NPUStream.h&quot;
// 核函数（Kernel）侧实现需要的头文件
#include &quot;kernel_operator.h&quot; 
...
namespace ascendc_ops {
at::Tensor ascendc_add(const at::Tensor&amp; x, const at::Tensor&amp; y)
{
    // 运行资源申请，通过c10_npu::getCurrentNPUStream()的函数获取当前NPU上的流
    auto aclStream = c10_npu::getCurrentNPUStream().stream(false);
    // 分配Device侧输出内存
    at::Tensor z = at::empty_like(x);
    uint32_t numBlocks = 8;
    uint32_t totalLength = 1;
    for (uint32_t size : x.sizes()) {
        totalLength *= size;
    }
    // 用&lt;&lt;&lt;&gt;&gt;&gt;接口调用核函数（Kernel）完成指定的运算
    add_custom&lt;&lt;&lt;numBlocks, 0, aclStream&gt;&gt;&gt;((uint8_t*)(x.mutable_data_ptr()), (uint8_t*)(y.mutable_data_ptr()), (uint8_t*)(z.mutable_data_ptr()), totalLength);
    // 将Device上的运算结果拷贝回Host并释放申请的资源
    return z;
}
} // namespace ascendc_ops
</code></pre></div></li><li><p>定义Pybind模块，将C++函数封装成Python函数。PYBIND11_MODULE是Pybind11库中的一个宏，用于定义一个Python模块。它接受两个参数，第一个参数是封装后的模块名，第二个参数是一个Pybind11模块对象，用于定义模块中的函数、类、常量等。通过调用m.def()方法，可以将上一步骤中函数ascendc_ops::ascendc_add转成Python函数ascendc_add，使其可以在Python代码中被调用。</p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>PYBIND11_MODULE(ascendc_ops, m)// 模块名ascendc_ops，模块对象m
{
    m.doc() = &quot;add_custom pybind11 interfaces&quot;;// optional module docstring
    m.def(&quot;ascendc_add&quot;, &amp;ascendc_ops::ascendc_add, &quot;&quot;);// 将函数ascendc_add与Pybind模块进行绑定
}
</code></pre></div></li><li><p>编译生成算子动态库。</p></li><li><p>在Python调用脚本中，使用torch接口生成随机输入数据并分配内存，通过导入封装的自定义模块ascendc_ops，调用自定义模块ascendc_ops中的ascendc_add函数，从而在NPU上执行算子。</p></li></ol></article></div>`,1)])])}const g=a(r,[["render",o]]);export{m as __pageData,g as default};
