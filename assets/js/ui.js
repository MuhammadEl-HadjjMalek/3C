/* =============================================================================
   3C — Interactions d'interface
   Accordéon FAQ, révélation au défilement, compteurs, citations, galerie,
   formulaire de contact, année du pied de page.
   ========================================================================== */
'use strict';

window.App = window.App || {};

App.ui = (function () {

  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* --- Année courante ------------------------------------------------------ */
  function initYear() {
    var el = document.getElementById('year');
    if (el) el.textContent = String(new Date().getFullYear());
  }

  /* --- Accordéon FAQ ------------------------------------------------------- */
  function initAccordion() {
    document.querySelectorAll('.accordion__trigger').forEach(function (trigger) {
      var panel = document.getElementById(trigger.getAttribute('aria-controls'));
      if (!panel) return;

      trigger.addEventListener('click', function () {
        var isOpen = trigger.getAttribute('aria-expanded') === 'true';

        // Un seul panneau ouvert à la fois
        document.querySelectorAll('.accordion__trigger[aria-expanded="true"]').forEach(function (other) {
          if (other === trigger) return;
          other.setAttribute('aria-expanded', 'false');
          var otherPanel = document.getElementById(other.getAttribute('aria-controls'));
          if (otherPanel) otherPanel.style.maxHeight = null;
        });

        trigger.setAttribute('aria-expanded', String(!isOpen));
        panel.style.maxHeight = isOpen ? null : panel.scrollHeight + 'px';
      });
    });
  }

  /* --- Révélation au défilement -------------------------------------------- */
  function initReveal() {
    var items = document.querySelectorAll('.reveal');
    if (!items.length) return;

    if (reducedMotion || !('IntersectionObserver' in window)) {
      items.forEach(function (item) { item.classList.add('is-visible'); });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

    items.forEach(function (item) { observer.observe(item); });
  }

  /* --- Compteurs animés ---------------------------------------------------- */
  function initCounters() {
    var group = document.querySelector('[data-counters]');
    if (!group) return;

    var counters = group.querySelectorAll('[data-target]');

    function run() {
      counters.forEach(function (counter) {
        var target = parseInt(counter.dataset.target, 10) || 0;
        var suffix = counter.dataset.suffix || '';

        if (reducedMotion) {
          counter.textContent = target + suffix;
          return;
        }

        var start = null;
        var duration = 1400;

        function step(timestamp) {
          if (start === null) start = timestamp;
          var progress = Math.min((timestamp - start) / duration, 1);
          var eased = 1 - Math.pow(1 - progress, 3);
          counter.textContent = Math.round(target * eased) + (progress === 1 ? suffix : '');
          if (progress < 1) requestAnimationFrame(step);
        }

        requestAnimationFrame(step);
      });
    }

    if (!('IntersectionObserver' in window)) { run(); return; }

    var observer = new IntersectionObserver(function (entries) {
      if (!entries[0].isIntersecting) return;
      run();
      observer.disconnect();
    }, { threshold: 0.4 });

    observer.observe(group);
  }


  /* --- Effet machine à écrire sur le titre du hero -------------------------
     Touche d'origine du site : le titre s'écrit lettre par lettre.
     Il est réécrit à chaque changement de langue, et affiché d'un bloc
     lorsque l'utilisateur préfère les animations réduites.
  ------------------------------------------------------------------------- */
  function initHeroTyping() {
    var target = document.getElementById('typing');
    if (!target) return;

    var timer = null;

    function type() {
      if (timer) clearTimeout(timer);
      var text = App.i18n.t('hero.title');

      if (reducedMotion) {
        target.textContent = text;
        return;
      }

      target.textContent = '';
      var index = 0;

      (function step() {
        if (index >= text.length) return;
        target.textContent += text.charAt(index);
        index += 1;
        timer = setTimeout(step, 55);
      })();
    }

    App.i18n.onChange(type);
    type();
  }

  /* --- Témoignages : une citation à la fois --------------------------------
     Défilement automatique doux, interrompu dès que l'on clique une pastille
     ou que le pointeur survole le bloc.
  ------------------------------------------------------------------------- */
  function initQuotes() {
    var body = document.getElementById('quoteBody');
    var text = document.getElementById('quoteText');
    var author = document.getElementById('quoteAuthor');
    var dotsBox = document.getElementById('quoteDots');
    if (!body || !text || !author || !dotsBox) return;

    var index = 0;
    var timer = null;
    var dots = [];

    function list() {
      return App.testimonials[App.i18n.current] || App.testimonials.fr;
    }

    function paint() {
      var item = list()[index];
      text.textContent = item.text;
      author.textContent = item.author;
      dots.forEach(function (dot, i) {
        dot.setAttribute('aria-selected', String(i === index));
      });
    }

    function show(next) {
      if (next === index) return;
      index = next;

      if (reducedMotion) { paint(); return; }

      body.classList.add('is-fading');
      setTimeout(function () {
        paint();
        body.classList.remove('is-fading');
      }, 350);
    }

    function buildDots() {
      dotsBox.textContent = '';
      dots = list().map(function (item, i) {
        var dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'quotes__dot';
        dot.setAttribute('role', 'tab');
        dot.setAttribute('aria-selected', String(i === index));
        dot.setAttribute('aria-label', 'Témoignage ' + (i + 1));
        dot.addEventListener('click', function () {
          stop();
          show(i);
        });
        dotsBox.appendChild(dot);
        return dot;
      });
    }

    function start() {
      if (reducedMotion) return;
      stop();
      timer = setInterval(function () {
        show((index + 1) % list().length);
      }, 7000);
    }

    function stop() {
      if (timer) clearInterval(timer);
      timer = null;
    }

    body.addEventListener('mouseenter', stop);
    body.addEventListener('mouseleave', start);
    dotsBox.addEventListener('focusin', stop);

    App.i18n.onChange(function () {
      index = 0;
      buildDots();
      paint();
      start();
    });

    buildDots();
    paint();
    start();
  }

  /* --- Galerie : visionneuse avec précédent / suivant ---------------------- */
  function initLightbox() {
    var lightbox = document.getElementById('lightbox');
    var image = document.getElementById('lightboxImage');
    var counter = document.getElementById('lightboxCounter');
    var closeBtn = document.getElementById('lightboxClose');
    var prevBtn = document.getElementById('lightboxPrev');
    var nextBtn = document.getElementById('lightboxNext');
    var triggers = Array.prototype.slice.call(document.querySelectorAll('.gallery__item'));
    if (!lightbox || !image || !triggers.length) return;

    var index = 0;
    var lastFocused = null;

    function render() {
      var thumb = triggers[index].querySelector('img');
      image.src = thumb.dataset.full || thumb.src;
      image.alt = thumb.alt;
      if (counter) counter.textContent = (index + 1) + ' / ' + triggers.length;
    }

    function go(step) {
      index = (index + step + triggers.length) % triggers.length;
      render();
    }

    function open(position) {
      index = position;
      lastFocused = triggers[position];
      render();
      lightbox.classList.add('is-open');
      document.body.style.overflow = 'hidden';
      if (closeBtn) closeBtn.focus();
    }

    function close() {
      lightbox.classList.remove('is-open');
      document.body.style.overflow = '';
      image.src = '';
      if (lastFocused) lastFocused.focus();
    }

    triggers.forEach(function (trigger, position) {
      trigger.addEventListener('click', function () { open(position); });
    });

    if (closeBtn) closeBtn.addEventListener('click', close);
    if (prevBtn) prevBtn.addEventListener('click', function () { go(-1); });
    if (nextBtn) nextBtn.addEventListener('click', function () { go(1); });

    lightbox.addEventListener('click', function (event) {
      if (event.target === lightbox) close();
    });

    document.addEventListener('keydown', function (event) {
      if (!lightbox.classList.contains('is-open')) return;
      if (event.key === 'Escape') close();
      if (event.key === 'ArrowLeft') go(-1);
      if (event.key === 'ArrowRight') go(1);
    });
  }

  /* --- Vidéo de présentation ----------------------------------------------
     La source n'est chargée qu'à l'ouverture (preload="none"), pour ne pas
     peser sur le premier affichage.
  ------------------------------------------------------------------------- */
  function initVideo() {
    var trigger = document.getElementById('heroVideo');
    var modal = document.getElementById('videoModal');
    var player = document.getElementById('videoPlayer');
    var closeBtn = document.getElementById('videoClose');
    if (!trigger || !modal || !player) return;

    function open() {
      modal.classList.add('is-open');
      document.body.style.overflow = 'hidden';
      if (closeBtn) closeBtn.focus();
      var playing = player.play();
      if (playing && playing.catch) playing.catch(function () { /* lecture refusée : l'utilisateur cliquera */ });
    }

    function close() {
      modal.classList.remove('is-open');
      document.body.style.overflow = '';
      player.pause();
      player.currentTime = 0;
      trigger.focus();
    }

    trigger.addEventListener('click', open);
    if (closeBtn) closeBtn.addEventListener('click', close);

    modal.addEventListener('click', function (event) {
      if (event.target === modal) close();
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && modal.classList.contains('is-open')) close();
    });
  }

  /* --- Formulaire de contact ----------------------------------------------- */
  function initContactForm() {
    var form = document.getElementById('contactForm');
    var status = document.getElementById('formStatus');
    if (!form || !status) return;

    form.addEventListener('submit', function (event) {
      event.preventDefault();

      if (!form.checkValidity()) {
        status.textContent = App.i18n.t('form.error');
        status.dataset.state = 'error';
        var firstInvalid = form.querySelector(':invalid');
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      status.textContent = App.i18n.t('form.success');
      status.dataset.state = 'success';
      form.reset();
    });
  }

  function init() {
    initYear();
    initAccordion();
    initReveal();
    initCounters();
    initHeroTyping();
    initQuotes();
    initLightbox();
    initVideo();
    initContactForm();
  }

  return { init: init };
})();
