# When We Talk About Death - 数据叙事网页设计规范

## 1. 概念与愿景

一个关于死亡与记忆的沉浸式数据叙事网页，致敬《寻梦环游记》的温暖美学。网页以纵向滚动的方式引导读者穿过五个篇章：个人思念→公共悼念→集体记忆→自我反思→意义生产。整体氛围从悲伤过渡到温暖，最终传达"遗忘才是真正的死亡，被记住便是永恒"的核心主题。

## 2. 设计语言

### 美学方向
参考《寻梦环游记》(Coco) 的视觉风格：
- 神秘的紫色与温暖的橙黄色形成对比
- 万寿菊金与夜空紫的渐变
- 亡灵节的剪纸艺术元素
- 星空与花瓣的梦幻感

### 调色板
```
--purple-deep: #4A1E6D       // 深紫色 - 夜空、神秘
--purple-main: #6B3FA0       // 主紫色 - 背景基调
--purple-light: #8B5CF6      // 浅紫色 - 强调元素
--orange-gold: #F59E0B      // 橙金色 - 万寿菊
--orange-warm: #FB923C      // 暖橙色 - 温暖光芒
--yellow-bright: #FCD34D     // 明黄色 - 高亮
--cream-light: #FEF3C7       // 奶油色 - 文字背景
--pink-soft: #F9A8D4        // 柔粉色 - 过渡
--text-dark: #1F1729         // 深紫黑 - 正文
--text-light: #FEF9EF        // 米白 - 深色背景文字
```

### 字体
```css
--font-display: "Cinzel Decorative", "Playfair Display", serif;  // 标题 - 古典优雅
--font-heading: "Cormorant Garamond", "Noto Serif SC", serif;   // 副标题
--font-body: "Nunito", "Noto Sans SC", sans-serif;              // 正文
--font-accent: "Dancing Script", cursive;                        // 引用/装饰
```

### 间距系统
```
--space-xs: 0.5rem
--space-sm: 1rem
--space-md: 2rem
--space-lg: 4rem
--space-xl: 8rem
--space-section: 100vh  // 全屏章节
```

### 动效哲学
- 滚动触发的渐入动画 (fade-up, stagger)
- 悬停时的微妙发光效果 (glow)
- 文字的打字机效果
- 粒子/花瓣飘落效果
- 过渡平滑 (ease-out, 400-600ms)

## 3. 页面结构

### 篇章一：开篇 (Hero)
- 全屏英雄区域，《寻梦环游记》风格
- 主标题 + 英文副标题
- 紫色星空背景 + 橙色光芒粒子
- 向下滚动提示

### 篇章二：引言
- 景军教授的采访引用
- 墨西哥作家帕斯关于死亡的引用
- 过渡到数据展示

### 篇章三：数据总览
- 三个国际调查数据卡片 (英国/香港/新加坡)
- 滚动触发的数字动画
- 简洁的数据可视化

### 篇章四：Part 1 - 思念 (Memory)
- 标题动画
- 物品故事卡片 (可交互展开)
- 思念对象可视化 (词云)
- 情感分类可视化

### 篇章五：Part 2 - 悼念 (Commemoration)
- 墓志铭展示 (墓碑形式)
- 纪念方式数据
- 互动性墓志铭选择

### 篇章六：结语
- 核心信息回顾
- "记住便是永恒"
- 呼吁行动

## 4. 组件清单

### HeroSection
- 全屏背景 (渐变紫色 + 星空粒子)
- 主标题 (大号衬线字体)
- 副标题/引言
- 滚动指示器 (动画箭头)

### DataCard
- 圆角卡片
- 标题 + 数字 + 说明
- 悬停发光效果
- 可选图表

### StoryCard (物品故事)
- 物品图标
- 可展开/收起
- 故事文本
- 作者署名

### EmotionChart
- 横向柱状图
- 颜色编码情感类别
- 悬停显示详情

### WordCloud
- 基于频率的词语大小
- 色彩渐变
- 悬停高亮

### EpitaphCard
- 墓碑形状容器
- 墓志铭文本
- 类别标签

### InteractiveSection
- 悬停效果
- 过渡动画
- 响应式布局

### ScrollIndicator
- 固定于底部
- 章节导航
- 进度指示

## 5. 技术方案

### 框架
- React 18 + Vite
- TypeScript
- Tailwind CSS + 自定义配置
- Framer Motion (动画)

### 数据处理
- 使用 React 的 useState/useEffect
- 数据文件直接导入 (CSV 已转换为 JSON)

### 响应式
- 移动优先设计
- 断点: sm(640px), md(768px), lg(1024px), xl(1280px)

### 性能
- 图片懒加载
- 组件代码分割
- 滚动优化

## 6. 内容数据

### 数据来源
1. **微博评论数据** - 8588条评论分析
   - 对象频率统计
   - 情感类别统计
   - 主题标签统计
   
2. **国际调查数据**
   - YouGov 死亡研究 (2021)
   - 香港生死看法调查 (2022)
   - 新加坡 Death Literacy Index (2025)

3. **墓志铭图书馆** - 各类别代表文本
