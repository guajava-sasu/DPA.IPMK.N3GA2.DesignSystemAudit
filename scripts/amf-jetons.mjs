#!/usr/bin/env node
// Génère projects/amf-design-system/tokens/amf-tokens.css depuis le Figma du design system AMF.
//
//   node scripts/amf-jetons.mjs [chemin/vers/AMF Design System.fig] [--dtcg sortie.json]
//
// Sans argument, lit « ../AMF Design System [v2.0].fig » (dossier parent du dépôt).
// Aucune dépendance : Node ≥ 22.15 (zstd natif). Le .fig est un zip qui contient canvas.fig, document Figma au
// format binaire Kiwi (schéma embarqué) ; le format n'est pas documenté par Figma, le schéma lu dans le fichier
// rend le décodage tolérant aux évolutions.
//
// Ce qui est généré (préfixe --amf-) :
//   - les primitives de couleur (collection « AMF Primitives ») ;
//   - les jetons sémantiques (« AMF Semantic »), écrits en var() vers les primitives, comme dans Figma ;
//   - les dimensions (« AMF Dimensions ») en px, mode Default sur :root, mode Rounded sous .amf-rounded ;
//   - les styles de texte (taille, interligne, graisse, approche) et les ombres « Dropshadow ».
// Fichier généré : ne pas le modifier à la main, relancer ce script.

import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import zlib from 'node:zlib';

const racine = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const iDtcg = args.indexOf('--dtcg');
const sortieDtcg = iDtcg >= 0 ? args.splice(iDtcg, 2)[1] : null;
const source = resolve(args[0] ?? resolve(racine, '..', 'AMF Design System [v2.0].fig'));
const sortieCss = resolve(racine, 'projects/amf-design-system/tokens/amf-tokens.css');

// ── Zip ──────────────────────────────────────────────────────────────────────
function lireZip(buf) {
  let fin = buf.length - 22;
  while (fin >= 0 && buf.readUInt32LE(fin) !== 0x06054b50) fin--;
  if (fin < 0) throw new Error(`${source} : pas une archive zip (.fig attendu)`);
  const nb = buf.readUInt16LE(fin + 10);
  let p = buf.readUInt32LE(fin + 16);
  const entrees = new Map();
  for (let i = 0; i < nb; i++) {
    const methode = buf.readUInt16LE(p + 10);
    const taille = buf.readUInt32LE(p + 20);
    const lnom = buf.readUInt16LE(p + 28),
      lext = buf.readUInt16LE(p + 30),
      lcom = buf.readUInt16LE(p + 32);
    const local = buf.readUInt32LE(p + 42);
    const nom = buf.toString('utf8', p + 46, p + 46 + lnom);
    const debut = local + 30 + buf.readUInt16LE(local + 26) + buf.readUInt16LE(local + 28);
    const brut = buf.subarray(debut, debut + taille);
    entrees.set(nom, () => (methode === 0 ? brut : zlib.inflateRawSync(brut)));
    p += 46 + lnom + lext + lcom;
  }
  return entrees;
}

// ── Kiwi ─────────────────────────────────────────────────────────────────────
class Lecteur {
  constructor(b) {
    this.b = b;
    this.p = 0;
  }
  octet() {
    return this.b[this.p++];
  }
  vu() {
    let r = 0,
      d = 0,
      c;
    do {
      c = this.b[this.p++];
      r += (c & 127) * 2 ** d;
      d += 7;
    } while (c & 128 && d < 35);
    return r;
  }
  vu64() {
    let r = 0n,
      d = 0n,
      c;
    do {
      c = this.b[this.p++];
      r |= BigInt(c & 127) << d;
      d += 7n;
    } while (c & 128 && d < 70n);
    return r;
  }
  vi() {
    const v = this.vu();
    return v % 2 ? -(v + 1) / 2 : v / 2;
  }
  flottant() {
    if (this.b[this.p] === 0) {
      this.p++;
      return 0;
    }
    let bits = this.b.readUInt32LE(this.p);
    this.p += 4;
    bits = ((bits << 23) | (bits >>> 9)) >>> 0;
    const t = Buffer.alloc(4);
    t.writeUInt32LE(bits);
    return t.readFloatLE(0);
  }
  chaine() {
    const f = this.b.indexOf(0, this.p);
    const s = this.b.toString('utf8', this.p, f);
    this.p = f + 1;
    return s;
  }
}

function lireSchema(b) {
  const l = new Lecteur(b),
    defs = [];
  for (let n = l.vu(); n > 0; n--) {
    const nom = l.chaine(),
      genre = l.octet(),
      champs = [];
    for (let k = l.vu(); k > 0; k--)
      champs.push({ nom: l.chaine(), type: l.vi(), tableau: l.octet(), valeur: l.vu() });
    defs.push({ nom, genre, champs, parId: new Map(champs.map((c) => [c.valeur, c])) });
  }
  return defs;
}

