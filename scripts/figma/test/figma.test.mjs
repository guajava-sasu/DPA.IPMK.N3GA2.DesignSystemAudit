// Tests du suivi des évolutions du Figma : npm run test:figma (node --test scripts/figma/test/figma.test.mjs).
// Les essais de bout en bout lisent « ../AMF Design System [v2.0].fig » (dossier parent du dépôt) ou le fichier
// donné par AMF_FIG ; sans lui, ils sont sautés.

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import { comparer, rapportMarkdown, nombreDeDifferences } from '../comparer.mjs';
import { ouvrirFig } from '../lire-fig.mjs';
import { construireInstantane, verifierInstantane } from '../instantane.mjs';
import { ecrireFig } from './ecrire-fig.mjs';

const racine = resolve(dirname(fileURLToPath(import.meta.url)), '../../..');
const FIG = resolve(process.env.AMF_FIG ?? join(racine, '..', 'AMF Design System [v2.0].fig'));
const CLI = join(racine, 'scripts/amf-figma.mjs');
const cli = (...a) => spawnSync(process.execPath, [CLI, ...a], { encoding: 'utf8' });
const dossierTemporaire = (t) => {
  const d = mkdtempSync(join(tmpdir(), 'amf-figma-'));
  t.after(() => rmSync(d, { recursive: true, force: true }));
  return d;
};

const BOUTON = '10:1';
const base = () => ({
  format: 2,
  source: { fichier: 'a.fig', exporte_le: '2026-11-12' },
  jetons: {
    '--amf-a': { defaut: '#111111' },
    '--amf-b': { defaut: '8px', rounded: '999px' },
    '--amf-c': { defaut: 'var(--amf-a)' },
  },
  pages: [
    { id: '1:1', nom: 'Button 🆕' },
    { id: '1:2', nom: 'Tag 🆕' },
  ],
  composants: {
    [BOUTON]: {
      page: 'Button 🆕',
      nom: 'Button',
      type: 'set',
      proprietes: ['Size = S / M', 'Label (TEXT)'],
      variantes: {
        '10:2': {
          nom: 'Size=S',
          racine: 'SYMBOL ; 80×32 ; rayon 8',
          calques: { '10:5': 'Label : TEXT ; style « Button 2 »' },
        },
        '10:3': {
          nom: 'Size=M',
          racine: 'SYMBOL ; 96×40 ; rayon 8',
          calques: { '10:6': 'Label : TEXT ; style « Button 2 »' },
        },
      },
    },
  },
  journal: ['12/09 : première entrée'],
});

test('aucune différence entre deux instantanés identiques', () => {
  const r = comparer(base(), base());
  assert.equal(nombreDeDifferences(r), 0);
  assert.match(rapportMarkdown(r), /Aucune différence/);
});

test('jetons : ajout, suppression, modification et renommage probable', () => {
  const b = base();
  b.jetons['--amf-a'] = { defaut: '#222222' };
  b.jetons['--amf-b2'] = b.jetons['--amf-b'];
  delete b.jetons['--amf-b'];
  delete b.jetons['--amf-c'];
  b.jetons['--amf-d'] = { defaut: '4px' };
  const r = comparer(base(), b);
  assert.deepEqual(r.jetons.modifies, [{ nom: '--amf-a', avant: '#111111', apres: '#222222' }]);
  assert.deepEqual(r.jetons.renommes, [
    { de: '--amf-b', vers: '--amf-b2', valeur: '8px (Rounded : 999px)' },
  ]);
  assert.deepEqual(
    r.jetons.supprimes.map((x) => x.nom),
    ['--amf-c'],
  );
  assert.deepEqual(
    r.jetons.ajoutes.map((x) => x.nom),
    ['--amf-d'],
  );
  const md = rapportMarkdown(r, {
    usagesJetons: new Map([['--amf-c', ['a/x.css:3', 'a/x.css:9', 'b/y.ts:1']]]),
    commandeAppliquer: 'node scripts/amf-figma.mjs appliquer "v2.1.fig"',
  });
  assert.match(
    md,
    /`--amf-c` \(var\(--amf-a\)\) — \*\*encore utilisé\*\* : a\/x\.css:3,9 ; b\/y\.ts:1/,
  );
  assert.match(md, /`--amf-b` → `--amf-b2`/);
  assert.match(md, /`node scripts\/amf-figma\.mjs appliquer "v2\.1\.fig"`/);
});

