
import { useState } from "react";
import { Button } from "@/components/ui/button";
import StepIndicator from "@/components/StepIndicator";
import OriginalTextInput from "@/components/OriginalTextInput";
import StyleAnalysis from "@/components/StyleAnalysis";
import TopicInput from "@/components/TopicInput";
import MimicPreview from "@/components/MimicPreview";
import FinalContent from "@/components/FinalContent";
import PaymentModal from "@/components/PaymentModal";
import SavedStylesSelector from "@/components/SavedStylesSelector";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight, FileText, Sparkles, Edit3, CreditCard } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { analyzeStyle, generateMimicText, humanizeText } from "@/utils/analysisUtils";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import { saveGeneratedContent } from "@/utils/workUtils";
import { saveStyleAnalysis } from "@/utils/supabaseUtils";

const Index = () => {
  const { toast } = useToast();
  const { t } = useLanguage();
  const { user, isAuthenticated } = useAuth();
  const [step, setStep] = useState(1);
  const [originalText, setOriginalText] = useState("");
  const [styleAnalysis, setStyleAnalysis] = useState(null);
  const [currentStyleId, setCurrentStyleId] = useState<string | null>(null);
  const [topicKeywords, setTopicKeywords] = useState("");
  const [mimickedText, setMimickedText] = useState("");
  const [humanizedText, setHumanizedText] = useState("");
  const [title, setTitle] = useState("");
  const [isPaid, setIsPaid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  
  const handleAnalyzeStyle = async () => {
    if (!originalText.trim()) {
      toast({
        title: t("toast.analyzeFail"),
        description: t("originalText.placeholder"),
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    try {
      const analysisResult = await analyzeStyle(originalText);
      
      setStyleAnalysis(analysisResult);
      setStep(2);
      
      // Save style analysis to database if user is logged in
      if (isAuthenticated && user && analysisResult) {
        try {
          const styleName = `风格分析 - ${new Date().toLocaleDateString('zh-CN')}`;
          const savedStyle = await saveStyleAnalysis(
            user.id,
            styleName,
            analysisResult
          );
          setCurrentStyleId(savedStyle.id);
          toast({
            title: "风格分析完成",
            description: "分析结果已保存，您可以在下次直接使用此风格",
          });
        } catch (error) {
          console.error('Error saving style:', error);
          toast({
            title: t("toast.analyzeSuccess"),
            description: t("styleAnalysis.title"),
          });
        }
      } else {
        toast({
          title: t("toast.analyzeSuccess"),
          description: t("styleAnalysis.title"),
        });
      }
    } catch (error) {
      toast({
        title: t("toast.analyzeFail"),
        description: t("toast.analyzeFail"),
        variant: "destructive",
      });
      console.error("Style analysis error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStyleSelect = (styleData: any, styleName: string) => {
    setStyleAnalysis(styleData);
    setStep(2);
    setOriginalText(""); // Clear original text since we're using saved style
    toast({
      title: "风格已加载",
      description: `已加载风格：${styleName}`,
    });
  };

  const generateMimicTextHandler = async () => {
    if (!styleAnalysis || !topicKeywords.trim()) {
      toast({
        title: t("toast.generateFail"),
        description: t("topicInput.placeholder"),
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    try {
      const generatedText = await generateMimicText(styleAnalysis, topicKeywords);
      
      setMimickedText(generatedText);
      setTitle(topicKeywords.split(',')[0] || "New Work");
      setStep(3);
      toast({
        title: t("toast.generateSuccess"),
        description: t("toast.generateSuccess"),
      });
    } catch (error) {
      toast({
        title: t("toast.generateFail"),
        description: t("toast.generateFail"),
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
        title: t("toast.humanizeFail"),
        description: t("toast.humanizeFail"),
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    try {
      const processedText = await humanizeText(mimickedText);
      
      setHumanizedText(processedText);
      setShowPaymentModal(true);
      setStep(4);
      toast({
        title: t("toast.humanizeSuccess"),
        description: t("toast.humanizeSuccess"),
      });

      if (isAuthenticated && user) {
        try {
          await saveGeneratedContent(
            user.id,
            title,
            topicKeywords,
            originalText,
            mimickedText,
            processedText,
            currentStyleId || undefined
          );
          toast({
            title: "作品已保存",
            description: "您可以在"我的作品"页面查看",
          });
        } catch (error) {
          console.error('Error saving work:', error);
        }
      }
    } catch (error) {
      toast({
        title: t("toast.humanizeFail"),
        description: t("toast.humanizeFail"),
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
      title: t("toast.paymentSuccess"),
      description: t("toast.paymentSuccess"),
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-indigo-900/20 dark:via-purple-900/20 dark:to-pink-900/20 flex flex-col">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 flex-1">
        <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 text-transparent bg-clip-text animate-gradient">
          Styleable
        </h1>
        
        <StepIndicator 
          currentStep={step} 
          steps={[
            {icon: FileText, label: t("steps.analyzeOriginal")},
            {icon: Sparkles, label: t("steps.topicKeywords")},
            {icon: Edit3, label: t("steps.generateMimic")},
            {icon: CreditCard, label: t("steps.getFinal")}
          ]} 
        />
        
        <div className="mt-8">
          {step === 1 && (
            <div className="space-y-6">
              <SavedStylesSelector 
                onStyleSelect={handleStyleSelect}
                className="mb-6"
              />
              <OriginalTextInput 
                value={originalText} 
                onChange={setOriginalText} 
                onAnalyze={handleAnalyzeStyle}
                isLoading={isLoading}
              />
            </div>
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
      
      <Footer />
      
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
