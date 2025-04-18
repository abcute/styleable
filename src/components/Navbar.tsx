
import { BookOpen, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import LanguageSwitcher from "./LanguageSwitcher";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";

const Navbar = () => {
  const { t } = useLanguage();
  const { user, isAuthenticated, logout } = useAuth();
  
  // Get display name from user metadata or email
  const displayName = user?.user_metadata?.name || user?.user_metadata?.full_name || user?.email || '';
  
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
          
          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 dark:text-gray-300 hidden md:inline-block">
                {displayName}
              </span>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-gray-600 dark:text-gray-300"
                onClick={logout}
              >
                <LogOut className="h-4 w-4 mr-1" />
                {t("navbar.logout")}
              </Button>
            </div>
          ) : (
            <Link to="/login">
              <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
                {t("navbar.login")}
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
