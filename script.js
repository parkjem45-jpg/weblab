// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
  
  // ===== MOBILE MENU - FIXED =====
  const menuBtn = document.getElementById('menuBtn');
  const navLinks = document.getElementById('navLinks');
  const overlay = document.getElementById('navOverlay');
  
  function closeMenu() {
    if (navLinks) navLinks.classList.remove('active');
    if (overlay) overlay.classList.remove('active');
    document.body.classList.remove('menu-open');
    document.body.style.overflow = '';
    if (menuBtn) menuBtn.innerHTML = '☰';
  }
  
  function openMenu() {
    if (navLinks) navLinks.classList.add('active');
    if (overlay) overlay.classList.add('active');
    document.body.classList.add('menu-open');
    document.body.style.overflow = 'hidden';
    if (menuBtn) menuBtn.innerHTML = '✕';
  }
  
  if (menuBtn) {
    menuBtn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      if (navLinks && navLinks.classList.contains('active')) {
        closeMenu();
      } else {
        openMenu();
      }
    });
  }
  
  if (overlay) {
    overlay.addEventListener('click', closeMenu);
  }
  
  if (navLinks) {
    navLinks.querySelectorAll('a, button').forEach(function(el) {
      el.addEventListener('click', function() {
        setTimeout(closeMenu, 150);
      });
    });
  }
  
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeMenu();
  });
  
  window.addEventListener('resize', function() {
    if (window.innerWidth > 768) closeMenu();
  });
  
  // ===== THEME TOGGLE =====
  const themeBtns = document.querySelectorAll('#themeBtn, #themeBtnDesktop');
  const html = document.documentElement;
  const savedTheme = localStorage.getItem('theme') || 'light';
  
  if (savedTheme === 'dark') {
    html.classList.add('dark-mode');
  }
  
  themeBtns.forEach(function(btn) {
    if (btn) {
      btn.addEventListener('click', function() {
        html.classList.toggle('dark-mode');
        const isDark = html.classList.contains('dark-mode');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        themeBtns.forEach(function(b) {
          if (b) b.innerHTML = isDark ? '☀️' : '🌙';
        });
      });
      btn.innerHTML = savedTheme === 'dark' ? '☀️' : '🌙';
    }
  });
  
  // ===== LANGUAGE TOGGLE =====
  const langBtns = document.querySelectorAll('#langBtn, #langBtnDesktop');
  let currentLang = localStorage.getItem('lang') || 'bn';
  
  function updateLanguage(lang) {
    document.querySelectorAll('[data-bn][data-en]').forEach(function(el) {
      el.textContent = lang === 'bn' ? el.getAttribute('data-bn') : el.getAttribute('data-en');
    });
    langBtns.forEach(function(btn) {
      if (btn) btn.textContent = lang === 'bn' ? '🌐 EN' : '🌐 BN';
    });
    document.documentElement.lang = lang;
  }
  
  langBtns.forEach(function(btn) {
    if (btn) {
      btn.addEventListener('click', function() {
        currentLang = currentLang === 'bn' ? 'en' : 'bn';
        localStorage.setItem('lang', currentLang);
        updateLanguage(currentLang);
      });
    }
  });
  updateLanguage(currentLang);
  
  // ===== SCROLL REVEAL =====
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  document.querySelectorAll('.scroll-reveal').forEach(function(el) {
    observer.observe(el);
  });
  
  // ===== DYNAMIC YEAR =====
  const yearSpan = document.getElementById('year');
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();
  
  // ===== ACTIVE NAV HIGHLIGHT =====
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a[href]').forEach(function(link) {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
  
});