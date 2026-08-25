/* =============================================================================
   3C — Thème clair / sombre
   Le thème est appliqué très tôt (script inline dans <head>) pour éviter
   un flash de couleur ; ce module gère uniquement le bouton de bascule.
   ========================================================================== */
'use strict';

window.App = window.App || {};

App.theme = (function () {
  var STORAGE_KEY = '3c-theme';
  var button, icon;

  function current() {
    return document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  }

  function render(theme) {
    if (!button || !icon) return;
    icon.className = theme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
    button.setAttribute('aria-pressed', String(theme === 'dark'));
    button.setAttribute('data-i18n-aria', theme === 'dark' ? 'aria.themeToggleOn' : 'aria.themeToggle');
    if (App.i18n) App.i18n.applyTo(button);
  }

  function toggle() {
    var next = current() === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    try { localStorage.setItem(STORAGE_KEY, next); } catch (e) { /* stockage indisponible */ }
    render(next);
  }

  function init() {
    button = document.getElementById('themeToggle');
    icon = document.getElementById('themeIcon');
    if (!button) return;
    render(current());
    button.addEventListener('click', toggle);
  }

  return { init: init, refresh: function () { render(current()); } };
})();
