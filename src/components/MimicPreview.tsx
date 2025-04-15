
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, ArrowLeft, ArrowRight, Loader2, Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/context/LanguageContext";

interface MimicPreviewProps {
  text: string;
  collapsed: boolean;
  onHumanize: () => void;
  onBack?: () => void;
  isLoading: boolean;
}

const MimicPreview = ({ text, collapsed, onHumanize, onBack, isLoading }: MimicPreviewProps) => {
  const { toast } = useToast();
  const { t } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(!collapsed);
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyText = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      toast({
        title: t("toast.copySuccess"),
        duration: 2000,
      });
      
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (err) {
      toast({
        title: t("toast.copyFail"),
        variant: "destructive",
      });
    }
  };

  return (
    <Card className={cn("p-6 mb-6", collapsed ? "bg-gray-50 dark:bg-gray-800/20" : "")}>
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">
          {collapsed ? t("mimicPreview.title") : "步骤三：" + t("mimicPreview.title")}
        </h2>
        
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-gray-500"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? (
            <>
              <ChevronUp className="h-4 w-4 mr-1" />
              {t("mimicPreview.collapse")}
            </>
          ) : (
            <>
              <ChevronDown className="h-4 w-4 mr-1" />
              {t("mimicPreview.expand")}
            </>
          )}
        </Button>
      </div>
      
      {isExpanded && (
        <>
          <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800/30 rounded-md whitespace-pre-line">
            {text}
          </div>
          
          <div className="mt-4 flex">
            <Button 
              variant="outline" 
              onClick={handleCopyText}
              className="flex items-center gap-2"
            >
              {isCopied ? (
                <>
                  <Check className="h-4 w-4 text-green-500" />
                  {t("finalContent.copied")}
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  {t("finalContent.copyText")}
                </>
              )}
            </Button>
          </div>
          
          {!collapsed && (
            <div className="mt-6 flex justify-between">
              {onBack && (
                <Button 
                  variant="outline" 
                  onClick={onBack}
                  className="flex items-center gap-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  {t("mimicPreview.back")}
                </Button>
              )}
              
              <Button 
                onClick={onHumanize} 
                disabled={isLoading} 
                className="flex items-center gap-2 ml-auto"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    {t("mimicPreview.processing")}
                  </>
                ) : (
                  <>
                    {t("mimicPreview.humanize")}
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          )}
        </>
      )}
    </Card>
  );
};

export default MimicPreview;
