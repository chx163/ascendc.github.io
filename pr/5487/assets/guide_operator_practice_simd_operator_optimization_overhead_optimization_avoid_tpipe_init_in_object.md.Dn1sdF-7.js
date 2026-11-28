import{_ as i,o as a,a as t,b as p}from"./app.DKoEZOcr.js";const n="/ascendc.github.io/pr/5487/assets/aiv_time.uQwu_-nY.png",o="/ascendc.github.io/pr/5487/assets/aiv_ratio.B4piXX6l.png",h=JSON.parse('{"title":"","description":"","frontmatter":{"breadcrumbs":[{"text":"Ascend C算子开发指南","link":"/guide/getting_started/ascend_c_overview_and_learning_path"},{"text":"算子实践参考","link":"/guide/operator_practice/document_structure"},{"text":"SIMD算子性能优化","link":"/guide/operator_practice/simd_operator_optimization/simd_operator_optimization"},{"text":"头尾开销优化","link":"/guide/operator_practice/simd_operator_optimization/overhead_optimization/overhead_optimization"},{"text":"避免TPipe在对象内创建和初始化","link":"/guide/operator_practice/simd_operator_optimization/overhead_optimization/avoid_tpipe_init_in_object"}]},"headers":[],"relativePath":"guide/operator_practice/simd_operator_optimization/overhead_optimization/avoid_tpipe_init_in_object.md","filePath":"guide/operator_practice/simd_operator_optimization/overhead_optimization/avoid_tpipe_init_in_object.md","lastUpdated":1787050286000}'),r={name:"guide/operator_practice/simd_operator_optimization/overhead_optimization/avoid_tpipe_init_in_object.md"};function _(l,e,c,s,d,m){return a(),t("div",null,[...e[0]||(e[0]=[p(`<div><article class="markdown-body"><h1>避免TPipe在对象内创建和初始化<span id="ZH-CN_TOPIC_0000001848187442"></span></h1><p>【优先级】中</p><p>【编译器背景知识】创建类对象时，会分配内存空间，用于存储类中的相关成员变量或函数。当类中变量需要参与计算时，变量值从内存被加载到寄存器，计算完成后，变量从寄存器存储回内存。Scalar常量折叠和常量传播是编译器编译时的优化方式，优化前编译器会判断变量是否只初始化过一次或只赋值过一次，若满足此编译优化的前提条件，变量值将会尽量驻留在寄存器中，从而在后续使用变量时，将减少读取内存的操作，提升运行性能。</p><p>【描述】TPipe是用来管理全局内存和同步的框架，用户可以调用TPipe的接口，为TQue/TBuf进行内存分配。在编写Ascend C算子过程中，经常用一个类存放计算所需的相关变量，这里称类名为KernelExample。当TPipe对象在KernelExample类的实现中定义并初始化时，TPipe对象的内存空间在整个KernelExample对象的内存空间之中；需要注意的是，创建TPipe对象时，对象初始化会设置全局变量的TPipe指针，这导致KernelExample对象的内存有被外部污染的风险，此时编译器的编译优化将采取保守策略，不会对KernelExample对象中的Scalar变量进行常量折叠和常量传播。因此，在任何场景下，我们都建议将TPipe对象创建于KernelExample类外部，使得TPipe对象的内存空间独立于KernelExample类对象的内存空间，触发编译器对KernelExample类内Scalar的编译优化，减少算子Scalar指令耗时。</p><p>【反例】</p><p>代码中TPipe对象由KernelExample类内部创建并初始化，影响编译器Scalar折叠优化，在NPU侧导致Scalar不必要的增加。</p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>template &lt;typename ComputeT&gt; class KernelExample {
 public:
     __aicore__ inline KernelExample() {}

     __aicore__ inline void Init(...)
     {
         ...
         pipe.InitBuffer(xxxBuf, BUFFER_NUM, xxxSize);
         ...
     }

 private:
     ...
     TPipe pipe;
     ...
 };

 extern &quot;C&quot; __global__ __aicore__ void example_kernel(...)
 {
     ...
     KernelExample&lt;float&gt; op;
     op.Init(...);
     ...
 }
</code></pre></div><p>【正例】</p><p>改为由核函数（Kernel）入口函数创建TPipe对象，在KernelExample类中保存TPipe指针使用。</p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>template &lt;typename ComputeT&gt; class KernelExample {
 public:
     __aicore__ inline KernelExample() {}

     __aicore__ inline void Init(..., TPipe* pipeIn)
     {
         ...
         pipe = pipeIn;
         pipe-&gt;InitBuffer(xxxBuf, BUFFER_NUM, xxxSize);
         ...
     }

 private:
     ...
     TPipe* pipe;
     ...
 };

 extern &quot;C&quot; __global__ __aicore__ void example_kernel(...)
 {
     ...
     TPipe pipe;
     KernelExample&lt;float&gt; op;
     op.Init(..., &amp;pipe);
     ...
 }
</code></pre></div><p>【性能对比】</p><p><strong>图1</strong> aiv_scalar_time优化前后对比<span id="fig31681942161513"></span><br><img src="`+n+'" alt title="aiv_scalar_time优化前后对比"></p><p><strong>图2</strong> aiv_scalar_ratio优化前后对比<span id="fig105241506161"></span><br><img src="'+o+'" alt title="aiv_scalar_ratio优化前后对比"></p><p>通过性能数据对比可以看出，Scalar优化效果显著，平均时间从281us减少到236us，下降17%；平均scalar_time时延占比从21%下降到17%。因此在Scalar bound（达到上限）的场景下可以使用此优化措施。</p></article></div>',1)])])}const x=i(r,[["render",_]]);export{h as __pageData,x as default};
