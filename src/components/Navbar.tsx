
import { BookOpen, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import LanguageSwitcher from "./LanguageSwitcher";
import { useLanguage } from "@/context/LanguageContext";

const Navbar = () => {
  const { t } = useLanguage();
  
  return (
    <header className="bg-white/50 backdrop-blur-md shadow-sm dark:bg-black/30">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-indigo-600" />
          <Link to="/" className="font-bold text-xl text-transparent bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 bg-clip-text">
            Styleable
          </Link>
        </div>
        
        <div className="flex items-center gap-4">
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-gray-600 hover:text-indigo-600 transition-colors dark:text-gray-300 dark:hover:text-indigo-400">{t("navbar.home")}</Link>
            <Link to="/guide" className="text-gray-600 hover:text-indigo-600 transition-colors dark:text-gray-300 dark:hover:text-indigo-400">{t("navbar.guide")}</Link>
            <Link to="/my-works" className="text-gray-600 hover:text-indigo-600 transition-colors dark:text-gray-300 dark:hover:text-indigo-400">{t("navbar.works")}</Link>
          </nav>
          
          <LanguageSwitcher />
          <Button variant="ghost" className="text-gray-600 dark:text-gray-300">{t("navbar.login")}</Button>
          <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">{t("navbar.register")}</Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
