
import React, { useState, useEffect } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Copy, Check, Star, StarOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import { getWorkById, toggleWorkFavorite } from "@/utils/supabaseUtils";
import Navbar from "@/components/Navbar";

interface Work {
  id: string;
  user_id: string;
  title: string;
  keywords: string | null;
  original_text: string;
  mimic_text: string | null;
  humanized_text: string | null;
  favorite: boolean;
  created_at: string;
  updated_at: string;
  style_id: string | null;
}

const SingleWorkView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t, language } = useLanguage();
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [work, setWork] = useState<Work | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id && user) {
      loadWork();
    }
  }, [id, user]);

  const loadWork = async () => {
    if (!id) return;
    
    setIsLoading(true);
    try {
      const workData = await getWorkById(id);
      setWork(workData);
    } catch (error) {
      console.error('Error loading work:', error);
      toast({
        title: "加载失败",
        description: "无法加载作品详情",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <p className="text-center">加载中...</p>
        </main>
      </div>
    );
  }

  if (!work || (user && work.user_id !== user.id)) {
    return <Navigate to="/my-works" />;
  }

  const handleToggleFavorite = async () => {
    if (!id) return;
    
    try {
      const updatedWork = await toggleWorkFavorite(id, !work.favorite);
      setWork({ ...work, favorite: updatedWork.favorite });
      toast({
        title: updatedWork.favorite ? 
          t("myWorks.addedToFavorites") : 
          t("myWorks.removedFromFavorites"),
        duration: 2000
      });
    } catch (error) {
      console.error('Error toggling favorite:', error);
      toast({
        title: "操作失败",
        description: "无法更新收藏状态",
        variant: "destructive",
      });
    }
  };

  const handleCopyText = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      toast({
        title: t("toast.copySuccess"),
        duration: 2000,
      });
      
      setTimeout(() => {
        setCopiedField(null);
      }, 2000);
    } catch (err) {
      toast({
        title: t("toast.copyFail"),
        variant: "destructive",
      });
    }
  };

  const getLocalizedTitle = (title: string) => {
    if (language === 'en' && /[\u4e00-\u9fa5]/.test(title)) {
      return 'Spring Fields';
    }
    return title;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(language === 'en' ? 'en-US' : 'zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Link to="/my-works">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                {t("myWorks.backToWorks")}
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">{getLocalizedTitle(work.title)}</h1>
          </div>
          
          <Button
            variant={work.favorite ? "default" : "outline"}
            size="sm"
            onClick={handleToggleFavorite}
            className="flex items-center gap-1"
          >
            {work.favorite ? (
              <>
                <Star className="h-4 w-4" />
                {t("myWorks.favorited")}
              </>
            ) : (
              <>
                <StarOff className="h-4 w-4" />
                {t("myWorks.favorite")}
              </>
            )}
          </Button>
        </div>

        {/* Work Details */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>{t("myWorks.workDetails")}</CardTitle>
            {work.keywords && (
              <div className="flex flex-wrap gap-2 mt-2">
                {work.keywords.split(',').map((keyword: string, index: number) => (
                  <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                    {keyword.trim()}
                  </span>
                ))}
              </div>
            )}
            <p className="text-gray-500 text-sm mt-2">{formatDate(work.created_at)}</p>
          </CardHeader>
        </Card>

        {/* Content Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Original Text */}
          <Card>
            <CardHeader>
              <CardTitle>{t("myWorks.originalText")}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm max-w-none">
                <p className="whitespace-pre-line">{work.original_text}</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleCopyText(work.original_text, 'original')}
                className="mt-4 w-full flex items-center justify-center gap-1"
              >
                {copiedField === 'original' ? (
                  <>
                    <Check className="h-4 w-4 text-green-500" />
                    {t("toast.copied")}
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    {t("myWorks.copyText")}
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Mimic Text */}
          {work.mimic_text && (
            <Card>
              <CardHeader>
                <CardTitle>{t("myWorks.mimicText")}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-sm max-w-none">
                  <p className="whitespace-pre-line">{work.mimic_text}</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleCopyText(work.mimic_text!, 'mimic')}
                  className="mt-4 w-full flex items-center justify-center gap-1"
                >
                  {copiedField === 'mimic' ? (
                    <>
                      <Check className="h-4 w-4 text-green-500" />
                      {t("toast.copied")}
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" />
                      {t("myWorks.copyText")}
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Humanized Text */}
          {work.humanized_text && (
            <Card>
              <CardHeader>
                <CardTitle>{t("myWorks.humanizedText")}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-sm max-w-none">
                  <p className="whitespace-pre-line">{work.humanized_text}</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleCopyText(work.humanized_text!, 'humanized')}
                  className="mt-4 w-full flex items-center justify-center gap-1"
                >
                  {copiedField === 'humanized' ? (
                    <>
                      <Check className="h-4 w-4 text-green-500" />
                      {t("toast.copied")}
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" />
                      {t("myWorks.copyText")}
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};

export default SingleWorkView;
