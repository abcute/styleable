
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/context/LanguageContext";
import Navbar from "@/components/Navbar";
import GoogleLoginButton from "@/components/GoogleLoginButton";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";

const Register = () => {
  const { t } = useLanguage();
  const { isAuthenticated, googleLogin } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Redirect to home if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleGoogleLogin = async () => {
    try {
      await googleLogin();
      // The redirect will happen automatically by Supabase
    } catch (error: any) {
      toast({
        title: t("auth.registerFailed"),
        description: error.message || t("auth.googleLoginError"),
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-16 flex justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">{t("auth.registerTitle")}</CardTitle>
            <CardDescription>{t("auth.registerDescription")}</CardDescription>
          </CardHeader>
          
          <CardContent className="flex flex-col items-center py-8 space-y-6">
            <GoogleLoginButton 
              onClick={handleGoogleLogin}
            />
            
            <div className="text-center text-sm">
              {t("auth.haveAccount")}{" "}
              <Link to="/login" className="text-indigo-600 hover:text-indigo-800">
                {t("auth.signIn")}
              </Link>
            </div>
          </CardContent>
          
          <CardFooter className="flex justify-center">
            <p className="text-center text-sm text-gray-500">
              {t("auth.termsText")}
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Register;
