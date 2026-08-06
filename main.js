/* ============================================
   VARDHAMAN AINAPURE — PORTFOLIO JAVASCRIPT
   Premium animations, interactions, effects
   ============================================ */

'use strict';

/* ---- LOADER ---- */
(function initLoader() {
  const bar = document.getElementById('loaderBar');
  const status = document.getElementById('loaderStatus');
  const loader = document.getElementById('loader');
  if (!loader) return;

  const msgs = [
    'Initializing experience...',
    'Loading design system...',
    'Rendering animations...',
    'Almost ready...',
  ];
  let progress = 0;
  let msgIdx = 0;

  const updateMsg = () => {
    if (msgIdx < msgs.length && status) {
      status.textContent = msgs[msgIdx++];
    }
  };

  const interval = setInterval(() => {
    const increment = Math.random() * 12 + 4;
    progress = Math.min(progress + increment, 98);
    if (bar) bar.style.width = progress + '%';
    if (progress > 30 && msgIdx < 1) updateMsg();
    if (progress > 60 && msgIdx < 2) updateMsg();
    if (progress > 85 && msgIdx < 3) updateMsg();
  }, 120);

  window.addEventListener('load', () => {
    clearInterval(interval);
    progress = 100;
    if (bar) bar.style.width = '100%';
    if (status) status.textContent = 'Welcome!';
    setTimeout(() => {
      if (loader) loader.classList.add('hidden');
      document.body.style.overflow = '';
      initReveal();
    }, 400);
  });

  document.body.style.overflow = 'hidden';
})();

/* ---- CURSOR GLOW ---- */
(function initCursor() {
  const cursor = document.getElementById('cursorGlow');
  if (!cursor) return;
  let cx = window.innerWidth / 2;
  let cy = window.innerHeight / 2;
  let tx = cx, ty = cy;
  const ease = 0.06;

  document.addEventListener('mousemove', e => {
    tx = e.clientX;
    ty = e.clientY;
  });

  function animate() {
    cx += (tx - cx) * ease;
    cy += (ty - cy) * ease;
    cursor.style.left = cx + 'px';
    cursor.style.top = cy + 'px';
    requestAnimationFrame(animate);
  }
  animate();
})();

