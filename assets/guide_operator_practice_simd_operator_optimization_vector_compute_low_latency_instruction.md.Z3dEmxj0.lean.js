import{_ as a,o as c,a as s,c as e,d as t}from"./app.C41L12d5.js";const l="/ascendc.github.io/assets/reduce_best_practice.DvKnHvnW.png",A=JSON.parse('{"title":"","description":"","frontmatter":{"breadcrumbs":[{"text":"Ascend C算子开发指南","link":"/guide/getting_started/ascend_c_overview_and_learning_path"},{"text":"算子实践参考","link":"/guide/operator_practice/document_structure"},{"text":"SIMD算子性能优化","link":"/guide/operator_practice/simd_operator_optimization/simd_operator_optimization"},{"text":"矢量计算","link":"/guide/operator_practice/simd_operator_optimization/vector_compute/vector_compute"},{"text":"选择低延迟指令，优化归约操作性能","link":"/guide/operator_practice/simd_operator_optimization/vector_compute/low_latency_instruction"}]},"headers":[],"relativePath":"guide/operator_practice/simd_operator_optimization/vector_compute/low_latency_instruction.md","filePath":"guide/operator_practice/simd_operator_optimization/vector_compute/low_latency_instruction.md","outlineHeaders":[{"level":2,"title":"二分累加方案和归约类指令方案的对比","slug":"二分累加方案和归约类指令方案的对比","link":"#二分累加方案和归约类指令方案的对比"},{"level":2,"title":"ReduceDataBlock和ReduceRepeat归约方案对比","slug":"ReduceDataBlock和ReduceRepeat归约方案对比","link":"#ReduceDataBlock和ReduceRepeat归约方案对比"}],"lastUpdated":1786954352000}'),d={name:"guide/operator_practice/simd_operator_optimization/vector_compute/low_latency_instruction.md"};function o(i,n,p,r,u,_){return c(),s("div",null,[...n[0]||(n[0]=[e("div",null,[e("article",{class:"markdown-body"},[e("h1",null,[t("选择低延迟指令，优化归约操作性能"),e("span",{id:"ZH-CN_TOPIC_0000002049326341"})]),e("p",null,"【优先级】高"),e("p",null,"【描述】"),e("p",null,"指令执行延迟（Instruction Execution Latency）指的是一条指令从开始执行到完全完成（即所有操作结束，结果可用）所消耗的时间，它直接影响程序的响应速度和实时性。在延迟敏感的场景中，降低指令执行延迟是提升性能的关键。下文以归约操作为例，介绍了几种归约方案的性能对比，便于开发者在使用归约指令时，能够根据具体的数据规模和场景，选择性能更高的方案。"),e("h2",{id:"二分累加方案和归约类指令方案的对比"},[t("二分累加方案和归约类指令方案的对比"),e("span",{id:"section179410573522"}),e("a",{class:"header-anchor",href:"#二分累加方案和归约类指令方案的对比"},"​")]),e("p",null,[t("根据单指令性能测试数据（开发者可以自行测试）分析，ReduceRepeat等归约指令的延迟时间约为Add指令的2-5倍。因此，对于连续数据的归约操作，可以采用Add指令和ReduceRepeat指令的组合，以优化整体性能。该方案简称为"),e("strong",null,"二分累加方案"),t("，具体方案说明如下：")]),e("ul",null,[e("li",null,"二分累加：将数据一分为二，使用Add指令将两部分数据相加；将相加后的结果再次一分为二，继续使用Add指令进行累加，重复此过程。"),e("li",null,"当二分累加后的数据量小于等于256Byte（一条指令一个Repeat的数据操作量），使用ReduceRepeat指令，一次执行得到归约结果。")]),e("p",null,"假设输入数据的数据类型为float，shape为(5, 256)，下图展示了一行数据的执行过程："),e("p",null,[e("strong",null,"图1"),t(" 二分累加方案示意图"),e("span",{id:"fig181871717152010"}),e("br"),e("img",{src:l,alt:"",title:"二分累加方案示意图"})]),e("p",null,"将以上过程，针对每一行，各自执行，得到最终归约结果，即shape为(m, k)的数据，归约完成后，shape为(m, 1)。"),e("p",null,"由于ReduceSum接口是由多种指令组合实现，通常来说，数据量较大，循环次数较多的场景，二分累加方案性能 > ReduceRepeat单指令操作性能 > ReduceSum接口性能。而小数据量或者特殊shape下的场景，需要拆分开来，依据指令执行时间和指令执行数目等条件，具体问题具体分析。"),e("p",null,[t("下文给出了二分累加方案和归约类指令方案的核心代码片段和性能数据对比。完整样例请参考"),e("a",{href:"https://gitcode.com/cann/asc-devkit/tree/master/examples/01_simd_cpp_api/03_basic_api/01_memory_vector_compute/reduce"},"ReduceCustom"),t("。")]),e("p",null,"【性能数据】"),e("p",null,"输入shape为30000，数据类型为float时，如下示例的性能数据对比如下，数据单位为cycle，使用GetSystemCycle接口获取。"),e("p",null,[e("span",{id:"table1240852315316"})]),e("table",null,[e("thead",{align:"left"},[e("tr",{id:"row140811238537"},[e("th",{class:"cellrowborder",valign:"top",width:"50%",id:"mcps1.1.3.1.1"},[e("p",{id:"p12319202885319"},[e("span",{id:"p12319202885319"}),e("span",{id:"p12319202885319"}),t("二分累加方案")])]),e("th",{class:"cellrowborder",valign:"top",width:"50%",id:"mcps1.1.3.1.2"},[e("p",{id:"p1788511331538"},[e("span",{id:"p1788511331538"}),e("span",{id:"p1788511331538"}),t("ReduceRepeat单指令操作")])])])]),e("tbody",null,[e("tr",{id:"row54086232538"},[e("td",{class:"cellrowborder",valign:"top",width:"50%",headers:"mcps1.1.3.1.1 "},[e("p",{id:"p1329224035317"},[e("span",{id:"p1329224035317"}),e("span",{id:"p1329224035317"}),t("172")])]),e("td",{class:"cellrowborder",valign:"top",width:"50%",headers:"mcps1.1.3.1.2 "},[e("p",{id:"p1129116401539"},[e("span",{id:"p1129116401539"}),e("span",{id:"p1129116401539"}),t("242")])])])])]),e("p",null,"【二分累加方案】"),e("div",{class:"code-block"},[e("div",{class:"code-header"},[e("span",{class:"lang-label"},"Text"),e("button",{class:"copy-btn",title:"复制代码"},[e("svg",{width:"16",height:"16",viewBox:"0 0 16 16"},[e("path",{d:"M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"}),e("path",{d:"M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"})])])]),e("pre",{class:"highlight"},[e("code",null,`__aicore__ inline void BinaryReduceSumImpl(const AscendC::LocalTensor<float>& dst, const AscendC::LocalTensor<float>& src, const uint32_t bsLength, const uint32_t hLength)
{
    // src为二维数据，shape为(bsLength, hLength)，dst的shape为(bsLength,1)
    AscendC::BinaryRepeatParams binaryParams;
    AscendC::UnaryRepeatParams unaryParams;
    AscendC::SetMaskCount();
    for (uint32_t i = 0; i < bsLength; i++) {
        AscendC::LocalTensor<float> srcTmp = src[i * hLength];
        AscendC::LocalTensor<float> dstTmp = dst[i * hLength];
        uint32_t totalNum = hLength / 16 * 16;
        uint32_t remaining = hLength - totalNum;
        AscendC::LocalTensor<float> remainingTensor = srcTmp[totalNum];
        while (totalNum > ONE_REPEAT_FLOAT_SIZE) {
            uint32_t halfNum = AscendC::DivCeil(totalNum, 16) * DEFAULT_REP_STRIDE;
            AscendC::SetVectorMask<uint8_t, AscendC::MaskMode::COUNTER>(0, totalNum - halfNum);
            AscendC::Add<float, false>(dstTmp, srcTmp, srcTmp[halfNum], AscendC::MASK_PLACEHOLDER, 1, binaryParams);
            totalNum = halfNum;
            srcTmp = dstTmp;
        }
        if (remaining != 0 && hLength > ONE_REPEAT_FLOAT_SIZE) {
            AscendC::SetVectorMask<uint8_t, AscendC::MaskMode::COUNTER>(0, remaining);
            AscendC::Add<float, false>(dstTmp, dstTmp, remainingTensor, AscendC::MASK_PLACEHOLDER, 1, binaryParams);
        }
        AscendC::SetVectorMask<uint8_t, AscendC::MaskMode::COUNTER>(0, totalNum);
        AscendC::ReduceRepeat<AscendC::ReduceType::SUM, float, float, false>(dstTmp, srcTmp, AscendC::MASK_PLACEHOLDER, 1, DEFAULT_BLK_STRIDE,
            DEFAULT_BLK_STRIDE, DEFAULT_REP_STRIDE);
    }
    AscendC::ResetMask();
    AscendC::SetMaskNorm();
}
`)])]),e("p",null,"【ReduceRepeat单指令操作】"),e("div",{class:"code-block"},[e("div",{class:"code-header"},[e("span",{class:"lang-label"},"Text"),e("button",{class:"copy-btn",title:"复制代码"},[e("svg",{width:"16",height:"16",viewBox:"0 0 16 16"},[e("path",{d:"M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"}),e("path",{d:"M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"})])])]),e("pre",{class:"highlight"},[e("code",null,`__aicore__ inline void ReduceRepeatSumImpl(const AscendC::LocalTensor<float>& dst, const AscendC::LocalTensor<float>& src, const uint32_t bsLength, const uint32_t hLength)
{ 
    // src为二维数据，shape为(bsLength, hLength)，dst的shape为(bsLength,1)
    AscendC::SetMaskCount();
    for (uint32_t i = 0; i < bsLength; i++) {
        uint32_t totalNum = hLength;
        AscendC::LocalTensor<float> srcTmp = src[i * hLength];
        AscendC::LocalTensor<float> dstTmp = dst[i * hLength];
        while (totalNum > 1) {
            AscendC::SetVectorMask<uint8_t, AscendC::MaskMode::COUNTER>(0, totalNum);
            AscendC::ReduceRepeat<AscendC::ReduceType::SUM, float, float, false>(dstTmp, srcTmp, AscendC::MASK_PLACEHOLDER, 1, DEFAULT_BLK_STRIDE,
                DEFAULT_BLK_STRIDE, DEFAULT_REP_STRIDE);
            totalNum = AscendC::DivCeil(totalNum, ONE_REPEAT_FLOAT_SIZE);
            srcTmp = dstTmp;
        }
    }
    AscendC::ResetMask();
    AscendC::SetMaskNorm();
}
`)])]),e("h2",{id:"ReduceDataBlock和ReduceRepeat归约方案对比"},[t("ReduceDataBlock和ReduceRepeat归约方案对比"),e("span",{id:"section18620646762"}),e("a",{class:"header-anchor",href:"#ReduceDataBlock和ReduceRepeat归约方案对比"},"​")]),e("p",null,"进一步测试分析可知，单指令ReduceDataBlock的执行效率优于ReduceRepeat，因此，根据不同的shape，通过不同的指令组合，可以达到更佳的执行性能。"),e("p",null,"例如数据类型为float，shape大小为256的数据，可以通过如下三种方式得到归约结果："),e("ul",null,[e("li",null,"使用两次ReduceRepeat；"),e("li",null,"使用三次ReduceDataBlock；"),e("li",null,"一次ReduceDataBlock操作加一次ReduceRepeat操作。")]),e("p",null,"通过分析单指令性能数据（开发者可以自行测试）可知：一次ReduceDataBlock操作加一次ReduceRepeat操作性能优于两次ReduceRepeat，同时也优于三次ReduceDataBlock的方案。"),e("p",null,[t("下文给出了上面三种方式的核心代码片段和性能数据对比。完整样例请参考"),e("a",{href:"https://gitcode.com/cann/asc-devkit/tree/master/examples/01_simd_cpp_api/03_basic_api/01_memory_vector_compute/reduce"},"ReduceCustom"),t("。")]),e("p",null,"【性能数据】"),e("p",null,"输入shape为256，数据类型为float。如下示例的性能数据如下："),e("p",null,[e("strong",null,"表1"),t(" 两次ReduceRepeat、三次ReduceDataBlock、一次ReduceDataBlock加一次ReduceRepeat，三种归约操作的性能数据（循环100次的时间总和）")]),e("p",null,[e("span",{id:"table174575114592"})]),e("table",null,[e("thead",{align:"left"},[e("tr",{id:"row3758185125915"},[e("th",{class:"cellrowborder",valign:"top",width:"33.33333333333333%",id:"mcps1.2.4.1.1"},[e("p",{id:"p57581151175915"},[e("span",{id:"p57581151175915"}),e("span",{id:"p57581151175915"}),t("两次ReduceRepeat")])]),e("th",{class:"cellrowborder",valign:"top",width:"33.33333333333333%",id:"mcps1.2.4.1.2"},[e("p",{id:"p1960391014012"},[e("span",{id:"p1960391014012"}),e("span",{id:"p1960391014012"}),t("三次ReduceDataBlock")])]),e("th",{class:"cellrowborder",valign:"top",width:"33.33333333333333%",id:"mcps1.2.4.1.3"},[e("p",{id:"p2758451105915"},[e("span",{id:"p2758451105915"}),e("span",{id:"p2758451105915"}),t("一次ReduceDataBlock加一次ReduceRepeat")])])])]),e("tbody",null,[e("tr",{id:"row275855115912"},[e("td",{class:"cellrowborder",valign:"top",width:"33.33333333333333%",headers:"mcps1.2.4.1.1 "},[e("p",{id:"p075810518599"},[e("span",{id:"p075810518599"}),e("span",{id:"p075810518599"}),t("13us")])]),e("td",{class:"cellrowborder",valign:"top",width:"33.33333333333333%",headers:"mcps1.2.4.1.2 "},[e("p",{id:"p8758155165918"},[e("span",{id:"p8758155165918"}),e("span",{id:"p8758155165918"}),t("13.94us")])]),e("td",{class:"cellrowborder",valign:"top",width:"33.33333333333333%",headers:"mcps1.2.4.1.3 "},[e("p",{id:"p4758165105910"},[e("span",{id:"p4758165105910"}),e("span",{id:"p4758165105910"}),t("8.44us")])])])])]),e("p",null,"【两次ReduceRepeat操作】"),e("div",{class:"code-block"},[e("div",{class:"code-header"},[e("span",{class:"lang-label"},"Text"),e("button",{class:"copy-btn",title:"复制代码"},[e("svg",{width:"16",height:"16",viewBox:"0 0 16 16"},[e("path",{d:"M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"}),e("path",{d:"M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"})])])]),e("pre",{class:"highlight"},[e("code",null,`...
pipe.InitBuffer(calcBuf, totalLength * sizeof(DTYPE));
AscendC::LocalTensor<DTYPE> tempTensor1 = calcBuf.Get<DTYPE>();
const uint32_t repeatNum = (totalLength * sizeof(DTYPE) + REP_LEN - 1) / REP_LEN;
AscendC::SetMaskCount();
AscendC::SetVectorMask<DTYPE>(0, totalLength);
AscendC::ReduceRepeat<AscendC::ReduceType::SUM, DTYPE, DTYPE, false>(tempTensor1, xLocal, AscendC::MASK_PLACEHOLDER, 1,
    DEFAULT_BLK_STRIDE, DEFAULT_BLK_STRIDE, DEFAULT_REP_STRIDE);
AscendC::PipeBarrier<PIPE_V>();
AscendC::SetVectorMask<DTYPE>(0, repeatNum);
AscendC::ReduceRepeat<AscendC::ReduceType::SUM, DTYPE, DTYPE, false>(zLocal, tempTensor1, AscendC::MASK_PLACEHOLDER, 1,
    DEFAULT_BLK_STRIDE, DEFAULT_BLK_STRIDE, DEFAULT_REP_STRIDE);
AscendC::PipeBarrier<PIPE_V>();
AscendC::SetMaskNorm();
...
`)])]),e("p",null,"【三次ReduceDataBlock操作】"),e("div",{class:"code-block"},[e("div",{class:"code-header"},[e("span",{class:"lang-label"},"Text"),e("button",{class:"copy-btn",title:"复制代码"},[e("svg",{width:"16",height:"16",viewBox:"0 0 16 16"},[e("path",{d:"M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"}),e("path",{d:"M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"})])])]),e("pre",{class:"highlight"},[e("code",null,`...
static constexpr uint32_t BLK_LEN = 32;
TBuf<TPosition::VECCALC> calcBuf;
constexpr uint32_t c0Count = BLK_LEN / sizeof(DTYPE_X);
const uint32_t blockNum0 = (totalLength + c0Count - 1) / c0Count;
const uint32_t blockNum1 = (blockNum0 + c0Count - 1) / c0Count;
AscendC::SetMaskCount();
AscendC::SetVectorMask<DTYPE_X>(0, totalLength);
AscendC::ReduceDataBlock<AscendC::ReduceType::SUM, DTYPE_X, DTYPE_X, false>(tempTensor1, xLocal, AscendC::MASK_PLACEHOLDER, 1,
    DEFAULT_BLK_STRIDE, DEFAULT_BLK_STRIDE, DEFAULT_REP_STRIDE);
AscendC::PipeBarrier<PIPE_V>();
AscendC::SetVectorMask<DTYPE_X>(0, blockNum0);
AscendC::ReduceDataBlock<AscendC::ReduceType::SUM, DTYPE_X, DTYPE_X, false>(tempTensor1, tempTensor1, AscendC::MASK_PLACEHOLDER, 1,
    DEFAULT_BLK_STRIDE, DEFAULT_BLK_STRIDE, DEFAULT_REP_STRIDE);
AscendC::PipeBarrier<PIPE_V>();
AscendC::SetVectorMask<DTYPE_X>(0, blockNum1);
AscendC::ReduceDataBlock<AscendC::ReduceType::SUM, DTYPE_X, DTYPE_X, false>(zLocal, tempTensor1, AscendC::MASK_PLACEHOLDER, 1,
    DEFAULT_BLK_STRIDE, DEFAULT_BLK_STRIDE, DEFAULT_REP_STRIDE);
AscendC::PipeBarrier<PIPE_V>();
AscendC::SetMaskNorm();
...
`)])]),e("p",null,"【ReduceDataBlock + ReduceRepeat操作】"),e("div",{class:"code-block"},[e("div",{class:"code-header"},[e("span",{class:"lang-label"},"Text"),e("button",{class:"copy-btn",title:"复制代码"},[e("svg",{width:"16",height:"16",viewBox:"0 0 16 16"},[e("path",{d:"M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"}),e("path",{d:"M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"})])])]),e("pre",{class:"highlight"},[e("code",null,`...
pipe.InitBuffer(calcBuf, totalLength * sizeof(DTYPE));
AscendC::LocalTensor<DTYPE> tempTensor1 = calcBuf.Get<DTYPE>();
constexpr uint32_t c0Count = BLK_LEN / sizeof(DTYPE);
const uint32_t blockNum0 = (totalLength + c0Count - 1) / c0Count;
AscendC::SetMaskCount();
AscendC::SetVectorMask<DTYPE>(0, totalLength);
AscendC::ReduceDataBlock<AscendC::ReduceType::SUM, DTYPE, DTYPE, false>(tempTensor1, xLocal, AscendC::MASK_PLACEHOLDER, 1,
    DEFAULT_BLK_STRIDE, DEFAULT_BLK_STRIDE, DEFAULT_REP_STRIDE);
AscendC::PipeBarrier<PIPE_V>();
AscendC::SetVectorMask<DTYPE>(0, blockNum0);
AscendC::ReduceRepeat<AscendC::ReduceType::SUM, DTYPE, DTYPE, false>(zLocal, tempTensor1, AscendC::MASK_PLACEHOLDER, 1,
    DEFAULT_BLK_STRIDE, DEFAULT_BLK_STRIDE, DEFAULT_REP_STRIDE);
AscendC::PipeBarrier<PIPE_V>();
AscendC::SetMaskNorm();
...
`)])])])],-1)])])}const R=a(d,[["render",o]]);export{A as __pageData,R as default};
