
import React from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";
import { GoogleLogin } from "@react-oauth/google";

interface GoogleLoginButtonProps {
  onSuccess: (credentialResponse: any) => void;
  onError: () => void;
  className?: string;
}

const GoogleLoginButton: React.FC<GoogleLoginButtonProps> = ({ 
  onSuccess, 
  onError,
  className
}) => {
  const { t } = useLanguage();

  return (
    <div className={`${className || ""} flex justify-center`}>
      <GoogleLogin
        onSuccess={onSuccess}
        onError={onError}
        useOneTap
        theme="outline"
        shape="rectangular"
        text="signin_with"
        locale={t("language.code")}
        width="300"
      />
    </div>
  );
};

export default GoogleLoginButton;
