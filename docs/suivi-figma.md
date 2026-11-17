# Suivre une nouvelle version du Figma AMF

Ce guide va de la réception d'un nouvel export du Figma (par exemple `AMF Design System [v2.1].fig`) jusqu'au commit.
L'outil est `scripts/amf-figma.mjs` : il compare le nouveau fichier à la version de référence décrite dans
`figma/instantane.json` (aujourd'hui la v2.0, export du 2026-11-12), écrit un rapport, puis applique ce qui peut l'être.
Un rapport produit par l'outil sur une v2.1 fictive est dans
[suivi-figma-exemple-rapport.md](suivi-figma-exemple-rapport.md).

En résumé :

```bash
npm run figma:comparer -- "figma/sources/AMF Design System [v2.1].fig"    # 1. comparer : rapport, rien d'autre ne change
# 2. lire le rapport
# 3. remplacer les jetons renommés ou supprimés encore utilisés, relancer comparer
npm run figma:appliquer -- "figma/sources/AMF Design System [v2.1].fig"   # 4. appliquer : jetons, référence, contrastes
# 5. reporter les composants et le journal à la main
# 6. vérifier (tests, build, axe)
# 7. committer
```

## Avant de commencer

- **Node 22.15 ou plus récent** (`node -v`) : la lecture du .fig utilise la décompression zstd intégrée à Node. L'outil
  lui-même n'a aucune dépendance ; les étapes 5 et 6 demandent les dépendances du dépôt (`npm ci`).
- **Dépôt propre** (`git status` vide) : on peut alors tout annuler en une commande (voir « Annuler ») et le commit ne
  contient que la mise à jour du Figma.
- **Le .fig** : dans Figma, Fichier › Enregistrer une copie locale. Le poser dans `figma/sources/`, à côté de la
  version précédente, sans l'écraser ni la supprimer : il sera committé avec la mise à jour (étape 7). Le nom contient
  des espaces et des crochets : toujours le mettre entre guillemets dans les commandes.

## 1. Comparer

```bash
npm run figma:comparer -- "figma/sources/AMF Design System [v2.1].fig"
```

La console résume les différences, puis donne le chemin du rapport :

```
5 différence(s) : jetons +0 −0 ~1 (renommés 1) ; pages +0 −0 ~1 ; composants +0 −0 ~1 ; journal +0 −0 ~1
Rapport : figma/rapports/2026-12-01.md
```

- Le rapport s'appelle `figma/rapports/<date d'export du .fig>.md`. Relancer `comparer` (ou lancer `appliquer`) sur
  la même référence et la même version remplace ce rapport par le plus récent ; un rapport d'une autre comparaison
  portant la même date n'est pas écrasé, le nouveau est suffixé `-2`, `-3`…. `--rapport <fichier.md>` choisit un autre
  chemin (et l'écrase).
- S'il n'y a aucune différence, aucun rapport n'est écrit (`0 différence(s)` … `Aucun rapport écrit`).
- `comparer` ne modifie rien d'autre : on peut le relancer autant de fois que nécessaire.

## 2. Lire le rapport

Le rapport suit toujours le même plan (voir [l'exemple](suivi-figma-exemple-rapport.md)). Une section n'apparaît que
si elle a du contenu.

**Synthèse et À faire.** Un tableau avec une ligne par domaine (jetons, pages, composants, journal), puis la liste des
actions dans l'ordre. Quand des jetons changent, la commande `appliquer` y est écrite pour ce fichier.

**Jetons.** Les noms sont ceux de `amf-tokens.css` (`--amf-…`).

- _Renommages probables_ : un jeton disparu et un jeton apparu qui ont exactement la même valeur, sans autre candidat.
  C'est une déduction : la confirmer dans Figma ou dans le journal. Deux jetons de même valeur renommés en même temps
  apparaissent comme supprimés et ajoutés.
- _Supprimés_, _Ajoutés_, _Valeurs modifiées_ : la valeur est celle écrite dans le CSS (`#0066cc`, `8px`,
  `var(--amf-color-steel-50)`) ; « Rounded : … » donne la valeur du mode Rounded quand elle diffère, et un mode
  supplémentaire (un futur mode Dark) apparaît de la même façon.
- **encore utilisé** : les endroits du dépôt qui citent un jeton supprimé ou renommé par son nom complet, sous la forme
  `fichier:lignes`. Sont lus les fichiers `.css`, `.ts`, `.html`, `.mjs` et `.md` de `projects/`, `docs/` et
  `scripts/`, sauf `amf-tokens.css`, les fichiers `*.generated.ts`, les dossiers `figma/` (dont `scripts/figma/`, l'outil
  et ses tests) et ce guide avec son exemple.
