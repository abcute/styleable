import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Language = "en" | "zh";

type TranslationKeys = {
  navbar: {
    home: string;
    guide: string;
    works: string;
    login: string;
    register: string;
    logout: string;
    aiDetector: string;
  };
  steps: {
    analyzeOriginal: string;
    topicKeywords: string;
    generateMimic: string;
    getFinal: string;
  };
  originalText: {
    title: string;
    placeholder: string;
    analyze: string;
  };
  styleAnalysis: {
    title: string;
    overview: string;
    language: string;
    structure: string;
    narrative: string;
    more: string;
    back: string;
    collapse: string;
    expand: string;
  };
  topicInput: {
    title: string;
    placeholder: string;
    generate: string;
  };
  mimicPreview: {
    title: string;
    collapse: string;
    expand: string;
    back: string;
    humanize: string;
    processing: string;
  };
  finalContent: {
    title: string;
    unlock: string;
    unlockTitle: string;
    unlockDesc: string;
    unlockButton: string;
    copyText: string;
    copied: string;
    download: string;
  };
  payment: {
    title: string;
    benefits: string;
    benefit1: string;
    benefit2: string;
    benefit3: string;
    processing: string;
    pay: string;
    secure: string;
  };
  toast: {
    analyzeSuccess: string;
    analyzeFail: string;
    generateSuccess: string;
    generateFail: string;
    humanizeSuccess: string;
    humanizeFail: string;
    paymentSuccess: string;
    copySuccess: string;
    copyFail: string;
  };
  footer: {
    copyright: string;
  };
  myWorks: {
    title: string;
    allWorks: string;
    favoriteWorks: string;
    favorite: string;
    favorited: string;
    keywords: string;
    date: string;
    originalText: string;
    mimicText: string;
    humanizedText: string;
    viewFull: string;
    noFavorites: string;
    noWorks: string;
  };
  auth: {
    loginTitle: string;
    loginDescription: string;
    registerTitle: string;
    registerDescription: string;
    email: string;
    password: string;
    confirmPassword: string;
    name: string;
    namePlaceholder: string;
    login: string;
    register: string;
    loggingIn: string;
    registering: string;
    noAccount: string;
    haveAccount: string;
    signUp: string;
    signIn: string;
    validationError: string;
    allFieldsRequired: string;
    passwordsMismatch: string;
    loginSuccess: string;
    loginFailed: string;
    registerSuccess: string;
    registerFailed: string;
    invalidCredentials: string;
    emailExists: string;
    unexpectedError: string;
  }
};

