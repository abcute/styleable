
import { useLanguage } from "@/context/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();
  
  return (
    <footer className="bg-white/50 dark:bg-black/30 backdrop-blur-sm py-4 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 text-center text-sm text-gray-600 dark:text-gray-400">
        {t("footer.copyright")}
      </div>
    </footer>
  );
};

export default Footer;
