/* =============================================================================
   3C — Textes du site (FR / EN)
   Source unique : aucun texte traduisible n'est écrit en dur dans le HTML.
   Les composants portent seulement des attributs data-i18n* dont la valeur
   est un chemin dans les arbres ci-dessous (« about.vision.title »,
   « team.members.0.role »…).
   ========================================================================== */
'use strict';

window.App = window.App || {};

App.translations = {

  fr: {
    skip: 'Aller au contenu principal',

    nav: {
      ariaMain: 'Navigation principale',
      home: 'Accueil',
      about: 'À propos',
      services: 'Services',
      team: 'Équipe',
      faq: 'FAQ',
      contact: 'Contact'
    },

    hero: {
      title: 'Construisons une société plus inclusive pour tous',
      lead: 'Pour une citoyenneté inclusive, sans distinction ni exclusion.',
      cta1: 'Découvrir nos actions',
      cta2: 'Nous contacter',
      imgAlt: 'Logo du Cadre de Concertation Citoyenne (3C)',
      backdropAlt: 'Activité de terrain du 3C auprès des bénéficiaires',
      scroll: 'Continuer',
      videoLabel: 'Présentation · 2:24'
    },

    about: {
      title: 'À propos de 3C',
      subtitle: "Une organisation au service de l'inclusion et de la citoyenneté.",
      p1: "Le Cadre de Concertation Citoyenne (3C) est engagé dans la promotion de l'inclusion, de l'égalité des chances, de la participation citoyenne et de l'autonomisation des personnes en situation de handicap.",
      p2: "Nous agissons au plus près des communautés : accompagnement individuel, formation, plaidoyer auprès des institutions et partenariats avec les acteurs publics, associatifs et privés.",
      vision: {
        title: 'Vision',
        desc: 'Une société inclusive où chaque citoyen participe pleinement à la vie sociale, économique et politique.'
      },
      mission: {
        title: 'Mission',
        desc: "Promouvoir les droits, l'autonomie et la participation des personnes en situation de handicap."
      },
      values: {
        title: 'Valeurs',
        desc: 'Inclusion, solidarité, équité, transparence et citoyenneté.'
      },
      shot1Alt: 'Forum citoyen organisé par le 3C à Dakar',
      shot2Alt: "Atelier d'inclusion numérique animé par le 3C",
      shot3Alt: 'Rencontre du 3C avec des familles de bénéficiaires'
    },

    services: {
      title: 'Nos services',
      subtitle: "Six domaines d'intervention pour lever les obstacles à la pleine participation citoyenne.",
      items: [
        {
          title: 'Accompagnement social',
          desc: "Orientation et accompagnement administratif personnalisé : constitution des dossiers, accès aux droits, relais vers les services publics.",
          caption: "Session d'accueil et d'orientation"
        },
        {
          title: 'Formation',
          desc: 'Renforcement de capacités et inclusion numérique, avec des modules adaptés aux déficiences visuelles.',
          caption: "Atelier d'inclusion numérique"
        },
        {
          title: 'Insertion professionnelle',
          desc: "Accès à l'emploi et entrepreneuriat inclusif : préparation, mise en relation et suivi après le placement.",
          caption: "Atelier collectif de préparation à l'emploi"
        },
        {
          title: 'Accessibilité',
          desc: "Promotion de l'accessibilité universelle des lieux, des services et de l'information.",
          caption: "Rencontre publique sur l'accessibilité"
        },
        {
          title: 'Plaidoyer citoyen',
          desc: 'Défense des droits des personnes en situation de handicap auprès des institutions et des collectivités.',
          caption: 'Forum citoyen avec les institutions'
        },
        {
          title: 'Partenariats',
          desc: "Collaboration avec collectivités, ONG et entreprises pour démultiplier l'impact des actions.",
          caption: 'Signature de partenariat'
        }
      ]
    },

    stats: {
      title: 'Notre impact en chiffres',
      subtitle: "Dix années d'action aux côtés des personnes en situation de handicap.",
      items: [
        { label: 'Bénéficiaires' },
        { label: 'Projets réalisés' },
        { label: 'Partenaires' },
        { label: "Ans d'engagement" }
      ]
    },

    real: {
      title: 'Nos réalisations',
      subtitle: 'Trois chantiers menés de bout en bout, de la conception au suivi des bénéficiaires.',
      items: [
        {
          title: 'Forums citoyens',
          desc: "Organisation d'événements favorisant la participation citoyenne et le dialogue avec les institutions."
        },
        {
          title: 'Formations numériques',
          desc: 'Accompagnement des bénéficiaires aux outils digitaux, avec des modules adaptés aux déficiences visuelles.'
        },
        {
          title: 'Insertion professionnelle',
          desc: "Appui à l'employabilité et à l'entrepreneuriat inclusif, de la formation au placement."
        }
      ]
    },

    gallery: {
      title: "Galerie d'activités",
      subtitle: 'Ateliers, formations et rencontres citoyennes organisés par le 3C.',
      items: [
        { alt: "Membres du 3C lors d'une activité communautaire d'inclusion" },
        { alt: "Activité collaborative pour l'autonomisation des personnes en situation de handicap" },
        { alt: "Activité de sensibilisation à l'égalité des chances" },
        { alt: 'Rencontre citoyenne autour de la solidarité sociale' },
        { alt: "Atelier de formation à l'inclusion numérique" },
        { alt: "Remise d'attestations à l'issue d'une formation" },
        { alt: "Session de renforcement de capacités pour l'autonomisation" },
        { alt: 'Forum citoyen sur la participation active des personnes en situation de handicap' }
      ]
    },

    testimonials: {
      title: 'Témoignages',
      subtitle: 'Bénéficiaires, partenaires et bénévoles racontent leur expérience du 3C.',
      chooseAria: 'Choisir un témoignage',
      dotLabel: 'Témoignage {n}',
      items: [
        {
          text: "Grâce à 3C, j'ai pu suivre une formation numérique et renforcer mon autonomie.",
          author: 'Fatou D., bénéficiaire'
        },
        {
          text: "Le 3C joue un rôle essentiel dans la promotion de l'inclusion sociale au Sénégal.",
          author: 'Partenaire institutionnel'
        },
        {
          text: "L'accompagnement est concret : on ne nous laisse pas seuls après la formation.",
          author: 'Moussa S., bénéficiaire'
        },
        {
          text: "Une équipe disponible, à l'écoute, qui connaît vraiment le terrain.",
          author: 'Bénévole, Dakar'
        }
      ]
    },

    team: {
      title: 'Notre équipe',
      subtitle: 'Une équipe engagée au quotidien auprès des personnes en situation de handicap.',
      portraitAlt: 'Portrait de {name}, équipe du 3C',
      members: [
        {
          role: 'Président',
          desc: 'Directeur des programmes de formation, de la stratégie et du développement.'
        },
        {
          role: 'Directeur administratif',
          desc: 'Coordinateur national.'
        },
        {
          role: 'Secrétaire administrative',
          desc: "Gestion administrative et opérationnelle de l'organisation."
        },
        {
          role: "Systèmes d'information",
          desc: 'Chargé de la digitalisation et de la communication.'
        }
      ]
    },

    partners: {
      title: 'Nos partenaires',
      subtitle: 'Institutions, entreprises et organisations qui soutiennent nos actions.',
      note: 'Vous souhaitez soutenir nos actions ?',
      noteLink: 'Écrivez-nous'
    },

    faq: {
      title: 'Questions fréquentes',
      items: [
        {
          q: 'Qui peut bénéficier des services de 3C ?',
          a: "Toute personne en situation de handicap ainsi que leurs familles, sans condition d'âge ni de type de handicap."
        },
        {
          q: 'Comment devenir membre ?',
          a: "Contactez notre équipe via le formulaire ci-dessous ou par téléphone : nous vous expliquerons la démarche d'adhésion."
        },
        {
          q: 'Comment soutenir les activités de 3C ?',
          a: 'Vous pouvez devenir partenaire, bénévole ou contributeur. Écrivez-nous pour définir ensemble la forme de soutien la plus utile.'
        }
      ]
    },

    contact: {
      title: 'Contact',
      subtitle: "Une question, un projet, une demande d'accompagnement ? Notre équipe vous répond.",
      infoTitle: 'Nos coordonnées',
      address: 'Usine Niary Tally, Parcelles n°966, Dakar, Sénégal',
      hours: 'Lundi – Vendredi : 9h – 17h'
    },

    form: {
      title: 'Envoyer un message',
      name: 'Nom complet',
      namePh: 'Votre nom',
      email: 'Adresse e-mail',
      emailPh: 'vous@exemple.com',
      message: 'Votre message',
      messagePh: 'Comment pouvons-nous vous aider ?',
      submit: 'Envoyer le message',
      error: 'Merci de renseigner tous les champs correctement.',
      success: "Merci ! Votre message a bien été préparé pour l'envoi."
    },

    footer: {
      tagline: 'Cadre de Concertation Citoyenne',
      desc: 'Pour une citoyenneté inclusive, sans distinction ni exclusion.',
      rights: 'Tous droits réservés.',
      logoAlt: 'Logo du Cadre de Concertation Citoyenne',
      col: {
        nav: 'Navigation',
        resources: 'Ressources',
        legal: 'Légal'
      },
      link: {
        team: 'Notre équipe',
        gallery: "Galerie d'activités",
        reports: "Rapports d'activités",
        press: 'Espace presse',
        privacy: 'Confidentialité',
        terms: "Conditions d'utilisation",
        cookies: 'Politique de cookies'
      },
      soon: 'Bientôt'
    },

    aria: {
      themeToggle: 'Activer le mode sombre',
      themeToggleOn: 'Activer le mode clair',
      langToggle: 'Switch to English',
      navToggle: 'Ouvrir le menu de navigation',
      scrollCue: 'Aller à la section À propos',
      playVideo: 'Lire la vidéo de présentation du 3C',
      videoModal: 'Vidéo de présentation du 3C',
      videoClose: 'Fermer la vidéo',
      topBtn: 'Retour en haut de page',
      whatsapp: 'Nous contacter sur WhatsApp',
      lightbox: 'Image agrandie',
      lightboxClose: "Fermer l'image",
      lightboxPrev: 'Image précédente',
      lightboxNext: 'Image suivante'
    }
  },

  en: {
    skip: 'Skip to main content',

    nav: {
      ariaMain: 'Main navigation',
      home: 'Home',
      about: 'About',
      services: 'Services',
      team: 'Team',
      faq: 'FAQ',
      contact: 'Contact'
    },

    hero: {
      title: 'Building a more inclusive society for everyone',
      lead: 'For inclusive citizenship, without distinction or exclusion.',
      cta1: 'Discover our work',
      cta2: 'Contact us',
      imgAlt: 'Logo of the Citizen Consultation Framework (3C)',
      backdropAlt: '3C field activity with beneficiaries',
      scroll: 'Scroll',
      videoLabel: 'Introduction · 2:24'
    },

    about: {
      title: 'About 3C',
      subtitle: 'An organisation dedicated to inclusion and citizenship.',
      p1: 'The Citizen Consultation Framework (3C) is committed to promoting inclusion, equal opportunity, civic participation and the empowerment of people with disabilities.',
      p2: 'We work close to communities: individual support, training, advocacy with institutions, and partnerships with public, non-profit and private actors.',
      vision: {
        title: 'Vision',
        desc: 'An inclusive society where every citizen fully takes part in social, economic and political life.'
      },
      mission: {
        title: 'Mission',
        desc: 'Promote the rights, autonomy and participation of people with disabilities.'
      },
      values: {
        title: 'Values',
        desc: 'Inclusion, solidarity, equity, transparency and citizenship.'
      },
      shot1Alt: 'Citizen forum organised by 3C in Dakar',
      shot2Alt: 'Digital inclusion workshop run by 3C',
      shot3Alt: '3C meeting with beneficiaries and their families'
    },

    services: {
      title: 'Our services',
      subtitle: 'Six areas of work to remove the barriers to full civic participation.',
      items: [
        {
          title: 'Social support',
          desc: 'Personalised guidance and administrative support: paperwork, access to rights, referral to public services.',
          caption: 'Intake and guidance session'
        },
        {
          title: 'Training',
          desc: 'Capacity building and digital inclusion, with modules adapted to visual impairment.',
          caption: 'Digital inclusion workshop'
        },
        {
          title: 'Professional integration',
          desc: 'Access to employment and inclusive entrepreneurship: preparation, matching and follow-up after placement.',
          caption: 'Group session on job readiness'
        },
        {
          title: 'Accessibility',
          desc: 'Promoting universal accessibility of places, services and information.',
          caption: 'Public meeting on accessibility'
        },
        {
          title: 'Civic advocacy',
          desc: 'Defending the rights of people with disabilities before institutions and local authorities.',
          caption: 'Citizen forum with institutions'
        },
        {
          title: 'Partnerships',
          desc: 'Collaboration with local authorities, NGOs and businesses to scale up the impact of our work.',
          caption: 'Partnership signing'
        }
      ]
    },

    stats: {
      title: 'Our impact in numbers',
      subtitle: 'Ten years of action alongside people with disabilities.',
      items: [
        { label: 'Beneficiaries' },
        { label: 'Projects completed' },
        { label: 'Partners' },
        { label: 'Years of commitment' }
      ]
    },

    real: {
      title: 'Our achievements',
      subtitle: 'Three programmes run end to end, from design to follow-up with beneficiaries.',
      items: [
        {
          title: 'Citizen forums',
          desc: 'Organising events that foster civic participation and dialogue with institutions.'
        },
        {
          title: 'Digital training',
          desc: 'Supporting beneficiaries with digital tools, including modules adapted to visual impairment.'
        },
        {
          title: 'Professional integration',
          desc: 'Support for employability and inclusive entrepreneurship, from training to placement.'
        }
      ]
    },

    gallery: {
      title: 'Activity gallery',
      subtitle: 'Workshops, training sessions and citizen gatherings organised by 3C.',
      items: [
        { alt: '3C members during a community inclusion activity' },
        { alt: 'Collaborative activity for the empowerment of people with disabilities' },
        { alt: 'Awareness activity on equal opportunity' },
        { alt: 'Citizen gathering on social solidarity' },
        { alt: 'Digital inclusion training workshop' },
        { alt: 'Handing out certificates at the end of a training course' },
        { alt: 'Capacity-building session on empowerment' },
        { alt: 'Citizen forum on the active participation of people with disabilities' }
      ]
    },

    testimonials: {
      title: 'Testimonials',
      subtitle: 'Beneficiaries, partners and volunteers share their experience of 3C.',
      chooseAria: 'Choose a testimonial',
      dotLabel: 'Testimonial {n}',
      items: [
        {
          text: 'Thanks to 3C, I was able to take a digital training course and strengthen my independence.',
          author: 'Fatou D., beneficiary'
        },
        {
          text: '3C plays an essential role in promoting social inclusion in Senegal.',
          author: 'Institutional partner'
        },
        {
          text: 'The support is concrete: we are not left on our own once the training ends.',
          author: 'Moussa S., beneficiary'
        },
        {
          text: 'A team that is available, attentive, and genuinely knows the field.',
          author: 'Volunteer, Dakar'
        }
      ]
    },

    team: {
      title: 'Our team',
      subtitle: 'A team committed every day to people with disabilities.',
      portraitAlt: 'Portrait of {name}, 3C team',
      members: [
        {
          role: 'President',
          desc: 'Director of training programmes, strategy and development.'
        },
        {
          role: 'Administrative Director',
          desc: 'National coordinator.'
        },
        {
          role: 'Administrative Secretary',
          desc: 'Administrative and operational management of the organisation.'
        },
        {
          role: 'Information Systems',
          desc: 'In charge of digitalisation and communications.'
        }
      ]
    },

    partners: {
      title: 'Our partners',
      subtitle: 'Institutions, businesses and organisations that support our work.',
      note: 'Would you like to support our work?',
      noteLink: 'Get in touch'
    },

    faq: {
      title: 'Frequently asked questions',
      items: [
        {
          q: "Who can benefit from 3C's services?",
          a: 'Any person with a disability, as well as their families — regardless of age or type of disability.'
        },
        {
          q: 'How do I become a member?',
          a: 'Contact our team using the form below or by phone, and we will walk you through the membership process.'
        },
        {
          q: "How can I support 3C's activities?",
          a: 'You can become a partner, a volunteer or a contributor. Write to us and we will define the most useful form of support together.'
        }
      ]
    },

    contact: {
      title: 'Contact',
      subtitle: 'A question, a project, a request for support? Our team will get back to you.',
      infoTitle: 'Our contact details',
      address: 'Usine Niary Tally, Parcelles n°966, Dakar, Senegal',
      hours: 'Monday – Friday: 9am – 5pm'
    },

    form: {
      title: 'Send a message',
      name: 'Full name',
      namePh: 'Your name',
      email: 'Email address',
      emailPh: 'you@example.com',
      message: 'Your message',
      messagePh: 'How can we help you?',
      submit: 'Send message',
      error: 'Please fill in all fields correctly.',
      success: 'Thank you! Your message has been prepared for sending.'
    },

    footer: {
      tagline: 'Citizen Consultation Framework',
      desc: 'For inclusive citizenship, without distinction or exclusion.',
      rights: 'All rights reserved.',
      logoAlt: 'Logo of the Citizen Consultation Framework',
      col: {
        nav: 'Navigation',
        resources: 'Resources',
        legal: 'Legal'
      },
      link: {
        team: 'Our team',
        gallery: 'Activity gallery',
        reports: 'Activity reports',
        press: 'Press area',
        privacy: 'Privacy',
        terms: 'Terms of use',
        cookies: 'Cookie policy'
      },
      soon: 'Soon'
    },

    aria: {
      themeToggle: 'Switch to dark mode',
      themeToggleOn: 'Switch to light mode',
      langToggle: 'Passer en français',
      navToggle: 'Open navigation menu',
      scrollCue: 'Go to the About section',
      playVideo: 'Play the 3C introduction video',
      videoModal: '3C introduction video',
      videoClose: 'Close the video',
      topBtn: 'Back to top',
      whatsapp: 'Contact us on WhatsApp',
      lightbox: 'Enlarged image',
      lightboxClose: 'Close image',
      lightboxPrev: 'Previous image',
      lightboxNext: 'Next image'
    }
  }
};
