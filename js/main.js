// ========== DOM Elements ==========
const nav = document.querySelector('.nav');
const heroScroll = document.querySelector('.hero-scroll');
const animatedElements = document.querySelectorAll('.animate-on-scroll');
const statValues = document.querySelectorAll('.stat-value');
const counters = document.querySelectorAll('[data-counter]');

// ========== Mute Button ==========
const muteBtn = document.getElementById('muteBtn');
const heroVideo = document.querySelector('.hero-video');

if (muteBtn && heroVideo) {
  let isSpinning = false;

  muteBtn.addEventListener('click', () => {
    if (isSpinning) return;
    isSpinning = true;

    muteBtn.classList.add('spinning');
    setTimeout(() => muteBtn.classList.remove('spinning'), 400);

    if (heroVideo.muted) {
      heroVideo.muted = false;
      muteBtn.classList.add('sound-on');
    } else {
      heroVideo.muted = true;
      muteBtn.classList.remove('sound-on');
    }

    setTimeout(() => {
      isSpinning = false;
    }, 400);
  });
}

// ========== Language Toggle ==========
const translations = {
  'nav-models': { zh: '车型', en: 'Models' },
  'nav-about': { zh: '关于', en: 'About' },
  'hero-subtitle': { zh: '驾驭未来的极致美学', en: 'The Ultimate Aesthetic of Future Driving' },
  'hero-cta': { zh: '探索车型', en: 'Explore Models' },
  'scroll-text': { zh: '向下滚动', en: 'Scroll Down' },
  'philosophy-title': { zh: '重新定义驾驶', en: 'Redefining Driving' },
  'philosophy-text': { zh: '我们相信，真正的驾驶乐趣源于科技与艺术的完美融合。每一辆 AUDI 都是对未来出行的大胆想象——极致的性能、环保的理念、智能的交互，在这里，每一个细节都为驾驭者而生。', en: 'We believe that true driving pleasure comes from the perfect fusion of technology and art. Every AUDI is a bold imagination of future mobility — extreme performance, eco-friendly philosophy, and intelligent interaction, where every detail is crafted for the driver.' },
  'models-title': { zh: '车型系列', en: 'Model Series' },
  'tab-sports': { zh: '跑车', en: 'Sports' },
  'tab-sedan': { zh: '轿车', en: 'Sedan' },
  'tab-suv': { zh: 'SUV', en: 'SUV' },
  'tab-electric': { zh: '纯电', en: 'Electric' },
  'tab-f1': { zh: 'F1', en: 'F1' },
  'card-sports-title': { zh: 'AUDI 跑车系列', en: 'AUDI Sports Series' },
  'card-sports-desc': { zh: '极速超跑 · 赛道基因', en: 'Speed · Track Heritage' },
  'card-sports-text': { zh: '极致性能与环保理念的完美融合，专为追求速度与激情的驾驶者打造。', en: 'The perfect fusion of extreme performance and eco-friendly philosophy, designed for drivers who pursue speed and passion.' },
  'card-sedan-title': { zh: 'AUDI 轿车系列', en: 'AUDI Sedan Series' },
  'card-sedan-desc': { zh: '智能豪华 · 行政级座驾', en: 'Intelligent Luxury · Executive Sedan' },
  'card-sedan-text': { zh: '智能豪华与行政级舒适的典范，为追求品质生活的精英人士倾力呈现。', en: 'The epitome of intelligent luxury and executive comfort, crafted for elites seeking quality life.' },
  'card-suv-title': { zh: 'AUDI SUV 系列', en: 'AUDI SUV Series' },
  'card-suv-desc': { zh: '全地形驾驭 · 豪华空间', en: 'All-Terrain · Luxury Space' },
  'card-suv-text': { zh: '全地形驾驭能力与豪华空间的完美结合，满足探索未知的渴望。', en: 'The perfect combination of all-terrain capability and luxury space, satisfying the desire to explore the unknown.' },
  'card-electric-title': { zh: 'AUDI e-tron', en: 'AUDI e-tron' },
  'card-electric-desc': { zh: '零排放 · 可持续未来', en: 'Zero Emissions · Sustainable Future' },
  'card-electric-text': { zh: '零排放出行新纪元，以创新科技引领可持续未来驾驶体验。', en: 'A new era of zero-emission mobility, leading sustainable future driving experience with innovative technology.' },
  'card-f1-title': { zh: 'AUDI F1', en: 'AUDI F1' },
  'card-f1-desc': { zh: '赛道科技 · 民用化极致之作', en: 'Track Technology · Ultimate Commercialization' },
  'card-f1-text': { zh: '赛道科技民用化的极致之作，将赛车基因融入日常驾驶。', en: 'The ultimate example of track technology commercialized, integrating racing DNA into daily driving.' },
  'keyword-speed': { zh: '速度与激情', en: 'Speed & Passion' },
  'keyword-city': { zh: '城市', en: 'City' },
  'keyword-business': { zh: '商务', en: 'Business' },
  'keyword-family': { zh: '家庭', en: 'Family' },
  'keyword-explore': { zh: '探索', en: 'Explore' },
  'keyword-offroad': { zh: '越野', en: 'Off-road' },
  'keyword-eco': { zh: '环保', en: 'Eco' },
  'keyword-tech': { zh: '科技', en: 'Tech' },
  'keyword-future': { zh: '未来', en: 'Future' },
  'keyword-track': { zh: '赛道', en: 'Track' },
  'keyword-performance': { zh: '性能', en: 'Performance' },
  'explore-more': { zh: '了解更多', en: 'Explore More' },
  'footer-privacy': { zh: '隐私政策', en: 'Privacy Policy' },
  'footer-terms': { zh: '使用条款', en: 'Terms of Use' },
  'footer-contact': { zh: '联系我们', en: 'Contact Us' },
  'footer-join': { zh: '加入我们', en: 'Join Us' },
  'copyright': { zh: '© 2026 AUDI Motors. All rights reserved. 京ICP备XXXXXXXX号', en: '© 2026 AUDI Motors. All rights reserved. ICP Beijing XXXXXXXX' }
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

// Initialize language from localStorage
const savedLang = localStorage.getItem('lang') || 'zh';
setLanguage(savedLang);

// Bind click events to language buttons
document.querySelectorAll('.lang-btn').forEach(btn => {
  btn.addEventListener('click', () => setLanguage(btn.dataset.lang));
});

// ========== Navigation Scroll Effect ==========
function handleNavScroll() {
  if (window.scrollY > 100) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
}

window.addEventListener('scroll', handleNavScroll);
handleNavScroll(); // Check on load

// ========== Intersection Observer for Scroll Animations ==========
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};

const animationObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');

      // Trigger counter animation if element has data-counter attribute
      const counterTarget = entry.target.querySelector('[data-counter]');
      if (counterTarget && !counterTarget.classList.contains('counted')) {
        animateCounter(counterTarget);
        counterTarget.classList.add('counted');
      }

      // Unobserve after animation triggers
      animationObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all animated elements
animatedElements.forEach(el => {
  animationObserver.observe(el);
});

// ========== Counter Animation ==========
function animateCounter(element) {
  const target = parseInt(element.getAttribute('data-counter'));
  const suffix = element.getAttribute('data-suffix') || '';
  const prefix = element.getAttribute('data-prefix') || '';
  const duration = 2000;
  const frameDuration = 1000 / 60;
  const totalFrames = Math.round(duration / frameDuration);
  const easeOutQuad = t => t * (2 - t);

  let frame = 0;

  const animate = () => {
    frame++;
    const progress = easeOutQuad(frame / totalFrames);
    const currentValue = Math.round(target * progress);

    element.innerHTML = `${prefix}${currentValue}${suffix}`;

    if (frame < totalFrames) {
      requestAnimationFrame(animate);
    } else {
      element.innerHTML = `${prefix}${target}${suffix}`;
    }
  };

  animate();
}

// ========== Smooth Scroll for Navigation Links ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ========== Parallax Effect for Hero ==========
const hero = document.querySelector('.hero');

function handleParallax() {
  const scrolled = window.scrollY;
  const heroHeight = hero.offsetHeight;

  if (scrolled < heroHeight) {
    const parallaxOffset = scrolled * 0.3;
    const opacity = 1 - (scrolled / heroHeight);

    if (heroScroll) {
      heroScroll.style.opacity = opacity;
      heroScroll.style.transform = `translateX(-50%) translateY(${parallaxOffset}px)`;
    }
  }
}

window.addEventListener('scroll', handleParallax);

// ========== Tech Cards Hover Effect ==========
const techCards = document.querySelectorAll('.tech-card');

techCards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.transform = 'translateY(-8px)';
    card.style.borderColor = 'var(--orange-vibrant)';
    card.style.boxShadow = '0 0 30px rgba(255, 107, 53, 0.15)';
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.borderColor = '';
    card.style.boxShadow = '';
  });
});

// ========== Button Ripple Effect ==========
const buttons = document.querySelectorAll('.btn');

