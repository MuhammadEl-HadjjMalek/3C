/* =============================================================================
   3C — Sections répétitives
   Services, chiffres, réalisations, galerie, équipe, partenaires et FAQ sont
   des listes : le composant ne pose que le cadre et un emplacement
   data-render="…", rempli ici à partir de assets/js/content.js (visuels, noms
   propres) et de assets/js/translations.js (textes).

   Les éléments produits portent des chemins data-i18n — leur texte est donc
   posé par App.i18n, et suit le changement de langue sans être reconstruit.
   ========================================================================== */
'use strict';

window.App = window.App || {};

App.render = (function () {

  /* --- Petits utilitaires --------------------------------------------------- */

  function make(tag, attrs, children) {
    var node = document.createElement(tag);

    Object.keys(attrs || {}).forEach(function (name) {
      if (attrs[name] !== null && attrs[name] !== undefined) node.setAttribute(name, attrs[name]);
    });

    (children || []).forEach(function (child) {
      if (child) node.appendChild(child);
    });

    return node;
  }

  function fill(slot, nodes) {
    slot.textContent = '';
    nodes.forEach(function (node) { slot.appendChild(node); });
  }

  function pad(index) {
    return String(index + 1).padStart(2, '0');
  }

  /* --- Services : visuel épinglé + énoncés ---------------------------------- */

  function servicesVisual(slot) {
    var items = App.content.services;

    var frame = make('div', { class: 'sequence__frame' }, items.map(function (item, i) {
      return make('img', {
        class: 'sequence__shot' + (i === 0 ? ' is-active' : ''),
        'data-shot': i + 1,
        src: item.img,
        alt: '',
        'aria-hidden': 'true',
        loading: 'lazy'
      });
    }).concat(items.map(function (item, i) {
      return make('p', {
        class: 'sequence__caption' + (i === 0 ? ' is-active' : ''),
        'data-caption': i + 1,
        'data-i18n': 'services.items.' + i + '.caption'
      });
    })));

    var dots = make('ol', { class: 'sequence__dots', 'aria-hidden': 'true' }, items.map(function (item, i) {
      return make('li', { class: i === 0 ? 'is-active' : null, 'data-dot': i + 1 });
    }));

    fill(slot, [frame, dots]);
  }

  function servicesList(slot) {
    fill(slot, App.content.services.map(function (item, i) {
      return make('li', {
        class: 'sequence__item' + (i === 0 ? ' is-active' : ''),
        'data-step': i + 1
      }, [
        make('span', { class: 'sequence__num' }, [document.createTextNode(pad(i))]),
        make('h3', { 'data-i18n': 'services.items.' + i + '.title' }),
        make('p', { 'data-i18n': 'services.items.' + i + '.desc' })
      ]);
    }));
  }

  /* --- Chiffres clés -------------------------------------------------------- */

  function stats(slot) {
    fill(slot, App.content.stats.map(function (item, i) {
      return make('div', { class: 'stat-card' }, [
        make('span', { class: 'stat-card__icon' }, [
          make('i', { class: item.icon, 'aria-hidden': 'true' })
        ]),
        make('p', {
          class: 'stat-card__value',
          'data-target': item.target,
          'data-suffix': item.suffix
        }, [document.createTextNode('0')]),
        make('p', { class: 'stat-card__label', 'data-i18n': 'stats.items.' + i + '.label' })
      ]);
    }));
  }

  /* --- Réalisations : trois jalons ------------------------------------------ */

  function realisations(slot) {
    fill(slot, App.i18n.list('real.items').map(function (item, i) {
      return make('li', { class: 'timeline__item' }, [
        make('span', { class: 'timeline__num' }, [document.createTextNode(pad(i))]),
        make('h3', { 'data-i18n': 'real.items.' + i + '.title' }),
        make('p', { 'data-i18n': 'real.items.' + i + '.desc' })
      ]);
    }));
  }

  /* --- Galerie -------------------------------------------------------------- */

  function gallery(slot) {
    /* Le bouton tire son nom accessible du texte alternatif de l'image
       qu'il contient : pas d'aria-label à maintenir en double. */
    fill(slot, App.content.gallery.map(function (item, i) {
      return make('button', { type: 'button', class: 'gallery__item' }, [
        make('img', {
          src: item.img,
          alt: '',
          'data-i18n-alt': 'gallery.items.' + i + '.alt',
          loading: 'lazy'
        })
      ]);
    }));
  }

  /* --- Équipe --------------------------------------------------------------- */

  function team(slot) {
    fill(slot, App.content.team.map(function (member, i) {
      return make('article', { class: 'team__member' }, [
        make('div', { class: 'team__portrait' }, [
          make('img', {
            src: member.img,
            alt: '',
            'data-i18n-alt': 'team.portraitAlt',
            'data-i18n-var-name': member.name,
            loading: 'lazy'
          })
        ]),
        make('div', null, [
          make('span', { class: 'team__role', 'data-i18n': 'team.members.' + i + '.role' }),
          make('h3', { class: 'team__name' }, [document.createTextNode(member.name)]),
          make('p', { 'data-i18n': 'team.members.' + i + '.desc' })
        ])
      ]);
    }));
  }

  /* --- Partenaires ---------------------------------------------------------- */

  function partners(slot) {
    fill(slot, App.content.partners.map(function (partner) {
      return make('li', null, [
        make('img', {
          src: partner.img,
          alt: partner.name,
          'data-shape': partner.shape || null,
          loading: 'lazy'
        })
      ]);
    }));
  }

  /* --- FAQ : un panneau par question ---------------------------------------- */

  function faq(slot) {
    fill(slot, App.i18n.list('faq.items').map(function (item, i) {
      var triggerId = 'faq-trigger-' + (i + 1);
      var panelId = 'faq-panel-' + (i + 1);

      return make('div', { class: 'accordion__item' }, [
        make('button', {
          type: 'button',
          class: 'accordion__trigger',
          id: triggerId,
          'aria-expanded': 'false',
          'aria-controls': panelId
        }, [
          make('span', { 'data-i18n': 'faq.items.' + i + '.q' }),
          make('span', { class: 'accordion__icon', 'aria-hidden': 'true' }, [
            make('i', { class: 'fa-solid fa-plus' })
          ])
        ]),
        make('div', {
          class: 'accordion__panel',
          id: panelId,
          role: 'region',
          'aria-labelledby': triggerId
        }, [
          make('p', { 'data-i18n': 'faq.items.' + i + '.a' })
        ])
      ]);
    }));
  }

  /* --- Aiguillage ----------------------------------------------------------- */

  var BUILDERS = {
    'services-visual': servicesVisual,
    'services-list': servicesList,
    'stats': stats,
    'real': realisations,
    'gallery': gallery,
    'team': team,
    'partners': partners,
    'faq': faq
  };

  function init(root) {
    (root || document).querySelectorAll('[data-render]').forEach(function (slot) {
      var name = slot.getAttribute('data-render');
      var build = BUILDERS[name];

      if (!build) {
        console.warn('[3C] Aucun gabarit pour data-render="' + name + '"');
        return;
      }

      build(slot);
    });
  }

  return { init: init };
})();
