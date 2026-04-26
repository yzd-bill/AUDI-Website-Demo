# 语言切换功能实现计划

## 需求
- 封面页右上角添加 EN | CN 语言切换按钮
- 全站内容随语言切换同步更新
- 语言选择持久化（刷新后保持）

## 涉及文件
- `index.html` - 添加按钮和 data-i18n 属性
- `css/components.css` - 添加按钮样式
- `js/main.js` - 添加翻译逻辑

## 实施步骤

### Step 1: 修改 index.html
在导航栏添加语言切换按钮，并为所有文本添加 `data-i18n` 属性：

```html
<nav class="nav">
  <a href="#" class="nav-logo">BIU<span>BIU</span></a>
  <ul class="nav-links">
    <li><a href="#models" class="nav-link" data-i18n="nav-models">车型</a></li>
    <li><a href="#philosophy" class="nav-link" data-i18n="nav-about">关于</a></li>
  </ul>
  <div class="lang-toggle">
    <span class="lang-btn active" data-lang="zh">CN</span>
    <span class="lang-divider">|</span>
    <span class="lang-btn" data-lang="en">EN</span>
  </div>
</nav>
```

需要翻译的元素：
- 导航链接 (nav-models, nav-about)
- Hero 区域 (hero-subtitle, btn-primary, scroll-text)
- Philosophy 区域 (philosophy-title, philosophy-text)
- Models 标题 (models-title)
- Tab 按钮 (tab-sports, tab-sedan, tab-suv, tab-electric, tab-f1)
- 所有卡片内容 (card-title, card-desc, card-text, explore-more, keywords)
- Footer 链接 (footer-privacy, footer-terms, footer-contact, footer-join, copyright)

### Step 2: 修改 components.css
添加语言切换按钮样式：
- `.lang-toggle` - 容器定位在右上角
- `.lang-btn` - 可点击样式，cursor: pointer
- `.lang-btn.active` - 当前语言高亮（橙色）

### Step 3: 修改 main.js
添加翻译系统：

```javascript
// ========== Language Toggle ==========
const translations = {
  'nav-models': { zh: '车型', en: 'Models' },
  'nav-about': { zh: '关于', en: 'About' },
  'hero-subtitle': { zh: '驾驭未来的极致美学', en: 'The Ultimate Aesthetic of Future Driving' },
  'hero-cta': { zh: '探索车型', en: 'Explore Models' },
  'scroll-text': { zh: '向下滚动', en: 'Scroll Down' },
  'philosophy-title': { zh: '重新定义驾驶', en: 'Redefining Driving' },
  'philosophy-text': { zh: '我们相信...', en: 'We believe...' },
  'models-title': { zh: '车型系列', en: 'Model Series' },
  'tab-sports': { zh: '跑车', en: 'Sports' },
  'tab-sedan': { zh: '轿车', en: 'Sedan' },
  'tab-suv': { zh: 'SUV', en: 'SUV' },
  'tab-electric': { zh: '纯电', en: 'Electric' },
  'tab-f1': { zh: 'F1', en: 'F1' },
  // 卡片内容...
  'card-sports-title': { zh: 'AUDI 跑车系列', en: 'AUDI Sports Series' },
  'card-sports-desc': { zh: '极速超跑 · 赛道基因', en: 'Speed · Track Heritage' },
  'card-sports-text': { zh: '极致性能与环保理念...', en: 'The perfect fusion of extreme performance...' },
  'explore-more': { zh: '了解更多', en: 'Explore More' },
  // Footer...
};

function setLanguage(lang) {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[key] && translations[key][lang]) {
      el.textContent = translations[key][lang];
    }
  });
  localStorage.setItem('lang', lang);
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
}

// 初始化
const savedLang = localStorage.getItem('lang') || 'zh';
setLanguage(savedLang);

// 绑定点击事件
document.querySelectorAll('.lang-btn').forEach(btn => {
  btn.addEventListener('click', () => setLanguage(btn.dataset.lang));
});
```

## 验证方式
1. 打开 index.html，点击右上角 CN/EN 按钮切换语言
2. 所有文本应同步更新
3. 刷新页面，语言选择应保持
4. 检查控制台无报错