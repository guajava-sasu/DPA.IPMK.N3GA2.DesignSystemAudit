// Comparaison de deux instantanés du Figma AMF (voir instantane.mjs) et rapport en Markdown.

import { nomCss } from './jetons.mjs';

const valeurJeton = (j) => {
  const autres = [
    ...(j.rounded ? [`Rounded : ${j.rounded}`] : []),
    ...Object.entries(j.modes ?? {}).map(([m, v]) => `${m} : ${v}`),
  ];
  return autres.length ? `${j.defaut} (${autres.join(' ; ')})` : j.defaut;
};

// Clé d'un attribut de calque (« fond … », « marges … ») pour apparier l'avant et l'après
const cleAttribut = (a) =>
  /^\d/.test(a) ? 'taille' : a.startsWith('«') ? 'texte' : a.split(' ')[0];

/**
 * Appariement de deux collections rangées par identifiant : même identifiant d'abord, puis même nom quand il est
 * unique des deux côtés (élément recréé, ou instantané sans identifiants).
 */
function apparier(a, b, nomDe) {
  const paires = [];
  const seulsA = [];
  for (const k of Object.keys(a)) k in b ? paires.push([k, k]) : seulsA.push(k);
  const seulsB = Object.keys(b).filter((k) => !(k in a));
  const parNom = (cles, o) => {
    const m = new Map();
    for (const k of cles) {
      const n = nomDe(o[k], k);
      m.set(n, [...(m.get(n) ?? []), k]);
    }
    return m;
  };
  const na = parNom(seulsA, a),
    nb = parNom(seulsB, b);
  const pris = new Set();
  for (const [n, ka] of na) {
    const kb = nb.get(n);
    if (ka.length === 1 && kb?.length === 1) {
      paires.push([ka[0], kb[0]]);
      pris.add(ka[0]).add(kb[0]);
    }
  }
  return {
    paires,
    seulsA: seulsA.filter((k) => !pris.has(k)),
    seulsB: seulsB.filter((k) => !pris.has(k)),
  };
}

/**
 * Différences d'une variante, calque par calque et attribut par attribut. Un attribut qui ne change que par le
 * renommage d'un jeton (variables écrites [Nom] dans l'instantané) n'est pas compté : il est signalé dans la
 * section Jetons.
 */
function diffVariante(va, vb, renommes) {
  const carte = (v) => {
    const m = { '(racine)': { chemin: '(racine)', d: v.racine } };
    const calques = Array.isArray(v.calques)
      ? Object.fromEntries(v.calques.map((x) => [x.slice(0, x.indexOf(' : ')), x]))
      : v.calques;
    for (const [id, x] of Object.entries(calques))
      m[id] = { chemin: x.slice(0, x.indexOf(' : ')), d: x.slice(x.indexOf(' : ') + 3) };
    return m;
  };
  const a = carte(va),
    b = carte(vb);
  const variables = (x) => x.replace(/\[([^\]]+)\]/g, (_, n) => `[${nomCss(n)}]`);
  const dueAuRenommage = (x, y) =>
    variables(x).replace(/\[(--[\w-]+)\]/g, (m, n) =>
      renommes.has(n) ? `[${renommes.get(n)}]` : m,
    ) === variables(y);
  const changes = [];
  let ignores = 0;
  const { paires: couples, seulsA, seulsB } = apparier(a, b, (x) => x.chemin);
  for (const [ka, kb] of couples) {
    const x = a[ka],
      y = b[kb];
    const renomme = x.chemin !== y.chemin ? x.chemin : undefined;
    if (x.d === y.d && !renomme) continue;
    const pa = x.d.split(' ; '),
      pb = y.d.split(' ; ');
    let moins = pa.filter((z) => !pb.includes(z)),
      plus = pb.filter((z) => !pa.includes(z));
    const paires = [];
    for (const z of [...moins]) {
      const w = plus.find((t) => cleAttribut(t) === cleAttribut(z));
      if (w === undefined) continue;
      moins = moins.filter((t) => t !== z);
      plus = plus.filter((t) => t !== w);
      if (dueAuRenommage(z, w)) ignores++;
      else paires.push({ avant: z, apres: w });
    }
    if (paires.length || moins.length || plus.length || renomme)
      changes.push({ chemin: y.chemin, ...(renomme ? { renomme } : {}), paires, moins, plus });
  }
  for (const k of seulsA) changes.push({ chemin: a[k].chemin, retire: a[k].d });
  for (const k of seulsB) changes.push({ chemin: b[k].chemin, ajoute: b[k].d });
  // Même changement sur plusieurs calques : regroupé
  const groupes = new Map();
  for (const c of changes) {
    const { chemin, ...reste } = c;
    const k = JSON.stringify(reste);
    if (!groupes.has(k)) groupes.set(k, { chemins: [], ...reste });
    groupes.get(k).chemins.push(chemin);
  }
  return { changements: [...groupes.values()], ignores };
}

