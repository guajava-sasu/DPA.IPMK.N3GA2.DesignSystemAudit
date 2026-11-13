// Instantané d'un Figma AMF décodé (voir lire-fig.mjs) : ce que amf-figma.mjs compare d'une version à l'autre.
//   - jetons : valeurs CSS générées (même calcul que amf-tokens.css), avec les modes supplémentaires éventuels ;
//   - pages : identifiant et nom de chaque page ;
//   - composants : chaque set de variantes et chaque composant isolé, rangés par identifiant Figma (un renommage
//     ou un déplacement reste reconnu), avec leurs propriétés et, pour chaque variante, une ligne par calque :
//     taille, contraintes de mise en page, rayons, couleurs, traits, styles de texte et d'ombre (avec leur valeur),
//     effets, textes, instances, leurs propriétés et leurs surcharges. Les variables liées sont écrites entre
//     crochets : « écart 8 [Spacing/8] », « fond [Background/Surface] ». Les instances ne sont pas dépliées : le
//     composant qu'elles citent a sa propre entrée ;
//   - journal : textes de la page Changelog, dans l'ordre, retours à la ligne gardés.

import { existsSync, readFileSync } from 'node:fs';
import { basename, join, resolve } from 'node:path';
import { extraireJetons } from './jetons.mjs';

export const FORMAT_INSTANTANE = 2;
const PAGES_IGNOREES = /^(Internal Only Canvas|Thumbnail)$/;
const PAGE_JOURNAL = /changelog/i;

const nombre = (x) => +(+x).toFixed(2);
const hexa = (c) => {
  const h = (x) =>
    Math.round(x * 255)
      .toString(16)
      .padStart(2, '0')
      .toUpperCase();
  return `#${h(c.r)}${h(c.g)}${h(c.b)}${c.a !== undefined && c.a < 0.999 ? h(c.a) : ''}`;
};
const court = (t, n) => t.replace(/\s+/g, ' ').slice(0, n);
const uniques = (l) => [...new Set(l.filter(Boolean))];

