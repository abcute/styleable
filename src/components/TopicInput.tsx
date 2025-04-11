
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ArrowRight, Loader2 } from "lucide-react";

interface TopicInputProps {
  value: string;
  onChange: (text: string) => void;
  onGenerate: () => void;
  isLoading: boolean;
}

const TopicInput = ({ value, onChange, onGenerate, isLoading }: TopicInputProps) => {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">输入主题关键词</h2>
      <p className="text-gray-600 mb-4">
        请输入您希望生成文章的主题关键词，用逗号分隔。系统将根据前一步提取的风格，生成符合您主题需求的文章。
      </p>
      
      <div className="mb-6">
        <Input
          placeholder="输入关键词，如：古镇木工坊, 年轮纹路, 木器修复, 匠人, 光阴..."
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
                生成中...
              </>
            ) : (
              <>
                生成仿写文章
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