test('jetons : renommages en chaîne, valeurs var() suivies, modes supplémentaires', () => {
  const a = base(),
    b = base();
  // --amf-a renommé en --amf-a2 : --amf-c, qui le cite, n'est pas modifié
  b.jetons['--amf-a2'] = b.jetons['--amf-a'];
  delete b.jetons['--amf-a'];
  b.jetons['--amf-c'] = { defaut: 'var(--amf-a2)' };
  // --amf-e (var(--amf-a)) renommé lui aussi : reconnu au second tour
  a.jetons['--amf-e'] = { defaut: 'var(--amf-a)' };
  b.jetons['--amf-e2'] = { defaut: 'var(--amf-a2)' };
  // Nouveau mode sombre sur --amf-b
  b.jetons['--amf-b'] = { defaut: '8px', rounded: '999px', modes: { Dark: '6px' } };
  const r = comparer(a, b);
  assert.deepEqual(
    r.jetons.renommes.map((x) => `${x.de}>${x.vers}`),
    ['--amf-a>--amf-a2', '--amf-e>--amf-e2'],
  );
  assert.deepEqual(r.jetons.supprimes, []);
  assert.deepEqual(r.jetons.ajoutes, []);
  assert.deepEqual(r.jetons.modifies, [
    { nom: '--amf-b', avant: '8px (Rounded : 999px)', apres: '8px (Rounded : 999px ; Dark : 6px)' },
  ]);
});

