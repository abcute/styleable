
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import Navbar from "@/components/Navbar";
import GoogleLoginButton from "@/components/GoogleLoginButton";

const Login = () => {
  const { t } = useLanguage();
  const { login, googleLogin } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: t("auth.validationError"),
        description: t("auth.allFieldsRequired"),
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const success = await login(email, password);
      
      if (success) {
        toast({
          title: t("auth.loginSuccess"),
        });
        navigate("/");
      } else {
        toast({
          title: t("auth.loginFailed"),
          description: t("auth.invalidCredentials"),
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: t("auth.loginFailed"),
        description: t("auth.unexpectedError"),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse: any) => {
    setIsLoading(true);
    
    try {
      const success = await googleLogin(credentialResponse);
      
      if (success) {
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
    } finally {
      setIsLoading(false);
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
          
          <GoogleLoginButton 
            onSuccess={handleGoogleSuccess} 
            onError={handleGoogleError}
            className="px-6 py-2"
          />
          
          <div className="px-6 py-4">
            <Separator>
              <span className="mx-2 text-xs text-gray-500">{t("auth.orContinueWith")}</span>
            </Separator>
          </div>
          
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">{t("auth.email")}</Label>
                <Input 
                  id="email" 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  placeholder="your.email@example.com"
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="password">{t("auth.password")}</Label>
                </div>
                <Input 
                  id="password" 
                  type="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                />
              </div>
            </CardContent>
            
            <CardFooter className="flex flex-col space-y-4">
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600"
                disabled={isLoading}
              >
                {isLoading ? t("auth.loggingIn") : t("auth.login")}
              </Button>
              
              <div className="text-center text-sm">
                {t("auth.noAccount")}{" "}
                <Link to="/register" className="text-indigo-600 hover:text-indigo-800">
                  {t("auth.signUp")}
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Login;
