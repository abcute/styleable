
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface StyleAnalysisProps {
  analysis: any;
  collapsed: boolean;
  onBack?: () => void;
}

const StyleAnalysis = ({ analysis, collapsed, onBack }: StyleAnalysisProps) => {
  const [isExpanded, setIsExpanded] = useState(!collapsed);

  return (
    <Card className={cn("p-6 mb-6", collapsed ? "bg-gray-50" : "")}>
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">
          {collapsed ? "风格分析结果" : "步骤二：风格分析结果"}
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
          <div className="mt-4 p-4 bg-indigo-50 rounded-md">
            <h3 className="font-medium mb-2">风格概述</h3>
            <p>{analysis.style_summary}</p>
          </div>
          
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border rounded-md p-3">
              <h3 className="font-medium mb-2">语言特征</h3>
              <div className="text-sm">
                <div className="mb-2">
                  <span className="text-gray-600">句式：</span>
                  {analysis.language.sentence_pattern.join("，")}
                </div>
                <div className="mb-2">
                  <span className="text-gray-600">用词偏好：</span>
                  {analysis.language.word_choice.preferred_words.join("，")}
                </div>
                <div>
                  <span className="text-gray-600">修辞手法：</span>
                  {analysis.language.rhetoric.join("，")}
                </div>
              </div>
            </div>
            
            {/* 这里可以继续添加其他风格特征的展示 */}
            <div className="border rounded-md p-3">
              <h3 className="font-medium mb-2">语言正式度</h3>
              <div className="w-full h-6 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-indigo-600 rounded-full"
                  style={{ width: `${parseInt(analysis.language.word_choice.formality_level) * 20}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-xs mt-1">
                <span>随意</span>
                <span>中性</span>
                <span>正式</span>
              </div>
            </div>
          </div>
          
          {!collapsed && onBack && (
            <div className="mt-6">
              <Button 
                variant="outline" 
                onClick={onBack}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                返回修改原文
              </Button>
            </div>
          )}
        </>
      )}
    </Card>
  );
};

export default StyleAnalysis;
