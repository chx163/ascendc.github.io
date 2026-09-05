import{_ as n,o as a,a as o,b as l}from"./app.C41L12d5.js";const s="/ascendc.github.io/assets/tensor_inplace.sIdk1qwk.png",g=JSON.parse('{"title":"","description":"","frontmatter":{"breadcrumbs":[{"text":"Ascend C算子开发指南","link":"/guide/getting_started/ascend_c_overview_and_learning_path"},{"text":"编程指南","link":"/guide/programming_guide/document_structure"},{"text":"附录","link":"/guide/programming_guide/appendix/show_kernel_debug_data_tool"},{"text":"常用操作","link":"/guide/programming_guide/appendix/common_operations/develop_dynamic_input_operator"},{"text":"如何使用Tensor原地操作提升算子性能","link":"/guide/programming_guide/appendix/common_operations/tensor_inplace_performance"}]},"headers":[],"relativePath":"guide/programming_guide/appendix/common_operations/tensor_inplace_performance.md","filePath":"guide/programming_guide/appendix/common_operations/tensor_inplace_performance.md","outlineHeaders":[{"level":2,"title":"Tensor原地操作的优势","slug":"Tensor原地操作的优势","link":"#Tensor原地操作的优势"},{"level":2,"title":"保留EnQue和DeQue的原因","slug":"保留EnQue和DeQue的原因","link":"#保留EnQue和DeQue的原因"},{"level":2,"title":"适用场景","slug":"适用场景","link":"#适用场景"},{"level":2,"title":"使用方法","slug":"使用方法","link":"#使用方法"},{"level":2,"title":"示例代码","slug":"示例代码","link":"#示例代码"}],"lastUpdated":1786949923000}'),r={name:"guide/programming_guide/appendix/common_operations/tensor_inplace_performance.md"};function i(t,e,c,_,u,p){return a(),o("div",null,[...e[0]||(e[0]=[l('<div><article class="markdown-body"><h1>如何使用Tensor原地操作提升算子性能<span id="ZH-CN_TOPIC_0000002306575778"></span></h1><p>Tensor原地操作（inplace接口）是一种优化技术，全局申请、保留LocalTensor内存，避免了频繁创建和销毁LocalTensor对象。AllocTensor、FreeTensor、EnQue、DeQue接口不产生新的LocalTensor，而是在该全局LocalTensor上反复申请、释放、入队、出队。其实现原理如下图所示：</p><p><strong>图1</strong> Tensor原地操作实现原理<span id="fig1745165317496"></span><br><img src="'+s+`" alt title="Tensor原地操作实现原理"></p><h2 id="Tensor原地操作的优势">Tensor原地操作的优势<span id="section2372753133511"></span><a class="header-anchor" href="#Tensor原地操作的优势">​</a></h2><ul><li><strong>减少栈变换</strong>：相比构造新Tensor的方式，inplace接口减少了LocalTensor的栈变换，允许Tensor被反复使用。</li><li><strong>减少入队/出队操作</strong>：在调用EnQue、DeQue的过程中，TQue对象没有存储该Tensor对应的Buffer地址，实际没有真正入队、出队，减少了反复入队、出队的Scalar指令。</li></ul><h2 id="保留EnQue和DeQue的原因">保留EnQue和DeQue的原因<span id="section478518577365"></span><a class="header-anchor" href="#保留EnQue和DeQue的原因">​</a></h2><p>既然Tensor原地操作没有执行真正的入队出队操作，为什么还需要保留EnQue和DeQue接口呢？</p><ul><li><strong>编程兼容性</strong>：为了保持编程接口的一致性，inplace接口仍然需要调用EnQue和DeQue，确保代码结构的统一性和可维护性。</li><li><strong>内存同步功能</strong>：EnQue和DeQue操作中实现了内存读写同步功能，确保数据的一致性和正确性，即使没有实际的队列操作，这些同步机制仍然需要保留。</li></ul><h2 id="适用场景">适用场景<span id="section25468123914"></span><a class="header-anchor" href="#适用场景">​</a></h2><p><strong>适合计算循环次数多的场景</strong>：如<a href="#fig1745165317496">图1</a>所示，inplace接口虽然增加了TQue对象InitBuffer的初始化开销，但显著减少了每次循环中AllocTensor、EnQue、DeQue和FreeTensor内部对LocalTensor和事件的操作次数，特别适合需要多次循环来完成计算的场景。</p><h2 id="使用方法">使用方法<span id="section131515408412"></span><a class="header-anchor" href="#使用方法">​</a></h2><ul><li><strong>配置TQue对象</strong>：在创建TQue对象时，设置深度（depth）为0，启用inplace操作模式。</li><li><strong>调用原地操作接口</strong>：使用inplace接口直接操作LocalTensor。 <ul><li><a href="../../../../api/SIMD-API/basic_api/resource_management/TQue/AllocTensor.html">AllocTensor</a>和<a href="../../../../api/SIMD-API/basic_api/resource_management/TQue/DeQue.html">DeQue</a>区分non-inplace和inplace接口，详情请参考<a href="../../../../api/SIMD-API/basic_api/resource_management/TQue/AllocTensor.html">AllocTensor</a>、<a href="../../../../api/SIMD-API/basic_api/resource_management/TQue/DeQue.html">DeQue</a>。</li><li>FreeTensor和EnQue不区分non-inplace和inplace接口。</li></ul></li></ul><h2 id="示例代码">示例代码<span id="section729517189461"></span><a class="header-anchor" href="#示例代码">​</a></h2><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>// ...
namespace AscendC {
class MyKernel {
public:
    __aicore__ inline MyKernel() {}
    __aicore__ inline void Init(__gm__ uint8_t* src0Gm, __gm__ uint8_t* src1Gm, __gm__ uint8_t* dstGm)
    {
        src0Global.SetGlobalBuffer((__gm__ half*)src0Gm);
        src1Global.SetGlobalBuffer((__gm__ half*)src1Gm);
        dstGlobal.SetGlobalBuffer((__gm__ half*)dstGm);
        pipe.InitBuffer(srcQue0, 1, BLOCK_SIZE * sizeof(half));
        pipe.InitBuffer(srcQue1, 1, BLOCK_SIZE * sizeof(half));
        pipe.InitBuffer(dstQue0, 1, BLOCK_SIZE * sizeof(half));
    }

    __aicore__ inline void Process()
    {
        for (int i = 0; i &lt; REPTIMES; i++) {
            CopyIn(i);
            Compute(i);
            CopyOut(i);
        }
    }

private:
    __aicore__ inline void CopyIn(int32_t i)
    {
        srcQue0.AllocTensor&lt;half&gt;(src0Local);
        srcQue1.AllocTensor&lt;half&gt;(src1Local);
        DataCopy(src0Local, src0Global[i*BLOCK_SIZE], BLOCK_SIZE);
        DataCopy(src1Local, src1Global[i*BLOCK_SIZE], BLOCK_SIZE);
        srcQue0.EnQue(src0Local);
        srcQue1.EnQue(src1Local);
    }
    __aicore__ inline void Compute(int32_t i)
    {
        srcQue0.DeQue&lt;half&gt;(src0Local);
        srcQue1.DeQue&lt;half&gt;(src1Local);
        dstQue0.AllocTensor&lt;half&gt;(dstLocal);
        Add(dstLocal, src0Local, src1Local, BLOCK_SIZE);
        dstQue0.EnQue&lt;half&gt;(dstLocal);
        srcQue0.FreeTensor(src0Local);
        srcQue1.FreeTensor(src1Local);
    }
    __aicore__ inline void CopyOut(int32_t i)
    {
        dstQue0.DeQue&lt;half&gt;(dstLocal);
        DataCopy(dstGlobal[i*BLOCK_SIZE], dstLocal, BLOCK_SIZE);
        dstQue0.FreeTensor(dstLocal);
    }

private:
    TPipe pipe;
    TQue&lt;QuePosition::VECIN, 0&gt; srcQue0, srcQue1;
    TQue&lt;QuePosition::VECOUT, 0&gt; dstQue0;
    GlobalTensor&lt;half&gt; src0Global, src1Global, dstGlobal;
    LocalTensor&lt;half&gt; src0Local;
    LocalTensor&lt;half&gt; src1Local;
    LocalTensor&lt;half&gt; dstLocal;
};
} // namespace AscendC

// ...
</code></pre></div></article></div>`,1)])])}const h=n(r,[["render",i]]);export{g as __pageData,h as default};
