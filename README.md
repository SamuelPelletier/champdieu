# Site vitrine — Tournoi de Béhourd au Prieuré de Champdieu

Site statique (HTML / CSS / JS uniquement, sans framework ni build) prêt à être publié sur **GitHub Pages**.

## Structure

```
.
├── index.html          → contenu et structure de la page
├── css/style.css        → thème visuel (médiéval sombre)
├── js/main.js            → menu mobile, FAQ, compte à rebours, liens billetterie
├── assets/
│   ├── favicon.svg
│   ├── galerie/          → à remplir avec vos photos
│   └── sponsors/         → à remplir avec les logos de vos partenaires
└── README.md
```

## À personnaliser avant publication

Cherchez `[À COMPLÉTER]` et `[à confirmer]` dans `index.html` : dates, adresse,
tarifs, programme, contacts, réseaux sociaux, mentions légales.

1. **Dates de l'événement** : dans `index.html` (bandeau, hero, programme) et
   dans `js/main.js`, constante `EVENT_DATE` (utilisée pour le compte à rebours).
2. **Lien de billetterie** : dans `js/main.js`, constante `TICKET_URL`. Tous les
   boutons « Réserver » (attribut `data-ticket`) pointeront automatiquement vers
   cette adresse (Billetweb, HelloAsso, Weezevent…).
3. **Adresse / carte** : la carte intégrée dans la section « Le lieu » utilise
   une recherche Google Maps générique — remplacez l'URL de l'`<iframe>` par
   l'adresse exacte une fois confirmée.
4. **Photos** : déposez vos images dans `assets/galerie/` et remplacez les
   vignettes `.gallery-item` de la section Galerie par des balises `<img>`.
   Les photos actuelles viennent de Wikimedia Commons (à titre d'illustration
   temporaire) — remplacez-les par vos propres photos dès que possible.
5. **Sponsors / partenaires** : déposez les logos dans `assets/sponsors/` et
   remplacez les cadres `.sponsor-logo` de la section « Nos partenaires » par
   des balises `<img>` (ex. `<img src="assets/sponsors/logo-x.png" alt="Nom du sponsor">`).
6. **Contact** : adresse e-mail, téléphone et liens Facebook / Instagram dans
   la section Contact.
7. **Formulaire de contact** : GitHub Pages n'exécute pas de backend. Le
   formulaire utilise actuellement un lien `mailto:` (ouvre le client mail du
   visiteur). Pour un vrai envoi de formulaire, utilisez un service comme
   [Formspree](https://formspree.io) ou [HelloAsso](https://helloasso.com) et
   changez l'attribut `action` du `<form>`.

## Publier sur GitHub Pages

1. Créez un dépôt GitHub et poussez ce dossier tel quel (racine du dépôt).
2. Dans le dépôt : **Settings → Pages → Source**, choisissez la branche
   `main` et le dossier `/ (root)`.
3. Votre site sera disponible à l'adresse
   `https://<votre-utilisateur>.github.io/<nom-du-depot>/` après quelques
   minutes.

Aucune étape de build n'est nécessaire : le site est en HTML/CSS/JS pur.

## Tester en local

Ouvrez simplement `index.html` dans un navigateur, ou lancez un petit serveur
local (recommandé pour que la carte s'affiche correctement) :

```bash
python3 -m http.server 8000
```

puis rendez-vous sur `http://localhost:8000`.
