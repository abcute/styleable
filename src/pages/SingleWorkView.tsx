
import { useState, useEffect } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Copy, Check, Star, StarOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import { getWorks, toggleFavorite } from "@/data/works";
import Navbar from "@/components/Navbar";

const SingleWorkView = () => {
  const { id } = useParams<{ id: string }>();
  const { t, language } = useLanguage();
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [work, setWork] = useState<any>(null);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (id) {
      const allWorks = getWorks();
      const foundWork = allWorks.find(w => w.id === parseInt(id));
      setWork(foundWork || null);
    }
  }, [id]);

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // If work not found or doesn't belong to user
  if (!work || (user && work.userId !== user.id)) {
    return <Navigate to="/my-works" />;
  }

  const handleToggleFavorite = () => {
    if (id) {
      const updatedWork = toggleFavorite(parseInt(id));
      if (updatedWork) {
        setWork(updatedWork);
        toast({
          title: updatedWork.favorite ? 
            t("myWorks.addedToFavorites") : 
            t("myWorks.removedFromFavorites"),
          duration: 2000
        });
      }
    }
  };

  const handleCopyText = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      toast({
        title: t("toast.copySuccess"),
        duration: 2000,
      });
      
      setTimeout(() => {
        setIsCopied(false);
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

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Link to="/my-works">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                {t("myWorks.backToWorks")}
              </Button>
            </Link>
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
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">{getLocalizedTitle(work.title)}</CardTitle>
            <div className="flex flex-wrap gap-2 mt-2">
              {work.keywords.split(',').map((keyword: string, index: number) => (
                <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                  {keyword.trim()}
                </span>
              ))}
            </div>
            <p className="text-gray-500 text-sm mt-2">{work.date}</p>
          </CardHeader>
        </Card>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>{t("myWorks.originalText")}</CardTitle>
            </CardHeader>
            <CardContent className="whitespace-pre-line">
              <div className="text-gray-700">
                {work.originalText}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleCopyText(work.originalText)}
                className="mt-4 flex items-center gap-1"
              >
                {isCopied ? (
                  <>
                    <Check className="h-4 w-4 text-green-500" />
                    {t("finalContent.copied")}
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    {t("finalContent.copyText")}
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
          
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>{t("myWorks.mimicText")}</CardTitle>
            </CardHeader>
            <CardContent className="whitespace-pre-line">
              <div className="text-gray-700">
                {work.mimicText}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleCopyText(work.mimicText)}
                className="mt-4 flex items-center gap-1"
              >
                {isCopied ? (
                  <>
                    <Check className="h-4 w-4 text-green-500" />
                    {t("finalContent.copied")}
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    {t("finalContent.copyText")}
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
          
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>{t("myWorks.humanizedText")}</CardTitle>
            </CardHeader>
            <CardContent className="whitespace-pre-line">
              <div className="text-gray-700">
                {work.humanizedText}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleCopyText(work.humanizedText)}
                className="mt-4 flex items-center gap-1"
              >
                {isCopied ? (
                  <>
                    <Check className="h-4 w-4 text-green-500" />
                    {t("finalContent.copied")}
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    {t("finalContent.copyText")}
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default SingleWorkView;