function decoder(defs, b) {
  const l = new Lecteur(b);
  const valeur = (t) => {
    switch (t) {
      case -1:
        return !!l.octet();
      case -2:
        return l.octet();
      case -3:
        return l.vi();
      case -4:
        return l.vu();
      case -5:
        return l.flottant();
      case -6:
        return l.chaine();
      case -7: {
        const v = l.vu64();
        return v & 1n ? -((v + 1n) >> 1n) : v >> 1n;
      }
      case -8:
        return l.vu64();
      default:
        return objet(defs[t]);
    }
  };
  const lire = (c) =>
    c.tableau ? Array.from({ length: l.vu() }, () => valeur(c.type)) : valeur(c.type);
  function objet(d) {
    if (d.genre === 0) {
      const v = l.vu();
      return d.parId.get(v)?.nom ?? v;
    }
    const o = {};
    if (d.genre === 1) {
      for (const c of d.champs) o[c.nom] = lire(c);
      return o;
    }
    for (let id = l.vu(); id !== 0; id = l.vu()) {
      const c = d.parId.get(id);
      o[c.nom] = lire(c);
    }
    return o;
  }
  return objet(defs.find((d) => d.nom === 'Message'));
}

function lireFig(chemin) {
  const zip = lireZip(readFileSync(chemin));
  const canvas = zip.get('canvas.fig')?.();
  if (!canvas || canvas.toString('latin1', 0, 8) !== 'fig-kiwi')
    throw new Error('canvas.fig absent ou inattendu');
  const blocs = [];
  for (let p = 12; p < canvas.length;) {
    const n = canvas.readUInt32LE(p);
    blocs.push(canvas.subarray(p + 4, p + 4 + n));
    p += 4 + n;
  }
  const ouvrir = (b) =>
    b.readUInt32LE(0) === 0xfd2fb528 ? zlib.zstdDecompressSync(b) : zlib.inflateRawSync(b);
  const meta = zip.has('meta.json') ? JSON.parse(zip.get('meta.json')().toString('utf8')) : {};
  return { meta, message: decoder(lireSchema(ouvrir(blocs[0])), ouvrir(blocs[1])) };
}

// ── Extraction ───────────────────────────────────────────────────────────────
const { meta, message } = lireFig(source);
const noeuds = message.nodeChanges;
const gid = (g) => `${g.sessionID}:${g.localID}`;
const actif = (n) => !n.isSoftDeleted;
const COLLECTIONS = ['AMF Primitives', 'AMF Semantic', 'AMF Dimensions'];

const jeux = new Map(
  noeuds.filter((n) => n.type === 'VARIABLE_SET' && actif(n)).map((n) => [gid(n.guid), n]),
);
const variables = noeuds.filter((n) => n.type === 'VARIABLE' && actif(n) && n.variableSetID?.guid);
const parId = new Map(variables.map((v) => [gid(v.guid), v]));
const slug = (nom) =>
  nom
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
const css = (nom) => `--amf-${slug(nom)}`;
const hexa = (c) => {
  const h = (x) =>
    Math.round(x * 255)
      .toString(16)
      .padStart(2, '0');
  return `#${h(c.r)}${h(c.g)}${h(c.b)}${c.a < 0.999 ? h(c.a) : ''}`;
};
const nombre = (x) => +x.toFixed(3);

function valeurCss(donnee, type) {
  const v = donnee?.value ?? {};
  if (v.alias) {
    const cible = v.alias.guid && parId.get(gid(v.alias.guid));
    if (!cible) throw new Error(`alias non résolu : ${JSON.stringify(v.alias)}`);
    return { css: `var(${css(cible.name)})`, dtcg: `{${cible.name.replaceAll('/', '.')}}` };
  }
  if (v.colorValue) {
    const h = hexa(v.colorValue);
    return { css: h, dtcg: h };
  }
  if (v.floatValue !== undefined) {
    const px = `${nombre(v.floatValue)}px`;
    return { css: type === 'FLOAT' ? px : String(v.floatValue), dtcg: px };
  }
  throw new Error(`valeur non gérée : ${JSON.stringify(v)}`);
}

const blocs = { root: [], rounded: [] };
const dtcg = { $description: `Généré par scripts/amf-jetons.mjs depuis « ${basename(source)} »` };
const ajouterDtcg = (nom, feuille) => {
  const p = nom.split('/');
  let d = dtcg;
  for (const k of p.slice(0, -1)) d = d[k] ??= {};
  d[p.at(-1)] = feuille;
};

