import{_ as t,o as n,a as i,b as a}from"./app.C41L12d5.js";const _=JSON.parse('{"title":"","description":"","frontmatter":{"breadcrumbs":[{"text":"Ascend C API","link":"/api/api_list"},{"text":"SIMD API","link":"/api/SIMD-API/SIMD-API"},{"text":"高阶API","link":"/api/SIMD-API/adv_api/adv_api"},{"text":"数学计算","link":"/api/SIMD-API/adv_api/math_compute/math_compute"},{"text":"更多样例","link":"/api/SIMD-API/adv_api/math_compute/more_examples"}]},"headers":[],"relativePath":"api/SIMD-API/adv_api/math_compute/more_examples.md","filePath":"api/SIMD-API/adv_api/math_compute/more_examples.md","outlineHeaders":[{"level":2,"title":"样例一","slug":"样例一","link":"#样例一"},{"level":2,"title":"样例二","slug":"样例二","link":"#样例二"},{"level":2,"title":"样例三","slug":"样例三","link":"#样例三"},{"level":2,"title":"样例四","slug":"样例四","link":"#样例四"}],"lastUpdated":1787050286000}'),s={name:"api/SIMD-API/adv_api/math_compute/more_examples.md"};function c(o,e,l,r,p,u){return n(),i("div",null,[...e[0]||(e[0]=[a(`<div><article class="markdown-body"><h1>更多样例</h1><h2 id="样例一">样例一<span id="section5279737173215"></span><a class="header-anchor" href="#样例一">​</a></h2><p>下面的样例展示了数学库kernel侧API和Tiling API GetXxxMaxMinTmpSize的配套使用方法，具体流程如下：</p><p>Host侧调用Tiling接口，获取所需临时空间的大小，并将其写入tiling data中；kernel侧再读取tiling data，获取相应的临时空间大小，并根据此分配临时空间。</p><p>Host侧Tiling API使用<a href="../data_structures/TensorShape.html">AscendC::TensorShape</a>描述输入数据的Tensor形状，使用样例如下：</p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>#include &lt;vector&gt;

#include &quot;register/op_def_registry.h&quot;
#include &quot;register/tilingdata_base.h&quot;
#include &quot;tiling/tiling_api.h&quot;

namespace optiling {

BEGIN_TILING_DATA_DEF(AsinCustomTilingData)
TILING_DATA_FIELD_DEF(uint32_t, srcSize);
TILING_DATA_FIELD_DEF(uint32_t, tmpBufferSize);
END_TILING_DATA_DEF;

static ge::graphStatus TilingFunc(gert::TilingContext* context)
{
    // Input source shapes.
    auto shape_input = context-&gt;GetInputTensor(0)-&gt;GetOriginShape();
    std::vector&lt;int64_t&gt; srcDims = {shape_input.GetDim(0), shape_input.GetDim(1)};
    uint32_t srcSize = 1;
    for (auto dim : srcDims) {
        srcSize *= dim;
    }
    uint32_t typeSize = 2;
    AscendC::TensorShape shape(srcDims);
    uint32_t minValue = 0;
    uint32_t maxValue = 0;
    AscendC::GetAsinMaxMinTmpSize(shape, typeSize, false, maxValue, minValue);

    auto platformInfo = context-&gt;GetPlatformInfo();
    auto ascendcPlatform = platform_ascendc::PlatformAscendC(platformInfo);
    uint64_t tailSize = 0; // ub剩余空间大小
    ascendcPlatform.GetCoreMemSize(
        platform_ascendc::CoreMemType::UB,
        tailSize); // 本样例中使用完整的ub空间，实际情况下tailSize需要减掉用户已使用的ub空间
    auto tmpSize = tailSize &gt;= maxValue ? maxValue : tailSize;

    AsinCustomTilingData tiling;
    tiling.set_srcSize(srcSize);
    tiling.set_tmpBufferSize(tmpSize);
    context-&gt;SetSimdNumBlocks(1);
    tiling.SaveToBuffer(context-&gt;GetRawTilingData()-&gt;GetData(), context-&gt;GetRawTilingData()-&gt;GetCapacity());
    context-&gt;GetRawTilingData()-&gt;SetDataSize(tiling.GetDataSize());
    context-&gt;SetTilingKey(1);

    return ge::GRAPH_SUCCESS;
}
} // namespace optiling
</code></pre></div><p>kernel侧读取tiling data，获取相应的临时空间大小，并根据此分配临时空间：</p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>#include &quot;kernel_operator.h&quot;

template &lt;typename srcType&gt;
class KernelAsin {
public:
    __aicore__ inline KernelAsin() {}
    __aicore__ inline void Init(GM_ADDR srcGm, GM_ADDR dstGm, uint32_t srcSize, uint32_t tmpBufferSize)
    {
        srcGlobal.SetGlobalBuffer(reinterpret_cast&lt;__gm__ srcType*&gt;(srcGm), srcSize);
        dstGlobal.SetGlobalBuffer(reinterpret_cast&lt;__gm__ srcType*&gt;(dstGm), srcSize);

        pipe.InitBuffer(inQueue, 1, srcSize * sizeof(srcType));
        pipe.InitBuffer(outQueue, 1, srcSize * sizeof(srcType));
        pipe.InitBuffer(tmpBuf, tmpBufferSize);
        bufferSize = srcSize;
    }
    __aicore__ inline void Process()
    {
        CopyIn();
        Compute();
        CopyOut();
    }

private:
    __aicore__ inline void CopyIn()
    {
        AscendC::LocalTensor&lt;srcType&gt; srcLocal = inQueue.AllocTensor&lt;srcType&gt;();
        AscendC::DataCopy(srcLocal, srcGlobal, bufferSize);
        inQueue.EnQue(srcLocal);
    }
    __aicore__ inline void Compute()
    {
        AscendC::LocalTensor&lt;srcType&gt; dstLocal = outQueue.AllocTensor&lt;srcType&gt;();

        AscendC::LocalTensor&lt;srcType&gt; srcLocal = inQueue.DeQue&lt;srcType&gt;();
        AscendC::LocalTensor&lt;uint8_t&gt; sharedTmpBuffer = tmpBuf.Get&lt;uint8_t&gt;();
        AscendC::Asin&lt;srcType, false&gt;(dstLocal, srcLocal, sharedTmpBuffer, bufferSize);

        outQueue.EnQue&lt;srcType&gt;(dstLocal);
        inQueue.FreeTensor(srcLocal);
    }
    __aicore__ inline void CopyOut()
    {
        AscendC::LocalTensor&lt;srcType&gt; dstLocal = outQueue.DeQue&lt;srcType&gt;();
        AscendC::DataCopy(dstGlobal, dstLocal, bufferSize);
        outQueue.FreeTensor(dstLocal);
    }

private:
    AscendC::GlobalTensor&lt;srcType&gt; srcGlobal;
    AscendC::GlobalTensor&lt;srcType&gt; dstGlobal;

    AscendC::TPipe pipe;
    AscendC::TQue&lt;AscendC::TPosition::VECIN, 1&gt; inQueue;
    AscendC::TBuf&lt;AscendC::TPosition::VECCALC&gt; tmpBuf;
    AscendC::TQue&lt;AscendC::TPosition::VECOUT, 1&gt; outQueue;
    uint32_t bufferSize = 0;
};

extern &quot;C&quot; __global__ __aicore__ void asin_custom(GM_ADDR srcGm, GM_ADDR dstGm, GM_ADDR workspace, GM_ADDR tiling)
{
    GET_TILING_DATA(tilingData, tiling);
    KernelAsin&lt;half&gt; op;
    op.Init(srcGm, dstGm, tilingData.srcSize, tilingData.tmpBufferSize);
    if (TILING_KEY_IS(1)) {
        op.Process();
    }
}
</code></pre></div><h2 id="样例二">样例二<span id="section577043422516"></span><a class="header-anchor" href="#样例二">​</a></h2><p>下面的样例展示了数学库核函数（Kernel）侧API和<a href="../../../Utils-API/platform_info/PlatformAscendC/ReserveLocalMemory.html">PlatformAscendC::ReserveLocalMemory</a>的配合使用方法，流程如下：</p><p>Host侧调用ReserveLocalMemory接口预留Unified Buffer（UB）内存空间，并通过GetCoreMemSize接口获取实际可用的UB内存大小。基于实际可用的内存大小计算能够支持的最大Shape（最大数据规模）。这种方式可以避免多次调用GetXXXTmpMaxMinSize接口来获取合适的临时空间大小。</p><p>Host侧Tiling API使用样例：</p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>#include &lt;vector&gt;

#include &quot;register/op_def_registry.h&quot;
#include &quot;register/tilingdata_base.h&quot;
#include &quot;tiling/tiling_api.h&quot;

namespace optiling {

BEGIN_TILING_DATA_DEF(MathCustomTilingData)
TILING_DATA_FIELD_DEF(uint32_t, calSize);
END_TILING_DATA_DEF;

static ge::graphStatus TilingFunc(gert::TilingContext* context)
{
    auto platformInfo = context-&gt;GetPlatformInfo();
    auto ascendcPlatform = platform_ascendc::PlatformAscendC(platformInfo);
    uint64_t tailSize = 0; // UB剩余空间大小
    ascendcPlatform.ReserveLocalMemory(platform_ascendc::ReservedSize::RESERVED_SIZE_8K);
    ascendcPlatform.GetCoreMemSize(platform_ascendc::CoreMemType::UB, tailSize);

    uint64_t calSize = tailSize / (3 * 4); // src + dst + tmp float type
    MathCustomTilingData tiling;
    tiling.set_calSize(calSize);
    context-&gt;SetSimdNumBlocks(1);
    tiling.SaveToBuffer(context-&gt;GetRawTilingData()-&gt;GetData(), context-&gt;GetRawTilingData()-&gt;GetCapacity());
    context-&gt;GetRawTilingData()-&gt;SetDataSize(tiling.GetDataSize());
    context-&gt;SetTilingKey(1);
    return ge::GRAPH_SUCCESS;
}
} // namespace optiling
</code></pre></div><p>核函数（Kernel）侧通过读取TilingData，获取相应的计算规模参数。随后，核函数（Kernel）调用数学库提供的不带临时空间的API，执行多种数学运算：</p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>#include &quot;kernel_operator.h&quot;

template &lt;typename srcType&gt;
class KernelMath {
public:
    __aicore__ inline KernelMath() {}
    __aicore__ inline void Init(GM_ADDR srcGm, GM_ADDR dstGm, uint32_t srcSize)
    {
        srcGlobal.SetGlobalBuffer(reinterpret_cast&lt;__gm__ srcType*&gt;(srcGm), srcSize);
        dstGlobal.SetGlobalBuffer(reinterpret_cast&lt;__gm__ srcType*&gt;(dstGm), srcSize);

        pipe.InitBuffer(inQueue, 1, srcSize * sizeof(srcType));
        pipe.InitBuffer(outQueue, 1, srcSize * sizeof(srcType));
        pipe.InitBuffer(tmpBuf, srcSize * sizeof(srcType));
        bufferSize = srcSize;
    }
    __aicore__ inline void Process()
    {
        CopyIn();
        Compute();
        CopyOut();
    }

private:
    __aicore__ inline void CopyIn()
    {
        AscendC::LocalTensor&lt;srcType&gt; srcLocal = inQueue.AllocTensor&lt;srcType&gt;();
        AscendC::DataCopy(srcLocal, srcGlobal, bufferSize);
        inQueue.EnQue(srcLocal);
    }
    __aicore__ inline void Compute()
    {
        AscendC::LocalTensor&lt;srcType&gt; dstLocal = outQueue.AllocTensor&lt;srcType&gt;();

        AscendC::LocalTensor&lt;srcType&gt; srcLocal = inQueue.DeQue&lt;srcType&gt;();
        AscendC::LocalTensor&lt;srcType&gt; tmp = tmpBuf.Get&lt;srcType&gt;();
        AscendC::Asin&lt;srcType, false&gt;(tmp, srcLocal, bufferSize);
        AscendC::PipeBarrier&lt;PIPE_V&gt;();
        AscendC::Sin&lt;srcType, false&gt;(dstLocal, tmp, bufferSize);

        outQueue.EnQue&lt;srcType&gt;(dstLocal);
        inQueue.FreeTensor(srcLocal);
    }
    __aicore__ inline void CopyOut()
    {
        AscendC::LocalTensor&lt;srcType&gt; dstLocal = outQueue.DeQue&lt;srcType&gt;();
        AscendC::DataCopy(dstGlobal, dstLocal, bufferSize);
        outQueue.FreeTensor(dstLocal);
    }

private:
    AscendC::GlobalTensor&lt;srcType&gt; srcGlobal;
    AscendC::GlobalTensor&lt;srcType&gt; dstGlobal;

    AscendC::TPipe pipe;
    AscendC::TQue&lt;AscendC::TPosition::VECIN, 1&gt; inQueue;
    AscendC::TBuf&lt;AscendC::TPosition::VECCALC&gt; tmpBuf;
    AscendC::TQue&lt;AscendC::TPosition::VECOUT, 1&gt; outQueue;
    uint32_t bufferSize = 0;
};

extern &quot;C&quot; __global__ __aicore__ void math_custom(GM_ADDR srcGm, GM_ADDR dstGm, GM_ADDR workspace, GM_ADDR tiling)
{
    GET_TILING_DATA(tilingData, tiling);
    KernelMath&lt;float&gt; op;
    op.Init(srcGm, dstGm, tilingData.calSize);
    if (TILING_KEY_IS(1)) {
        op.Process();
    }
}
</code></pre></div><h2 id="样例三">样例三<span id="section488747123318"></span><a class="header-anchor" href="#样例三">​</a></h2><p>下面的样例展示了数学库kernel侧API和Tiling API GetXxxTmpBufferFactorSize的配套使用方法，具体流程如下：</p><p>Host侧调用Tiling接口，获取maxLiveNodeCount和extraBuf，并推算算子单次最大计算元素数量，将其写入tiling data中；kernel侧再读取tiling data，获取该值，基于该值分配临时空间。</p><p>Host侧Tiling API使用样例:</p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>#include &lt;vector&gt;
#include &lt;cassert&gt;
#include &quot;register/op_def_registry.h&quot;
#include &quot;register/tilingdata_base.h&quot;
#include &quot;tiling/tiling_api.h&quot;

namespace optiling {
BEGIN_TILING_DATA_DEF(AsinCustomTilingData)
TILING_DATA_FIELD_DEF(uint32_t, srcSize);
TILING_DATA_FIELD_DEF(uint32_t, tmpBufferSize);
END_TILING_DATA_DEF;

static ge::graphStatus TilingFunc(gert::TilingContext* context)
{
    // Input source shapes.
    auto shape_input = context-&gt;GetInputTensor(0)-&gt;GetOriginShape();
    std::vector&lt;int64_t&gt; srcDims = {shape_input.GetDim(0), shape_input.GetDim(1)};
    uint32_t srcSize = 1;
    uint32_t srcCurSize = 1;
    for (auto dim : srcDims) {
        srcSize *= dim;
    }
    uint32_t typeSize = 2;

    auto platformInfo = context-&gt;GetPlatformInfo();
    auto ascendcPlatform = platform_ascendc::PlatformAscendC(platformInfo);
    uint64_t tailSize = 0; // ub剩余空间大小
    ascendcPlatform.GetCoreMemSize(platform_ascendc::CoreMemType::UB, tailSize);

    uint32_t asinMaxLiveNodeCount = 0;
    uint32_t asinExtraBuf = 0;

    uint32_t acosMaxLiveNodeCount = 0;
    uint32_t acosExtraBuf = 0;

    AscendC::GetAsinTmpBufferFactorSize(typeSize, asinMaxLiveNodeCount, asinExtraBuf);
    AscendC::GetAcosTmpBufferFactorSize(typeSize, acosMaxLiveNodeCount, acosExtraBuf);
    // tmp的大小需要减去UB上调用api接口输入和输出占用的大小
    // 该示例中包括Asin接口的输入输出，以及Acos的输入输出，其中Asin接口的输出作为Acos的输入，因此一共需要3份src的空间大小
    auto tmpSize = tailSize - srcSize * typeSize * 3;
    assert(tmpSize &gt;= asinExtraBuf);
    assert(tmpSize &gt;= acosExtraBuf);
    // 计算Asin算子单次最大计算元素数量
    if (asinMaxLiveNodeCount != 0) {
        srcAsinCurSize = (tmpSize - asinExtraBuf) / asinMaxLiveNodeCount / typeSize;
    } else {
        srcAsinCurSize = srcSize;
    }
    // 计算Acos算子单次最大计算元素数量
    if (acosMaxLiveNodeCount != 0) {
        srcAcosCurSize = (tmpSize - acosExtraBuf) / acosMaxLiveNodeCount / typeSize;
    } else {
        srcAcosCurSize = srcSize;
    }
    srcCurSize = std::min(srcAsinCurSize, srcAcosCurSize);

    AsinCustomTilingData tiling;
    tiling.set_srcSize(srcSize);
    tiling.set_srcCurSize(srcCurSize);
    tiling.set_tmpBufferSize(tmpSize);
    context-&gt;SetSimdNumBlocks(1);
    tiling.SaveToBuffer(context-&gt;GetRawTilingData()-&gt;GetData(), context-&gt;GetRawTilingData()-&gt;GetCapacity());
    context-&gt;GetRawTilingData()-&gt;SetDataSize(tiling.GetDataSize());
    context-&gt;SetTilingKey(1);

    return ge::GRAPH_SUCCESS;
}
} // namespace optiling
</code></pre></div><p>kernel侧样例:</p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>#include &quot;kernel_operator.h&quot;
template &lt;typename srcType&gt;
class KernelAsin {
public:
    __aicore__ inline KernelAsin() {}
    __aicore__ inline void Init(
        GM_ADDR srcGm, GM_ADDR dstGm, uint32_t srcSizeIn, uint32_t srcCurSizeIn, uint32_t tmpBufferSize)
    {
        srcSize = srcSizeIn;
        srcCurSize = srcCurSizeIn;
        srcGlobal.SetGlobalBuffer(reinterpret_cast&lt;__gm__ srcType*&gt;(srcGm), srcSize);
        dstGlobal.SetGlobalBuffer(reinterpret_cast&lt;__gm__ srcType*&gt;(dstGm), srcSize);

        pipe.InitBuffer(inQueue, 1, srcSize * sizeof(srcType));
        pipe.InitBuffer(outQueue, 1, srcSize * sizeof(srcType));
        pipe.InitBuffer(tmpBuf1, 1, srcCurSize * sizeof(srcType));
        pipe.InitBuffer(tmpBuf, 1, tmpBufferSize);
    }
    __aicore__ inline void Process()
    {
        CopyIn();
        Compute();
        CopyOut();
    }

private:
    __aicore__ inline void CopyIn()
    {
        AscendC::LocalTensor&lt;srcType&gt; srcLocal = inQueue.AllocTensor&lt;srcType&gt;();
        AscendC::DataCopy(srcLocal, srcGlobal, srcSize);
        inQueue.EnQue(srcLocal);
    }
    __aicore__ inline void Compute()
    {
        AscendC::LocalTensor&lt;srcType&gt; dstLocal = outQueue.AllocTensor&lt;srcType&gt;();
        AscendC::LocalTensor&lt;srcType&gt; srcLocal = inQueue.DeQue&lt;srcType&gt;();
        AscendC::LocalTensor&lt;uint8_t&gt; sharedTmpBuffer = tmpBuf.Get&lt;uint8_t&gt;();
        AscendC::LocalTensor&lt;srcType&gt; tmpresBuffer = tmpBuf1.Get&lt;srcType&gt;();

        for (int32_t offset = 0; offset &lt; srcSize; offset += srcCurSize) {
            AscendC::Asin&lt;srcType, false&gt;(tmpresBuffer, srcLocal[offset], sharedTmpBuffer, srcCurSize);
            AscendC::PipeBarrier&lt;PIPE_V&gt;();
            AscendC::Acos&lt;srcType, false&gt;(dstLocal[offset], tmpresBuffer, sharedTmpBuffer, srcCurSize);
            AscendC::PipeBarrier&lt;PIPE_V&gt;();
        }
        outQueue.EnQue&lt;srcType&gt;(dstLocal);
        inQueue.FreeTensor(srcLocal);
    }
    __aicore__ inline void CopyOut()
    {
        AscendC::LocalTensor&lt;srcType&gt; dstLocal = outQueue.DeQue&lt;srcType&gt;();
        AscendC::DataCopy(dstGlobal, dstLocal, srcSize);
        outQueue.FreeTensor(dstLocal);
    }

private:
    AscendC::GlobalTensor&lt;srcType&gt; srcGlobal;
    AscendC::GlobalTensor&lt;srcType&gt; dstGlobal;

    AscendC::TPipe pipe;
    AscendC::TQue&lt;AscendC::TPosition::VECIN, 1&gt; inQueue;
    AscendC::TBuf&lt;AscendC::TPosition::VECCALC, 1&gt; tmpBuf;
    AscendC::TBuf&lt;AscendC::TPosition::VECCALC, 1&gt; tmpBuf1;
    AscendC::TQue&lt;AscendC::TPosition::VECOUT, 1&gt; outQueue;
    uint32_t srcSize, srcCurSize;
};

extern &quot;C&quot; __global__ __aicore__ void kernel_asin_operator(
    GM_ADDR srcGm, GM_ADDR dstGm, GM_ADDR workspace, GM_ADDR tiling)
{
    GET_TILING_DATA(tilingData, tiling);
    KernelAsin&lt;half&gt; op;
    op.Init(srcGm, dstGm, tilingData.srcSize, tilingData.srcCurSize, tilingData.tmpBufferSize);
    if (TILING_KEY_IS(1)) {
        op.Process();
    }
}
</code></pre></div><h2 id="样例四">样例四<span id="section639165323915"></span><a class="header-anchor" href="#样例四">​</a></h2><p>下面以<a href="Exp_interface/Exp_interface.html">Exp</a>接口的关键调用代码为例，辅以调用前后数据打印结果，展示模板参数isReuseSource的使用及其相关影响。</p><p>模板参数isReuseSource为bool类型；若isReuseSource为false，则接口内部计算时不复用源操作数的内存空间；若isReuseSource为true，接口内部计算时会复用源操作数的内存空间，存放一些中间结果，节省内存空间，开发者需要注意接口执行完成后，源操作数的内存空间不再是原始值。</p><ul><li><p>isReuseSource = false</p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>// 调用Exp前dstLocal、srcLocal数值
// dstLocal: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
// srcLocal: [-7.5, -6.5, -5.5, -4.5, -3.5, -2.5, -1.5, -0.5, 0.5, 1.5, 2.5, 3.5, 4.5, 5.5, 6.5, 7.5]

AscendC::Exp&lt;float, 15, false&gt;(dstLocal, srcLocal, 16);

// 调用Exp后dstLocal、srcLocal数值
// dstLocal: [0.000553084, 0.00150344, 0.00408677, 0.011109, 0.0301974, 0.082085, 0.22313,
// 0.606531, 1.64872, 4.48169, 12.1825, 33.1155, 90.0171, 244.692, 665.142, 1808.04] srcLocal: [-7.5, -6.5, -5.5, -4.5,
// -3.5, -2.5, -1.5, -0.5, 0.5, 1.5, 2.5, 3.5, 4.5, 5.5, 6.5, 7.5]
</code></pre></div></li><li><p>isReuseSource = true</p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>// 调用Exp前dstLocal、srcLocal数值
// dstLocal: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
// srcLocal: [-7.5, -6.5, -5.5, -4.5, -3.5, -2.5, -1.5, -0.5, 0.5, 1.5, 2.5, 3.5, 4.5, 5.5, 6.5, 7.5]

AscendC::Exp&lt;float, 15, true&gt;(dstLocal, srcLocal, 16);

// 调用Exp后dstLocal、srcLocal数值
// dstLocal: [0.000553084, 0.00150344, 0.00408677, 0.011109, 0.0301974, 0.082085, 0.22313,
// 0.606531, 1.64872, 4.48169, 12.1825, 33.1155, 90.0171, 244.692, 665.142, 1808.04] srcLocal: [0.5, 0.5, 0.5, 0.5, 0.5,
// 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5]
</code></pre></div></li></ul></article></div>`,1)])])}const g=t(s,[["render",c]]);export{_ as __pageData,g as default};