export function construireInstantane(message, meta, source) {
  const tous = message.nodeChanges;
  const noeuds = tous.filter((n) => !n.isSoftDeleted);
  const gid = (g) => (g ? `${g.sessionID}:${g.localID}` : '');
  const parId = new Map(noeuds.map((n) => [gid(n.guid), n]));
  const tousParId = new Map(tous.map((n) => [gid(n.guid), n]));
  const parCleSurcharge = new Map(
    noeuds.filter((n) => n.overrideKey).map((n) => [gid(n.overrideKey), n]),
  );
  const enfants = new Map();
  for (const n of noeuds) {
    const p = gid(n.parentIndex?.guid);
    if (!p) continue;
    if (!enfants.has(p)) enfants.set(p, []);
    enfants.get(p).push(n);
  }
  for (const l of enfants.values())
    l.sort((a, b) => (a.parentIndex.position < b.parentIndex.position ? -1 : 1));
  const fils = (n) => enfants.get(gid(n.guid)) ?? [];

  // Variables : une variable supprimée mais encore citée garde son nom, marqué
  const nomVariable = (alias) => {
    if (!alias) return null;
    const v = alias.guid && tousParId.get(gid(alias.guid));
    if (v) return v.isSoftDeleted ? `${v.name} (supprimée)` : v.name;
    return alias.assetRef?.key ? '(variable externe)' : '?';
  };
  const variableSupprimee = (alias) => !!tousParId.get(gid(alias?.guid))?.isSoftDeleted;
  // Valeur avec ses variables liées : « 8 [Spacing/8] »
  const lie = (n, valeur, ...champs) => {
    const liaisons = new Map(
      (n.variableConsumptionMap?.entries ?? []).map((e) => [
        e.variableField,
        nomVariable(e.variableData?.value?.alias),
      ]),
    );
    const noms = uniques(champs.map((c) => liaisons.get(c)));
    return noms.length ? `${valeur} [${noms.join('] [')}]` : `${valeur}`;
  };

  const couleur = (c, colorVar) => {
    const alias = colorVar?.value?.alias;
    if (!alias) return c ? hexa(c) : '?';
    return `[${nomVariable(alias)}]${variableSupprimee(alias) && c ? ` ${hexa(c)}` : ''}`;
  };
  const peintures = (ps) =>
    (ps ?? [])
      .filter((p) => p.visible !== false)
      .map((p) => {
        let s;
        if (p.colorVar?.value?.alias || p.type === 'SOLID') s = couleur(p.color, p.colorVar);
        else if (/^GRADIENT_/.test(p.type ?? ''))
          s = `${p.type}(${(p.stops ?? []).map((x) => `${couleur(x.color, x.colorVar)} ${Math.round((x.position ?? 0) * 100)} %`).join(', ')})`;
        else s = p.type ?? '?';
        if (p.opacity !== undefined && p.opacity < 0.999) s += ` ${Math.round(p.opacity * 100)} %`;
        return s;
      });
  const effet = (e) =>
    /BLUR/.test(e.type)
      ? `${e.type} flou ${nombre(e.radius ?? 0)}`
      : `${e.type} ${nombre(e.offset?.x ?? 0)},${nombre(e.offset?.y ?? 0)} flou ${nombre(e.radius ?? 0)}${e.spread ? ` étendue ${nombre(e.spread)}` : ''} ${couleur(e.color, e.colorVar)}`;
  const effets = (l) =>
    (l ?? [])
      .filter((e) => e.visible !== false)
      .map(effet)
      .join(' + ');

  // Styles (texte, ombre, couleur) par guid local ou clé de bibliothèque, avec un résumé de leur valeur : deux styles
  // homonymes (il y en a dans le fichier) restent distingués
  const styles = new Map();
  for (const n of noeuds) {
    if (!n.styleType) continue;
    styles.set(gid(n.guid), n);
    if (n.key) styles.set(n.key, n);
  }
  const hauteurLigne = (lh) =>
    lh?.units === 'PIXELS'
      ? nombre(lh.value)
      : lh?.units === 'PERCENT'
        ? `${nombre(lh.value)} %`
        : 'auto';
  const style = (ref) => {
    if (!ref) return null;
    const s = styles.get(gid(ref.guid)) ?? styles.get(ref.assetRef?.key);
    if (!s) return '« (style externe) »';
    if (s.styleType === 'TEXT')
      return `« ${s.name} » (${s.fontName?.family} ${s.fontName?.style} ${nombre(s.fontSize ?? 0)}/${hauteurLigne(s.lineHeight)})`;
    if (s.styleType === 'EFFECT') return `« ${s.name} » (${effets(s.effects)})`;
    return `« ${s.name} »`;
  };

  const nomComposant = (sid) => {
    const s = sid && parId.get(gid(sid));
    if (!s) return '?';
    const p = parId.get(gid(s.parentIndex?.guid));
    return p?.isStateGroup ? `${p.name} / ${s.name}` : s.name;
  };
  const defsProps = new Map();
  for (const n of noeuds)
    for (const d of n.componentPropDefs ?? []) defsProps.set(gid(d.id), d.name);
  const valeursProps = (l) =>
    (l ?? [])
      .map((a) => {
        const v = a.value ?? {};
        const val =
          v.textValue?.characters !== undefined
            ? `« ${court(v.textValue.characters, 40)} »`
            : v.boolValue !== undefined
              ? v.boolValue
                ? 'oui'
                : 'non'
              : v.guidValue
                ? `→ ${nomComposant(v.guidValue)}`
                : null;
        // Une affectation dont la propriété n'existe plus est ignorée par Figma : ici aussi
        const nom = defsProps.get(gid(a.defID));
        return val === null || !nom ? null : `${nom}=${val}`;
      })
      .filter(Boolean)
      .sort();

  // Surcharges d'une instance : calque visé et ce qui change
  // (la taille d'une racine de composant, celle de l'instance déjà écrite, n'est pas répétée)
  const surcharges = (l, symbole) =>
    (l ?? [])
      .map((o) => {
        const g = gid(o.guidPath?.guids?.at(-1));
        const cible = parId.get(g) ?? parCleSurcharge.get(g);
        if (
          (g === gid(symbole) || cible?.type === 'SYMBOL') &&
          Object.keys(o).every((k) => ['guidPath', 'size', 'name'].includes(k))
        )
          return null;
        const p = [];
        if (o.overriddenSymbolID) p.push(`→ ${nomComposant(o.overriddenSymbolID)}`);
        if (o.visible === false) p.push('masqué');
        if (o.visible === true) p.push('visible');
        if (o.size) p.push(`${nombre(o.size.x)}×${nombre(o.size.y)}`);
        if (o.opacity !== undefined) p.push(`opacité ${Math.round(o.opacity * 100)} %`);
        const coin = o.rectangleTopLeftCornerRadius ?? o.cornerRadius;
        if (coin !== undefined) p.push(`rayon ${nombre(coin)}`);
        if (o.fillPaints) p.push(`fond ${peintures(o.fillPaints).join(' + ') || 'aucun'}`);
        if (o.strokePaints) p.push(`trait ${peintures(o.strokePaints).join(' + ') || 'aucun'}`);
        if (o.styleIdForText) p.push(`style ${style(o.styleIdForText)}`);
        if (o.styleIdForEffect) p.push(`ombre ${style(o.styleIdForEffect)}`);
        if (o.effects) p.push(`effets ${effets(o.effects) || 'aucun'}`);
        const t = o.textData?.characters?.trim();
        if (t) p.push(`« ${court(t, 40)} »`);
        p.push(...valeursProps(o.componentPropAssignments));
        return p.length ? `${(cible?.name ?? '?').trim()}(${p.join(', ')})` : null;
      })
      .filter(Boolean);

  function decrire(n) {
    const b = [n.type];
    if (n.size) b.push(lie(n, `${nombre(n.size.x)}×${nombre(n.size.y)}`, 'WIDTH', 'HEIGHT'));
    const min = n.minSize?.value,
      max = n.maxSize?.value;
    if (min && (min.x || min.y))
      b.push(lie(n, `min ${nombre(min.x ?? 0)}×${nombre(min.y ?? 0)}`, 'MIN_WIDTH', 'MIN_HEIGHT'));
    if (max && (max.x || max.y))
      b.push(lie(n, `max ${nombre(max.x ?? 0)}×${nombre(max.y ?? 0)}`, 'MAX_WIDTH', 'MAX_HEIGHT'));
    if (n.visible === false) b.push('masqué');
    if (n.opacity !== undefined && n.opacity < 0.999)
      b.push(`opacité ${Math.round(n.opacity * 100)} %`);
    if (n.stackPositioning === 'ABSOLUTE') b.push('position absolue');
    if (n.stackChildPrimaryGrow) b.push('étiré');
    if (n.stackChildAlignSelf === 'STRETCH') b.push('remplit le travers');
    if (n.stackMode && n.stackMode !== 'NONE') {
      b.push(`pile ${n.stackMode === 'HORIZONTAL' ? 'horizontale' : 'verticale'}`);
      const pad = [
        n.stackVerticalPadding ?? 0,
        n.stackPaddingRight ?? n.stackHorizontalPadding ?? 0,
        n.stackPaddingBottom ?? n.stackVerticalPadding ?? 0,
        n.stackHorizontalPadding ?? 0,
      ].map(nombre);
      if (pad.some(Boolean))
        b.push(
          lie(
            n,
            `marges ${pad.join('/')}`,
            'STACK_PADDING_TOP',
            'STACK_PADDING_RIGHT',
            'STACK_PADDING_BOTTOM',
            'STACK_PADDING_LEFT',
          ),
        );
      if (n.stackSpacing) b.push(lie(n, `écart ${nombre(n.stackSpacing)}`, 'STACK_SPACING'));
      if (n.stackPrimaryAlignItems) b.push(`axe ${n.stackPrimaryAlignItems}`);
      if (n.stackCounterAlignItems) b.push(`travers ${n.stackCounterAlignItems}`);
      if (n.stackPrimarySizing || n.stackCounterSizing)
        b.push(
          `dimensionnement ${n.stackPrimarySizing ?? 'FIXED'}/${n.stackCounterSizing ?? 'FIXED'}`,
        );
      if (n.stackWrap === 'WRAP') {
        b.push('retour à la ligne');
        if (n.stackCounterSpacing)
          b.push(
            lie(n, `écart des lignes ${nombre(n.stackCounterSpacing)}`, 'STACK_COUNTER_SPACING'),
          );
      }
    }
    const CHAMPS_COINS = [
      'RECTANGLE_TOP_LEFT_CORNER_RADIUS',
      'RECTANGLE_TOP_RIGHT_CORNER_RADIUS',
      'RECTANGLE_BOTTOM_RIGHT_CORNER_RADIUS',
      'RECTANGLE_BOTTOM_LEFT_CORNER_RADIUS',
    ];
    const coins = [
      n.rectangleTopLeftCornerRadius,
      n.rectangleTopRightCornerRadius,
      n.rectangleBottomRightCornerRadius,
      n.rectangleBottomLeftCornerRadius,
    ];
    if (
      n.rectangleCornerRadiiIndependent &&
      coins.some((r) => r !== undefined) &&
      new Set(coins.map((r) => nombre(r ?? 0))).size > 1
    )
      b.push(lie(n, `rayons ${coins.map((r) => nombre(r ?? 0)).join('/')}`, ...CHAMPS_COINS));
    else if (n.rectangleCornerRadiiIndependent && coins[0])
      b.push(lie(n, `rayon ${nombre(coins[0])}`, ...CHAMPS_COINS));
    else if (n.cornerRadius) b.push(lie(n, `rayon ${nombre(n.cornerRadius)}`, ...CHAMPS_COINS));
    const fond = peintures(n.fillPaints);
    if (fond.length && n.type !== 'TEXT') b.push(`fond ${fond.join(' + ')}`);
    const trait = peintures(n.strokePaints);
    if (trait.length) {
      const epaisseur = n.borderStrokeWeightsIndependent
        ? lie(
            n,
            [n.borderTopWeight, n.borderRightWeight, n.borderBottomWeight, n.borderLeftWeight]
              .map((x) => nombre(x ?? 0))
              .join('/'),
            'BORDER_TOP_WEIGHT',
            'BORDER_RIGHT_WEIGHT',
            'BORDER_BOTTOM_WEIGHT',
            'BORDER_LEFT_WEIGHT',
          )
        : lie(n, nombre(n.strokeWeight ?? 0), 'STROKE_WEIGHT');
      b.push(
        `trait ${trait.join(' + ')} ${epaisseur}${n.strokeAlign ? ` ${n.strokeAlign}` : ''}${n.dashPattern?.length ? ` pointillés ${n.dashPattern.map(nombre).join('/')}` : ''}`,
      );
    }
    const ombre = style(n.styleIdForEffect);
    if (ombre) b.push(`ombre ${ombre}`);
    else if (n.effects?.some((e) => e.visible !== false)) b.push(`effets ${effets(n.effects)}`);
    if (n.type === 'TEXT') {
      const st = style(n.styleIdForText);
      b.push(
        st
          ? `style ${st}`
          : `police ${n.fontName?.family ?? '?'} ${n.fontName?.style ?? ''} ${nombre(n.fontSize ?? 0)}/${hauteurLigne(n.lineHeight)}`,
      );
      if (fond.length) b.push(`couleur ${fond.join(' + ')}`);
      if (n.textCase && n.textCase !== 'ORIGINAL') b.push(`casse ${n.textCase}`);
      if (n.textDecoration && n.textDecoration !== 'NONE')
        b.push(n.textDecoration === 'UNDERLINE' ? 'souligné' : 'barré');
      if (n.textAlignHorizontal && n.textAlignHorizontal !== 'LEFT')
        b.push(`aligné ${n.textAlignHorizontal}`);
      if (n.textAutoResize) b.push(`ajustement ${n.textAutoResize}`);
      if (n.textTruncation === 'ENDING') b.push('tronqué');
      if (n.maxLines) b.push(`lignes max ${n.maxLines}`);
      const t = n.textData?.characters?.trim();
      if (t) b.push(`« ${court(t, 80)} »`);
    }
    if (n.type === 'INSTANCE') {
      const sd = n.symbolData ?? {};
      b.push(`→ ${nomComposant(sd.symbolID)}`);
      const props = valeursProps(n.componentPropAssignments);
      if (props.length) b.push(`propriétés ${props.join(', ')}`);
      const s = surcharges(sd.symbolOverrides, sd.symbolID);
      if (s.length) b.push(`surcharges ${s.join(' ')}`);
    }
    return b.join(' ; ');
  }

  // Une ligne par calque, rangée par identifiant ; le chemin (homonymes numérotés) sert à l'affichage
  function calques(racine) {
    const out = {};
    const marcher = (n, chemin) => {
      if (n.type === 'INSTANCE') return;
      const vus = new Map();
      for (const k of fils(n)) {
        const nom = (k.name ?? '').trim() || k.type;
        const i = (vus.get(nom) ?? 0) + 1;
        vus.set(nom, i);
        const c = `${chemin}${nom}${i > 1 ? ` #${i}` : ''}`;
        out[gid(k.guid)] = `${c} : ${decrire(k)}`;
        marcher(k, `${c} / `);
      }
    };
    marcher(racine, '');
    return out;
  }

  const pageDe = (n) => {
    let p = n;
    while (p && p.type !== 'CANVAS') p = parId.get(gid(p.parentIndex?.guid));
    return p;
  };
  const pages = noeuds
    .filter((n) => n.type === 'CANVAS' && !PAGES_IGNOREES.test((n.name ?? '').trim()))
    .sort((a, b) => (a.parentIndex?.position < b.parentIndex?.position ? -1 : 1));
  const pagesRetenues = new Set(pages.map((p) => gid(p.guid)));

  const composants = [];
  const proprietes = (n) =>
    [
      ...(n.stateGroupPropertyValueOrders ?? []).map(
        (p) =>
          `${p.property} = ${(p.values ?? []).map((v) => (typeof v === 'string' ? v : v.value)).join(' / ')}`,
      ),
      ...(n.componentPropDefs ?? []).map((d) => `${d.name} (${d.type ?? '?'})`),
    ].sort();
  const ajouter = (n, variantes, type) => {
    const page = pageDe(n);
    if (!page || !pagesRetenues.has(gid(page.guid))) return;
    composants.push([
      gid(n.guid),
      {
        page: page.name.trim(),
        nom: n.name.trim(),
        type,
        proprietes: proprietes(n),
        variantes: Object.fromEntries(
          variantes.map((v) => [
            gid(v.guid),
            { nom: type === 'set' ? v.name.trim() : '', racine: decrire(v), calques: calques(v) },
          ]),
        ),
      },
    ]);
  };
  for (const n of noeuds) {
    if (n.isStateGroup)
      ajouter(
        n,
        fils(n).filter((k) => k.type === 'SYMBOL'),
        'set',
      );
    else if (n.type === 'SYMBOL' && !parId.get(gid(n.parentIndex?.guid))?.isStateGroup)
      ajouter(n, [n], 'composant');
  }
  const etiquette = ([id, c]) => `${c.page} › ${c.nom} ${id}`;
  composants.sort((a, b) => (etiquette(a) < etiquette(b) ? -1 : 1));

  const journal = [];
  const page = pages.find((p) => PAGE_JOURNAL.test(p.name));
  if (page) {
    const marcher = (n) => {
      const t = n.type === 'TEXT' && n.textData?.characters?.trim();
      if (t) journal.push(t);
      fils(n).forEach(marcher);
    };
    marcher(page);
  }

  const { jetons } = extraireJetons(message, meta, source);
  return {
    format: FORMAT_INSTANTANE,
    source: { fichier: basename(source), exporte_le: meta.exported_at ?? null },
    jetons: Object.fromEntries([...jetons].sort(([a], [b]) => (a < b ? -1 : 1))),
    pages: pages.map((p) => ({ id: gid(p.guid), nom: p.name.trim() })),
    composants: Object.fromEntries(composants),
    journal,
  };
}

