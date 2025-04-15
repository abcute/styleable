
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ArrowRight, Loader2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface TopicInputProps {
  value: string;
  onChange: (text: string) => void;
  onGenerate: () => void;
  isLoading: boolean;
}

const TopicInput = ({ value, onChange, onGenerate, isLoading }: TopicInputProps) => {
  const { t } = useLanguage();
  
  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">{t("topicInput.title")}</h2>
      
      <div className="mb-6">
        <Input
          placeholder={t("topicInput.placeholder")}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="mb-4"
        />
        
        <div className="flex justify-end">
          <Button 
            onClick={onGenerate} 
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
                {t("topicInput.generate")}
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default TopicInput;