- **nom construit par morceaux** (à vérifier) : un fichier qui cite le début du nom (`--amf-background-`) et la fin
  entre guillemets (`'surface-subtle'`), comme le font `scripts/audit-contrastes.mjs` et la page Couleurs de la vitrine
  (`projects/showcase/src/app/pages/couleurs.ts`). C'est une recherche approchée : la vérifier ligne par ligne. Une
  expression régulière qui ne fait que filtrer des noms (`surface|surface-subtle`) n'est pas détectée.
- Un jeton qui ne change que parce que sa cible a été renommée (`var(--amf-ancien)` devenu `var(--amf-nouveau)`) n'est
  pas compté comme modifié.

**Pages.** Pages ajoutées, supprimées ou renommées (par exemple quand le 🆕 disparaît du nom). Un renommage de page ne
fait apparaître aucun composant comme supprimé : composants, variantes, pages et calques sont reconnus par leur
identifiant Figma.

**Composants.** Un titre par composant changé, `### Page › Composant — vitrine : \`id\``, où `id` est la page de la
vitrine concernée (`#/composants/<id>`) ; la partie « vitrine » manque quand aucune page de la vitrine ne cite ce
composant (voir l'étape 5). Viennent ensuite le renommage ou le déplacement éventuel, les propriétés et variantes
ajoutées, supprimées ou renommées, puis les changements calque par calque. Un même changement sur plusieurs variantes ou
plusieurs calques est regroupé. Comment lire une ligne :

```
- 6 variantes Color=Blue, State=Default ; Color=Purple, State=Default ; … :
  - (racine) : rayon 10 [Radius/L] **→** 12
```

- `(racine)` est le cadre de la variante ; les autres calques sont donnés par leur chemin (`Header / Title`), les
  homonymes numérotés `#2`, `#3`.
- `avant **→** après` ; « sans … » et « avec … » pour un attribut qui disparaît ou apparaît ; « ajouté : » et
  « retiré : » pour un calque entier ; « renommé (ancien chemin : …) » pour un calque renommé.
- Entre crochets, la variable Figma liée : `[Radius/L]` ci-dessus veut dire que le rayon était lié à la variable
  Radius/L et qu'il est devenu une valeur saisie (12). Dans le CSS, c'est la différence entre `var(--amf-radius-l)` et
  une valeur en dur.
- Chaque description commence par le type du calque (`FRAME`, `TEXT`, `INSTANCE`…). Vocabulaire des attributs : taille
  `L×H`, `min` et `max`, `masqué`, `opacité`, `position absolue`, `étiré`, `remplit le travers`,
  `pile horizontale` ou `verticale`, `marges haut/droite/bas/gauche`, `écart`, `axe` et `travers` (alignements),
  `dimensionnement`, `retour à la ligne`, `écart des lignes`, `rayon` ou `rayons` (4 coins), `fond`,
  `trait couleur épaisseur(s) alignement`, `pointillés`, `ombre « style » (valeur)`, `effets`,
  `style « Body 1 » (police taille/interligne)` ou `police …` (texte sans style), `couleur`, `casse`, `souligné`,
  `barré`, `aligné`, `ajustement`, `tronqué`, `lignes max`, `« texte »`, et pour une instance `→ composant`,
  `propriétés nom=valeur`, `surcharges calque(changements)`.
- « N attribut(s) de calque ne changent que par un jeton renommé » : ces changements ne sont pas listés, le renommage
  l'est dans Jetons.
- Les listes sont abrégées : 6 variantes au plus puis « … », 4 chemins puis « (+ N calques) », 15 calques par groupe
  puis « … et N autre(s) calque(s) ». Les icônes nouvelles ou supprimées tiennent sur une ligne.

**Journal (page Changelog).** « Nouveau » pour un bloc de texte nouveau, « Réécrit » pour un bloc dont la première
ligne est inchangée (lignes ajoutées et retirées détaillées), « Retiré » pour un bloc disparu.

## 3. Remplacer les jetons renommés ou supprimés encore utilisés

Tant qu'un jeton supprimé ou renommé est cité dans le dépôt (nom complet ou construit), `appliquer` refuse d'écrire.
Partir des emplacements listés dans le rapport.

- **Renommé** : remplacer l'ancien nom par le nouveau à chaque emplacement « encore utilisé ». Pour un remplacement
  global dans VS Code (Rechercher dans les fichiers, expression régulière `--amf-background-surface-subtle(?![\w-])`,
  remplacer par `--amf-background-surface-muted`), mettre dans « fichiers à exclure » :
  `figma/**, scripts/figma/**, docs/suivi-figma*.md, **/*.generated.ts, **/amf-tokens.css`. Ne jamais modifier `figma/instantane.json` à
  la main : c'est la référence de la comparaison.
- **Nom construit par morceaux** : remplacer la fin du nom dans la liste du fichier (`'surface-subtle'` devient
  `'surface-muted'`), et regarder dans le même fichier si une expression régulière cite aussi l'ancien nom.
- **Supprimé** : choisir le jeton de remplacement d'après le journal du Figma. S'il n'a pas d'équivalent et qu'il faut
  le garder, le redéfinir dans `tokens/amf-theme.css` sous un nom hors des jetons générés, par exemple
  `--amf-local-background-surface-subtle` (en clair et, s'il le faut, dans les surcharges sombres), remplacer ses
  usages par ce nom, et noter l'écart dans `docs/conformite-journal-figma.md`. S'il apparaît aussi comme nom construit :
  dans `scripts/audit-contrastes.mjs`, citer le jeton local par son nom complet pour garder ses paires de contraste ;
  dans `couleurs.ts` (page des jetons du Figma), le retirer de la liste.

Les surcharges du mode sombre (`tokens/amf-theme.css`) et `scripts/audit-contrastes.mjs` font partie des fichiers à
corriger. Relancer `comparer` : les mentions **encore utilisé** et **nom construit** doivent avoir disparu, et le
rapport est remplacé par cette version à jour.

## 4. Appliquer

```bash
npm run figma:appliquer -- "figma/sources/AMF Design System [v2.1].fig"
```

Dans l'ordre :

1. le rapport est réécrit (il remplace celui de l'étape 3) ;
2. si un jeton supprimé ou renommé est encore utilisé, la commande s'arrête sans rien écrire d'autre (voir plus bas) ;
3. `projects/n3ga2-ds-audit/tokens/amf-tokens.css` est régénéré (ne jamais le modifier à la main) ;
4. `figma/instantane.json` est remplacé : la nouvelle version devient la référence ;
5. l'audit des contrastes est lancé (le même que `npm run audit:contrastes`, clair et sombre). Il réécrit
   `projects/showcase/src/app/audit/contrastes.generated.ts`, lu par la vitrine. Il échoue si des paires passent sous
   les seuils WCAG, si un fond atténué est trop clair en mode sombre, ou si un jeton cité par l'audit n'existe plus.
   En cas d'échec, `amf-tokens.css`, `figma/instantane.json` et `contrastes.generated.ts` sont remis dans leur état
   précédent (le rapport reste) ;
6. la console rappelle ce qui reste à faire à la main (composants, journal).

Refus quand un jeton est encore utilisé :

```
1 jeton(s) supprimé(s) ou renommé(s) encore utilisé(s) :
  --amf-background-surface-subtle : projects/n3ga2-ds-audit/tokens/amf-material.css:265, …

Rien n’a été écrit (amf-tokens.css et instantané inchangés) : remplacer ces jetons, ou relancer avec --force.
```

Échec de l'audit :

```
Audit des contrastes en échec : amf-tokens.css, l’instantané et le résultat de l’audit sont remis dans leur état
précédent (le rapport reste). Corriger, puis relancer appliquer ; --force garde la nouvelle version malgré l’audit.
```

- Échec en mode sombre : corriger les surcharges de `tokens/amf-theme.css`, puis relancer `appliquer`.
- Échec en mode clair : les couleurs viennent du Figma et ne se corrigent pas dans `amf-tokens.css`. Le signaler à
  l'équipe design, puis, si l'on adopte quand même la version, relancer avec `--force` et noter l'écart dans la
  conformité. Tant que l'écart existe, `npm run build` reste bloqué par son audit (c'est voulu) ; pour construire la
  vitrine en attendant la correction du Figma : `node scripts/exemples.mjs && npx ng build showcase`.

`--force` passe outre les deux contrôles : il écrit malgré des jetons encore utilisés (le CSS citerait alors des jetons
qui n'existent plus, à corriger dans le même commit) et garde la nouvelle version malgré un audit en échec (la commande
réussit alors, avec un avertissement).

Un mode de variables autre que Default et Rounded (un futur mode Dark, par exemple) est signalé par « Mode(s) non
générés dans le CSS » : ses valeurs sont dans le rapport et dans la référence, mais le CSS n'en tient pas compte. Le
reporter à la main dans `amf-theme.css` en attendant que le générateur le prenne en charge.

Une fois `appliquer` passé, `comparer` sur le même .fig répond « 0 différence(s) » : ce qui reste à faire est dans le
rapport déjà écrit.

## 5. Reporter les composants et le journal à la main

Ce que l'outil ne fait pas : le CSS des composants et les exemples de la vitrine sont écrits à la main d'après les pages
du Figma.

Pour chaque composant du rapport :

1. ouvrir sa page dans la vitrine (`npm start`, puis `http://localhost:4200/#/composants/<id>`, `id` donné par le
   rapport) et la page du Figma ;
2. retrouver ses règles dans `projects/n3ga2-ds-audit/tokens/amf-*.css` (rechercher la classe `gui-…` ou le
   composant Material) et les mettre à jour, en jetons `var(--amf-…)` plutôt qu'en valeurs ;
3. mettre à jour l'exemple dans `projects/showcase/src/app/exemples/<id>/` si le changement est visible (nouvelle
   variante, nouvelle propriété), puis `npm run exemples` (réécrit `catalogue.generated.ts`) ;
4. si le composant est nouveau : créer ses exemples (section « Ajouter un exemple à la vitrine » du README) et ajouter
   une entrée dans `projects/showcase/src/app/pages/pages.ts` avec `id` (chemin de la page), `titre`, `famille`,
   `figma` et `resume` ; le champ `figma` doit contenir le nom du composant ou de sa page Figma (sans 🆕), c'est lui qui
   permet aux rapports suivants d'afficher « vitrine : `id` ».

Pour le journal : ajouter ou modifier les lignes de `projects/showcase/src/app/pages/conformite-donnees.ts` (statut
conforme, adapté, écart ou hors lot) et mettre à jour les totaux et les listes de `docs/conformite-journal-figma.md`.

## 6. Vérifier

```bash
npx ng test n3ga2-ds-audit --watch=false && npx ng test showcase --watch=false
npm run test:figma                 # tests de l'outil (voir la dernière section)
npm run build                      # exemples + contrastes + vitrine dans dist/showcase
```

Puis, dans un second terminal, servir la vitrine construite et lancer axe-core (la première fois :
`npx playwright install chromium`) :

```bash
npx http-server dist/showcase/browser -p 4321     # second terminal, laisser tourner
npm run audit:axe                                 # premier terminal : 0 violation attendue
```

`audit:axe` réécrit `projects/showcase/public/audit/axe.json`, affiché par la page Mode sombre. Relire enfin dans la
vitrine les pages des composants changés, en clair et en sombre, et la page Mode sombre (ses surcharges ne viennent pas
du Figma).

## 7. Committer

Tout ce que `git status` montre appartient à la mise à jour : le nouveau .fig dans `figma/sources/`, `amf-tokens.css`,
`figma/instantane.json`, le rapport
`figma/rapports/<date>.md`, les fichiers corrigés à l'étape 3 (`.css`, `.ts`, `scripts/audit-contrastes.mjs`), les CSS
et exemples de l'étape 5, la conformité, et les fichiers régénérés (`contrastes.generated.ts`,
`catalogue.generated.ts`, `axe.json`).

