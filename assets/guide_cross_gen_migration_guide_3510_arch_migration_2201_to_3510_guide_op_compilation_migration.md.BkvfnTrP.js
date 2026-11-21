import{_ as t,o as e,a as i,b as o}from"./app.BGziXukh.js";const l=JSON.parse('{"title":"","description":"","frontmatter":{"breadcrumbs":[{"text":"Ascend C算子开发指南","link":"/guide/getting_started/ascend_c_overview_and_learning_path"},{"text":"跨代迁移兼容性指南","link":"/guide/cross_gen_migration_guide/cross_gen_migration_guide"},{"text":"3510架构迁移指导","link":"/guide/cross_gen_migration_guide/3510_arch_migration/3510_arch_migration"},{"text":"2201迁移3510指导","link":"/guide/cross_gen_migration_guide/3510_arch_migration/2201_to_3510_guide/2201_to_3510_guide"},{"text":"算子编译迁移指导","link":"/guide/cross_gen_migration_guide/3510_arch_migration/2201_to_3510_guide/op_compilation_migration"}]},"headers":[],"relativePath":"guide/cross_gen_migration_guide/3510_arch_migration/2201_to_3510_guide/op_compilation_migration.md","filePath":"guide/cross_gen_migration_guide/3510_arch_migration/2201_to_3510_guide/op_compilation_migration.md","lastUpdated":1794274482000}'),n={name:"guide/cross_gen_migration_guide/3510_arch_migration/2201_to_3510_guide/op_compilation_migration.md"};function _(s,a,d,c,r,g){return e(),i("div",null,[...a[0]||(a[0]=[o(`<div><article class="markdown-body"><h1>算子编译迁移指导<span id="ZH-CN_TOPIC_0000002503428219"></span></h1><p>进行算子编译时，开发者需要感知不同架构、不同的AI处理器型号。</p><ul><li><p>异构编译场景，开发者使用命令行或者编写Cmake文件进行编译的情况，需要手动修改NPU架构版本号或者AI处理器型号。以修改NPU架构版本号为例，更改编译命令行或编译工程CMakeLists.txt文件中的--npu-arch配置，示例如下：</p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>...

target_compile_options(demo PRIVATE
    // 将dav-xxxx更换为对应NPU架构版本号
    $&lt;$&lt;COMPILE_LANGUAGE:ASC&gt;:--npu-arch=dav-xxxx&gt;
)
</code></pre></div><p>完成<code>--npu-arch</code>配置后，迁移过程中还可根据算子实现、目标架构和编译场景按需配置其他内置编译宏开关。相关开关的适用范围、使用约束和配置方式请参考<a href="../../../programming_guide/compilation_and_execution/operator_compilation/ai_core_operator_compilation.html#section57020345148">内置编译宏开关</a>。</p></li><li><p>对于自定义算子工程的情况，开发者在CMakeLists.txt（或CMakePresets.json）中配置ASCEND_SOC_SERIES字段；存量工程使用ASCEND_COMPUTE_UNIT的方式同样有效，但两者不能同时配置。开发者需要在进行算子原型定义时，通过<a href="../../../../api/Utils-API/prototype_register_management/OpAICoreDef/AddConfig.html">AddConfig</a>接口注册算子支持的AI处理器型号以及相关的配置信息。</p><p>通过该接口注册AI处理器型号的样例如下，ascendxxx应填写构建目标标识，可参考<a href="https://www.hiascend.com/document/detail/zh/AscendFAQ/ProduTech/productform/hardwaredesc_0001.html">产品形态说明</a>中的soc_series。</p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>...

namespace ops {
class AddCustom : public OpDef {
public:
    AddCustom(const char* name) : OpDef(name)
    {
        ...
        // 将ascendXXX更换为对应芯片版本
        this-&gt;AICore().AddConfig(&quot;ascendxxx&quot;);
        
    }
};
OP_ADD(AddCustom);
} // namespace ops
</code></pre></div></li></ul></article></div>`,1)])])}const h=t(n,[["render",_]]);export{l as __pageData,h as default};
