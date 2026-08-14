
(() => {
  const header = document.querySelector('[data-header]');
  const menuButton = document.querySelector('[data-menu-button]');
  const mobileMenu = document.querySelector('[data-mobile-menu]');
  const year = document.querySelector('[data-year]');
  if (year) year.textContent = new Date().getFullYear();

  const syncHeader = () => header?.classList.toggle('scrolled', window.scrollY > 12);
  syncHeader();
  window.addEventListener('scroll', syncHeader, { passive: true });

  if (menuButton && mobileMenu) {
    menuButton.addEventListener('click', () => {
      const open = mobileMenu.classList.toggle('open');
      menuButton.setAttribute('aria-expanded', String(open));
    });
    mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
    }));
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // Active nav state
  const sections = [...document.querySelectorAll('main section[id]')];
  const navLinks = [...document.querySelectorAll('[data-nav-link]')];
  if (sections.length && navLinks.length) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
      });
    }, { rootMargin: '-30% 0px -55% 0px', threshold: 0.01 });
    sections.forEach(section => sectionObserver.observe(section));
  }

  // Simple attribution capture
  const params = new URLSearchParams(window.location.search);
  const attribution = {};
  ['utm_source','utm_medium','utm_campaign','utm_term','utm_content','gclid','gbraid','wbraid'].forEach(key => {
    if (params.has(key)) attribution[key] = params.get(key);
  });
  if (Object.keys(attribution).length) {
    try { sessionStorage.setItem('ahsan_apps_attribution', JSON.stringify(attribution)); } catch (_) {}
  }

  window.dataLayer = window.dataLayer || [];
  document.querySelectorAll('[data-store-link]').forEach(link => {
    link.addEventListener('click', () => {
      window.dataLayer.push({
        event: 'app_store_outbound_click',
        app_name: link.dataset.app || '',
        destination: link.href
      });
    });
  });
})();