Mettre aussi à jour les mentions de la version du Figma (« v2.0 ») : début du README, page d'accueil
(`projects/showcase/src/app/pages/accueil.ts`), en-têtes de `conformite-donnees.ts` et de
`docs/conformite-journal-figma.md`, et ce guide. Les commandes sans argument (`npm run jetons`,
`node scripts/amf-figma.mjs instantane`) suivent toutes seules : elles lisent le .fig nommé dans `figma/instantane.json`,
cherché dans `figma/sources/` puis dans le dossier parent du dépôt, et s'arrêtent avec « … introuvable » s'il n'y est pas (jamais de retour silencieux à une
version plus ancienne). Garder aussi le .fig v2.0 dans `figma/sources/` : l'essai de bout en bout de `npm run test:figma` en dépend.

Monter la version du paquet si la charte change pour les applications : `package.json`,
`projects/n3ga2-ds-audit/package.json`, les premières lignes de `package-lock.json`, l'en-tête de `accueil.ts`, de
`conformite-donnees.ts` et de `docs/conformite-journal-figma.md`.

## Annuler

Avant le commit, avec un dépôt qui était propre au départ :

```bash
git restore .                  # fichiers suivis : amf-tokens.css, instantané, CSS, générés…
git clean -fd figma/rapports   # rapports pas encore committés
```

