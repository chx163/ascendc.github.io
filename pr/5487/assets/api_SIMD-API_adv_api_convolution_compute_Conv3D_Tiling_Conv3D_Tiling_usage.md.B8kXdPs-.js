import{_ as n,o as t,a,b as e}from"./app.DKoEZOcr.js";const h=JSON.parse('{"title":"","description":"","frontmatter":{"breadcrumbs":[{"text":"Ascend C API","link":"/api/api_list"},{"text":"SIMD API","link":"/api/SIMD-API/SIMD-API"},{"text":"高阶API","link":"/api/SIMD-API/adv_api/adv_api"},{"text":"卷积计算","link":"/api/SIMD-API/adv_api/convolution_compute/convolution_compute"},{"text":"Conv3D Tiling侧接口","link":"/api/SIMD-API/adv_api/convolution_compute/Conv3D_Tiling/Conv3d_Tiling"},{"text":"Conv3D Tiling使用说明","link":"/api/SIMD-API/adv_api/convolution_compute/Conv3D_Tiling/Conv3D_Tiling_usage"}]},"headers":[],"relativePath":"api/SIMD-API/adv_api/convolution_compute/Conv3D_Tiling/Conv3D_Tiling_usage.md","filePath":"api/SIMD-API/adv_api/convolution_compute/Conv3D_Tiling/Conv3D_Tiling_usage.md","outlineHeaders":[{"level":2,"title":"需要包含的头文件","slug":"需要包含的头文件","link":"#需要包含的头文件"}],"lastUpdated":1787050286000}'),o={name:"api/SIMD-API/adv_api/convolution_compute/Conv3D_Tiling/Conv3D_Tiling_usage.md"};function l(p,i,d,c,v,g){return t(),a("div",null,[...i[0]||(i[0]=[e(`<div><article class="markdown-body"><h1>Conv3D Tiling使用说明</h1><p>Ascend C提供一组Conv3D Tiling API，方便用户获取Conv3D正向算子核函数（Kernel）计算时所需的Tiling参数。用户只需要传入Input/Weight/Bias/Output的Position位置、Format格式和DType数据类型及相关参数等信息，调用API接口，即可获取<a href="../Conv3D_Kernel/Init.html">Init</a>中TConv3DApiTiling结构体中的相关参数。</p><p>Conv3D Tiling API提供Conv3D单核Tiling接口，用于Conv3D单核计算场景，获取Tiling参数的流程如下：</p><ol><li>创建一个单核Tiling对象。</li><li>设置Input、Weight、Bias、Output的参数类型信息以及Shape信息，如果存在Padding、Stride、Dilation参数，通过<a href="SetPadding.html">SetPadding</a>、<a href="SetStride.html">SetStride</a>、<a href="SetDilation.html">SetDilation</a>接口进行相关设置。</li><li>调用<a href="GetTiling.html">GetTiling</a>接口，获取Tiling信息。</li></ol><p>使用Conv3D Tiling接口获取Tiling参数的样例如下：</p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>// 实例化Conv3D Api
auto ascendcPlatform = platform_ascendc::PlatformAscendC(context-&gt;GetPlatformInfo());
Conv3dTilingApi::Conv3dTiling conv3dApiTiling(ascendcPlatform);
// 设置输入输出原始规格、单核规格、参数等
conv3dApiTiling.SetGroups(groups);
conv3dApiTiling.SetOrgWeightShape(cout, kd, kh, kw);
conv3dApiTiling.SetOrgInputShape(cin, di, hi, wi);
conv3dApiTiling.SetPadding(padh, padt, padu, padd, padl, padr);
conv3dApiTiling.SetDilation(dilationH, dilationW, dilationD);
conv3dApiTiling.SetStride(strideH, strideW, strideD);
conv3dApiTiling.SetSingleWeightShape(cin, kd, kh, kw);
conv3dApiTiling.SetSingleOutputShape(singleCoreCo, singleCoreDo, singleCoreMo);
// 设置输入输出type
conv3dApiTiling.SetInputType(TPosition::GM, inputFormat, inputDtype);
conv3dApiTiling.SetWeightType(TPosition::GM, weightFormat, weightDtype);
conv3dApiTiling.SetOutputType(TPosition::CO1, outputFormat, outputDtype);
if (biasFlag) {
    conv3dApiTiling.SetBiasType(TPosition::GM, biasFormat, biasDtype);
}
// 调用GetTiling接口获取核内切分策略，如果返回-1代表获取tiling失败
if (conv3dApiTiling.GetTiling(tilingData.conv3dApiTilingData) == -1) {
    return false;
}
</code></pre></div><h2 id="需要包含的头文件">需要包含的头文件<a class="header-anchor" href="#需要包含的头文件">​</a></h2><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>#include &quot;lib/conv/conv3d/conv3d_tiling.h&quot;
</code></pre></div></article></div>`,1)])])}const r=n(o,[["render",l]]);export{h as __pageData,r as default};
