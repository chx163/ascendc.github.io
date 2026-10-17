import{_ as n,o as t,a as l,b as a}from"./app.DKoEZOcr.js";const f=JSON.parse('{"title":"","description":"","frontmatter":{"breadcrumbs":[{"text":"Ascend C算子开发指南","link":"/guide/getting_started/ascend_c_overview_and_learning_path"},{"text":"编程指南","link":"/guide/programming_guide/document_structure"},{"text":"附录","link":"/guide/programming_guide/appendix/show_kernel_debug_data_tool"},{"text":"FAQ","link":"/guide/programming_guide/appendix/faq/kernel_precision_issue"},{"text":"运行验证时AllocTensor/FreeTensor失败","link":"/guide/programming_guide/appendix/faq/alloc_free_tensor_failure"}]},"headers":[],"relativePath":"guide/programming_guide/appendix/faq/alloc_free_tensor_failure.md","filePath":"guide/programming_guide/appendix/faq/alloc_free_tensor_failure.md","outlineHeaders":[{"level":2,"title":"现象描述","slug":"现象描述","link":"#现象描述"},{"level":2,"title":"问题根因","slug":"问题根因","link":"#问题根因"},{"level":2,"title":"处理步骤","slug":"处理步骤","link":"#处理步骤"}],"lastUpdated":1787050286000}'),i={name:"guide/programming_guide/appendix/faq/alloc_free_tensor_failure.md"};function o(s,e,c,r,d,p){return t(),l("div",null,[...e[0]||(e[0]=[a(`<div><article class="markdown-body"><h1>运行验证时AllocTensor/FreeTensor失败<span id="ZH-CN_TOPIC_0000001737495336"></span></h1><h2 id="现象描述">现象描述<span id="section151611254194612"></span><a class="header-anchor" href="#现象描述">​</a></h2><p>通过NPU进行核函数（Kernel）的运行验证时，出现挂死现象；通过CPU进行核函数（Kernel）的运行验证时，出现AllocTensor/FreeTensor失败的报错，日志报错和调用栈打印如下：</p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>[ERROR][Core_0][/usr/local/Ascend/cann/x86_64-linux/tikcpp/tikcfw/interface/kernel_tpipe.h:730][AllocEventID][321678] current size is 4, max buffer number in same queue position is 4
[ERROR][CORE_0][pid 321674] error happened! =========
SIGABRT Signal (Abort Signal from abort) catched, backtrace info:
[#0] 0x000000000001e7c0: handler(int) at /usr/local/Ascend/cann/tools/tikicpulib/lib/include/kern_fwk.h:105
[#1] 0x0000000000017c4f: signed char AscendC::TPipe::AllocEventID&lt;(AscendC::HardEvent)5&gt;() at /usr/local/Ascend/cann/x86_64-linux/tikcpp/tikcfw/interface/kernel_tpipe.h:733
[#2] 0x000000000001426d: AscendC::TQueBind&lt;(AscendC::TPosition)0, (AscendC::TPosition)9, 4, 0&gt;::FreeBuffer(unsigned char*) at /usr/local/Ascend/cann/x86_64-linux/tikcpp/tikcfw/interface/kernel_tpipe.h:1217
[#3] 0x0000000000011058: void AscendC::TQueBind&lt;(AscendC::TPosition)0, (AscendC::TPosition)9, 4, 0&gt;::FreeTensor&lt;float16::Fp16T&gt;(AscendC::LocalTensor&lt;float16::Fp16T&gt;&amp;) at /usr/local/Ascend/cann/x86_64-linux/tikcpp/tikcfw/interface/kernel_tpipe.h:1237
[#4] 0x000000000000dfde: KernelAdd::Compute(int) at /home/xxxx/xxxx.cpp:59
[#5] 0x000000000000dd1c: KernelAdd::Process() at /home/xxxx/xxxx.cpp:37 (discriminator 2)
...
</code></pre></div><h2 id="问题根因">问题根因<span id="section417961104715"></span><a class="header-anchor" href="#问题根因">​</a></h2><p>根据日志信息“current size is 4, <strong>max buffer number in same queue position</strong> is 4”可以明确该问题是因为同一个TPosition上QUE Buffer的数量超出限制导致。</p><p>同一个TPosition上的所有Queue，连续调用AllocTensor接口申请的Tensor数量，根据AI处理器型号的不同，有数量约束。申请Buffer时，需要满足该约束。</p><div data-filter="910"><p>Atlas 训练系列产品不超过4个。</p></div><div data-filter="310p"><p>Atlas 推理系列产品AI Core不超过8个。</p><p>Atlas 推理系列产品Vector Core不超过8个。</p></div><div data-filter="910b"><p>Atlas A2 训练系列产品/Atlas A2 推理系列产品不超过8个。</p></div><div data-filter="A3"><p>Atlas A3 训练系列产品/Atlas A3 推理系列产品不超过8个。</p></div><div data-filter="310b"><p>Atlas 200I/500 A2 推理产品不超过8个。</p></div><p>不满足该约束，在后续使用AllocTensor/FreeTensor可能会出现分配资源失败。比如：</p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>AscendC::TQue&lt;AscendC::TPosition::VECIN, 1&gt; que0;
AscendC::TQue&lt;AscendC::TPosition::VECIN, 1&gt; que1;
AscendC::TQue&lt;AscendC::TPosition::VECIN, 1&gt; que2;
AscendC::TQue&lt;AscendC::TPosition::VECIN, 1&gt; que3;
AscendC::TQue&lt;AscendC::TPosition::VECIN, 1&gt; que4;
AscendC::TQue&lt;AscendC::TPosition::VECIN, 1&gt; que5;
// 比如，算子有6个输入，需要申请6块buffer
// 通过6个队列为其申请内存，分别为que0~que5，每个que分配1块,申请VECIN TPosition上的buffer总数为6
// 假设，同一个Position上连续Alloc的Buffer数量限制为4，超出该限制后，使用AllocTensor/FreeTensor会出现分配资源失败
// 在NPU上可能体现为卡死等异常行为，在CPU Debug场景会出现报错提示
pipe.InitBuffer(que0, 1, len);
pipe.InitBuffer(que1, 1, len);
pipe.InitBuffer(que2, 1, len);
pipe.InitBuffer(que3, 1, len);
pipe.InitBuffer(que4, 1, len);
pipe.InitBuffer(que5, 1, len);

AscendC::LocalTensor&lt;T&gt; local1 = que0.AllocTensor&lt;T&gt;();
AscendC::LocalTensor&lt;T&gt; local2 = que1.AllocTensor&lt;T&gt;();
AscendC::LocalTensor&lt;T&gt; local3 = que2.AllocTensor&lt;T&gt;();
AscendC::LocalTensor&lt;T&gt; local4 = que3.AllocTensor&lt;T&gt;();
// 第5个AllocTensor会出现资源分配失败，同一个TPosition上同时Alloc出来的Tensor数量超出了4个的限制
AscendC::LocalTensor&lt;T&gt; local5 = que4.AllocTensor&lt;T&gt;();
</code></pre></div><h2 id="处理步骤">处理步骤<span id="section166318242419"></span><a class="header-anchor" href="#处理步骤">​</a></h2><p>如果确实有多块buffer使用，可以将多个buffer合并到一块buffer，通过偏移使用。样例如下：</p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>// 此时建议通过以下方法解决：
// 如果确实有多块buffer使用,可以将多个buffer合并到一块buffer,通过偏移使用
pipe.InitBuffer(que0, 1, len * 3);
pipe.InitBuffer(que1, 1, len * 3);
/*
 * 分配出3块内存大小的LocalTensor, local1的地址为que0中buffer的起始地址，
 * local2的地址为local1的地址偏移len后的地址，local3的地址为local1的地址偏移
 * len * 2的地址
 */
int32_t offset1 = len;
int32_t offset2 = len * 2;
AscendC::LocalTensor&lt;T&gt; local1 = que0.AllocTensor&lt;T&gt;();
AscendC::LocalTensor&lt;T&gt; local2 = local1[offset1];
AscendC::LocalTensor&lt;T&gt; local3 = local1[offset2];
</code></pre></div></article></div>`,1)])])}const A=n(i,[["render",o]]);export{f as __pageData,A as default};
