// 🔥 LANGUAGE TOGGLE
const langToggle = document.getElementById('lang-toggle');
let currentLang = localStorage.getItem('lang') || 'bn';

function applyLanguage(lang) {
  document.querySelectorAll('[data-bn][data-en]').forEach(el => {
    el.textContent = lang === 'bn' ? el.dataset.bn : el.dataset.en;
  });
  if (langToggle) {
    langToggle.textContent = lang === 'bn' ? '🌐 EN' : '🌐 BN';
    langToggle.setAttribute('aria-label', lang === 'bn' ? 'Switch to English' : 'বাংলায় পরিবর্তন করুন');
  }
  document.documentElement.lang = lang;
}

if (langToggle) {
  langToggle.addEventListener('click', () => {
    currentLang = currentLang === 'bn' ? 'en' : 'bn';
    localStorage.setItem('lang', currentLang);
    applyLanguage(currentLang);
  });
  applyLanguage(currentLang);
}

// 🌙 THEME TOGGLE
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;
const savedTheme = localStorage.getItem('theme') || 'light';
if (savedTheme === 'dark') html.classList.add('dark-mode');

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    html.classList.toggle('dark-mode');
    const isDark = html.classList.contains('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    themeToggle.innerHTML = isDark ? '☀️' : '🌙';
  });
  themeToggle.innerHTML = savedTheme === 'dark' ? '☀️' : '🌙';
}

// 📱 MOBILE MENU (Swipe Fixed)
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.getElementById('nav-links');
const navOverlay = document.getElementById('nav-overlay');

function toggleMenu() {
  const isOpen = navLinks.classList.contains('active');
  navLinks.classList.toggle('active');
  navOverlay.classList.toggle('active');
  menuToggle.innerHTML = isOpen ? '☰' : '✕';
  document.body.style.overflow = isOpen ? '' : 'hidden'; // Prevent background scroll
}

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', toggleMenu);
  navOverlay.addEventListener('click', toggleMenu);
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      if (navLinks.classList.contains('active')) toggleMenu();
    });
  });
}

// 🔗 ACTIVE NAV HIGHLIGHT
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(link => {
  if (link.getAttribute('href') === currentPage || (currentPage === '' && link.getAttribute('href') === 'index.html')) {
    link.classList.add('active');
  }
});

// 🌟 CARD GLOW
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    card.style.setProperty('--mx', ((e.clientX - r.left) / r.width) * 100 + '%');
    card.style.setProperty('--my', ((e.clientY - r.top) / r.height) * 100 + '%');
  });
});

// 📜 SCROLL REVEAL
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));

// 📅 DYNAMIC YEAR
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();