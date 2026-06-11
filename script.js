/* La Pausa – Interactions & Animations */

/* ── Maps link : Apple Plans sur iOS/macOS, Google Maps ailleurs ── */
const mapsLink = document.getElementById('mapsLink');
if (mapsLink) {
  const isApple = /iPhone|iPad|iPod|Macintosh/.test(navigator.userAgent);
  mapsLink.href = isApple
    ? 'https://maps.apple.com/?q=La+Pausa+Compi%C3%A8gne&ll=49.416666,2.8260489'
    : 'https://www.google.com/maps/place/LA+PAUSA+Compi%C3%A8gne/@49.4167768,2.8257159,20.32z/data=!4m6!3m5!1s0x47e7d70cfff060ab:0xaeff749cc271b30e!8m2!3d49.416666!4d2.8260489!16s%2Fg%2F11tn_j0wcz?entry=ttu&g_ep=EgoyMDI2MDYwMy4xIKXMDSoASAFQAw%3D%3D';
}

/* ── Nav scroll behaviour ─────────────────────── */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

/* ── Hamburger / mobile menu ──────────────────── */
const burger     = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');

burger.addEventListener('click', () => {
  const open = mobileMenu.classList.toggle('open');
  burger.classList.toggle('open', open);
  document.body.style.overflow = open ? 'hidden' : '';
});

mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    burger.classList.remove('open');
    document.body.style.overflow = '';
  });
});

/* ── Hero parallax & zoom ─────────────────────── */
const heroImg = document.getElementById('heroImg');
if (heroImg) {
  // Trigger slow zoom on load
  requestAnimationFrame(() => heroImg.classList.add('zoomed'));

  // Subtle parallax on scroll
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y < window.innerHeight) {
      heroImg.style.transform = `scale(1) translateY(${y * 0.25}px)`;
    }
  }, { passive: true });
}

/* ── Scroll reveal ────────────────────────────── */
const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger siblings slightly
      const siblings = Array.from(
        entry.target.parentElement.querySelectorAll('.reveal, .reveal-left, .reveal-right')
      );
      const idx = siblings.indexOf(entry.target);
      const delay = Math.min(idx * 80, 320);

      setTimeout(() => entry.target.classList.add('revealed'), delay);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => observer.observe(el));

/* ── Smooth nav links ─────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = target.getBoundingClientRect().top + window.scrollY - 72;
    window.scrollTo({ top: offset, behavior: 'smooth' });
  });
});

/* ── Gallery lightbox (simple) ────────────────── */
const galleryItems = document.querySelectorAll('.gallery__item');

if (galleryItems.length) {
  const overlay = document.createElement('div');
  overlay.style.cssText = `
    position:fixed;inset:0;z-index:9999;
    background:rgba(10,14,8,.92);backdrop-filter:blur(12px);
    display:flex;align-items:center;justify-content:center;
    opacity:0;pointer-events:none;transition:opacity .35s ease;cursor:zoom-out;
  `;
  const lightImg = document.createElement('img');
  lightImg.style.cssText = `
    max-width:90vw;max-height:88vh;
    width:auto;height:auto;
    border-radius:12px;
    box-shadow:0 40px 100px rgba(0,0,0,.5);
    transform:scale(.92);transition:transform .4s cubic-bezier(.22,1,.36,1);
    object-fit:contain;
  `;
  overlay.appendChild(lightImg);
  document.body.appendChild(overlay);

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const src = item.querySelector('img').src;
      lightImg.src = src;
      overlay.style.opacity = '1';
      overlay.style.pointerEvents = 'auto';
      requestAnimationFrame(() => {
        lightImg.style.transform = 'scale(1)';
      });
    });
  });

  overlay.addEventListener('click', () => {
    overlay.style.opacity = '0';
    overlay.style.pointerEvents = 'none';
    lightImg.style.transform = 'scale(.92)';
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') overlay.click();
  });
}
