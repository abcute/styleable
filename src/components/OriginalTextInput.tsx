
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { ArrowRight, Loader2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface OriginalTextInputProps {
  value: string;
  onChange: (text: string) => void;
  onAnalyze: () => void;
  isLoading: boolean;
}

const OriginalTextInput = ({ value, onChange, onAnalyze, isLoading }: OriginalTextInputProps) => {
  const { t } = useLanguage();
  
  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">{t("originalText.title")}</h2>
      
      <div className="mb-6">
        <Textarea
          placeholder={t("originalText.placeholder")}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="min-h-[300px] mb-4"
        />
        
        <div className="flex justify-end">
          <Button 
            onClick={onAnalyze} 
            disabled={isLoading || !value.trim()} 
            className="flex items-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                {t("mimicPreview.processing")}
              </>
            ) : (
              <>
                {t("originalText.analyze")}
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default OriginalTextInput;
