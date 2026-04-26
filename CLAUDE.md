# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with this repository.

## 项目概述

AUDI 汽车品牌展示网站，双页面静态网站，使用原生 HTML/CSS/JS 构建。

## 页面结构

- **index.html** - 首页，包含英雄区、车型分类 Tab 展示和轮播
- **detail.html** - 车型详情页，支持多视图切换和参数展示

## 目录结构

```
├── index.html          # 首页
├── detail.html         # 车型详情页
├── css/
│   ├── variables.css   # CSS 变量（颜色、字体、间距、过渡）
│   ├── base.css        # 基础样式
│   ├── components.css  # 组件样式（导航、英雄区、车型卡片等）
│   ├── animations.css  # 动画定义
│   └── detail.css      # 详情页样式
├── js/
│   ├── main.js         # 交互逻辑（i18n、轮播、Tab 切换、滚动动画）
│   ├── detail.js       # 详情页交互（视图切换、横向滚动选择）
│   └── models-data.js  # 车型数据（分类、参数、图片路径）
└── assets/
    ├── videos/background.mp4
    └── images/
        ├── 跑车/RS7/, R8/
        ├── 轿车/, SUV/, 电车/, F1/
        └── placeholder/  # 占位图
```

## 技术栈

- **HTML5** - 语义化标签
- **CSS3** - CSS Variables、Flexbox、Grid、动画
- **Vanilla JavaScript** - 原生 DOM 操作
- **字体** - Google Fonts (Inter)
- **图片** - 直接引用 JPG/PNG

## 设计系统

- **主色调** - 黑色系 (#0a0a0a, #111111, #1a1a1a)
- **强调色** - 橙色 (#ff6b35)
- **字体** - Inter (字重 100-900)

## 关键实现

### 双页架构
- 首页通过 URL 参数跳转详情页：`detail.html?type=sports&id=rs7`
- 详情页通过 `models-data.js` 动态加载车型数据

### 国际化 (i18n)
- 使用 `data-i18n` 属性标记需翻译元素
- 翻译对象定义在 `main.js` 的 `translations` 中
- 语言偏好存储在 `localStorage`

### 滚动动画
- 使用 `IntersectionObserver` 监听 `.animate-on-scroll`
- 进入视口时添加 `visible` 类触发 CSS 动画

### 图片轮播
- 原生 JS 实现，支持左右箭头和 dot 导航
- 单图片时自动隐藏导航控件

### 详情页交互
- 横向滚轮/触摸滑动切换车型
- 视图按钮切换前/后/侧视图
- `updateListPosition()` 使选中车型居中

## 常用命令

纯静态文件，直接用浏览器打开 `index.html` 即可预览。
