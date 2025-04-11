
import { useState } from "react";
import { FileText, ChevronRight, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import { useToast } from "@/hooks/use-toast";

interface WorkItem {
  id: string;
  title: string;
  date: string;
  preview: string;
}

const MyWorks = () => {
  const { toast } = useToast();
  // Mock data for works - in a real app, this would come from an API or storage
  const [works, setWorks] = useState<WorkItem[]>([
    {
      id: "work1",
      title: "山水间的思考",
      date: "2025-04-10",
      preview: "走进这座山中小镇的第一天，我就被它独特的气息所吸引。清晨的雾气缭绕在古老的木屋间..."
    },
    {
      id: "work2",
      title: "城市的记忆",
      date: "2025-04-05",
      preview: "城市的记忆像是一张密集交织的网，每个路口都藏着一段故事，每栋建筑都承载着时间的重量..."
    },
    {
      id: "work3",
      title: "关于时间的随想",
      date: "2025-03-29",
      preview: "时间是最公平也最残酷的裁判，它不偏不倚地流淌，却又无情地将一切带走..."
    }
  ]);

  const handleViewWork = (id: string) => {
    toast({
      title: "查看作品",
      description: "正在开发中，敬请期待",
    });
  };

  const handleDeleteWork = (id: string) => {
    setWorks(works.filter(work => work.id !== id));
    toast({
      title: "删除成功",
      description: "已删除选中的作品",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">我的作品</h1>
          <Button variant="outline" className="gap-2">
            <Calendar className="h-4 w-4" /> 按日期排序
          </Button>
        </div>
        
        {works.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {works.map(work => (
              <Card key={work.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <FileText className="h-5 w-5 text-indigo-600" />
                    <span className="text-sm text-gray-500">{work.date}</span>
                  </div>
                  <CardTitle className="mt-2">{work.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="line-clamp-3">
                    {work.preview}
                  </CardDescription>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="ghost" size="sm" className="gap-1" onClick={() => handleViewWork(work.id)}>
                    查看全文 <ChevronRight className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700" 
                    onClick={() => handleDeleteWork(work.id)}>
                    删除
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-medium text-gray-600 mb-2">暂无作品</h2>
            <p className="text-gray-500 mb-6">您还没有创建任何仿写作品</p>
            <Button asChild>
              <Link to="/">开始创作</Link>
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};

export default MyWorks;
