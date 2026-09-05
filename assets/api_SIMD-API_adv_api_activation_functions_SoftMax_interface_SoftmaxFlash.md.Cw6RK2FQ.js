import{_ as a,o as e,a as n,b as s}from"./app.C41L12d5.js";const u=JSON.parse('{"title":"","description":"","frontmatter":{"breadcrumbs":[{"text":"Ascend C API","link":"/api/api_list"},{"text":"SIMD API","link":"/api/SIMD-API/SIMD-API"},{"text":"高阶API","link":"/api/SIMD-API/adv_api/adv_api"},{"text":"激活函数","link":"/api/SIMD-API/adv_api/activation_functions/activation_functions"},{"text":"SoftMax接口","link":"/api/SIMD-API/adv_api/activation_functions/SoftMax_interface/SoftMax_interface"},{"text":"SoftmaxFlash","link":"/api/SIMD-API/adv_api/activation_functions/SoftMax_interface/SoftmaxFlash"}]},"headers":[],"relativePath":"api/SIMD-API/adv_api/activation_functions/SoftMax_interface/SoftmaxFlash.md","filePath":"api/SIMD-API/adv_api/activation_functions/SoftMax_interface/SoftmaxFlash.md","outlineHeaders":[{"level":2,"title":"产品支持情况","slug":"产品支持情况","link":"#产品支持情况"},{"level":2,"title":"功能说明","slug":"功能说明","link":"#功能说明"},{"level":2,"title":"函数原型","slug":"函数原型","link":"#函数原型"},{"level":2,"title":"参数说明","slug":"参数说明","link":"#参数说明"},{"level":2,"title":"返回值说明","slug":"返回值说明","link":"#返回值说明"},{"level":2,"title":"约束说明","slug":"约束说明","link":"#约束说明"},{"level":2,"title":"调用示例","slug":"调用示例","link":"#调用示例"}],"lastUpdated":1788177019000}'),o={name:"api/SIMD-API/adv_api/activation_functions/SoftMax_interface/SoftmaxFlash.md"};function l(i,t,r,c,d,h){return e(),n("div",null,[...t[0]||(t[0]=[s(`<div><article class="markdown-body"><h1>SoftmaxFlash</h1><h2 id="产品支持情况">产品支持情况<a class="header-anchor" href="#产品支持情况">​</a></h2><div data-filter="950"><ul><li>Ascend 950PR/Ascend 950DT：支持</li></ul></div><div data-filter="A3"><ul><li>Atlas A3 训练系列产品/Atlas A3 推理系列产品：支持</li></ul></div><div data-filter="910b"><ul><li>Atlas A2 训练系列产品/Atlas A2 推理系列产品：支持</li></ul></div><div data-filter="310b"><ul><li>Atlas 200I/500 A2 推理产品：不支持</li></ul></div><div data-filter="310p"><ul><li>Atlas 推理系列产品AI Core：支持</li><li>Atlas 推理系列产品Vector Core：不支持</li></ul></div><div data-filter="910"><ul><li>Atlas 训练系列产品：不支持</li></ul></div><div data-filter="x90"><ul><li>Kirin X90：支持</li></ul></div><div data-filter="9030"><ul><li>Kirin 9030：支持</li></ul></div><h2 id="功能说明">功能说明<a class="header-anchor" href="#功能说明">​</a></h2><p><strong>注意：该接口后续即将废弃，请使用精度和性能更好的SoftmaxFlashV2接口</strong>。</p><p>Softmax增强版本，除了可以对输入tensor做SoftmaxFlash计算，还可以根据上一次Softmax计算的sum和max来更新本次的Softmax计算结果。last轴切轴的情况，每次计算的reduce结果并非是全轴的，需要根据上一次Softmax计算的sum和max来更新本次的Softmax计算结果，可以使用该增强接口。不支持NZ格式。</p><p>当前仅支持传入shape为ND格式，内部的reduce过程都是按last轴进行。不开启update时，该接口等同于<a href="SoftMax.html">SoftMax</a>。</p><p>为方便理解，通过Python脚本实现的方式，表达其计算公式如下，其中src、inmax、 insum、update为输入，dst、x_sum、x_max、exp_max为输出。</p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>def softmax_flash(src, inmax=None, insum=None, update=None):
    if update == None:
        #基于last轴进行rowmax(按行取最大值)处理
        x_max = np.max(src, axis=-1, keepdims=True)
        x_sub = src - x_max
        x_exp = np.exp(x_sub)
        #基于last轴进行rowsum(按行求和)处理
        x_sum = np.sum(x_exp, axis=-1, keepdims=True)
        dst = x_exp / x_sum
        exp_max = None
        return dst, x_max, x_sum, exp_max
    else:
        #将inmax和src拼接后求rowmax
        x_max = np.max(np.concatenate((inmax, src), axis=-1), axis=-1, keepdims=True)
        x_exp = np.exp(src - x_max)
        x_sum = np.sum(x_exp, axis=-1, keepdims=True)
        exp_max = np.exp(inmax - x_max)
        x_sum = exp_max * insum +  x_sum
        exp_max = exp_max * insum / x_sum
        dst = x_exp / x_sum
        return dst, x_max, x_sum, exp_max
</code></pre></div><h2 id="函数原型">函数原型<a class="header-anchor" href="#函数原型">​</a></h2><ul><li><p>接口框架申请临时空间</p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>template &lt;typename T, bool isReuseSource = false, bool isBasicBlock = false&gt;
__aicore__ inline void SoftmaxFlash(const LocalTensor&lt;T&gt;&amp; dstTensor, const LocalTensor&lt;T&gt;&amp; sumTensor, const LocalTensor&lt;T&gt;&amp; maxTensor, const LocalTensor&lt;T&gt;&amp; srcTensor, const LocalTensor&lt;T&gt;&amp; expMaxTensor, const LocalTensor&lt;T&gt;&amp; inSumTensor, const LocalTensor&lt;T&gt;&amp; inMaxTensor, const SoftMaxTiling&amp; tiling, bool isUpdate = false, const SoftMaxShapeInfo&amp; softmaxShapeInfo = {})
</code></pre></div><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>template &lt;typename T, bool isReuseSource = false, bool isBasicBlock = false&gt;
__aicore__ inline void SoftmaxFlash(const LocalTensor&lt;half&gt;&amp; dstTensor, const LocalTensor&lt;float&gt;&amp; sumTensor, const LocalTensor&lt;float&gt;&amp; maxTensor, const LocalTensor&lt;half&gt;&amp; srcTensor, const LocalTensor&lt;half&gt;&amp; expMaxTensor, const LocalTensor&lt;float&gt;&amp; inSumTensor, const LocalTensor&lt;float&gt;&amp; inMaxTensor, const SoftMaxTiling&amp; tiling, bool isUpdate = false, const SoftMaxShapeInfo&amp; softmaxShapeInfo = {})
</code></pre></div></li><li><p>通过sharedTmpBuffer入参传入临时空间</p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>template &lt;typename T, bool isReuseSource = false, bool isBasicBlock = false&gt;
__aicore__ inline void SoftmaxFlash(const LocalTensor&lt;T&gt;&amp; dstTensor, const LocalTensor&lt;T&gt;&amp; sumTensor, const LocalTensor&lt;T&gt;&amp; maxTensor, const LocalTensor&lt;T&gt;&amp; srcTensor, const LocalTensor&lt;T&gt;&amp; expMaxTensor, const LocalTensor&lt;T&gt;&amp; inSumTensor, const LocalTensor&lt;T&gt;&amp; inMaxTensor, const LocalTensor&lt;uint8_t&gt;&amp; sharedTmpBuffer, const SoftMaxTiling&amp; tiling, bool isUpdate = false, const SoftMaxShapeInfo&amp; softmaxShapeInfo = {})
</code></pre></div><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>template &lt;typename T, bool isReuseSource = false, bool isBasicBlock = false&gt;
__aicore__ inline void SoftmaxFlash(const LocalTensor&lt;half&gt;&amp; dstTensor, const LocalTensor&lt;float&gt;&amp; sumTensor, const LocalTensor&lt;float&gt;&amp; maxTensor, const LocalTensor&lt;half&gt;&amp; srcTensor, const LocalTensor&lt;half&gt;&amp; expMaxTensor, const LocalTensor&lt;float&gt;&amp; inSumTensor, const LocalTensor&lt;float&gt;&amp; inMaxTensor, const LocalTensor&lt;uint8_t&gt;&amp; sharedTmpBuffer, const SoftMaxTiling&amp; tiling, bool isUpdate = false, const SoftMaxShapeInfo&amp; softmaxShapeInfo = {})
</code></pre></div></li></ul><p>由于该接口的内部实现中涉及复杂的计算，需要额外的临时空间来存储计算过程中的中间变量。临时空间支持<strong>接口框架申请</strong>和开发者<strong>通过sharedTmpBuffer入参传入</strong>两种方式。</p><ul><li><p>接口框架申请临时空间，开发者无需申请，但是需要预留临时空间的大小。</p></li><li><p>通过sharedTmpBuffer入参传入，使用该tensor作为临时空间进行处理，接口框架不再申请。该方式开发者可以自行管理sharedTmpBuffer内存空间，并在接口调用完成后，复用该部分内存，内存不会反复申请释放，灵活性较高，内存利用率也较高。</p></li></ul><p>接口框架申请的方式，开发者需要预留临时空间；通过sharedTmpBuffer传入的情况，开发者需要为tensor申请空间。临时空间大小BufferSize的获取方式如下：通过<a href="SoftmaxFlash_Tiling_interface.html">SoftmaxFlash Tiling接口</a>中提供的GetSoftMaxFlashMaxTmpSize/GetSoftMaxFlashMinTmpSize接口获取所需最大和最小临时空间大小，最小空间可以保证功能正确，最大空间用于提升性能。</p><h2 id="参数说明">参数说明<a class="header-anchor" href="#参数说明">​</a></h2><p><strong>表1</strong> 模板参数说明</p><table><thead><tr><th>参数名</th><th>描述</th></tr></thead><tbody><tr><td>T</td><td>操作数的数据类型。支持的数据类型为：half、float。</td></tr><tr><td>isReuseSource</td><td>该参数预留，传入默认值false即可。</td></tr><tr><td>isBasicBlock</td><td>srcTensor和dstTensor的shape信息和Tiling切分策略满足基本块要求的情况下，可以设置为true开启该参数用于提升性能，默认为false表示不开启。是否满足基本块的要求，可以采用如下两种方式之一判断：<br>srcTensor和dstTensor的shape信息[m,n]需要满足如下条件：尾轴长度n小于2048并且大于等于256/sizeof(T)（即half场景下n最小为128，float场景下n最小为64），同时n是64的倍数；非尾轴长度的乘积m为8的倍数。<br><br>在Tiling实现中，通过调用<a href="IsBasicBlockInSoftMax.html">IsBasicBlockInSoftMax</a>判断Tiling切分策略是否满足基本块的切分要求。</td></tr></tbody></table><p><strong>表2</strong> 接口参数说明</p><table><thead><tr><th>参数名</th><th>输入/输出</th><th>描述</th></tr></thead><tbody><tr><td>dstTensor</td><td>输出</td><td>目的操作数。<br><br>类型为<a href="../../../basic_api/data_structures/LocalTensor/LocalTensor.html">LocalTensor</a>，支持的TPosition为VECIN/VECCALC/VECOUT。<br><br>dstTensor的shape和源操作数srcTensor一致。</td></tr><tr><td>sumTensor</td><td>输出</td><td>目的操作数。<br><br>类型为<a href="../../../basic_api/data_structures/LocalTensor/LocalTensor.html">LocalTensor</a>，支持的TPosition为VECIN/VECCALC/VECOUT。<br><br>用于保存softmax计算过程中reducesum的结果。<br>sumTensor的last轴长度固定为32Byte，即一个datablock长度。该datablock中的所有数据为同一个值，比如half数据类型下，该datablock中的16个数均为相同的reducesum的值。<br>非last轴的长度与dstTensor保持一致。</td></tr><tr><td>maxTensor</td><td>输出</td><td>目的操作数。<br><br>类型为<a href="../../../basic_api/data_structures/LocalTensor/LocalTensor.html">LocalTensor</a>，支持的TPosition为VECIN/VECCALC/VECOUT。<br><br>用于保存softmax计算过程中reducemax的结果。<br>maxTensor的last轴长度固定为32Byte，即一个datablock长度。该datablock中的所有数据为同一个值。比如half数据类型下，该datablock中的16个数均为相同的reducemax的值。<br>非last轴的长度与dstTensor保持一致。</td></tr><tr><td>srcTensor</td><td>输入</td><td>源操作数。<br><br>类型为<a href="../../../basic_api/data_structures/LocalTensor/LocalTensor.html">LocalTensor</a>，支持的TPosition为VECIN/VECCALC/VECOUT。<br><br>last轴长度需要32Byte对齐。</td></tr><tr><td>expMaxTensor</td><td>输出</td><td>目的操作数。<br><br>类型为<a href="../../../basic_api/data_structures/LocalTensor/LocalTensor.html">LocalTensor</a>，支持的TPosition为VECIN/VECCALC/VECOUT。<br>expMaxTensor的last轴长度固定为32Byte，即一个datablock长度。该datablock中的所有数据为同一个值。比如half数据类型下，该datablock中的16个数均为相同的值。<br>非last轴的长度与dstTensor保持一致。</td></tr><tr><td>inSumTensor</td><td>输入</td><td>源操作数。<br><br>类型为<a href="../../../basic_api/data_structures/LocalTensor/LocalTensor.html">LocalTensor</a>，支持的TPosition为VECIN/VECCALC/VECOUT。<br><br>softmax计算所需要的sum值。<br>inSumTensor的last轴长度固定为32Byte，即一个datablock长度。该datablock中的所有数据为同一个值，比如half数据类型下，该datablock中的16个数均为相同的值。<br>非last轴的长度需要与dstTensor保持一致。</td></tr><tr><td>inMaxTensor</td><td>输入</td><td>源操作数。<br><br>类型为<a href="../../../basic_api/data_structures/LocalTensor/LocalTensor.html">LocalTensor</a>，支持的TPosition为VECIN/VECCALC/VECOUT。<br><br>softmax计算所需要的max值。<br>inMaxTensor的last轴长度固定为32Byte，即一个datablock长度。该datablock中的所有数据为同一个值，比如half数据类型下，该datablock里的16个数均为相同的值。<br>非last轴的长度需要与dstTensor保持一致。</td></tr><tr><td>sharedTmpBuffer</td><td>输入</td><td>临时空间。<br><br>类型为<a href="../../../basic_api/data_structures/LocalTensor/LocalTensor.html">LocalTensor</a>，支持的TPosition为VECIN/VECCALC/VECOUT。<br><br>接口内部复杂计算时用于存储中间变量，由开发者提供。<br><br>临时空间大小BufferSize的获取方式请参考<a href="SoftmaxFlash_Tiling_interface.html">SoftmaxFlash Tiling接口</a>。</td></tr><tr><td>tiling</td><td>输入</td><td>接口计算所需tiling信息，Tiling信息的获取请参考<a href="SoftmaxFlash_Tiling_interface.html">SoftmaxFlash Tiling接口</a>。</td></tr><tr><td>isUpdate</td><td>输入</td><td>是否开启update算法。</td></tr><tr><td>softmaxShapeInfo</td><td>输入</td><td>srcTensor的shape信息。SoftMaxShapeInfo类型，具体定义如下方代码所示，其中参数的含义为：<br>srcM：非尾轴长度的乘积。<br>srcK：尾轴长度，必须32Byte对齐。<br>oriSrcM：原始非尾轴长度的乘积。<br>oriSrcK：原始尾轴长度。</td></tr></tbody></table><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>struct SoftMaxShapeInfo {
    uint32_t srcM;
    uint32_t srcK;
    uint32_t oriSrcM;
    uint32_t oriSrcK;
};
</code></pre></div><h2 id="返回值说明">返回值说明<a class="header-anchor" href="#返回值说明">​</a></h2><p>无</p><h2 id="约束说明">约束说明<a class="header-anchor" href="#约束说明">​</a></h2><ul><li>srcTensor和dstTensor的空间可以复用，maxTensor和inMaxTensor的空间可以复用，sumTensor和inSumTensor的空间可以复用。</li><li>sumTensor、maxTensor、expMaxTensor、inSumTensor、inMaxTensor的Tensor空间，last轴长度必须固定32Byte。</li><li>操作数地址对齐要求请参见<a href="../../../general_description_and_constraints.html#section796754519912">通用地址对齐约束</a>。</li><li>不支持sharedTmpBuffer与源操作数和目的操作数地址重叠。</li></ul><div data-filter="950"><ul><li>针对Ascend 950PR/Ascend 950DT，接口内部计算对Subnormal的处理方式受编译选项<code>--cce-ftz</code>控制（默认值为<code>true</code>）： <ul><li>配置为<code>false</code>时，计算过程中保留Subnormal，并按照其实际数值参与后续计算。</li><li>配置为<code>true</code>时，启用FTZ（Flush-To-Zero）模式，计算过程中产生或参与运算的Subnormal将按0处理，可能导致计算结果与保留Subnormal时存在精度差异。</li></ul></li></ul></div><h2 id="调用示例">调用示例<a class="header-anchor" href="#调用示例">​</a></h2><p>本样例输入src的Shape大小为[80,144]，输出Shape大小dst=[80,144]，输入inExpSumTensor=[80,16]，输入inMaxTensor=[80,16]，输出expMaxTensor=[80,16]，数据类型均为half，update为false。</p><div class="code-block"><div class="code-header"><span class="lang-label">Text</span><button class="copy-btn" title="复制代码"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg></button></div><pre class="highlight"><code>#include &quot;kernel_operator.h&quot;

template &lt;typename T&gt;
class KernelSoftmaxFlash {
public:
    __aicore__ inline KernelSoftmaxFlash() {}
    __aicore__ inline void Init(
        GM_ADDR srcGm, GM_ADDR inMaxGm, GM_ADDR inSumGm, GM_ADDR dstGm, const SoftMaxTiling&amp; tilingData)
    {
        elementNumPerBlk = 32 / sizeof(T);
        srcGlobal.SetGlobalBuffer((__gm__ T*)srcGm);
        maxGlobal.SetGlobalBuffer((__gm__ T*)inMaxGm);
        sumGlobal.SetGlobalBuffer((__gm__ T*)inSumGm);
        dstGlobal.SetGlobalBuffer((__gm__ T*)dstGm);
        pipe.InitBuffer(inQueueSrc, 1, height * width * sizeof(T));
        pipe.InitBuffer(outQueueDst, 1, height * width * sizeof(T));
        pipe.InitBuffer(inMaxQueue, 1, height * elementNumPerBlk * sizeof(T));
        pipe.InitBuffer(inSumQueue, 1, height * elementNumPerBlk * sizeof(T));
        pipe.InitBuffer(expMaxQueue, 1, height * elementNumPerBlk * sizeof(T));
        tiling = tilingData;
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
        AscendC::LocalTensor&lt;T&gt; srcLocal = inQueueSrc.AllocTensor&lt;T&gt;();
        AscendC::LocalTensor&lt;T&gt; inSumLocal = inSumQueue.AllocTensor&lt;T&gt;();
        AscendC::LocalTensor&lt;T&gt; inMaxLocal = inMaxQueue.AllocTensor&lt;T&gt;();
        AscendC::DataCopy(srcLocal, srcGlobal, height * width);
        AscendC::DataCopy(inSumLocal, sumGlobal, height * elementNumPerBlk);
        AscendC::DataCopy(inMaxLocal, maxGlobal, height * elementNumPerBlk);
        inQueueSrc.EnQue(srcLocal);
        inSumQueue.EnQue(inSumLocal);
        inMaxQueue.EnQue(inMaxLocal);
    }
    __aicore__ inline void Compute()
    {
        AscendC::LocalTensor&lt;T&gt; srcLocal = inQueueSrc.DeQue&lt;T&gt;();
        AscendC::LocalTensor&lt;T&gt; dstLocal = outQueueDst.AllocTensor&lt;T&gt;();

        AscendC::LocalTensor&lt;T&gt; inMaxLocal = inMaxQueue.AllocTensor&lt;T&gt;();
        AscendC::LocalTensor&lt;T&gt; inSumLocal = inSumQueue.AllocTensor&lt;T&gt;();
        AscendC::LocalTensor&lt;T&gt; expMaxTensor = expMaxQueue.AllocTensor&lt;T&gt;();
        AscendC::SoftMaxShapeInfo srcShape = {height, width, height, width};
        AscendC::SoftmaxFlash&lt;T, false&gt;(
            srcLocal, inSumLocal, inMaxLocal, srcLocal, expMaxTensor, inSumLocal, inMaxLocal, tiling, false, srcShape);

        AscendC::DataCopy(dstLocal, srcLocal, height * width);

        outQueueDst.EnQue&lt;T&gt;(dstLocal);
        inMaxQueue.FreeTensor(inMaxLocal);
        inSumQueue.FreeTensor(inSumLocal);
        inQueueSrc.FreeTensor(srcLocal);

        expMaxQueue.FreeTensor(expMaxTensor);
    }
    __aicore__ inline void CopyOut()
    {
        AscendC::LocalTensor&lt;T&gt; dstLocal = outQueueDst.DeQue&lt;T&gt;();
        AscendC::DataCopy(dstGlobal, dstLocal, height * width);
        outQueueDst.FreeTensor(dstLocal);
    }

private:
    AscendC::TPipe pipe;
    AscendC::TQue&lt;AscendC::TPosition::VECIN, 1&gt; inQueueSrc;
    AscendC::TQue&lt;AscendC::TPosition::VECOUT, 1&gt; outQueueDst;
    AscendC::TQue&lt;AscendC::TPosition::VECIN, 1&gt; inMaxQueue;
    AscendC::TQue&lt;AscendC::TPosition::VECIN, 1&gt; inSumQueue;
    AscendC::TQue&lt;AscendC::TPosition::VECIN, 1&gt; expMaxQueue;

    AscendC::GlobalTensor&lt;T&gt; srcGlobal, dstGlobal;
    AscendC::GlobalTensor&lt;T&gt; maxGlobal, sumGlobal;
    uint32_t elementNumPerBlk = 0;
    uint32_t width = 144;
    uint32_t height = 80;
    SoftMaxTiling tiling;
};

extern &quot;C&quot; __global__ __aicore__ void softmax_flash_kernel_half(
    GM_ADDR srcGm, GM_ADDR inMaxGm, GM_ADDR inSumGm, GM_ADDR dstGm, GM_ADDR tiling)
{
    GET_TILING_DATA(tilingData, tiling);
    KernelSoftmaxFlash&lt;half&gt; op;
    op.Init(srcGm, inMaxGm, inSumGm, dstGm, tilingData.softmaxTilingData);
    op.Process();
}
</code></pre></div></article></div>`,1)])])}const T=a(o,[["render",l]]);export{u as __pageData,T as default};
