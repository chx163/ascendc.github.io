import{_ as e,o as a,a as l,b as n}from"./app.C41L12d5.js";const v=JSON.parse('{"title":"","description":"","frontmatter":{"breadcrumbs":[{"text":"Ascend C API","link":"/api/api_list"},{"text":"Utils API","link":"/api/Utils-API/Utils-API"},{"text":"C++标准库","link":"/api/Utils-API/cpp_stdlib/cpp_stdlib"},{"text":"类型特性","link":"/api/Utils-API/cpp_stdlib/type_traits/type_traits"},{"text":"integral_constant","link":"/api/Utils-API/cpp_stdlib/type_traits/integral_constant"}]},"headers":[],"relativePath":"api/Utils-API/cpp_stdlib/type_traits/integral_constant.md","filePath":"api/Utils-API/cpp_stdlib/type_traits/integral_constant.md","outlineHeaders":[{"level":2,"title":"产品支持情况","slug":"产品支持情况","link":"#产品支持情况"},{"level":2,"title":"功能说明","slug":"功能说明","link":"#功能说明"},{"level":2,"title":"函数原型","slug":"函数原型","link":"#函数原型"},{"level":2,"title":"参数说明","slug":"参数说明","link":"#参数说明"},{"level":2,"title":"约束说明","slug":"约束说明","link":"#约束说明"},{"level":2,"title":"返回值说明","slug":"返回值说明","link":"#返回值说明"},{"level":2,"title":"调用示例","slug":"调用示例","link":"#调用示例"}],"lastUpdated":1785986301000}'),s={name:"api/Utils-API/cpp_stdlib/type_traits/integral_constant.md"};function i(d,t,c,p,o,r){return a(),l("div",null,[...t[0]||(t[0]=[n(`<div><article class="markdown-body"><h1>integral_constant</h1><h2 id="产品支持情况">产品支持情况<a class="header-anchor" href="#产品支持情况">​</a></h2><ul><li>Ascend 950PR/Ascend 950DT：支持</li><li>Atlas A3 训练系列产品/Atlas A3 推理系列产品：支持</li><li>Atlas A2 训练系列产品/Atlas A2 推理系列产品：支持</li><li>Atlas 200I/500 A2 推理产品：不支持</li><li>Atlas 推理系列产品AI Core：不支持</li><li>Atlas 推理系列产品Vector Core：不支持</li><li>Atlas 训练系列产品：不支持</li></ul><h2 id="功能说明">功能说明<a class="header-anchor" href="#功能说明">​</a></h2><p>integral_constant是一个带有模板参数的结构体，定义在&lt;type_traits&gt;头文件中，用于封装一个编译时常量整数值，是标准库中许多类型特性和编译时计算的基础组件。</p><p>integral_constant的功能如下：</p><ol><li>封装编译时常量，将一个int或bool类型的值封装为特定类型，以便该值可以在编译时被操作和传递。</li><li>类型标识，每个不同的integral_constant实例都是唯一的类型，可用于模板特化或重载决议。</li><li>隐式转换时支持转换为其封装的值类型，便于在需要该值的上下文中直接使用。</li><li>函数调用运算符允许像调用函数一样调用实例，以获取其值。</li></ol><p>integral_constant提供了多个常用的特化版本，具体如下：</p><ul><li>Std::true_type：integral_constant&lt;bool, true&gt;的别名。</li><li>Std::false_type：integral_constant&lt;bool, false&gt;的别名。</li><li>数值常量：如Std::integral_constant&lt;int, 42&gt;。</li><li>数值常量的简化写法，Std::Int，数值类型为size_t：如Std::Int&lt;42&gt;。</li></ul><h2 id="函数原型">函数原型<a class="header-anchor" href="#函数原型">​</a></h2><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>template &lt;typename Tp, Tp v&gt;
struct integral_constant
{
    static constexpr const Tp value = v;
    using value_type = Tp;
    using type = integral_constant;
    inline constexpr operator value_type() const noexcept;
    inline constexpr value_type operator()() const noexcept;
};

template &lt;size_t v&gt;
using Int = integral_constant&lt;size_t, v&gt;;
</code></pre></div><h2 id="参数说明">参数说明<a class="header-anchor" href="#参数说明">​</a></h2><p><strong>表1</strong> 模板参数说明</p><table><thead><tr><th>参数名</th><th>含义</th></tr></thead><tbody><tr><td>Tp</td><td>数值的数据类型。</td></tr><tr><td>v</td><td>常量数值。</td></tr></tbody></table><h2 id="约束说明">约束说明<a class="header-anchor" href="#约束说明">​</a></h2><ul><li>Int类型是integral_constant数值结构的别名简写，数值类型必须是size_t类型。</li><li>模板参数Tp不支持float等浮点数类型，因为模板参数需在编译期确定，而浮点数的精度问题可能导致编译期无法准确表示。</li></ul><h2 id="返回值说明">返回值说明<a class="header-anchor" href="#返回值说明">​</a></h2><p>无</p><h2 id="调用示例">调用示例<a class="header-anchor" href="#调用示例">​</a></h2><ul><li><p>数值类型封装</p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>// 以下示例为基于googletest的UT示例
using IntTrue = AscendC::Std::integral_constant&lt;int, 1&gt;;
using IntFalse = AscendC::Std::integral_constant&lt;int, 0&gt;;
// 测试value静态常量
EXPECT_EQ(IntTrue::value, 1);
EXPECT_EQ(IntFalse::value, 0);
// 测试()操作符重载
EXPECT_EQ(IntTrue()(), 1);
EXPECT_EQ(IntFalse()(), 0);
// 测试类型定义
EXPECT_TRUE((AscendC::Std::is_same&lt;typename IntTrue::value_type, int&gt;::value));
EXPECT_TRUE((AscendC::Std::is_same&lt;typename IntTrue::type, IntTrue&gt;::value));
</code></pre></div></li><li><p>特化类型——bool</p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>// 以下示例为基于googletest的UT示例
using TrueType = AscendC::Std::true_type;
using FalseType = AscendC::Std::false_type;
// 测试value静态常量
EXPECT_TRUE(TrueType::value);
EXPECT_FALSE(FalseType::value);
// 测试()操作符重载
EXPECT_TRUE(TrueType()());
EXPECT_FALSE(FalseType()());
// 测试类型定义
EXPECT_TRUE((AscendC::Std::is_same&lt;typename TrueType::value_type, bool&gt;::value));
EXPECT_TRUE((AscendC::Std::is_same&lt;typename TrueType::type, TrueType&gt;::value));
EXPECT_TRUE((AscendC::Std::is_same&lt;typename FalseType::type, FalseType&gt;::value));
</code></pre></div></li><li><p>特化类型——Int</p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>// 以下示例为基于googletest的UT示例
using Zero = AscendC::Std::Int&lt;0&gt;;
using One = AscendC::Std::Int&lt;1&gt;;
using Large = AscendC::Std::Int&lt;0xFFFFFFFF&gt;;
// 验证value静态常量
EXPECT_EQ(Zero::value, 0);
EXPECT_EQ(One::value, 1);
EXPECT_EQ(Large::value, 0xFFFFFFFF);
// 验证类型定义
EXPECT_TRUE((AscendC::Std::is_same&lt;typename Zero::value_type, size_t&gt;::value));
EXPECT_TRUE((AscendC::Std::is_same&lt;typename Zero::type, Zero&gt;::value));
EXPECT_TRUE((AscendC::Std::is_same&lt;Zero, AscendC::Std::integral_constant&lt;size_t, 0&gt;&gt;::value));
// 验证()操作符重载
EXPECT_EQ(Zero()(), 0);
EXPECT_EQ(One()(), 1);
EXPECT_EQ(Large()(), 0xFFFFFFFF);
</code></pre></div></li><li><p>Int特化类型的运算</p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>// 加法
static_assert((AscendC::Std::Int&lt;5&gt;::value + AscendC::Std::Int&lt;3&gt;::value) == 8, &quot;Addition failed&quot;);
// 乘法
static_assert((AscendC::Std::Int&lt;4&gt;::value * AscendC::Std::Int&lt;6&gt;::value) == 24, &quot;Multiplication failed&quot;);
// 比较
static_assert(AscendC::Std::Int&lt;10&gt;::value &gt; AscendC::Std::Int&lt;5&gt;::value, &quot;Comparison failed&quot;);
static_assert(AscendC::Std::Int&lt;7&gt;::value != AscendC::Std::Int&lt;77&gt;::value, &quot;Equality check failed&quot;);
</code></pre></div></li></ul></article></div>`,1)])])}const g=e(s,[["render",i]]);export{v as __pageData,g as default};
