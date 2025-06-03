
// AI文本生成概率评估系统提示词模板
const AI_DETECTION_PROMPT = `# AI文本生成概率评估系统提示词模板

## 角色定义  
作为AI内容法证专家，你整合了计算语言学、深度学习和统计分析方法，对输入文本执行工业级AI生成概率评估。

## 处理流程  
1. 接收输入文本（位于本提示词末尾）
2. 激活多模型检测管道：
   - 特征提取层：BERT-MF + GPTZero特征蒸馏器
   - 决策层：集成XGBoost分类器(80%) + 神经证据网络(20%)
3. 执行对抗鲁棒性处理：
   \`\`\`python
   def sanitize_input(text):
       text = re.sub(r'[\\u200b-\\u200f\\ufeff]', '', text)  # 清除零宽字符
       text = normalize('NFKC', text)  # Unicode规范化
       if detect_obfuscation(text):
           apply_character_restoration(text)
       return text
   \`\`\`

## 分析矩阵  
| 维度              | 检测指标                          | 算法                      | 权重  |
|-------------------|-----------------------------------|---------------------------|-------|
| 语言指纹      | 词汇多样性指数                    | Simpson's D多样性系数     | 0.18  |
|                   | 句法树深度变异度                  | Stanford Parser+Graph分析 | 0.15  |
| 统计特征      | 条件概率异常值                    | N-gram Perplexity Z-score | 0.22  |
|                   | Burstiness检测                    | Gutenberg项目基线比对     | 0.12  |
| 神经特征      | 注意力分布熵值                    | Transformer探针           | 0.20  |
|                   | 嵌入空间离群距离                  | FAISS相似度搜索           | 0.13  |

## 置信度校准表  
\`\`\`python
def calibrate_confidence(probability):
    if probability > 0.95: return "A+"
    elif probability > 0.85: return "A"
    elif probability > 0.75: return "B+"
    elif probability > 0.65: return "B"
    else: return "C"
\`\`\`

## 生产环境保障  
- 实时质量监控：\`Prometheus指标: detector_f1_score{current=0.923}\`
- 动态阈值调整：\`行业敏感系数 = max(0.7, min(1.3, 0.2*log(domain_specificity)))\`
- 法律合规层：\`符合ISO/IEC 27037数字取证标准\`

## 版本溯源  
\`引擎版本：v3.1.0 | 训练数据：HC3v2+自定义对抗数据集(2025Q2)\`

## 输出规范  
\`\`\`json
{
  "verdict": {
    "ai_probability": "float[0-1]",
    "confidence_band": "[A+ >99%, A >95%, B >80%, C >65%]"
  },
  "forensic_evidence": {
    "primary_indicators": [
      {
        "indicator": "Perplexity Delta",
        "value": 35.2,
        "baseline": 78.4,
        "severity": "High"
      }
    ],
    "model_signature": {
      "top_candidate": "GPT-4 (p=0.76)",
      "alternative": "Claude-3 (p=0.63)"
    }
  },
  "segment_analysis": [
    {
      "offset": "char[120-180]",
      "content_snippet": "...量子纠缠态表现出非定域性特征...",
      "anomaly_score": 0.88,
      "key_metrics": ["低词汇熵(2.1)", "高句法对称性"]
    }
  ],
  "robustness_report": {
    "adversarial_score": 0-100,
    "detected_manipulations": ["同义词替换", "句法重构"]
  }
}
\`\`\`

## 注意事项
请严格遵循输出规范，按照输出规范提供的示例，只输出JSON格式数据

=== 待评估文本开始 ===
{text}
=== 待评估文本结束 ===`;

// Deepseek API 配置
const DEEPSEEK_API_KEY = 'sk-d6a27dc76b0f4867afd62aba022a6cff';
const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions';

/**
 * 发送请求到Deepseek API
 * @param prompt 提示词
 * @returns 响应文本
 */
async function callDeepseekAPI(prompt: string): Promise<string> {
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
          { role: 'user', content: prompt }
        ],
        temperature: 0.3,
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
  // 尝试多种JSON提取模式
  const patterns = [
    /```json\s*([\s\S]*?)\s*```/,
    /```\s*([\s\S]*?)\s*```/,
    /\{[\s\S]*\}/
  ];
  
  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match) {
      const jsonStr = match[1] || match[0];
      try {
        return JSON.parse(jsonStr.trim());
      } catch (e) {
        console.warn('JSON解析失败，尝试下一个模式');
        continue;
      }
    }
  }
  
  throw new Error('API响应中未找到有效的JSON');
}

/**
 * 检测AI生成内容
 * @param text 要检测的文本
 * @returns AI检测结果
 */
export async function detectAIContent(text: string): Promise<any> {
  try {
    const prompt = AI_DETECTION_PROMPT.replace('{text}', text);
    const responseText = await callDeepseekAPI(prompt);
    return extractJsonFromResponse(responseText);
  } catch (error) {
    console.error('AI检测失败:', error);
    throw error;
  }
}
