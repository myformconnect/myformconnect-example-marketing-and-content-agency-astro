/**
 * North & Finch — Core Client-side Scripts
 * Lightweight, vanilla JavaScript with no external dependencies.
 */

document.addEventListener("DOMContentLoaded", () => {
  initStickyHeader();
  initMobileMenu();
  initScrollAnimations();
  initCareersModal();
  initFormFeedback();
});

/* --------------------------------------------------------------------------
   Sticky / Compact Header
   -------------------------------------------------------------------------- */
function initStickyHeader() {
  const header = document.querySelector(".site-header");
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add("is-compact");
    } else {
      header.classList.remove("is-compact");
    }
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();
}

/* --------------------------------------------------------------------------
   Mobile Navigation Drawer
   -------------------------------------------------------------------------- */
function initMobileMenu() {
  const menuBtn = document.querySelector(".mobile-menu-btn");
  const drawer = document.querySelector(".mobile-nav-drawer");
  const closeBtn = document.querySelector(".mobile-drawer-close");
  if (!menuBtn || !drawer) return;

  const openDrawer = () => {
    drawer.classList.add("is-open");
    drawer.setAttribute("aria-hidden", "false");
    menuBtn.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
    if (closeBtn) closeBtn.focus();
  };

  const closeDrawer = () => {
    drawer.classList.remove("is-open");
    drawer.setAttribute("aria-hidden", "true");
    menuBtn.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
    menuBtn.focus();
  };

  menuBtn.addEventListener("click", openDrawer);
  if (closeBtn) closeBtn.addEventListener("click", closeDrawer);

  // Close on Escape
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && drawer.classList.contains("is-open")) {
      closeDrawer();
    }
  });

  // Close if clicking outside drawer links
  drawer.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeDrawer);
  });
}

/* --------------------------------------------------------------------------
   Subtle Scroll Reveals (IntersectionObserver)
   Respects prefers-reduced-motion
   -------------------------------------------------------------------------- */
function initScrollAnimations() {
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReduced) return;

  const reveals = document.querySelectorAll(".reveal-fade");
  if (!reveals.length || !("IntersectionObserver" in window)) return;

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-revealed");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );

  reveals.forEach((el) => observer.observe(el));
}

/* --------------------------------------------------------------------------
   Careers Modal Logic
   -------------------------------------------------------------------------- */
function initCareersModal() {
  const openButtons = document.querySelectorAll("[data-open-careers-modal]");
  const modal = document.getElementById("careers-modal");
  if (!modal) return;

  const closeBtn = modal.querySelector(".modal-close-btn");
  let lastActiveElement = null;

  const openModal = (e) => {
    if (e) e.preventDefault();
    lastActiveElement = document.activeElement;
    modal.classList.add("is-active");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    // Set focus to the first input or close button
    const firstInput = modal.querySelector("input, button");
    if (firstInput) firstInput.focus();
  };

  const closeModal = () => {
    modal.classList.remove("is-active");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (lastActiveElement && typeof lastActiveElement.focus === "function") {
      lastActiveElement.focus();
    }
  };

  openButtons.forEach((btn) => btn.addEventListener("click", openModal));
  if (closeBtn) closeBtn.addEventListener("click", closeModal);

  // Click on background overlay
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // ESC key
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("is-active")) {
      closeModal();
    }
  });
}

/* --------------------------------------------------------------------------
   Frontend Form Submission Demo Feedback
   -------------------------------------------------------------------------- */
function initFormFeedback() {
  const forms = document.querySelectorAll("form[data-form-handler]");

  forms.forEach((form) => {
    form.addEventListener("submit", (e) => {
      const action = form.getAttribute("action") || "";
      // If endpoint is still the placeholder, provide immediate friendly feedback
      if (action.includes("YOUR_") || action === "#" || !action) {
        e.preventDefault();
        const feedbackEl = form.querySelector(".form-feedback");
        if (feedbackEl) {
          feedbackEl.textContent = "Thanks — we've received your submission.";
          feedbackEl.className = "form-feedback is-visible is-success";
          form.reset();
        } else {
          alert("Thanks — we've received your submission.");
          form.reset();
        }
      }
    });
  });
}