test('composants : variantes, propriétés et changement commun regroupé', () => {
  const b = base();
  const c = b.composants[BOUTON];
  c.proprietes.push('hasIcon (BOOL)');
  for (const v of Object.values(c.variantes)) v.racine = v.racine.replace('rayon 8', 'rayon 10');
  c.variantes['10:4'] = { nom: 'Size=L', racine: 'SYMBOL ; 120×48', calques: {} };
  c.variantes['10:2'].calques['10:7'] = 'Icon : INSTANCE ; → Icon / add';
  b.composants['20:1'] = {
    page: 'Tag 🆕',
    nom: 'Tag',
    type: 'composant',
    proprietes: [],
    variantes: { '20:1': { nom: '', racine: 'SYMBOL', calques: {} } },
  };
  const r = comparer(base(), b);
  assert.deepEqual(
    r.composants.ajoutes.map((x) => x.nom),
    ['Tag'],
  );
  const m = r.composants.modifies[0];
  assert.deepEqual(m.proprietes.ajoutees, ['hasIcon (BOOL)']);
  assert.deepEqual(m.variantesAjoutees, ['Size=L']);
  assert.equal(m.changements.length, 2, 'Size=S a un calque en plus, Size=M seulement le rayon');
  const md = rapportMarkdown(r, { pagesVitrine: (nom) => (nom === 'Button' ? ['bouton'] : []) });
  assert.match(md, /### Button 🆕 › Button — vitrine : `bouton`/);
  assert.match(md, /- Variante Size=M :\n  - \(racine\) : rayon 8 \*\*→\*\* 10/);
  assert.match(md, /ajouté : Icon : INSTANCE/);
});

test('renommages Figma : page, composant, variante et calque gardent leur identifiant', () => {
  const b = base();
  b.pages[0].nom = 'Button';
  const c = b.composants[BOUTON];
  c.page = 'Button';
  c.nom = 'Bouton';
  c.variantes['10:3'].nom = 'Size=Medium';
  c.variantes['10:2'].calques['10:5'] = 'Libellé : TEXT ; style « Button 2 »';
  const r = comparer(base(), b);
  assert.deepEqual(r.pages, {
    ajoutees: [],
    supprimees: [],
    renommees: [{ de: 'Button 🆕', vers: 'Button' }],
  });
  assert.equal(r.composants.ajoutes.length + r.composants.supprimes.length, 0);
  const [m] = r.composants.modifies;
  assert.equal(m.renommeDe, 'Button');
  assert.equal(m.deplaceDe, undefined, 'la page a été renommée, pas changée');
  assert.deepEqual(m.variantesRenommees, [{ de: 'Size=M', vers: 'Size=Medium' }]);
  assert.deepEqual(m.variantesAjoutees, []);
  assert.deepEqual(m.changements[0].calques[0].renomme, 'Label');
});

test('calques : même changement regroupé, changement dû à un renommage de jeton ignoré', () => {
  const a = base(),
    b = base();
  const v = (i) => i.composants[BOUTON].variantes['10:2'];
  v(a).calques = {
    '1:a': 'A : FRAME ; fond [Background/Surface Subtle]',
    '1:b': 'B : FRAME ; écart 4',
    '1:c': 'C : FRAME ; écart 4',
    '1:d': 'D : FRAME ; fond [Background/Surface Subtle Strong]',
  };
  v(b).calques = {
    '1:a': 'A : FRAME ; fond [Background/Surface Muted]',
    '1:b': 'B : FRAME ; écart 8',
    '1:c': 'C : FRAME ; écart 8',
    '1:d': 'D : FRAME ; fond [Background/Surface Muted Strong]',
  };
  b.jetons['--amf-background-surface-muted'] = { defaut: '#eeeeee' };
  a.jetons['--amf-background-surface-subtle'] = { defaut: '#eeeeee' };
  const r = comparer(a, b);
  assert.equal(r.composants.ignoresParRenommage, 1);
  const [g] = r.composants.modifies[0].changements;
  assert.deepEqual(g.calques[0], {
    chemins: ['B', 'C'],
    paires: [{ avant: 'écart 4', apres: 'écart 8' }],
    moins: [],
    plus: [],
  });
  assert.deepEqual(
    g.calques[1].chemins,
    ['D'],
    'Subtle Strong n’est pas le jeton renommé : changement gardé',
  );
});

test('journal : entrées nouvelles et entrée réécrite comparée ligne à ligne', () => {
  const a = base(),
    b = base();
  a.journal.push('10/10 : Boutons\n- rayon 8\n- hauteur 40');
  b.journal.push('10/10 : Boutons\n- rayon 10\n- hauteur 40', '13/11 : seconde entrée');
  const r = comparer(a, b);
  assert.deepEqual(r.journal.nouvelles, ['13/11 : seconde entrée']);
  assert.deepEqual(r.journal.modifiees, [
    { titre: '10/10 : Boutons', ajoutees: ['- rayon 10'], retirees: ['- rayon 8'] },
  ]);
  const md = rapportMarkdown(r);
  assert.match(md, /Nouveau : 13\/11 : seconde entrée/);
  assert.match(md, /Réécrit : 10\/10 : Boutons\n  - ajouté : - rayon 10\n  - retiré : - rayon 8/);
});

test('instantané : format vérifié', () => {
  assert.throws(() => verifierInstantane({ format: 1 }, 'x.json'), /x\.json : .*format 1/);
  assert.throws(
    () => verifierInstantane({ ...base(), pages: undefined }, 'x.json'),
    /« pages » absent/,
  );
  assert.equal(verifierInstantane(base(), 'x.json').format, 2);
});

test('ligne de commande : options inconnues, appliquer sur un .json, référence invalide', (t) => {
  const tmp = dossierTemporaire(t);
  const inconnue = cli('comparer', 'x.fig', '--rapprot', 'r.md');
  assert.equal(inconnue.status, 2);
  assert.match(inconnue.stderr, /--rapprot/);
  const ref = join(tmp, 'ref.json');
  writeFileSync(ref, JSON.stringify(base()));
  const json = cli('appliquer', ref, '--reference', ref, '--rapport', join(tmp, 'r.md'));
  assert.equal(json.status, 1);
  assert.match(json.stderr, /appliquer demande un fichier \.fig/);
  assert.ok(!existsSync(join(tmp, 'r.md')), 'aucun rapport écrit');
  writeFileSync(join(tmp, 'v1.json'), JSON.stringify({ format: 1 }));
  const v1 = cli('comparer', ref, '--reference', join(tmp, 'v1.json'));
  assert.equal(v1.status, 1);
  assert.match(v1.stderr, /v1\.json : instantané au format 1/);
  const zero = cli('comparer', ref, '--reference', ref, '--rapport', join(tmp, 'r.md'));
  assert.equal(zero.status, 0, zero.stderr);
  assert.match(zero.stdout, /^0 différence/);
  assert.ok(!existsSync(join(tmp, 'r.md')), 'pas de rapport sans différence');
});

test(
  'bout en bout : .fig modifié, comparer puis appliquer',
  { skip: !existsSync(FIG) && `${FIG} absent` },
  (t) => {
    const tmp = dossierTemporaire(t);
    const fig = ouvrirFig(FIG);
    const ref = construireInstantane(fig.message, fig.meta, FIG);
    const cheminRef = join(tmp, 'ref.json');
    writeFileSync(cheminRef, JSON.stringify(ref));

    const N = fig.message.nodeChanges;
    const gid = (g) => `${g.sessionID}:${g.localID}`;
    const vivant = (n) => !n.isSoftDeleted;
    const variable = (nom) => N.find((n) => n.type === 'VARIABLE' && vivant(n) && n.name === nom);
    // 1. Valeur d'une primitive changée
    const bleu = variable('Color/Blue/500');
    assert.ok(bleu, 'primitive Color/Blue/500 attendue');
    bleu.variableDataValues.entries[0].variableData.value.colorValue = {
      r: 0,
      g: 0.4,
      b: 0.8,
      a: 1,
    };
    // 2. Jeton sémantique renommé (utilisé dans le dépôt)
    variable('Background/Surface Subtle').name = 'Background/Surface Muted';
    // 3. Rayon d'une variante de Task Card, et page du composant renommée
    const set = N.find((n) => n.isStateGroup && vivant(n) && n.name === 'Task Card');
    const variante = N.find(
      (n) =>
        n.type === 'SYMBOL' &&
        vivant(n) &&
        gid(n.parentIndex.guid) === gid(set.guid) &&
        n.name === 'Color=Blue, State=Default',
    );
    for (const k of [
      'rectangleTopLeftCornerRadius',
      'rectangleTopRightCornerRadius',
      'rectangleBottomRightCornerRadius',
      'rectangleBottomLeftCornerRadius',
    ])
      variante[k] = 12;
    variante.cornerRadius = 12;
    // (rayon détaché de sa variable, comme le fait Figma quand on saisit une valeur)
    variante.variableConsumptionMap.entries = variante.variableConsumptionMap.entries.filter(
      (e) => !/CORNER_RADIUS/.test(e.variableField),
    );
    N.find((n) => n.type === 'CANVAS' && vivant(n) && n.name.trim() === 'Task Card 🆕').name =
      'Task Card';
    // 4. Entrée du journal réécrite
    const journal = ref.journal.at(-1);
    N.find(
      (n) => n.type === 'TEXT' && n.textData?.characters?.trim() === journal,
    ).textData.characters = '13/11 : entrée de test.';
    fig.meta.exported_at = '2026-12-01T10:00:00.000Z';
    const neuf = join(tmp, 'neuf.fig');
    ecrireFig(neuf, fig);

    const rapport = join(tmp, 'rapport.md');
    const c = cli('comparer', neuf, '--reference', cheminRef, '--rapport', rapport);
    assert.equal(c.status, 0, c.stderr);
    const md = readFileSync(rapport, 'utf8');
    assert.match(md, /`--amf-color-blue-500` : #0072ce → #0066cc/);
    assert.match(
      md,
      /`--amf-background-surface-subtle` → `--amf-background-surface-muted`.*\*\*encore utilisé\*\*/,
    );
    assert.match(md, /Page renommée : Task Card 🆕 → Task Card/);
    assert.match(md, /### Task Card › Task Card — vitrine : `carte-tache`/);
    assert.match(
      md,
      /Variante Color=Blue, State=Default :\n  - \(racine\) : rayon 10 \[Radius\/L\] \*\*→\*\* 12\n/,
    );
    assert.doesNotMatch(md, /Supprimés :/, 'la page renommée ne supprime aucun composant');
    assert.match(md, /attribut\(s\) de calque ne changent que par un jeton renommé/);
    assert.doesNotMatch(md, /Surface Subtle\] \*\*→\*\*/);
    assert.match(md, /Nouveau : 13\/11 : entrée de test\./);

    // appliquer refuse d'écrire tant qu'un jeton renommé est encore utilisé
    const css = join(tmp, 'amf-tokens.css');
    const appliquer = (...plus) =>
      cli(
        'appliquer',
        neuf,
        '--reference',
        cheminRef,
        '--rapport',
        rapport,
        '--sortie-css',
        css,
        ...plus,
      );
    const refus = appliquer();
    assert.equal(refus.status, 1, 'un jeton renommé encore utilisé doit faire échouer appliquer');
    assert.match(refus.stderr, /--amf-background-surface-subtle : projects\//);
    assert.ok(!existsSync(css), 'rien n’est écrit');
    assert.equal(
      JSON.parse(readFileSync(cheminRef, 'utf8')).source.exporte_le,
      ref.source.exporte_le,
    );

    const force = appliquer('--force');
    assert.equal(force.status, 0, force.stderr);
    assert.match(force.stdout, /Audit des contrastes sauté : --sortie-css/);
    const genere = readFileSync(css, 'utf8');
    assert.match(genere, /--amf-background-surface-muted: var\(--amf-color-steel-50\);/);
    assert.match(genere, /--amf-color-blue-500: #0066cc;/);
    assert.equal(
      JSON.parse(readFileSync(cheminRef, 'utf8')).source.exporte_le,
      '2026-12-01T10:00:00.000Z',
    );
    const encore = cli('comparer', neuf, '--reference', cheminRef);
    assert.match(encore.stdout, /^0 différence/);
  },
);
