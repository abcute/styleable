
# Styleable - AI 风格模仿写作工具

Styleable 是一个基于 AI 的智能写作工具，能够分析文本风格并生成符合特定风格的内容。通过深度学习技术，它可以提取文本的风格特征，并根据用户提供的关键词生成具有相同风格的新文章。

## 🌟 产品特色

- **智能风格分析**：深度解析文本的语言特征、结构特征、叙事特征等多维度风格要素
- **精准风格模仿**：基于分析结果生成符合原文风格的新内容
- **人性化改写**：将 AI 生成的内容进行人性化处理，增加真实感
- **风格管理**：自动保存分析过的风格，支持重复使用
- **作品管理**：完整的作品创建、保存、收藏和管理功能
- **多语言支持**：支持中英文界面切换
- **用户认证**：完整的用户注册、登录和会话管理

## 🚀 技术栈

- **前端框架**：React 18 + TypeScript
- **构建工具**：Vite
- **UI 组件库**：shadcn/ui + Tailwind CSS
- **状态管理**：React Context + TanStack Query
- **路由管理**：React Router DOM
- **后端服务**：Supabase (数据库 + 认证 + 实时功能)
- **AI 服务**：DeepSeek API
- **部署平台**：Lovable + GitHub 集成

## 📋 核心功能

### 1. 风格分析功能

系统使用专业的风格分析提示词模板，从以下维度深度解析文本：

#### 分析维度
1. **语言特征**：句式、用词、修辞手法
2. **结构特征**：段落组织、过渡方式、层次展开
3. **叙事特征**：视角选择、时间处理、叙事态度
4. **情感特征**：情感强度、表达方式、基调设定
5. **思维特征**：逻辑模式、思维深度、节奏把控
6. **个性标记**：独特表达、意象系统
7. **文化底蕴**：典故运用、知识领域
8. **韵律节奏**：音节特征、停顿规律

#### 风格分析提示词模板
```
# 文章风格提取提示词模板 v1.0
请输入您想要分析的文本段落。我将对其进行深度风格解析，并以结构化格式输出分析结果。

## 分析维度
我将从以下维度分析文本风格特征：
1. 语言特征（句式、用词、修辞）
2. 结构特征（段落、过渡、层次）
3. 叙事特征（视角、距离、时序）
4. 情感特征（浓淡、方式、基调）
5. 思维特征（逻辑、深度、节奏）
6. 个性标记（独特表达、意象系统）
7. 文化底蕴（典故、知识领域）
8. 韵律节奏（音节、停顿、节奏）

## 输出格式
我将以下列结构化格式以代码块输出分析结果：
json
{
  "style_summary": "风格一句话概括",
  "language": {
    "sentence_pattern": ["主要句式特征", "次要句式特征"],
    "word_choice": {
      "formality_level": "正式度 1-5",
      "preferred_words": ["高频特征词1", "特征词2"],
      "avoided_words": ["规避词类1", "规避词类2"]
    },
    "rhetoric": ["主要修辞手法1", "修辞手法2"]
  },
  "structure": {
    "paragraph_length": "段落平均字数",
    "transition_style": "过渡特征",
    "hierarchy_pattern": "层次展开方式"
  },
  "narrative": {
    "perspective": "叙事视角",
    "time_sequence": "时间处理方式",
    "narrator_attitude": "叙事态度"
  },
  "emotion": {
    "intensity": "情感强度 1-5",
    "expression_style": "表达方式",
    "tone": "情感基调"
  },
  "thinking": {
    "logic_pattern": "思维推进方式",
    "depth": "思维深度 1-5",
    "rhythm": "思维节奏特征"
  },
  "uniqueness": {
    "signature_phrases": ["标志性表达1", "表达2"],
    "imagery_system": ["核心意象1", "意象2"]
  },
  "cultural": {
    "allusions": ["典故类型", "使用频率"],
    "knowledge_domains": ["涉及领域1", "领域2"]
  },
  "rhythm": {
    "syllable_pattern": "音节特征",
    "pause_pattern": "停顿规律",
    "tempo": "节奏特征"
  }
}

## 注意：
1. 文中提及的特殊要素不要提取，例如书名、作者姓名、特定地理位置等。
2. 风格提取的目的在于基于该风格生成其他指定主题的文章，提取要素应当基于这一任务。
```

### 2. 风格仿写功能

#### 文章仿写提示词模板
```
# 文章仿写提示词模板 v1.0
基于上述文本风格，为我编写一篇1000字的文章，要求如下：
关键词：{keywords}

注意：
- 禁止使用"让我想起…""这让我想起…""我不由得想起…"等回忆性过渡句
- 避免刻意煽情或直白的情感表达
- 采用自然段落输出，不使用标题和小标题
```

### 3. 人性化改写功能

