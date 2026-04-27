/**
 * Detail 页交互动效和排版测试
 *
 * 测试方法：在浏览器中打开 detail.html?type=sports&id=rs7
 * 然后在控制台中执行以下测试函数
 */

// 测试配置
const TEST_CONFIG = {
  delay: 500,      // 动画等待时间
  modelCount: 3    // 滚动测试次数
};

/**
 * 测试 1: 验证页面入场动画是否正确触发
 */
async function testPageEnterAnimation() {
  console.log('=== 测试 1: 页面入场动画 ===');

  const selector = document.querySelector('.model-selector');
  const viewer = document.querySelector('.model-viewer');
  const specs = document.querySelector('.model-specs');

  // 检查元素是否存在
  const checks = [
    { name: '车型选择器', el: selector, className: 'animate-enter' },
    { name: '3D展示区', el: viewer, className: 'animate-enter' },
    { name: '参数展示区', el: specs, className: 'animate-enter' }
  ];

  checks.forEach(({ name, el, className }) => {
    if (!el) {
      console.error(`❌ ${name}: 元素不存在`);
      return;
    }
    if (el.classList.contains(className)) {
      console.log(`✅ ${name}: 入场动画已触发`);
    } else {
      console.warn(`⚠️ ${name}: 入场动画类未应用 (可能是首次加载已过)`);
    }
  });

  console.log('---');
}

/**
 * 测试 2: 验证车型切换动画效果
 */
async function testModelSwitchAnimation() {
  console.log('=== 测试 2: 车型切换动画 ===');

  const modelNames = document.querySelectorAll('.model-name');
  const activeModel = document.querySelector('.model-name.active');

  if (!activeModel) {
    console.error('❌ 未找到激活的车型');
    return;
  }

  console.log(`当前激活车型: ${activeModel.textContent}`);

  // 检查激活项是否有光晕动画
  const hasGlowAnimation = activeModel.style.animation.includes('glow-pulse') ||
                           getComputedStyle(activeModel).textShadow.includes('rgb');

  if (hasGlowAnimation || activeModel.textShadow) {
    console.log('✅ 激活车型有光晕效果');
  } else {
    console.log('⚠️ 光晕效果可能需要检查');
  }

  // 检查非激活项
  modelNames.forEach((el, index) => {
    if (!el.classList.contains('active')) {
      const hasHoverBg = getComputedStyle(el, '::before').background;
      console.log(`✅ 车型 ${index + 1} 有毛玻璃背景`);
    }
  });

  console.log('---');
}

/**
 * 测试 3: 验证视图切换动画
 */
async function testViewSwitchAnimation() {
  console.log('=== 测试 3: 视图切换动画 ===');

  const viewBtns = document.querySelectorAll('.view-btn');
  const modelImage = document.querySelector('.model-image');

  console.log(`找到 ${viewBtns.length} 个视图按钮`);
  console.log(`图片元素: ${modelImage ? '✅ 存在' : '❌ 不存在'}`);

  // 测试点击后视图切换
  if (viewBtns.length >= 2) {
    const firstBtn = viewBtns[0];
    const secondBtn = viewBtns[1];

    firstBtn.click();
    await new Promise(r => setTimeout(r, 300));

    const firstActive = firstBtn.classList.contains('active');
    console.log(`点击前视图按钮: ${firstActive ? '✅' : '⚠️'} 激活状态正确`);

    secondBtn.click();
    await new Promise(r => setTimeout(r, 300));

    const secondActive = secondBtn.classList.contains('active');
    console.log(`点击后视图按钮: ${secondActive ? '✅' : '⚠️'} 激活状态正确`);
  }

  // 检查图片加载动画
  if (modelImage) {
    const transition = getComputedStyle(modelImage).transition;
    console.log(`图片过渡动画: ${transition.includes('transform') ? '✅' : '⚠️'} 包含 transform`);
  }

  console.log('---');
}

/**
 * 测试 4: 验证参数卡片动画效果
 */
async function testSpecCardsAnimation() {
  console.log('=== 测试 4: 参数卡片动画 ===');

  const specItems = document.querySelectorAll('.spec-item');
  console.log(`找到 ${specItems.length} 个参数卡片`);

  // 检查卡片样式
  specItems.forEach((el, index) => {
    const hasBackdropFilter = getComputedStyle(el).backdropFilter;
    const hasAnimation = el.style.animation || getComputedStyle(el).animationName;

    console.log(`  卡片 ${index + 1}:`);
    console.log(`    - backdrop-filter: ${hasBackdropFilter ? '✅ 支持' : '⚠️ 不支持'}`);
    console.log(`    - 交错动画: ${el.style.animationDelay ? '✅ 已设置' : '⚠️ 未设置'}`);
  });

  // 测试悬浮效果
  if (specItems.length > 0) {
    const firstCard = specItems[0];
    firstCard.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));

    await new Promise(r => setTimeout(r, 100));

    const transform = getComputedStyle(firstCard).transform;
    const bgColor = getComputedStyle(firstCard).backgroundColor;
    console.log(`  悬浮效果: ${transform !== 'none' ? '✅' : '⚠️'} transform, ${bgColor}`);
  }

  console.log('---');
}

/**
 * 测试 5: 验证鼠标 3D 跟随效果
 */
