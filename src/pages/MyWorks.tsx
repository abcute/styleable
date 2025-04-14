
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/Navbar";

// Mock data for demonstration
const mockWorks = [
  {
    id: 1,
    title: "春日田野",
    keywords: "田野,春天,农耕",
    originalText: "春风拂过田野，麦苗随风摇曳...",
    mimicText: "在这片广袤的田野上，春天悄然而至...",
    humanizedText: "今天去田野走了一圈，腿有点酸...春风吹得脸痒痒的...",
    date: "2025-04-12",
    favorite: true
  },
  {
    id: 2,
    title: "城市夜景",
    keywords: "城市,夜景,灯光",
    originalText: "华灯初上，城市开始了它的不眠之夜...",
    mimicText: "当夜幕降临，城市的另一面徐徐展开...",
    humanizedText: "晚上加完班走在回家的路上，这城市的灯光可真亮啊...",
    date: "2025-04-10",
    favorite: false
  },
  {
    id: 3,
    title: "咖啡店一角",
    keywords: "咖啡,休闲,阅读",
    originalText: "在这家隐秘的咖啡店里，时光仿佛慢了下来...",
    mimicText: "我常常造访的那家咖啡店，有一个不为人知的角落...",
    humanizedText: "嗯...这咖啡有点苦，不过坐在窗边感觉还不错...",
    date: "2025-04-05",
    favorite: true
  },
];

const MyWorks: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">我的作品</h1>
        
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="all">全部作品</TabsTrigger>
            <TabsTrigger value="favorite">收藏作品</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-6">
            {mockWorks.map(work => (
              <Card key={work.id} className="overflow-hidden">
                <CardHeader className="bg-white pb-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle className="text-xl">{work.title}</CardTitle>
                      <CardDescription className="text-sm text-gray-500">
                        关键词: {work.keywords} | 创建日期: {work.date}
                      </CardDescription>
                    </div>
                    <Button 
                      variant={work.favorite ? "default" : "outline"}
                      size="sm"
                    >
                      {work.favorite ? "已收藏" : "收藏"}
                    </Button>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-4">
                  <h3 className="font-medium text-sm text-gray-500 mb-1">原文片段:</h3>
                  <p className="text-gray-700 line-clamp-2 mb-3">{work.originalText}</p>
                  
                  <h3 className="font-medium text-sm text-gray-500 mb-1">仿写片段:</h3>
                  <p className="text-gray-700 line-clamp-2 mb-3">{work.mimicText}</p>
                  
                  <h3 className="font-medium text-sm text-gray-500 mb-1">人味化片段:</h3>
                  <p className="text-gray-700 line-clamp-2">{work.humanizedText}</p>
                </CardContent>
                
                <CardFooter className="flex justify-end bg-gray-50 py-3">
                  <Button variant="outline" size="sm">
                    查看全文
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </TabsContent>
          
          <TabsContent value="favorite" className="space-y-6">
            {mockWorks.filter(work => work.favorite).map(work => (
              <Card key={work.id} className="overflow-hidden">
                <CardHeader className="bg-white pb-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle className="text-xl">{work.title}</CardTitle>
                      <CardDescription className="text-sm text-gray-500">
                        关键词: {work.keywords} | 创建日期: {work.date}
                      </CardDescription>
                    </div>
                    <Button 
                      variant="default"
                      size="sm"
                    >
                      已收藏
                    </Button>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-4">
                  <h3 className="font-medium text-sm text-gray-500 mb-1">原文片段:</h3>
                  <p className="text-gray-700 line-clamp-2 mb-3">{work.originalText}</p>
                  
                  <h3 className="font-medium text-sm text-gray-500 mb-1">仿写片段:</h3>
                  <p className="text-gray-700 line-clamp-2 mb-3">{work.mimicText}</p>
                  
                  <h3 className="font-medium text-sm text-gray-500 mb-1">人味化片段:</h3>
                  <p className="text-gray-700 line-clamp-2">{work.humanizedText}</p>
                </CardContent>
                
                <CardFooter className="flex justify-end bg-gray-50 py-3">
                  <Link to={`/work/${work.id}`}>
                    <Button variant="outline" size="sm">
                      查看全文
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
            
            {mockWorks.filter(work => work.favorite).length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">暂无收藏作品</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default MyWorks;
