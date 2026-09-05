import{_ as t,o as e,a as n,b as o}from"./app.C41L12d5.js";const g=JSON.parse('{"title":"","description":"","frontmatter":{"breadcrumbs":[{"text":"Ascend C算子开发指南","link":"/guide/getting_started/ascend_c_overview_and_learning_path"},{"text":"编程指南","link":"/guide/programming_guide/document_structure"},{"text":"高级编程","link":"/guide/programming_guide/advanced_programming/advanced_programming"},{"text":"AI框架算子适配","link":"/guide/programming_guide/advanced_programming/ai_framework_adaptation/overview"},{"text":"ONNX框架","link":"/guide/programming_guide/advanced_programming/ai_framework_adaptation/onnx_framework/adaptation_plugin_development"},{"text":"适配插件开发","link":"/guide/programming_guide/advanced_programming/ai_framework_adaptation/onnx_framework/adaptation_plugin_development"}]},"headers":[],"relativePath":"guide/programming_guide/advanced_programming/ai_framework_adaptation/onnx_framework/adaptation_plugin_development.md","filePath":"guide/programming_guide/advanced_programming/ai_framework_adaptation/onnx_framework/adaptation_plugin_development.md","lastUpdated":1787620014000}'),i={name:"guide/programming_guide/advanced_programming/ai_framework_adaptation/onnx_framework/adaptation_plugin_development.md"};function r(p,a,s,l,d,c){return e(),n("div",null,[...a[0]||(a[0]=[o(`<div><article class="markdown-body"><h1>适配插件开发<span id="ZH-CN_TOPIC_0000001741610328"></span></h1><div data-filter="950,A3"><div class="callout callout-note"><p class="callout-title"><svg class="callout-icon" viewBox="0 0 16 16" width="16" height="16"><path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8Zm8-6.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13ZM6.5 7.75A.75.75 0 0 1 7.25 7h1a.75.75 0 0 1 .75.75v2.75h.25a.75.75 0 0 1 0 1.5h-2a.75.75 0 0 1 0-1.5h.25v-2h-.25a.75.75 0 0 1-.75-.75ZM8 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"></path></svg>说明</p><div data-filter="A3"><p>针对Atlas A3 训练系列产品/Atlas A3 推理系列产品，暂不支持ONNX框架算子调用。</p></div><div data-filter="950"><p>针对Ascend 950PR/Ascend 950DT，暂不支持ONNX框架算子调用。</p></div></div></div><p>您可以参考本章节进行算子适配插件的开发，将ONNX框架的算子映射成适配AI处理器的算子（下文简称CANN算子），从而完成从ONNX框架调用Ascend C自定义算子的过程。如果只涉及插件开发，也可以不依赖自定义算子工程，参考<a href="https://gitcode.com/cann/cann-samples/tree/master/Samples/0_Introduction">LINK</a>中的custom_op_in_graph样例生成算子插件so后，通过ASCEND_CUSTOM_OPP_PATH指定so所在路径进行使用。</p><p>完成<a href="../tensorflow_framework.html#li123241091016">算子工程创建</a>后，会在算子工程目录下生成framework/onnx_plugin目录，用于存放ONNX框架适配插件实现文件。以自定义CANN算子LeakyReluCustom为例，算子工程目录如下：</p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>LeakyReluCustom
├── build.sh             // 编译入口脚本
├── cmake 
├── CMakeLists.txt       // 算子工程的CMakeLists.txt
├── CMakePresets.json    // 编译配置项
├── framework            // 框架适配插件实现文件目录
│   ├── onnx_plugin     //  ONNX框架适配插件实现文件目录
│   │   ├── CMakeLists.txt    
│   │   ├── leaky_relu_custom_plugin.cc // ONNX框架适配插件实现文件    
│   ├── CMakeLists.txt
├── op_host                      // host侧实现文件
├── op_kernel                    // kernel侧实现文件
└── scripts                      // 自定义算子工程打包相关脚本所在目录
</code></pre></div><p>下文主要讲解ONNX框架适配插件实现文件（leaky_relu_custom_plugin.cc ）的开发流程。</p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>#include &quot;register/register.h&quot;
#include &quot;graph/operator.h&quot;
#include &quot;json.hpp&quot;
namespace domi {
    Status ParseParamByOpFunc(const ge::Operator&amp; op_src, ge::Operator&amp; op_dest) {
        //...
    }
    REGISTER_CUSTOM_OP(&quot;OpType&quot;)
        .FrameworkType(ONNX) 
        .OriginOpType(&quot;OriginOpType&quot;)
        .ParseParamsByOperatorFn(ParseParamByOpFunc)   //用来注册解析算子属性的函数
        .ImplyType(ImplyType::TVM);  // Ascend C算子实现类型设置为TVM
}
</code></pre></div><ol><li><p>包含所需头文件。</p><ul><li>register.h，存储在CANN软件安装后文件存储路径的“include/register/”目录下，包含该头文件，可使用算子注册相关类，调用算子注册相关的接口。</li><li>operator.h（可选），存储在CANN软件安装后文件存储路径的“include/graph/”目录下，包含该头文件，可以使用Operator类相关接口，获取算子输入输出及属性等算子信息。</li><li>json.hpp，用于进行ONNX数据定义的解析，将String类型的算子参数定义转换为json格式。若样例工程中未提供“json.hpp”文件，用户可以自行下载，并将“json.hpp”放在工程可以找到的任意路径下，然后包含此头文件即可，下载路径可参见<a href="https://github.com/nlohmann/json/blob/develop/include/nlohmann/json.hpp">json.hpp</a>。</li></ul></li><li><p>使用REGISTER_CUSTOM_OP宏，完成CANN算子和ONNX框架的算子映射关系注册。使用方法如下：</p><ul><li>REGISTER_CUSTOM_OP：注册自定义算子，OpType为算子类型名称，需要与<a href="../../aclnn_operator_development/design_and_implementation/operator_prototype_definition.html">算子原型注册</a>中的OpType保持一致。</li><li>FrameworkType：ONNX代表原始框架为ONNX。</li><li>OriginOpType：算子在原始框架中的类型。例如自定义算子_OpTypeA_，对应ONNX算子库版本opset_version=11，应传入“ai.onnx::11::<em>OpTypeA</em>”，当前支持的ONNX版本范围为9~15。</li><li>ParseParamsByOperatorFn(<em>ParseParamByOpFunc</em>)：用来注册解析算子参数实现映射关系的回调函数，需要用户自定义实现回调函数ParseParamByOpFunc。具体实现方式参考<a href="#li213610403113">3</a>。</li><li>ImplyType：指定算子的实现方式。Ascend C算子实现类型设置为TVM。</li></ul></li><li><p><span id="li213610403113"></span>实现回调函数ParseParamByOpFunc。其函数声明如下所示：</p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>Status ParseParamByOpFunc(const ge::Operator&amp; op_src, ge::Operator&amp; op_dest)
</code></pre></div><ul><li><em>ParseParamByOpFunc</em>：函数名称，用户自定义。</li><li>op_src：ONNX框架定义的Operator类对象，包含ONNX模型中自定义的算子属性信息，定义来源于ONNX框架的原始模型文件。</li><li>op_dest：CANN算子数据结构，保存算子信息。</li></ul><p>开发者需要在回调函数中实现属性的解析和映射，具体实现方式如下：</p><p>ONNX原始模型中，属性为repeated message类型，对于repeated message类型的参数，可使GetAttr(const char *name, ge::AscendString &amp;attr_value)接口获取其属性值，然后将AscendString类型的属性值转换为String类型，再将其转换为json格式进行属性字段的解析。</p><p>实现如下所示：</p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>Status ParseOnnxParamsLeakyReluCustom(const ge::Operator&amp; op_src, ge::Operator&amp; op_dest) {
  // trans op_src to op_dest
  // if op_src get required attr failed, need to return Failed
  // if op_src get optional attr failed, need to return Failed or set a default value
  float negative_slope = 0.01f;
  string negative_slope_str;
  AscendString attrs_string;
  // 使用固定属性名称“attribute”获取ONNX算子中的属性，并赋值给AscendString类型对象
  if (ge::GRAPH_SUCCESS == op_src.GetAttr(&quot;attribute&quot;, attrs_string)) {
    // 转换为json格式
    json attrs = json::parse(attrs_string.GetString());
    for (json attr : attrs[&quot;attribute&quot;]) {
      if (attr[&quot;name&quot;] == &quot;alpha&quot; &amp;&amp; attr[&quot;type&quot;] == kTypeFloat) {
        negative_slope_str = attr[&quot;f&quot;];  // float type in json has accuracy loss, so we use string type to store it
        negative_slope = atof(negative_slope_str.c_str());
      }
    }
  }
  op_dest.SetAttr(&quot;negative_slope&quot;, negative_slope);
  return SUCCESS;
}
</code></pre></div><div class="callout callout-note"><p class="callout-title"><svg class="callout-icon" viewBox="0 0 16 16" width="16" height="16"><path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8Zm8-6.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13ZM6.5 7.75A.75.75 0 0 1 7.25 7h1a.75.75 0 0 1 .75.75v2.75h.25a.75.75 0 0 1 0 1.5h-2a.75.75 0 0 1 0-1.5h.25v-2h-.25a.75.75 0 0 1-.75-.75ZM8 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"></path></svg>说明</p><ul><li>当前版本GetAttr与SetAttr接口不支持对原始文件中数据类型为double和uint64的字段进行解析。</li><li>使用ATC工具执行模型转换时，对属性的获取情况不会进行强校验。所以进行算子适配插件实现时，若用户调用GetAttr失败，建议根据算子实际情况增加相应的处理逻辑，例如，针对必选属性，可返回失败，针对可选属性，可设置默认值。</li></ul></div></li></ol></article></div>`,1)])])}const h=t(i,[["render",r]]);export{g as __pageData,h as default};
