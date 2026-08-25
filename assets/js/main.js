/* =============================================================================
   3C — Point d'entrée
   Initialise les modules dans l'ordre : traductions → thème → navigation → UI.
   ========================================================================== */
'use strict';

document.addEventListener('DOMContentLoaded', function () {
  App.i18n.init();
  App.theme.init();
  App.navigation.init();
  App.ui.init();
  App.parallax.init();
});
