import{_ as e,o as n,a as l,b as s}from"./app.DKoEZOcr.js";const p=JSON.parse('{"title":"","description":"","frontmatter":{"breadcrumbs":[{"text":"Ascend C API","link":"/api/api_list"},{"text":"Utils API","link":"/api/Utils-API/Utils-API"},{"text":"C++标准库","link":"/api/Utils-API/cpp_stdlib/cpp_stdlib"},{"text":"容器函数","link":"/api/Utils-API/cpp_stdlib/container_functions/container_functions"},{"text":"tuple","link":"/api/Utils-API/cpp_stdlib/container_functions/tuple"}]},"headers":[],"relativePath":"api/Utils-API/cpp_stdlib/container_functions/tuple.md","filePath":"api/Utils-API/cpp_stdlib/container_functions/tuple.md","outlineHeaders":[{"level":2,"title":"产品支持情况","slug":"产品支持情况","link":"#产品支持情况"},{"level":2,"title":"功能说明","slug":"功能说明","link":"#功能说明"},{"level":2,"title":"函数原型","slug":"函数原型","link":"#函数原型"},{"level":2,"title":"参数说明","slug":"参数说明","link":"#参数说明"},{"level":2,"title":"约束说明","slug":"约束说明","link":"#约束说明"},{"level":2,"title":"返回值说明","slug":"返回值说明","link":"#返回值说明"},{"level":2,"title":"调用示例","slug":"调用示例","link":"#调用示例"}],"lastUpdated":1785986301000}'),i={name:"api/Utils-API/cpp_stdlib/container_functions/tuple.md"};function _(d,t,u,o,c,a){return n(),l("div",null,[...t[0]||(t[0]=[s(`<div><article class="markdown-body"><h1>tuple</h1><h2 id="产品支持情况">产品支持情况<a class="header-anchor" href="#产品支持情况">​</a></h2><ul><li>Ascend 950PR/Ascend 950DT：支持</li><li>Atlas A3 训练系列产品/Atlas A3 推理系列产品：支持</li><li>Atlas A2 训练系列产品/Atlas A2 推理系列产品：支持</li><li>Atlas 200I/500 A2 推理产品：不支持</li><li>Atlas 推理系列产品AI Core：不支持</li><li>Atlas 推理系列产品Vector Core：不支持</li><li>Atlas 训练系列产品：不支持</li></ul><h2 id="功能说明">功能说明<a class="header-anchor" href="#功能说明">​</a></h2><p>在C++中，tuple是一个功能强大的容器，它允许存储多个不同类型的元素。具体使用场景如下：</p><ul><li>当一个函数需要返回多个不同类型的值时，使用tuple是一个很好的选择。它避免了创建结构体或类来封装多个返回值，尤其是在不需要为这些返回值创建单独的类型时。</li><li>当需要存储不同类型的数据，可以使用tuple来存储异构元素。例如，存储数据的查询结果，其中包含不同类型的字段。</li><li>在函数调用中，当需要传递多个不同类型的参数，但又不想为它们创建结构体时，可以使用tuple对这些参数分组。</li><li>在模板元编程中，tuple可以作为类型列表，存储多个类型信息。</li><li>当程序需要在不同阶段存储和传递多个状态信息时，可以使用tuple将这些状态统一存储，便于管理。</li><li>在一些泛型算法中，可以使用tuple存储计算结果或中间结果。</li><li>在模板元编程中，可以使用tuple存储和展开参数包。</li></ul><p>以下是tuple的构造函数说明：</p><ul><li>默认构造函数：创建一个空的元组。</li><li>初始化列表构造函数：直接在创建对象时提供元素的值。</li><li>复制构造函数：用来复制一个已有的元组。</li></ul><p>另外，Ascend C提供辅助函数<a href="make_tuple.html">make_tuple</a>，用于创建元组，它可以自动推断元素的类型，使代码更简洁，也可以使用make_tuple来构造元素列表。</p><h2 id="函数原型">函数原型<a class="header-anchor" href="#函数原型">​</a></h2><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>template &lt;typename Tp, typename ...Tps&gt;
class tuple&lt;Tp, Tps...&gt; : public tuple&lt;Tps...&gt;
{
public:
    __aicore__ inline tuple();

    __aicore__ inline tuple(const Tp&amp; val, const Tps&amp; ...params);

    __aicore__ inline tuple(Tp&amp;&amp; val, Tps&amp;&amp; ...params);

    template &lt;typename Head, typename ...Args&gt;
    __aicore__ inline tuple&lt;Tp, Tps...&gt;&amp; operator=(const tuple&lt;Head, Args...&gt;&amp; t);
}
</code></pre></div><h2 id="参数说明">参数说明<a class="header-anchor" href="#参数说明">​</a></h2><p><strong>表1</strong> 模板参数说明</p><table><thead><tr><th>参数名</th><th>含义</th></tr></thead><tbody><tr><td>Tps...</td><td>表示输入类型的形参包，参数个数范围为[0，64]。<br><br>Ascend 950PR/Ascend 950DT，支持的数据类型为：bool、int4b_t、int8_t、uint8_t、fp8_e8m0_t、int16_t、uint16_t、half、bfloat16_t、int32_t、uint32_t、float、int64_t、uint64_t、LocalTensor、GlobalTensor。<br><br>Atlas A3 训练系列产品/Atlas A3 推理系列产品，支持的数据类型为：bool、int4b_t、int8_t、uint8_t、int16_t、uint16_t、half、bfloat16_t、int32_t、uint32_t、float、int64_t、uint64_t、LocalTensor、GlobalTensor。<br><br>Atlas A2 训练系列产品/Atlas A2 推理系列产品，支持的数据类型为：bool、int4b_t、int8_t、uint8_t、int16_t、uint16_t、half、bfloat16_t、int32_t、uint32_t、float、int64_t、uint64_t、LocalTensor、GlobalTensor。</td></tr></tbody></table><h2 id="约束说明">约束说明<a class="header-anchor" href="#约束说明">​</a></h2><ul><li>tuple实例化深度为64，即支持64个元素以内的数据类型的聚合。</li><li>构造函数为初始化列表时，列表中的数据应同为左值或右值，不可混用，初始化列表中的元素个数和类型，必须与tuple定义的元素个数和类型严格匹配。</li><li>不支持数组等可变长度的数据类型。</li><li>不支持隐式转换构造函数。</li><li>由于当前基于继承实现tuple，对于如tuple&lt;int, int&gt; a =make_tuple(1, 2, 3)的写法，会触发隐式转换，同时因为C++ object slice数据切片的特性，会导致多余的部分数据被丢弃，因此，应避免使用上述写法。</li></ul><h2 id="返回值说明">返回值说明<a class="header-anchor" href="#返回值说明">​</a></h2><p>无</p><h2 id="调用示例">调用示例<a class="header-anchor" href="#调用示例">​</a></h2><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>AscendC::LocalTensor&lt;T&gt; src0Local = inQueueX.AllocTensor&lt;T&gt;();
AscendC::LocalTensor&lt;T&gt; src1Local = inQueueX2.AllocTensor&lt;T&gt;();

// make_tuple聚合Tensor类结构
auto testMakeTensor = AscendC::Std::make_tuple(src0Local, src1Local, src0_global, src1_global);

AscendC::PRINTF(&quot;tuple size is --&gt; %d\\n&quot;, AscendC::Std::tuple_size&lt;decltype(testMakeTensor)&gt;::value);

//初始化列表构造聚合
AscendC::Std::tuple&lt;AscendC::LocalTensor&lt;T&gt;, AscendC::LocalTensor&lt;T&gt;, AscendC::GlobalTensor&lt;T&gt;, AscendC::GlobalTensor&lt;T&gt;&gt; testTensor{src0Local, src1Local, src0_global, src1_global};

// 复制构造方式
AscendC::Std::tuple&lt;AscendC::LocalTensor&lt;T&gt;, AscendC::LocalTensor&lt;T&gt;, AscendC::GlobalTensor&lt;T&gt;, AscendC::GlobalTensor&lt;T&gt;&gt; test2Tensor = testTensor;

AscendC::Std::tuple&lt;AscendC::LocalTensor&lt;T&gt;, AscendC::LocalTensor&lt;T&gt;, AscendC::GlobalTensor&lt;T&gt;, AscendC::GlobalTensor&lt;T&gt;&gt; test3Tensor;

// 运算符重载
test3Tensor = test2Tensor;

AscendC::PRINTF(&quot;tuple size is --&gt; %d\\n&quot;, AscendC::Std::tuple_size&lt;decltype(test3Tensor)&gt;::value);

// get方法获取对应元素
AscendC::LocalTensor&lt;T&gt; src0LocalTuple = AscendC::Std::get&lt;0&gt;(test3Tensor);
AscendC::LocalTensor&lt;T&gt; src1LocalTuple = AscendC::Std::get&lt;1&gt;(test3Tensor);

AscendC::GlobalTensor&lt;T&gt; src0_globalTuple = AscendC::Std::get&lt;2&gt;(test3Tensor);
AscendC::GlobalTensor&lt;T&gt; src1_globalTuple = AscendC::Std::get&lt;3&gt;(test3Tensor);

// 多种数据类型初始化列表聚合
AscendC::Std::tuple&lt;AscendC::int4b_t, int8_t, uint8_t, int16_t, uint16_t, int32_t, uint32_t, uint64_t, int64_t, half, float, \\
bfloat16_t, fp8_e8m0_t, bool&gt; test1 = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10.0, 11.0, 12.0, 13.0, true};

AscendC::PRINTF(&quot;tuple size is --&gt; %d\\n&quot;, AscendC::Std::tuple_size&lt;decltype(test1)&gt;::value);

// get方法获取多种数据类型元素
AscendC::int4b_t        number_int4b_t =        AscendC::Std::get&lt;0&gt;(test1);
int8_t                  number_int8_t =         AscendC::Std::get&lt;1&gt;(test1);
uint8_t                 number_uint8_t =        AscendC::Std::get&lt;2&gt;(test1);
int16_t                 number_int16_t =        AscendC::Std::get&lt;3&gt;(test1);
uint16_t                number_uint16_t =       AscendC::Std::get&lt;4&gt;(test1);
int32_t                 number_int32_t =        AscendC::Std::get&lt;5&gt;(test1);
uint32_t                number_uint32_t =       AscendC::Std::get&lt;6&gt;(test1);
uint64_t                number_uint64_t =       AscendC::Std::get&lt;7&gt;(test1);
int64_t                 number_int64_t =        AscendC::Std::get&lt;8&gt;(test1);
half                    number_half =           AscendC::Std::get&lt;9&gt;(test1);
float                   number_float =          AscendC::Std::get&lt;10&gt;(test1);
bfloat16_t              number_bfloat16_t =     AscendC::Std::get&lt;11&gt;(test1);
fp8_e8m0_t              number_fp8_e8m0_t =     AscendC::Std::get&lt;12&gt;(test1);
bool                    number_bool =           AscendC::Std::get&lt;13&gt;(test1);

// get方法获取元素引用接续运算
AscendC::Std::get&lt;1&gt;(test1)+= 1 ;
AscendC::Std::get&lt;2&gt;(test1)+= 1 ;
AscendC::Std::get&lt;3&gt;(test1)+= 1 ;
AscendC::Std::get&lt;4&gt;(test1)+= 1 ;
AscendC::Std::get&lt;5&gt;(test1)+= 1 ;
AscendC::Std::get&lt;6&gt;(test1)+= 1 ;
AscendC::Std::get&lt;7&gt;(test1)+= 1 ;
AscendC::Std::get&lt;8&gt;(test1)+= 1 ;
AscendC::Std::get&lt;10&gt;(test1) += (float)1.0 ;

// make_tuple初始化列表固定元素数据类型
auto test2 = AscendC::Std::make_tuple(AscendC::int4b_t (1) ,int8_t (2) ,uint8_t (3) ,int16_t (4) ,uint16_t (5) ,int32_t (6) , \\
    uint32_t (7) ,uint64_t (8) ,int64_t (9) ,half (10) ,float (11) ,bfloat16_t (12) ,fp8_e8m0_t (13) , bool (true));

AscendC::PRINTF(&quot;tuple size is --&gt; %d\\n&quot;, AscendC::Std::tuple_size&lt;decltype(test2)&gt;::value);

// get方法获取多种数据类型元素
number_int4b_t =        AscendC::Std::get&lt;0&gt;(test2);
number_int8_t =         AscendC::Std::get&lt;1&gt;(test2);
number_uint8_t =        AscendC::Std::get&lt;2&gt;(test2);
number_int16_t =        AscendC::Std::get&lt;3&gt;(test2);
number_uint16_t =       AscendC::Std::get&lt;4&gt;(test2);
number_int32_t =        AscendC::Std::get&lt;5&gt;(test2);
number_uint32_t =       AscendC::Std::get&lt;6&gt;(test2);
number_uint64_t =       AscendC::Std::get&lt;7&gt;(test2);
number_int64_t =        AscendC::Std::get&lt;8&gt;(test2);
number_half =           AscendC::Std::get&lt;9&gt;(test2);
number_float =          AscendC::Std::get&lt;10&gt;(test2);
number_bfloat16_t =     AscendC::Std::get&lt;11&gt;(test2);
number_fp8_e8m0_t =     AscendC::Std::get&lt;12&gt;(test2);
number_bool =           AscendC::Std::get&lt;13&gt;(test2);

// get方法获取元素引用接续运算
AscendC::Std::get&lt;1&gt;(test2)+= 1 ;
AscendC::Std::get&lt;2&gt;(test2)+= 1 ;
AscendC::Std::get&lt;3&gt;(test2)+= 1 ;
AscendC::Std::get&lt;4&gt;(test2)+= 1 ;
AscendC::Std::get&lt;5&gt;(test2)+= 1 ;
AscendC::Std::get&lt;6&gt;(test2)+= 1 ;
AscendC::Std::get&lt;7&gt;(test2)+= 1 ;
AscendC::Std::get&lt;8&gt;(test2)+= 1 ;
AscendC::Std::get&lt;10&gt;(test2) += (float)1.0 ;

// 变量初始化列表聚合
AscendC::Std::tuple&lt;AscendC::int4b_t, int8_t, uint8_t, int16_t, uint16_t, int32_t, uint32_t, uint64_t, int64_t, half, float, \\
bfloat16_t, fp8_e8m0_t, bool&gt; test3 = {
    number_int4b_t, number_int8_t, number_uint8_t, number_int16_t, number_uint16_t, number_int32_t, number_uint32_t, \\
    number_uint64_t, number_int64_t, number_half, number_float, number_bfloat16_t, number_fp8_e8m0_t, number_bool,
};

AscendC::PRINTF(&quot;tuple size is --&gt; %d\\n&quot;, AscendC::Std::tuple_size&lt;decltype(test3)&gt;::value);

uint32_t const_uint32_t = 0;
float const_float = 0.0;
bool const_bool = false;

// const常量类型
const AscendC::Std::tuple&lt;uint32_t, float, bool&gt; test4{11, 2.2, true};

// get方法获取const常量类型
const_uint32_t = AscendC::Std::get&lt;0&gt;(test4);
const_float = AscendC::Std::get&lt;1&gt;(test4);
const_bool = AscendC::Std::get&lt;2&gt;(test4);

AscendC::Std::tuple_element&lt;0,decltype(test4)&gt;::type first = 77;
AscendC::Std::tuple_element&lt;1,decltype(test4)&gt;::type second = 7.7;
AscendC::Std::tuple_element&lt;2,decltype(test4)&gt;::type third = false;

AscendC::PRINTF(&quot;The value of the test element is: %d, %f, %d\\n&quot;, first, second, third);

AscendC::Std::tie(const_uint32_t, const_float, const_bool) = test4;

AscendC::PRINTF(&quot;The value of the test element is: %d, %f, %d\\n&quot;, const_uint32_t, const_float, const_bool);

// const元素聚合
AscendC::Std::tuple&lt;const uint32_t, const float, const bool&gt; test5{33, 4.4, true};

// get方法获取const元素
const_uint32_t = AscendC::Std::get&lt;0&gt;(test5);
const_float = AscendC::Std::get&lt;1&gt;(test5);
const_bool = AscendC::Std::get&lt;2&gt;(test5);

const AscendC::Std::tuple&lt;const uint32_t, const float, const bool&gt; test6{33, 4.4, true};

const_uint32_t = AscendC::Std::get&lt;0&gt;(test6);
const_float = AscendC::Std::get&lt;1&gt;(test6);
const_bool = AscendC::Std::get&lt;2&gt;(test6);

// 默认构造初始化
AscendC::Std::tuple&lt;\\
uint32_t, uint32_t, uint32_t, uint32_t, uint32_t, uint32_t, uint32_t, uint32_t, uint32_t, uint32_t, \\
uint32_t, uint32_t, uint32_t, uint32_t, uint32_t, uint32_t, uint32_t, uint32_t, uint32_t, uint32_t, \\
uint32_t, uint32_t, uint32_t, uint8_t, uint32_t, uint32_t, uint32_t, uint32_t, uint32_t, uint32_t,\\
uint32_t, uint32_t, uint32_t, uint32_t, uint32_t, uint32_t, uint32_t, uint32_t, uint32_t, uint32_t, \\
uint32_t, uint32_t, uint32_t, uint32_t, uint32_t, uint32_t, uint32_t, uint32_t, uint32_t, uint32_t, \\
uint32_t, uint32_t, uint32_t, uint32_t, uint32_t, uint32_t, uint32_t, uint32_t, uint32_t, uint32_t, \\
uint32_t, uint32_t, uint32_t, uint32_t&gt; test7;

// 默认元素初始化聚合
auto test8 = AscendC::Std::make_tuple(\\
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, \\
    11, 12, 13, 14, 15, 16, 17, 18, 19, 20, \\
    21, 22, 23, 24, 25, 26, 27, 28, 29, 30, \\
    31, 32, 33, 34, 35, 36, 37, 38, 39, 40, \\
    41, 42, 43, 44, 45, 46, 47, 48, 49, 50, \\
    51, 52, 53, 54, 55, 56, 57, 58, 59, 60, \\
    61, 62, 63, 64);

// 运算符重载赋值
test7 = test8;

AscendC::PRINTF(&quot;tuple size is --&gt; %d\\n&quot;, AscendC::Std::tuple_size&lt;decltype(test7)&gt;::value);
AscendC::PRINTF(&quot;tuple size is --&gt; %d\\n&quot;, AscendC::Std::tuple_size&lt;decltype(test8)&gt;::value);

// make_tuple聚合初始化
AscendC::Std::tuple&lt;uint32_t, float, bool&gt; test9 = AscendC::Std::make_tuple(const_uint32_t, const_float, const_bool);

const_uint32_t = AscendC::Std::get&lt;0&gt;(test9);
const_float = AscendC::Std::get&lt;1&gt;(test9);
const_bool = AscendC::Std::get&lt;2&gt;(test9);

AscendC::PRINTF(&quot;tuple size is --&gt; %d\\n&quot;, AscendC::Std::tuple_size&lt;decltype(test9)&gt;::value);

using Element0Type = AscendC::Std::tuple_element&lt;0, decltype(test9)&gt;::type;
Element0Type element0 = 88;

using Element1Type = AscendC::Std::tuple_element&lt;1, decltype(test9)&gt;::type;
Element1Type element1 = 8.8;

using Element2Type = AscendC::Std::tuple_element&lt;2, decltype(test9)&gt;::type;
Element2Type element2 = true;

AscendC::PRINTF(&quot;The value of the test element is: %d, %f, %d\\n&quot;, element0, element1, element2);

AscendC::Std::tie(const_uint32_t, const_float, const_bool) = test9;

AscendC::PRINTF(&quot;The value of the test element is: %d, %f, %d\\n&quot;, const_uint32_t, const_float, const_bool);
</code></pre></div><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>// 执行结果：
(testMakeTensor) tuple size is --&gt; 4
(test3Tensor) tuple size is --&gt; 4
(test1) tuple size is --&gt; 14
(test2) tuple size is --&gt; 14
(test3) tuple size is --&gt; 14
(test4 tuple_element) The value of the test element is: 77, 7.700000, 0
(test4 tie) The value of the test element is: 11, 2.200000, 1
(test7) tuple size is --&gt; 64
(test8) tuple size is --&gt; 64
(test9) tuple size is --&gt; 3
(test9 tuple_element) The value of the test element is: 88, 8.800000, 1
(test9 tie) The value of the test element is: 33, 4.400000, 1
</code></pre></div></article></div>`,1)])])}const r=e(i,[["render",_]]);export{p as __pageData,r as default};
