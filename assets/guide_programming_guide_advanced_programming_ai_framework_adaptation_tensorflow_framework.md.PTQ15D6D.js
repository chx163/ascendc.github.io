import{_ as e,o as n,a as o,b as a}from"./app.C41L12d5.js";const s="/ascendc.github.io/assets/copy.BPkjrgj9.png",h=JSON.parse('{"title":"","description":"","frontmatter":{"breadcrumbs":[{"text":"Ascend C算子开发指南","link":"/guide/getting_started/ascend_c_overview_and_learning_path"},{"text":"编程指南","link":"/guide/programming_guide/document_structure"},{"text":"高级编程","link":"/guide/programming_guide/advanced_programming/advanced_programming"},{"text":"AI框架算子适配","link":"/guide/programming_guide/advanced_programming/ai_framework_adaptation/overview"},{"text":"TensorFlow框架","link":"/guide/programming_guide/advanced_programming/ai_framework_adaptation/tensorflow_framework"}]},"headers":[],"relativePath":"guide/programming_guide/advanced_programming/ai_framework_adaptation/tensorflow_framework.md","filePath":"guide/programming_guide/advanced_programming/ai_framework_adaptation/tensorflow_framework.md","outlineHeaders":[{"level":2,"title":"适配插件开发","slug":"适配插件开发","link":"#适配插件开发"},{"level":2,"title":"TensorFlow原生算子映射到CANN算子","slug":"TensorFlow原生算子映射到CANN算子","link":"#TensorFlow原生算子映射到CANN算子"},{"level":2,"title":"TensorFlow自定义算子开发并映射到CANN算子","slug":"TensorFlow自定义算子开发并映射到CANN算子","link":"#TensorFlow自定义算子开发并映射到CANN算子"},{"level":2,"title":"可选输入算子映射关系开发","slug":"可选输入算子映射关系开发","link":"#可选输入算子映射关系开发"},{"level":2,"title":"动态输入算子映射关系开发","slug":"动态输入算子映射关系开发","link":"#动态输入算子映射关系开发"}],"lastUpdated":1787050286000}'),p={name:"guide/programming_guide/advanced_programming/ai_framework_adaptation/tensorflow_framework.md"};function i(_,t,r,l,u,d){return n(),o("div",null,[...t[0]||(t[0]=[a('<div><article class="markdown-body"><h1>TensorFlow框架<span id="ZH-CN_TOPIC_0000001615270505"></span></h1><div data-filter="950"><div class="callout callout-note"><p class="callout-title"><svg class="callout-icon" viewBox="0 0 16 16" width="16" height="16"><path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8Zm8-6.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13ZM6.5 7.75A.75.75 0 0 1 7.25 7h1a.75.75 0 0 1 .75.75v2.75h.25a.75.75 0 0 1 0 1.5h-2a.75.75 0 0 1 0-1.5h.25v-2h-.25a.75.75 0 0 1-.75-.75ZM8 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"></path></svg>说明</p><p>针对Ascend 950PR/Ascend 950DT，暂不支持TensorFlow框架算子调用。</p></div></div><p>本章节介绍TensorFlow框架算子适配的流程，用于将TensorFlow框架的算子映射成CANN算子（开发者基于CANN框架自定义开发的算子），从而完成从TensorFlow框架调用到CANN算子的过程。同时给出TensorFlow框架侧算子调用的示例，便于开发者了解完整流程。</p><p>下图展示了完整的开发流程，具体步骤如下：</p><p><img src="'+s+`" alt></p><ol><li><p>环境准备。</p><ol><li><p>CANN软件安装请参考<a href="../../../getting_started/environment_setup.html">环境准备</a>。</p></li><li><p>安装框架插件包，请参考<a href="https://www.hiascend.com/document/detail/zh/TensorFlowCommunity/latest/index/index.html">TensorFlow模型迁移</a>中《TensorFlow 1.15模型迁移》或《TensorFlow 2.6.5模型迁移》的环境准备 &gt; 安装框架插件包章节，获取框架插件包详细的安装步骤。</p></li><li><p><span id="li123241091016"></span><a href="../aclnn_operator_development/aclnn_quick_start.html#create-project">创建算子工程</a>。使用msOpGen工具创建算子开发工程。TensorFlow框架算子适配场景下，需要通过framework参数指定具体的框架为tf或者tensorflow，工具会自动生成框架适配代码。以自定义CANN算子AddCustom为例，使用msOpGen工具创建算子开发工程的具体命令如下：</p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>\${INSTALL_DIR}/python/site-packages/bin/msopgen gen -i $HOME/sample/add_custom.json -f tf -c ai_core-&lt;soc_version&gt; -lan cpp -out $HOME/sample/AddCustom
</code></pre></div></li></ol></li><li><p>算子实现。</p><ul><li><a href="../aclnn_operator_development/design_and_implementation/operator_prototype_definition.html">算子原型定义</a>。通过原型定义来描述算子输入输出、属性等信息以及算子在AI处理器上相关实现信息，并关联tiling实现等函数。</li><li>核函数（Kernel）侧算子实现和host侧tiling实现请参考<a href="../../../operator_practice/simd_operator_impl/overview.html">SIMD算子实现</a>；工程化算子开发，支持开发者调用Tiling API基于CANN提供的编程框架进行tiling开发，kernel侧也提供对应的接口方便开发者获取tiling参数，具体内容请参考<a href="../aclnn_operator_development/design_and_implementation/kernel_operator_implementation.html">Kernel侧算子实现</a>和<a href="../aclnn_operator_development/design_and_implementation/host_tiling_implementation.html">Host侧Tiling实现</a>，由此而带来的额外约束也在上述章节说明。</li></ul></li><li><p><a href="../operator_graph_development/basic_development_flow.html">算子入图（GE图）开发</a>。算子入图场景下，需要提供shape推导等算子入图适配函数的实现。</p></li><li><p>TensorFlow框架适配插件开发。详细说明见<a href="#section1820291291414">适配插件开发</a>。</p></li><li><p>编译部署。通过工程编译脚本完成算子的编译部署，分为<a href="../aclnn_operator_development/compilation_and_deployment/basic_process.html">算子包编译</a>和<a href="../aclnn_operator_development/compilation_and_deployment/dynamic_static_lib_compilation.html">算子动态库编译</a>两种方式。</p></li><li><p>TensorFlow框架算子调用。详细说明见<a href="#section6342138121512">TensorFlow原生算子映射到CANN算子</a>和<a href="#section18276103563719">TensorFlow自定义算子开发并映射到CANN算子</a>。完整样例请参考<a href="https://gitcode.com/cann/asc-devkit/tree/master/examples/01_simd_cpp_api/02_features/00_framework/01_tensorflow">LINK</a>。</p></li></ol><h2 id="适配插件开发">适配插件开发<span id="section1820291291414"></span><a class="header-anchor" href="#适配插件开发">​</a></h2><p>完成<a href="#li123241091016">算子工程创建</a>后，会在算子工程目录下生成framework/tf_plugin目录，用于存放TensorFlow框架适配插件实现文件。以自定义CANN算子AddCustom为例，算子工程目录如下：</p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>AddCustom
├── build.sh             // 编译入口脚本
├── cmake 
├── CMakeLists.txt       // 算子工程的CMakeLists.txt
├── CMakePresets.json    // 编译配置项
├── framework            // 框架适配插件实现文件目录
│   ├── tf_plugin     //  TensorFlow框架适配插件实现文件目录
│   │   ├── CMakeLists.txt    
│   │   ├── tensorflow_add_custom_plugin.cc  // TensorFlow框架适配插件实现文件    
│   ├── CMakeLists.txt
├── op_host                      // host侧实现文件
├── op_kernel                    // kernel侧实现文件
└── scripts                      // 自定义算子工程打包相关脚本所在目录
</code></pre></div><p>当TensorFlow算子与CANN算子原型定义一致时，TensorFlow框架适配插件实现代码如下：</p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>#include &quot;register/register.h&quot;
namespace domi {
REGISTER_CUSTOM_OP(&quot;AddCustom&quot;)
    .FrameworkType(TENSORFLOW) 
    .OriginOpType(&quot;AddCustom&quot;)   
    .ParseParamsByOperatorFn(AutoMappingByOpFn);
}
</code></pre></div><p>当TensorFlow算子与CANN算子原型定义不一致时，TensorFlow框架适配插件实现代码如下：</p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>#include &quot;register/register.h&quot;
REGISTER_CUSTOM_OP(&quot;FlashAttentionScore&quot;)
    .FrameworkType(TENSORFLOW)
    .OriginOpType({&quot;FlashAttentionScore&quot;})
    .ParseParamsByOperatorFn(FlashAttentionScoreMapping)  
    .ParseOpToGraphFn(AddOptionalPlaceholderForFA);
</code></pre></div><ul><li><p>包含插件实现函数相关的头文件。</p><p>register.h存储在CANN软件安装后文件存储路径的“include/register/”目录下，包含该头文件，可使用算子注册相关类，调用算子注册相关的接口。</p></li><li><p>REGISTER_CUSTOM_OP：注册自定义算子，传入算子的_OpType_，需要与算子原型注册中的_OpType_保持一致。</p><ul><li>FrameworkType：TENSORFLOW代表原始框架为TensorFlow。</li><li>OriginOpType：算子在原始框架中的类型。对于TensorFlow自定义算子，还需要完成<a href="#li312982016383">TensorFlow自定义算子的开发</a>，这里的OriginOpType与REGISTER_OP注册算子名相同，对于TensorFlow原生算子，即为原生算子名。</li><li>ParseParamsByOperatorFn：用来注册解析算子参数实现映射关系的回调函数，需要用户自定义实现回调函数ParseParamByOpFunc。原始TensorFlow算子中参数与CANN算子中参数一一对应时，可直接使用自动映射回调函数AutoMappingByOpFn自动实现映射。</li><li>ParseOpToGraphFn：当TensorFlow算子与CANN算子原型定义不一致（比如CANN算子原型定义原型中有可选输入，但TensorFlow原型定义中不支持可选输入，没有可选输入）的情况时，用来注册调整算子原型映射关系的回调函数。</li></ul></li></ul><h2 id="TensorFlow原生算子映射到CANN算子">TensorFlow原生算子映射到CANN算子<span id="section6342138121512"></span><a class="header-anchor" href="#TensorFlow原生算子映射到CANN算子">​</a></h2><p>以自定义算子AddCustom为例，将该算子映射到TensorFlow内置算子Add上，需要先修改AddCustom自定义算子目录framework/tf_plugin下插件代码，完成算子名映射：</p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>#include &quot;register/register.h&quot;
namespace domi {
REGISTER_CUSTOM_OP(&quot;AddCustom&quot;)   // 当前Ascend C自定义算子名
    .FrameworkType(TENSORFLOW)    // 第三方框架类型TENSORFLOW
    .OriginOpType(&quot;Add&quot;)          // 映射到TensorFlow原生算子Add
    .ParseParamsByOperatorFn(AutoMappingByOpFn);
}
</code></pre></div><p>完成算子工程的编译部署后，构造单算子的TensorFlow 1.15版本测试用例进行验证。</p><ol><li><p>编写测试用例_“tf_add_.py”。</p></li><li><p>导入python库。</p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>import logging            # Python标准库日志模块
import tensorflow as tf   # 导入TensorFlow开源库
from npu_bridge.estimator import npu_ops   # 导入TensorFlow开源库中的npu_ops模块
import numpy as np    # 导入Python的数学基础库
</code></pre></div></li><li><p>通过config()定义AI处理器和CPU上的运行参数。</p><p>当“execute_type“为“ai_core“时，代表在AI处理器上运行单算子网络，最终会调用到Ascend C算子。</p><p>当“execute_type“为“cpu“时，代表在Host侧的CPU运行单算子网络，调用的是TensorFlow算子。</p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>def config(execute_type):
    if execute_type == &#39;ai_core&#39;:
        session_config = tf.ConfigProto(
            allow_soft_placement=True,
            log_device_placement=False,)
        custom_op = session_config.graph_options.rewrite_options.custom_optimizers.add()
        custom_op.name = &quot;NpuOptimizer&quot;
        custom_op.parameter_map[&quot;enable_data_pre_proc&quot;].b = True   # 开启数据预处理下沉到Device侧执行
        custom_op.parameter_map[&quot;mix_compile_mode&quot;].b = True    
        custom_op.parameter_map[&quot;use_off_line&quot;].b = True     # True表示在AI处理器上执行训练
        
    elif execute_type == &#39;cpu&#39;:
        session_config = tf.ConfigProto(
            allow_soft_placement=True,
            log_device_placement=False)

    return session_config
</code></pre></div></li><li><p>单算子网络测试用例主函数。</p><ul><li>算子输入请根据算子实际输入个数及shape进行构造。</li><li>算子输出的计算，请根据算子逻辑调用TensorFlow相关接口进行实现。</li></ul><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>#设置np.allclose比较函数的公差参数。
#np.allclose比较函数的相对公差参数
atol = 0.001
#np.allclose比较函数的绝对公差参数
rtol = 0.001

def main(unused_argv):
    shape_params = (8, 2048)
    dtype_params = np.float16

    # 构造Add算子的两个输入数据,shape为shape_params，范围在[-2,2]之间的随机数
    x_data = np.random.uniform(-2, 2, size=shape_params).astype(dtype_params)
    y_data = np.random.uniform(-2, 2, size=shape_params).astype(dtype_params)
    # 分别对Add算子的两个输入数据进行占位
    x = tf.compat.v1.placeholder(dtype_params, shape=shape_params)
    y = tf.compat.v1.placeholder(dtype_params, shape=shape_params)
    # 计算算子输出
    out = tf.math.add(x, y)
    # 在Host侧CPU上运行单算子，得到期望运行结果
    with tf.compat.v1.Session(config=config(&#39;cpu&#39;)) as session:
        result_cpu = session.run(out, feed_dict={x: x_data, y: y_data})
    # 在AI处理器上运行单算子，得到实际运行结果
    with tf.compat.v1.Session(config=config(&#39;ai_core&#39;)) as session:
        result_ai_core = session.run(out, feed_dict={x: x_data, y: y_data})

    np.array(result_ai_core).astype(dtype_params)
    np.array(result_cpu).astype(dtype_params)
    print(&#39;====================================&#39;)
   # 通过np.allclose比较AI处理器上运行的实际结果和cpu上运行的期望结果，其中atol和rtol为np.allclose比较函数的相对公差参数和绝对公差参数
    cmp_result = np.allclose(result_ai_core, result_cpu, atol, rtol)
    print(cmp_result)
    print(&#39;====================================&#39;)
</code></pre></div></li><li><p>运行单算子网络。</p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>if __name__ == &quot;__main__&quot;:
    tf.app.run()
</code></pre></div></li></ol><h2 id="TensorFlow自定义算子开发并映射到CANN算子">TensorFlow自定义算子开发并映射到CANN算子<span id="section18276103563719"></span><a class="header-anchor" href="#TensorFlow自定义算子开发并映射到CANN算子">​</a></h2><ol><li><p>适配插件代码开发。以自定义算子AddCustom为例，将该算子映射到TensorFlow自定义算子AddCustom上，需要先修改CANN AddCustom自定义算子工程目录framework/tf_plugin下插件代码，完成算子名映射：</p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>REGISTER_CUSTOM_OP(&quot;AddCustom&quot;)
  .FrameworkType(TENSORFLOW)      
  .OriginOpType(&quot;AddCustom&quot;) 
  .ParseParamsByOperatorFn(AutoMappingByOpFn);
</code></pre></div></li><li><p><span id="li312982016383"></span>TensorFlow自定义算子的开发。本节仅给出示例说明，详细内容请参考TensorFlow官方文档。</p><p>创建TensorFlow原型注册文件custom_assign_add_custom.cc，内容如下：</p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>#include &quot;tensorflow/core/framework/op.h&quot;
#include &quot;tensorflow/core/framework/shape_inference.h&quot;
#include &quot;tensorflow/core/framework/op_kernel.h&quot;
#include &quot;tensorflow/core/framework/common_shape_fns.h&quot;
using namespace tensorflow;

// 通过TensorFlow提供的REGISTER_OP接口完成算子原型的注册
REGISTER_OP(&quot;AddCustom&quot;)        // TensorFlow注册算子名
    .Input(&quot;x: T&quot;)              // 算子原型，输入参数x，类型为T
    .Input(&quot;y: T&quot;)              // 算子原型，输入参数y，类型为T
    .Output(&quot;z: T&quot;)             // 算子原型，输入参数z，类型为T
    .Attr(&quot;T: {half}&quot;)          // T类型支持范围
    .SetShapeFn(shape_inference::BroadcastBinaryOpShapeFn);  // 算子shape信息推导，BroadcastBinaryOpShapeFn为TensorFlow提供的内置函数，输出shape信息由输入shape传播推导，即输入和输出shape保持一致

// 实现一个CPU版本的kernel函数，因为Tensorflow的计算图在构建时会检查所有的算子是否有任意设备上的kernel函数（NPU核函数（Kernel）无法被感知），如果没有将会报错。这里实现一个固定返回错误的CPU kernel函数：
class AddCustomOp : public OpKernel {
 public:
  explicit AddCustomOp(OpKernelConstruction* context) : OpKernel(context) {}

  void Compute(OpKernelContext* context) override {
    OP_REQUIRES_OK(context, errors::Unimplemented(&quot;AddCustomOp is not supported on CPU&quot;)); 
  }
};

REGISTER_KERNEL_BUILDER(Name(&quot;AddCustom&quot;).Device(DEVICE_CPU), AddCustomOp);          // 注册AddCustom算子的CPU实现内核，该函数当前仅打印日志提示CPU不支持
</code></pre></div><p>使用如下命令对上述代码进行编译，产物为libcustom_ops.so，后续的算子调用脚本中可通过load_op_library接口加载该so为python模块，从而调用自定义算子。</p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>TF_CFLAGS=( $(python3 -c &#39;import tensorflow as tf; print(&quot; &quot;.join(tf.sysconfig.get_compile_flags()))&#39;) )     // 获取TensorFlow编译选项
TF_LFLAGS=( $(python3 -c &#39;import tensorflow as tf; print(&quot; &quot;.join(tf.sysconfig.get_link_flags()))&#39;) )        // 获取TensorFlow链接选项
SOURCE_FILES=custom_assign_add_custom.cc                                                                     // 包含TensorFlow算子注册和CPU内核实现的cc文件
g++ -std=c++14 -shared $SOURCE_FILES -o \${Path}/libcustom_ops.so -fPIC \${TF_CFLAGS[@]} \${TF_LFLAGS[@]} -O2   // 编译命令，产物为libcustom_ops.so，TensorFlow即可通过load_op_library加载该so为python模块，调用自定义算子
</code></pre></div></li><li><p>测试脚本中加载上一步骤编译好的动态库，实现自定义算子的调用。</p><ul><li><p>TensorFlow 1.15.0调用代码示例</p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>import os
import tensorflow as tf
import numpy as np
from npu_bridge.npu_init import *
tf.enable_resource_variables()
#np.allclose比较函数的相对公差参数
atol = 0.001
#np.allclose比较函数的绝对公差参数
rtol = 0.001
def main(unused_argv):
    custom_op_lib = tf.load_op_library(&#39;./outputs/libcustom_ops.so&#39;)     # 加载so为python模块
    shape_params = (8, 2048)
    dtype_params = np.float16
    x_data = np.random.uniform(-2, 2, size=shape_params).astype(dtype_params)
    y_data = np.random.uniform(-2, 2, size=shape_params).astype(dtype_params)
    x = tf.compat.v1.placeholder(dtype_params, shape=shape_params)
    y = tf.compat.v1.placeholder(dtype_params, shape=shape_params)
    tf_z = tf.math.add(x, y)                                           # 调用TensorFlow原生算子
    ac_z = custom_op_lib.add_custom(x, y)                              # 调用AscendC AddCustom自定义算子；add_custom是将REGISTER_OP(AddCustom)中的AddCustom由大驼峰命名转为下划线格式
    config = tf.ConfigProto()
    custom_op = config.graph_options.rewrite_options.custom_optimizers.add()
    custom_op.name = &quot;NpuOptimizer&quot;   # 配置在AI处理器上运行单算子
    config.graph_options.rewrite_options.remapping = RewriterConfig.OFF
    config.graph_options.rewrite_options.memory_optimization = RewriterConfig.OFF
    
    with tf.Session(config=config) as sess:
        sess.run(tf.global_variables_initializer())
        tf_golden = sess.run(tf_z, feed_dict={x: x_data, y: y_data})
    with tf.Session(config=config) as sess:
        sess.run(tf.global_variables_initializer())
        ascend_out = sess.run(ac_z, feed_dict={x: x_data, y: y_data})
    np.array(tf_golden).astype(dtype_params)
    np.array(ascend_out).astype(dtype_params)
    print(&#39;====================================&#39;)
    # 通过np.allclose比较AI处理器上运行的实际结果和使用TensorFlow原生算子运行的期望结果，其中atol和rtol为np.allclose比较函数的相对公差参数和绝对公差参数。
    cmp_result = np.allclose(tf_golden, ascend_out, atol, rtol)
    print(cmp_result)
    print(&#39;====================================&#39;)
if __name__ == &quot;__main__&quot;:
    tf.app.run()
</code></pre></div></li><li><p>TensorFlow 2.6.5调用代码</p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>import os
import tensorflow as tf
import numpy as np
import npu_device
from npu_device.compat.v1.npu_init import *
npu_device.compat.enable_v1()
tf.compat.v1.enable_resource_variables()
#np.allclose比较函数的相对公差参数
atol = 0.001
#np.allclose比较函数的绝对公差参数
rtol = 0.001
def main(unused_argv):
    custom_op_lib = tf.load_op_library(&#39;./outputs/libcustom_ops.so&#39;)     # 加载so为python模块
    
    shape_params = (8, 2048)
    dtype_params = np.float16
    x_data = np.random.uniform(-2, 2, size=shape_params).astype(dtype_params)
    y_data = np.random.uniform(-2, 2, size=shape_params).astype(dtype_params)
    x = tf.compat.v1.placeholder(dtype_params, shape=shape_params)
    y = tf.compat.v1.placeholder(dtype_params, shape=shape_params)
    tf_z = tf.math.add(x, y)                                           # 调用TensorFlow原生算子
    ac_z = custom_op_lib.add_custom(x, y)                              # 调用AscendC AddCustom自定义算子；add_custom是将REGISTER_OP(AddCustom)中的AddCustom由大驼峰命名转为下划线格式    
    config = tf.compat.v1.ConfigProto()
    custom_op = config.graph_options.rewrite_options.custom_optimizers.add()
    custom_op.name = &quot;NpuOptimizer&quot;
    config.graph_options.rewrite_options.remapping = RewriterConfig.OFF
    config.graph_options.rewrite_options.memory_optimization = RewriterConfig.OFF
    
    with tf.compat.v1.Session(config=config) as sess:
        sess.run(tf.global_variables_initializer())
        tf_golden = sess.run(tf_z, feed_dict={x: x_data, y: y_data})
    with tf.compat.v1.Session(config=config) as sess:
        sess.run(tf.global_variables_initializer())
        ascend_out = sess.run(ac_z, feed_dict={x: x_data, y: y_data})
    np.array(tf_golden).astype(dtype_params)
    np.array(ascend_out).astype(dtype_params)
    print(&#39;====================================&#39;)
    # 通过np.allclose比较AI处理器上运行的实际结果和使用TensorFlow原生算子运行的期望结果，其中atol和rtol为np.allclose比较函数的相对公差参数和绝对公差参数。
    cmp_result = np.allclose(tf_golden, ascend_out, atol, rtol)
    print(cmp_result)
    print(&#39;====================================&#39;)
if __name__ == &quot;__main__&quot;:
    tf.app.run()
</code></pre></div></li></ul></li></ol><h2 id="可选输入算子映射关系开发">可选输入算子映射关系开发<span id="section41517302181"></span><a class="header-anchor" href="#可选输入算子映射关系开发">​</a></h2><p>TensorFlow的原型定义中不支持可选输入，对于包含可选输入的算子，其从TensorFlow到CANN的映射关系，不满足简单的一对一映射，需要在插件适配代码中，将输入转换为可选输入，调整原型的映射关系。下文以CANN算子库中的FlashAttentionScore算子为例，介绍针对此类算子的框架适配插件如何开发。</p><ol><li><p>适配插件开发</p><p>和上文中介绍的简单的一对一映射不同，进行插件适配开发时，需要调用ParseOpToGraphFn注册回调函数，回调函数中用于调整算子原型映射关系。此时：</p><ul><li>通过ParseParamsByOperatorFn注册回调函数，回调函数中将TensorFlow原生算子映射到一个IR和TensorFlow一致的中间算子（调用AutoMappingByOpFn完成属性映射）。</li><li>通过ParseOpToGraphFn注册回调函数，调整算子原型映射关系，将中间算子最终映射到CANN算子库中的算子，这里映射到Graph图的概念是指一个算子构成的单算子图。</li></ul><p>需要<strong>注意</strong>：在ParseParamsByOperatorFn的回调函数中，需要将TensorFlow算子名称设置到中间算子的original_type属性中，用于后续ParseOpToGraphFn回调函数的触发。示例代码如下：</p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>#include &lt;string&gt;
#include &lt;vector&gt;
#include &quot;register/register.h&quot;
#include &quot;graph/operator.h&quot;
#include &quot;graph/graph.h&quot;
#include &quot;graph/operator_factory.h&quot;

namespace domi {
using namespace ge;

static Status AddOptionalPlaceholderForFA(const ge::Operator &amp;tf_op, ge::Graph &amp;graph) {
  // 1. 创建一个FlashAttentionScore算子npu_fa_op
  ge::AscendString op_name;
  tf_op.GetName(op_name);
  auto npu_fa_op = OperatorFactory::CreateOperator(op_name.GetString(), &quot;FlashAttentionScore&quot;);
  // 2. 将TensorFlow算子属性映射到npu_fa_op算子上
  float scale_value = 1.0;
  (void)tf_op.GetAttr(&quot;scale_value&quot;, scale_value);
  (void)npu_fa_op.SetAttr(&quot;scale_value&quot;, scale_value);

  float keep_prob = 1.0;
  (void)tf_op.GetAttr(&quot;keep_prob&quot;, keep_prob);
  (void)npu_fa_op.SetAttr(&quot;keep_prob&quot;, keep_prob);

  int32_t pre_tokens = 2147483647;
  (void)tf_op.GetAttr(&quot;pre_tokens&quot;, pre_tokens);
  (void)npu_fa_op.SetAttr(&quot;pre_tokens&quot;, pre_tokens);

  int32_t next_tokens = 2147483647;
  (void)tf_op.GetAttr(&quot;next_tokens&quot;, next_tokens);
  (void)npu_fa_op.SetAttr(&quot;next_tokens&quot;, next_tokens);

  int32_t head_num = 0;
  (void)tf_op.GetAttr(&quot;head_num&quot;, head_num);
  (void)npu_fa_op.SetAttr(&quot;head_num&quot;, head_num);

  std::string input_layout;
  (void)tf_op.GetAttr(&quot;input_layout&quot;, input_layout);
  (void)npu_fa_op.SetAttr(&quot;input_layout&quot;, input_layout);

  int32_t inner_precise = 0;
  (void)tf_op.GetAttr(&quot;inner_precise&quot;, inner_precise);
  (void)npu_fa_op.SetAttr(&quot;inner_precise&quot;, inner_precise);

  int32_t sparse_mode = 0;
  (void)tf_op.GetAttr(&quot;sparse_mode&quot;, sparse_mode);
  (void)npu_fa_op.SetAttr(&quot;sparse_mode&quot;, sparse_mode);

  int32_t pse_type = 1;
  (void)tf_op.GetAttr(&quot;pse_type&quot;, pse_type);
  (void)npu_fa_op.SetAttr(&quot;pse_type&quot;, pse_type);

  int32_t seed = 0;
  (void)tf_op.GetAttr(&quot;seed&quot;, seed);
  (void)npu_fa_op.SetAttr(&quot;seed&quot;, seed);
  int32_t offset = 0;
  (void)tf_op.GetAttr(&quot;offset&quot;, offset);
  (void)npu_fa_op.SetAttr(&quot;offset&quot;, offset);
  int32_t out_dtype = 0;
  (void)tf_op.GetAttr(&quot;out_dtype&quot;, out_dtype);
  (void)npu_fa_op.SetAttr(&quot;out_dtype&quot;, out_dtype);  

  // 3. 创建输入Data
  std::vector&lt;Operator&gt; inputs;
  for (size_t i = 0UL; i &lt; tf_op.GetInputsSize(); i++) {
    const std::string data_name = &quot;Data_&quot; + std::to_string(i);
    Operator data_op = OperatorFactory::CreateOperator(data_name.c_str(), &quot;Data&quot;);
    (void)data_op.SetAttr(&quot;index&quot;, static_cast&lt;int32_t&gt;(i));
    inputs.emplace_back(data_op);
  }

  size_t index = 0UL;
  //4. 必选输入直接设置Data到算子输入
  (void)npu_fa_op.SetInput(&quot;query&quot;, inputs[index++]);
  (void)npu_fa_op.SetInput(&quot;key&quot;, inputs[index++]);
  (void)npu_fa_op.SetInput(&quot;value&quot;, inputs[index++]);

  // 5. 可选输入需要判断type属性的个数是否为0，不为0则表示可选输入已经启用
  std::vector&lt;DataType&gt; real_shift_type;
  (void)tf_op.GetAttr(&quot;real_shift_type&quot;, real_shift_type);
  if (!real_shift_type.empty()) {
    (void)npu_fa_op.SetInput(&quot;real_shift&quot;, inputs[index++]);
  }

  std::vector&lt;DataType&gt; drop_mask_type;
  (void)tf_op.GetAttr(&quot;drop_mask_type&quot;, drop_mask_type);
  if (!drop_mask_type.empty()) {
    (void)npu_fa_op.SetInput(&quot;drop_mask&quot;, inputs[index++]);
  }

  std::vector&lt;DataType&gt; padding_mask_type;
  (void)tf_op.GetAttr(&quot;padding_mask_type&quot;, padding_mask_type);
  if (!padding_mask_type.empty()) {
    (void)npu_fa_op.SetInput(&quot;padding_mask&quot;, inputs[index++]);
  }
  std::vector&lt;DataType&gt; atten_mask_type;
  (void)tf_op.GetAttr(&quot;atten_mask_type&quot;, atten_mask_type);
  if (!atten_mask_type.empty()) {
    (void)npu_fa_op.SetInput(&quot;atten_mask&quot;, inputs[index++]);
  }
  std::vector&lt;DataType&gt; prefix_type;
  (void)tf_op.GetAttr(&quot;prefix_type&quot;, prefix_type);
  if (!prefix_type.empty()) {
    (void)npu_fa_op.SetInput(&quot;prefix&quot;, inputs[index++]);
  }
  std::vector&lt;DataType&gt; actual_seq_qlen_type;
  (void)tf_op.GetAttr(&quot;actual_seq_qlen_type&quot;, actual_seq_qlen_type);
  if (!actual_seq_qlen_type.empty()) {
    (void)npu_fa_op.SetInput(&quot;actual_seq_qlen&quot;, inputs[index++]);
  }
  std::vector&lt;DataType&gt; actual_seq_kvlen_type;
  (void)tf_op.GetAttr(&quot;actual_seq_kvlen_type&quot;, actual_seq_kvlen_type);
  if (!actual_seq_kvlen_type.empty()) {
    (void)npu_fa_op.SetInput(&quot;actual_seq_kvlen&quot;, inputs[index++]);
  }

  std::vector&lt;DataType&gt; q_start_idx_type;
  (void)tf_op.GetAttr(&quot;q_start_idx_type&quot;, q_start_idx_type);
  if (!q_start_idx_type.empty()) {
    (void)npu_fa_op.SetInput(&quot;q_start_idx&quot;, inputs[index++]);
  }

  std::vector&lt;DataType&gt; kv_start_idx_type;
  (void)tf_op.GetAttr(&quot;kv_start_idx_type&quot;, kv_start_idx_type);
  if (!kv_start_idx_type.empty()) {
    (void)npu_fa_op.SetInput(&quot;kv_start_idx&quot;, inputs[index++]);
  }
  std::vector&lt;DataType&gt; d_scale_q_type;
  (void)tf_op.GetAttr(&quot;d_scale_q_type&quot;, d_scale_q_type);
  if (!d_scale_q_type.empty()) {
    (void)npu_fa_op.SetInput(&quot;d_scale_q&quot;, inputs[index++]);
  }
  std::vector&lt;DataType&gt; d_scale_k_type;
  (void)tf_op.GetAttr(&quot;d_scale_k_type&quot;, d_scale_k_type);
  if (!d_scale_k_type.empty()) {
    (void)npu_fa_op.SetInput(&quot;d_scale_k&quot;, inputs[index++]);
  }
  std::vector&lt;DataType&gt; d_scale_v_type;
  (void)tf_op.GetAttr(&quot;d_scale_v_type&quot;, d_scale_v_type);
  if (!d_scale_v_type.empty()) {
    (void)npu_fa_op.SetInput(&quot;d_scale_v&quot;, inputs[index++]);
  }
  std::vector&lt;DataType&gt; query_rope_type;
  (void)tf_op.GetAttr(&quot;query_rope_type&quot;, query_rope_type);
  if (!query_rope_type.empty()) {
    (void)npu_fa_op.SetInput(&quot;queryRope&quot;, inputs[index++]);
  }
  
  std::vector&lt;DataType&gt; key_rope_type;
  (void)tf_op.GetAttr(&quot;key_rope_type&quot;, key_rope_type);
  if (!key_rope_type.empty()) {
    (void)npu_fa_op.SetInput(&quot;keyRope&quot;, inputs[index++]);
  }  
  // 6. 使用npu_fa_op算子的输出构造图的输出。
  std::vector&lt;std::pair&lt;Operator, std::vector&lt;size_t&gt;&gt;&gt; output_indexs;
  std::vector&lt;size_t&gt; node_output_index;
  for (size_t i = 0UL; i &lt; npu_fa_op.GetOutputsSize(); i++) {
    node_output_index.emplace_back(i);
  }
  (void)output_indexs.emplace_back(std::make_pair(npu_fa_op, node_output_index));
  (void)graph.SetInputs(inputs).SetOutputs(output_indexs);
  return SUCCESS;
}

static Status FlashAttentionScoreMapping(const ge::Operator&amp; op_src, ge::Operator&amp; op_dst) {
  // 1. 调用默认映射函数即可
  if (AutoMappingByOpFn(op_src, op_dst) != ge::GRAPH_SUCCESS) {
    return FAILED;
  }
  // 2. 需要将TensorFlow算子名称设置到op_dst的original_type属性中，用于后续ParseOpToGraphFn回调函数的触发
  op_dst.SetAttr(&quot;original_type&quot;, &quot;FlashAttentionScore&quot;);
  return SUCCESS;
}

REGISTER_CUSTOM_OP(&quot;FlashAttentionScore&quot;)
    .FrameworkType(TENSORFLOW)
    .OriginOpType({&quot;FlashAttentionScore&quot;})
    .ParseParamsByOperatorFn(FlashAttentionScoreMapping) // 注册此函数用于实现算子本身属性的映射
    .ParseOpToGraphFn(AddOptionalPlaceholderForFA); // 注册此函数用于实现将tf中的输入转化为可选输入，改变连边关系
}  // namespace domi
</code></pre></div></li><li><p>在TensorFlow开源框架里注册FlashAttentionScore算子的原型定义，由于TensorFlow不支持可选输入，需要将其可选输入在TensorFlow原型中表示为动态输入，并通过属性来标记动态输入的个数，<strong>这些可选输入需要放置在原型定义的最后</strong>。示例代码（FlashAttentionScore.cc）如下：</p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>#include &lt;algorithm&gt;
#include &lt;atomic&gt;
#include &lt;map&gt; 
#include &quot;tensorflow/core/framework/common_shape_fns.h&quot;
#include &quot;tensorflow/core/framework/op.h&quot;
#include &quot;tensorflow/core/framework/op_kernel.h&quot; 
using namespace tensorflow;
using shape_inference::InferenceContext;
using shape_inference::ShapeHandle; 
using namespace std;
using namespace chrono; 
using OpKernelConstructionPtr = OpKernelConstruction*;
using OpKernelContextPtr = OpKernelContext*;
using InferenceContextPtr = ::tensorflow::shape_inference::InferenceContext*; 
namespace {
class CustOps : public OpKernel {
public:    
     explicit CustOps(OpKernelConstructionPtr context) : OpKernel(context) {}
     void Compute(OpKernelContextPtr context) override
    {
        std::cout &lt;&lt; &quot;Cust Ops not installed!!&quot; &lt;&lt; std::endl;
    }
     ~CustOps() override = default;};
}  // namespace 
namespace tensorflow {
REGISTER_OP(&quot;FlashAttentionScore&quot;)
    .Input(&quot;query: T&quot;)
    .Input(&quot;key: T&quot;)
    .Input(&quot;value: T&quot;)
    .Input(&quot;real_shift: real_shift_type&quot;)  // 可选输入在TensorFlow原型中注册为动态输入
    .Input(&quot;drop_mask: drop_mask_type&quot;)
    .Input(&quot;padding_mask: padding_mask_type&quot;)
    .Input(&quot;atten_mask: atten_mask_type&quot;)
    .Input(&quot;prefix: prefix_type&quot;)
    .Input(&quot;actual_seq_qlen: actual_seq_qlen_type&quot;)
    .Input(&quot;actual_seq_kvlen: actual_seq_kvlen_type&quot;)
    .Input(&quot;q_start_idx: q_start_idx_type&quot;)
    .Input(&quot;kv_start_idx: kv_start_idx_type&quot;)
    .Input(&quot;d_scale_q: d_scale_q_type&quot;)
    .Input(&quot;d_scale_k: d_scale_k_type&quot;)
    .Input(&quot;d_scale_v: d_scale_v_type&quot;)
    .Input(&quot;query_rope: query_rope_type&quot;)
    .Input(&quot;key_rope: key_rope_type&quot;)
    .Output(&quot;softmax_max: float32&quot;)
    .Output(&quot;softmax_sum: float32&quot;)
    .Output(&quot;softmax_out: T&quot;)
    .Output(&quot;attention_out: T&quot;)
    .Attr(&quot;scale_value: float = 1.0&quot;)
    .Attr(&quot;keep_prob: float = 1.0&quot;)
    .Attr(&quot;pre_tokens: int = 2147483647&quot;)
    .Attr(&quot;next_tokens: int = 2147483647&quot;)
    .Attr(&quot;head_num: int&quot;)
    .Attr(&quot;input_layout: string&quot;)
    .Attr(&quot;inner_precise: int = 0&quot;)
    .Attr(&quot;sparse_mode: int = 0&quot;)
    .Attr(&quot;pse_type: int = 1&quot;)
    .Attr(&quot;seed: int = 0&quot;)
    .Attr(&quot;offset: int = 0&quot;)
    .Attr(&quot;out_dtype: int = 0&quot;) 
    .Attr(&quot;T: {float16, float32, bfloat16} = DT_FLOAT&quot;)
    .Attr(&quot;real_shift_type: list({float16, float32, bfloat16}) &gt;= 0&quot;) // 通过属性来标记动态输入个数
    .Attr(&quot;drop_mask_type: list({uint8}) &gt;= 0&quot;)
    .Attr(&quot;padding_mask_type: list({float16, float32, bfloat16}) &gt;= 0&quot;)
    .Attr(&quot;atten_mask_type: list({bool, uint8}) &gt;= 0&quot;)
    .Attr(&quot;prefix_type: list({int64}) &gt;= 0&quot;)
    .Attr(&quot;actual_seq_qlen_type: list({int64}) &gt;= 0&quot;)
    .Attr(&quot;actual_seq_kvlen_type: list({int64}) &gt;= 0&quot;)
    .Attr(&quot;q_start_idx_type: list({int64}) &gt;= 0&quot;)
    .Attr(&quot;kv_start_idx_type: list({int64}) &gt;= 0&quot;)
    .Attr(&quot;d_scale_q_type: list({float32}) &gt;= 0&quot;)
    .Attr(&quot;d_scale_k_type: list({float32}) &gt;= 0&quot;)
    .Attr(&quot;d_scale_v_type: list({float32}) &gt;= 0&quot;)
    .Attr(&quot;query_rope_type: list({float32}) &gt;= 0&quot;)
    .Attr(&quot;key_rope_type: list({float32}) &gt;= 0&quot;)
    .SetShapeFn([](InferenceContext *c) {
      return Status::OK();
    });
REGISTER_KERNEL_BUILDER(Name(&quot;FlashAttentionScore&quot;).Device(DEVICE_CPU), CustOps);
}  // namespace tensorflow
</code></pre></div><p>使用如下命令对上述代码进行编译，产物为libcustom_ops.so，后续的算子调用脚本中可通过load_op_library接口加载该so为python模块，从而调用自定义算子。</p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>TF_CFLAGS=( $(python3 -c &#39;import tensorflow as tf; print(&quot; &quot;.join(tf.sysconfig.get_compile_flags()))&#39;) )     // 获取TensorFlow编译选项
TF_LFLAGS=( $(python3 -c &#39;import tensorflow as tf; print(&quot; &quot;.join(tf.sysconfig.get_link_flags()))&#39;) )        // 获取TensorFlow链接选项
SOURCE_FILES=FlashAttentionScore.cc                                                                          // 包含TensorFlow算子注册和CPU内核实现的cc文件
g++ -std=c++14 -shared $SOURCE_FILES -o \${Path}/libflashattention.so -fPIC \${TF_CFLAGS[@]} \${TF_LFLAGS[@]} -O2   // 编译命令，产物为libflashattention.so，\${Path}为自定义的路径，后续TensorFlow可通过load_op_library加载该so为python模块，调用自定义算子
</code></pre></div></li><li><p><span id="li17250141634510"></span>封装一个TensorFlow的算子调用接口，在此接口中处理可选输入。在该脚本需要加载上一步骤编译好的动态库。</p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>from tensorflow.python.framework import ops
import tensorflow as tf
tfOpLib = tf.load_op_library(&quot;../build/tf_ops/libflashattention.so&quot;)
# 假如外部未启用该可选输入，则给底层传入空列表
def create_optional_input_list(input):
    input_list = []
    if not input is None:
        input_list.append(input)
    return input_list
# flash_attention_score封装函数
def npu_flash_attention(query, key, value, head_num, input_layout, real_shift=None, drop_mask=None, padding_mask=None,
                        atten_mask=None, prefix=None, actual_seq_qlen=None, actual_seq_kvlen=None,
                        q_start_idx=None, kv_start_idx=None, d_scale_q=None,d_scale_k=None,d_scale_v=None,query_rope=None,key_rope=None,scale_value=1.0, keep_prob=1.0,
                        pre_tokens=2147483647, next_tokens=2147483647, inner_precise=0, sparse_mode=0,
                        pse_type=1,seed=0,offset=0,out_dtype=0
):
    output = tfOpLib.flash_attention_score(query=query, key=key, value=value,
            real_shift=create_optional_input_list(real_shift), drop_mask=create_optional_input_list(drop_mask),
            padding_mask=create_optional_input_list(padding_mask), atten_mask=create_optional_input_list(atten_mask),
            prefix=create_optional_input_list(prefix), actual_seq_qlen=create_optional_input_list(actual_seq_qlen),
            actual_seq_kvlen=create_optional_input_list(actual_seq_kvlen), q_start_idx=create_optional_input_list(q_start_idx),
            kv_start_idx=create_optional_input_list(kv_start_idx),d_scale_q=create_optional_input_list(d_scale_q),
            d_scale_k=create_optional_input_list(d_scale_k),d_scale_v=create_optional_input_list(d_scale_v),
            query_rope=create_optional_input_list(query_rope),key_rope=create_optional_input_list(key_rope),
            scale_value=scale_value, keep_prob=keep_prob, pre_tokens=pre_tokens, next_tokens=next_tokens,
            head_num=head_num, input_layout=input_layout, inner_precise=inner_precise, sparse_mode=sparse_mode,
            pse_type=pse_type,seed=seed,offset=offset,out_dtype=out_dtype
)
    return output
</code></pre></div></li><li><p>测试脚本中实现自定义算子的调用。假设<a href="#li17250141634510">上一步骤</a>中代码文件保存为ops.py，从ops中导入npu_flash_attention函数并使用。TensorFlow 2.6.5调用代码如下：</p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>import sys
from ops import npu_flash_attention

import tensorflow as tf
import numpy as np
tf.compat.v1.disable_eager_execution()

import npu_device
from npu_device.compat.v1.npu_init import *
npu_device.compat.enable_v1()

def sess_config():
    config = tf.compat.v1.ConfigProto()
    custom_op = config.graph_options.rewrite_options.custom_optimizers.add()
    custom_op.name = &quot;NpuOptimizer&quot;
    config.graph_options.rewrite_options.remapping = RewriterConfig.OFF
    config.graph_options.rewrite_options.memory_optimization = RewriterConfig.OFF
    return config

shape = [1, 32, 32]
query_np = np.random.randn(*shape).astype(np.float16)
key_np = np.random.randn(*shape).astype(np.float16)
value_np = np.random.randn(*shape).astype(np.float16)

query = tf.Variable(query_np, tf.float16)
key = tf.Variable(key_np, tf.float16)
value = tf.Variable(value_np, tf.float16)

mask = tf.zeros(shape=(shape[0], 1, shape[1], shape[1]), dtype=tf.uint8)

head_num = 1
input_layout = &quot;BSH&quot;
flash_result_t = npu_flash_attention(query, key, value, head_num, input_layout, atten_mask=mask)

with tf.compat.v1.Session(config=sess_config()) as sess:
    sess.run(tf.compat.v1.global_variables_initializer())
    flash_result = sess.run(flash_result_t)
    print(flash_result)
</code></pre></div></li></ol><h2 id="动态输入算子映射关系开发">动态输入算子映射关系开发<span id="section108910963218"></span><a class="header-anchor" href="#动态输入算子映射关系开发">​</a></h2><p>对于存在动态输入/输出的算子，需要在插件的回调函数ParseParamByOpFunc中使用AutoMappingByOpFnDynamic实现TensorFlow算子和CANN算子的匹配。通过DynamicInputOutputInfo结构类描述动态输入/输出的信息，将动态输入/输出的名称和描述其个数的属性名绑定，再传入AutoMappingByOpFnDynamic实现自动匹配。</p><p>以ParseSingleExample算子为例，插件适配代码如下：</p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>#include &quot;register/register.h&quot;
namespace domi {
Status ParseSingleExampleMapping(const ge::Operator&amp; op_src, ge::Operator&amp; op) {
  std::vector&lt;DynamicInputOutputInfo&gt; value;
  const std::string dynamic_input_name_dense_defaults = &quot;dense_defaults&quot;;
  const std::string dynamic_input_attr_name_dense_defaults = &quot;Tdense&quot;;
  DynamicInputOutputInfo input(kInput, dynamic_input_name_dense_defaults.c_str(),
      dynamic_input_name_dense_defaults.size(), dynamic_input_attr_name_dense_defaults.c_str(),
      dynamic_input_attr_name_dense_defaults.size());
  value.push_back(input);
  const std::string dynamic_output_name_sparse_indices = &quot;sparse_indices&quot;;
  const std::string dynamic_output_attr_name_sparse_indices = &quot;num_sparse&quot;;
  DynamicInputOutputInfo output(kOutput, 
      dynamic_output_name_sparse_indices.c_str(),
      dynamic_output_name_sparse_indices.size(), dynamic_output_attr_name_sparse_indices.c_str(),
      dynamic_output_attr_name_sparse_indices.size());
  value.push_back(output);
  const std::string dynamic_output_name_sparse_values = &quot;sparse_values&quot;;
  const std::string dynamic_output_attr_name_sparse_values = &quot;sparse_types&quot;;
  DynamicInputOutputInfo output1(kOutput, 
      dynamic_output_name_sparse_values.c_str(),
      dynamic_output_name_sparse_values.size(), dynamic_output_attr_name_sparse_values.c_str(),
      dynamic_output_attr_name_sparse_values.size());
  value.push_back(output1);
  const std::string dynamic_output_name_sparse_shapes = &quot;sparse_shapes&quot;;
  const std::string dynamic_output_attr_name_sparse_shapes = &quot;sparse_types&quot;;
  DynamicInputOutputInfo output2(kOutput, 
      dynamic_output_name_sparse_shapes.c_str(),
      dynamic_output_name_sparse_shapes.size(), dynamic_output_attr_name_sparse_shapes.c_str(),
      dynamic_output_attr_name_sparse_shapes.size());
  value.push_back(output2);
  const std::string dynamic_output_name_dense_values = &quot;dense_values&quot;;
  const std::string dynamic_output_attr_name_dense_values = &quot;Tdense&quot;;
  DynamicInputOutputInfo output3(kOutput, 
      dynamic_output_name_dense_values.c_str(),
      dynamic_output_name_dense_values.size(), dynamic_output_attr_name_dense_values.c_str(),
      dynamic_output_attr_name_dense_values.size());
  value.push_back(output3);
  AutoMappingByOpFnDynamic(op_src, op, value);
  return SUCCESS;
}

// register ParseSingleExample op to GE
REGISTER_CUSTOM_OP(&quot;ParseSingleExample&quot;)
    .FrameworkType(TENSORFLOW)
    .OriginOpType(&quot;ParseSingleExample&quot;)
    .ParseParamsByOperatorFn(ParseSingleExampleMapping)
    }
</code></pre></div><div class="callout callout-note"><p class="callout-title"><svg class="callout-icon" viewBox="0 0 16 16" width="16" height="16"><path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8Zm8-6.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13ZM6.5 7.75A.75.75 0 0 1 7.25 7h1a.75.75 0 0 1 .75.75v2.75h.25a.75.75 0 0 1 0 1.5h-2a.75.75 0 0 1 0-1.5h.25v-2h-.25a.75.75 0 0 1-.75-.75ZM8 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"></path></svg>说明</p><p>暂不支持同时有可选输入和动态输入的算子映射。</p></div></article></div>`,1)])])}const m=e(p,[["render",i]]);export{h as __pageData,m as default};