Pour n'annuler que ce qu'a écrit `appliquer` :
`git restore projects/n3ga2-ds-audit/tokens/amf-tokens.css figma/instantane.json projects/showcase/src/app/audit/contrastes.generated.ts`.

## Autres usages

- **Comparer deux instantanés** : `node scripts/amf-figma.mjs comparer nouvelle.json --reference ancienne.json` (un
  instantané `.json` est accepté par `comparer`, pas par `appliquer` ; la commande du « À faire » renvoie alors au .fig
  de cette version).
- **Réécrire la référence sans rien comparer** : `node scripts/amf-figma.mjs instantane "<fichier.fig>"`. À n'utiliser
  que pour adopter une version sans passer par `appliquer` (le CSS n'est alors pas régénéré) ou pour reconstruire une
  référence perdue ou d'un ancien format.
- **Régénérer seulement les jetons** : `npm run jetons -- "<fichier.fig>"` (aucun contrôle : préférer `appliquer`).
- **Aide de la commande** : `node scripts/amf-figma.mjs --aide`.

## Limites

- Les instances ne sont pas dépliées : si un composant de base change (par exemple Icon), seul ce composant est listé,
  pas tous ceux qui l'utilisent.
- Le renommage d'un jeton n'est reconnu que s'il garde sa valeur, avec un seul candidat.
- La recherche des noms construits par morceaux est approchée (voir l'étape 2).
- Les noms de collections sont attendus tels quels : « AMF Primitives », « AMF Semantic », « AMF Dimensions ». Si
  Figma les renomme, la lecture échoue avec « collection … absente du fichier » ; adapter la liste `COLLECTIONS` de
  `scripts/figma/jetons.mjs`.
- Le format .fig n'est pas documenté par Figma. Le schéma de décodage est lu dans le fichier lui-même, ce qui rend la
  lecture tolérante aux évolutions, sans garantie.

## En cas d'erreur

Les messages de l'outil commencent par `amf-figma :`.

| Message                                                                  | Cause et remède                                                                                                           |
| ------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------- |
| `argument en trop : Design`                                              | Chemin du .fig sans guillemets : `"figma/sources/AMF Design System [v2.1].fig"`.                                          |
| `… introuvable`                                                          | Chemin du .fig faux, ou .fig de la référence absent de `figma/sources/` (commandes sans argument).                        |
| `… figma/instantane.json absent`                                         | Référence manquante : la reconstruire avec `instantane` sur le .fig de la version de référence.                           |
| `instantané au format 1, 2 attendu`                                      | Référence produite par une version plus ancienne de l'outil : la reconstruire avec `instantane` sur le .fig de référence. |
| `pas une archive zip (.fig attendu)` ou `canvas.fig absent ou inattendu` | Fichier qui n'est pas un export .fig de Figma (lien, PDF, .fig corrompu).                                                 |
| `collection « … » absente du fichier`                                    | Collection de variables renommée dans Figma (voir Limites).                                                               |
| `zstdDecompressSync is not a function`                                   | Node trop ancien : installer Node 22.15 ou plus récent.                                                                   |
| `appliquer demande un fichier .fig`                                      | `appliquer` a reçu un instantané `.json`.                                                                                 |
| `Unknown option '--…'`                                                   | Faute de frappe dans une option (message de Node, en anglais) : la commande affiche l'aide et sort en code 2.             |

## Tests de l'outil

`npm run test:figma` : comparaisons sur des instantanés construits à la main, contrôles de la ligne de commande, et un
essai de bout en bout qui modifie le .fig de référence (couleur, renommage d'un jeton que le dépôt utilise, rayon, page
renommée, journal) puis lance `comparer` et `appliquer` dans un dossier temporaire (le dépôt n'est pas modifié). L'essai de bout en bout lit
`figma/sources/AMF Design System [v2.0].fig` (à défaut, le même nom dans le dossier parent), ou le fichier donné par la variable `AMF_FIG` ; sans lui, il est sauté. Il est écrit
pour le contenu de la v2.0 (page « Task Card 🆕 », couleur de Blue/500, rayons de Task Card) : `AMF_FIG` doit désigner
la v2.0, pas la nouvelle version.
