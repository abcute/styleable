// 风格分析提示词模板
const STYLE_ANALYSIS_PROMPT = `# 文章风格提取提示词模板 v1.0
请输入您想要分析的文本段落。我将对其进行深度风格解析，并以结构化格式输出分析结果。
## 分析维度
我将从以下维度分析文本风格特征：
1. 语言特征（句式、用词、修辞）
2. 结构特征（段落、过渡、层次）
3. 叙事特征（视角、距离、时序）
4. 情感特征（浓淡、方式、基调）
5. 思维特征（逻辑、深度、节奏）
6. 个性标记（独特表达、意象系统）
7. 文化底蕴（典故、知识领域）
8. 韵律节奏（音节、停顿、节奏）
## 输出格式
我将以下列结构化格式以代码块输出分析结果：
\`\`\`json
{
"style_summary": "风格一句话概括",
"language": {
"sentence_pattern": ["主要句式特征", "次要句式特征"],
"word_choice": {
"formality_level": "正式度 1-5",
"preferred_words": ["高频特征词1", "特征词2"],
"avoided_words": ["规避词类1", "规避词类2"]
},
"rhetoric": ["主要修辞手法1", "修辞手法2"]
},
"structure": {
"paragraph_length": "段落平均字数",
"transition_style": "过渡特征",
"hierarchy_pattern": "层次展开方式"
},
"narrative": {
"perspective": "叙事视角",
"time_sequence": "时间处理方式",
"narrator_attitude": "叙事态度"
},
"emotion": {
"intensity": "情感强度 1-5",
"expression_style": "表达方式",
"tone": "情感基调"
},
"thinking": {
"logic_pattern": "思维推进方式",
"depth": "思维深度 1-5",
"rhythm": "思维节奏特征"
},
"uniqueness": {
"signature_phrases": ["标志性表达1", "表达2"],
"imagery_system": ["核心意象1", "意象2"]
},
"cultural": {
"allusions": ["典故类型", "使用频率"],
"knowledge_domains": ["涉及领域1", "领域2"]
},
"rhythm": {
"syllable_pattern": "音节特征",
"pause_pattern": "停顿规律",
"tempo": "节奏特征"
}
}
\`\`\`
## 注意：
1. 文中提及的特殊要素不要提取，例如书名、作者姓名、特定地理位置等。
2. 风格提取的目的在于基于该风格生成其他指定主题的文章，提取要素应当基于这一任务。
`;

// Deepseek API 配置
const DEEPSEEK_API_KEY = 'sk-d6a27dc76b0f4867afd62aba022a6cff';
const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions';

/**
 * 发送请求到Deepseek API
 * @param prompt 提示词
 * @param systemPrompt 系统提示词
 * @returns 响应文本
 */
async function callDeepseekAPI(prompt: string, systemPrompt?: string): Promise<string> {
  try {
    const response = await fetch(DEEPSEEK_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DEEPSEEK_API_KEY}`
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          ...(systemPrompt ? [{ role: 'system', content: systemPrompt }] : []),
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 4000
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('API调用失败:', errorData);
      throw new Error(`API调用失败: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('API调用出错:', error);
    throw new Error(`API调用出错: ${error.message}`);
  }
}

/**
 * 从API响应中提取JSON对象
 * @param text API返回的响应文本
 * @returns 解析后的JSON对象
 */
function extractJsonFromResponse(text: string): any {
  const jsonRegex = /```json\s*([\s\S]*?)\s*```|```([\s\S]*?)```|(\{[\s\S]*\})/;
  const match = text.match(jsonRegex);
  
  if (match) {
    const jsonStr = match[1] || match[2] || match[3];
    try {
      return JSON.parse(jsonStr.trim());
    } catch (e) {
      console.error('JSON解析错误:', e);
      throw new Error('无法解析API返回的JSON');
    }
  }
  
  throw new Error('API响应中未找到有效的JSON');
}

/**
 * 分析文章风格
 * @param text 要分析的文本
 * @returns 分析结果对象
 */
export async function analyzeStyle(text: string): Promise<any> {
  try {
    const fullPrompt = STYLE_ANALYSIS_PROMPT + '\n\n' + text;
    const responseText = await callDeepseekAPI(fullPrompt);
    return extractJsonFromResponse(responseText);
  } catch (error) {
    console.error('风格分析失败:', error);
    throw error;
  }
}

