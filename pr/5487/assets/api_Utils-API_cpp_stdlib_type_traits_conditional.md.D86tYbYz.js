import{_ as e,o as l,a as i,b as a}from"./app.DKoEZOcr.js";const v=JSON.parse('{"title":"","description":"","frontmatter":{"breadcrumbs":[{"text":"Ascend C API","link":"/api/api_list"},{"text":"Utils API","link":"/api/Utils-API/Utils-API"},{"text":"C++标准库","link":"/api/Utils-API/cpp_stdlib/cpp_stdlib"},{"text":"类型特性","link":"/api/Utils-API/cpp_stdlib/type_traits/type_traits"},{"text":"conditional","link":"/api/Utils-API/cpp_stdlib/type_traits/conditional"}]},"headers":[],"relativePath":"api/Utils-API/cpp_stdlib/type_traits/conditional.md","filePath":"api/Utils-API/cpp_stdlib/type_traits/conditional.md","outlineHeaders":[{"level":2,"title":"产品支持情况","slug":"产品支持情况","link":"#产品支持情况"},{"level":2,"title":"功能说明","slug":"功能说明","link":"#功能说明"},{"level":2,"title":"函数原型","slug":"函数原型","link":"#函数原型"},{"level":2,"title":"参数说明","slug":"参数说明","link":"#参数说明"},{"level":2,"title":"约束说明","slug":"约束说明","link":"#约束说明"},{"level":2,"title":"返回值说明","slug":"返回值说明","link":"#返回值说明"},{"level":2,"title":"调用示例","slug":"调用示例","link":"#调用示例"}],"lastUpdated":1785986301000}'),n={name:"api/Utils-API/cpp_stdlib/type_traits/conditional.md"};function s(d,t,p,o,c,h){return l(),i("div",null,[...t[0]||(t[0]=[a(`<div><article class="markdown-body"><h1>conditional</h1><h2 id="产品支持情况">产品支持情况<a class="header-anchor" href="#产品支持情况">​</a></h2><ul><li>Ascend 950PR/Ascend 950DT：支持</li><li>Atlas A3 训练系列产品/Atlas A3 推理系列产品：支持</li><li>Atlas A2 训练系列产品/Atlas A2 推理系列产品：支持</li><li>Atlas 200I/500 A2 推理产品：不支持</li><li>Atlas 推理系列产品AI Core：不支持</li><li>Atlas 推理系列产品Vector Core：不支持</li><li>Atlas 训练系列产品：不支持</li></ul><h2 id="功能说明">功能说明<a class="header-anchor" href="#功能说明">​</a></h2><p>conditional是定义在&lt;type_traits&gt;头文件里的一个类型特征工具，它在程序编译时根据一个布尔条件从两个类型中选择一个类型。本接口可应用在模板元编程中，用于根据不同的条件来灵活选择合适的类型，增强代码的通用性和灵活性。</p><p>conditional有一个嵌套的type成员，它的值取决于Bp的值：如果Bp为true，则conditional&lt;Bp, If, Then&gt;::type为If。如果Bp为false，则conditional&lt;Bp, If, Then&gt;::type为Then。</p><h2 id="函数原型">函数原型<a class="header-anchor" href="#函数原型">​</a></h2><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>template &lt;bool Bp, typename If, typename Then&gt;
struct conditional;
</code></pre></div><h2 id="参数说明">参数说明<a class="header-anchor" href="#参数说明">​</a></h2><p><strong>表1</strong> 模板参数说明</p><table><thead><tr><th>参数名</th><th>含义</th></tr></thead><tbody><tr><td>Bp</td><td>一个布尔常量表达式，作为选择类型的条件。</td></tr><tr><td>If</td><td>当Bp为true时选择的类型。</td></tr><tr><td>Then</td><td>当Bp为false时选择的类型。</td></tr></tbody></table><h2 id="约束说明">约束说明<a class="header-anchor" href="#约束说明">​</a></h2><p>无</p><h2 id="返回值说明">返回值说明<a class="header-anchor" href="#返回值说明">​</a></h2><p>conditional的静态常量成员type用于获取返回值，conditional&lt;Bp, If, Then&gt;::type取值如下：</p><ul><li>If：Bp为true。</li><li>Then：Bp为false。</li></ul><h2 id="调用示例">调用示例<a class="header-anchor" href="#调用示例">​</a></h2><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>// 定义两个不同的类型
struct TypeA {
    __aicore__ inline static void print() {
        AscendC::PRINTF(&quot;This is TypeA..\\n&quot;);
    }
};

struct TypeB {
    __aicore__ inline static void print() {
        AscendC::PRINTF(&quot;This is TypeB..\\n&quot;);
    }
};

// 根据条件选择类型
template &lt;bool Condition&gt;
__aicore__ inline void selectType() {
    using SelectedType = typename AscendC::Std::conditional&lt;Condition, TypeA, TypeB&gt;::type;
    SelectedType::print();
}

// 定义一个模板函数，根据条件选择不同的类型
template &lt;bool Condition&gt;
__aicore__ inline void selectOtherType() {
    using SelectedType = typename std::conditional&lt;Condition, int, float&gt;::type;
    if constexpr (std::is_same_v&lt;SelectedType, int&gt;) {
        AscendC::PRINTF(&quot;Selected type is int.\\n&quot;);
    } else {
        AscendC::PRINTF(&quot;Selected type is float.\\n&quot;);
    }
}

// 条件为true，选择TypeA
selectType&lt;true&gt;();
// 条件为false，选择TypeB
selectType&lt;false&gt;();

// 测试条件为true的情况
selectOtherType&lt;true&gt;();
// 测试条件为false的情况
selectOtherType&lt;false&gt;();
</code></pre></div><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>// 执行结果：
This is TypeA..
This is TypeB..
Selected type is int.
Selected type is float.
</code></pre></div></article></div>`,1)])])}const _=e(n,[["render",s]]);export{v as __pageData,_ as default};