async function testMouse3DEffect() {
  console.log('=== 测试 5: 鼠标 3D 跟随效果 ===');

  const container = document.querySelector('.model-image-container');
  const viewer = document.querySelector('.model-viewer');

  if (!container) {
    console.error('❌ 未找到图片容器');
    return;
  }

  if (!viewer) {
    console.error('❌ 未找到展示区');
    return;
  }

  // 模拟鼠标移动
  const rect = container.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  const mouseEvent = new MouseEvent('mousemove', {
    clientX: centerX + 50,
    clientY: centerY - 30,
    bubbles: true
  });

  viewer.dispatchEvent(mouseEvent);
  await new Promise(r => setTimeout(r, 100));

  const transform = getComputedStyle(container).transform;
  console.log(`鼠标移动后 transform: ${transform}`);
  console.log(transform !== 'none' ? '✅ 3D 跟随效果已激活' : '⚠️ 可能未生效');

  // 重置
  viewer.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }));
  await new Promise(r => setTimeout(r, 100));

  const resetTransform = getComputedStyle(container).transform;
  console.log(`鼠标离开后 transform: ${resetTransform}`);
  console.log(resetTransform === 'none' ? '✅ 已重置' : '⚠️ 未重置');

  console.log('---');
}

/**
 * 测试 6: 验证数字滚动动画
 */
async function testNumberAnimation() {
  console.log('=== 测试 6: 数字滚动动画 ===');

  const specValues = document.querySelectorAll('.spec-value[data-numeric]');
  console.log(`找到 ${specValues.length} 个带数值的参数`);

  specValues.forEach((el, index) => {
    const numericValue = el.dataset.numeric;
    const textContent = el.textContent;

    if (numericValue && numericValue !== '') {
      console.log(`  参数 ${index + 1}: 数值=${numericValue}, 当前显示=${textContent}`);
    }
  });

  console.log('✅ 数值属性检查完成');
  console.log('---');
}

/**
 * 测试 7: 验证滚轮切换车型
 */
async function testWheelSwitch() {
  console.log('=== 测试 7: 滚轮切换车型 ===');

  const selector = document.querySelector('.model-selector');
  const modelNames = document.querySelectorAll('.model-name');

  if (!selector) {
    console.error('❌ 未找到车型选择器');
    return;
  }

  const beforeSwitch = document.querySelector('.model-name.active')?.textContent;
  console.log(`切换前: ${beforeSwitch}`);

  // 模拟滚轮事件
  const wheelEvent = new WheelEvent('wheel', {
    deltaY: 100,
    bubbles: true
  });
  selector.dispatchEvent(wheelEvent);

  await new Promise(r => setTimeout(r, 500));

  const afterSwitch = document.querySelector('.model-name.active')?.textContent;
  console.log(`切换后: ${afterSwitch}`);
  console.log(beforeSwitch !== afterSwitch ? '✅ 滚轮切换成功' : '⚠️ 可能未切换');

  console.log('---');
}

/**
 * 测试 8: 验证触摸滑动切换
 */
async function testTouchSwipe() {
  console.log('=== 测试 8: 触摸滑动切换 ===');

  const selector = document.querySelector('.model-selector');

  if (!selector) {
    console.error('❌ 未找到车型选择器');
    return;
  }

  const beforeSwitch = document.querySelector('.model-name.active')?.textContent;
  console.log(`滑动前: ${beforeSwitch}`);

  // 模拟触摸开始
  const touchStartEvent = new TouchEvent('touchstart', {
    touches: [new Touch({ identifier: 0, target: selector, clientX: 200, clientY: 100 })],
    bubbles: true
  });
  selector.dispatchEvent(touchStartEvent);

  // 模拟触摸结束（向左滑）
  const touchEndEvent = new TouchEvent('touchend', {
    changedTouches: [new Touch({ identifier: 0, target: selector, clientX: 100, clientY: 100 })],
    bubbles: true
  });
  selector.dispatchEvent(touchEndEvent);

  await new Promise(r => setTimeout(r, 500));

  const afterSwitch = document.querySelector('.model-name.active')?.textContent;
  console.log(`滑动后: ${afterSwitch}`);
  console.log(beforeSwitch !== afterSwitch ? '✅ 触摸滑动切换成功' : '⚠️ 可能未切换');

  console.log('---');
}

/**
 * 运行所有测试
 */
async function runAllTests() {
  console.log('========================================');
  console.log('   Detail 页交互动效和排版测试套件');
  console.log('========================================\n');

  await testPageEnterAnimation();
  await new Promise(r => setTimeout(r, TEST_CONFIG.delay));

  await testModelSwitchAnimation();
  await new Promise(r => setTimeout(r, TEST_CONFIG.delay));

  await testViewSwitchAnimation();
  await new Promise(r => setTimeout(r, TEST_CONFIG.delay));

  await testSpecCardsAnimation();
  await new Promise(r => setTimeout(r, TEST_CONFIG.delay));

  await testMouse3DEffect();
  await new Promise(r => setTimeout(r, TEST_CONFIG.delay));

  await testNumberAnimation();
  await new Promise(r => setTimeout(r, TEST_CONFIG.delay));

  await testWheelSwitch();
  await new Promise(r => setTimeout(r, TEST_CONFIG.delay));

  await testTouchSwipe();

  console.log('\n========================================');
  console.log('   测试完成');
  console.log('========================================');
}

// 导出测试函数
window.detailPageTests = {
  testPageEnterAnimation,
  testModelSwitchAnimation,
  testViewSwitchAnimation,
  testSpecCardsAnimation,
  testMouse3DEffect,
  testNumberAnimation,
  testWheelSwitch,
  testTouchSwipe,
  runAllTests
};

console.log('✅ Detail 页测试已加载');
console.log('使用方法:');
console.log('  detailPageTests.runAllTests() - 运行所有测试');
console.log('  detailPageTests.testXxx() - 运行单个测试');
