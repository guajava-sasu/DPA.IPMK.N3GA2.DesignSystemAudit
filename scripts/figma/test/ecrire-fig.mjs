// Réécriture d'un .fig à partir d'un message modifié (tests uniquement) : encodeur Kiwi inverse de lire-fig.mjs,
// message compressé en deflate brut, archive zip sans compression.

import { writeFileSync } from 'node:fs';
import zlib from 'node:zlib';

class Ecrivain {
  constructor() {
    this.b = Buffer.alloc(1 << 20);
    this.p = 0;
  }
  place(n) {
    if (this.p + n <= this.b.length) return;
    let t = this.b.length * 2;
    while (t < this.p + n) t *= 2;
    const nb = Buffer.alloc(t);
    this.b.copy(nb, 0, 0, this.p);
    this.b = nb;
  }
  octet(v) {
    this.place(1);
    this.b[this.p++] = v & 255;
  }
  vu(v) {
    do {
      let c = v % 128;
      v = Math.floor(v / 128);
      if (v) c |= 128;
      this.octet(c);
    } while (v);
  }
  vu64(v) {
    let x = BigInt(v);
    do {
      let c = Number(x & 127n);
      x >>= 7n;
      if (x) c |= 128;
      this.octet(c);
    } while (x);
  }
  vi(v) {
    this.vu(v < 0 ? -2 * v - 1 : 2 * v);
  }
  flottant(f) {
    if (f === 0) return this.octet(0);
    const t = Buffer.alloc(4);
    t.writeFloatLE(f);
    const bits = t.readUInt32LE(0);
    this.place(4);
    this.b.writeUInt32LE(((bits << 9) | (bits >>> 23)) >>> 0, this.p);
    this.p += 4;
  }
  chaine(s) {
    const n = Buffer.byteLength(s, 'utf8');
    this.place(n + 1);
    this.b.write(s, this.p, 'utf8');
    this.p += n;
    this.b[this.p++] = 0;
  }
  resultat() {
    return this.b.subarray(0, this.p);
  }
}

export function encoder(defs, message) {
  const e = new Ecrivain();
  const valeur = (t, v) => {
    switch (t) {
      case -1:
        return e.octet(v ? 1 : 0);
      case -2:
        return e.octet(v);
      case -3:
        return e.vi(v);
      case -4:
        return e.vu(v);
      case -5:
        return e.flottant(v);
      case -6:
        return e.chaine(v);
      case -7: {
        const x = BigInt(v);
        return e.vu64(x < 0n ? -2n * x - 1n : 2n * x);
      }
      case -8:
        return e.vu64(v);
      default:
        return objet(defs[t], v);
    }
  };
  const ecrire = (c, v) => {
    if (c.tableau) {
      e.vu(v.length);
      for (const x of v) valeur(c.type, x);
    } else valeur(c.type, v);
  };
  function objet(d, o) {
    if (d.genre === 0) {
      const c = d.champs.find((x) => x.nom === o);
      return e.vu(c ? c.valeur : o);
    }
    if (d.genre === 1) {
      for (const c of d.champs) ecrire(c, o[c.nom]);
      return;
    }
    for (const c of d.champs) {
      if (o[c.nom] === undefined) continue;
      e.vu(c.valeur);
      ecrire(c, o[c.nom]);
    }
    e.vu(0);
  }
  objet(
    defs.find((d) => d.nom === 'Message'),
    message,
  );
  return e.resultat();
}

function zip(entrees) {
  const locaux = [],
    centraux = [];
  let decalage = 0;
  for (const [nom, donnees] of entrees) {
    const n = Buffer.from(nom, 'utf8');
    const crc = zlib.crc32(donnees);
    const l = Buffer.alloc(30);
    l.writeUInt32LE(0x04034b50, 0);
    l.writeUInt16LE(20, 4);
    l.writeUInt32LE(crc, 14);
    l.writeUInt32LE(donnees.length, 18);
    l.writeUInt32LE(donnees.length, 22);
    l.writeUInt16LE(n.length, 26);
    const c = Buffer.alloc(46);
    c.writeUInt32LE(0x02014b50, 0);
    c.writeUInt16LE(20, 4);
    c.writeUInt16LE(20, 6);
    c.writeUInt32LE(crc, 16);
    c.writeUInt32LE(donnees.length, 20);
    c.writeUInt32LE(donnees.length, 24);
    c.writeUInt16LE(n.length, 28);
    c.writeUInt32LE(decalage, 42);
    locaux.push(l, n, donnees);
    centraux.push(c, n);
    decalage += 30 + n.length + donnees.length;
  }
  const central = Buffer.concat(centraux);
  const fin = Buffer.alloc(22);
  fin.writeUInt32LE(0x06054b50, 0);
  fin.writeUInt16LE(entrees.length, 8);
  fin.writeUInt16LE(entrees.length, 10);
  fin.writeUInt32LE(central.length, 12);
  fin.writeUInt32LE(decalage, 16);
  return Buffer.concat([...locaux, central, fin]);
}

/** Écrit un .fig : fig = résultat de ouvrirFig(), message éventuellement modifié. */
export function ecrireFig(chemin, fig) {
  const msg = zlib.deflateRawSync(encoder(fig.defs, fig.message));
  const taille = (b) => {
    const t = Buffer.alloc(4);
    t.writeUInt32LE(b.length);
    return t;
  };
  const canvas = Buffer.concat([
    fig.entete,
    taille(fig.schemaCompresse),
    fig.schemaCompresse,
    taille(msg),
    msg,
  ]);
  writeFileSync(
    chemin,
    zip([
      ['canvas.fig', canvas],
      ['meta.json', Buffer.from(JSON.stringify(fig.meta))],
    ]),
  );
}
