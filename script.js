// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ===== MOBILE NAV =====
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ===== PARTICLES =====
const particleContainer = document.getElementById('particles');
if (particleContainer) {
  for (let i = 0; i < 50; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.cssText = `
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      --dur: ${4 + Math.random() * 6}s;
      --delay: ${Math.random() * 6}s;
      --ty: ${-40 - Math.random() * 60}px;
      --tx: ${(Math.random() - 0.5) * 60}px;
      --opacity: ${0.2 + Math.random() * 0.5};
      width: ${1 + Math.random() * 3}px;
      height: ${1 + Math.random() * 3}px;
    `;
    particleContainer.appendChild(p);
  }
}

// ===== SCROLL ANIMATIONS =====
const fadeElements = document.querySelectorAll(
  '.about-grid, .timeline-item, .org-card, .event-card, .gallery-item, .spiritual-layout, .katha-card, .victory-banner, .ci-item, .oc-item'
);
fadeElements.forEach(el => el.classList.add('fade-in'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, entry.target.dataset.delay || 0);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

// Stagger children
document.querySelectorAll('.events-grid, .orgs-grid, .gallery-grid, .history-timeline').forEach(parent => {
  Array.from(parent.children).forEach((child, i) => {
    child.dataset.delay = i * 80;
  });
});

fadeElements.forEach(el => observer.observe(el));

// ===== SMOOTH ACTIVE NAV =====
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

function updateActiveNav() {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });
  navAnchors.forEach(a => {
    a.style.color = '';
    if (a.getAttribute('href') === '#' + current) {
      a.style.color = 'var(--gold-light)';
    }
  });
}
window.addEventListener('scroll', updateActiveNav);

// ===== COUNTER ANIMATION =====
function animateCounter(el, target, suffix = '') {
  let start = 0;
  const duration = 1800;
  const increment = target / (duration / 16);
  const timer = setInterval(() => {
    start += increment;
    if (start >= target) {
      start = target;
      clearInterval(timer);
    }
    el.textContent = Math.floor(start) + suffix;
  }, 16);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const nums = entry.target.querySelectorAll('.stat-num');
      nums.forEach(num => {
        const text = num.textContent;
        const val = parseInt(text.replace(/[^0-9]/g, ''));
        if (!isNaN(val) && val > 1) {
          const suffix = text.replace(/[0-9]/g, '');
          animateCounter(num, val, suffix);
        }
      });
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) statsObserver.observe(heroStats);

const kathaObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.katha-num').forEach(el => {
        const text = el.textContent;
        const val = parseInt(text.replace(/[^0-9]/g, ''));
        if (!isNaN(val) && val > 1) {
          const suffix = text.replace(/[0-9]/g, '');
          animateCounter(el, val, suffix);
        }
      });
      kathaObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.4 });

const kathaCard = document.querySelector('.katha-card');
if (kathaCard) kathaObserver.observe(kathaCard);

// ===== GALLERY HOVER EFFECT =====
document.querySelectorAll('.gallery-item').forEach(item => {
  item.addEventListener('mouseenter', () => {
    item.style.zIndex = '10';
  });
  item.addEventListener('mouseleave', () => {
    item.style.zIndex = '';
  });
});

// ===== PAGE LOAD ANIMATION =====
document.addEventListener('DOMContentLoaded', () => {
  document.body.style.opacity = '0';
  setTimeout(() => {
    document.body.style.transition = 'opacity 0.5s ease';
    document.body.style.opacity = '1';
  }, 50);
});
