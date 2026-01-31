/**
 * Musterbetrieb One-Pager - Main JavaScript
 * Handles: Mobile menu, smooth scrolling, form validation, header scroll effect
 */

(function() {
  'use strict';

  // --------------------------------------------------------------------------
  // DOM Elements
  // --------------------------------------------------------------------------
  const header = document.getElementById('header');
  const menuToggle = document.querySelector('.header__menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.header__nav-link');
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');
  const currentYearEl = document.getElementById('current-year');

  // --------------------------------------------------------------------------
  // Set Current Year in Footer
  // --------------------------------------------------------------------------
  if (currentYearEl) {
    currentYearEl.textContent = new Date().getFullYear();
  }

  // --------------------------------------------------------------------------
  // Mobile Menu Toggle
  // --------------------------------------------------------------------------
  function toggleMenu() {
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', !isExpanded);
    navMenu.classList.toggle('header__nav--open');

    // Prevent body scroll when menu is open
    document.body.style.overflow = isExpanded ? '' : 'hidden';
  }

  function closeMenu() {
    menuToggle.setAttribute('aria-expanded', 'false');
    navMenu.classList.remove('header__nav--open');
    document.body.style.overflow = '';
  }

  if (menuToggle) {
    menuToggle.addEventListener('click', toggleMenu);
  }

  // Close menu when clicking a nav link
  navLinks.forEach(function(link) {
    link.addEventListener('click', closeMenu);
  });

  // Close menu on escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && navMenu.classList.contains('header__nav--open')) {
      closeMenu();
      menuToggle.focus();
    }
  });

  // Close menu when clicking outside
  document.addEventListener('click', function(e) {
    if (navMenu.classList.contains('header__nav--open') &&
        !navMenu.contains(e.target) &&
        !menuToggle.contains(e.target)) {
      closeMenu();
    }
  });

  // --------------------------------------------------------------------------
  // Header Scroll Effect
  // --------------------------------------------------------------------------
  let lastScrollY = 0;
  let ticking = false;

  function updateHeader() {
    if (window.scrollY > 50) {
      header.classList.add('header--scrolled');
    } else {
      header.classList.remove('header--scrolled');
    }
    ticking = false;
  }

  window.addEventListener('scroll', function() {
    lastScrollY = window.scrollY;
    if (!ticking) {
      window.requestAnimationFrame(updateHeader);
      ticking = true;
    }
  }, { passive: true });

  // --------------------------------------------------------------------------
  // Smooth Scrolling for Anchor Links
  // --------------------------------------------------------------------------
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');

      // Skip if it's just "#"
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        e.preventDefault();

        const headerHeight = header.offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });

        // Update focus for accessibility
        targetElement.setAttribute('tabindex', '-1');
        targetElement.focus({ preventScroll: true });
      }
    });
  });

  // --------------------------------------------------------------------------
  // Form Validation
  // --------------------------------------------------------------------------
  const validators = {
    name: {
      validate: function(value) {
        return value.trim().length >= 2;
      },
      message: 'Bitte geben Sie Ihren Namen ein (mindestens 2 Zeichen).'
    },
    'contact-info': {
      validate: function(value) {
        const trimmed = value.trim();
        // Check for email or phone
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^[\d\s\-\+\(\)]{6,}$/;
        return emailRegex.test(trimmed) || phoneRegex.test(trimmed);
      },
      message: 'Bitte geben Sie eine gültige E-Mail-Adresse oder Telefonnummer ein.'
    },
    message: {
      validate: function(value) {
        return value.trim().length >= 10;
      },
      message: 'Bitte geben Sie eine Nachricht ein (mindestens 10 Zeichen).'
    },
    consent: {
      validate: function(value, element) {
        return element.checked;
      },
      message: 'Bitte stimmen Sie der Datenschutzerklärung zu.'
    }
  };

  function showError(fieldName, message) {
    const errorEl = document.getElementById(fieldName + '-error');
    const inputEl = document.getElementById(fieldName);

    if (errorEl) {
      errorEl.textContent = message;
    }

    if (inputEl) {
      inputEl.classList.add('contact-form__input--error');
      inputEl.setAttribute('aria-invalid', 'true');
    }
  }

  function clearError(fieldName) {
    const errorEl = document.getElementById(fieldName + '-error');
    const inputEl = document.getElementById(fieldName);

    if (errorEl) {
      errorEl.textContent = '';
    }

    if (inputEl) {
      inputEl.classList.remove('contact-form__input--error');
      inputEl.removeAttribute('aria-invalid');
    }
  }

  function validateField(fieldName) {
    const inputEl = document.getElementById(fieldName);
    const validator = validators[fieldName];

    if (!inputEl || !validator) return true;

    const value = inputEl.type === 'checkbox' ? inputEl.checked : inputEl.value;
    const isValid = validator.validate(value, inputEl);

    if (!isValid) {
      showError(fieldName, validator.message);
      return false;
    }

    clearError(fieldName);
    return true;
  }

  function validateForm() {
    let isValid = true;

    Object.keys(validators).forEach(function(fieldName) {
      if (!validateField(fieldName)) {
        isValid = false;
      }
    });

    return isValid;
  }

  function showFormStatus(type, message) {
    formStatus.textContent = message;
    formStatus.className = 'contact-form__status contact-form__status--' + type;
  }

  function hideFormStatus() {
    formStatus.textContent = '';
    formStatus.className = 'contact-form__status';
  }

  // Real-time validation on blur
  if (contactForm) {
    Object.keys(validators).forEach(function(fieldName) {
      const inputEl = document.getElementById(fieldName);

      if (inputEl) {
        inputEl.addEventListener('blur', function() {
          validateField(fieldName);
        });

        // Clear error on input
        inputEl.addEventListener('input', function() {
          clearError(fieldName);
          hideFormStatus();
        });

        // For checkbox
        if (inputEl.type === 'checkbox') {
          inputEl.addEventListener('change', function() {
            validateField(fieldName);
            hideFormStatus();
          });
        }
      }
    });

    // Form submission
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      hideFormStatus();

      if (!validateForm()) {
        // Focus first invalid field
        const firstError = contactForm.querySelector('[aria-invalid="true"]');
        if (firstError) {
          firstError.focus();
        }
        return;
      }

      // Simulate form submission
      const submitBtn = contactForm.querySelector('.contact-form__submit');
      const originalBtnText = submitBtn.textContent;

      submitBtn.textContent = 'Wird gesendet...';
      submitBtn.disabled = true;

      // Simulate network delay
      setTimeout(function() {
        // Success simulation
        showFormStatus('success', 'Vielen Dank für Ihre Nachricht! Wir melden uns schnellstmöglich bei Ihnen.');
        contactForm.reset();

        submitBtn.textContent = originalBtnText;
        submitBtn.disabled = false;

        // Clear all error states
        Object.keys(validators).forEach(function(fieldName) {
          clearError(fieldName);
        });
      }, 1500);
    });
  }

  // --------------------------------------------------------------------------
  // Intersection Observer for Scroll Animations (Optional Enhancement)
  // --------------------------------------------------------------------------
  if ('IntersectionObserver' in window) {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe service cards and trust badges
    document.querySelectorAll('.service-card, .trust-badge, .gallery__item').forEach(function(el) {
      observer.observe(el);
    });
  }

})();
