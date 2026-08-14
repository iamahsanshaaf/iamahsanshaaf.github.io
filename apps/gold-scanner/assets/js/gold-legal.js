
(() => {
  const menuButton = document.querySelector("[data-menu-button]");
  const mobileMenu = document.querySelector("[data-mobile-menu]");
  const year = document.querySelector("[data-year]");

  if (year) year.textContent = new Date().getFullYear();

  const closeMenu = () => {
    if (!menuButton || !mobileMenu) return;
    mobileMenu.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
  };

  menuButton?.addEventListener("click", () => {
    const open = !mobileMenu.classList.contains("open");
    mobileMenu.classList.toggle("open", open);
    menuButton.setAttribute("aria-expanded", String(open));
  });

  mobileMenu?.querySelectorAll("a").forEach(a => a.addEventListener("click", closeMenu));
  document.addEventListener("keydown", e => { if (e.key === "Escape") closeMenu(); });

  const reveal = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window) || matchMedia("(prefers-reduced-motion: reduce)").matches) {
    reveal.forEach(el => el.classList.add("visible"));
  } else {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: .08 });
    reveal.forEach(el => observer.observe(el));
  }

  // Load the current App Store artwork when Apple lookup is available.
  const iconTargets = document.querySelectorAll("[data-live-app-icon]");
  if (iconTargets.length) {
    fetch("https://itunes.apple.com/lookup?id=6781801835&country=us")
      .then(r => r.ok ? r.json() : Promise.reject())
      .then(data => {
        const app = data?.results?.[0];
        const url = app?.artworkUrl512 || app?.artworkUrl100;
        if (!url) return;
        iconTargets.forEach(img => { img.src = url; });
      })
      .catch(() => {});
  }
})();