buttons.forEach(btn => {
  btn.addEventListener('click', function(e) {
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const ripple = document.createElement('span');
    ripple.style.cssText = `
      position: absolute;
      background: rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      transform: scale(0);
      animation: ripple 0.6s linear;
      pointer-events: none;
      left: ${x}px;
      top: ${y}px;
      width: 100px;
      height: 100px;
      margin-left: -50px;
      margin-top: -50px;
    `;

    this.style.position = 'relative';
    this.style.overflow = 'hidden';
    this.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
  });
});

// Add ripple keyframes
const style = document.createElement('style');
style.textContent = `
  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// ========== Stats Animation Trigger ==========
const statsSection = document.querySelector('.stats');

if (statsSection) {
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const statValues = entry.target.querySelectorAll('.stat-value');
        statValues.forEach((stat, index) => {
          setTimeout(() => {
            const target = parseInt(stat.getAttribute('data-counter'));
            const suffix = stat.getAttribute('data-suffix') || '';
            animateCounter(stat, target, suffix);
          }, index * 200);
        });
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  statsObserver.observe(statsSection);
}

// Update animateCounter to accept optional suffix parameter
function animateCounter(element, target, suffix = '') {
  const duration = 2000;
  const frameDuration = 1000 / 60;
  const totalFrames = Math.round(duration / frameDuration);
  const easeOutQuad = t => t * (2 - t);

  let frame = 0;

  const animate = () => {
    frame++;
    const progress = easeOutQuad(frame / totalFrames);
    const currentValue = Math.round(target * progress);

    element.innerHTML = `${currentValue}${suffix}`;

    if (frame < totalFrames) {
      requestAnimationFrame(animate);
    } else {
      element.innerHTML = `${target}${suffix}`;
    }
  };

  animate();
}

// ========== Mobile Menu Toggle (if needed) ==========
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');

if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener('click', () => {
    document.body.classList.toggle('menu-open');
  });
}

// ========== Preloader (optional) ==========
window.addEventListener('load', () => {
  document.body.classList.add('loaded');

  // Trigger hero animations after page load
  setTimeout(() => {
    document.querySelectorAll('.hero-content > *').forEach((el, index) => {
      el.style.animationDelay = `${index * 0.2}s`;
      el.classList.add('animate-fade-in-up');
    });
  }, 100);
});

// ========== Accessibility: keyboard navigation ==========
document.addEventListener('keydown', (e) => {
  // ESC to close any open modals/menus
  if (e.key === 'Escape') {
    document.body.classList.remove('menu-open');
  }
});

// ========== Category Tabs Switching ==========
const categoryTabs = document.querySelectorAll('.category-tab');
const categoryContents = document.querySelectorAll('.category-content');

categoryTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const category = tab.getAttribute('data-category');

    // 更新 Tab 状态
    categoryTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    // 切换内容
    categoryContents.forEach(content => {
      if (content.getAttribute('data-category') === category) {
        content.classList.add('active');
        // 初始化当前分类的轮播
        initCarousel(content);
      } else {
        content.classList.remove('active');
      }
    });
  });
});

// ========== Image Carousel ==========
function initCarousel(container) {
  const carousel = container.querySelector('.image-carousel');
  if (!carousel) return;

  const track = carousel.querySelector('.carousel-track');
  const images = track.querySelectorAll('img');
  const dotsContainer = carousel.querySelector('.carousel-dots');
  const leftBtn = carousel.querySelector('.carousel-btn-left');
  const rightBtn = carousel.querySelector('.carousel-btn-right');

  if (images.length <= 1) {
    if (leftBtn) leftBtn.style.display = 'none';
    if (rightBtn) rightBtn.style.display = 'none';
    if (dotsContainer) dotsContainer.style.display = 'none';
    return;
  }

  let currentIndex = 0;
  const totalImages = images.length;

  // 创建 dots
  dotsContainer.innerHTML = '';
  for (let i = 0; i < totalImages; i++) {
    const dot = document.createElement('span');
    dot.className = 'dot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
  }

  function updateCarousel() {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    const dots = dotsContainer.querySelectorAll('.dot');
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentIndex);
    });
  }

  function goToSlide(index) {
    currentIndex = index;
    updateCarousel();
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % totalImages;
    updateCarousel();
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + totalImages) % totalImages;
    updateCarousel();
  }

  if (leftBtn) leftBtn.addEventListener('click', prevSlide);
  if (rightBtn) rightBtn.addEventListener('click', nextSlide);
}

// 初始化当前显示的分类轮播
document.querySelectorAll('.category-content.active').forEach(content => {
  initCarousel(content);
});

// ========== Console greeting ==========
console.log('%c AUDI Motors ', 'background: #ff6b35; color: #000; font-size: 20px; padding: 10px 20px; font-weight: bold;');
console.log('%c 驾驭未来的极致美学 ', 'color: #888; font-size: 14px;');
