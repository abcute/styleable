
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Search, AlertTriangle, CheckCircle, Info } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { detectAIContent } from "@/utils/aiDetectorUtils";

interface DetectionResult {
  verdict: {
    ai_probability: number;
    confidence_band: string;
  };
  forensic_evidence: {
    primary_indicators: Array<{
      indicator: string;
      value: number;
      baseline: number;
      severity: string;
    }>;
    model_signature: {
      top_candidate: string;
      alternative: string;
    };
  };
  segment_analysis: Array<{
    offset: string;
    content_snippet: string;
    anomaly_score: number;
    key_metrics: string[];
  }>;
  robustness_report: {
    adversarial_score: number;
    detected_manipulations: string[];
  };
}

const AIDetector = () => {
  const { toast } = useToast();
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<DetectionResult | null>(null);

  const handleDetection = async () => {
    if (!inputText.trim()) {
      toast({
        title: "请输入文本",
        description: "请输入需要检测的文本内容",
        variant: "destructive",
      });
      return;
    }

    if (inputText.trim().length < 50) {
      toast({
        title: "文本过短",
        description: "为了确保检测准确性，请输入至少50个字符的文本",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const detectionResult = await detectAIContent(inputText);
      setResult(detectionResult);
      toast({
        title: "检测完成",
        description: "AI内容检测已完成",
      });
    } catch (error) {
      console.error("AI detection error:", error);
      toast({
        title: "检测失败",
        description: "AI检测过程中出现错误，请稍后重试",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getConfidenceColor = (band: string) => {
    switch (band) {
      case "A+": return "bg-red-500";
      case "A": return "bg-orange-500";
      case "B+": return "bg-yellow-500";
      case "B": return "bg-blue-500";
      case "C": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity.toLowerCase()) {
      case "high": return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case "medium": return <Info className="h-4 w-4 text-yellow-500" />;
      case "low": return <CheckCircle className="h-4 w-4 text-green-500" />;
      default: return <Info className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-indigo-900/20 dark:via-purple-900/20 dark:to-pink-900/20 flex flex-col">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 flex-1">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 text-transparent bg-clip-text">
              AI 内容检测器
            </h1>
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              使用先进的机器学习算法检测文本是否由AI生成
            </p>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                文本检测
              </CardTitle>
              <CardDescription>
                输入需要检测的文本内容，我们将分析其由AI生成的概率
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="请输入需要检测的文本内容（至少50个字符）..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="min-h-[200px] resize-none"
              />
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  {inputText.length} 字符
                </span>
                <Button 
                  onClick={handleDetection}
                  disabled={isLoading || !inputText.trim()}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                >
                  {isLoading ? "检测中..." : "开始检测"}
                </Button>
              </div>
            </CardContent>
          </Card>

          {result && (
            <div className="space-y-6">
              {/* 检测结果概览 */}
              <Card>
                <CardHeader>
                  <CardTitle>检测结果</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <div className="mb-2">
                        <span className="text-sm font-medium">AI生成概率</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Progress 
                          value={result.verdict.ai_probability * 100} 
                          className="flex-1" 
                        />
                        <span className="text-2xl font-bold">
                          {(result.verdict.ai_probability * 100).toFixed(1)}%
                        </span>
                      </div>
                    </div>
                    <div>
                      <div className="mb-2">
                        <span className="text-sm font-medium">置信度等级</span>
                      </div>
                      <Badge className={`${getConfidenceColor(result.verdict.confidence_band)} text-white`}>
                        {result.verdict.confidence_band}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 法证证据 */}
              <Card>
                <CardHeader>
                  <CardTitle>法证证据分析</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-3">主要指标</h4>
                      <div className="space-y-2">
                        {result.forensic_evidence.primary_indicators.map((indicator, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <div className="flex items-center gap-2">
                              {getSeverityIcon(indicator.severity)}
                              <span className="font-medium">{indicator.indicator}</span>
                            </div>
                            <div className="text-right">
                              <div className="text-sm text-gray-600 dark:text-gray-300">
                                当前值: {indicator.value} | 基线: {indicator.baseline}
                              </div>
                              <Badge variant={indicator.severity.toLowerCase() === 'high' ? 'destructive' : 'secondary'}>
                                {indicator.severity}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-3">模型特征匹配</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                          <div className="text-sm text-gray-600 dark:text-gray-300">主要候选</div>
                          <div className="font-medium">{result.forensic_evidence.model_signature.top_candidate}</div>
                        </div>
                        <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          <div className="text-sm text-gray-600 dark:text-gray-300">备选候选</div>
                          <div className="font-medium">{result.forensic_evidence.model_signature.alternative}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 分段分析 */}
              <Card>
                <CardHeader>
                  <CardTitle>分段分析</CardTitle>
                  <CardDescription>
                    对文本不同片段的详细分析结果
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {result.segment_analysis.map((segment, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div className="text-sm text-gray-600 dark:text-gray-300">
                            位置: {segment.offset}
                          </div>
                          <Badge variant={segment.anomaly_score > 0.7 ? 'destructive' : segment.anomaly_score > 0.4 ? 'default' : 'secondary'}>
                            异常分数: {(segment.anomaly_score * 100).toFixed(1)}%
                          </Badge>
                        </div>
                        <div className="mb-3 p-3 bg-gray-50 dark:bg-gray-800 rounded italic">
                          {segment.content_snippet}
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {segment.key_metrics.map((metric, metricIndex) => (
                            <Badge key={metricIndex} variant="outline">
                              {metric}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* 鲁棒性报告 */}
              <Card>
                <CardHeader>
                  <CardTitle>鲁棒性报告</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <div className="mb-2">
                        <span className="text-sm font-medium">对抗攻击抵抗分数</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Progress value={result.robustness_report.adversarial_score} className="flex-1" />
                        <span className="text-lg font-bold">
                          {result.robustness_report.adversarial_score}/100
                        </span>
                      </div>
                    </div>
                    <div>
                      <div className="mb-2">
                        <span className="text-sm font-medium">检测到的操作手法</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {result.robustness_report.detected_manipulations.length > 0 ? (
                          result.robustness_report.detected_manipulations.map((manipulation, index) => (
                            <Badge key={index} variant="outline">
                              {manipulation}
                            </Badge>
                          ))
                        ) : (
                          <span className="text-sm text-gray-500">未检测到操作手法</span>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AIDetector;
