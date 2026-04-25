// ========== DOM Elements ==========
const nav = document.querySelector('.nav');
const heroScroll = document.querySelector('.hero-scroll');
const animatedElements = document.querySelectorAll('.animate-on-scroll');
const statValues = document.querySelectorAll('.stat-value');
const counters = document.querySelectorAll('[data-counter]');

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