#### 人味改写提示词模板
```
# 人味改写提示词模板 v1.0
基于下列方式改写文本，生成更有"人味"的文章：

{
  "真实人类思维文本范式": {
    "核心原则": [
      "思维碎片化：人类思维不是线性的，而是充满跳跃、联想和中断",
      "身体感知优先：身体状态深刻影响思维内容和情绪",
      "矛盾并存：内心冲突和矛盾是常态，不需要解决",
      "琐事干扰：日常琐事和随机想法经常打断深刻思考",
      "不完美表达：语言表达有重复、犹豫和不精确"
    ],
    "文本结构框架": {
      "身体层面": {
        "占比": "20-30%",
        "要素": [
          "插入具体的身体不适感",
          "使用具体而微小的细节",
          "身体需求会打断思考"
        ]
      },
      "情绪层面": {
        "占比": "15-25%",
        "要素": [
          "情绪波动无需合理原因",
          "同时存在矛盾情绪",
          "使用内在自我批评",
          "加入无来由的情绪爆发"
        ]
      },
      "思维层面": {
        "占比": "30-40%",
        "要素": [
          "随机联想：当前事物触发无关记忆",
          "琐事插入：日常担忧突然闯入",
          "自我怀疑：质疑自己的动机和决定",
          "实用担忧：关于物质条件的现实考虑"
        ]
      },
      "现实干扰": {
        "占比": "15-20%",
        "要素": [
          "计划失败",
          "设备故障",
          "物品损坏",
          "意外发现"
        ]
      }
    },
    "语言技巧": {
      "口语化表达": [
        "加入语气词",
        "使用不完整句",
        "自我对话"
      ],
      "打破流畅叙事": [
        "突然转换话题",
        "中断自己的思路",
        "使用省略号表示思维跳跃"
      ],
      "减少华丽修辞": [
        "避免过度文学化的比喻",
        "用朴实直接的表达代替优美句子",
        "保留一些重复和赘述"
      ]
    }
  }
}

请将我提供的文本根据上述"真实人类思维文本范式"进行改写，使文章更有人味。
要求：
1. 加入身体层面的描述（不适感、微小细节、身体需求）
2. 增加情绪波动和矛盾情绪
3. 插入随机联想和琐事打断
4. 使用口语化表达和不完整句
5. 打破流畅叙事，加入思维跳跃
6. 减少华丽修辞，保留重复和赘述

保持文章原有主题和大致内容，但让表达方式更接近真实人类思维过程。
```

## 🎯 使用流程

1. **风格分析**：输入原始文本，系统自动分析风格特征
2. **主题输入**：输入要创作的主题关键词
3. **风格仿写**：基于分析结果生成符合风格的新文章
4. **人性化处理**：对生成内容进行人性化改写
5. **内容获取**：完成支付后获取最终内容

## 📁 项目结构

```
src/
├── components/          # UI 组件
│   ├── ui/             # 基础 UI 组件库
│   ├── FinalContent.tsx
│   ├── MimicPreview.tsx
│   ├── Navbar.tsx
│   ├── OriginalTextInput.tsx
│   ├── SavedStylesSelector.tsx
│   ├── StepIndicator.tsx
│   ├── StyleAnalysis.tsx
│   └── TopicInput.tsx
├── context/            # React Context
│   ├── AuthContext.tsx
│   └── LanguageContext.tsx
├── pages/              # 页面组件
│   ├── Index.tsx       # 主页
│   ├── Login.tsx       # 登录页
│   ├── Register.tsx    # 注册页
│   ├── MyWorks.tsx     # 我的作品
│   └── SingleWorkView.tsx
├── utils/              # 工具函数
│   ├── analysisUtils.ts # AI 分析工具
│   ├── supabaseUtils.ts # 数据库操作
│   └── workUtils.ts    # 作品管理
└── integrations/       # 第三方集成
    └── supabase/       # Supabase 配置
```

## 🗄️ 数据库结构

### profiles 表
```sql
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);
```

### styles 表
```sql
CREATE TABLE styles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  style_name TEXT NOT NULL,
  style_data JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);
```

### works 表
```sql
CREATE TABLE works (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  keywords TEXT,
  original_text TEXT NOT NULL,
  mimic_text TEXT,
  humanized_text TEXT,
  favorite BOOLEAN DEFAULT false,
  style_id UUID REFERENCES styles(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);
```

## 🚀 部署指南

### 前置要求

1. **Node.js 环境**：Node.js 18+ 和 npm
2. **Supabase 账号**：用于数据库和认证服务
3. **DeepSeek API Key**：用于 AI 分析功能
4. **GitHub 账号**：用于代码托管（可选）

### 1. 克隆项目

```bash
git clone <YOUR_GIT_URL>
cd <PROJECT_NAME>
npm install
```

### 2. Supabase 配置

