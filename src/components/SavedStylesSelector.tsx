
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import { getUserStyles, deleteUserStyle } from "@/utils/supabaseUtils";

interface SavedStyle {
  id: string;
  style_name: string;
  style_data: any;
  created_at: string;
}

interface SavedStylesSelectorProps {
  onStyleSelect: (styleData: any, styleName: string) => void;
  className?: string;
}

const SavedStylesSelector: React.FC<SavedStylesSelectorProps> = ({ 
  onStyleSelect, 
  className 
}) => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { toast } = useToast();
  const [styles, setStyles] = useState<SavedStyle[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      loadUserStyles();
    }
  }, [user]);

  const loadUserStyles = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const userStyles = await getUserStyles(user.id);
      setStyles(userStyles);
    } catch (error) {
      console.error('Error loading styles:', error);
      toast({
        title: "加载失败",
        description: "无法加载已保存的风格",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteStyle = async (styleId: string) => {
    try {
      await deleteUserStyle(styleId);
      setStyles(styles.filter(style => style.id !== styleId));
      toast({
        title: "删除成功",
        description: "风格已删除",
      });
    } catch (error) {
      console.error('Error deleting style:', error);
      toast({
        title: "删除失败",
        description: "无法删除风格",
        variant: "destructive",
      });
    }
  };

  const handleStyleSelect = (style: SavedStyle) => {
    onStyleSelect(style.style_data, style.style_name);
    toast({
      title: "风格已选择",
      description: `已选择风格：${style.style_name}`,
    });
  };

  if (!user) {
    return (
      <Card className={className}>
        <CardContent className="pt-6">
          <p className="text-center text-gray-500">请先登录以查看已保存的风格</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5" />
          已保存的风格
        </CardTitle>
        <CardDescription>
          选择之前分析过的写作风格直接开始仿写
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <p className="text-center py-4">加载中...</p>
        ) : styles.length === 0 ? (
          <p className="text-center text-gray-500 py-4">
            还没有保存的风格。分析一些文本后，风格会自动保存到这里。
          </p>
        ) : (
          <div className="space-y-3">
            {styles.map((style) => (
              <div key={style.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex-1">
                  <h3 className="font-medium">{style.style_name}</h3>
                  <p className="text-sm text-gray-500">
                    保存于 {new Date(style.created_at).toLocaleDateString('zh-CN')}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => handleStyleSelect(style)}
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                  >
                    使用此风格
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDeleteStyle(style.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SavedStylesSelector;
