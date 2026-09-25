/**
 * WESTERVANE — Client-side scripts
 * 
 * Simple, vanilla JavaScript handling user interactions:
 * navigation menus, subtle scroll reveals, modals, and form feedback.
 */

document.addEventListener("DOMContentLoaded", () => {
  initStickyHeader();
  initMobileMenu();
  initScrollAnimations();
  initCareersModal();
  initFormFeedback();
});

// Shrinks the top navbar slightly when you scroll down to keep things tidy
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

// Handles opening, closing, and keyboard navigation for the mobile menu
function initMobileMenu() {
  const menuBtn = document.querySelector(".mobile-menu-btn");
  const drawer = document.querySelector(".mobile-nav-drawer");
  const closeBtn = document.querySelector(".mobile-drawer-close");
  if (!menuBtn || !drawer) return;

  const openDrawer = () => {
    drawer.classList.add("is-open");
    drawer.setAttribute("aria-hidden", "false");
    menuBtn.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden"; // Prevents background scrolling while menu is open
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

  // Close the menu if the user presses Escape
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && drawer.classList.contains("is-open")) {
      closeDrawer();
    }
  });

  // Close the menu whenever a navigation link inside it is clicked
  drawer.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeDrawer);
  });
}

// Gently fades in sections as they scroll into view (skipped if the user prefers reduced motion)
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
          obs.unobserve(entry.target); // Once visible, no need to watch it anymore
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );

  reveals.forEach((el) => observer.observe(el));
}

// Manages the popup application modal on the About page
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
    document.body.style.overflow = "hidden"; // Freeze background scrolling

    // Auto-focus the first field so the user can start typing right away
    const firstInput = modal.querySelector("input, button");
    if (firstInput) firstInput.focus();
  };

  const closeModal = () => {
    modal.classList.remove("is-active");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    // Return focus to the button that originally opened the modal
    if (lastActiveElement && typeof lastActiveElement.focus === "function") {
      lastActiveElement.focus();
    }
  };

  openButtons.forEach((btn) => btn.addEventListener("click", openModal));
  if (closeBtn) closeBtn.addEventListener("click", closeModal);

  // Close if clicking the dimmed background backdrop
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Close if pressing the Escape key
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("is-active")) {
      closeModal();
    }
  });
}

// Handles form submissions asynchronously (AJAX) so users stay on the page without redirect screens
function initFormFeedback() {
  const forms = document.querySelectorAll("form[data-form-handler]");

  forms.forEach((form) => {
    form.addEventListener("submit", async (e) => {
      // Prevent browser from navigating away to the external 3-second redirect page
      e.preventDefault();

      // Check HTML5 validation first
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      const feedbackEl =
        form.querySelector(".form-feedback") ||
        form.parentElement?.querySelector(".form-feedback");

      const submitBtn = form.querySelector('button[type="submit"]');
      const action = form.getAttribute("action") || "";

      // Message depending on form type
      const isCareers = form.id && form.id.includes("career");
      const successMsg = isCareers
        ? "Thank you! Your application and resume have been received. Our team will review your profile shortly."
        : "Thank you — we've received your submission and will get back to you within 24 business hours.";

      const showFeedback = (message, isSuccess = true) => {
        if (feedbackEl) {
          feedbackEl.textContent = message;
          feedbackEl.className = `form-feedback is-visible ${isSuccess ? "is-success" : "is-error"}`;
          feedbackEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
        } else {
          alert(message);
        }
      };

      // If still using placeholder URL or empty, show mock success directly
      if (!action || action.includes("YOUR_") || action === "#") {
        showFeedback(successMsg, true);
        form.reset();
        return;
      }

      // Temporarily dim and disable submit button to prevent double-clicks
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.style.opacity = "0.7";
        submitBtn.style.pointerEvents = "none";
      }

      try {
        // Send form data in the background
        const formData = new FormData(form);
        const response = await fetch(action, {
          method: "POST",
          body: formData,
          headers: {
            Accept: 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
          }
        });

        if (response.ok) {
          showFeedback(successMsg, true);
          form.reset();
        } else {
          showFeedback("Something went wrong while submitting. Please try again.", false);
        }
      } catch (error) {
        showFeedback("Network error. Please check your internet connection and try again.", false);
      } finally {
        // Re-enable submit button
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.style.opacity = "";
          submitBtn.style.pointerEvents = "";
        }
      }
    });
  });
}

