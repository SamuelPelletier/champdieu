/* ==========================================================================
   Tournoi de Béhourd — Le Prieuré de Champdieu
   Script principal (vanilla JS, sans dépendance)
   ========================================================================== */
(function () {
  'use strict';

  // ------------------------------------------------------------------
  // À PERSONNALISER
  // ------------------------------------------------------------------
  // Date et heure de l'événement (utilisée pour le compte à rebours).
  // Format : 'AAAA-MM-JJTHH:MM:SS'
  var EVENT_DATE = '2026-11-13T18:00:00';

  // Lien de billetterie externe (Billetweb, HelloAsso, Weezevent…).
  // Tous les boutons "Réserver" pointeront vers cette adresse.
  var TICKET_URL = 'https://www.example.com/billetterie';

  // ------------------------------------------------------------------
  // Année du footer
  // ------------------------------------------------------------------
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ------------------------------------------------------------------
  // Liens de billetterie
  // ------------------------------------------------------------------
  document.querySelectorAll('[data-ticket]').forEach(function (link) {
    if (TICKET_URL) {
      link.setAttribute('href', TICKET_URL);
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener');
    }
  });

  // ------------------------------------------------------------------
  // Menu mobile
  // ------------------------------------------------------------------
  var navToggle = document.getElementById('nav-toggle');
  var mainNav = document.getElementById('main-nav');

  if (navToggle && mainNav) {
    navToggle.addEventListener('click', function () {
      var isOpen = mainNav.classList.toggle('is-open');
      navToggle.classList.toggle('is-open', isOpen);
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    mainNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mainNav.classList.remove('is-open');
        navToggle.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ------------------------------------------------------------------
  // Accordéon FAQ
  // ------------------------------------------------------------------
  document.querySelectorAll('.accordion-trigger').forEach(function (trigger) {
    var panel = trigger.nextElementSibling;
    if (!panel) return;

    trigger.addEventListener('click', function () {
      var isOpen = trigger.getAttribute('aria-expanded') === 'true';

      // Ferme les autres items du même accordéon
      var accordion = trigger.closest('.accordion');
      if (accordion) {
        accordion.querySelectorAll('.accordion-trigger').forEach(function (other) {
          if (other !== trigger) {
            other.setAttribute('aria-expanded', 'false');
            other.nextElementSibling.style.maxHeight = null;
          }
        });
      }

      trigger.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
      panel.style.maxHeight = isOpen ? null : panel.scrollHeight + 'px';
    });
  });

  // ------------------------------------------------------------------
  // Compte à rebours
  // ------------------------------------------------------------------
  var countdownEl = document.getElementById('countdown');

  function updateCountdown() {
    if (!countdownEl) return;

    var target = new Date(EVENT_DATE).getTime();
    var now = Date.now();
    var diff = target - now;

    var daysEl = document.getElementById('cd-days');
    var hoursEl = document.getElementById('cd-hours');
    var minutesEl = document.getElementById('cd-minutes');
    var secondsEl = document.getElementById('cd-seconds');

    if (diff <= 0) {
      [daysEl, hoursEl, minutesEl, secondsEl].forEach(function (el) {
        if (el) el.textContent = '00';
      });
      return;
    }

    var days = Math.floor(diff / (1000 * 60 * 60 * 24));
    var hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    var minutes = Math.floor((diff / (1000 * 60)) % 60);
    var seconds = Math.floor((diff / 1000) % 60);

    function pad(n) { return String(n).padStart(2, '0'); }

    if (daysEl) daysEl.textContent = pad(days);
    if (hoursEl) hoursEl.textContent = pad(hours);
    if (minutesEl) minutesEl.textContent = pad(minutes);
    if (secondsEl) secondsEl.textContent = pad(seconds);
  }

  if (countdownEl) {
    updateCountdown();
    setInterval(updateCountdown, 1000);
  }

  // ------------------------------------------------------------------
  // Bouton retour en haut
  // ------------------------------------------------------------------
  var backToTop = document.getElementById('back-to-top');

  if (backToTop) {
    window.addEventListener('scroll', function () {
      backToTop.classList.toggle('is-visible', window.scrollY > 500);
    }, { passive: true });

    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ------------------------------------------------------------------
  // Mise en surbrillance du lien de nav actif au scroll
  // ------------------------------------------------------------------
  var sections = document.querySelectorAll('main section[id], .hero[id]');
  var navLinks = document.querySelectorAll('.main-nav a');

  if (sections.length && navLinks.length && 'IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = entry.target.getAttribute('id');
          navLinks.forEach(function (link) {
            link.classList.toggle('is-active', link.getAttribute('href') === '#' + id);
          });
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });

    sections.forEach(function (section) { observer.observe(section); });
  }
})();
