(() => {
  const root = document.documentElement;
  const body = document.body;
  const header = document.querySelector("[data-header]");
  const menuButton = document.querySelector("[data-menu-button]");
  const mobileMenu = document.querySelector("[data-mobile-menu]");
  const themeToggle = document.querySelector("[data-theme-toggle]");
  const year = document.querySelector("[data-year]");
  const filterButtons = document.querySelectorAll("[data-filter]");
  const projectCards = document.querySelectorAll("[data-platform]");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  if (year) year.textContent = new Date().getFullYear();

  const storedTheme = localStorage.getItem("portfolio-theme");
  if (storedTheme === "light" || storedTheme === "dark") {
    root.dataset.theme = storedTheme;
  } else {
    root.dataset.theme = window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
  }

  const updateThemeLabel = () => {
    if (!themeToggle) return;
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    themeToggle.setAttribute("aria-label", `Switch to ${next} theme`);
  };

  updateThemeLabel();

  themeToggle?.addEventListener("click", () => {
    root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
    localStorage.setItem("portfolio-theme", root.dataset.theme);
    updateThemeLabel();
  });

  const updateHeader = () => {
    header?.classList.toggle("is-scrolled", window.scrollY > 12);
  };

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  const closeMenu = () => {
    if (!menuButton || !mobileMenu) return;
    menuButton.setAttribute("aria-expanded", "false");
    mobileMenu.classList.remove("is-open");
    body.classList.remove("menu-open");
  };

  menuButton?.addEventListener("click", () => {
    if (!mobileMenu) return;
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isOpen));
    mobileMenu.classList.toggle("is-open", !isOpen);
    body.classList.toggle("menu-open", !isOpen);
  });

  mobileMenu?.querySelectorAll("a").forEach(link => link.addEventListener("click", closeMenu));
  window.addEventListener("resize", () => {
    if (window.innerWidth > 860) closeMenu();
  });

  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;
      filterButtons.forEach(item => item.classList.toggle("is-active", item === button));

      projectCards.forEach(card => {
        const visible = filter === "all" || card.dataset.platform === filter;
        card.classList.toggle("is-hidden", !visible);
      });
    });
  });

  const revealElements = document.querySelectorAll(".reveal");

  if (reducedMotion.matches || !("IntersectionObserver" in window)) {
    revealElements.forEach(el => el.classList.add("is-visible"));
  } else {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        obs.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px" });

    revealElements.forEach(el => observer.observe(el));
  }
})();
