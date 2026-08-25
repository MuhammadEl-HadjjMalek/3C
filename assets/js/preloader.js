/* =============================================================================
   3C — Voile de chargement
   L'anneau suit le chargement réel des visuels de la première vue. Le voile
   se retire dès que tout est prêt, et de toute façon au bout de quelques
   secondes : il ne doit jamais retenir le visiteur.
   ========================================================================== */
'use strict';

window.App = window.App || {};

App.preloader = (function () {

  var CIRCUMFERENCE = 339.3;   // 2 pi r, avec r = 54
  var SAFETY_DELAY = 5000;     // sortie forcée, quoi qu'il arrive
  var SESSION_KEY = '3c-seen';

  var veil, bar, percent;
  var total = 0;
  var done = 0;
  var shown = 0;
  var finished = false;

  function paint(ratio) {
    // On ne recule jamais : la barre ne peut que progresser
    shown = Math.max(shown, Math.min(1, ratio));
    if (bar) bar.style.strokeDashoffset = String(CIRCUMFERENCE * (1 - shown));
    if (percent) percent.textContent = String(Math.round(shown * 100));
  }

  function finish() {
    if (finished) return;
    finished = true;

    paint(1);

    // Laisse l'anneau se terminer visuellement avant de retirer le voile
    setTimeout(function () {
      veil.classList.add('is-done');
      document.documentElement.classList.remove('is-loading');
      document.body.classList.add('is-ready');

      try { sessionStorage.setItem(SESSION_KEY, '1'); } catch (e) { /* stockage indisponible */ }

      // Le voile ne sert plus à rien : on le sort du flux et de l'ordre de lecture
      setTimeout(function () {
        veil.setAttribute('aria-hidden', 'true');
        veil.style.display = 'none';
      }, 1000);
    }, 260);
  }

  /* Suit le chargement des images situées au-dessus de la ligne de flottaison */
  function track() {
    var images = Array.prototype.slice.call(document.images).filter(function (img) {
      return !img.loading || img.loading !== 'lazy';
    });

    total = images.length;
    if (!total) { finish(); return; }

    images.forEach(function (img) {
      if (img.complete) {
        step();
        return;
      }
      img.addEventListener('load', step);
      img.addEventListener('error', step);   // une image manquante ne bloque pas
    });
  }

  function step() {
    done += 1;
    paint(done / total);
    if (done >= total) finish();
  }

  function init() {
    veil = document.getElementById('preloader');
    if (!veil) return;

    bar = document.getElementById('preloaderBar');
    percent = document.getElementById('preloaderPercent');

    // Déjà venu pendant cette session : on abrège
    var seen = false;
    try { seen = sessionStorage.getItem(SESSION_KEY) === '1'; } catch (e) { seen = false; }
    if (seen) {
      veil.style.transitionDuration = '.35s';
      setTimeout(finish, 120);
      return;
    }

    track();

    // Filets de sécurité : la fin du chargement, puis un délai maximal
    window.addEventListener('load', function () { setTimeout(finish, 200); });
    setTimeout(finish, SAFETY_DELAY);
  }

  return { init: init };
})();

/* Le voile se gère seul, sans attendre l'initialisation du reste du site */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', App.preloader.init);
} else {
  App.preloader.init();
}
