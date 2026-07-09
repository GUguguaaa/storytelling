# When We Talk About Death - 当我们谈论死亡

一个关于死亡与记忆的沉浸式数据叙事网页，致敬《寻梦环游记》的温暖美学。

## 项目介绍

本项目是一个数据叙事网页，讲述关于死亡、记忆与思念的故事。网页以纵向滚动的方式引导读者穿过多个篇章，最终传达"遗忘才是真正的死亡，被记住便是永恒"的核心主题。

## 设计风格

- **美学参考**: 《寻梦环游记》(Coco) - 神秘的紫色与温暖的橙黄色
- **字体**: Cinzel Decorative, Cormorant Garamond, Nunito
- **动画**: 滚动触发的渐入动画、粒子飘落效果

## 页面结构

1. **Hero 英雄区** - 中英文标题 + 死亡意象图标动画 + 数据预览
2. **Introduction 引言** - 景军教授的故事，打字机效果动画
3. **Coco 寻梦环游记** - 背景图片 + 帕斯名言 + 电影解读
4. **Data Overview 数据总览** - 英国/香港/新加坡三国调查卡片
5. **Memory 思念** - 物品故事卡片 + 情感可视化
6. **Commemoration 悼念** - 墓志铭展示 + 纪念方式
7. **Conclusion 结语** - 核心信息回顾

## 数据来源

- 微博评论数据 (8588条评论分析)
- YouGov 死亡研究 (2021)
- 香港生死看法调查 (2022)
- 新加坡 Death Literacy Index (2025)
- 墓志铭图书馆

## 本地运行

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

开发服务器运行在 http://localhost:5173

## 部署到网络

构建后的文件在 `dist` 文件夹中。要让所有用户都能通过链接访问，你可以：

### 方案一：部署到 Vercel（推荐）

1. 安装 Vercel CLI: `npm i -g vercel`
2. 在项目目录运行: `vercel`
3. 按照提示完成部署

### 方案二：部署到 Netlify

1. 将 `dist` 文件夹拖拽到 [Netlify Drop](https://app.netlify.com/drop)

### 方案三：部署到 GitHub Pages

1. 将项目推送到 GitHub 仓库
2. 在仓库 Settings > Pages 中启用
3. 选择 `dist` 分支作为来源

### 方案四：使用静态文件服务器

将 `dist` 文件夹的内容上传到任何静态网站托管服务（如阿里云OSS、腾讯云COS等）

## 项目结构

```
when-we-talk-about-death/
├── public/
│   ├── favicon.svg
│   └── coco.jpg          # 寻梦环游记背景图
├── src/
│   ├── components/
│   │   ├── HeroSection.tsx
│   │   ├── IntroductionSection.tsx
│   │   ├── CocoSection.tsx
│   │   ├── DataOverviewSection.tsx
│   │   ├── MemorySection.tsx
│   │   ├── CommemorationSection.tsx
│   │   ├── ConclusionSection.tsx
│   │   ├── ScrollProgress.tsx
│   │   └── FallingPetals.tsx
│   ├── data/
│   │   ├── summary.ts
│   │   ├── objectFrequency.ts
│   │   ├── emotionCategories.ts
│   │   ├── topicTags.ts
│   │   ├── internationalSurveys.ts
│   │   └── memorialData.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── dist/                  # 构建输出目录（部署用）
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.ts
├── tsconfig.json
├── SPEC.md
└── README.md
```

## 技术栈

- React 18
- Vite
- TypeScript
- Tailwind CSS
- Framer Motion
- Recharts

## 设计规范

详见 [SPEC.md](./SPEC.md)
