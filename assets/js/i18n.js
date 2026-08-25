/* =============================================================================
   3C — Internationalisation (FR / EN)
   Traduit tout élément portant data-i18n, -alt, -placeholder ou -aria.
   ========================================================================== */
'use strict';

window.App = window.App || {};

App.i18n = (function () {
  var STORAGE_KEY = '3c-lang';
  var lang = 'fr';
  var listeners = [];

  function dict() {
    return App.translations[lang] || App.translations.fr;
  }

  /* Traduit un seul élément (utile après une mise à jour dynamique) */
  function applyTo(el) {
    var d = dict();
    var map = [
      ['data-i18n', function (v) { el.textContent = v; }],
      ['data-i18n-alt', function (v) { el.setAttribute('alt', v); }],
      ['data-i18n-placeholder', function (v) { el.setAttribute('placeholder', v); }],
      ['data-i18n-aria', function (v) { el.setAttribute('aria-label', v); }],
      ['data-i18n-title', function (v) { el.setAttribute('title', v); }]
    ];

    map.forEach(function (pair) {
      var key = el.getAttribute(pair[0]);
      if (key && d[key]) pair[1](d[key]);
    });
  }

  function applyAll() {
    var selector = '[data-i18n],[data-i18n-alt],[data-i18n-placeholder],[data-i18n-aria],[data-i18n-title]';
    document.querySelectorAll(selector).forEach(applyTo);
    document.documentElement.setAttribute('lang', lang);
    listeners.forEach(function (fn) { fn(lang); });
  }

  function set(next) {
    lang = next === 'en' ? 'en' : 'fr';
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* stockage indisponible */ }
    var label = document.getElementById('langLabel');
    if (label) label.textContent = lang === 'fr' ? 'EN' : 'FR';
    applyAll();
  }

  function init() {
    var saved;
    try { saved = localStorage.getItem(STORAGE_KEY); } catch (e) { saved = null; }
    set(saved === 'en' ? 'en' : 'fr');

    var toggle = document.getElementById('langToggle');
    if (toggle) {
      toggle.addEventListener('click', function () {
        set(lang === 'fr' ? 'en' : 'fr');
      });
    }
  }

  return {
    init: init,
    set: set,
    applyTo: applyTo,
    t: function (key) { return dict()[key] || key; },
    get current() { return lang; },
    onChange: function (fn) { listeners.push(fn); }
  };
})();