// Jetons ; un jeton supprimé et un ajouté de même valeur, sans ambiguïté, sont un renommage probable. Les valeurs
// var(--amf-x) de la référence sont réécrites avec les renommages trouvés, jusqu'à ce qu'il n'y en ait plus de
// nouveau : un jeton dont seule la cible a été renommée n'est ni modifié ni renommé à tort.
function comparerJetons(ja, jb) {
  const renommes = new Map();
  const normaliser = (v) =>
    v?.replace(/var\((--[\w-]+)\)/g, (m, n) => (renommes.has(n) ? `var(${renommes.get(n)})` : m));
  const brut = (v) => v;
  const cle = (j, norm) =>
    JSON.stringify([
      norm(j.defaut),
      norm(j.rounded ?? ''),
      Object.entries(j.modes ?? {})
        .sort()
        .map(([m, v]) => [m, norm(v)]),
    ]);
  const restants = () => {
    const cibles = new Set(renommes.values());
    return {
      supprimes: Object.keys(ja).filter((k) => !(k in jb) && !renommes.has(k)),
      ajoutes: Object.keys(jb).filter((k) => !(k in ja) && !cibles.has(k)),
    };
  };
  const grouper = (noms, j, norm) => {
    const m = new Map();
    for (const n of noms) {
      const k = cle(j[n], norm);
      m.set(k, [...(m.get(k) ?? []), n]);
    }
    return m;
  };
  for (;;) {
    const { supprimes, ajoutes } = restants();
    const va = grouper(supprimes, ja, normaliser),
      vb = grouper(ajoutes, jb, brut);
    let nouveau = false;
    for (const [v, noms] of va) {
      const cibles = vb.get(v);
      if (noms.length === 1 && cibles?.length === 1) {
        renommes.set(noms[0], cibles[0]);
        nouveau = true;
      }
    }
    if (!nouveau) break;
  }
  const { supprimes, ajoutes } = restants();
  return {
    renommes: [...renommes].map(([de, vers]) => ({ de, vers, valeur: valeurJeton(jb[vers]) })),
    supprimes: supprimes.map((nom) => ({ nom, valeur: valeurJeton(ja[nom]) })),
    ajoutes: ajoutes.map((nom) => ({ nom, valeur: valeurJeton(jb[nom]) })),
    modifies: Object.keys(ja)
      .filter((k) => k in jb && cle(ja[k], normaliser) !== cle(jb[k], brut))
      .map((nom) => ({ nom, avant: valeurJeton(ja[nom]), apres: valeurJeton(jb[nom]) })),
  };
}

const premiereLigne = (t) => t.split('\n')[0].trim();
const lignes = (t) =>
  t
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean);

