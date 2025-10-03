import './style.css'

// 移动端菜单切换
document.addEventListener('DOMContentLoaded', function() {
  const mobileMenuButton = document.querySelector('.mobile-menu-button');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileMenuPanel = document.querySelector('.mobile-menu-panel');
  const mobileMenuClose = document.querySelector('.mobile-menu-close');
  
  // 打开移动端菜单
  if (mobileMenuButton && mobileMenu && mobileMenuPanel) {
    mobileMenuButton.addEventListener('click', function() {
      mobileMenu.classList.remove('hidden');
      // 使用 setTimeout 确保 DOM 更新后再添加动画类
      setTimeout(() => {
        mobileMenuPanel.classList.remove('translate-x-full');
      }, 10);
    });
  }
  
  // 关闭移动端菜单
  function closeMobileMenu() {
    if (mobileMenuPanel && mobileMenu) {
      mobileMenuPanel.classList.add('translate-x-full');
      setTimeout(() => {
        mobileMenu.classList.add('hidden');
      }, 300); // 等待动画完成
    }
  }
  
  if (mobileMenuClose) {
    mobileMenuClose.addEventListener('click', closeMobileMenu);
  }
  
  // 点击背景关闭菜单
  if (mobileMenu) {
    mobileMenu.addEventListener('click', function(e) {
      if (e.target === mobileMenu) {
        closeMobileMenu();
      }
    });
  }

  // 平滑滚动到锚点
  document.addEventListener('click', function(e) {
    // 检查点击的是否是锚点链接
    const link = e.target.closest('a[href^="#"]');
    if (link && link.getAttribute('href') !== '#') {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        const offsetTop = targetElement.offsetTop - 80; // 考虑固定导航栏高度
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
      
      // 关闭移动端菜单
      closeMobileMenu();
    }
  });

  // 导航栏滚动效果
  let lastScrollTop = 0;
  const header = document.querySelector('header');
  
  window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // 添加/移除导航栏背景
    if (scrollTop > 10) {
      header.classList.add('bg-gray-900/95', 'backdrop-blur-sm');
    } else {
      header.classList.remove('bg-gray-900/95', 'backdrop-blur-sm');
    }
    
    lastScrollTop = scrollTop;
  });

  // 隐私政策切换开关
  const agreeToggle = document.querySelector('.agree-toggle');
  const agreeToggleButton = document.querySelector('.agree-toggle-button');
  const agreeCheckbox = document.querySelector('#agree-to-policies');
  
  if (agreeToggle && agreeToggleButton && agreeCheckbox) {
    agreeToggle.addEventListener('click', function() {
      const isChecked = agreeCheckbox.checked;
      agreeCheckbox.checked = !isChecked;
      
      if (agreeCheckbox.checked) {
        agreeToggle.classList.add('bg-blue-600');
        agreeToggle.classList.remove('bg-white/5');
        agreeToggleButton.classList.add('translate-x-3.5');
        agreeToggle.setAttribute('aria-checked', 'true');
      } else {
        agreeToggle.classList.remove('bg-blue-600');
        agreeToggle.classList.add('bg-white/5');
        agreeToggleButton.classList.remove('translate-x-3.5');
        agreeToggle.setAttribute('aria-checked', 'false');
      }
    });
  }

  // 表单提交处理
  const contactForm = document.querySelector('#contact form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // 获取表单数据
      const name = this.querySelector('#name').value;
      const company = this.querySelector('#company').value;
      const message = this.querySelector('#message').value;
      const phone = this.querySelector('#phone-number').value;
      
      // 简单的表单验证
      if (!name || !company || !message || !phone) {
        alert('请填写所有必填信息！');
        return;
      }
      
      // 模拟表单提交
      alert('感谢您的留言！我们会尽快与您联系。');
      this.reset();
    });
  }

  // 添加滚动动画效果 - 排除背景元素和按钮区域
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      // 不给背景元素添加动画
      if (entry.target.hasAttribute('aria-hidden')) return;
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fade-in');
      }
    });
  }, observerOptions);

  // 观察需要动画的元素 - 排除aria-hidden的背景元素
  const animateElements = document.querySelectorAll('section > div:not([aria-hidden])');
  animateElements.forEach(el => {
    observer.observe(el);
  });
});

// 添加一些实用的工具函数
window.scrollToTop = function() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

// 添加页面加载完成后的初始化
window.addEventListener('load', function() {
  // 添加页面加载动画
  document.body.classList.add('loaded');
});