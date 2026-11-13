# Outils d'analyse du Figma (Python)

Scripts d'exploration écrits pendant la construction du design system à partir du Figma v2.0 : ils servent à lire un
composant calque par calque avant d'écrire son CSS. Le suivi des versions et la génération des jetons ne passent pas
par eux, mais par `scripts/amf-figma.mjs` et `scripts/amf-jetons.mjs` (voir [docs/suivi-figma.md](../../docs/suivi-figma.md)).

Prérequis : Python 3 et `pip install zstandard`.

```bash
cd outils/analyse-figma
unzip -p "../../figma/sources/AMF Design System [v2.0].fig" canvas.fig > /tmp/canvas.fig
python3 kiwi.py /tmp/canvas.fig /tmp/msg.pkl          # décode le document Figma (une fois par version)

python3 spec.py /tmp/msg.pkl "Task Card" "Blue&Default"  # calques d'un set de variantes (filtre facultatif, & = et)
python3 comps.py /tmp/msg.pkl                          # liste des sets : page, variantes, propriétés
python3 texts.py /tmp/msg.pkl "🛠 MAJ 2026 · Changelog" # textes d'une ou plusieurs pages (nom exact)
python3 vars.py /tmp/msg.pkl /tmp/variables.json       # variables par collection et par mode
python3 dtcg.py /tmp/variables.json /tmp/msg.pkl /tmp/amf-tokens.dtcg.json   # jetons au format DTCG
```

`spec.py` donne pour chaque calque sa taille, sa mise en page, ses couleurs (nom de variable ou valeur), ses styles de
texte et d'ombre : se fier aux styles de texte plutôt qu'aux tailles de police isolées. Les extraits de la v2.0 produits
par ces scripts sont dans `figma/extraits-v2.0/`.
