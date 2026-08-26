# 3C — Cadre de Concertation Citoyenne  

Site vitrine du Cadre de Concertation Citoyenne (3C), organisation sénégalaise
engagée pour l'inclusion sociale, l'autonomisation et la participation des
personnes en situation de handicap.

Site statique, bilingue français / anglais, thème clair et sombre.
**Aucun outil de compilation** : pas de `npm install`, pas d'étape de build.

--- 

## Démarrer

Le plus simple, depuis la racine du dépôt :

```bash
python3 -m http.server 8000
```

puis ouvrir <http://localhost:8000>.

Ouvrir `index.html` directement dans le navigateur fonctionne aussi — les
scripts sont des scripts classiques, pas des modules ES, donc rien n'est
bloqué par les restrictions du protocole `file://`.

---

## Organisation des fichiers

```
index.html              La page — uniquement du balisage
assets/
  css/
    tokens.css          Couleurs, typographie, espacements, rayons, ombres
    base.css            Reset, typographie de fond, accessibilité
    layout.css          Conteneur, sections, en-tête, pied de page
    components.css      Boutons, formulaire, accordéon, visionneuses
    sections.css        Styles propres à chaque section
    responsive.css      Toutes les ruptures de mise en page
  js/
    preloader.js        Voile de chargement
    translations.js     Dictionnaire FR / EN et témoignages
    i18n.js             Application des traductions
    theme.js            Bascule clair / sombre
    navigation.js       Menu mobile, lien actif, retour en haut
    ui.js               Accordéon, compteurs, galerie, citations, vidéo
    parallax.js         Parallaxe et séquence à visuel épinglé
    main.js             Point d'entrée
  img/                  brand, team, gallery, partners
  video/                Extrait de présentation et image d'attente
legacy/                 Version d'origine en un seul fichier, pour référence
```

L'ordre des feuilles et des scripts compte : il est fixé dans `index.html`.

---

## Modifier le contenu

### Textes

Tout le texte visible vit dans **`assets/js/translations.js`**, en deux blocs :
`fr` et `en`. Le balisage porte des attributs qui pointent vers ces clés :

| Attribut                | Effet                        |
| ----------------------- | ---------------------------- |
| `data-i18n`             | remplace le texte            |
| `data-i18n-alt`         | remplace l'attribut `alt`    |
| `data-i18n-placeholder` | remplace le `placeholder`    |
| `data-i18n-aria`        | remplace l'`aria-label`      |

> Une clé ajoutée dans `fr` doit l'être aussi dans `en`, sinon la traduction
> anglaise retombe silencieusement sur la clé brute.

Le texte écrit en dur dans `index.html` sert de repli : il s'affiche le temps
que le script s'exécute, puis est remplacé. Le garder à jour avec le français.

### Témoignages

Toujours dans `translations.js`, en bas du fichier : `App.testimonials`. Chaque
entrée est un objet `{ text, author }`. Ajouter ou retirer une entrée suffit —
les pastilles de navigation sont générées à partir de la liste.

### Couleurs et typographie

**`assets/css/tokens.css`** est le seul fichier à toucher. Le thème clair est
défini sur `:root`, le thème sombre sur `:root[data-theme="dark"]`. Toute
couleur modifiée s'applique partout.

### Photos

Déposer le fichier dans le bon dossier de `assets/img/` et référencer le
nouveau chemin. Nommer les fichiers de façon descriptive et renseigner un `alt`
utile — le site s'adresse notamment à des personnes malvoyantes.

- **Galerie** — `assets/img/gallery/`, ajouter un `<button class="gallery__item">`
  dans la section `#galerie`. La visionneuse et son compteur s'adaptent seuls.
- **Partenaires** — `assets/img/partners/`. Pour un logo carré, ajouter
  `data-shape="square"` sur la balise `<img>` afin d'équilibrer sa taille.
- **Équipe** — `assets/img/team/`, cadrage portrait, le recadrage est
  automatique.

### Vidéo

`assets/video/presentation-3c.mp4`. Pour la remplacer, garder le même nom, puis
régénérer l'image d'attente et corriger la durée affichée
(clé `hero.videoLabel`) :

```bash
ffmpeg -ss 6 -i assets/video/presentation-3c.mp4 -frames:v 1 -q:v 3 \
  assets/video/poster.jpg -y
```

---

## Mettre en ligne

### Vercel

```bash
npm i -g vercel
vercel          # aperçu
vercel --prod   # production
```

Aucun réglage à saisir : `vercel.json` fournit les en-têtes de sécurité et les
durées de cache, `.vercelignore` écarte `legacy/`. Via l'interface web, importer
le dépôt GitHub et laisser le préréglage **Other** — pas de commande de build,
répertoire de sortie à la racine.

### Hébergement mutualisé

Copier le contenu du dépôt dans `www/` ou `public_html/`, en dehors de
`legacy/`, `.git/` et des fichiers de configuration. Le `.htaccess` fourni
s'occupe de la compression, du cache et des en-têtes de sécurité.

```bash
rsync -av --delete \
  --exclude '.git' --exclude 'legacy' --exclude 'README.md' \
  ./ utilisateur@serveur:~/www/
```

### GitHub Pages

Dans **Settings → Pages**, choisir la branche `master` et le dossier `/ (root)`.
Les chemins étant relatifs, le site fonctionne aussi depuis un sous-dossier
de type `/3C/`. Le `.htaccess` et `vercel.json` y sont simplement ignorés.

---

## Points d'attention

- **La vidéo pèse 22 Mo.** Elle est en `preload="none"` : rien n'est téléchargé
  tant que personne ne lance la lecture. Si le dépôt devient trop lourd,
  l'héberger ailleurs et ne changer que l'attribut `src`.
- **Le formulaire de contact n'envoie rien.** Il valide les champs et affiche un
  message de confirmation, sans destinataire. Pour le rendre fonctionnel,
  brancher un service de formulaire dans `initContactForm()`
  (`assets/js/ui.js`).
- **Trois liens sociaux sont des exemples** : LinkedIn, YouTube et X pointent
  vers `votrepage`. Les corriger ou les retirer du pied de page.
- **Les pages légales n'existent pas.** Confidentialité, conditions
  d'utilisation et cookies pointent vers `#`.
- **Trois prénoms sont incomplets** : seul « Adama Thioube » était renseigné
  dans la version d'origine. Les clés `team.m2.name` à `team.m4.name` de
  `translations.js` attendent les noms complets.
- **Les chiffres clés sont ceux de la version d'origine** (500 bénéficiaires,
  25 projets, 15 partenaires, 10 ans). À confirmer avant publication.

---

## Accessibilité

Le sujet du site étant l'inclusion, les points suivants sont tenus et méritent
de le rester : lien d'évitement, navigation au clavier sur tous les éléments
interactifs, `aria-expanded` sur l'accordéon et le menu, `aria-live` sur les
zones qui changent seules, contraste conforme dans les deux thèmes, et respect
de `prefers-reduced-motion` — animations, parallaxe, machine à écrire et
rotation des citations sont alors désactivées.
