import {
  occupationInputs,
  UK_TOTAL,
  UK_WOMEN,
  SOURCE_OCCUPATIONS,
  type OccupationInput,
} from "../data/occupations";

export interface Occupation extends OccupationInput {
  slug: string;
  total: number;
  femalePct: number;
  malePct: number;
  workforcePct: number;
  /** 1 = most male-dominated on the chart */
  position: number;
  /** 1 = largest occupation on the chart */
  sizeRank: number;
}

export function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const base = occupationInputs.map((o) => {
  const total = o.women + o.men;
  const femalePct = (100 * o.women) / total;
  return {
    ...o,
    slug: slugify(o.name),
    total,
    femalePct,
    malePct: 100 - femalePct,
    workforcePct: (100 * total) / UK_TOTAL,
  };
});

const bySize = [...base].sort((a, b) => b.total - a.total).map((o) => o.slug);

export const occupations: Occupation[] = [...base]
  .sort((a, b) => a.femalePct - b.femalePct || a.name.localeCompare(b.name))
  .map((o, i) => ({ ...o, position: i + 1, sizeRank: bySize.indexOf(o.slug) + 1 }));

const covered = occupations.reduce((s, o) => s + o.total, 0);

export const summary = {
  count: occupations.length,
  covered,
  coveragePct: (100 * covered) / UK_TOTAL,
  otherRoles: SOURCE_OCCUPATIONS - occupations.length,
  sourceOccupations: SOURCE_OCCUPATIONS,
  ukTotal: UK_TOTAL,
  ukFemalePct: (100 * UK_WOMEN) / UK_TOTAL,
  nearParity: occupations.filter((o) => o.femalePct >= 45 && o.femalePct <= 55).length,
  under10: occupations.filter((o) => o.femalePct < 10).length,
  over90: occupations.filter((o) => o.femalePct > 90).length,
};

export function fmtCount(n: number): string {
  if (n >= 1e6) return `${(n / 1e6).toFixed(1).replace(/\.0$/, "")}m`;
  return `${Math.round(n / 1e3)}k`;
}

export function fmtExact(n: number): string {
  return n.toLocaleString("en-GB");
}

export function fmtShare(p: number): string {
  return `${p >= 1 ? p.toFixed(1) : p.toFixed(2)}%`;
}

export function ratioLine(o: Occupation): string {
  if (o.women === 0 || o.men === 0) return "";
  if (o.women >= o.men) {
    const r = o.women / o.men;
    return r < 1.05 ? "About one woman for every man" : `${r.toFixed(1)} women for every man`;
  }
  const r = o.men / o.women;
  return r < 1.05 ? "About one man for every woman" : `${r.toFixed(r >= 10 ? 0 : 1)} men for every woman`;
}

export function ordinal(n: number): string {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

export function positionLine(o: Occupation, total: number): string {
  if (o.femalePct < 50) {
    return o.position === 1
      ? `The most male-dominated job on the chart`
      : `${ordinal(o.position)} most male-dominated of ${total} jobs on the chart`;
  }
  const fromTop = total - o.position + 1;
  return fromTop === 1
    ? `The most female-dominated job on the chart`
    : `${ordinal(fromTop)} most female-dominated of ${total} jobs on the chart`;
}
