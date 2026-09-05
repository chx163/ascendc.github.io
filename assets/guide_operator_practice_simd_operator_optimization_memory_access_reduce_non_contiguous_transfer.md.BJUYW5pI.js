import{_ as s,o as n,a as p,b as o}from"./app.C41L12d5.js";const c="/ascendc.github.io/assets/copy_opt.WynA3fZF.png",t="/ascendc.github.io/assets/dcpad_api.Ctq0YTJ4.png",l="/ascendc.github.io/assets/loop_copy.BcBb5V-t.png",d="/ascendc.github.io/assets/copy_data.BEm9EXEo.png",e="/ascendc.github.io/assets/dcpad_copy.Csqa_CPg.png",i="/ascendc.github.io/assets/copy_data_56.Cc0AAtcR.png",u=JSON.parse('{"title":"","description":"","frontmatter":{"breadcrumbs":[{"text":"Ascend C算子开发指南","link":"/guide/getting_started/ascend_c_overview_and_learning_path"},{"text":"算子实践参考","link":"/guide/operator_practice/document_structure"},{"text":"SIMD算子性能优化","link":"/guide/operator_practice/simd_operator_optimization/simd_operator_optimization"},{"text":"内存访问","link":"/guide/operator_practice/simd_operator_optimization/memory_access/memory_access"},{"text":"非连续搬运场景减少搬运次数","link":"/guide/operator_practice/simd_operator_optimization/memory_access/reduce_non_contiguous_transfer"}]},"headers":[],"relativePath":"guide/operator_practice/simd_operator_optimization/memory_access/reduce_non_contiguous_transfer.md","filePath":"guide/operator_practice/simd_operator_optimization/memory_access/reduce_non_contiguous_transfer.md","outlineHeaders":[{"level":2,"title":"使用Loop模式减少非连续搬运的次数","slug":"使用Loop模式减少非连续搬运的次数","link":"#使用Loop模式减少非连续搬运的次数"},{"level":2,"title":"使用多维数据搬运减少非连续搬运次数","slug":"使用多维数据搬运减少非连续搬运次数","link":"#使用多维数据搬运减少非连续搬运次数"}],"lastUpdated":1786954352000}'),r={name:"guide/operator_practice/simd_operator_optimization/memory_access/reduce_non_contiguous_transfer.md"};function m(C,a,P,g,_,h){return n(),p("div",null,[...a[0]||(a[0]=[o('<div><article class="markdown-body"><h1>非连续搬运场景减少搬运次数<span id="ZH-CN_TOPIC_0000002529778475"></span></h1><p>【优先级】中</p><div class="callout callout-note"><p class="callout-title"><svg class="callout-icon" viewBox="0 0 16 16" width="16" height="16"><path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8Zm8-6.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13ZM6.5 7.75A.75.75 0 0 1 7.25 7h1a.75.75 0 0 1 .75.75v2.75h.25a.75.75 0 0 1 0 1.5h-2a.75.75 0 0 1 0-1.5h.25v-2h-.25a.75.75 0 0 1-.75-.75ZM8 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"></path></svg>说明 该性能优化建议适用于如下产品型号：</p><div data-filter="950"><ul><li>Ascend 950PR/Ascend 950DT</li></ul></div></div><p>在非连续搬运场景可以使用DataCopyPad接口的Loop模式和DataCopy的多维数据搬运接口来减少搬运次数，优化搬运性能。</p><h2 id="使用Loop模式减少非连续搬运的次数">使用Loop模式减少非连续搬运的次数<span id="section191811840221"></span><a class="header-anchor" href="#使用Loop模式减少非连续搬运的次数">​</a></h2><p>【描述】DataCopyPad接口在Normal/Compact模式基础上，可以使用Loop模式搬运二维数据，假设我们希望以下图的方式搬运8个48B大小的数据块：</p><p><img src="'+c+`" alt></p><p>【反例】调用多次搬运接口进行搬运（以DataCopyPad为例）</p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>__aicore__ inline void CopyIn3(){
    AscendC::LocalTensor&lt;T&gt; xLocal = inQueueX.AllocTensor&lt;T&gt;();
    AscendC::Duplicate&lt;T&gt;(xLocal, 0, count);
    AscendC::DataCopyParams dataCopyParams;
    dataCopyParams.blockCount = 2;
    dataCopyParams.blockLen = 48;
    dataCopyParams.srcStride = 0;
    dataCopyParams.dstStride = 0;
    AscendC::DataCopyPadParams dataCopyPadParams;
    dataCopyPadParams.isPad = 0;
    dataCopyPadParams.leftPadding = 0;
    dataCopyPadParams.rightPadding = 0;
    dataCopyPadParams.paddingValue = 0;
    AscendC::DataCopyPad&lt;T, AscendC::PaddingMode::Compact&gt;(xLocal, xGm, dataCopyParams, dataCopyPadParams);
    AscendC::DataCopyPad&lt;T, AscendC::PaddingMode::Compact&gt;(xLocal[32], xGm[24], dataCopyParams, dataCopyPadParams);
    AscendC::DataCopyPad&lt;T, AscendC::PaddingMode::Compact&gt;(xLocal[72], xGm[48], dataCopyParams, dataCopyPadParams);
    AscendC::DataCopyPad&lt;T, AscendC::PaddingMode::Compact&gt;(xLocal[104], xGm[72], dataCopyParams, dataCopyPadParams);
    inQueueX.EnQue&lt;T&gt;(xLocal);
}
</code></pre></div><p><strong>图1</strong> 使用多次DataCopyPad接口进行搬运<span id="fig345313593314"></span><br><img src="`+t+`" alt title="使用多次DataCopyPad接口进行搬运"></p><p>【正例】使用Loop模式进行搬运</p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>__aicore__ inline void CopyIn3(){
    AscendC::LoopModeParams loopModeParams;
    loopModeParams.loop1Size = 2;
    loopModeParams.loop2Size = 2;
    loopModeParams.loop1SrcStride = 96;
    loopModeParams.loop1DstStride = 128;
    loopModeParams.loop2SrcStride = 192;
    loopModeParams.loop2DstStride = 288;
    AscendC::LocalTensor&lt;T&gt; xLocal = inQueueX.AllocTensor&lt;T&gt;();
    AscendC::Duplicate&lt;T&gt;(xLocal, 0, count);
    AscendC::DataCopyParams dataCopyParams;
    dataCopyParams.blockCount = 2;
    dataCopyParams.blockLen = 48;
    dataCopyParams.srcStride = 0;
    dataCopyParams.dstStride = 0;
    AscendC::DataCopyPadParams dataCopyPadParams;
    dataCopyPadParams.isPad = 0;
    dataCopyPadParams.leftPadding = 0;
    dataCopyPadParams.rightPadding = 0;
    dataCopyPadParams.paddingValue = 0;
    AscendC::SetLoopModePara(loopModeParams, AscendC::DataCopyMVType::OUT_TO_UB);
    AscendC::DataCopyPad&lt;T, AscendC::PaddingMode::Compact&gt;(xLocal, xGm, dataCopyParams, dataCopyPadParams);
    AscendC::ResetLoopModePara(AscendC::DataCopyMVType::OUT_TO_UB);
    inQueueX.EnQue&lt;T&gt;(xLocal);
}
</code></pre></div><p><strong>图2</strong> 使用Loop模式进行搬运<span id="fig26533539233"></span><br><img src="`+l+'" alt title="使用Loop模式进行搬运"></p><p>【总结】当数据块之间需要插入不同大小Padding时，使用Loop模式搬运代替多次的DataCopyPad能够减少搬运指令的使用，提升性能。</p><h2 id="使用多维数据搬运减少非连续搬运次数">使用多维数据搬运减少非连续搬运次数<span id="section1229601461213"></span><a class="header-anchor" href="#使用多维数据搬运减少非连续搬运次数">​</a></h2><p>【描述】假设我们希望以下图的方式搬运2个8B大小的数据块：</p><p><strong>图3</strong> 搬运前后数据<span id="fig20466223158"></span><br><img src="'+d+'" alt title="搬运前后数据"></p><p>【反例】使用多次DataCopyPad进行搬运</p><p><strong>图4</strong> 使用多次DataCopyPad进行搬运<span id="fig18188132522410"></span><br><img src="'+e+`" alt title="使用多次DataCopyPad进行搬运"></p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>__aicore__ inline void CopyIn5(){
    AscendC::LocalTensor&lt;T&gt; xLocal = inQueueX.AllocTensor&lt;T&gt;();
    AscendC::Duplicate&lt;T&gt;(xLocal, 0, count);
    AscendC::DataCopyParams dataCopyParams;
    dataCopyParams.blockCount = 1;
    dataCopyParams.blockLen = 8;
    dataCopyParams.srcStride = 0;
    dataCopyParams.dstStride = 0;
    AscendC::DataCopyPadParams dataCopyPadParams;
    dataCopyPadParams.isPad = 1;
    dataCopyPadParams.leftPadding = 5;
    dataCopyPadParams.rightPadding = 1;
    dataCopyPadParams.paddingValue = 0;
    // 第一次搬运
    AscendC::DataCopyPad&lt;T, AscendC::PaddingMode::Normal&gt;(xLocal, xGm, dataCopyParams, dataCopyPadParams);
    dataCopyPadParams.isPad = 1;
    dataCopyPadParams.leftPadding = 1;
    dataCopyPadParams.rightPadding = 5;
    dataCopyPadParams.paddingValue = 0;
    // 第二次搬运
    AscendC::DataCopyPad&lt;T, AscendC::PaddingMode::Normal&gt;(xLocal[8], xGm[2], dataCopyParams, dataCopyPadParams);
    inQueueX.EnQue&lt;T&gt;(xLocal);
}
</code></pre></div><p>【正例】使用多维数据搬运</p><p>DataCopy接口在Ascend 950PR/Ascend 950DT上支持多维数据的搬运，具体可参考<a href="../../../../api/SIMD-API/basic_api/memory_vector_compute/data_move/DataCopy_GMToUB_NDDMA.html">DataCopy（GMToUB多维数据搬运NDDMA）</a>。以2D场景的搬运为例，代码如下：</p><div class="code-block"><div class="code-header"><span class="lang-label">C++</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code><span class="n">__aicore__</span><span class="w"> </span><span class="kr">inline</span><span class="w"> </span><span class="kt">void</span><span class="w"> </span><span class="n">CopyIn6</span><span class="p">(){</span>
<span class="w">    </span><span class="n">AscendC</span><span class="o">::</span><span class="n">LocalTensor</span><span class="o">&lt;</span><span class="n">T</span><span class="o">&gt;</span><span class="w"> </span><span class="n">xLocal</span><span class="w"> </span><span class="o">=</span><span class="w"> </span><span class="n">inQueueX</span><span class="p">.</span><span class="n">AllocTensor</span><span class="o">&lt;</span><span class="n">T</span><span class="o">&gt;</span><span class="p">();</span>
<span class="w">    </span><span class="n">AscendC</span><span class="o">::</span><span class="n">Duplicate</span><span class="o">&lt;</span><span class="n">T</span><span class="o">&gt;</span><span class="p">(</span><span class="n">xLocal</span><span class="p">,</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w"> </span><span class="n">count</span><span class="p">);</span>
<span class="w">    </span><span class="n">AscendC</span><span class="o">::</span><span class="n">NdDmaLoopInfo</span><span class="o">&lt;</span><span class="mi">2</span><span class="o">&gt;</span><span class="w"> </span><span class="n">loopInfo</span><span class="p">{{</span><span class="mi">1</span><span class="p">,</span><span class="w"> </span><span class="mi">2</span><span class="p">},</span><span class="w"> </span><span class="p">{</span><span class="mi">1</span><span class="p">,</span><span class="w"> </span><span class="mi">4</span><span class="p">},</span><span class="w"> </span><span class="p">{</span><span class="mi">2</span><span class="p">,</span><span class="w"> </span><span class="mi">2</span><span class="p">},</span><span class="w"> </span><span class="p">{</span><span class="mi">1</span><span class="p">,</span><span class="w"> </span><span class="mi">1</span><span class="p">},</span><span class="w"> </span><span class="p">{</span><span class="mi">1</span><span class="p">,</span><span class="w"> </span><span class="mi">1</span><span class="p">}};</span>
<span class="w">    </span><span class="n">AscendC</span><span class="o">::</span><span class="n">NdDmaParams</span><span class="o">&lt;</span><span class="n">T</span><span class="p">,</span><span class="w"> </span><span class="mi">2</span><span class="o">&gt;</span><span class="w"> </span><span class="n">params</span><span class="w"> </span><span class="o">=</span><span class="w"> </span><span class="p">{</span><span class="n">loopInfo</span><span class="p">,</span><span class="w"> </span><span class="mi">0</span><span class="p">};</span>
<span class="w">    </span><span class="n">AscendC</span><span class="o">::</span><span class="n">NdDmaDci</span><span class="p">();</span>
<span class="w">    </span><span class="k">static</span><span class="w"> </span><span class="k">constexpr</span><span class="w"> </span><span class="n">AscendC</span><span class="o">::</span><span class="n">NdDmaConfig</span><span class="w"> </span><span class="n">config</span><span class="w"> </span><span class="o">=</span><span class="w"> </span><span class="p">{</span><span class="nb">false</span><span class="p">};</span>
<span class="w">    </span><span class="n">AscendC</span><span class="o">::</span><span class="n">DataCopy</span><span class="o">&lt;</span><span class="n">T</span><span class="p">,</span><span class="w"> </span><span class="mi">2</span><span class="p">,</span><span class="w"> </span><span class="n">config</span><span class="o">&gt;</span><span class="p">(</span><span class="n">xLocal</span><span class="p">,</span><span class="w"> </span><span class="n">xGm</span><span class="p">,</span><span class="w"> </span><span class="n">params</span><span class="p">);</span>
<span class="w">    </span><span class="n">inQueueX</span><span class="p">.</span><span class="n">EnQue</span><span class="o">&lt;</span><span class="n">T</span><span class="o">&gt;</span><span class="p">(</span><span class="n">xLocal</span><span class="p">);</span>
<span class="p">}</span>
</code></pre></div><p><strong>图5</strong> 搬运前后数据<span id="fig284018179396"></span><br><img src="`+i+'" alt title="搬运前后数据-56"></p><p>【总结】使用多维数据搬运在部分场景下能够减少搬运指令的条数，从而提升性能。</p></article></div>',1)])])}const v=s(r,[["render",m]]);export{u as __pageData,v as default};
