
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface MimicPreviewProps {
  text: string;
  collapsed: boolean;
  onHumanize: () => void;
  onBack?: () => void;
  isLoading: boolean;
}

const MimicPreview = ({ text, collapsed, onHumanize, onBack, isLoading }: MimicPreviewProps) => {
  const [isExpanded, setIsExpanded] = useState(!collapsed);

  return (
    <Card className={cn("p-6 mb-6", collapsed ? "bg-gray-50" : "")}>
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">
          {collapsed ? "生成的仿写文章" : "步骤三：生成的仿写文章"}
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
              收起
            </>
          ) : (
            <>
              <ChevronDown className="h-4 w-4 mr-1" />
              展开
            </>
          )}
        </Button>
      </div>
      
      {isExpanded && (
        <>
          <div className="mt-4 p-4 bg-gray-50 rounded-md whitespace-pre-line">
            {text}
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
                  返回修改主题
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
                    处理中...
                  </>
                ) : (
                  <>
                    增加"人味" 
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
