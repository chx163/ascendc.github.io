import{_ as t,o as e,a as n,b as o}from"./app.BGziXukh.js";const u=JSON.parse('{"title":"","description":"","frontmatter":{"breadcrumbs":[{"text":"Ascend C算子开发指南","link":"/guide/getting_started/ascend_c_overview_and_learning_path"},{"text":"编程指南","link":"/guide/programming_guide/programming_guide"},{"text":"高级编程","link":"/guide/programming_guide/advanced_programming/advanced_programming"},{"text":"算子入图开发","link":"/guide/programming_guide/advanced_programming/operator_graph_development/operator_graph_development"},{"text":"图编译和图执行","link":"/guide/programming_guide/advanced_programming/operator_graph_development/graph_compilation_and_execution"}]},"headers":[],"relativePath":"guide/programming_guide/advanced_programming/operator_graph_development/graph_compilation_and_execution.md","filePath":"guide/programming_guide/advanced_programming/operator_graph_development/graph_compilation_and_execution.md","outlineHeaders":[{"level":2,"title":"环境要求","slug":"环境要求","link":"#环境要求"},{"level":2,"title":"准备验证代码工程","slug":"准备验证代码工程","link":"#准备验证代码工程"},{"level":2,"title":"生成单算子离线模型文件","slug":"生成单算子离线模型文件","link":"#生成单算子离线模型文件"},{"level":2,"title":"编写验证代码","slug":"编写验证代码","link":"#编写验证代码"},{"level":2,"title":"运行和验证","slug":"运行和验证","link":"#运行和验证"}],"lastUpdated":1794274482000}'),s={name:"guide/programming_guide/advanced_programming/operator_graph_development/graph_compilation_and_execution.md"};function p(i,a,c,d,l,h){return e(),n("div",null,[...a[0]||(a[0]=[o(`<div><article class="markdown-body"><h1>图编译和图执行<span id="ZH-CN_TOPIC_0000001920158120"></span></h1><p>本节通过单算子模型执行的样例来介绍图模式下图编译和图执行流程。单算子模型执行是指基于图IR执行算子，先编译算子（例如，使用ATC工具将Ascend IR定义的单算子描述文件编译成算子om模型文件），再调用acl接口加载算子模型，最后调用acl接口执行算子。</p><h2 id="环境要求">环境要求<span id="zh-cn_topic_0000001541959061_section19582183344920"></span><a class="header-anchor" href="#环境要求">​</a></h2><ul><li><p>已参考<a href="../../../getting_started/environment_setup.html">环境准备</a>，完成CANN驱动和软件的安装，配置CANN软件所需基本环境变量。</p><p>安装CANN软件后，使用CANN运行用户进行编译、运行时，需要以CANN运行用户登录环境，执行<code>source \${INSTALL_DIR}/set_env.sh</code>命令设置环境变量。<code>\${INSTALL_DIR}</code>请替换为CANN软件安装后文件存储路径。以root用户安装为例，安装后文件默认存储路径为：/usr/local/Ascend/cann。</p></li><li><p>已参考<a href="../aclnn_operator_development/overview.html">Aclnn算子工程化开发</a>完成算子的开发和部署。</p></li></ul><h2 id="准备验证代码工程">准备验证代码工程<span id="zh-cn_topic_0000001541959061_section2021523012501"></span><a class="header-anchor" href="#准备验证代码工程">​</a></h2><p>代码工程目录结构如下，您可以参考<a href="https://gitcode.com/cann/asc-devkit/tree/master/examples/01_simd_cpp_api/02_features/99_acl_based/01_acl_invocation/aclop_invocation">单算子模型调用样例</a>，获取完整的样例工程：</p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>├── aclop_invocation
│   ├── add_custom.json                   // 算子描述文件，用于构造单算子模型文件
│   ├── CMakeLists.txt
│   ├── main.cpp                          // 加载并执行单算子om模型，校验计算结果
│   └── scripts
│       └── gen_data.py                   // 生成输入数据和精度校验所需的预期结果
</code></pre></div><h2 id="生成单算子离线模型文件">生成单算子离线模型文件<span id="section17164152011141"></span><a class="header-anchor" href="#生成单算子离线模型文件">​</a></h2><ol><li><p>构造静态shape单算子描述文件add_custom.json，描述算子的输入、输出及属性等信息。</p><p>AddCustom静态shape算子的描述文件示例如下：</p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>[
    {
        &quot;op&quot;: &quot;AddCustom&quot;,
        &quot;input_desc&quot;: [
            {
                &quot;name&quot;: &quot;x&quot;,
                &quot;param_type&quot;: &quot;required&quot;,
                &quot;format&quot;: &quot;ND&quot;,
                &quot;shape&quot;: [8, 2048],
                &quot;type&quot;: &quot;float16&quot;
            },
            {
                &quot;name&quot;: &quot;y&quot;,
                &quot;param_type&quot;: &quot;required&quot;,
                &quot;format&quot;:&quot;ND&quot;,
                &quot;shape&quot;: [8, 2048],
                &quot;type&quot;: &quot;float16&quot;
            }
        ],
        &quot;output_desc&quot;: [
            {
                &quot;name&quot;: &quot;z&quot;,
                &quot;param_type&quot;: &quot;required&quot;,
                &quot;format&quot;:  &quot;ND&quot;,
                &quot;shape&quot;: [8, 2048],
                &quot;type&quot;: &quot;float16&quot;
            }
        ]
    }
]
</code></pre></div></li><li><p>使用ATC工具，将该算子描述文件编译成单算子模型文件（*.om文件）。在样例工程根目录执行以下命令，进入build目录后生成数据和om文件，使其与后续编译出的可执行文件位于同一目录。<code>scripts/gen_data.py</code>依赖NumPy，执行前请确认Python环境中已安装该依赖。</p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>mkdir -p build &amp;&amp; cd build
python3 ../scripts/gen_data.py
atc --singleop=../add_custom.json --output=. --soc_version=&lt;soc_version&gt;
</code></pre></div><p><code>gen_data.py</code>在当前build目录下生成<code>input/input0.bin</code>、<code>input/input1.bin</code>和<code>output/golden.bin</code>。前两个文件为算子输入，<code>golden.bin</code>为预期的相加结果，验证程序会读取这三个文件进行计算和精度对比。</p><p>关键参数解释如下：</p><ul><li>--singleop：单算子描述文件（json格式）的路径。</li><li>--output：存放om模型文件的目录。</li><li>--soc_version：配置为AI处理器的型号，请根据实际环境进行替换。</li></ul><p>以上命令执行后，会在output参数指定路径下生成*.om后缀的离线模型文件。</p></li></ol><h2 id="编写验证代码">编写验证代码<span id="zh-cn_topic_0000001541959061_section1862016464513"></span><a class="header-anchor" href="#编写验证代码">​</a></h2><p>您可以参考如下样例编写单算子加载、执行的代码逻辑。</p><p>以下是关键步骤的代码示例，不可以直接拷贝编译运行，仅供参考，调用接口后，需增加异常处理的分支，并记录报错日志、提示日志，此处不一一列举。</p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>// 1.初始化
CHECK_ACL(aclInit(nullptr));

// 2.运行管理资源申请
const int32_t deviceId = 0;
CHECK_ACL(aclrtSetDevice(deviceId));

// 3.加载单算子模型文件（*.om文件）
CHECK_ACL(aclopSetModelDir(&quot;.&quot;));

// 4.设置算子的输入，申请内存，然后读取输入数据保存至申请的内存中
// ......

// 5.创建Stream流
aclrtStream stream = nullptr;
aclrtCreateStream(&amp;stream);

// 6.执行算子
// opType表示算子类型名称，例如AddCustom
// inputDesc.size()表示算子输入个数，例如AddCustom算子是2个输入
// inputDesc.data()表示算子输入tensor描述的数组，描述每个输入的format、shape、数据类型
// inputBuffers.data()表示算子输入tensor数据
// outputDesc.size()表示算子输出个数，例如AddCustom算子是1个输出
// outputDesc.data()表示算子输出tensor描述的数组，描述每个输出的format、shape、数据类型
// outputBuffers.data()表示算子输出tensor数据
// opAttr表示算子属性，如果算子没有属性，也需要调用aclopCreateAttr接口创建aclopAttr类型的数据
// stream用于维护一些异步操作的执行顺序

CHECK_ACL(aclopExecuteV2(opType, inputDesc.size(), inputDesc.data(), inputBuffers.data(),
                             outputDesc.size(), outputDesc.data(), outputBuffers.data(), opAttr, stream));


// 7.阻塞应用运行，直到指定Stream中的所有任务都完成
aclrtSynchronizeStream(stream);

// 8.处理执行算子后的输出数据，例如在屏幕上显示、写入文件等，由用户根据实际情况自行实现
// ......

// 9.释放stream流
aclrtDestroyStream(stream);

// 10.释放运行管理资源
aclRet = aclrtResetDevice(deviceId);
aclRet = aclFinalize();

// ....
</code></pre></div><h2 id="运行和验证">运行和验证<span id="zh-cn_topic_0000001541959061_section236513711532"></span><a class="header-anchor" href="#运行和验证">​</a></h2><ol><li><p>开发环境上，设置环境变量，配置单算子验证程序编译依赖的头文件与库文件路径，如下为设置环境变量的示例。<code>\${INSTALL_DIR}</code>请替换为CANN软件安装后文件存储路径。以root用户安装为例，安装后文件默认存储路径为：/usr/local/Ascend/cann。{arch-os}为运行环境的架构和操作系统，arch表示操作系统架构，os表示操作系统，例如x86_64-linux。</p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>export DDK_PATH=\${INSTALL_DIR}
export NPU_HOST_LIB=\${INSTALL_DIR}/{arch-os}/devlib
</code></pre></div></li><li><p>编译样例工程，生成单算子验证可执行文件。</p><ol><li><p>切换到样例工程根目录，然后在样例工程根目录下执行如下命令创建目录用于存放编译文件，例如，创建的目录为“build“。</p><p><strong>mkdir -p build</strong></p></li><li><p>进入build目录，执行CMake编译命令，生成编译文件</p><p>命令示例如下所示：</p><p><strong>cd build</strong></p><p><strong>cmake ..</strong></p></li><li><p>执行如下命令，生成可执行文件。</p><p><strong>make</strong></p><p>会在build目录下生成可执行文件<strong>execute_add_op</strong>。</p></li></ol></li><li><p>执行单算子</p><ol><li><p>将开发环境中样例工程build目录下的以下文件和目录一起拷贝到运行环境的同一目录：</p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>├── execute_add_op
├── *.om
├── input
│   ├── input0.bin
│   └── input1.bin
└── output
    └── golden.bin
</code></pre></div><p>说明：若您的开发环境即为运行环境，此拷贝操作可跳过。</p></li><li><p>以运行用户登录运行环境，配置CANN和自定义算子包的环境变量。以下以CANN默认安装路径和样例的<code>customize</code>算子包为例；请根据运行环境修改<code>INSTALL_DIR</code>。算子包安装在自定义路径时，将<code>OPP_INSTALL_DIR</code>改为安装时<code>--install-path</code>指定的目录。</p><div class="code-block"><div class="code-header"><span class="lang-label">Bash</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code><span class="nv">INSTALL_DIR</span><span class="o">=</span>/usr/local/Ascend/cann
<span class="nv">OPP_INSTALL_DIR</span><span class="o">=</span><span class="si">\${</span><span class="nv">INSTALL_DIR</span><span class="si">}</span>/opp
<span class="nb">source</span><span class="w"> </span><span class="si">\${</span><span class="nv">INSTALL_DIR</span><span class="si">}</span>/set_env.sh
<span class="nb">source</span><span class="w"> </span><span class="si">\${</span><span class="nv">OPP_INSTALL_DIR</span><span class="si">}</span>/vendors/customize/bin/set_env.bash
</code></pre></div></li><li><p>切换到存放上述文件和目录的位置，执行验证程序。程序从当前工作目录查找om模型、输入数据和预期结果文件。</p><div class="code-block"><div class="code-header"><span class="lang-label">Bash</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>chmod<span class="w"> </span>+x<span class="w"> </span>execute_add_op
./execute_add_op
</code></pre></div><p>如果有test pass，表明执行成功。</p></li></ol></li></ol></article></div>`,1)])])}const v=t(s,[["render",p]]);export{u as __pageData,v as default};