export function comparer(ref, neuf) {
  const r = {
    sources: { avant: ref.source, apres: neuf.source },
    jetons: comparerJetons(ref.jetons, neuf.jetons),
    pages: { ajoutees: [], supprimees: [], renommees: [] },
    composants: { ajoutes: [], supprimes: [], modifies: [], ignoresParRenommage: 0 },
    journal: { nouvelles: [], retirees: [], modifiees: [] },
  };
  const renommes = new Map(r.jetons.renommes.map((x) => [x.de, x.vers]));

  // Pages, par identifiant (des noms seuls sont aussi acceptés)
  const pagesEnObjet = (l) =>
    Object.fromEntries(l.map((p) => (typeof p === 'string' ? [p, { nom: p }] : [p.id, p])));
  const pa = pagesEnObjet(ref.pages),
    pb = pagesEnObjet(neuf.pages);
  const pp = apparier(pa, pb, (p) => p.nom);
  const nomPage = new Map();
  for (const [ka, kb] of pp.paires) {
    nomPage.set(pa[ka].nom, pb[kb].nom);
    if (pa[ka].nom !== pb[kb].nom) r.pages.renommees.push({ de: pa[ka].nom, vers: pb[kb].nom });
  }
  r.pages.ajoutees = pp.seulsB.map((k) => pb[k].nom);
  r.pages.supprimees = pp.seulsA.map((k) => pa[k].nom);

  // Composants
  const ca = ref.composants,
    cb = neuf.composants;
  const resume = (c, cle) => ({
    cle,
    page: c.page,
    nom: c.nom,
    variantes: Object.keys(c.variantes).length,
  });
  const pc = apparier(ca, cb, (c) => `${c.page} › ${c.nom}`);
  r.composants.ajoutes = pc.seulsB.map((k) => resume(cb[k], k));
  r.composants.supprimes = pc.seulsA.map((k) => resume(ca[k], k));
  const nomV = (v, k) => v.nom ?? k;
  for (const [ka, kb] of pc.paires) {
    const a = ca[ka],
      b = cb[kb];
    const m = {
      cle: kb,
      page: b.page,
      nom: b.nom,
      renommeDe: a.nom !== b.nom ? a.nom : undefined,
      deplaceDe: (nomPage.get(a.page) ?? a.page) !== b.page ? a.page : undefined,
      proprietes: {
        ajoutees: b.proprietes.filter((p) => !a.proprietes.includes(p)),
        supprimees: a.proprietes.filter((p) => !b.proprietes.includes(p)),
      },
      variantesAjoutees: [],
      variantesSupprimees: [],
      variantesRenommees: [],
      changements: [],
    };
    const pv = apparier(a.variantes, b.variantes, nomV);
    m.variantesAjoutees = pv.seulsB.map((k) => nomV(b.variantes[k], k));
    m.variantesSupprimees = pv.seulsA.map((k) => nomV(a.variantes[k], k));
    // Changements identiques sur plusieurs variantes regroupés
    const groupes = new Map();
    for (const [va, vb] of pv.paires) {
      const nomAvant = nomV(a.variantes[va], va),
        nomApres = nomV(b.variantes[vb], vb);
      if (nomAvant !== nomApres) m.variantesRenommees.push({ de: nomAvant, vers: nomApres });
      const d = diffVariante(a.variantes[va], b.variantes[vb], renommes);
      r.composants.ignoresParRenommage += d.ignores;
      if (!d.changements.length) continue;
      const k = JSON.stringify(d.changements);
      if (!groupes.has(k)) groupes.set(k, { variantes: [], calques: d.changements });
      groupes.get(k).variantes.push(nomApres);
    }
    m.changements = [...groupes.values()];
    if (
      m.renommeDe ||
      m.deplaceDe ||
      m.proprietes.ajoutees.length ||
      m.proprietes.supprimees.length ||
      m.variantesAjoutees.length ||
      m.variantesSupprimees.length ||
      m.variantesRenommees.length ||
      m.changements.length
    )
      r.composants.modifies.push(m);
  }

  // Journal : un bloc réécrit (même première ligne) est comparé ligne à ligne
  const nouvelles = neuf.journal.filter((t) => !ref.journal.includes(t));
  let retirees = ref.journal.filter((t) => !neuf.journal.includes(t));
  for (const t of nouvelles) {
    const avant = retirees.find((x) => premiereLigne(x) === premiereLigne(t));
    if (!avant) {
      r.journal.nouvelles.push(t);
      continue;
    }
    retirees = retirees.filter((x) => x !== avant);
    const la = lignes(avant),
      lb = lignes(t);
    r.journal.modifiees.push({
      titre: premiereLigne(t),
      ajoutees: lb.filter((l) => !la.includes(l)),
      retirees: la.filter((l) => !lb.includes(l)),
    });
  }
  r.journal.retirees = retirees;
  return r;
}

