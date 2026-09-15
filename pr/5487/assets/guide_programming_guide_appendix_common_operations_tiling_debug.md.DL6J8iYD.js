import{_ as t,o as e,a as n,b as l}from"./app.DKoEZOcr.js";const _=JSON.parse('{"title":"","description":"","frontmatter":{"breadcrumbs":[{"text":"Ascend C算子开发指南","link":"/guide/getting_started/ascend_c_overview_and_learning_path"},{"text":"编程指南","link":"/guide/programming_guide/document_structure"},{"text":"附录","link":"/guide/programming_guide/appendix/show_kernel_debug_data_tool"},{"text":"常用操作","link":"/guide/programming_guide/appendix/common_operations/develop_dynamic_input_operator"},{"text":"如何进行Tiling调测","link":"/guide/programming_guide/appendix/common_operations/tiling_debug"}]},"headers":[],"relativePath":"guide/programming_guide/appendix/common_operations/tiling_debug.md","filePath":"guide/programming_guide/appendix/common_operations/tiling_debug.md","lastUpdated":1786949923000}'),a={name:"guide/programming_guide/appendix/common_operations/tiling_debug.md"};function o(g,i,d,s,r,p){return e(),n("div",null,[...i[0]||(i[0]=[l(`<div><article class="markdown-body"><h1>如何进行Tiling调测<span id="ZH-CN_TOPIC_0000002305497828"></span></h1><p>在<a href="../../advanced_programming/aclnn_operator_development/overview.html">工程化算子开发</a>过程中，开发者需实现Tiling函数，该函数原型是固定的，接受TilingContext作为输入。框架负责构造TilingContext并调用Tiling函数。若需单独进行Tiling调测，开发者可通过OpTilingRegistry加载编译后的Tiling动态库，获取Tiling函数的指针并进行调用，调用时Tiling函数的TilingContext入参使用ContextBuilder构建。</p><p>以下是具体步骤：</p><ol><li><p>参考工程化算子开发的开发步骤，完成算子实现，并通过<strong>算子包编译</strong>或<strong>算子动态库编译</strong>获取对应的Tiling动态库文件。</p><ul><li>算子包编译：Tiling实现对应的动态库为算子包部署目录下的liboptiling.so。具体路径可参考<a href="../../advanced_programming/aclnn_operator_development/compilation_and_deployment/basic_process.html#operator-package-deployment">算子包部署</a>。</li><li>动态库编译：Tiling实现集成在算子动态库libcust_opapi.so中。具体路径可参考<a href="../../advanced_programming/aclnn_operator_development/compilation_and_deployment/dynamic_static_lib_compilation.html">算子动态库和静态库编译</a>。</li></ul></li><li><p>编写测试代码。</p><ul><li>使用ContextBuilder配置输入输出Tensor的形状、数据类型、格式及平台信息等，构建TilingContext。</li><li>通过OpTilingRegistry的<a href="../../../../api/Utils-API/Tiling_tuning/OpTilingRegistry/LoadTilingLibrary.html">LoadTilingLibrary</a>接口加载Tiling动态库；使用<a href="../../../../api/Utils-API/Tiling_tuning/OpTilingRegistry/GetTilingFunc.html">GetTilingFunc</a>接口获取Tiling函数指针。</li><li>执行Tiling函数，验证其正确性。</li></ul><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>// test.cpp
#include &lt;iostream&gt;
#include &quot;exe_graph/runtime/storage_shape.h&quot;
#include &quot;tiling/context/context_builder.h&quot;

int main()
{
    gert::StorageShape x_shape = {{2, 32}, {2, 32}};
    gert::StorageShape y_shape = {{2, 32}, {2, 32}};
    gert::StorageShape z_shape = {{2, 32}, {2, 32}};

    auto param = gert::TilingData::CreateCap(4096);
    auto workspace_size_holder = gert::ContinuousVector::Create&lt;size_t&gt;(4096);
    auto ws_size = reinterpret_cast&lt;gert::ContinuousVector *&gt;(workspace_size_holder.get());

    auto holder = context_ascendc::ContextBuilder()
                                .NodeIoNum(2, 1)
                                .IrInstanceNum({1, 1})
                                .AddInputTd(0, ge::DT_FLOAT, ge::FORMAT_ND, ge::FORMAT_ND, x_shape)
                                .AddInputTd(1, ge::DT_FLOAT, ge::FORMAT_ND, ge::FORMAT_ND, y_shape)
                                .AddOutputTd(0, ge::DT_FLOAT, ge::FORMAT_ND, ge::FORMAT_ND, z_shape)
                                .TilingData(param.get())
                                .Workspace(ws_size)
                                .AddPlatformInfo(&quot;Ascendxxxyy&quot;)
                                .BuildTilingContext();
    auto tilingContext = holder-&gt;GetContext&lt;gert::TilingContext&gt;();
    context_ascendc::OpTilingRegistry tmpIns;
    bool flag = tmpIns.LoadTilingLibrary(&quot;/your/path/to/so_path/liboptiling.so&quot;);  // 加载对应的Tiling动态库文件
    if (flag == false) {
        std::cout &lt;&lt; &quot;Failed to load tiling so&quot; &lt;&lt; std::endl;
        return -1;
    }
    context_ascendc::TilingFunc tilingFunc = tmpIns.GetTilingFunc(&quot;AddCustom&quot;);  // 获取AddCustom算子对应的Tiling函数,此处入参为OpType
    if (tilingFunc != nullptr) {
        ge::graphStatus ret = tilingFunc(tilingContext);  // 执行Tiling函数
        if (ret != ge::GRAPH_SUCCESS) {
            std::cout &lt;&lt; &quot;Exec tiling func failed.&quot; &lt;&lt; std::endl;
            return -1;
        }
    } else {
        std::cout &lt;&lt; &quot;Get tiling func failed.&quot; &lt;&lt; std::endl;
        return -1;
    }
    return 0;
}
</code></pre></div></li><li><p>编译测试代码。</p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>g++ test.cpp -I\${INSTALL_DIR}/include  -L\${INSTALL_DIR}/lib64 -Wl,-rpath,\${INSTALL_DIR}/lib64 -ltiling_api -lc_sec -lgraph_base -lregister -lunified_dlog -lplatform -o test
</code></pre></div><ul><li><code>\${INSTALL_DIR}</code>请替换为CANN软件安装后文件存储路径。以root用户安装为例，安装后文件默认存储路径为：/usr/local/Ascend/cann。</li><li>开发者根据需要链接依赖的动态库，必需链接的动态库有： <ul><li>libtiling_api.so：Tiling功能相关的动态库，包含ContextBuilder类、OpTilingRegistry类等。</li><li>libc_sec.so：安全函数库，libtiling_api.so依赖该库。</li><li>libgraph_base.so：基础数据结构与接口库，libtiling_api.so依赖该库。</li><li>libregister.so：业务函数注册相关库（例如Tiling函数注册，算子原型注册等）。</li><li>libunified_dlog.so：log库，libtiling_api.so依赖该库。</li><li>libplatform.so：平台信息库，libtiling_api.so依赖该库；Tiling函数中使用硬件平台信息时，需要依赖该库。</li></ul></li></ul></li><li><p>执行可执行文件。</p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>./test
</code></pre></div></li></ol></article></div>`,1)])])}const u=t(a,[["render",o]]);export{_ as __pageData,u as default};
