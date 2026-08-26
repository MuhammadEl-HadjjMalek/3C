# Cadre de Concertation Citoyenne (3C)

Site vitrine du Cadre de Concertation Citoyenne, organisation sénégalaise
engagée pour l'inclusion et la participation des personnes en situation de
handicap.

Statique, bilingue FR / EN, thème clair et sombre. **Pas de build** : ni
`npm install`, ni étape de compilation.

---

## Démarrer

```bash
python3 -m http.server 8000
```

puis <http://localhost:8000>. Un serveur est nécessaire : la page assemble ses
sections avec `fetch()`, que `file://` refuse. Sans JavaScript, elle reste vide.

---

## Structure

```
index.html       Squelette : <head>, voile de chargement, emplacements
components/      Une section par fichier (header, hero, about, services…)
assets/
  css/           tokens · base · layout · components · sections · responsive
  js/            voir ci-dessous
  img/           brand, team, gallery, partners
  video/         Présentation et image d'attente
legacy/          Version d'origine en un seul fichier, pour référence
```

Les scripts, dans leur ordre de chargement :

| Fichier            | Rôle                                                      |
| ------------------ | --------------------------------------------------------- |
| `preloader.js`     | Voile de chargement                                        |
| `content.js`       | Ce qui ne se traduit pas : images, noms propres, chiffres  |
| `translations.js`  | Tous les textes, en FR et EN                               |
| `i18n.js`          | Pose les textes, gère la bascule de langue                 |
| `include.js`       | Assemble `components/` dans la page                        |
| `render.js`        | Monte les sections en liste (équipe, FAQ, galerie…)        |
| `theme.js`         | Bascule clair / sombre                                     |
| `navigation.js`    | Menu mobile, lien actif, retour en haut                    |
| `ui.js`            | Accordéon, compteurs, visionneuse, citations, vidéo        |
| `parallax.js`      | Parallaxe et séquence à visuel épinglé                     |
| `main.js`          | Point d'entrée                                             |

`main.js` enchaîne : `include` remplace chaque `<div data-component="team">`
par `components/team.html`, `render` remplit chaque `<div data-render="team">`
depuis `content.js`, `i18n` écrit tous les textes, puis les modules d'interface
démarrent sur une page complète.

Déplacer une section revient à déplacer sa ligne `data-component` dans
`index.html`.

---

## Modifier le contenu

Deux fichiers, et deux seulement :

- **`translations.js`**, tout ce qui se traduit, en deux arbres `fr` et `en` de
  même forme ;
- **`content.js`**, tout ce qui ne se traduit pas : chemins d'images, noms
  propres, icônes, valeurs des compteurs.

**Aucun texte n'est écrit en dur dans le HTML.** Le balisage ne porte que le
chemin de la valeur voulue, ce qui évite deux versions d'une même phrase dont
une seule finit par être mise à jour.

```html
<h2 data-i18n="about.title"></h2>
<p  data-i18n="team.members.0.desc"></p>
<img data-i18n-alt="team.portraitAlt" data-i18n-var-name="Oumou LY">
```

`data-i18n` remplit le texte ; `-alt`, `-placeholder`, `-aria` et `-title`
remplissent l'attribut correspondant. Les jetons `{nom}` d'un texte sont remplis
par les attributs `data-i18n-var-*` de l'élément.

> Une clé absente de `en` retombe sur le français. Absente des deux, elle
> affiche son chemin brut (« team.members.4.role ») : l'oubli se voit.

**Listes.** Services, chiffres, réalisations, galerie, équipe, partenaires, FAQ
et témoignages sont des tableaux. Ajouter une entrée demande une ligne dans
`translations.fr`, une dans `translations.en`, et si elle a une image ou un nom
propre, une dans `content.js`, **au même rang**.

**Photos.** Déposer le fichier dans le bon dossier de `assets/img/`, puis
référencer le chemin dans `content.js`. Logo de partenaire carré :
`shape: 'square'`. Portraits d'équipe : cadrage portrait, recadrage automatique.
Toujours renseigner un `alt` utile, le site s'adressant notamment à des
personnes malvoyantes.

**Couleurs et typographie.** `assets/css/tokens.css`, et lui seul. Thème clair
sur `:root`, thème sombre sur `:root[data-theme="dark"]`.

**Vidéo.** Pour remplacer `assets/video/presentation-3c.mp4`, garder le même
nom, régénérer l'image d'attente et corriger la durée affichée
(`hero.videoLabel`) :

```bash
ffmpeg -ss 6 -i assets/video/presentation-3c.mp4 -frames:v 1 -q:v 3 \
  assets/video/poster.jpg -y
```

---

## Mettre en ligne

**Vercel.** `vercel --prod`, ou importer le dépôt avec le préréglage **Other**
(pas de commande de build, sortie à la racine). `vercel.json` fournit les
en-têtes et les durées de cache, `.vercelignore` écarte `legacy/`.

**Hébergement mutualisé.** Copier le dépôt dans `www/` ou `public_html/`. Le
`.htaccess` fourni gère compression, cache et en-têtes.

```bash
rsync -av --delete \
  --exclude '.git' --exclude 'legacy' --exclude 'README.md' \
  ./ utilisateur@serveur:~/www/
```

**GitHub Pages.** Settings → Pages, branche `master`, dossier `/ (root)`. Les
chemins sont relatifs : un sous-dossier `/3C/` fonctionne aussi.

---

## Accessibilité

Le sujet du site étant l'inclusion, ces points sont tenus et méritent de le
rester : lien d'évitement, navigation au clavier partout, `aria-expanded` sur
l'accordéon et le menu, `aria-live` sur les zones qui changent seules, contraste
conforme dans les deux thèmes, et respect de `prefers-reduced-motion`, qui
désactive animations, parallaxe, machine à écrire et rotation des citations.
