(function() {
  'use strict';

  // ---------- Subjects data (9 items) ----------
  const subjects = [
    { 
      bengali: "পদার্থবিজ্ঞান প্রথম পত্র", 
      english: "Physics First Paper",
      hasTwoPapers: true 
    },
    { 
      bengali: "পদার্থবিজ্ঞান দ্বিতীয় পত্র", 
      english: "Physics Second Paper",
      hasTwoPapers: true 
    },
    { 
      bengali: "রসায়ন প্রথম পত্র", 
      english: "Chemistry First Paper",
      hasTwoPapers: true 
    },
    { 
      bengali: "রসায়ন দ্বিতীয় পত্র", 
      english: "Chemistry Second Paper",
      hasTwoPapers: true 
    },
    { 
      bengali: "জীববিজ্ঞান প্রথম পত্র", 
      english: "Biology First Paper",
      hasTwoPapers: true 
    },
    { 
      bengali: "জীববিজ্ঞান দ্বিতীয় পত্র", 
      english: "Biology Second Paper",
      hasTwoPapers: true 
    },
    { 
      bengali: "উচ্চতর গণিত প্রথম পত্র", 
      english: "Higher Math First Paper",
      hasTwoPapers: true 
    },
    { 
      bengali: "উচ্চতর গণিত দ্বিতীয় পত্র", 
      english: "Higher Math Second Paper",
      hasTwoPapers: true 
    },
    { 
      bengali: "তথ্য ও যোগাযোগ প্রযুক্তি", 
      english: "ICT",
      hasTwoPapers: false 
    }
  ];

  const grid = document.getElementById('subjectGrid');
  if (!grid) return;

  // ---------- Render cards ----------
  function renderCards() {
    let html = '';
    subjects.forEach((subj, index) => {
      const imgId = `cover-${index}`;
      const inputId = `upload-${index}`;
      
      // Default SVG placeholder with Bengali text
      const defaultSvg = encodeURIComponent(`
        <svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300">
          <rect width="400" height="300" fill="#a0b9ce"/>
          <text x="30" y="170" font-family="Poppins, sans-serif" font-size="20" fill="#1e3a5f">📘 ${subj.bengali}</text>
        </svg>
      `).replace(/'/g, '%27');
      
      html += `
        <div class="subject-card">
          <div class="subject-header">
            <div class="subject-name">${subj.bengali}</div>
            <div class="eng-sub">${subj.english}</div>
          </div>
          <div class="cover-section">
            <img class="cover-img" id="${imgId}" 
                 src="data:image/svg+xml,${defaultSvg}"
                 alt="${subj.bengali} কভার">
          </div>
          <div class="upload-wrapper">
            <label class="upload-label" for="${inputId}">
              <i>🖼️</i> কভার ছবি আপলোড
            </label>
            <input type="file" id="${inputId}" accept="image/*" data-img-target="${imgId}">
          </div>
          ${!subj.hasTwoPapers ? '<div class="badge-note">📌 একটিমাত্র পত্র (আইসিটি)</div>' : ''}
        </div>
      `;
    });
    grid.innerHTML = html;

    // Attach event listeners to all file inputs
    document.querySelectorAll('input[type="file"]').forEach(input => {
      input.addEventListener('change', handleImageUpload);
    });
  }

  // ---------- Handle image upload (auto adjust) ----------
  function handleImageUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    const imgTargetId = event.target.dataset.imgTarget;
    const imgElement = document.getElementById(imgTargetId);
    if (!imgElement) return;

    // Check if image
    if (!file.type.startsWith('image/')) {
      alert('অনুগ্রহ করে একটি ছবি ফাইল নির্বাচন করুন।');
      event.target.value = ''; // Clear input
      return;
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('ফাইল সাইজ ৫MB এর বেশি হতে পারবে না।');
      event.target.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
      imgElement.src = e.target.result;
    };
    reader.onerror = function() {
      alert('ছবি লোড করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।');
    };
    reader.readAsDataURL(file);
  }

  // ---------- Theme toggle (light/dark) ----------
  const themeBtn = document.getElementById('themeToggleBtn');
  const themeText = document.getElementById('themeText');
  const themeIcon = document.getElementById('themeIcon');

  function setTheme(isDark) {
    if (isDark) {
      document.body.classList.add('dark');
      if (themeText) themeText.textContent = 'লাইট মোড';
      if (themeIcon) themeIcon.textContent = '☀️';
      localStorage.setItem('kspsc-theme', 'dark');
      // Update theme-color meta for mobile browsers
      document.querySelector('meta[name="theme-color"]')?.setAttribute('content', '#0e1a26');
    } else {
      document.body.classList.remove('dark');
      if (themeText) themeText.textContent = 'ডার্ক মোড';
      if (themeIcon) themeIcon.textContent = '🌙';
      localStorage.setItem('kspsc-theme', 'light');
      document.querySelector('meta[name="theme-color"]')?.setAttribute('content', '#f5f9ff');
    }
  }

  function initTheme() {
    const savedTheme = localStorage.getItem('kspsc-theme');
    // Default: light mode
    if (savedTheme === 'dark') {
      setTheme(true);
    } else {
      setTheme(false);
    }
  }

  if (themeBtn) {
    themeBtn.addEventListener('click', function(e) {
      e.preventDefault();
      const isDarkNow = document.body.classList.contains('dark');
      setTheme(!isDarkNow);
    });
    
    // Touch event fix for mobile
    themeBtn.addEventListener('touchstart', function(e) {
      // Just to ensure no default behavior issues
    }, { passive: true });
  }

  // ---------- Initialize ----------
  renderCards();
  initTheme();

  // Fix for iOS :active states
  document.addEventListener('touchstart', function(){}, {passive: true});

})();