// 文章仿写提示词模板
export const TEXT_MIMIC_PROMPT = `# 文章仿写提示词模板 v1.0
基于上述文本风格，为我编写一篇1000字的文章，要求如下：
关键词：{keywords}

注意：
- 禁止使用"让我想起…""这让我想起…""我不由得想起…"等回忆性过渡句
- 避免刻意煽情或直白的情感表达
- 采用自然段落输出，不使用标题和小标题`;

/**
 * 生成仿写文章
 * @param styleAnalysis 风格分析结果
 * @param keywords 用户输入的关键词
 * @returns 生成的文章内容
 */
export async function generateMimicText(styleAnalysis: any, keywords: string): Promise<string> {
  try {
    // 构建完整的提示词
    const styleJson = JSON.stringify(styleAnalysis);
    const prompt = `${styleJson}\n\n${TEXT_MIMIC_PROMPT.replace('{keywords}', keywords)}`;
    
    // 调用API生成文章
    const responseText = await callDeepseekAPI(prompt);
    return responseText.trim();
  } catch (error) {
    console.error('文章生成失败:', error);
    throw error;
  }
}

// 人味改写提示词模板
export const HUMANIZE_TEXT_PROMPT = `# 人味改写提示词模板 v1.0
基于下列方式改写文本，生成更有"人味"的文章：
"""
{
"真实人类思维文本范式": {
"核心原则": [
"思维碎片化：人类思维不是线性的，而是充满跳跃、联想和中断",
"身体感知优先：身体状态深刻影响思维内容和情绪",
"矛盾并存：内心冲突和矛盾是常态，不需要解决",
"琐事干扰：日常琐事和随机想法经常打断深刻思考",
"不完美表达：语言表达有重复、犹豫和不精确"
],
"文本结构框架": {
"身体层面": {
"占比": "20-30%",
"要素": [
"插入具体的身体不适感",
"使用具体而微小的细节",
"身体需求会打断思考"
]
},
"情绪层面": {
"占比": "15-25%",
"要素": [
"情绪波动无需合理原因",
"同时存在矛盾情绪",
"使用内在自我批评",
"加入无来由的情绪爆发"
]
},
"思维层面": {
"占比": "30-40%",
"要素": [
"随机联想：当前事物触发无关记忆",
"琐事插入：日常担忧突然闯入",
"自我怀疑：质疑自己的动机和决定",
"实用担忧：关于物质条件的现实考虑"
]
},
"现实干扰": {
"占比": "15-20%",
"要素": [
"计划失败",
"设备故障",
"物品损坏",
"意外发现"
]
}
},
"语言技巧": {
"口语化表达": [
"加入语气词",
"使用不完整句",
"自我对话"
],
"打破流畅叙事": [
"突然转换话题",
"中断自己的思路",
"使用省略号表示思维跳跃"
],
"减少华丽修辞": [
"避免过度文学化的比喻",
"用朴实直接的表达代替优美句子",
"保留一些重复和赘述"
]
}
}
"""

请将我提供的文本根据上述"真实人类思维文本范式"进行改写，使文章更有人味。
要求：
1. 加入身体层面的描述（不适感、微小细节、身体需求）
2. 增加情绪波动和矛盾情绪
3. 插入随机联想和琐事打断
4. 使用口语化表���和不完整句
5. 打破流畅叙事，加入思维跳跃
6. 减少华丽修辞，保留重复和赘述

保持文章原有主题和大致内容，但让表达方式更接近真实人类思维过程。`;

/**
 * 人味化处理文章
 * @param mimicText 仿写的文章
 * @returns 人味化后的文章
 */
export async function humanizeText(mimicText: string): Promise<string> {
  try {
    // 构建完整的提示词
    const prompt = HUMANIZE_TEXT_PROMPT + "\n\n以下是需要改写的文本：\n" + mimicText;
    
    // 调用API进行人味化处理
    const responseText = await callDeepseekAPI(prompt);
    return responseText.trim();
  } catch (error) {
    console.error('文章人味化处理失败:', error);
    throw error;
  }
}
