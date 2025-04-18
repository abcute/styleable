
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import Navbar from "@/components/Navbar";
import GoogleLoginButton from "@/components/GoogleLoginButton";

const Login = () => {
  const { t } = useLanguage();
  const { googleLogin } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const handleGoogleSuccess = async (credentialResponse: any) => {
    try {
      const { error } = await googleLogin(credentialResponse);
      
      if (!error) {
        toast({
          title: t("auth.loginSuccess"),
        });
        navigate("/");
      } else {
        toast({
          title: t("auth.loginFailed"),
          description: t("auth.googleLoginError"),
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: t("auth.loginFailed"),
        description: t("auth.unexpectedError"),
        variant: "destructive",
      });
    }
  };

  const handleGoogleError = () => {
    toast({
      title: t("auth.loginFailed"),
      description: t("auth.googleLoginError"),
      variant: "destructive",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-16 flex justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">{t("auth.loginTitle")}</CardTitle>
            <CardDescription>{t("auth.loginDescription")}</CardDescription>
          </CardHeader>
          
          <CardContent className="flex justify-center py-8">
            <GoogleLoginButton 
              onSuccess={handleGoogleSuccess} 
              onError={handleGoogleError}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
