/* Small progressive enhancements; all portfolio content works without JavaScript. */
const toggle = document.getElementById('navToggle');
const nav = document.getElementById('siteNav');
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();
function closeMenu(returnFocus = false) {
  nav.classList.remove('is-open');
  toggle.setAttribute('aria-expanded', 'false');
  if (returnFocus) toggle.focus();
}
toggle.addEventListener('click', () => {
  const open = nav.classList.toggle('is-open');
  toggle.setAttribute('aria-expanded', String(open));
});
nav.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && nav.classList.contains('is-open')) closeMenu(true);
});
document.addEventListener('click', event => {
  if (!event.target.closest('.site-header')) closeMenu();
});
window.matchMedia('(min-width: 701px)').addEventListener('change', event => {
  if (event.matches) closeMenu();
});
const progress = document.getElementById('scanProgress');
let queued = false;
function updateProgress() {
  const range = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.transform = `scaleX(${range > 0 ? Math.min(1, window.scrollY / range) : 0})`;
  queued = false;
}
window.addEventListener('scroll', () => {
  if (!queued) { queued = true; requestAnimationFrame(updateProgress); }
}, { passive: true });
window.addEventListener('resize', updateProgress);
updateProgress();
const links = [...nav.querySelectorAll('a[href^="#"]')];
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      links.forEach(link => {
        const active = link.hash === `#${entry.target.id}`;
        link.classList.toggle('is-active', active);
        if (active) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    });
  }, { rootMargin: '-10% 0px -65% 0px' });
  links.forEach(link => {
    const section = document.querySelector(link.hash);
    if (section) observer.observe(section);
  });
}