/* ---- PARTICLE CANVAS ---- */
(function initParticles() {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles = [];

  const COLORS = [
    'rgba(128, 82, 255, 0.6)',
    'rgba(21, 132, 110, 0.5)',
    'rgba(255, 184, 41, 0.4)',
    'rgba(255, 255, 255, 0.2)',
    'rgba(97, 218, 251, 0.4)',
  ];

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function createParticles() {
    particles = [];
    const count = Math.floor(W * H / 18000);
    for (let i = 0; i < Math.min(count, 80); i++) {
      particles.push({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 1.5 + 0.5,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        opacity: Math.random() * 0.5 + 0.2,
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0) p.x = W;
      if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H;
      if (p.y > H) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();

      for (let j = i + 1; j < particles.length; j++) {
        const q = particles[j];
        const dist = Math.hypot(p.x - q.x, p.y - q.y);
        if (dist < 120) {
          const alpha = (1 - dist / 120) * 0.12;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.strokeStyle = `rgba(128, 82, 255, ${alpha})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', () => { resize(); createParticles(); });
  resize();
  createParticles();
  draw();
})();

/* ---- NAVBAR ---- */
(function initNavbar() {
  const nav = document.getElementById('navbar');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
    updateActiveNav();
  }, { passive: true });
})();

function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-item');
  let current = '';
  sections.forEach(sec => {
    const top = sec.offsetTop - 100;
    if (window.scrollY >= top) current = sec.getAttribute('id');
  });
  navItems.forEach(item => {
    item.classList.toggle('active', item.getAttribute('href') === '#' + current);
  });
}

/* ---- MOBILE MENU ---- */
(function initMobileMenu() {
  const btn = document.getElementById('hamburger');
  const menu = document.getElementById('mobileMenu');
  if (!btn || !menu) return;

  btn.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    btn.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });

  menu.querySelectorAll('.mob-link, .mob-cta').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('open');
      btn.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });
})();

/* ---- SMOOTH SCROLL ---- */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
})();

/* ---- REVEAL ON SCROLL ---- */
function initReveal() {
  const els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = parseInt(el.getAttribute('data-d') || '0', 10);
        setTimeout(() => {
          el.classList.add('is-visible');
          // If counter, start it
          el.querySelectorAll('.counter').forEach(c => animateCounter(c));
          if (el.classList.contains('counter')) animateCounter(el);
        }, delay);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.1 });

  els.forEach(el => observer.observe(el));

  // Also observe counters inside any already-revealed stats
  document.querySelectorAll('.counter').forEach(c => {
    const parent = c.closest('.stat');
    if (parent && parent.classList.contains('is-visible')) animateCounter(c);
  });
}

/* ---- COUNTER ANIMATION ---- */
function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-t'), 10);
  if (isNaN(target) || el.dataset.animated) return;
  el.dataset.animated = '1';
  const duration = 1400;
  const start = performance.now();

  function step(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(eased * target);
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target;
  }
  requestAnimationFrame(step);
}

/* ---- TYPING EFFECT ---- */
(function initTyping() {
  const el = document.getElementById('typedEl');
  if (!el) return;
  const words = ['Developer', 'Engineer', 'Creator', 'Builder'];
  let wIdx = 0, charIdx = 0, deleting = false;
  const typeSpeed = 100, deleteSpeed = 50, pauseTime = 1800;

  function type() {
    const word = words[wIdx];
    if (!deleting) {
      el.textContent = word.slice(0, ++charIdx);
      if (charIdx === word.length) {
        deleting = true;
        setTimeout(type, pauseTime);
        return;
      }
    } else {
      el.textContent = word.slice(0, --charIdx);
      if (charIdx === 0) {
        deleting = false;
        wIdx = (wIdx + 1) % words.length;
        setTimeout(type, 400);
        return;
      }
    }
    setTimeout(type, deleting ? deleteSpeed : typeSpeed);
  }
  setTimeout(type, 2000);
})();

/* ---- TILT CARDS ---- */
(function initTilt() {
  document.querySelectorAll('.tilt-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const rx = ((y - cy) / cy) * -5;
      const ry = ((x - cx) / cx) * 5;
      card.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(4px)`;

      // Update shine position
      const shine = card.querySelector('.card-shine-layer');
      if (shine) {
        shine.style.setProperty('--sx', (x / rect.width * 100) + '%');
        shine.style.setProperty('--sy', (y / rect.height * 100) + '%');
      }
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
})();

/* ---- MAGNETIC BUTTONS ---- */
(function initMagnetic() {
  document.querySelectorAll('.magnetic').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });
})();

/* ---- CONTACT FORM ---- */
function handleSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const btn = document.getElementById('submitBtn');
  const txt = document.getElementById('submitTxt');
  const success = document.getElementById('formSuccess');
  if (!btn) return;

  // Basic validation
  const inputs = form.querySelectorAll('[required]');
  let valid = true;
  inputs.forEach(inp => {
    if (!inp.value.trim()) {
      inp.style.borderColor = 'rgba(255, 80, 80, 0.5)';
      valid = false;
      setTimeout(() => { inp.style.borderColor = ''; }, 2000);
    }
  });
  if (!valid) return;

  // Show loading
  btn.disabled = true;
  if (txt) txt.textContent = 'Sending...';
  btn.style.opacity = '0.7';

  setTimeout(() => {
    btn.disabled = false;
    btn.style.opacity = '';
    if (txt) txt.textContent = 'Send Message';
    if (success) success.classList.add('visible');
    form.reset();
    setTimeout(() => { if (success) success.classList.remove('visible'); }, 5000);
  }, 1200);
}

/* ---- SCROLL INDICATOR HIDE ---- */
window.addEventListener('scroll', () => {
  const hint = document.querySelector('.scroll-hint');
  if (hint) hint.style.opacity = window.scrollY > 80 ? '0' : '1';
}, { passive: true });

/* ---- SECTION TRANSITIONS ---- */
(function initSectionHighlight() {
  let lastSection = '';
  const sections = document.querySelectorAll('section[id]');

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) lastSection = e.target.id;
    });
  }, { threshold: 0.3 });

  sections.forEach(s => io.observe(s));
})();

/* ---- PAGE LOADED ---- */
window.addEventListener('DOMContentLoaded', () => {
  // Remove test_write.txt if it exists (cleanup)
  console.log('Portfolio loaded. Version 1.0.0 - Vardhaman Ainapure');
});


/* ---- ORB MOUSE PARALLAX TILT ---- */
(function initOrbParallax() {
  const orb = document.querySelector('.orb-system');
  if (!orb) return;

  let targetX = 0, targetY = 0, curX = 0, curY = 0;
  const STRENGTH = 8; // degrees of tilt
  const EASE = 0.06;

  document.addEventListener('mousemove', e => {
    const rect = orb.getBoundingClientRect();
    if (!rect.width) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (window.innerWidth / 2);
    const dy = (e.clientY - cy) / (window.innerHeight / 2);
    targetX = dy * -STRENGTH;
    targetY = dx * STRENGTH;
  });

  function tickTilt() {
    curX += (targetX - curX) * EASE;
    curY += (targetY - curY) * EASE;
    orb.style.transform = `perspective(700px) rotateX(${curX}deg) rotateY(${curY}deg) scale(${1 + Math.abs(curX + curY) * 0.0008})`;
    requestAnimationFrame(tickTilt);
  }
  tickTilt();
})();

