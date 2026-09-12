import{_ as s,o as n,a as e,b as a}from"./app.DKoEZOcr.js";const h=JSON.parse('{"title":"","description":"","frontmatter":{"breadcrumbs":[{"text":"Ascend C API","link":"/api/api_list"},{"text":"Utils API","link":"/api/Utils-API/Utils-API"},{"text":"C++标准库","link":"/api/Utils-API/cpp_stdlib/cpp_stdlib"},{"text":"类型特性","link":"/api/Utils-API/cpp_stdlib/type_traits/type_traits"},{"text":"is_const","link":"/api/Utils-API/cpp_stdlib/type_traits/is_const"}]},"headers":[],"relativePath":"api/Utils-API/cpp_stdlib/type_traits/is_const.md","filePath":"api/Utils-API/cpp_stdlib/type_traits/is_const.md","outlineHeaders":[{"level":2,"title":"产品支持情况","slug":"产品支持情况","link":"#产品支持情况"},{"level":2,"title":"功能说明","slug":"功能说明","link":"#功能说明"},{"level":2,"title":"函数原型","slug":"函数原型","link":"#函数原型"},{"level":2,"title":"参数说明","slug":"参数说明","link":"#参数说明"},{"level":2,"title":"约束说明","slug":"约束说明","link":"#约束说明"},{"level":2,"title":"返回值说明","slug":"返回值说明","link":"#返回值说明"},{"level":2,"title":"调用示例","slug":"调用示例","link":"#调用示例"}],"lastUpdated":1785986301000}'),c={name:"api/Utils-API/cpp_stdlib/type_traits/is_const.md"};function l(d,t,i,o,u,p){return n(),e("div",null,[...t[0]||(t[0]=[a(`<div><article class="markdown-body"><h1>is_const</h1><h2 id="产品支持情况">产品支持情况<a class="header-anchor" href="#产品支持情况">​</a></h2><ul><li>Ascend 950PR/Ascend 950DT：支持</li><li>Atlas A3 训练系列产品/Atlas A3 推理系列产品：支持</li><li>Atlas A2 训练系列产品/Atlas A2 推理系列产品：支持</li><li>Atlas 200I/500 A2 推理产品：不支持</li><li>Atlas 推理系列产品AI Core：不支持</li><li>Atlas 推理系列产品Vector Core：不支持</li><li>Atlas 训练系列产品：不支持</li></ul><h2 id="功能说明">功能说明<a class="header-anchor" href="#功能说明">​</a></h2><p>在程序编译时，检测一个类型是否为const限定的类型，可以用于在编译时进行类型检查和条件处理。</p><h2 id="函数原型">函数原型<a class="header-anchor" href="#函数原型">​</a></h2><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>template &lt;typename Tp&gt;
struct is_const;
</code></pre></div><h2 id="参数说明">参数说明<a class="header-anchor" href="#参数说明">​</a></h2><p><strong>表1</strong> 模板参数说明</p><table><thead><tr><th>参数名</th><th>含义</th></tr></thead><tbody><tr><td>Tp</td><td>需要检测的类型，包括基本类型（如int、float等）、复合类型（如数组、指针、引用）、用户自定义类型（如类、结构体等），以及const限定的类型本身。</td></tr></tbody></table><h2 id="约束说明">约束说明<a class="header-anchor" href="#约束说明">​</a></h2><p>无</p><h2 id="返回值说明">返回值说明<a class="header-anchor" href="#返回值说明">​</a></h2><p>is_const的静态常量成员value用于获取返回的布尔值，is_const&lt;Tp&gt;::value取值如下：</p><ul><li>true：Tp是const类型。</li><li>false：Tp不是const类型。</li></ul><h2 id="调用示例">调用示例<a class="header-anchor" href="#调用示例">​</a></h2><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>// 自定义测试类型
struct MyStruct{int val;};

// Mismatch scenario
AscendC::printf(&quot;AscendC::Std::is_const::value:%d\\n&quot;, AscendC::Std::is_const&lt;int&gt;::value);
AscendC::printf(&quot;AscendC::Std::is_const::value:%d\\n&quot;, AscendC::Std::is_const&lt;const int*&gt;::value);
AscendC::printf(&quot;AscendC::Std::is_const::value:%d\\n&quot;, AscendC::Std::is_const&lt;int&amp;&gt;::value);
AscendC::printf(&quot;AscendC::Std::is_const::value:%d\\n&quot;, AscendC::Std::is_const&lt;const int&amp;&gt;::value);
AscendC::printf(&quot;AscendC::Std::is_const::value:%d\\n&quot;, AscendC::Std::is_const&lt;int&amp;&amp;&gt;::value);
AscendC::printf(&quot;AscendC::Std::is_const::value:%d\\n&quot;, AscendC::Std::is_const&lt;int[5]&gt;::value);
AscendC::printf(&quot;AscendC::Std::is_const::value:%d\\n&quot;, AscendC::Std::is_const&lt;double&gt;::value);
AscendC::printf(&quot;AscendC::Std::is_const::value:%d\\n&quot;, AscendC::Std::is_const&lt;MyStruct&gt;::value);
AscendC::printf(&quot;AscendC::Std::is_const::value:%d\\n&quot;, AscendC::Std::is_const&lt;void&gt;::value);

// Matching scenario
AscendC::printf(&quot;AscendC::Std::is_const::value:%d\\n&quot;, AscendC::Std::is_const&lt;const int&gt;::value);
AscendC::printf(&quot;AscendC::Std::is_const::value:%d\\n&quot;, AscendC::Std::is_const&lt;int const&gt;::value);
AscendC::printf(&quot;AscendC::Std::is_const::value:%d\\n&quot;, AscendC::Std::is_const&lt;int* const&gt;::value);
AscendC::printf(&quot;AscendC::Std::is_const::value:%d\\n&quot;, AscendC::Std::is_const&lt;const int[5]&gt;::value);
AscendC::printf(&quot;AscendC::Std::is_const::value:%d\\n&quot;, AscendC::Std::is_const&lt;const volatile double&gt;::value);
AscendC::printf(&quot;AscendC::Std::is_const::value:%d\\n&quot;, AscendC::Std::is_const&lt;const MyStruct&gt;::value);
</code></pre></div><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>// 执行结果：
AscendC::Std::is_const::value:0
AscendC::Std::is_const::value:0
AscendC::Std::is_const::value:0
AscendC::Std::is_const::value:0
AscendC::Std::is_const::value:0
AscendC::Std::is_const::value:0
AscendC::Std::is_const::value:0
AscendC::Std::is_const::value:0
AscendC::Std::is_const::value:0
AscendC::Std::is_const::value:1
AscendC::Std::is_const::value:1
AscendC::Std::is_const::value:1
AscendC::Std::is_const::value:1
AscendC::Std::is_const::value:1
AscendC::Std::is_const::value:1
</code></pre></div></article></div>`,1)])])}const v=s(c,[["render",l]]);export{h as __pageData,v as default};
