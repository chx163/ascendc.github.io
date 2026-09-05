import{_ as s,o as a,a as e,b as l}from"./app.C41L12d5.js";const C=JSON.parse('{"title":"","description":"","frontmatter":{"breadcrumbs":[{"text":"Ascend C API","link":"/api/api_list"},{"text":"Utils API","link":"/api/Utils-API/Utils-API"},{"text":"C++标准库","link":"/api/Utils-API/cpp_stdlib/cpp_stdlib"},{"text":"类型特性","link":"/api/Utils-API/cpp_stdlib/type_traits/type_traits"},{"text":"is_same","link":"/api/Utils-API/cpp_stdlib/type_traits/is_same"}]},"headers":[],"relativePath":"api/Utils-API/cpp_stdlib/type_traits/is_same.md","filePath":"api/Utils-API/cpp_stdlib/type_traits/is_same.md","outlineHeaders":[{"level":2,"title":"产品支持情况","slug":"产品支持情况","link":"#产品支持情况"},{"level":2,"title":"功能说明","slug":"功能说明","link":"#功能说明"},{"level":2,"title":"函数原型","slug":"函数原型","link":"#函数原型"},{"level":2,"title":"参数说明","slug":"参数说明","link":"#参数说明"},{"level":2,"title":"约束说明","slug":"约束说明","link":"#约束说明"},{"level":2,"title":"返回值说明","slug":"返回值说明","link":"#返回值说明"},{"level":2,"title":"调用示例","slug":"调用示例","link":"#调用示例"}],"lastUpdated":1785986301000}'),i={name:"api/Utils-API/cpp_stdlib/type_traits/is_same.md"};function n(d,t,h,p,c,o){return a(),e("div",null,[...t[0]||(t[0]=[l(`<div><article class="markdown-body"><h1>is_same</h1><h2 id="产品支持情况">产品支持情况<a class="header-anchor" href="#产品支持情况">​</a></h2><ul><li>Ascend 950PR/Ascend 950DT：支持</li><li>Atlas A3 训练系列产品/Atlas A3 推理系列产品：支持</li><li>Atlas A2 训练系列产品/Atlas A2 推理系列产品：支持</li><li>Atlas 200I/500 A2 推理产品：不支持</li><li>Atlas 推理系列产品AI Core：不支持</li><li>Atlas 推理系列产品Vector Core：不支持</li><li>Atlas 训练系列产品：不支持</li></ul><h2 id="功能说明">功能说明<a class="header-anchor" href="#功能说明">​</a></h2><p>is_same是定义在&lt;type_traits&gt;头文件里的一个类型特征工具，它能够在程序编译时判断两个类型是否完全相同。本接口可应用在模板元编程、类型检查、条件编译等场景，用于在编译阶段确定类型信息，避免运行时可能出现的类型不匹配问题。</p><h2 id="函数原型">函数原型<a class="header-anchor" href="#函数原型">​</a></h2><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>template &lt;typename Tp, typename Up&gt;
struct is_same;
</code></pre></div><h2 id="参数说明">参数说明<a class="header-anchor" href="#参数说明">​</a></h2><p><strong>表1</strong> 模板参数说明</p><table><thead><tr><th>参数名</th><th>含义</th></tr></thead><tbody><tr><td>Tp</td><td>需要比较两个类型是否完全相同的第一个类型。</td></tr><tr><td>Up</td><td>需要比较两个类型是否完全相同的第二个类型。</td></tr></tbody></table><h2 id="约束说明">约束说明<a class="header-anchor" href="#约束说明">​</a></h2><p>无</p><h2 id="返回值说明">返回值说明<a class="header-anchor" href="#返回值说明">​</a></h2><p>is_same的静态常量成员value用于获取返回的布尔值，is_same&lt;Tp, Up&gt;::value取值如下：</p><ul><li>true：Tp和Up是完全相同的类型。</li><li>false：Tp和Up不是相同的类型。</li></ul><h2 id="调用示例">调用示例<a class="header-anchor" href="#调用示例">​</a></h2><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>// 定义两个不同的类
class ClassA {};
class ClassB {};

// 定义相同的类两次
class ClassC {};
using ClassC_alias = ClassC;

// 定义一个简单的模板类
template &lt;typename T&gt;
class TemplateClass {};

// 比较相同的基本类型
AscendC::PRINTF(&quot;Is int the same as int? %d\\n&quot;, AscendC::Std::is_same&lt;int, int&gt;::value);

// 比较不同的基本类型
AscendC::PRINTF(&quot;Is int the same as double? %d\\n&quot;, AscendC::Std::is_same&lt;int, double&gt;::value);

// 比较不同的类类型
AscendC::PRINTF(&quot;Is ClassA the same as ClassB? %d\\n&quot;, AscendC::Std::is_same&lt;ClassA, ClassB&gt;::value);

// 比较相同的类类型
AscendC::PRINTF(&quot;Is ClassC the same as ClassC_alias? %d\\n&quot;, AscendC::Std::is_same&lt;ClassC, ClassC_alias&gt;::value);

// 比较相同模板实例化类型
AscendC::PRINTF(&quot;Is TemplateClass&lt;int&gt; the same as TemplateClass&lt;int&gt;? %d\\n&quot;, AscendC::Std::is_same&lt;TemplateClass&lt;int&gt;, TemplateClass&lt;int&gt;&gt;::value);

// 比较不同模板实例化类型
AscendC::PRINTF(&quot;Is TemplateClass&lt;int&gt; the same as TemplateClass&lt;double&gt;? %d\\n&quot;, AscendC::Std::is_same&lt;TemplateClass&lt;int&gt;, TemplateClass&lt;double&gt;&gt;::value);
</code></pre></div><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>// 执行结果：
Is int the same as int? 1
Is int the same as double? 0
Is ClassA the same as ClassB? 0
Is ClassC the same as ClassC_alias? 1
Is TemplateClass&lt;int&gt; the same as TemplateClass&lt;int&gt;? 1
Is TemplateClass&lt;int&gt; the same as TemplateClass&lt;double&gt;? 0
</code></pre></div></article></div>`,1)])])}const m=s(i,[["render",n]]);export{C as __pageData,m as default};
