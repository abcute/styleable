
import React, { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/Navbar";
import { useLanguage } from "@/context/LanguageContext";
import { Work, getWorksByUserId, toggleFavorite } from '@/data/works';
import { useAuth } from '@/context/AuthContext';

const MyWorks: React.FC = () => {
  const { t, language } = useLanguage();
  const { user, isAuthenticated } = useAuth();
  const [works, setWorks] = useState<Work[]>([]);

  useEffect(() => {
    if (user) {
      const userWorks = getWorksByUserId(user.id);
      setWorks(userWorks);
    }
  }, [user]);

  const handleToggleFavorite = (workId: string) => {
    const updatedWork = toggleFavorite(workId);
    if (updatedWork && user) {
      setWorks(getWorksByUserId(user.id));
    }
  };

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  const getLocalizedTitle = (title: string) => {
    if (language === 'en' && /[\u4e00-\u9fa5]/.test(title)) {
      return 'Spring Fields';
    }
    return title;
  };

  const renderWorkCard = (work: Work) => (
    <Card key={work.id} className="overflow-hidden">
      <CardHeader className="bg-white pb-2">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-xl">{getLocalizedTitle(work.title)}</CardTitle>
            <CardDescription className="text-sm text-gray-500">
              {t("myWorks.keywords")}: {work.keywords} | {t("myWorks.date")}: {work.date}
            </CardDescription>
          </div>
          <Button 
            variant={work.favorite ? "default" : "outline"}
            size="sm"
            onClick={() => handleToggleFavorite(work.id)}
          >
            {work.favorite ? t("myWorks.favorited") : t("myWorks.favorite")}
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="pt-4">
        <h3 className="font-medium text-sm text-gray-500 mb-1">{t("myWorks.originalText")}:</h3>
        <p className="text-gray-700 line-clamp-2 mb-3">{work.originalText}</p>
        
        <h3 className="font-medium text-sm text-gray-500 mb-1">{t("myWorks.mimicText")}:</h3>
        <p className="text-gray-700 line-clamp-2 mb-3">{work.mimicText}</p>
        
        <h3 className="font-medium text-sm text-gray-500 mb-1">{t("myWorks.humanizedText")}:</h3>
        <p className="text-gray-700 line-clamp-2">{work.humanizedText}</p>
      </CardContent>
      
      <CardFooter className="flex justify-end bg-gray-50 py-3">
        <Link to={`/work/${work.id}`}>
          <Button variant="outline" size="sm">
            {t("myWorks.viewFull")}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">{t("myWorks.title")}</h1>
        
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="all">{t("myWorks.allWorks")}</TabsTrigger>
            <TabsTrigger value="favorite">{t("myWorks.favoriteWorks")}</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-6">
            {works.length > 0 ? (
              works.map(renderWorkCard)
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">{t("myWorks.noWorks")}</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="favorite" className="space-y-6">
            {works.filter(work => work.favorite).length > 0 ? (
              works.filter(work => work.favorite).map(renderWorkCard)
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">{t("myWorks.noFavorites")}</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default MyWorks;
