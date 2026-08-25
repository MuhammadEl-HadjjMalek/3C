/* =============================================================================
   3C — Navigation
   Menu mobile, lien actif au défilement, barre de progression, retour en haut.
   ========================================================================== */
'use strict';

window.App = window.App || {};

App.navigation = (function () {

  /* --- Menu mobile -------------------------------------------------------- */
  function initMobileMenu() {
    var toggle = document.getElementById('navToggle');
    var menu = document.getElementById('navMenu');
    if (!toggle || !menu) return;

    function close() {
      menu.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    }

    toggle.addEventListener('click', function () {
      var open = menu.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
    });

    menu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', close);
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') close();
    });
  }

  /* --- Lien de navigation actif ------------------------------------------- */
  function initActiveLink() {
    var sections = document.querySelectorAll('main section[id]');
    var links = document.querySelectorAll('.nav-link[href^="#"]');
    if (!sections.length || !links.length) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var id = entry.target.getAttribute('id');
        links.forEach(function (link) {
          link.classList.toggle('is-active', link.getAttribute('href') === '#' + id);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

    sections.forEach(function (section) { observer.observe(section); });
  }

  /* --- Barre de progression de lecture ------------------------------------ */
  function initProgressBar() {
    var bar = document.getElementById('progressBar');
    if (!bar) return;

    function update() {
      var doc = document.documentElement;
      var scrollable = doc.scrollHeight - doc.clientHeight;
      var ratio = scrollable > 0 ? doc.scrollTop / scrollable : 0;
      bar.style.width = (ratio * 100).toFixed(2) + '%';
    }

    window.addEventListener('scroll', update, { passive: true });
    update();
  }

  /* --- Bouton « retour en haut » ------------------------------------------ */
  function initBackToTop() {
    var button = document.getElementById('topBtn');
    if (!button) return;

    window.addEventListener('scroll', function () {
      button.classList.toggle('is-visible', window.scrollY > 600);
    }, { passive: true });

    button.addEventListener('click', function () {
      var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
    });
  }

  /* --- Ombre renforcée de l'en-tête au défilement -------------------------- */
  function initHeaderShadow() {
    var header = document.getElementById('siteHeader');
    if (!header) return;

    window.addEventListener('scroll', function () {
      header.classList.toggle('is-scrolled', window.scrollY > 20);
    }, { passive: true });
  }

  function init() {
    initHeaderShadow();
    initMobileMenu();
    initActiveLink();
    initProgressBar();
    initBackToTop();
  }

  return { init: init };
})();
