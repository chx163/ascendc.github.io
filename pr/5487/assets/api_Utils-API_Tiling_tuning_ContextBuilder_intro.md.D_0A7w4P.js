import{_ as n,o as e,a as i,b as l}from"./app.DKoEZOcr.js";const u=JSON.parse('{"title":"","description":"","frontmatter":{"breadcrumbs":[{"text":"Ascend C API","link":"/api/api_list"},{"text":"Utils API","link":"/api/Utils-API/Utils-API"},{"text":"Tiling调测","link":"/api/Utils-API/Tiling_tuning/Tiling_tuning"},{"text":"ContextBuilder","link":"/api/Utils-API/Tiling_tuning/ContextBuilder/ContextBuilder"},{"text":"简介","link":"/api/Utils-API/Tiling_tuning/ContextBuilder/intro"}]},"headers":[],"relativePath":"api/Utils-API/Tiling_tuning/ContextBuilder/intro.md","filePath":"api/Utils-API/Tiling_tuning/ContextBuilder/intro.md","outlineHeaders":[{"level":2,"title":"调用示例","slug":"调用示例","link":"#调用示例"}],"lastUpdated":1785986301000}'),a={name:"api/Utils-API/Tiling_tuning/ContextBuilder/intro.md"};function o(r,t,d,s,c,p){return e(),i("div",null,[...t[0]||(t[0]=[l(`<div><article class="markdown-body"><h1>简介<span id="ZH-CN_TOPIC_0000002114097953"></span></h1><p>ContextBuilder类提供一系列的API接口，支持手动构造TilingContext类来验证Tiling函数以及KernelContext类用于TilingParse函数的验证。</p><h2 id="调用示例">调用示例<span id="zh-cn_topic_0000001819028992_zh-cn_topic_0000001389787297_section320753512363"></span><a class="header-anchor" href="#调用示例">​</a></h2><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>// 构造KernelContext
auto kernelContextHolder = context_ascendc::ContextBuilder()
    .Inputs(...)
    .Outputs(...)
    .BuildKernelRunContext();
gert::KernelContext* tilingParseContext = kernelContextHolder-&gt;GetContext&lt;gert::KernelContext&gt;();

// 构造TilingContext
auto tilingContextHolder = context_ascendc::ContextBuilder()
    .SetOpNameType(...,...)
    .NodeIoNum(...)
    .IrInstanceNum(...)
    .AddInputTd(...)
    .AddOutputTd(...)
    .AddAttr(...)
    .BuildTilingContext(...);
gert::TilingContext* tilingContext = tilingContextHolder-&gt;GetContext&lt;gert::TilingContext&gt;();
</code></pre></div></article></div>`,1)])])}const x=n(a,[["render",o]]);export{u as __pageData,x as default};
