# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

一个 AUDI 汽车品牌展示网站（AUDI Motors），单页静态网站，使用原生 HTML/CSS/JS 构建。

## 目录结构

```
├── index.html          # 主页面
├── css/
│   ├── variables.css   # CSS 变量（颜色、字体、间距、过渡）
│   ├── base.css         # 基础样式
│   ├── components.css   # 组件样式（导航、英雄区、车型卡片等）
│   └── animations.css   # 动画定义
├── js/
│   └── main.js          # 交互逻辑（轮播、Tab 切换、滚动动画）
└── assets/
    ├── videos/
    │   └── background.mp4  # 英雄区背景视频
    └── images/
        ├── 跑车/RS7/       # 跑车系列图片
        ├── 轿车/            # 轿车系列图片
        ├── SUV/             # SUV 系列图片
        ├── 电车/             # 纯电系列图片
        └── F1/               # F1 系列图片
```

## 技术栈

- **HTML5** - 单页应用，语义化标签
- **CSS3** - CSS Variables、Flexbox、Grid、动画
- **Vanilla JavaScript** - 无框架，原生 DOM 操作
- **字体** - Google Fonts (Inter)
- **图片** - 直接引用 JPG/PNG，无压缩处理

## 设计系统

- **主色调** - 黑色系 (#0a0a0a, #111111, #1a1a1a)
- **强调色** - 橙色 (#ff6b35)
- **字体** - Inter (字重 100-900)

## 常用命令

网站为纯静态文件，直接用浏览器打开 `index.html` 即可预览。

## 关键实现

### 滚动动画
使用 `IntersectionObserver` 监听 `.animate-on-scroll` 元素，进入视口时添加 `visible` 类触发 CSS 动画。

### 车型分类 Tab
通过 `data-category` 属性切换内容区，`initCarousel()` 初始化各分类的图片轮播。

### 图片轮播
原生 JS 实现，支持左右箭头切换和 dot 导航，单图片时隐藏导航控件。

### 视频路径
背景视频位于 `assets/videos/background.mp4`，在 `index.html` 第 34 行引用。