for (const nomCollection of COLLECTIONS) {
  const jeu = [...jeux.values()].find((j) => j.name === nomCollection);
  if (!jeu) throw new Error(`collection « ${nomCollection} » absente du fichier`);
  const modes = new Map(jeu.variableSetModes.map((m) => [gid(m.id), m.name]));
  const vars = variables
    .filter((v) => gid(v.variableSetID.guid) === gid(jeu.guid))
    .sort((a, b) =>
      a.sortPosition < b.sortPosition ? -1 : a.sortPosition > b.sortPosition ? 1 : 0,
    );
  blocs.root.push(`\n  /* ${nomCollection} (${vars.length}) */`);
  for (const v of vars) {
    const parMode = new Map(
      v.variableDataValues.entries.map((e) => [
        modes.get(gid(e.modeID)),
        valeurCss(e.variableData, v.variableResolvedType),
      ]),
    );
    const [premier] = parMode.values();
    const defaut = parMode.get('Default') ?? parMode.get('Value') ?? premier;
    blocs.root.push(`  ${css(v.name)}: ${defaut.css};`);
    const arrondi = parMode.get('Rounded');
    if (arrondi && arrondi.css !== defaut.css)
      blocs.rounded.push(`  ${css(v.name)}: ${arrondi.css};`);
    ajouterDtcg(v.name, {
      $type: v.variableResolvedType === 'COLOR' ? 'color' : 'dimension',
      $value: defaut.dtcg,
    });
  }
}

// Styles de texte (hors styles hérités v-text / v-icon) et ombres
const graisse = {
  Thin: 100,
  Light: 300,
  Regular: 400,
  Italic: 400,
  Medium: 500,
  SemiBold: 600,
  Bold: 700,
  Black: 900,
};
const textes = new Map();
for (const n of noeuds) {
  if (n.styleType !== 'TEXT' || !actif(n) || /^v-/.test(n.name) || textes.has(slug(n.name)))
    continue;
  textes.set(slug(n.name), n);
}
blocs.root.push(`\n  /* Styles de texte (${textes.size}) */`);
for (const [s, n] of textes) {
  const lh = n.lineHeight ?? {},
    ls = n.letterSpacing ?? {};
  blocs.root.push(
    `  --amf-text-${s}-family: '${n.fontName.family}';`,
    `  --amf-text-${s}-size: ${nombre(n.fontSize)}px;`,
    `  --amf-text-${s}-line-height: ${lh.units === 'PIXELS' ? `${nombre(lh.value)}px` : lh.units === 'PERCENT' ? `${nombre(lh.value)}%` : 'normal'};`,
    `  --amf-text-${s}-weight: ${graisse[n.fontName.style] ?? 400};`,
    `  --amf-text-${s}-letter-spacing: ${ls.units === 'PIXELS' ? `${nombre(ls.value)}px` : `${nombre((ls.value ?? 0) / 100)}em`};`,
    ...(n.textCase === 'UPPER' ? [`  --amf-text-${s}-transform: uppercase;`] : []),
  );
}
const ombres = new Map();
for (const n of noeuds) {
  const m = /^Dropshadow - (Lv\d)$/.exec(n.name ?? '');
  if (n.styleType !== 'EFFECT' || !actif(n) || !m || ombres.has(m[1])) continue;
  ombres.set(
    m[1],
    n.effects
      .filter((e) => e.type === 'DROP_SHADOW')
      .map(
        (e) =>
          `${nombre(e.offset.x)}px ${nombre(e.offset.y)}px ${nombre(e.radius)}px ${nombre(e.spread ?? 0)}px ${hexa(e.color)}`,
      )
      .join(', '),
  );
}
blocs.root.push(`\n  /* Élévation (${ombres.size}) */`);
for (const [niveau, valeur] of [...ombres].sort())
  blocs.root.push(`  --amf-shadow-${niveau.toLowerCase()}: ${valeur};`);

const entete = `/*
 * Jetons du design system AMF, GÉNÉRÉS : ne pas modifier à la main.
 *   Source : ${basename(source)} (export Figma du ${meta.exported_at ?? 'inconnu'})
 *   Commande : node scripts/amf-jetons.mjs
 * Mode Default des dimensions sur :root ; mode Rounded (boutons en pilule) sous .amf-rounded.
 */
`;
writeFileSync(
  sortieCss,
  `${entete}:root {${blocs.root.join('\n')}\n}\n\n.amf-rounded {\n${blocs.rounded.join('\n')}\n}\n`,
);
if (sortieDtcg) writeFileSync(resolve(sortieDtcg), `${JSON.stringify(dtcg, null, 2)}\n`);
console.log(`${sortieCss} : ${blocs.root.filter((l) => l.startsWith('  --')).length} jetons`);