export function nombreDeDifferences(r) {
  const j = r.jetons;
  return (
    j.ajoutes.length +
    j.supprimes.length +
    j.modifies.length +
    j.renommes.length +
    r.pages.ajoutees.length +
    r.pages.supprimees.length +
    r.pages.renommees.length +
    r.composants.ajoutes.length +
    r.composants.supprimes.length +
    r.composants.modifies.length +
    r.journal.nouvelles.length +
    r.journal.retirees.length +
    r.journal.modifiees.length
  );
}

const enLigne = (t) => t.replace(/\s*\n\s*/g, ' / ');

/**
 * Rapport Markdown.
 * @param impacts { usagesJetons: Map<nom, string[]> (« fichier:ligne »), usagesConstruits: Map<nom, string[]> (noms
 *   construits par morceaux), pagesVitrine: (nom, page) => string[], commandeAppliquer: string }
 */
export function rapportMarkdown(r, impacts = {}, options = {}) {
  const max = options.maxCalques ?? 15;
  const usages = impacts.usagesJetons ?? new Map();
  const construits = impacts.usagesConstruits ?? new Map();
  const vitrine = impacts.pagesVitrine ?? (() => []);
  const appliquer =
    impacts.commandeAppliquer ?? 'node scripts/amf-figma.mjs appliquer "<fichier.fig>"';
  const o = [];
  const src = (s) => `${s.fichier} (export du ${s.exporte_le ?? 'inconnu'})`;
  o.push(`# Évolutions du Figma AMF`, '');
  o.push(
    `- Référence : ${src(r.sources.avant)}`,
    `- Nouvelle version : ${src(r.sources.apres)}`,
    '',
  );
  const j = r.jetons;
  o.push('## Synthèse', '');
  o.push(
    `| Domaine | Ajouts | Suppressions | Modifications |`,
    `| --- | --- | --- | --- |`,
    `| Jetons | ${j.ajoutes.length} | ${j.supprimes.length} | ${j.modifies.length} (+ ${j.renommes.length} renommages probables) |`,
    `| Pages | ${r.pages.ajoutees.length} | ${r.pages.supprimees.length} | ${r.pages.renommees.length} renommée(s) |`,
    `| Composants | ${r.composants.ajoutes.length} | ${r.composants.supprimes.length} | ${r.composants.modifies.length} |`,
    `| Journal | ${r.journal.nouvelles.length} | ${r.journal.retirees.length} | ${r.journal.modifiees.length} |`,
    '',
  );
  if (!nombreDeDifferences(r)) {
    o.push('Aucune différence.', '');
    return o.join('\n');
  }

  o.push('## À faire', '');
  const afaire = [];
  const casses = [...j.supprimes.map((x) => x.nom), ...j.renommes.map((x) => x.de)].filter(
    (n) => usages.get(n)?.length || construits.get(n)?.length,
  );
  if (casses.length)
    afaire.push(
      `Remplacer ${casses.length} jeton(s) supprimé(s) ou renommé(s) encore utilisé(s) dans le dépôt (détail plus bas) : tant qu'il en reste, \`appliquer\` n'écrit rien (sauf avec \`--force\`).`,
    );
  if (j.ajoutes.length || j.modifies.length || j.supprimes.length || j.renommes.length)
    afaire.push(
      `Régénérer \`amf-tokens.css\` et l'instantané : \`${appliquer}\` (relance l'audit des contrastes). Vérifier ensuite la page Mode sombre : les surcharges sombres de \`amf-theme.css\` ne viennent pas du Figma.`,
    );
  if (r.composants.modifies.length || r.composants.ajoutes.length || r.composants.supprimes.length)
    afaire.push(
      'Reporter à la main les changements de composants dans les fichiers `tokens/amf-*.css` et les exemples de la vitrine, puis lancer les tests et `npm run audit:axe`.',
    );
  if (r.journal.nouvelles.length || r.journal.modifiees.length)
    afaire.push(
      'Lire les entrées nouvelles ou réécrites du journal et compléter `conformite-donnees.ts` et `docs/conformite-journal-figma.md`.',
    );
  afaire.forEach((x, i) => o.push(`${i + 1}. ${x}`));
  o.push('');

  if (j.renommes.length || j.supprimes.length || j.ajoutes.length || j.modifies.length) {
    o.push('## Jetons', '');
    // Tous les usages, regroupés par fichier ; les noms construits par morceaux à part
    const parFichier = (u) => {
      const m = new Map();
      for (const x of u) {
        const i = x.lastIndexOf(':');
        m.set(x.slice(0, i), [...(m.get(x.slice(0, i)) ?? []), x.slice(i + 1)]);
      }
      return [...m].map(([f, l]) => `${f}:${l.join(',')}`).join(' ; ');
    };
    const ligneUsages = (nom) => {
      const u = usages.get(nom) ?? [],
        c = construits.get(nom) ?? [];
      return `${u.length ? ` — **encore utilisé** : ${parFichier(u)}` : ''}${c.length ? ` — **nom construit par morceaux** (à vérifier) : ${parFichier(c)}` : ''}`;
    };
    if (j.renommes.length) {
      o.push('Renommages probables (même valeur) :', '');
      for (const x of j.renommes)
        o.push(`- \`${x.de}\` → \`${x.vers}\` (${x.valeur})${ligneUsages(x.de)}`);
      o.push('');
    }
    if (j.supprimes.length) {
      o.push('Supprimés :', '');
      for (const x of j.supprimes) o.push(`- \`${x.nom}\` (${x.valeur})${ligneUsages(x.nom)}`);
      o.push('');
    }
    if (j.ajoutes.length) {
      o.push('Ajoutés :', '');
      for (const x of j.ajoutes) o.push(`- \`${x.nom}\` : ${x.valeur}`);
      o.push('');
    }
    if (j.modifies.length) {
      o.push('Valeurs modifiées :', '');
      for (const x of j.modifies) o.push(`- \`${x.nom}\` : ${x.avant} → ${x.apres}`);
      o.push('');
    }
  }

  const p = r.pages;
  if (p.ajoutees.length || p.supprimees.length || p.renommees.length) {
    o.push('## Pages', '');
    for (const x of p.renommees) o.push(`- Page renommée : ${x.de} → ${x.vers}`);
    for (const x of p.ajoutees) o.push(`- Nouvelle page : ${x}`);
    for (const x of p.supprimees) o.push(`- Page supprimée : ${x}`);
    o.push('');
  }

  const c = r.composants;
  if (c.ajoutes.length || c.supprimes.length || c.modifies.length) {
    o.push('## Composants', '');
    if (c.ignoresParRenommage)
      o.push(
        `${c.ignoresParRenommage} attribut(s) de calque ne changent que par un jeton renommé : non listés ici.`,
        '',
      );
    const pv = (x) => {
      const ids = vitrine(x.nom, x.page);
      return ids.length ? ` — vitrine : ${ids.map((i) => `\`${i}\``).join(', ')}` : '';
    };
    const liste = (l, n = 12) => `${l.slice(0, n).join(' ; ')}${l.length > n ? '…' : ''}`;
    // Les icônes (centaines de composants isolés) sont résumées
    const icone = (x) => /^Icons? \//.test(x.nom) || /icon/i.test(x.page);
    for (const [titre, l] of [
      ['Nouveaux', c.ajoutes],
      ['Supprimés', c.supprimes],
    ]) {
      if (!l.length) continue;
      const icones = l.filter(icone);
      o.push(`${titre} :`, '');
      for (const x of l.filter((y) => !icone(y)))
        o.push(
          `- ${x.page} › **${x.nom}**${x.variantes > 1 ? ` (${x.variantes} variantes)` : ''}${pv(x)}`,
        );
      if (icones.length)
        o.push(
          `- ${icones.length} icône(s) : ${icones
            .slice(0, 20)
            .map((x) => x.nom.replace(/^Icons? \/ /, ''))
            .join(', ')}${icones.length > 20 ? '…' : ''}`,
        );
      o.push('');
    }
    for (const m of c.modifies) {
      o.push(`### ${m.page} › ${m.nom}${pv(m)}`, '');
      if (m.renommeDe) o.push(`- Renommé, ancien nom : ${m.renommeDe}`);
      if (m.deplaceDe) o.push(`- Déplacé, ancienne page : ${m.deplaceDe}`);
      if (m.proprietes.ajoutees.length)
        o.push(`- Propriétés ajoutées : ${m.proprietes.ajoutees.join(' ; ')}`);
      if (m.proprietes.supprimees.length)
        o.push(`- Propriétés supprimées : ${m.proprietes.supprimees.join(' ; ')}`);
      if (m.variantesRenommees.length)
        o.push(
          `- Variantes renommées (${m.variantesRenommees.length}) : ${liste(m.variantesRenommees.map((x) => `${x.de} → ${x.vers}`))}`,
        );
      if (m.variantesAjoutees.length)
        o.push(
          `- Variantes ajoutées (${m.variantesAjoutees.length}) : ${liste(m.variantesAjoutees)}`,
        );
      if (m.variantesSupprimees.length)
        o.push(
          `- Variantes supprimées (${m.variantesSupprimees.length}) : ${liste(m.variantesSupprimees)}`,
        );
      for (const g of m.changements) {
        const vs = g.variantes.filter(Boolean);
        o.push(
          `- ${vs.length ? `${vs.length > 1 ? `${vs.length} variantes` : 'Variante'} ${liste(vs, 6)}` : 'Composant'} :`,
        );
        for (const k of g.calques.slice(0, max)) {
          const ch = `${k.chemins.slice(0, 4).join(', ')}${k.chemins.length > 4 ? ` (+ ${k.chemins.length - 4} calques)` : ''}`;
          if (k.ajoute) o.push(`  - ajouté : ${ch} : ${k.ajoute}`);
          else if (k.retire) o.push(`  - retiré : ${ch} : ${k.retire}`);
          else
            o.push(
              `  - ${ch} : ${[
                ...(k.renomme ? [`renommé (ancien chemin : ${k.renomme})`] : []),
                ...k.paires.map((x) => {
                  const cle = cleAttribut(x.avant);
                  const apres =
                    cle !== 'texte' && cle !== 'taille' && x.apres.startsWith(`${cle} `)
                      ? x.apres.slice(cle.length + 1)
                      : x.apres;
                  return `${x.avant} **→** ${apres}`;
                }),
                ...k.moins.map((x) => `sans ${x}`),
                ...k.plus.map((x) => `avec ${x}`),
              ].join(' ; ')}`,
            );
        }
        if (g.calques.length > max) o.push(`  - … et ${g.calques.length - max} autre(s) calque(s)`);
      }
      o.push('');
    }
  }

  const jo = r.journal;
  if (jo.nouvelles.length || jo.retirees.length || jo.modifiees.length) {
    o.push('## Journal (page Changelog)', '');
    for (const t of jo.nouvelles) o.push(`- Nouveau : ${enLigne(t)}`);
    for (const x of jo.modifiees) {
      o.push(`- Réécrit : ${x.titre}`);
      for (const l of x.ajoutees) o.push(`  - ajouté : ${l}`);
      for (const l of x.retirees) o.push(`  - retiré : ${l}`);
    }
    for (const t of jo.retirees) o.push(`- Retiré : ${enLigne(t).slice(0, 200)}`);
    o.push('');
  }
  return o.join('\n');
}
