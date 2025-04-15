
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";
import { FileText, Sparkles, Edit3, CreditCard, Check } from "lucide-react";
import { Card } from "@/components/ui/card";

const Guide = () => {
  const { t, language } = useLanguage();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-indigo-900/20 dark:via-purple-900/20 dark:to-pink-900/20 flex flex-col">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 flex-1">
        <h1 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 text-transparent bg-clip-text animate-gradient">
          {language === "en" ? "User Guide" : "使用指南"}
        </h1>
        
        <p className="text-lg text-center mb-12 max-w-2xl mx-auto">
          {language === "en" 
            ? "Learn how to use Styleable to mimic writing styles and create professional content." 
            : "学习如何使用Styleable仿写文章风格并创建专业内容。"}
        </p>
        
        <div className="max-w-4xl mx-auto space-y-16">
          {/* Step 1 */}
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/3">
              <div className="bg-indigo-100 dark:bg-indigo-900/30 p-6 rounded-lg flex flex-col items-center">
                <div className="bg-indigo-500 rounded-full p-3 mb-3">
                  <FileText className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-center">{language === "en" ? "Step 1" : "步骤1"}</h3>
                <p className="text-center font-medium">{t("steps.analyzeOriginal")}</p>
              </div>
            </div>
            <div className="md:w-2/3">
              <Card className="p-6 h-full">
                <h3 className="text-xl font-semibold mb-3">{language === "en" ? "Analyze Original Text" : "分析原文风格"}</h3>
                <p className="mb-4">{language === "en" 
                  ? "Start by pasting an original text sample that represents the writing style you want to mimic. The system will analyze various aspects of the text including:" 
                  : "首先粘贴一段代表你想要模仿的写作风格的原始文本样本。系统将分析文本的各个方面，包括："}
                </p>
                <ul className="space-y-2">
                  {[
                    language === "en" ? "Sentence structure and patterns" : "句子结构和模式",
                    language === "en" ? "Word choice and vocabulary preferences" : "用词选择和词汇偏好",
                    language === "en" ? "Rhetorical devices and techniques" : "修辞手法和技巧",
                    language === "en" ? "Narrative style and perspective" : "叙事风格和视角",
                    language === "en" ? "Emotional tone and expression" : "情感基调和表达方式"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <div className="bg-green-100 dark:bg-green-900/30 p-1 rounded-full mr-2 mt-0.5">
                        <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
                      </div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          </div>
          
          {/* Step 2 */}
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/3">
              <div className="bg-purple-100 dark:bg-purple-900/30 p-6 rounded-lg flex flex-col items-center">
                <div className="bg-purple-500 rounded-full p-3 mb-3">
                  <Sparkles className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-center">{language === "en" ? "Step 2" : "步骤2"}</h3>
                <p className="text-center font-medium">{t("steps.topicKeywords")}</p>
              </div>
            </div>
            <div className="md:w-2/3">
              <Card className="p-6 h-full">
                <h3 className="text-xl font-semibold mb-3">{language === "en" ? "Enter Topic Keywords" : "输入主题关键词"}</h3>
                <p className="mb-4">{language === "en" 
                  ? "After the style analysis is complete, enter keywords related to the topic you want to write about. These keywords guide the content generation while maintaining the analyzed style." 
                  : "风格分析完成后，输入与您想要写作的主题相关的关键词。这些关键词将指导内容生成，同时保持已分析的风格。"}
                </p>
                <p>{language === "en"
                  ? "The more specific and detailed your keywords, the more focused the generated content will be. You can include:"
                  : "关键词越具体和详细，生成的内容就越有针对性。您可以包括："}
                </p>
                <ul className="space-y-2 mt-2">
                  {[
                    language === "en" ? "Main topic and subtopics" : "主题和子主题",
                    language === "en" ? "Key concepts or ideas to include" : "要包含的关键概念或想法",
                    language === "en" ? "Specific terms relevant to your field" : "与您领域相关的特定术语"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <div className="bg-green-100 dark:bg-green-900/30 p-1 rounded-full mr-2 mt-0.5">
                        <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
                      </div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          </div>
          
          {/* Step 3 */}
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/3">
              <div className="bg-pink-100 dark:bg-pink-900/30 p-6 rounded-lg flex flex-col items-center">
                <div className="bg-pink-500 rounded-full p-3 mb-3">
                  <Edit3 className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-center">{language === "en" ? "Step 3" : "步骤3"}</h3>
                <p className="text-center font-medium">{t("steps.generateMimic")}</p>
              </div>
            </div>
            <div className="md:w-2/3">
              <Card className="p-6 h-full">
                <h3 className="text-xl font-semibold mb-3">{language === "en" ? "Generate Mimic Text" : "生成仿写文章"}</h3>
                <p className="mb-4">{language === "en" 
                  ? "The system generates text that mimics the analyzed style while incorporating your topic keywords. This AI-generated content will:" 
                  : "系统生成模仿已分析风格并融合您主题关键词的文本。这种AI生成的内容将："}
                </p>
                <ul className="space-y-2">
                  {[
                    language === "en" ? "Match sentence structures and patterns" : "匹配句子结构和模式",
                    language === "en" ? "Use similar vocabulary and word choices" : "使用类似的词汇和用词选择",
                    language === "en" ? "Apply the same rhetorical devices" : "应用相同的修辞手法",
                    language === "en" ? "Maintain the original emotional tone" : "保持原始情感基调"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <div className="bg-green-100 dark:bg-green-900/30 p-1 rounded-full mr-2 mt-0.5">
                        <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
                      </div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4">{language === "en"
                  ? "Review the generated text and proceed to the next step if you're satisfied with the result."
                  : "审查生成的文本，如果您对结果满意，请继续下一步。"}
                </p>
              </Card>
            </div>
          </div>
          
          {/* Step 4 */}
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/3">
              <div className="bg-amber-100 dark:bg-amber-900/30 p-6 rounded-lg flex flex-col items-center">
                <div className="bg-amber-500 rounded-full p-3 mb-3">
                  <CreditCard className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-center">{language === "en" ? "Step 4" : "步骤4"}</h3>
                <p className="text-center font-medium">{t("steps.getFinal")}</p>
              </div>
            </div>
            <div className="md:w-2/3">
              <Card className="p-6 h-full">
                <h3 className="text-xl font-semibold mb-3">{language === "en" ? "Get Final Product" : "获取最终成品"}</h3>
                <p className="mb-4">{language === "en" 
                  ? "The system processes the generated text to add a more natural, human-like quality. This 'humanization' process:" 
                  : "系统处理生成的文本以添加更自然、更人性化的品质。这种'人性化'过程："}
                </p>
                <ul className="space-y-2">
                  {[
                    language === "en" ? "Refines phrasing to sound more natural" : "优化措辞以使其听起来更自然",
                    language === "en" ? "Adds subtle variations to avoid monotony" : "添加细微变化以避免单调",
                    language === "en" ? "Enhances readability and flow" : "增强可读性和流畅性",
                    language === "en" ? "Ensures coherence and consistency" : "确保连贯性和一致性"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <div className="bg-green-100 dark:bg-green-900/30 p-1 rounded-full mr-2 mt-0.5">
                        <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
                      </div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4">{language === "en"
                  ? "The final product is available for a small fee ($2). Once purchased, you can copy, download, and use the content as needed."
                  : "最终产品收取少量费用（$2）。购买后，您可以根据需要复制、下载和使用内容。"}
                </p>
              </Card>
            </div>
          </div>
          
          {/* FAQ Section */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6 text-center">{language === "en" ? "Frequently Asked Questions" : "常见问题"}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="font-semibold mb-2">{language === "en" ? "How accurate is the style mimicking?" : "风格模仿的准确度如何？"}</h3>
                <p>{language === "en" 
                  ? "Styleable uses advanced AI to capture the essence of writing styles with high accuracy. However, results may vary depending on the length and distinctiveness of the original text sample." 
                  : "Styleable使用先进的AI技术以高准确度捕捉写作风格的精髓。但是，结果可能会因原始文本样本的长度和特点而异。"}
                </p>
              </Card>
              <Card className="p-6">
                <h3 className="font-semibold mb-2">{language === "en" ? "Is my content private and secure?" : "我的内容是否私密安全？"}</h3>
                <p>{language === "en" 
                  ? "Yes, we prioritize your privacy. Uploaded content is not stored permanently and is only used to analyze style and generate new content based on your request." 
                  : "是的，我们优先考虑您的隐私。上传的内容不会永久存储，仅用于分析风格和根据您的要求生成新内容。"}
                </p>
              </Card>
              <Card className="p-6">
                <h3 className="font-semibold mb-2">{language === "en" ? "Can I use the generated content commercially?" : "我可以商业使用生成的内容吗？"}</h3>
                <p>{language === "en" 
                  ? "Yes, once you purchase the final content, it's yours to use for personal or commercial purposes." 
                  : "是的，一旦您购买了最终内容，您可以将其用于个人或商业目的。"}
                </p>
              </Card>
              <Card className="p-6">
                <h3 className="font-semibold mb-2">{language === "en" ? "What payment methods are accepted?" : "接受哪些支付方式？"}</h3>
                <p>{language === "en" 
                  ? "We accept all major credit cards and digital payment methods through our secure payment processor." 
                  : "我们通过安全支付处理器接受所有主要信用卡和数字支付方式。"}
                </p>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Guide;
