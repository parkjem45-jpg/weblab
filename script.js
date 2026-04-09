// ===== THEME TOGGLE =====
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;
const savedTheme = localStorage.getItem('theme') || 'light';

if (savedTheme === 'dark') {
  html.classList.add('dark-mode');
}

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    html.classList.toggle('dark-mode');
    const isDark = html.classList.contains('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    themeToggle.innerHTML = isDark ? '☀️' : '🌙';
  });
  themeToggle.innerHTML = savedTheme === 'dark' ? '☀️' : '🌙';
}

// ===== LANGUAGE TOGGLE =====
const langToggle = document.getElementById('langToggle');
let currentLang = localStorage.getItem('lang') || 'bn';

function applyLanguage(lang) {
  document.querySelectorAll('[data-bn][data-en]').forEach(el => {
    el.textContent = lang === 'bn' ? el.dataset.bn : el.dataset.en;
  });
  
  if (langToggle) {
    langToggle.textContent = lang === 'bn' ? '🌐 EN' : '🌐 BN';
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

// ===== MOBILE MENU - COMPLETELY FIXED (No blur issues) =====
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const navOverlay = document.getElementById('nav-overlay');

function closeMenu() {
  if (navLinks && navLinks.classList.contains('active')) {
    navLinks.classList.remove('active');
    if (navOverlay) navOverlay.classList.remove('active');
    document.body.classList.remove('menu-open');
    document.body.style.overflow = '';
    if (menuToggle) {
      menuToggle.innerHTML = '☰';
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  }
}

function openMenu() {
  if (navLinks && !navLinks.classList.contains('active')) {
    navLinks.classList.add('active');
    if (navOverlay) navOverlay.classList.add('active');
    document.body.classList.add('menu-open');
    document.body.style.overflow = 'hidden';
    if (menuToggle) {
      menuToggle.innerHTML = '✕';
      menuToggle.setAttribute('aria-expanded', 'true');
    }
  }
}

function toggleMenu() {
  if (navLinks && navLinks.classList.contains('active')) {
    closeMenu();
  } else {
    openMenu();
  }
}

// Add click event to menu button
if (menuToggle) {
  menuToggle.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    toggleMenu();
  });
}

// Close menu when clicking overlay
if (navOverlay) {
  navOverlay.addEventListener('click', function() {
    closeMenu();
  });
}

// Close menu when any nav link or button is clicked (on mobile)
if (navLinks) {
  navLinks.querySelectorAll('a, button').forEach(item => {
    item.addEventListener('click', function() {
      if (window.innerWidth <= 768) {
        setTimeout(closeMenu, 150);
      }
    });
  });
}

// Close menu on ESC key
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    closeMenu();
  }
});

// Close menu on window resize (if screen becomes desktop)
window.addEventListener('resize', function() {
  if (window.innerWidth > 768) {
    closeMenu();
  }
});

// ===== ACTIVE NAV HIGHLIGHT =====
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a[href]').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    link.classList.add('active');
  }
});

// ===== SCROLL REVEAL =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));

// ===== DYNAMIC YEAR =====
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ===== CARD GLOW EFFECT =====
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty('--mx', x + '%');
    card.style.setProperty('--my', y + '%');
  });
});