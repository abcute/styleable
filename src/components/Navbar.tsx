
import { BookOpen, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-indigo-600" />
          <Link to="/" className="font-bold text-xl text-gray-900">风格仿写大师</Link>
        </div>
        
        <div className="flex items-center gap-4">
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-gray-600 hover:text-gray-900 transition-colors">首页</Link>
            <Link to="#" className="text-gray-600 hover:text-gray-900 transition-colors">使用指南</Link>
            <Link to="/my-works" className="text-gray-600 hover:text-gray-900 transition-colors">我的作品</Link>
          </nav>
          
          <Button variant="ghost" className="text-gray-600">登录</Button>
          <Button className="bg-indigo-600 hover:bg-indigo-700">注册</Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
