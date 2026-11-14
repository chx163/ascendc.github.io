import{_ as i,o as a,a as n,b as e}from"./app.DKoEZOcr.js";const c=JSON.parse('{"title":"","description":"","frontmatter":{"breadcrumbs":[{"text":"Ascend C算子开发指南","link":"/guide/getting_started/ascend_c_overview_and_learning_path"},{"text":"算子实践参考","link":"/guide/operator_practice/document_structure"},{"text":"SIMD算子性能优化","link":"/guide/operator_practice/simd_operator_optimization/simd_operator_optimization"},{"text":"头尾开销优化","link":"/guide/operator_practice/simd_operator_optimization/overhead_optimization/overhead_optimization"},{"text":"限制TilingData结构大小","link":"/guide/operator_practice/simd_operator_optimization/overhead_optimization/limit_tiling_data_size"}]},"headers":[],"relativePath":"guide/operator_practice/simd_operator_optimization/overhead_optimization/limit_tiling_data_size.md","filePath":"guide/operator_practice/simd_operator_optimization/overhead_optimization/limit_tiling_data_size.md","lastUpdated":1787050286000}'),_={name:"guide/operator_practice/simd_operator_optimization/overhead_optimization/limit_tiling_data_size.md"};function l(o,t,r,s,g,h){return a(),n("div",null,[...t[0]||(t[0]=[e(`<div><article class="markdown-body"><h1>限制TilingData结构大小<span id="ZH-CN_TOPIC_0000001846878548"></span></h1><p>【优先级】中</p><p>【描述】TilingData结构是Tiling切分信息的载体，当Host侧按照Tiling切分策略计算完Tiling后，算子会以入参的方式将Tiling切分信息从Host侧传递到Device侧，此时Tiling信息存放在GM上。调用GET_TILING_DATA宏后，会将Tiling信息从GM拷贝到AI处理器的栈空间上，期间会有拷贝开销，由于GM访问效率较低，同时考虑到栈空间限制，需要限制TilingData结构大小。拷贝耗时为us级别，在小shape的场景下，进行此类优化收益会更加明显。</p><p>限制TilingData结构大小，可以从以下方面考虑：</p><ul><li>减少不必要的TilingData结构变量；</li><li>根据Tiling的数据范围选择合适的变量类型；</li><li>合理排布TilingData结构；</li><li>TilingData整体结构要求8字节补齐。</li></ul><p>【反例】</p><ul><li>如下的示例中存在TilingData结构变量冗余的情况：NumBlocks信息已经通过SetSimdNumBlocks接口进行设置，可以在核函数（Kernel）侧调用GetBlockNum接口获取，无需通过TilingData结构传递。</li><li>此外，变量的数据类型也不合理：formerNum和tailNum分别为计算整块数据的核数和计算尾块数据的核数，不会超过NUM_BLOCKS的值，使用uint8_t类型即可；formerLength等变量根据其计算逻辑，不会超出uint32_t的范围，使用uint32_t类型即可。</li></ul><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>// Tiling结构体定义
BEGIN_TILING_DATA_DEF(TilingDataUnalign)
  TILING_DATA_FIELD_DEF(uint64_t, numBlocks);
  TILING_DATA_FIELD_DEF(uint64_t, formerNum);
  TILING_DATA_FIELD_DEF(uint64_t, tailNum);
  TILING_DATA_FIELD_DEF(uint64_t, formerLength);
  TILING_DATA_FIELD_DEF(uint64_t, tailLength);
  TILING_DATA_FIELD_DEF(uint64_t, alignNum);
END_TILING_DATA_DEF;
</code></pre></div><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>// Host侧Tiling函数计算Tiling结构信息
constexpr uint32_t NUM_BLOCKS = 8;
constexpr uint32_t SIZE_OF_HALF = 2;
constexpr uint32_t BLOCK_SIZE = 32;
constexpr uint32_t ALIGN_NUM = BLOCK_SIZE / SIZE_OF_HALF;
static ge::graphStatus TilingFunc(gert::TilingContext *context)
{
    TilingDataUnalign tiling;
    uint32_t totalLength = context-&gt;GetInputTensor(0)-&gt;GetShapeSize();
    // NumBlocks信息已经通过SetSimdNumBlocks接口进行设置
    context-&gt;SetSimdNumBlocks(NUM_BLOCKS);
    uint32_t totalLengthAligned = ((totalLength + ALIGN_NUM - 1) / ALIGN_NUM) * ALIGN_NUM;
    // formerNum、tailNum保证不超过0-NUM_BLOCKS数据范围
    uint32_t formerNum = (totalLengthAligned / ALIGN_NUM) % NUM_BLOCKS;
    uint32_t tailNum = NUM_BLOCKS - formerNum;
    // formerLength等变量根据其计算逻辑，不会超出uint32_t的范围   
    uint32_t formerLength = ((totalLengthAligned / NUM_BLOCKS + ALIGN_NUM - 1) / ALIGN_NUM) * ALIGN_NUM;
    uint32_t tailLength = (totalLengthAligned / NUM_BLOCKS / ALIGN_NUM) * ALIGN_NUM;
    ...
}
</code></pre></div><p>【正例】</p><p>Tiling变量无冗余，变量数据类型最小化。</p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>BEGIN_TILING_DATA_DEF(TilingDataUnalign)
  TILING_DATA_FIELD_DEF(uint8_t, formerNum);
  TILING_DATA_FIELD_DEF(uint8_t, tailNum); 
  TILING_DATA_FIELD_DEF(uint32_t, formerLength);
  TILING_DATA_FIELD_DEF(uint32_t, tailLength);
  TILING_DATA_FIELD_DEF(uint32_t, alignNum);
END_TILING_DATA_DEF;
</code></pre></div><p>【反例】</p><p>如下的示例中TilingData结构不合理：由于AI处理器访存需要8字节对齐，在用户定义TilingData结构后，Ascend C工程框架会按照8字节对齐的方式对字节进行补齐，并保证整体TilingData结构满足8字节对齐要求。如下TilingData结构formerNum和tailNum变量都会补充3个字节，整体TilingData结构会因为8字节对齐再补充4个字节，该TilingData结构共计补充<strong>10</strong>个字节。</p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>BEGIN_TILING_DATA_DEF(TilingDataUnalign)
  TILING_DATA_FIELD_DEF(uint8_t, formerNum); // 需补充3个字节，使得formerLength变量访问无误
  TILING_DATA_FIELD_DEF(uint32_t, formerLength);
  TILING_DATA_FIELD_DEF(uint8_t, tailNum); // 需补充3个字节，使得tailLength变量访问无误
  TILING_DATA_FIELD_DEF(uint32_t, tailLength);
  TILING_DATA_FIELD_DEF(uint32_t, alignNum);// 需补充4个字节，使得下个TilingData结构访问无误
END_TILING_DATA_DEF;
</code></pre></div><p>【正例】</p><p>如下的示例中，对Tiling参数的排布进行了调整，字节排布合理，只需要补充<strong>2</strong>个字节，达到了减小TilingData结构的目的。</p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>BEGIN_TILING_DATA_DEF(TilingDataUnalign)
  TILING_DATA_FIELD_DEF(uint8_t, formerNum);
  TILING_DATA_FIELD_DEF(uint8_t, tailNum); // 需补充2个字节，使得formerLength变量访问无误
  TILING_DATA_FIELD_DEF(uint32_t, formerLength);
  TILING_DATA_FIELD_DEF(uint32_t, tailLength);
  TILING_DATA_FIELD_DEF(uint32_t, alignNum);
END_TILING_DATA_DEF;
</code></pre></div></article></div>`,1)])])}const d=i(_,[["render",l]]);export{c as __pageData,d as default};
