
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
import { useLanguage } from "@/context/LanguageContext";

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
  const { t } = useLanguage();
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<DetectionResult | null>(null);

  const handleDetection = async () => {
    if (!inputText.trim()) {
      toast({
        title: t("aiDetector.inputTextRequired"),
        description: t("aiDetector.inputTextRequiredDesc"),
        variant: "destructive",
      });
      return;
    }

    if (inputText.trim().length < 50) {
      toast({
        title: t("aiDetector.textTooShort"),
        description: t("aiDetector.textTooShortDesc"),
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const detectionResult = await detectAIContent(inputText);
      setResult(detectionResult);
      toast({
        title: t("aiDetector.detectionComplete"),
        description: t("aiDetector.detectionCompleteDesc"),
      });
    } catch (error) {
      console.error("AI detection error:", error);
      toast({
        title: t("aiDetector.detectionFailed"),
        description: t("aiDetector.detectionFailedDesc"),
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
              {t("aiDetector.title")}
            </h1>
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              {t("aiDetector.description")}
            </p>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                {t("aiDetector.inputTitle")}
              </CardTitle>
              <CardDescription>
                {t("aiDetector.inputDescription")}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder={t("aiDetector.placeholder")}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="min-h-[200px] resize-none"
              />
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  {inputText.length} {t("aiDetector.characterCount")}
                </span>
                <Button 
                  onClick={handleDetection}
                  disabled={isLoading || !inputText.trim()}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                >
                  {isLoading ? t("aiDetector.detecting") : t("aiDetector.startDetection")}
                </Button>
              </div>
            </CardContent>
          </Card>

          {result && (
            <div className="space-y-6">
              {/* 检测结果概览 */}
              <Card>
                <CardHeader>
                  <CardTitle>{t("aiDetector.results")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <div className="mb-2">
                        <span className="text-sm font-medium">{t("aiDetector.aiProbability")}</span>
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
                        <span className="text-sm font-medium">{t("aiDetector.confidenceLevel")}</span>
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
                  <CardTitle>{t("aiDetector.forensicEvidence")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-3">{t("aiDetector.primaryIndicators")}</h4>
                      <div className="space-y-2">
                        {result.forensic_evidence.primary_indicators.map((indicator, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <div className="flex items-center gap-2">
                              {getSeverityIcon(indicator.severity)}
                              <span className="font-medium">{indicator.indicator}</span>
                            </div>
                            <div className="text-right">
                              <div className="text-sm text-gray-600 dark:text-gray-300">
                                {t("aiDetector.currentValue")}: {indicator.value} | {t("aiDetector.baseline")}: {indicator.baseline}
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
                      <h4 className="font-medium mb-3">{t("aiDetector.modelSignature")}</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                          <div className="text-sm text-gray-600 dark:text-gray-300">{t("aiDetector.topCandidate")}</div>
                          <div className="font-medium">{result.forensic_evidence.model_signature.top_candidate}</div>
                        </div>
                        <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          <div className="text-sm text-gray-600 dark:text-gray-300">{t("aiDetector.alternative")}</div>
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
                  <CardTitle>{t("aiDetector.segmentAnalysis")}</CardTitle>
                  <CardDescription>
                    {t("aiDetector.segmentAnalysisDesc")}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {result.segment_analysis.map((segment, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div className="text-sm text-gray-600 dark:text-gray-300">
                            {t("aiDetector.position")}: {segment.offset}
                          </div>
                          <Badge variant={segment.anomaly_score > 0.7 ? 'destructive' : segment.anomaly_score > 0.4 ? 'default' : 'secondary'}>
                            {t("aiDetector.anomalyScore")}: {(segment.anomaly_score * 100).toFixed(1)}%
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
                  <CardTitle>{t("aiDetector.robustnessReport")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <div className="mb-2">
                        <span className="text-sm font-medium">{t("aiDetector.adversarialScore")}</span>
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
                        <span className="text-sm font-medium">{t("aiDetector.detectedManipulations")}</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {result.robustness_report.detected_manipulations.length > 0 ? (
                          result.robustness_report.detected_manipulations.map((manipulation, index) => (
                            <Badge key={index} variant="outline">
                              {manipulation}
                            </Badge>
                          ))
                        ) : (
                          <span className="text-sm text-gray-500">{t("aiDetector.noManipulations")}</span>
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
