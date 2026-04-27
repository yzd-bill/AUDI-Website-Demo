// 车型详情页交互逻辑
document.addEventListener('DOMContentLoaded', () => {
  // ========== 3D 鼠标跟随效果 ==========
  const modelImageContainer = document.querySelector('.model-image-container');
  const modelViewer = document.querySelector('.model-viewer');

  if (modelImageContainer && modelViewer) {
    modelViewer.addEventListener('mousemove', (e) => {
      const rect = modelImageContainer.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      modelImageContainer.style.transform = `perspective(1000px) rotateY(${x * 8}deg) rotateX(${-y * 5}deg)`;
    });

    modelViewer.addEventListener('mouseleave', () => {
      modelImageContainer.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg)';
    });
  }

  // ========== 数字滚动动画 ==========
  function animateNumber(element, target, duration = 1000) {
    const start = 0;
    const startTime = performance.now();
    const isFloat = String(target).includes('.');
    const decimals = isFloat ? String(target).split('.')[1].length : 0;

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = start + (target - start) * easeOut;

      if (isFloat) {
        element.textContent = current.toFixed(decimals);
      } else {
        element.textContent = Math.round(current);
      }

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        element.textContent = isFloat ? target.toFixed(decimals) : target;
      }
    }

    requestAnimationFrame(update);
  }

  // ========== 翻译系统 ==========
  const translations = {
    // 导航栏
    'nav-models': { zh: '车型', en: 'Models' },
    'nav-about': { zh: '关于', en: 'About' },
    'tab-sports': { zh: '跑车', en: 'Sports' },
    'tab-sedan': { zh: '轿车', en: 'Sedan' },
    'tab-suv': { zh: 'SUV', en: 'SUV' },
    'tab-electric': { zh: '纯电', en: 'Electric' },
    'tab-f1': { zh: 'F1', en: 'F1' },
    // Footer
    'footer-privacy': { zh: '隐私政策', en: 'Privacy Policy' },
    'footer-terms': { zh: '使用条款', en: 'Terms of Use' },
    'footer-contact': { zh: '联系我们', en: 'Contact Us' },
    'footer-join': { zh: '加入我们', en: 'Join Us' },
    'copyright': { zh: '© 2026 AUDI Motors. All rights reserved. 京ICP备XXXXXXXX号', en: '© 2026 AUDI Motors. All rights reserved. ICP Beijing XXXXXXXX' },
    // 视图按钮
    'view-front': { zh: '前视图', en: 'Front View' },
    'view-back': { zh: '后视图', en: 'Rear View' },
    'view-left': { zh: '左前视图', en: 'Left View' },
    'view-right': { zh: '右后视图', en: 'Right View' },
    // 参数标题和标签
    'specs-title': { zh: '车型参数', en: 'Model Specs' },
    'spec-launchDate': { zh: '推出时间', en: 'Launch Year' },
    'spec-topSpeed': { zh: '最高速度', en: 'Top Speed' },
    'spec-horsepower': { zh: '最大马力', en: 'Horsepower' },
    'spec-torque': { zh: '扭矩', en: 'Torque' },
    'spec-acceleration': { zh: '0-100加速', en: '0-100 km/h' },
    'spec-seating': { zh: '载客数量', en: 'Seating' },
    'spec-dimensions': { zh: '车身尺寸', en: 'Dimensions' }
  };

  let currentLang = localStorage.getItem('lang') || 'zh';

  function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('lang', lang);

    // 更新所有带 data-i18n 属性的元素
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (translations[key] && translations[key][lang]) {
        el.textContent = translations[key][lang];
      }
    });

    // 更新语言切换按钮状态
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    // 重新渲染需要翻译的内容
    updateModelListUI();
    updateModelDisplay();
  }

  // 绑定语言切换按钮事件
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      setLanguage(btn.dataset.lang);
    });
  });

  // ========== URL 参数解析 ==========
  const urlParams = new URLSearchParams(window.location.search);
  const currentType = urlParams.get('type') || 'sports';
  const currentModelId = urlParams.get('id') || '';

  // ========== 图片路径配置 ==========

  // 构建车型图片的基础路径
  function getModelImageBasePath(model, categoryPath) {
    // 优先使用 imageFolder，否则使用 modelId
    const folderName = model.imageFolder || model.id;
    return `assets/images/${categoryPath}/${folderName}`;
  }

  // 构建 placeholder 图片路径
  function getPlaceholderImagePath(modelId, view) {
    return `assets/images/placeholder/${modelId}-${view}.jpg`;
  }

  // 异步检测图片是否存在
  function checkImageExists(src) {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = src;
    });
  }

  // 根据视图获取实际文件名
  // 统一格式：前景.png、后景.png、左前景.png、右后景.png
  function getViewFileName(view) {
    const mapping = {
      front: '前景.png',
      back: '后景.png',
      left: '左前景.png',
      right: '右后景.png'
    };
    return mapping[view] || mapping.front;
  }

  // 异步加载图片，优先真实图片，失败后 fallback 到 placeholder
  async function loadImageWithFallback(model, categoryPath, view) {
    const basePath = getModelImageBasePath(model, categoryPath);
    const modelId = model.imageFolder || model.id;
    const filename = getViewFileName(view);

    // 1. 先尝试真实图片路径
    const realImagePath = `${basePath}/${filename}`;
    if (await checkImageExists(realImagePath)) {
      return realImagePath;
    }

    // 2. Fallback 到 placeholder
    return getPlaceholderImagePath(modelId, view);
  }

  // 获取当前分类数据
  const categoryData = modelsData[currentType];
  const models = categoryData ? categoryData.models : [];

  // 当前状态
  let currentModelIndex = 0;
  let currentView = 'front';

  // DOM 元素
  const modelSelector = document.querySelector('.model-selector');
  const modelList = document.querySelector('.model-list');
  const modelListContainer = document.querySelector('.model-list-container');
  const modelImage = document.querySelector('.model-image');
  const viewBtns = document.querySelectorAll('.view-btn');
  const specsGrid = document.querySelector('.specs-grid');

  // 初始化
  let isFirstLoad = true;
  if (models.length > 0) {
    // 找到当前车型的索引
    if (currentModelId) {
      const idx = models.findIndex(m => m.id === currentModelId);
      if (idx !== -1) currentModelIndex = idx;
    }

    renderModelList();
    updateModelDisplay();
    updateListPosition();

    // 触发动画入场
    setTimeout(() => {
      document.querySelector('.model-selector')?.classList.add('animate-enter');
      document.querySelector('.model-viewer')?.classList.add('animate-enter');
      document.querySelector('.model-specs')?.classList.add('animate-enter');
    }, 50);
  }

  // 初始化语言（需要在 DOM 和 models 初始化之后）
  setLanguage(currentLang);

  // 渲染车型列表
  function renderModelList() {
    if (models.length === 0) return;

    const getDisplayName = (model) => {
      return currentLang === 'en' ? (model.nameEn || model.name) : model.name;
    };

    modelList.innerHTML = models.map((model, index) => {
      const isActive = index === currentModelIndex;
      return `
        <span class="model-name ${isActive ? 'active' : ''}"
              data-index="${index}">
          ${getDisplayName(model)}
        </span>
      `;
    }).join('');

    // 绑定点击事件
    modelList.querySelectorAll('.model-name').forEach(el => {
      el.addEventListener('click', () => {
        const index = parseInt(el.dataset.index);
        if (index !== currentModelIndex) {
          currentModelIndex = index;
          currentView = 'front';
          updateModelListUI();
          updateModelDisplay();
          updateURL();
          updateListPosition();
        }
      });
    });
  }

  // 更新车型列表 UI
  function updateModelListUI() {
    const getDisplayName = (model) => {
      return currentLang === 'en' ? (model.nameEn || model.name) : model.name;
    };

    modelList.querySelectorAll('.model-name').forEach((el, index) => {
      el.classList.toggle('active', index === currentModelIndex);
      el.textContent = getDisplayName(models[index]);
    });
  }

  // 计算并设置列表位置，使当前选中项居中
  function updateListPosition() {
    const activeEl = modelList.querySelector('.model-name.active');
    if (!activeEl) return;

    // 使用 scrollLeft 让选中项居中，而不是 transform
    const containerWidth = modelListContainer.offsetWidth;
    const activeElWidth = activeEl.offsetWidth;
    const activeLeft = activeEl.offsetLeft - modelListContainer.offsetLeft;

    // 计算滚动位置让选中项居中
    const scrollTo = activeLeft - (containerWidth - activeElWidth) / 2;
    modelListContainer.scrollLeft = scrollTo;
  }

  // 更新背景标题
  function updateBackgroundTitle(model) {
    const titleEl = document.querySelector('.model-background-title');
    if (titleEl) {
      // 根据语言选择显示名称
      const displayName = currentLang === 'en' ? (model.nameEn || model.name) : model.name;
      titleEl.textContent = displayName;
    }
  }

  // 更新模型显示（图片和参数）
  function updateModelDisplay() {
    const model = models[currentModelIndex];
    if (!model) return;

    updateModelImage(model);
    updateBackgroundTitle(model);
    updateSpecs(model);
  }

  // 更新模型图片（异步：优先真实图片，失败后 fallback）
  async function updateModelImage(model) {
    // 重置状态
    modelImage.style.display = '';
    modelImage.classList.remove('loaded');
    modelImage.style.opacity = '0';

    // 获取 categoryPath
    const categoryPath = categoryData.categoryPath;

    // 异步加载图片
    const imagePath = await loadImageWithFallback(model, categoryPath, currentView);

    modelImage.onload = () => {
      modelImage.classList.add('loaded');
      modelImage.style.opacity = '';
    };
    modelImage.onerror = () => {
      // fallback 也失败了，隐藏图片
      modelImage.style.display = 'none';
    };
    modelImage.src = imagePath;

    // 更新视图按钮高亮
    viewBtns.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.view === currentView);
    });
  }

  // 更新参数展示
  function updateSpecs(model) {
    // 获取当前语言的规格值
    const specValue = (spec) => {
      if (typeof spec === 'object' && spec !== null) {
        return spec[currentLang] || spec.zh || '';
      }
      return spec;
    };

    // 解析数值用于动画
    const parseNumericValue = (val) => {
      const str = String(val);
      const match = str.match(/[\d.]+/);
      return match ? parseFloat(match[0]) : null;
    };

    specsGrid.innerHTML = `
      <div class="spec-item">
        <span class="spec-label" data-i18n="spec-launchDate">${translations['spec-launchDate'][currentLang]}</span>
        <span class="spec-value" data-numeric="${parseNumericValue(model.specs.launchDate) || ''}">${specValue(model.specs.launchDate)}</span>
      </div>
      <div class="spec-item">
        <span class="spec-label" data-i18n="spec-topSpeed">${translations['spec-topSpeed'][currentLang]}</span>
        <span class="spec-value" data-numeric="${parseNumericValue(model.specs.topSpeed) || ''}">${specValue(model.specs.topSpeed)}</span>
      </div>
      <div class="spec-item">
        <span class="spec-label" data-i18n="spec-horsepower">${translations['spec-horsepower'][currentLang]}</span>
        <span class="spec-value" data-numeric="${parseNumericValue(model.specs.horsepower) || ''}">${specValue(model.specs.horsepower)}</span>
      </div>
      <div class="spec-item">
        <span class="spec-label" data-i18n="spec-torque">${translations['spec-torque'][currentLang]}</span>
        <span class="spec-value" data-numeric="${parseNumericValue(model.specs.torque) || ''}">${specValue(model.specs.torque)}</span>
      </div>
      <div class="spec-item">
        <span class="spec-label" data-i18n="spec-acceleration">${translations['spec-acceleration'][currentLang]}</span>
        <span class="spec-value" data-numeric="${parseNumericValue(model.specs.acceleration) || ''}">${specValue(model.specs.acceleration)}</span>
      </div>
      <div class="spec-item">
        <span class="spec-label" data-i18n="spec-seating">${translations['spec-seating'][currentLang]}</span>
        <span class="spec-value" data-numeric="${parseNumericValue(model.specs.seating) || ''}">${specValue(model.specs.seating)}</span>
      </div>
      <div class="spec-item">
        <span class="spec-label" data-i18n="spec-dimensions">${translations['spec-dimensions'][currentLang]}</span>
        <span class="spec-value" data-numeric="">${specValue(model.specs.dimensions)}</span>
      </div>
    `;

    // 为数值应用滚动动画（仅首次加载时）
    if (isFirstLoad) {
      setTimeout(() => {
        specsGrid.querySelectorAll('.spec-value[data-numeric]').forEach((el, index) => {
          const numValue = el.dataset.numeric;
          if (numValue !== '') {
            setTimeout(() => {
              animateNumber(el, parseFloat(numValue), 800);
            }, index * 100);
          }
        });
        isFirstLoad = false;
      }, 300);
    }
  }

  // 更新 URL 参数
  function updateURL() {
    const model = models[currentModelIndex];
    if (model) {
      const newURL = `${window.location.pathname}?type=${currentType}&id=${model.id}`;
      window.history.replaceState({}, '', newURL);
    }
  }

  // 绑定视图切换按钮
  viewBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const view = btn.dataset.view;
      if (view !== currentView) {
        currentView = view;
        const model = models[currentModelIndex];
        updateModelImage(model);
      }
    });
  });

  // 滚轮控制车型切换
  let wheelTimeout = null;
  modelSelector.addEventListener('wheel', (e) => {
    e.preventDefault();

    if (wheelTimeout) return;

    wheelTimeout = setTimeout(() => {
      wheelTimeout = null;
    }, 400);

    if (e.deltaY > 0) {
      currentModelIndex = (currentModelIndex + 1) % models.length;
    } else {
      currentModelIndex = (currentModelIndex - 1 + models.length) % models.length;
    }

    currentView = 'front';
    updateModelListUI();
    updateModelDisplay();
    updateURL();
    updateListPosition();
  }, { passive: false });

  // 触摸滑动支持
  let touchStartX = 0;
  let touchEndX = 0;

  modelSelector.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  modelSelector.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });

  function handleSwipe() {
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        currentModelIndex = (currentModelIndex + 1) % models.length;
      } else {
        currentModelIndex = (currentModelIndex - 1 + models.length) % models.length;
      }
      currentView = 'front';
      updateModelListUI();
      updateModelDisplay();
      updateURL();
      updateListPosition();
    }
  }

  // 窗口大小变化时重新计算位置
  window.addEventListener('resize', () => {
    updateListPosition();
  });
});