import{_ as a,o as t,a as s,b as l}from"./app.DKoEZOcr.js";const v=JSON.parse('{"title":"","description":"","frontmatter":{"breadcrumbs":[{"text":"Ascend C API","link":"/api/api_list"},{"text":"Utils API","link":"/api/Utils-API/Utils-API"},{"text":"C++标准库","link":"/api/Utils-API/cpp_stdlib/cpp_stdlib"},{"text":"类型特性","link":"/api/Utils-API/cpp_stdlib/type_traits/type_traits"},{"text":"is_base_of","link":"/api/Utils-API/cpp_stdlib/type_traits/is_base_of"}]},"headers":[],"relativePath":"api/Utils-API/cpp_stdlib/type_traits/is_base_of.md","filePath":"api/Utils-API/cpp_stdlib/type_traits/is_base_of.md","outlineHeaders":[{"level":2,"title":"产品支持情况","slug":"产品支持情况","link":"#产品支持情况"},{"level":2,"title":"功能说明","slug":"功能说明","link":"#功能说明"},{"level":2,"title":"函数原型","slug":"函数原型","link":"#函数原型"},{"level":2,"title":"参数说明","slug":"参数说明","link":"#参数说明"},{"level":2,"title":"约束说明","slug":"约束说明","link":"#约束说明"},{"level":2,"title":"返回值说明","slug":"返回值说明","link":"#返回值说明"},{"level":2,"title":"调用示例","slug":"调用示例","link":"#调用示例"}],"lastUpdated":1785986301000}'),i={name:"api/Utils-API/cpp_stdlib/type_traits/is_base_of.md"};function d(n,e,r,c,o,h){return t(),s("div",null,[...e[0]||(e[0]=[l(`<div><article class="markdown-body"><h1>is_base_of</h1><h2 id="产品支持情况">产品支持情况<a class="header-anchor" href="#产品支持情况">​</a></h2><ul><li>Ascend 950PR/Ascend 950DT：支持</li><li>Atlas A3 训练系列产品/Atlas A3 推理系列产品：支持</li><li>Atlas A2 训练系列产品/Atlas A2 推理系列产品：支持</li><li>Atlas 200I/500 A2 推理产品：不支持</li><li>Atlas 推理系列产品AI Core：不支持</li><li>Atlas 推理系列产品Vector Core：不支持</li><li>Atlas 训练系列产品：不支持</li></ul><h2 id="功能说明">功能说明<a class="header-anchor" href="#功能说明">​</a></h2><p>is_base_of是定义于&lt;type_traits&gt;头文件的一个类型特征工具，它能够在程序编译时检查一个类型是否为另一个类型的基类。本接口可应用在模板元编程、类型检查和条件编译等场景，用于在编译阶段捕获潜在的类型错误，提高代码的鲁棒性。</p><h2 id="函数原型">函数原型<a class="header-anchor" href="#函数原型">​</a></h2><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>template &lt;typename Base, typename Derived&gt;
struct is_base_of;
</code></pre></div><h2 id="参数说明">参数说明<a class="header-anchor" href="#参数说明">​</a></h2><p><strong>表1</strong> 模板参数说明</p><table><thead><tr><th>参数名</th><th>含义</th></tr></thead><tbody><tr><td>Base</td><td>待检查的基类类型，即Base类型是否为Derived类型的基类。</td></tr><tr><td>Derived</td><td>待检查的派生类类型，即Base类型是否为Derived类型的基类。</td></tr></tbody></table><h2 id="约束说明">约束说明<a class="header-anchor" href="#约束说明">​</a></h2><p>无</p><h2 id="返回值说明">返回值说明<a class="header-anchor" href="#返回值说明">​</a></h2><p>is_base_of的静态常量成员value用于获取返回的布尔值，is_base_of&lt;Base, Derived&gt;::value取值如下：</p><ul><li>true：Base类型是Derived类型的基类（包括Base类型和Derived类型为同一类型的情况）。</li><li>false：Base类型不是Derived类型的基类。</li></ul><h2 id="调用示例">调用示例<a class="header-anchor" href="#调用示例">​</a></h2><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>class Base {};
class Derived : public Base {};
class Unrelated {};

// 虚继承的派生类
class Derived2 : virtual public Base {};

// 定义虚继承的派生类
class VirtualDerived : virtual public Base {};

// 定义多重继承的派生类
class MultiDerived : public Base, public VirtualDerived {};

// 模板基类
template &lt;typename T&gt;
class BaseTemplate {
public:
    T value;
};

// 模板派生类
template &lt;typename T&gt;
class DerivedTemplate : public BaseTemplate&lt;T&gt; {};

// 检查Base是否是Derived的基类
AscendC::PRINTF(&quot;Is Base a base of Derived? %d\\n&quot; , AscendC::Std::is_base_of&lt;Base, Derived&gt;::value);

// 检查Derived是否是Base的基类（应该为false）
AscendC::PRINTF(&quot;Is Derived a base of Base? %d\\n&quot; , AscendC::Std::is_base_of&lt;Derived, Base&gt;::value);

// 检查Base是否是Unrelated的基类（应该为false）
AscendC::PRINTF(&quot;Is Base a base of Unrelated? %d\\n&quot; , AscendC::Std::is_base_of&lt;Base, Unrelated&gt;::value);

AscendC::PRINTF(&quot;Is Base a base of Derived (virtual inheritance)? %d\\n&quot;, AscendC::Std::is_base_of&lt;Base, Derived2&gt;::value);

AscendC::PRINTF(&quot;Is BaseTemplate&lt;int&gt; a base of DerivedTemplate&lt;int&gt;? %d\\n&quot;, AscendC::Std::is_base_of&lt;BaseTemplate&lt;int&gt;, DerivedTemplate&lt;int&gt;&gt;::value);

// 测试Base是否为VirtualDerived的基类（虚继承情况）
AscendC::PRINTF(&quot;Is Base a base of VirtualDerived? %d\\n&quot; , AscendC::Std::is_base_of&lt;Base, VirtualDerived&gt;::value);
// 测试Base是否为MultiDerived的基类（多重继承情况）
AscendC::PRINTF(&quot;Is Base a base of MultiDerived? %d\\n&quot; , AscendC::Std::is_base_of&lt;Base, MultiDerived&gt;::value);
</code></pre></div><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>// 执行结果：
Is Base a base of Derived? 1
Is Derived a base of Base? 0
Is Base a base of Unrelated? 0
Is Base a base of Derived (virtual inheritance)? 1
Is BaseTemplate&lt;int&gt; a base of DerivedTemplate&lt;int&gt;? 1
Is Base a base of VirtualDerived? 1
Is Base a base of MultiDerived? 1
</code></pre></div></article></div>`,1)])])}const u=a(i,[["render",d]]);export{v as __pageData,u as default};
