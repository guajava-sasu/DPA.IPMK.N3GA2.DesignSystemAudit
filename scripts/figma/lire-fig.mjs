// Lecture d'un export Figma (.fig) sans dépendance : Node ≥ 22.15 (zstd natif).
// Le .fig est un zip qui contient canvas.fig, document Figma au format binaire Kiwi (schéma embarqué) ; le format
// n'est pas documenté par Figma, le schéma lu dans le fichier rend le décodage tolérant aux évolutions.

import { readFileSync } from 'node:fs';
import zlib from 'node:zlib';

// ── Zip ──────────────────────────────────────────────────────────────────────
function lireZip(buf, chemin) {
  let fin = buf.length - 22;
  while (fin >= 0 && buf.readUInt32LE(fin) !== 0x06054b50) fin--;
  if (fin < 0) throw new Error(`${chemin} : pas une archive zip (.fig attendu)`);
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

/** Décodage complet : schéma Kiwi, en-tête et message (utilisé aussi par les tests pour réécrire un .fig). */
export function ouvrirFig(chemin) {
  const zip = lireZip(readFileSync(chemin), chemin);
  const canvas = zip.get('canvas.fig')?.();
  if (!canvas || canvas.toString('latin1', 0, 8) !== 'fig-kiwi')
    throw new Error(`${chemin} : canvas.fig absent ou inattendu (export .fig de Figma attendu)`);
  const blocs = [];
  for (let p = 12; p < canvas.length;) {
    const n = canvas.readUInt32LE(p);
    blocs.push(canvas.subarray(p + 4, p + 4 + n));
    p += 4 + n;
  }
  const ouvrir = (b) =>
    b.readUInt32LE(0) === 0xfd2fb528 ? zlib.zstdDecompressSync(b) : zlib.inflateRawSync(b);
  const meta = zip.has('meta.json') ? JSON.parse(zip.get('meta.json')().toString('utf8')) : {};
  const defs = lireSchema(ouvrir(blocs[0]));
  return {
    meta,
    defs,
    entete: canvas.subarray(0, 12),
    schemaCompresse: blocs[0],
    message: decoder(defs, ouvrir(blocs[1])),
  };
}

export function lireFig(chemin) {
  const { meta, message } = ouvrirFig(chemin);
  return { meta, message };
}
