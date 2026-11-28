import{_ as e,o as l,a as t,b as n}from"./app.DKoEZOcr.js";const c="/ascendc.github.io/pr/5487/assets/aicore_31.BnJ5jvT4.png",r="/ascendc.github.io/pr/5487/assets/aicore_32.vv6yyTaA.png",g=JSON.parse('{"title":"","description":"","frontmatter":{"breadcrumbs":[{"text":"Ascend C算子开发指南","link":"/guide/getting_started/ascend_c_overview_and_learning_path"},{"text":"技术附录","link":"/guide/technical_appendix/concepts_and_terms/glossary"},{"text":"概念原理和术语","link":"/guide/technical_appendix/concepts_and_terms/glossary"},{"text":"内存访问原理","link":"/guide/technical_appendix/concepts_and_terms/memory_access/scalar_read_write"},{"text":"Scalar读写数据","link":"/guide/technical_appendix/concepts_and_terms/memory_access/scalar_read_write"}]},"headers":[],"relativePath":"guide/technical_appendix/concepts_and_terms/memory_access/scalar_read_write.md","filePath":"guide/technical_appendix/concepts_and_terms/memory_access/scalar_read_write.md","outlineHeaders":[{"level":2,"title":"Scalar读写Global Memory","slug":"Scalar读写Global-Memory","link":"#Scalar读写Global-Memory"},{"level":2,"title":"Scalar读写UB","slug":"Scalar读写UB","link":"#Scalar读写UB"},{"level":2,"title":"Scalar读写数据时的同步","slug":"Scalar读写数据时的同步","link":"#Scalar读写数据时的同步"}],"lastUpdated":1787050286000}'),i={name:"guide/technical_appendix/concepts_and_terms/memory_access/scalar_read_write.md"};function s(o,a,d,h,p,_){return l(),t("div",null,[...a[0]||(a[0]=[n('<div><article class="markdown-body"><h1>Scalar读写数据<span id="ZH-CN_TOPIC_0000002375401226"></span></h1><p>AI Core中Scalar计算单元负责各类型的标量数据运算和程序的流程控制。根据<a href="../../../programming_guide/advanced_programming/hardware_implementation/basic_architecture.html">硬件架构</a>设计，Scalar仅支持对Global Memory和Unified Buffer（UB）的读写操作，而不支持对L1 Buffer、L0A Buffer、L0B Buffer和L0C Buffer等其他类型存储的访问。下文分别介绍了Scalar读写Global Memory和UB的方式和Scalar读写数据时的同步机制。</p><h2 id="Scalar读写Global-Memory">Scalar读写Global Memory<span id="section7480536235"></span><a class="header-anchor" href="#Scalar读写Global-Memory">​</a></h2><p><img src="'+c+`" alt></p><p>如上图所示，Scalar读写GM数据时会经过DataCache，DataCache主要用于提高标量访存指令的执行效率，每一个AIC/AIV核内均有一个独立的DataCache。下面通过一个具体示例来讲解DataCache的具体工作机制。</p><p>globalTensor1是位于GM上的Tensor：</p><ul><li>执行完GetValue(0)后，globalTensor1的前8个元素会进入DataCache，后续GetValue(1)~GetValue(7)不需要再访问GM，而可以直接从DataCache的Cache Line中读取数据，提高了标量连续访问的效率。</li><li>执行完SetValue(8, val)后，globalTensor1的index为8~15的元素会进入DataCache，SetValue只会修改DataCache中的Cache Line数据，同时将Cache Line的状态设置为Dirty，表明Cache Line中的数据与GM中的数据不一致。</li></ul><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>AscendC::GlobalTensor&lt;int64_t&gt; globalTensor1;
globalTensor1.SetGlobalBuffer((__gm__ int64_t *)input);
// 从0~7共计8个uint64_t类型，DataCache的Cache Line长度为64字节
// 执行完GetValue(0)后，GetValue(1)~GetValue(7)可以直接从Cache Line中读取，不需要再访问GM
globalTensor1.GetValue(0);
globalTensor1.GetValue(1);
globalTensor1.GetValue(2);
globalTensor1.GetValue(3);
globalTensor1.GetValue(4);
globalTensor1.GetValue(5);
globalTensor1.GetValue(6);
globalTensor1.GetValue(7);

// 执行完SetValue(8)后，不会修改GM上的数据，只会修改DataCache中Cache Line数据
// 同时Cache Line的状态置为dirty，dirty表示DataCache中Cache Line数据与GM中的数据不一致
int64_t val = 32;
globalTensor1.SetValue(8, val);
globalTensor1.GetValue(8);
</code></pre></div><p>根据上文的工作机制（如下图所示），多核间访问globalTensor1会出现数据不一致的情况，如果其余核需要获取GM数据的变化，则需要开发者手动调用<a href="../../../../api/SIMD-API/basic_api/cache_control/DataCacheCleanAndInvalid.html">DataCacheCleanAndInvalid</a>来保证数据的一致性。</p><p><img src="`+r+`" alt></p><h2 id="Scalar读写UB">Scalar读写UB<span id="section8156161471119"></span><a class="header-anchor" href="#Scalar读写UB">​</a></h2><p>Scalar读写UB时，可以使用LocalTensor的SetValue和GetValue接口。示例如下：</p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>for (int32_t i = 0; i &lt; 16; ++i) {
    inputLocal.SetValue(i, i); // 对inputLocal中第i个位置进行赋值为i
}

for (int32_t i = 0; i &lt; srcLen; ++i) {
    auto element = inputLocal.GetValue(i); // 获取inputLocal中第i个位置的数值
}
</code></pre></div><h2 id="Scalar读写数据时的同步">Scalar读写数据时的同步<span id="section554364118119"></span><a class="header-anchor" href="#Scalar读写数据时的同步">​</a></h2><p>Scalar读写Global Memory和UB时属于PIPE_S（Scalar流水）操作，当用户使用SetValue或者GetValue接口，且算子工程开启自动同步时，不需要手动插入同步事件。</p><p>如果用户关闭算子工程的自动同步功能时，则需要手动插入同步事件：</p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>// GetValue为Scalar操作，与后续的Duplicate存在数据依赖
// 因此Vector流水需要等待Scalar操作结束
float inputVal = srcLocal.GetValue(0);
SetFlag&lt;HardEvent::S_V&gt;(eventID1);
WaitFlag&lt;HardEvent::S_V&gt;(eventID1);
AscendC::Duplicate(dstLocal, inputVal, srcDataSize); 

// SetValue为Scalar操作，与后续的数据搬运操作存在数据依赖
// 因此MTE3流水需要等待Scalar操作结束
srcLocal.SetValue(0, value);
SetFlag&lt;HardEvent::S_MTE3&gt;(eventID2);
WaitFlag&lt;HardEvent::S_MTE3&gt;(eventID2);
AscendC::DataCopy(dstGlobal, srcLocal, srcDataSize);
</code></pre></div></article></div>`,1)])])}const v=e(i,[["render",s]]);export{g as __pageData,v as default};
