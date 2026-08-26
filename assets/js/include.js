/* =============================================================================
   3C — Assemblage des composants
   La page est découpée en fragments dans components/. Chaque emplacement du
   squelette porte data-component="nom" et se fait remplacer par le contenu de
   components/nom.html — l'emplacement lui-même disparaît, pour ne pas ajouter
   de conteneur parasite entre <main> et les sections.
   ========================================================================== */
'use strict';

window.App = window.App || {};

App.include = (function () {
  var BASE = 'components/';

  function fetchPart(name) {
    return fetch(BASE + name + '.html', { cache: 'no-cache' })
      .then(function (response) {
        if (!response.ok) throw new Error(response.status + ' ' + response.statusText);
        return response.text();
      });
  }

  /* Le fragment est analysé dans un <template> : le HTML y garde sa forme,
     y compris les <li> ou <tr> qu'un div refuserait. */
  function parse(html) {
    var holder = document.createElement('template');
    holder.innerHTML = html.trim();
    return holder.content;
  }

  function mount(slot) {
    var name = slot.getAttribute('data-component');

    return fetchPart(name)
      .then(function (html) {
        slot.replaceWith(parse(html));
      })
      .catch(function (error) {
        console.error('[3C] Composant « ' + name + ' » non chargé :', error.message);
      });
  }

  /* Charge tous les emplacements en parallèle ; l'ordre du document est tenu
     par les emplacements eux-mêmes, pas par l'ordre des réponses. */
  function load(root) {
    var slots = (root || document).querySelectorAll('[data-component]');
    return Promise.all(Array.prototype.map.call(slots, mount));
  }

  return { load: load };
})();
