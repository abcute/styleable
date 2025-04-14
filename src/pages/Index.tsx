
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import StepIndicator from "@/components/StepIndicator";
import OriginalTextInput from "@/components/OriginalTextInput";
import StyleAnalysis from "@/components/StyleAnalysis";
import TopicInput from "@/components/TopicInput";
import MimicPreview from "@/components/MimicPreview";
import FinalContent from "@/components/FinalContent";
import PaymentModal from "@/components/PaymentModal";
import Navbar from "@/components/Navbar";
import { ArrowRight, FileText, Sparkles, Edit3, CreditCard } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { analyzeStyle, generateMimicText, humanizeText } from "@/utils/analysisUtils";

const Index = () => {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [originalText, setOriginalText] = useState("");
  const [styleAnalysis, setStyleAnalysis] = useState(null);
  const [topicKeywords, setTopicKeywords] = useState("");
  const [mimickedText, setMimickedText] = useState("");
  const [humanizedText, setHumanizedText] = useState("");
  const [isPaid, setIsPaid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  
  const handleAnalyzeStyle = async () => {
    if (!originalText.trim()) {
      toast({
        title: "无法分析",
        description: "请先输入原始文章内容",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    try {
      // 调用分析函数
      const analysisResult = await analyzeStyle(originalText);
      
      setStyleAnalysis(analysisResult);
      setStep(2);
      toast({
        title: "分析完成",
        description: "文章风格已成功提取",
      });
    } catch (error) {
      toast({
        title: "分析失败",
        description: "无法提取文章风格，请稍后重试",
        variant: "destructive",
      });
      console.error("Style analysis error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const generateMimicTextHandler = async () => {
    if (!styleAnalysis || !topicKeywords.trim()) {
      toast({
        title: "无法生成",
        description: "请确保已有风格分析结果并输入了主题关键词",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    try {
      // 调用仿写生成函数
      const generatedText = await generateMimicText(styleAnalysis, topicKeywords);
      
      setMimickedText(generatedText);
      setStep(3);
      toast({
        title: "生成完成",
        description: "已根据提供的风格和主题生成文章",
      });
    } catch (error) {
      toast({
        title: "生成失败",
        description: "无法生成仿写文章，请稍后重试",
        variant: "destructive",
      });
      console.error("Text generation error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const humanizeTextHandler = async () => {
    if (!mimickedText) {
      toast({
        title: "无法处理",
        description: "需要先生成仿写文章",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    try {
      // 调用人味化处理函数
      const processedText = await humanizeText(mimickedText);
      
      setHumanizedText(processedText);
      setShowPaymentModal(true);
      setStep(4);
      toast({
        title: "处理完成",
        description: "文章已经过人味化处理",
      });
    } catch (error) {
      toast({
        title: "处理失败",
        description: "无法完成最终文章加工，请稍后重试",
        variant: "destructive",
      });
      console.error("Text humanization error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePaymentSuccess = () => {
    setIsPaid(true);
    setShowPaymentModal(false);
    toast({
      title: "支付成功",
      description: "您现在可以查看完整内容了",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-indigo-900/20 dark:via-purple-900/20 dark:to-pink-900/20">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 text-transparent bg-clip-text animate-gradient">
          Styleable
        </h1>
        
        <StepIndicator 
          currentStep={step} 
          steps={[
            {icon: FileText, label: "分析原文风格"},
            {icon: Sparkles, label: "输入主题关键词"},
            {icon: Edit3, label: "生成仿写文章"},
            {icon: CreditCard, label: "获取最终成品"}
          ]} 
        />
        
        <div className="mt-8">
          {step === 1 && (
            <OriginalTextInput 
              value={originalText} 
              onChange={setOriginalText} 
              onAnalyze={handleAnalyzeStyle}
              isLoading={isLoading}
            />
          )}
          
          {step >= 2 && styleAnalysis && (
            <StyleAnalysis 
              analysis={styleAnalysis} 
              collapsed={step > 2}
              onBack={() => step === 2 && setStep(1)}
            />
          )}
          
          {step === 2 && (
            <TopicInput 
              value={topicKeywords}
              onChange={setTopicKeywords}
              onGenerate={generateMimicTextHandler}
              isLoading={isLoading}
            />
          )}
          
          {step >= 3 && mimickedText && (
            <MimicPreview
              text={mimickedText}
              collapsed={step > 3}
              onHumanize={humanizeTextHandler}
              onBack={() => step === 3 && setStep(2)}
              isLoading={isLoading}
            />
          )}
          
          {step === 4 && humanizedText && (
            <FinalContent
              text={humanizedText}
              isPaid={isPaid}
              onOpenPayment={() => setShowPaymentModal(true)}
            />
          )}
        </div>
      </main>
      
      <PaymentModal 
        isOpen={showPaymentModal} 
        onClose={() => setShowPaymentModal(false)} 
        onSuccess={handlePaymentSuccess}
        amount={2}
      />
    </div>
  );
};

export default Index;
