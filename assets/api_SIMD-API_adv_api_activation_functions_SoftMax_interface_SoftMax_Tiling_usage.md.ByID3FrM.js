import{_ as a,o as i,a as n,b as e}from"./app.C41L12d5.js";const S=JSON.parse('{"title":"","description":"","frontmatter":{"breadcrumbs":[{"text":"Ascend C API","link":"/api/api_list"},{"text":"SIMD API","link":"/api/SIMD-API/SIMD-API"},{"text":"高阶API","link":"/api/SIMD-API/adv_api/adv_api"},{"text":"激活函数","link":"/api/SIMD-API/adv_api/activation_functions/activation_functions"},{"text":"SoftMax接口","link":"/api/SIMD-API/adv_api/activation_functions/SoftMax_interface/SoftMax_interface"},{"text":"SoftMax Tiling使用说明","link":"/api/SIMD-API/adv_api/activation_functions/SoftMax_interface/SoftMax_Tiling_usage"}]},"headers":[],"relativePath":"api/SIMD-API/adv_api/activation_functions/SoftMax_interface/SoftMax_Tiling_usage.md","filePath":"api/SIMD-API/adv_api/activation_functions/SoftMax_interface/SoftMax_Tiling_usage.md","outlineHeaders":[{"level":2,"title":"调用示例","slug":"调用示例","link":"#调用示例"}],"lastUpdated":1787050286000}'),l={name:"api/SIMD-API/adv_api/activation_functions/SoftMax_interface/SoftMax_Tiling_usage.md"};function o(s,t,c,p,_,g){return i(),n("div",null,[...t[0]||(t[0]=[e(`<div><article class="markdown-body"><h1>SoftMax Tiling使用说明</h1><p>Ascend C提供一组SoftMax Tiling API，方便用户获取SoftMax kernel计算时所需的Tiling参数。</p><p>获取Tiling参数主要分为如下两步：</p><ol><li><p>获取SoftMax接口计算所需最小和最大临时空间大小，注意该步骤不是必须的，只是作为一个参考，供合理分配计算空间。</p></li><li><p>获取输入SoftMax kernel侧接口所需tiling参数，需要传入<a href="../../data_structures/TensorShape.html">AscendC::TensorShape</a>类型的输入shape、剩余的可供softmax接口计算的空间大小和计算的数据类型大小。</p><p>SoftMax Tiling结构体的定义如下，开发者无需关注该tiling结构的具体信息，只需要传递到kernel侧，传入SoftMax高阶API接口，直接进行使用即可。</p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>struct SoftMaxTiling {
    uint32_t srcM = 0;
    uint32_t srcK = 0;
    uint32_t srcSize = 0;
    uint32_t outMaxM = 0;
    uint32_t outMaxK = 0;
    uint32_t outMaxSize = 0;
    uint32_t splitM = 0;
    uint32_t splitK = 0;
    uint32_t splitSize = 0;
    uint32_t reduceM = 0;
    uint32_t reduceK = 0;
    uint32_t reduceSize = 0;
    uint32_t rangeM = 0;
    uint32_t tailM = 0;
    uint32_t tailSplitSize = 0;
    uint32_t tailReduceSize = 0;
};
</code></pre></div></li></ol><p>对于SoftMax/SimpleSoftMax请参考<a href="SoftMax-SimpleSoftMax-Tiling.html">SoftMax/SimpleSoftMax Tiling</a>；</p><p>对于SoftmaxFlash请参考<a href="SoftmaxFlash_Tiling_interface.html">SoftmaxFlash Tiling接口</a>；</p><p>对于SoftmaxGrad请参考<a href="SoftmaxGrad_Tiling_interface.html">SoftmaxGrad Tiling接口</a>；</p><p>对于SoftmaxFlashV2请参考<a href="SoftmaxFlashV2_Tiling_interface.html">SoftmaxFlashV2 Tiling接口</a>；</p><p>判断SoftMaxTiling是否为基本块Tiling请参考<a href="IsBasicBlockInSoftMax.html">IsBasicBlockInSoftMax</a>。</p><h2 id="调用示例">调用示例<a class="header-anchor" href="#调用示例">​</a></h2><p>如下样例介绍了使用SoftMax高阶API时host侧获取Tiling参数的流程以及该参数如何在kernel侧使用。样例中输入Tensor的shape大小为[320,64]，输入的数据类型为half。</p><ol><li><p>将SoftMaxTiling结构体参数增加至TilingData结构体，作为TilingData结构体的一个字段。</p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>BEGIN_TILING_DATA_DEF(TilingData)               // 注册一个tiling的类，以tiling的名字作为入参
  TILING_DATA_FIELD_DEF(uint32_t, totalLength); // 添加tiling字段，总计算数据量
  TILING_DATA_FIELD_DEF(uint32_t, tileNum);     // 添加tiling字段，每个核上总计算数据分块个数
  ...                                           // 添加其他tiling字段
  TILING_DATA_FIELD_DEF_STRUCT(SoftMaxTiling, softmaxTilingData); // 将SoftMaxTiling结构体参数增加至TilingData结构体
END_TILING_DATA_DEF;
</code></pre></div></li><li><p>Tiling实现函数中，首先调用<strong>GetSoftMaxMaxTmpSize/GetSoftMaxMinTmpSize</strong>接口获取SoftMax接口能完成计算所需最大/最小临时空间大小，根据该范围结合实际的内存使用情况设置合适的空间大小；然后根据输入shape、剩余的可供计算的空间大小等信息获取SoftMax kernel侧接口所需tiling参数。</p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>namespace optiling {
const uint32_t NUM_BLOCKS = 8;
const uint32_t TILE_NUM = 8;
static ge::graphStatus TilingFunc(gert::TilingContext* context)
{
    TilingData tiling;
    uint32_t totalLength = context-&gt;GetInputTensor(0)-&gt;GetShapeSize();
    context-&gt;SetSimdNumBlocks(NUM_BLOCKS);
    tiling.set_totalLength(totalLength);
    tiling.set_tileNum(TILE_NUM);
    // 设置其他Tiling参数
    ...
    std::vector&lt;int64_t&gt; shapeVec = {320,64};
    AscendC::TensorShape srcShape(shapeVec);
    // 本样例中仅作为样例说明，通过GetSoftMaxMinTmpSize获取最小值并传入，来保证功能正确，开发者可以根据需要传入合适的空间大小
    const uint32_t localWorkSpaceSize = AscendC::GetSoftMaxMinTmpSize(srcShape, sizeof(half), false);
    // 获取SoftMax Tiling参数
    AscendC::SoftMaxTilingFunc(srcShape, sizeof(half), localWorkSpaceSize, tiling.softmaxTilingData);
     ... // 其他逻辑
    tiling.SaveToBuffer(context-&gt;GetRawTilingData()-&gt;GetData(), context-&gt;GetRawTilingData()-&gt;GetCapacity());
    context-&gt;GetRawTilingData()-&gt;SetDataSize(tiling.GetDataSize());
    context-&gt;SetTilingKey(1);
    return ge::GRAPH_SUCCESS;
}
} // namespace optiling
</code></pre></div></li><li><p>对应的kernel侧通过在核函数（Kernel）中调用GET_TILING_DATA获取TilingData，继而将TilingData中的SoftMax Tiling信息传入SoftMax接口参与计算。完整的kernel侧样例请参考<a href="SoftMax.html#%E8%B0%83%E7%94%A8%E7%A4%BA%E4%BE%8B">调用示例</a>。</p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>extern &quot;C&quot; __global__ __aicore__ void func_custom(GM_ADDR x, GM_ADDR y, GM_ADDR z, GM_ADDR workspace, GM_ADDR tiling)
{
    GET_TILING_DATA(tilingData, tiling);
    KernelFunc op;
    op.Init(x, y, z, tilingData.totalLength, tilingData.tileNum,tilingData.SoftMaxTiling);
    if (TILING_KEY_IS(1)) {
        op.Process();
    }
}
</code></pre></div></li></ol></article></div>`,1)])])}const f=a(l,[["render",o]]);export{S as __pageData,f as default};
