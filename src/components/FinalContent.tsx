
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lock, Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

interface FinalContentProps {
  text: string;
  isPaid: boolean;
  onOpenPayment: () => void;
}

const FinalContent = ({ text, isPaid, onOpenPayment }: FinalContentProps) => {
  const { toast } = useToast();
  const { t } = useLanguage();
  const [isCopied, setIsCopied] = useState(false);

  const displayText = isPaid ? text : text.substring(0, 300) + "...";

  const handleCopyText = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      toast({
        title: t("toast.copySuccess"),
        duration: 2000,
      });

      // Reset the copied state after 2 seconds
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
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">{t("finalContent.title")}</h2>
      
      <div className="relative">
        <div className={cn(
          "p-4 bg-white dark:bg-gray-800 border rounded-md whitespace-pre-line",
          !isPaid && "max-h-[300px] overflow-hidden"
        )}>
          {displayText}
        </div>
        
        {!isPaid && (
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white dark:to-gray-900 flex flex-col justify-end items-center py-8">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md text-center">
              <Lock className="h-8 w-8 mx-auto text-indigo-500 mb-2" />
              <h3 className="font-medium text-lg mb-2">{t("finalContent.unlock")}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">{t("finalContent.unlockDesc")}</p>
              <Button onClick={onOpenPayment}>{t("finalContent.unlockButton")}</Button>
            </div>
          </div>
        )}
      </div>
      
      {isPaid && (
        <div className="mt-6 flex justify-between">
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
          <Button variant="outline">{t("finalContent.download")}</Button>
        </div>
      )}
    </Card>
  );
};

export default FinalContent;