const translations: Record<Language, TranslationKeys> = {
  en: {
    navbar: {
      home: "AI Article Rewriting",
      guide: "User Guide",
      works: "My Works",
      login: "Login",
      register: "Register",
      logout: "Logout",
      aiDetector: "AI Detector",
    },
    steps: {
      analyzeOriginal: "Analyze Original Style",
      topicKeywords: "Enter Topic Keywords",
      generateMimic: "Generate Mimic Article",
      getFinal: "Get Final Product",
    },
    originalText: {
      title: "Step 1: Enter Original Text",
      placeholder: "Paste the original text here. The system will analyze its writing style...",
      analyze: "Analyze Style",
    },
    styleAnalysis: {
      title: "Style Analysis Results",
      overview: "Style Overview",
      language: "Language Features",
      structure: "Structure Features",
      narrative: "Narrative Features",
      more: "More Features",
      back: "Back to Edit Original",
      collapse: "Collapse",
      expand: "Expand",
    },
    topicInput: {
      title: "Step 2: Enter Topic Keywords",
      placeholder: "Enter keywords for the topic you want to write about...",
      generate: "Generate Text",
    },
    mimicPreview: {
      title: "Generated Mimic Text",
      collapse: "Collapse",
      expand: "Expand",
      back: "Back to Edit Topic",
      humanize: "Add Human Touch",
      processing: "Processing...",
    },
    finalContent: {
      title: "Final Article",
      unlock: "Unlock Full Content",
      unlockTitle: "Unlock Complete Content",
      unlockDesc: "Pay $2.00 to view the full text",
      unlockButton: "Unlock Now",
      copyText: "Copy Text",
      copied: "Copied",
      download: "Download PDF",
    },
    payment: {
      title: "Unlock Complete Content",
      benefits: "You'll Get:",
      benefit1: "Complete 'humanized' article content",
      benefit2: "One-time download, no subscription needed",
      benefit3: "Permission to copy, download and share",
      processing: "Processing...",
      pay: "Pay $2.00 and Unlock",
      secure: "Secure payment, encrypted protection",
    },
    toast: {
      analyzeSuccess: "Analysis Complete",
      analyzeFail: "Analysis Failed",
      generateSuccess: "Generation Complete",
      generateFail: "Generation Failed",
      humanizeSuccess: "Processing Complete",
      humanizeFail: "Processing Failed",
      paymentSuccess: "Payment Successful",
      copySuccess: "Text copied to clipboard",
      copyFail: "Failed to copy text, please try again",
    },
    footer: {
      copyright: "©2025 Styleable.AI All Rights Reserved",
    },
    myWorks: {
      title: "My Works",
      allWorks: "All Works",
      favoriteWorks: "Favorite Works",
      favorite: "Favorite",
      favorited: "Favorited",
      keywords: "Keywords",
      date: "Created",
      originalText: "Original Text",
      mimicText: "Mimic Text",
      humanizedText: "Humanized Text",
      viewFull: "View Full",
      noFavorites: "No favorite works yet",
      noWorks: "You haven't created any works yet",
    },
    auth: {
      loginTitle: "Welcome Back",
      loginDescription: "Sign in to your account",
      registerTitle: "Create an Account",
      registerDescription: "Sign up to get started",
      email: "Email",
      password: "Password",
      confirmPassword: "Confirm Password",
      name: "Full Name",
      namePlaceholder: "John Doe",
      login: "Sign In",
      register: "Sign Up",
      loggingIn: "Signing In...",
      registering: "Creating Account...",
      noAccount: "Don't have an account?",
      haveAccount: "Already have an account?",
      signUp: "Sign Up",
      signIn: "Sign In",
      validationError: "Invalid Input",
      allFieldsRequired: "All fields are required",
      passwordsMismatch: "Passwords do not match",
      loginSuccess: "Successfully signed in!",
      loginFailed: "Login Failed",
      registerSuccess: "Account created successfully!",
      registerFailed: "Registration Failed",
      invalidCredentials: "Invalid email or password",
      emailExists: "An account with this email already exists",
      unexpectedError: "An unexpected error occurred",
    },
  },
  zh: {
    navbar: {
      home: "AI文章仿写",
      guide: "使用指南",
      works: "我的作品",
      login: "登录",
      register: "注册",
      logout: "退出登录",
      aiDetector: "AI检测器",
    },
    steps: {
      analyzeOriginal: "分析原文风格",
      topicKeywords: "输入主题关键词",
      generateMimic: "生成仿写文章",
      getFinal: "获取最终成品",
    },
    originalText: {
      title: "步骤一：输入原始文章",
      placeholder: "请粘贴原始文章内容，系统将分析其写作风格...",
      analyze: "分析风格",
    },
    styleAnalysis: {
      title: "风格分析结果",
      overview: "风格概述",
      language: "语言特征",
      structure: "结构特征",
      narrative: "叙事特征",
      more: "更多特征",
      back: "返回修改原文",
      collapse: "收起",
      expand: "展开",
    },
    topicInput: {
      title: "步骤二：输入主题关键词",
      placeholder: "请输入想要写作的主题关键词...",
      generate: "生成文章",
    },
    mimicPreview: {
      title: "生成的仿写文章",
      collapse: "收起",
      expand: "展开",
      back: "返回修改主题",
      humanize: "增加人味",
      processing: "处理中...",
    },
    finalContent: {
      title: "最终文章",
      unlock: "解锁完整内容",
      unlockTitle: "解锁完整内容",
      unlockDesc: "支付 $2.00 美元即可查看全文",
      unlockButton: "立即解锁",
      copyText: "复制全文",
      copied: "已复制",
      download: "下载 PDF",
    },
    payment: {
      title: "解锁完整内容",
      benefits: "您将获得：",
      benefit1: "完整的人味文章内容",
      benefit2: "一次性下载，无需订阅",
      benefit3: "可复制、下载和分享的权限",
      processing: "处理中...",
      pay: "支付 $2.00 并解锁",
      secure: "安全支付，信息加密保护",
    },
    toast: {
      analyzeSuccess: "分析完成",
      analyzeFail: "分析失败",
      generateSuccess: "生成完成",
      generateFail: "生成失败",
      humanizeSuccess: "处理完成",
      humanizeFail: "处理失败",
      paymentSuccess: "支付成功",
      copySuccess: "全文已复制到剪贴板",
      copyFail: "无法复制文本，请重试",
    },
    footer: {
      copyright: "©2025 Styleable.AI 保留所有权利",
    },
    myWorks: {
      title: "我的作品",
      allWorks: "全部作品",
      favoriteWorks: "收藏作品",
      favorite: "收藏",
      favorited: "已收藏",
      keywords: "关键词",
      date: "创建日期",
      originalText: "原文片段",
      mimicText: "仿写片段",
      humanizedText: "人味化片段",
      viewFull: "查看全文",
      noFavorites: "暂无收藏作品",
      noWorks: "您还没有创建任何作品",
    },
    auth: {
      loginTitle: "欢迎回来",
      loginDescription: "登录您的账户",
      registerTitle: "创建账户",
      registerDescription: "注册以开始使用",
      email: "电子邮箱",
      password: "密码",
      confirmPassword: "确认密码",
      name: "姓名",
      namePlaceholder: "张三",
      login: "登录",
      register: "注册",
      loggingIn: "登录中...",
      registering: "注册中...",
      noAccount: "还没有账户？",
      haveAccount: "已有账户？",
      signUp: "注册",
      signIn: "登录",
      validationError: "输入无效",
      allFieldsRequired: "所有字段都是必填的",
      passwordsMismatch: "两次输入的密码不匹配",
      loginSuccess: "登录成功！",
      loginFailed: "登录失败",
      registerSuccess: "账户创建成功！",
      registerFailed: "注册失败",
      invalidCredentials: "邮箱或密码无效",
      emailExists: "该邮箱已被注册",
      unexpectedError: "发生了未知错误",
    }
  },
};

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextType | null>(null);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("zh");

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language;
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "zh")) {
      setLanguage(savedLanguage);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
  };

  const t = (key: string): string => {
    const keys = key.split(".");
    let value: any = translations[language];
    
    for (const k of keys) {
      if (value && value[k] !== undefined) {
        value = value[k];
      } else {
        console.warn(`Translation key not found: ${key}`);
        return key;
      }
    }
    
    return value;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