/**
 * .fig de la version de référence, cherché dans le dossier parent du dépôt sous le nom noté dans l'instantané (sans
 * instantané : « AMF Design System [v2.0].fig »). Sert de valeur par défaut à « npm run jetons » et à « instantane ».
 * Si le fichier nommé manque, erreur plutôt qu'un retour silencieux à une ancienne version.
 */
export function figDeReference(racine, cheminReference = join(racine, 'figma/instantane.json')) {
  let nom = null;
  if (existsSync(cheminReference)) {
    try {
      nom = JSON.parse(readFileSync(cheminReference, 'utf8')).source?.fichier ?? null;
    } catch {
      nom = null;
    }
  }
  const p = resolve(racine, '..', nom ?? 'AMF Design System [v2.0].fig');
  if (!existsSync(p))
    throw new Error(
      `${p} introuvable : le .fig de la version de référence${nom ? ` (nommé dans ${basename(cheminReference)})` : ''} doit être dans le dossier parent du dépôt, ou donner son chemin en argument`,
    );
  return p;
}

/** Vérifie qu'un objet lu sur disque est bien un instantané de ce format. */
export function verifierInstantane(i, chemin) {
  if (!i || typeof i !== 'object') throw new Error(`${chemin} : instantané illisible`);
  if (i.format !== FORMAT_INSTANTANE)
    throw new Error(
      `${chemin} : instantané au format ${i.format ?? 'inconnu'}, ${FORMAT_INSTANTANE} attendu (le régénérer avec « node scripts/amf-figma.mjs instantane <fichier.fig> » sur la version de référence)`,
    );
  const attendu = { jetons: 'object', composants: 'object', pages: 'array', journal: 'array' };
  for (const [k, t] of Object.entries(attendu)) {
    const ok = t === 'array' ? Array.isArray(i[k]) : i[k] && typeof i[k] === 'object';
    if (!ok) throw new Error(`${chemin} : champ « ${k} » absent ou invalide`);
  }
  if (!i.source || typeof i.source !== 'object')
    throw new Error(`${chemin} : champ « source » absent`);
  return i;
}
