/* =============================================================================
   3C — Point d'entrée
   Assemble d'abord les composants, monte les listes, puis initialise les
   modules. L'ordre compte : chaque module interroge le DOM à son démarrage,
   il doit donc trouver la page complète.
   ========================================================================== */
'use strict';

document.addEventListener('DOMContentLoaded', function () {
  App.include.load().then(function () {
    App.render.init();     // services, chiffres, galerie, équipe, partenaires, FAQ
    App.i18n.init();       // pose tous les textes, dans la langue retenue
    App.preloader.init();  // suit le chargement des visuels désormais présents
    App.theme.init();
    App.navigation.init();
    App.ui.init();
    App.parallax.init();
  });
});
