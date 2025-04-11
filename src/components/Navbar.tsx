
import { BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-indigo-600" />
          <span className="font-bold text-xl text-gray-900">风格仿写大师</span>
        </div>
        
        <div className="flex items-center gap-4">
          <nav className="hidden md:flex items-center gap-6">
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">首页</a>
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">使用指南</a>
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">作品展示</a>
          </nav>
          
          <Button variant="ghost" className="text-gray-600">登录</Button>
          <Button className="bg-indigo-600 hover:bg-indigo-700">注册</Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
