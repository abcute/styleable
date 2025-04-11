
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { ArrowRight, Loader2 } from "lucide-react";

interface OriginalTextInputProps {
  value: string;
  onChange: (text: string) => void;
  onAnalyze: () => void;
  isLoading: boolean;
}

const OriginalTextInput = ({ value, onChange, onAnalyze, isLoading }: OriginalTextInputProps) => {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">步骤一：输入原始文章</h2>
      <p className="text-gray-600 mb-4">
        请输入您想要分析的原始文章，系统将提取其写作风格特征。文章越长，分析越准确（建议300字以上）。
      </p>
      
      <div className="mb-6">
        <Textarea
          placeholder="在此粘贴或输入您想要分析风格的文章..."
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
                分析中...
              </>
            ) : (
              <>
                提取文章风格 
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
