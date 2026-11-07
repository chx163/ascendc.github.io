import{_ as d,o as e,a,b as r}from"./app.DKoEZOcr.js";const f=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"api/Utils-API/prototype_register_management/OpAttrDef/OpAttrDef_functions.md","filePath":"api/Utils-API/prototype_register_management/OpAttrDef/OpAttrDef_functions.md","outlineHeaders":[{"level":2,"title":"功能说明","slug":"功能说明","link":"#功能说明"},{"level":2,"title":"函数原型","slug":"函数原型","link":"#函数原型"},{"level":2,"title":"函数说明","slug":"函数说明","link":"#函数说明"}],"lastUpdated":1785997882000}'),n={name:"api/Utils-API/prototype_register_management/OpAttrDef/OpAttrDef_functions.md"};function o(i,t,p,s,l,c){return e(),a("div",null,[...t[0]||(t[0]=[r(`<div><article class="markdown-body"><h1>OpAttrDef<span id="ZH-CN_TOPIC_0000002078492716"></span></h1><h2 id="功能说明">功能说明<span id="zh-cn_topic_0000001656780128_zh-cn_topic_0000001576870901_zh-cn_topic_0000001575944081_section36583473819"></span><a class="header-anchor" href="#功能说明">​</a></h2><p>定义算子属性。</p><h2 id="函数原型">函数原型<span id="zh-cn_topic_0000001656780128_section3992421457"></span><a class="header-anchor" href="#函数原型">​</a></h2><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>class OpAttrDef {
public:
  explicit OpAttrDef(const char *name);
  OpAttrDef(const OpAttrDef &amp;attr_def);
  ~OpAttrDef();
  OpAttrDef &amp;operator=(const OpAttrDef &amp;attr_def);
  OpAttrDef &amp;AttrType(Option attr_type);
  OpAttrDef &amp;Bool(void);
  OpAttrDef &amp;Bool(bool value);
  OpAttrDef &amp;Float(void);
  OpAttrDef &amp;Float(float value);
  OpAttrDef &amp;Int(void);
  OpAttrDef &amp;Int(int64_t value);
  OpAttrDef &amp;String(void);
  OpAttrDef &amp;String(const char *value);
  OpAttrDef &amp;ListBool(void);
  OpAttrDef &amp;ListBool(std::vector&lt;bool&gt; value);
  OpAttrDef &amp;ListFloat(void);
  OpAttrDef &amp;ListFloat(std::vector&lt;float&gt; value);
  OpAttrDef &amp;ListInt(void);
  OpAttrDef &amp;ListInt(std::vector&lt;int64_t&gt; value);
  OpAttrDef &amp;ListListInt(void);
  OpAttrDef &amp;ListListInt(std::vector&lt;std::vector&lt;int64_t&gt;&gt; value);
  OpAttrDef &amp;Version(uint32_t version);
  ge::AscendString &amp;GetName(void) const;
  bool IsRequired(void);
private:
  ...
};
</code></pre></div><h2 id="函数说明">函数说明<span id="zh-cn_topic_0000001656780128_section1340317244469"></span><a class="header-anchor" href="#函数说明">​</a></h2><p><strong>表1</strong> OpAttrDef类成员函数说明</p><p><span id="zh-cn_topic_0000001656780128_zh-cn_topic_0000001441184464_table18149577913"></span></p><table><thead><tr><th>函数名称</th><th>入参说明</th><th>功能说明</th></tr></thead><tbody><tr><td>OpAttrDef</td><td>name: 算子属性名称。</td><td>构造算子属性定义OpAttrDef，并设置属性名称。</td></tr><tr><td>OpAttrDef</td><td>attr_def: 已构造完成的算子属性OpAttrDef。</td><td>拷贝构造OpAttrDef，复制被拷贝对象的属性名称、属性数据类型、属性类型、默认值、版本号和注释等配置。</td></tr><tr><td>AttrType</td><td>attr_type: 属性类型</td><td>设置算子属性类型，取值为：OPTIONAL（可选）、REQUIRED（必选）。</td></tr><tr><td>Bool</td><td>无</td><td>设置算子属性数据类型为Bool</td></tr><tr><td>Bool</td><td>value</td><td>设置算子属性数据类型为Bool，并设置属性默认值为value。属性类型设置为OPTIONAL时必须调用该类接口设置默认值。</td></tr><tr><td>Float</td><td>无</td><td>设置算子属性数据类型为Float</td></tr><tr><td>Float</td><td>value</td><td>设置算子属性数据类型为Float，并设置属性默认值为value。属性类型设置为OPTIONAL时必须调用该类接口设置默认值。</td></tr><tr><td>Int</td><td>无</td><td>设置算子属性数据类型为Int</td></tr><tr><td>Int</td><td>value</td><td>设置算子属性数据类型为Int，并设置属性默认值为value。属性类型设置为OPTIONAL时必须调用该类接口设置默认值。</td></tr><tr><td>String</td><td>无</td><td>设置算子属性数据类型为String</td></tr><tr><td>String</td><td>value</td><td>设置算子属性数据类型为String，并设置属性默认值为value。属性类型设置为OPTIONAL时必须调用该类接口设置默认值。</td></tr><tr><td>ListBool</td><td>无</td><td>设置算子属性数据类型为ListBool</td></tr><tr><td>ListBool</td><td>value</td><td>设置算子属性数据类型为ListBool，并设置属性默认值为value。属性类型设置为OPTIONAL时必须调用该类接口设置默认值。</td></tr><tr><td>ListFloat</td><td>无</td><td>设置算子属性数据类型为ListFloat</td></tr><tr><td>ListFloat</td><td>value</td><td>设置算子属性数据类型为ListFloat，并设置属性默认值为value。属性类型设置为OPTIONAL时必须调用该类接口设置默认值。</td></tr><tr><td>ListInt</td><td>无</td><td>设置算子属性数据类型为ListInt</td></tr><tr><td>ListInt</td><td>value</td><td>设置算子属性数据类型为ListInt，并设置属性默认值为value。属性类型设置为OPTIONAL时必须调用该类接口设置默认值。</td></tr><tr><td>ListListInt</td><td>无</td><td>设置算子属性数据类型为ListListInt</td></tr><tr><td>ListListInt</td><td>value</td><td>设置算子属性数据类型为ListListInt，并设置属性默认值为value。属性类型设置为OPTIONAL时必须调用该类接口设置默认值。</td></tr><tr><td>Version</td><td>version：配置的版本号</td><td>新增可选属性时，为了保持原有单算子API(aclnnxxx)接口的兼容性，可以通过Version接口配置aclnn接口的版本号，版本号需要从1开始配，且应该连续配置（和<a href="../OpParamDef/Version.html">可选输入</a>统一编号）。配置后，自动生成的aclnn接口会携带版本号。高版本号的接口会包含低版本号接口的所有参数。</td></tr><tr><td>GetName</td><td>无</td><td>获取属性名称。</td></tr><tr><td>IsRequired</td><td>无</td><td>判断算子属性是否为必选，必选返回true，可选返回false。</td></tr></tbody></table></article></div>`,1)])])}const v=d(n,[["render",o]]);export{f as __pageData,v as default};
