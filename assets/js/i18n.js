/* =============================================================================
   3C — Internationalisation (FR / EN)

   Les textes vivent dans assets/js/translations.js, jamais dans le HTML.
   Un composant écrit seulement le chemin de la valeur voulue :

     <h2 data-i18n="about.title"></h2>
     <p  data-i18n="team.members.0.desc"></p>
     <img data-i18n-alt="team.portraitAlt" data-i18n-var-name="Oumou LY">

   Les variantes -alt, -placeholder, -aria et -title visent un attribut au lieu
   du contenu. Les attributs data-i18n-var-* remplissent les jetons {name} du
   texte traduit.
   ========================================================================== */
'use strict';

window.App = window.App || {};

App.i18n = (function () {
  var STORAGE_KEY = '3c-lang';
  var VAR_PREFIX = 'data-i18n-var-';

  var lang = 'fr';
  var listeners = [];

  /* Chaque entrée : attribut à lire, puis application de la valeur trouvée */
  var TARGETS = [
    ['data-i18n', function (el, v) { el.textContent = v; }],
    ['data-i18n-alt', function (el, v) { el.setAttribute('alt', v); }],
    ['data-i18n-placeholder', function (el, v) { el.setAttribute('placeholder', v); }],
    ['data-i18n-aria', function (el, v) { el.setAttribute('aria-label', v); }],
    ['data-i18n-title', function (el, v) { el.setAttribute('title', v); }]
  ];

  var SELECTOR = TARGETS.map(function (pair) { return '[' + pair[0] + ']'; }).join(',');

  function dict() {
    return App.translations[lang] || App.translations.fr;
  }

  /* Descend un chemin pointé (« team.members.0.role ») dans un arbre donné */
  function walk(tree, path) {
    return String(path).split('.').reduce(function (node, step) {
      return (node === null || node === undefined) ? undefined : node[step];
    }, tree);
  }

  /* Cherche dans la langue courante, retombe sur le français si la clé manque */
  function resolve(path) {
    var found = walk(dict(), path);
    if (found === undefined && lang !== 'fr') found = walk(App.translations.fr, path);
    return found;
  }

  /* Remplace les jetons {nom} par les valeurs fournies */
  function fill(text, vars) {
    if (!vars) return text;
    return text.replace(/\{(\w+)\}/g, function (whole, token) {
      return Object.prototype.hasOwnProperty.call(vars, token) ? vars[token] : whole;
    });
  }

  /* Texte traduit ; à défaut le chemin lui-même, pour repérer l'oubli */
  function t(path, vars) {
    var value = resolve(path);
    return typeof value === 'string' ? fill(value, vars) : path;
  }

  /* Liste traduite (services, témoignages, membres…) ; toujours un tableau */
  function list(path) {
    var value = resolve(path);
    return Array.isArray(value) ? value : [];
  }

  /* Variables de gabarit portées par l'élément : data-i18n-var-name="…" */
  function varsOf(el) {
    var vars = null;
    Array.prototype.forEach.call(el.attributes, function (attr) {
      if (attr.name.indexOf(VAR_PREFIX) !== 0) return;
      vars = vars || {};
      vars[attr.name.slice(VAR_PREFIX.length)] = attr.value;
    });
    return vars;
  }

  /* Traduit un seul élément — utile juste après l'avoir créé */
  function applyTo(el) {
    var vars = varsOf(el);

    TARGETS.forEach(function (pair) {
      var path = el.getAttribute(pair[0]);
      if (!path) return;
      var value = resolve(path);
      if (typeof value === 'string') pair[1](el, fill(value, vars));
    });
  }

  /* Traduit un sous-arbre entier (par défaut : la page) */
  function apply(root) {
    var scope = root || document;
    if (scope.nodeType === 1 && scope.matches && scope.matches(SELECTOR)) applyTo(scope);
    scope.querySelectorAll(SELECTOR).forEach(applyTo);
  }

  function set(next) {
    lang = next === 'en' ? 'en' : 'fr';
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* stockage indisponible */ }

    document.documentElement.setAttribute('lang', lang);

    var label = document.getElementById('langLabel');
    if (label) label.textContent = lang === 'fr' ? 'EN' : 'FR';

    apply();
    listeners.forEach(function (fn) { fn(lang); });
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
    apply: apply,
    applyTo: applyTo,
    t: t,
    list: list,
    get current() { return lang; },
    onChange: function (fn) { listeners.push(fn); }
  };
})();
