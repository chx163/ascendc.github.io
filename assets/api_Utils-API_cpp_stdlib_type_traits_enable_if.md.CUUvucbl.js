import{_ as e,o as l,a,b as n}from"./app.C41L12d5.js";const h=JSON.parse('{"title":"","description":"","frontmatter":{"breadcrumbs":[{"text":"Ascend C API","link":"/api/api_list"},{"text":"Utils API","link":"/api/Utils-API/Utils-API"},{"text":"C++标准库","link":"/api/Utils-API/cpp_stdlib/cpp_stdlib"},{"text":"类型特性","link":"/api/Utils-API/cpp_stdlib/type_traits/type_traits"},{"text":"enable_if","link":"/api/Utils-API/cpp_stdlib/type_traits/enable_if"}]},"headers":[],"relativePath":"api/Utils-API/cpp_stdlib/type_traits/enable_if.md","filePath":"api/Utils-API/cpp_stdlib/type_traits/enable_if.md","outlineHeaders":[{"level":2,"title":"产品支持情况","slug":"产品支持情况","link":"#产品支持情况"},{"level":2,"title":"功能说明","slug":"功能说明","link":"#功能说明"},{"level":2,"title":"函数原型","slug":"函数原型","link":"#函数原型"},{"level":2,"title":"参数说明","slug":"参数说明","link":"#参数说明"},{"level":2,"title":"约束说明","slug":"约束说明","link":"#约束说明"},{"level":2,"title":"返回值说明","slug":"返回值说明","link":"#返回值说明"},{"level":2,"title":"调用示例","slug":"调用示例","link":"#调用示例"}],"lastUpdated":1785986301000}'),i={name:"api/Utils-API/cpp_stdlib/type_traits/enable_if.md"};function s(o,t,d,p,r,c){return l(),a("div",null,[...t[0]||(t[0]=[n(`<div><article class="markdown-body"><h1>enable_if</h1><h2 id="产品支持情况">产品支持情况<a class="header-anchor" href="#产品支持情况">​</a></h2><ul><li>Ascend 950PR/Ascend 950DT：支持</li><li>Atlas A3 训练系列产品/Atlas A3 推理系列产品：支持</li><li>Atlas A2 训练系列产品/Atlas A2 推理系列产品：支持</li><li>Atlas 200I/500 A2 推理产品：不支持</li><li>Atlas 推理系列产品AI Core：不支持</li><li>Atlas 推理系列产品Vector Core：不支持</li><li>Atlas 训练系列产品：不支持</li></ul><h2 id="功能说明">功能说明<a class="header-anchor" href="#功能说明">​</a></h2><p>enable_if是定义于&lt;type_traits&gt;头文件的一个模板元编程工具，它能够在程序编译时根据某个条件启用或禁用特定的函数模板、类模板或模板特化，以此实现更精细的模板重载和类型选择，增强代码的灵活性和安全性。</p><p>enable_if是一个模板结构体，有两个模板参数：模板参数Bp是一个布尔值，表示条件；模板参数Tp是一个类型，默认值为void。当Bp为false时，enable_if没有嵌套的type成员。当Bp为true时，enable_if有一个嵌套的type成员，其类型为Tp。</p><h2 id="函数原型">函数原型<a class="header-anchor" href="#函数原型">​</a></h2><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>template &lt;bool Bp, typename Tp&gt;
struct enable_if;
</code></pre></div><h2 id="参数说明">参数说明<a class="header-anchor" href="#参数说明">​</a></h2><p><strong>表1</strong> 模板参数说明</p><table><thead><tr><th>参数名</th><th>含义</th></tr></thead><tbody><tr><td>Bp</td><td>布尔值，表示条件。</td></tr><tr><td>Tp</td><td>类型，默认值为void。</td></tr></tbody></table><h2 id="约束说明">约束说明<a class="header-anchor" href="#约束说明">​</a></h2><p>无</p><h2 id="返回值说明">返回值说明<a class="header-anchor" href="#返回值说明">​</a></h2><p>enable_if的静态常量成员type用于获取返回值，enable_if&lt;Bp, Tp&gt;::type取值如下：</p><ul><li>Tp：Bp为true。</li><li>void：Bp为false。</li></ul><h2 id="调用示例">调用示例<a class="header-anchor" href="#调用示例">​</a></h2><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>template &lt;typename T&gt;
class Calculator {
public:
    // 当T是整数类型时启用此成员函数
    template &lt;typename U = T&gt;
    typename AscendC::Std::enable_if&lt;AscendC::Std::is_integral&lt;U&gt;::value, U&gt;::type
    __aicore__ inline multiply(U a, U b) {
        AscendC::PRINTF(&quot;Integral type multiplication&quot;);
        return a * b;
    }

    // 当T不是整数类型时启用此成员函数
    template &lt;typename U = T&gt;
    typename AscendC::Std::enable_if&lt;!AscendC::Std::is_integral&lt;U&gt;::value, U&gt;::type
    __aicore__ inline multiply(U a, U b) {
        AscendC::PRINTF(&quot;Non-integral type multiplication&quot;);
        return a * b;
    }
};

// 通用模板类
template &lt;typename T, typename Enable = void&gt;
class Container {
public:
    __aicore__ inline Container() {
        AscendC::PRINTF(&quot;Generic container.\\n&quot;);
    }
};

// 特化版本，当T是整数类型时启用
template &lt;typename T&gt;
class Container&lt;T, typename AscendC::Std::enable_if&lt;AscendC::Std::is_integral&lt;T&gt;::value&gt;::type&gt; {
public:
    __aicore__ inline Container() {
        AscendC::PRINTF(&quot;Integral container.\\n&quot;);
    }
};

// 当T是整数类型时启用该函数
template &lt;typename T&gt;
__aicore__ inline typename AscendC::Std::enable_if&lt;AscendC::Std::is_integral&lt;T&gt;::value, T&gt;::type add(T a, T b) {
    AscendC::PRINTF(&quot;Integral type addition.&quot;);
    return a + b;
}

// 当T不是整数类型时启用该函数
template &lt;typename T&gt;
__aicore__ inline typename AscendC::Std::enable_if&lt;!AscendC::Std::is_integral&lt;T&gt;::value, T&gt;::type add(T a, T b) {
    AscendC::PRINTF(&quot;Non-integral type addition.&quot;);
    return a + (-b);
}

Calculator&lt;int&gt; intCalculator;
int intResult = intCalculator.multiply((int)2, (int)3);
AscendC::PRINTF(&quot;Result of integral multiplication: %d\\n&quot;, intResult);

Calculator&lt;float&gt; doubleCalculator;
float doubleResult = doubleCalculator.multiply((float)2.5, (float)3.5);
AscendC::PRINTF(&quot;Result of non-integral multiplication: %f\\n&quot;, doubleResult);

Container&lt;float&gt; genericContainer;
Container&lt;int&gt; integralContainer;

intResult = add(1, 2);
AscendC::PRINTF(&quot;Integer result: %d\\n&quot;, intResult);

doubleResult = add((float)1.5, (float)2.5);
AscendC::PRINTF(&quot;float result: %f\\n&quot;, doubleResult);
</code></pre></div><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>// 执行结果：
Integral type multiplicationResult of integral multiplication: 6
Non-integral type multiplicationResult of non-integral multiplication: 8.750000
Generic container.
Integral container.
Integral type addition.Integer result: 3
Non-integral type addition.float result: -1.000000
</code></pre></div></article></div>`,1)])])}const _=e(i,[["render",s]]);export{h as __pageData,_ as default};
