/* =============================================================================
   3C — Défilement animé
   Parallaxe légère sur les images marquées data-parallax, révélation en
   séquence des volets « À propos » et mise à jour du compteur associé.
   Tout est désactivé si l'utilisateur préfère les animations réduites.
   ========================================================================== */
'use strict';

window.App = window.App || {};

App.parallax = (function () {

  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* --- Parallaxe : l'image glisse un peu plus lentement que la page -------- */
  function initParallax() {
    var items = Array.prototype.slice.call(document.querySelectorAll('[data-parallax]'));
    if (!items.length || reducedMotion) return;

    var visible = [];
    var ticking = false;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var index = visible.indexOf(entry.target);
        if (entry.isIntersecting && index === -1) visible.push(entry.target);
        if (!entry.isIntersecting && index !== -1) visible.splice(index, 1);
      });
      update();
    }, { rootMargin: '120px 0px' });

    items.forEach(function (item) { observer.observe(item); });

    function update() {
      ticking = false;
      var viewport = window.innerHeight;

      visible.forEach(function (item) {
        var box = item.parentElement.getBoundingClientRect();
        var amount = parseFloat(item.dataset.parallax) || 0.1;

        // -1 quand le bloc arrive par le bas, +1 quand il sort par le haut
        var progress = (box.top + box.height / 2 - viewport / 2) / (viewport / 2);
        progress = Math.max(-1, Math.min(1, progress));

        var shift = progress * box.height * amount;
        item.style.transform = 'translate3d(0, ' + shift.toFixed(1) + 'px, 0)';
      });
    }

    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    update();
  }

  /* --- Séquence épinglée ---------------------------------------------------
     L'entrée la plus proche du centre de l'écran devient active ; l'image
     épinglée, la légende et les repères se synchronisent sur elle.
  ------------------------------------------------------------------------- */
  function initSequence() {
    var steps = document.querySelectorAll('.sequence__item[data-step]');
    if (!steps.length) return;

    var shots = document.querySelectorAll('.sequence__shot[data-shot]');
    var captions = document.querySelectorAll('.sequence__caption[data-caption]');
    var dots = document.querySelectorAll('.sequence__dots [data-dot]');
    var rail = document.querySelector('.sequence__list');
    var current = null;

    function activate(id) {
      if (id === current) return;
      current = id;

      steps.forEach(function (el) { el.classList.toggle('is-active', el.dataset.step === id); });
      shots.forEach(function (el) { el.classList.toggle('is-active', el.dataset.shot === id); });
      captions.forEach(function (el) { el.classList.toggle('is-active', el.dataset.caption === id); });
      dots.forEach(function (el) { el.classList.toggle('is-active', el.dataset.dot === id); });

      // Remplit le filet vertical proportionnellement à l'énoncé atteint
      if (rail) {
        var ratio = parseInt(id, 10) / steps.length;
        rail.style.setProperty('--rail-progress', (ratio * 100).toFixed(0) + '%');
      }
    }

    if (!('IntersectionObserver' in window)) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) activate(entry.target.dataset.step);
      });
    }, { rootMargin: '-50% 0px -50% 0px', threshold: 0 });

    steps.forEach(function (step) { observer.observe(step); });
  }

  function init() {
    initParallax();
    initSequence();
  }

  return { init: init };
})();
