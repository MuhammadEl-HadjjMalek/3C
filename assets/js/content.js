/* =============================================================================
   3C — Contenu non traduisible
   Tout ce qui ne change pas d'une langue à l'autre : visuels, noms propres,
   icônes, valeurs des compteurs. Les textes, eux, vivent dans translations.js
   et sont repérés par le même index que les entrées ci-dessous.
   ========================================================================== */
'use strict';

window.App = window.App || {};

App.content = {

  /* Services — l'ordre fixe l'index utilisé par translations.services.items */
  services: [
    { img: 'assets/img/gallery/activite-08.jpg' },
    { img: 'assets/img/gallery/activite-04.jpg' },
    { img: 'assets/img/gallery/activite-03.jpg' },
    { img: 'assets/img/gallery/activite-09.jpg' },
    { img: 'assets/img/gallery/activite-06.jpg' },
    { img: 'assets/img/gallery/activite-05.jpg' }
  ],

  /* Chiffres clés */
  stats: [
    { icon: 'fa-solid fa-users', target: 500, suffix: '+' },
    { icon: 'fa-solid fa-diagram-project', target: 25, suffix: '+' },
    { icon: 'fa-solid fa-handshake-angle', target: 15, suffix: '+' },
    { icon: 'fa-solid fa-calendar-check', target: 10, suffix: '' }
  ],

  /* Galerie d'activités */
  gallery: [
    { img: 'assets/img/gallery/activite-10.jpg' },
    { img: 'assets/img/gallery/activite-01.jpg' },
    { img: 'assets/img/gallery/activite-02.jpg' },
    { img: 'assets/img/gallery/activite-03.jpg' },
    { img: 'assets/img/gallery/activite-04.jpg' },
    { img: 'assets/img/gallery/activite-05.jpg' },
    { img: 'assets/img/gallery/activite-06.jpg' },
    { img: 'assets/img/gallery/activite-08.jpg' }
  ],

  /* Équipe — le nom est un nom propre : il ne se traduit pas.
     Fonction et description se trouvent dans translations.team.members. */
  team: [
    { name: 'M. Adama THIOUBE', img: 'assets/img/team/adama-thioube.jpg' },
    { name: 'M. Papa Aliou DIATTA', img: 'assets/img/team/diatta.jpg' },
    { name: 'Oumou LY', img: 'assets/img/team/oumou.jpg' },
    { name: 'Fousseynou DJIMERA', img: 'assets/img/team/mouhamed.jpg' }
  ],

  /* Partenaires — le nom sert aussi de texte alternatif */
  partners: [
    { name: 'GIZ', img: 'assets/img/partners/giz.jpg' },
    { name: 'STMicroelectronics Foundation', img: 'assets/img/partners/stm.jpg' },
    { name: 'Sightsavers', img: 'assets/img/partners/sightsavers.jpg' },
    { name: 'Biscuiterie', img: 'assets/img/partners/biscuiterie.jpg', shape: 'square' },
    { name: 'Commune de Thiaroye', img: 'assets/img/partners/thiaroye.jpg', shape: 'square' },
    { name: 'Agence partenaire du 3C', img: 'assets/img/partners/agence.jpg', shape: 'square' }
  ]
};
