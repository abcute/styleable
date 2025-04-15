
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/context/LanguageContext";

interface StyleAnalysisProps {
  analysis: any;
  collapsed: boolean;
  onBack?: () => void;
}

const StyleAnalysis = ({ analysis, collapsed, onBack }: StyleAnalysisProps) => {
  const [isExpanded, setIsExpanded] = useState(!collapsed);
  const { t } = useLanguage();

  return (
    <Card className={cn("p-6 mb-6", collapsed ? "bg-gray-50" : "")}>
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">
          {collapsed ? t("styleAnalysis.title") : "步骤二：" + t("styleAnalysis.title")}
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
              {t("styleAnalysis.collapse")}
            </>
          ) : (
            <>
              <ChevronDown className="h-4 w-4 mr-1" />
              {t("styleAnalysis.expand")}
            </>
          )}
        </Button>
      </div>
      
      {isExpanded && (
        <>
          <div className="mt-4 p-4 bg-indigo-50 rounded-md">
            <h3 className="font-medium mb-2">{t("styleAnalysis.overview")}</h3>
            <p>{analysis.style_summary}</p>
          </div>
          
          <Tabs defaultValue="language" className="mt-6">
            <TabsList className="grid grid-cols-4">
              <TabsTrigger value="language">{t("styleAnalysis.language")}</TabsTrigger>
              <TabsTrigger value="structure">{t("styleAnalysis.structure")}</TabsTrigger>
              <TabsTrigger value="narrative">{t("styleAnalysis.narrative")}</TabsTrigger>
              <TabsTrigger value="more">{t("styleAnalysis.more")}</TabsTrigger>
            </TabsList>
            
            <TabsContent value="language" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border rounded-md p-3">
                  <h3 className="font-medium mb-2">句式</h3>
                  <ul className="list-disc pl-5 text-sm">
                    {analysis.language.sentence_pattern.map((item: string, index: number) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="border rounded-md p-3">
                  <h3 className="font-medium mb-2">用词偏好</h3>
                  <div className="text-sm">
                    <div className="mb-2">
                      <span className="text-gray-600">正式度：</span>
                      <div className="w-full h-6 bg-gray-200 rounded-full overflow-hidden mt-1">
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
                    
                    <div className="mb-2">
                      <span className="text-gray-600">常用词：</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {analysis.language.word_choice.preferred_words.map((word: string, index: number) => (
                          <span key={index} className="bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded text-xs">
                            {word}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <span className="text-gray-600">规避词：</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {analysis.language.word_choice.avoided_words.map((word: string, index: number) => (
                          <span key={index} className="bg-gray-100 text-gray-800 px-2 py-0.5 rounded text-xs">
                            {word}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-md p-3">
                  <h3 className="font-medium mb-2">修辞手法</h3>
                  <div className="flex flex-wrap gap-1">
                    {analysis.language.rhetoric.map((item: string, index: number) => (
                      <span key={index} className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="structure" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border rounded-md p-3">
                  <h3 className="font-medium mb-2">段落特征</h3>
                  <div className="text-sm">
                    <div className="mb-2">
                      <span className="text-gray-600">平均长度：</span>
                      {analysis.structure.paragraph_length}
                    </div>
                    <div className="mb-2">
                      <span className="text-gray-600">过渡风格：</span>
                      {analysis.structure.transition_style}
                    </div>
                    <div>
                      <span className="text-gray-600">层次展开：</span>
                      {analysis.structure.hierarchy_pattern}
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="narrative" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border rounded-md p-3">
                  <h3 className="font-medium mb-2">叙事视角</h3>
                  <div className="text-sm">
                    <div className="mb-2">
                      <span className="text-gray-600">视角：</span>
                      {analysis.narrative.perspective}
                    </div>
                    <div className="mb-2">
                      <span className="text-gray-600">时间处理：</span>
                      {analysis.narrative.time_sequence}
                    </div>
                    <div>
                      <span className="text-gray-600">叙事态度：</span>
                      {analysis.narrative.narrator_attitude}
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-md p-3">
                  <h3 className="font-medium mb-2">情感特征</h3>
                  <div className="text-sm">
                    <div className="mb-2">
                      <span className="text-gray-600">情感强度：</span>
                      <div className="w-full h-6 bg-gray-200 rounded-full overflow-hidden mt-1">
                        <div 
                          className="h-full bg-amber-500 rounded-full"
                          style={{ width: `${parseInt(analysis.emotion.intensity) * 20}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="mb-2">
                      <span className="text-gray-600">表达方式：</span>
                      {analysis.emotion.expression_style}
                    </div>
                    <div>
                      <span className="text-gray-600">情感基调：</span>
                      {analysis.emotion.tone}
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="more" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border rounded-md p-3">
                  <h3 className="font-medium mb-2">思维特征</h3>
                  <div className="text-sm">
                    <div className="mb-2">
                      <span className="text-gray-600">思维推进：</span>
                      {analysis.thinking.logic_pattern}
                    </div>
                    <div className="mb-2">
                      <span className="text-gray-600">思维深度：</span>
                      <div className="w-full h-6 bg-gray-200 rounded-full overflow-hidden mt-1">
                        <div 
                          className="h-full bg-blue-500 rounded-full"
                          style={{ width: `${parseInt(analysis.thinking.depth) * 20}%` }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-600">思维节奏：</span>
                      {analysis.thinking.rhythm}
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-md p-3">
                  <h3 className="font-medium mb-2">个性标记</h3>
                  <div className="text-sm">
                    <div className="mb-2">
                      <span className="text-gray-600">标志性表达：</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {analysis.uniqueness.signature_phrases.map((phrase: string, index: number) => (
                          <span key={index} className="bg-purple-100 text-purple-800 px-2 py-0.5 rounded text-xs">
                            {phrase}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-600">意象系统：</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {analysis.uniqueness.imagery_system.map((image: string, index: number) => (
                          <span key={index} className="bg-pink-100 text-pink-800 px-2 py-0.5 rounded text-xs">
                            {image}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-md p-3">
                  <h3 className="font-medium mb-2">文化底蕴</h3>
                  <div className="text-sm">
                    <div className="mb-2">
                      <span className="text-gray-600">典故：</span>
                      {analysis.cultural.allusions.join("，")}
                    </div>
                    <div>
                      <span className="text-gray-600">知识领域：</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {analysis.cultural.knowledge_domains.map((domain: string, index: number) => (
                          <span key={index} className="bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded text-xs">
                            {domain}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-md p-3">
                  <h3 className="font-medium mb-2">韵律节奏</h3>
                  <div className="text-sm">
                    <div className="mb-2">
                      <span className="text-gray-600">音节特征：</span>
                      {analysis.rhythm.syllable_pattern}
                    </div>
                    <div className="mb-2">
                      <span className="text-gray-600">停顿规律：</span>
                      {analysis.rhythm.pause_pattern}
                    </div>
                    <div>
                      <span className="text-gray-600">节奏特征：</span>
                      {analysis.rhythm.tempo}
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
          
          {!collapsed && onBack && (
            <div className="mt-6">
              <Button 
                variant="outline" 
                onClick={onBack}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                {t("styleAnalysis.back")}
              </Button>
            </div>
          )}
        </>
      )}
    </Card>
  );
};

export default StyleAnalysis;