#### 2.1 创建 Supabase 项目
1. 访问 [supabase.com](https://supabase.com) 创建新项目
2. 获取项目 URL 和 anon key

#### 2.2 数据库设置
在 Supabase SQL 编辑器中执行以下 SQL：

```sql
-- 创建 profiles 表
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 创建 styles 表
CREATE TABLE styles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  style_name TEXT NOT NULL,
  style_data JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 创建 works 表
CREATE TABLE works (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  keywords TEXT,
  original_text TEXT NOT NULL,
  mimic_text TEXT,
  humanized_text TEXT,
  favorite BOOLEAN DEFAULT false,
  style_id UUID REFERENCES styles(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 创建用户注册触发器
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 设置 RLS 策略
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE styles ENABLE ROW LEVEL SECURITY;
ALTER TABLE works ENABLE ROW LEVEL SECURITY;

-- profiles 表策略
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- styles 表策略
CREATE POLICY "Users can view own styles" ON styles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own styles" ON styles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own styles" ON styles
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own styles" ON styles
  FOR DELETE USING (auth.uid() = user_id);

-- works 表策略
CREATE POLICY "Users can view own works" ON works
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own works" ON works
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own works" ON works
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own works" ON works
  FOR DELETE USING (auth.uid() = user_id);
```

### 3. 环境配置

#### 3.1 Supabase 集成
在 Lovable 项目中：
1. 点击右上角绿色 "Supabase" 按钮
2. 连接到您的 Supabase 项目
3. 配置项目 URL 和密钥

#### 3.2 DeepSeek API 配置
在 `src/utils/analysisUtils.ts` 中更新 API 密钥：
```typescript
const DEEPSEEK_API_KEY = 'your-deepseek-api-key';
```

### 4. 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

### 5. 生产部署

#### 5.1 通过 Lovable 部署
1. 在 Lovable 编辑器中点击右上角 "Publish" 按钮
2. 配置自定义域名（需要付费计划）

#### 5.2 通过 GitHub 部署
1. 在 Lovable 中连接 GitHub
2. 推送代码到 GitHub 仓库
3. 使用 Vercel、Netlify 或其他平台部署

#### 5.3 环境变量配置
确保在生产环境中配置以下环境变量：
- `VITE_SUPABASE_URL`: Supabase 项目 URL
- `VITE_SUPABASE_ANON_KEY`: Supabase 匿名密钥

### 6. 功能测试

部署完成后，测试以下功能：

1. **用户注册登录**：验证认证流程
2. **文本分析**：测试风格分析功能
3. **内容生成**：验证仿写和人性化功能
4. **数据持久化**：检查风格和作品保存
5. **权限控制**：确认 RLS 策略生效

## 🔧 API 集成

### DeepSeek API 配置

1. 访问 [DeepSeek 官网](https://platform.deepseek.com) 注册账号
2. 获取 API Key
3. 在项目中配置密钥：

```typescript
const DEEPSEEK_API_KEY = 'sk-your-api-key';
const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions';
```

### API 使用示例

```typescript
const response = await fetch(DEEPSEEK_API_URL, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${DEEPSEEK_API_KEY}`
  },
  body: JSON.stringify({
    model: 'deepseek-chat',
    messages: [
      { role: 'user', content: prompt }
    ],
    temperature: 0.7,
    max_tokens: 4000
  })
});
```

## 🔒 安全配置

### Row Level Security (RLS)

项目使用 Supabase RLS 确保数据安全：

- 用户只能访问自己的 profiles、styles 和 works
- 所有表都启用了 RLS 策略
- API 调用需要有效的 JWT token

### 认证配置

在 Supabase 认证设置中：

1. **邮箱确认**：开发测试期间可关闭
2. **重定向 URL**：配置允许的重定向域名
3. **JWT 过期时间**：根据需要调整

## 📈 性能优化

1. **代码分割**：使用 React.lazy 实现路由级代码分割
2. **缓存策略**：TanStack Query 提供智能缓存
3. **图片优化**：使用 WebP 格式和懒加载
4. **API 优化**：合理使用 Supabase 实时订阅

## 🐛 常见问题

### Q: 用户注册后无法创建 profile
A: 检查 `handle_new_user` 触发器是否正确创建和启用

### Q: API 调用失败
A: 验证 DeepSeek API Key 是否正确配置且有足够额度

### Q: 样式显示异常
A: 确认 Tailwind CSS 配置正确，检查 purge 设置

### Q: 认证状态不同步
A: 检查 `onAuthStateChange` 监听器是否正确设置

## 📄 许可证

本项目基于 MIT 许可证开源。

## 🤝 贡献指南

1. Fork 项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

## 📞 联系支持

如果您在部署过程中遇到问题，请：

1. 查看 [Lovable 文档](https://docs.lovable.dev/)
2. 访问 [Supabase 文档](https://supabase.com/docs)
3. 在项目 Issues 中报告问题

---

**注意**：本项目使用 AI 技术，请确保遵循相关法律法规和平台使用条款。
