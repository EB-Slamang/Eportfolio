/* ==========================================================================
   Ebrahiem Slamang — eportfolio interactions
   Nav toggle, scroll progress, section-rail lighting, scroll reveals,
   count-up stats, and small hover/tilt flourishes.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------- footer year ---------------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------------- mobile nav toggle ---------------- */
  const navToggle = document.getElementById('navToggle');
  const siteNav = document.getElementById('siteNav');

  if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    // Only toggle if the mobile nav layout is actually active — prevents
    // the button locking scroll with no visible menu on wider screens.
    if (getComputedStyle(siteNav).position !== 'fixed') return;

    const isOpen = siteNav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

    siteNav.querySelectorAll('.nav-link').forEach((link) => {
      link.addEventListener('click', () => {
        siteNav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  /* ---------------- scroll progress bar (the "live signal") ---------------- */
  const scanProgress = document.getElementById('scanProgress');
  const header = document.getElementById('siteHeader');

  function updateScrollFx() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

    if (scanProgress) scanProgress.style.width = pct + '%';
    if (header) header.classList.toggle('is-scrolled', scrollTop > 12);
  }

  updateScrollFx();
  window.addEventListener('scroll', updateScrollFx, { passive: true });

  /* ---------------- active nav link highlighting ---------------- */
  const navLinks = Array.from(document.querySelectorAll('.nav-link[href^="#"]'));
  const sections = navLinks
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const id = entry.target.getAttribute('id');
        const link = navLinks.find((l) => l.getAttribute('href') === '#' + id);
        if (!link) return;
        if (entry.isIntersecting) {
          navLinks.forEach((l) => l.classList.remove('is-active'));
          link.classList.add('is-active');
        }
      });
    },
    { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
  );

  sections.forEach((section) => navObserver.observe(section));

  /* ---------------- section rail "lighting up" + generic reveals ---------------- */
  const revealTargets = document.querySelectorAll('.section, .reveal, .tl-item, .artefact-card, .module, .readout');

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-inview', 'is-visible');
        }
      });
    },
    { threshold: 0.18 }
  );

  revealTargets.forEach((el) => revealObserver.observe(el));

  /* stagger children of grids on first reveal */
  const staggerGroups = document.querySelectorAll('.module-grid, .artefact-grid, .readout-grid, .timeline, .gallery-strip');
  staggerGroups.forEach((group) => {
    Array.from(group.children).forEach((child, i) => {
      child.style.transitionDelay = prefersReducedMotion ? '0ms' : Math.min(i * 70, 420) + 'ms';
    });
  });

  /* ---------------- count-up numbers (hero + achievements) ---------------- */
  function animateCount(el) {
    const raw = el.textContent.trim();
    const match = raw.match(/^(\D*)(\d+(?:\.\d+)?)(\D*)$/);
    if (!match || prefersReducedMotion) return;

    const [, prefix, numStr, suffix] = match;
    const target = parseFloat(numStr);
    const decimals = numStr.includes('.') ? numStr.split('.')[1].length : 0;
    const duration = 900;
    const start = performance.now();

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = (target * eased).toFixed(decimals);
      el.textContent = prefix + current + suffix;
      if (progress < 1) requestAnimationFrame(tick);
      else el.textContent = raw;
    }
    requestAnimationFrame(tick);
  }

  const countTargets = document.querySelectorAll('.hero-stat-num, .qstat-num, .readout-num');
  const countObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.6 }
  );
  countTargets.forEach((el) => countObserver.observe(el));

  /* ---------------- subtle tilt on the scope panel ---------------- */
  const scopePanel = document.querySelector('.scope-panel');
  if (scopePanel && !prefersReducedMotion && window.matchMedia('(hover: hover)').matches) {
    scopePanel.addEventListener('mousemove', (e) => {
      const rect = scopePanel.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      scopePanel.style.transform = `perspective(800px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg)`;
    });
    scopePanel.addEventListener('mouseleave', () => {
      scopePanel.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg)';
    });
  }

  /* ---------------- module "power on" ripple on click ---------------- */
  document.querySelectorAll('.module').forEach((mod) => {
    mod.addEventListener('click', () => {
      mod.classList.remove('is-pulsed');
      // force reflow so the animation can restart
      void mod.offsetWidth;
      mod.classList.add('is-pulsed');
    });
  });
});
