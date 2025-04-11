
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
import { analyzeStyle } from "@/utils/analysisUtils";

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

  const generateMimicText = async () => {
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
      // 这里会调用API生成仿写文章
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // 模拟生成的文章
      const mockMimickedText = `在这座僻静的古镇深处，有一间木工坊，门扉斑驳，窗棂透着岁月的气息。工坊主人是个年过半百的匠人，他的指尖刻满了木屑和年轮...`;
      
      setMimickedText(mockMimickedText);
      setStep(3);
      toast({
        title: "生成完成",
        description: "已根据提供的风格生成文章",
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

  const humanizeText = async () => {
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
      // 这里会调用API让文章更有"人味"
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 2500));
      
      // 模拟人味化后的文章
      const mockHumanizedText = `我走进古镇那间木工坊时，手指无意识地摸了摸额头的汗珠——夏日的午后总是这样闷热。工坊里有股特别的味道，木屑混着些许霉味，又带点松油的清香，说不上多好闻，却让人莫名安心。

匠人头也没抬，只顾着摩挲手中那件看起来已有些年头的木器。我注意到他的手指上有一道新鲜的小伤口，应该是不小心划到的。站了半天腿有点酸，我挪了挪位置，地板发出轻微的吱呀声...`;
      
      setHumanizedText(mockHumanizedText);
      setShowPaymentModal(true);
      setStep(4);
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
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">文章风格仿写</h1>
        
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
              onGenerate={generateMimicText}
              isLoading={isLoading}
            />
          )}
          
          {step >= 3 && mimickedText && (
            <MimicPreview
              text={mimickedText}
              collapsed={step > 3}
              onHumanize={humanizeText}
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
