import { occupations, type Occupation } from "./stats";

/* ------------------------------------------------------------------ */
/* Colour: diverging blue → neutral → red by female share             */
/* ------------------------------------------------------------------ */

const BLUE: RGB = [47, 109, 181]; // #2f6db5
const MID: RGB = [214, 208, 196]; // warm neutral at 50/50
const RED: RGB = [200, 69, 59]; // #c8453b
type RGB = [number, number, number];

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const mix = (a: RGB, b: RGB, t: number): RGB => [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)];
const hex = (c: RGB) => "#" + c.map((v) => Math.round(v).toString(16).padStart(2, "0")).join("");

/** Colour for a job with the given female share (0–100). */
export function mixColor(femalePct: number): string {
  const t = Math.min(Math.max(femalePct / 100, 0), 1);
  // ease so near-50/50 jobs read as neutral and extremes saturate
  return t < 0.5 ? hex(mix(BLUE, MID, Math.pow(t / 0.5, 1.25))) : hex(mix(MID, RED, 1 - Math.pow((1 - t) / 0.5, 1.25)));
}

/** Readable text colour (dark or white) for a background hex. */
export function textOn(bg: string): string {
  const n = parseInt(bg.slice(1), 16);
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  const L = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return L > 0.33 ? "#1b1f26" : "#ffffff";
}

/** Legend stops for the colour scale. */
export const scaleStops = [0, 10, 25, 40, 50, 60, 75, 90, 100].map((p) => ({ p, c: mixColor(p) }));

/* ------------------------------------------------------------------ */
/* Job families (this site's own grouping)                             */
/* ------------------------------------------------------------------ */

export const FAMILY_ORDER = [
  "Building & trades",
  "Manufacturing & food",
  "Transport & logistics",
  "Engineering & tech",
  "Protective services",
  "Business, law & media",
  "Admin & customer service",
  "Retail & hospitality",
  "Health & care",
  "Education & childcare",
  "Land, cleaning & environment",
] as const;
export type Family = (typeof FAMILY_ORDER)[number];

const familyOf: Record<string, Family> = {
  "Vehicle technicians & mechanics": "Building & trades",
  "Carpenters & joiners": "Building & trades",
  Electricians: "Building & trades",
  "Plumbers & heating engineers": "Building & trades",
  "Construction labourers": "Building & trades",
  "Painters & decorators": "Building & trades",
  "Other construction & building trades": "Building & trades",

  "Metalworking fitters": "Manufacturing & food",
  "Metal machining setters": "Manufacturing & food",
  "Production managers in manufacturing": "Manufacturing & food",
  "Food & drink factory operatives": "Manufacturing & food",
  "Factory packers": "Manufacturing & food",
  Butchers: "Manufacturing & food",
  Bakers: "Manufacturing & food",

  "Fork-lift truck drivers": "Transport & logistics",
  "HGV drivers": "Transport & logistics",
  "Taxi & cab drivers": "Transport & logistics",
  "Train & tram drivers": "Transport & logistics",
  "Van drivers": "Transport & logistics",
  "Bus & coach drivers": "Transport & logistics",
  "Airline pilots": "Transport & logistics",
  "Warehouse & storage workers": "Transport & logistics",
  "Postal workers & couriers": "Transport & logistics",

  "Mechanical engineers": "Engineering & tech",
  "Civil engineers": "Engineering & tech",
  "Software developers": "Engineering & tech",
  "IT managers": "Engineering & tech",
  Architects: "Engineering & tech",

  Firefighters: "Protective services",
  "Armed forces (NCOs & other ranks)": "Protective services",
  "Police officers": "Protective services",
  "Police community support officers": "Protective services",
  "Security guards": "Protective services",

  "Chief executives & senior officials": "Business, law & media",
  "Marketing & sales directors": "Business, law & media",
  "Sales & business development managers": "Business, law & media",
  "Management consultants": "Business, law & media",
  "Financial managers & directors": "Business, law & media",
  Accountants: "Business, law & media",
  "Actuaries, economists & statisticians": "Business, law & media",
  "Barristers & judges": "Business, law & media",
  Solicitors: "Business, law & media",
  "HR managers & directors": "Business, law & media",
  "Business & finance project managers": "Business, law & media",
  "Book-keepers & payroll clerks": "Business, law & media",
  "Journalists & editors": "Business, law & media",

  "Office administrators": "Admin & customer service",
  "PAs & secretaries": "Admin & customer service",
  Receptionists: "Admin & customer service",
  "Customer service staff": "Admin & customer service",
  "Customer service managers": "Admin & customer service",

  "Shop & retail assistants": "Retail & hospitality",
  "Retail cashiers & checkout operators": "Retail & hospitality",
  Chefs: "Retail & hospitality",
  Cooks: "Retail & hospitality",
  "Kitchen & catering assistants": "Retail & hospitality",
  "Waiters & waitresses": "Retail & hospitality",
  "Bar staff": "Retail & hospitality",
  "Catering & bar managers": "Retail & hospitality",
  "Hairdressers & barbers": "Retail & hospitality",

  Doctors: "Health & care",
  Nurses: "Health & care",
  "Nursing assistants": "Health & care",
  Paramedics: "Health & care",
  Dentists: "Health & care",
  Pharmacists: "Health & care",
  "Care workers & home carers": "Health & care",
  "Social workers": "Health & care",

  "Secondary school teachers": "Education & childcare",
  "Primary & nursery teachers": "Education & childcare",
  "Further education lecturers": "Education & childcare",
  "Teaching assistants": "Education & childcare",
  "Other education professionals": "Education & childcare",
  Childminders: "Education & childcare",
  "Nursery nurses & assistants": "Education & childcare",

  Farmers: "Land, cleaning & environment",
  "Gardeners & landscapers": "Land, cleaning & environment",
  Cleaners: "Land, cleaning & environment",
  "Refuse collectors": "Land, cleaning & environment",
};

export function family(o: Occupation): Family {
  const f = familyOf[o.name];
  if (!f) throw new Error(`No job family for "${o.name}"`);
  return f;
}

export interface FamilyGroup {
  name: Family;
  jobs: Occupation[];
  women: number;
  men: number;
  total: number;
  femalePct: number;
}

export const families: FamilyGroup[] = FAMILY_ORDER.map((name) => {
  const jobs = occupations.filter((o) => family(o) === name).sort((a, b) => b.total - a.total);
  const women = jobs.reduce((s, o) => s + o.women, 0);
  const men = jobs.reduce((s, o) => s + o.men, 0);
  return { name, jobs, women, men, total: women + men, femalePct: (100 * women) / (women + men) };
});

/* ------------------------------------------------------------------ */
/* Aggregate metrics                                                   */
/* ------------------------------------------------------------------ */

export const totals = {
  women: occupations.reduce((s, o) => s + o.women, 0),
  men: occupations.reduce((s, o) => s + o.men, 0),
};

/** Duncan dissimilarity index across the jobs shown (0 = identical mix everywhere, 1 = total separation). */
export const dissimilarity =
  0.5 * occupations.reduce((s, o) => s + Math.abs(o.men / totals.men - o.women / totals.women), 0);

export type Sex = "men" | "women";

/** Cumulative share of one sex covered by its top-N jobs, N = 1..all. */
export function concentration(sex: Sex): number[] {
  const tot = totals[sex];
  const sorted = occupations.map((o) => o[sex]).sort((a, b) => b - a);
  let run = 0;
  return sorted.map((v) => (run += v) / tot);
}

export function shareInJobsDominatedBy(sex: Sex, threshold: number): number {
  const own = (o: Occupation) => (sex === "women" ? o.femalePct : o.malePct);
  return occupations.filter((o) => own(o) >= threshold).reduce((s, o) => s + o[sex], 0) / totals[sex];
}

/** Members of `sex` working in jobs dominated (≥ threshold %) by the other sex. */
export function crossover(sex: Sex, threshold = 70): number {
  const other = (o: Occupation) => (sex === "women" ? o.malePct : o.femalePct);
  return occupations.filter((o) => other(o) >= threshold).reduce((s, o) => s + o[sex], 0);
}

/** Largest-remainder rounding so a set of shares adds up to exactly `total`. */
export function apportion(values: number[], total: number): number[] {
  const sum = values.reduce((a, b) => a + b, 0) || 1;
  const raw = values.map((v) => (v / sum) * total);
  const out = raw.map(Math.floor);
  let left = total - out.reduce((a, b) => a + b, 0);
  raw
    .map((r, i) => ({ i, rem: r - Math.floor(r) }))
    .sort((a, b) => b.rem - a.rem)
    .forEach(({ i }) => {
      if (left > 0) {
        out[i]++;
        left--;
      }
    });
  return out;
}

/* ------------------------------------------------------------------ */
/* Squarified treemap                                                  */
/* ------------------------------------------------------------------ */

export interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
}

export function squarify<T>(items: { value: number; data: T }[], box: Rect): (Rect & { data: T })[] {
  const total = items.reduce((s, i) => s + i.value, 0);
  if (total <= 0 || box.w <= 0 || box.h <= 0) return [];
  const scale = (box.w * box.h) / total;
  const nodes = [...items].sort((a, b) => b.value - a.value).map((i) => ({ area: i.value * scale, data: i.data }));
  const out: (Rect & { data: T })[] = [];
  let { x, y, w, h } = box;

  const worst = (row: number[], side: number) => {
    const s = row.reduce((a, b) => a + b, 0);
    const max = Math.max(...row);
    const min = Math.min(...row);
    return Math.max((side * side * max) / (s * s), (s * s) / (side * side * min));
  };

  let i = 0;
  while (i < nodes.length) {
    const side = Math.min(w, h);
    const row: typeof nodes = [nodes[i]];
    i++;
    while (i < nodes.length) {
      const cur = worst(row.map((n) => n.area), side);
      const next = worst([...row, nodes[i]].map((n) => n.area), side);
      if (next > cur) break;
      row.push(nodes[i]);
      i++;
    }
    const rowArea = row.reduce((s, n) => s + n.area, 0);
    if (w >= h) {
      const rw = rowArea / h;
      let cy = y;
      for (const n of row) {
        const nh = n.area / rw;
        out.push({ x, y: cy, w: rw, h: nh, data: n.data });
        cy += nh;
      }
      x += rw;
      w -= rw;
    } else {
      const rh = rowArea / w;
      let cx = x;
      for (const n of row) {
        const nw = n.area / rh;
        out.push({ x: cx, y, w: nw, h: rh, data: n.data });
        cx += nw;
      }
      y += rh;
      h -= rh;
    }
  }
  return out;
}

/* ------------------------------------------------------------------ */
/* Beeswarm: place circles along x without overlap                     */
/* ------------------------------------------------------------------ */

export function beeswarm<T>(
  items: { x: number; r: number; data: T }[],
  pad = 1.5,
): { x: number; y: number; r: number; data: T }[] {
  const placed: { x: number; y: number; r: number; data: T }[] = [];
  // biggest first so large bubbles sit near the axis
  for (const it of [...items].sort((a, b) => b.r - a.r)) {
    let best = 0;
    const candidates = [0];
    for (const p of placed) {
      const dx = Math.abs(p.x - it.x);
      const reach = p.r + it.r + pad;
      if (dx < reach) {
        const dy = Math.sqrt(reach * reach - dx * dx);
        candidates.push(p.y + dy, p.y - dy);
      }
    }
    candidates.sort((a, b) => Math.abs(a) - Math.abs(b));
    for (const y of candidates) {
      const clash = placed.some((p) => {
        const reach = p.r + it.r + pad;
        return (p.x - it.x) ** 2 + (p.y - y) ** 2 < reach * reach - 0.01;
      });
      if (!clash) {
        best = y;
        break;
      }
    }
    placed.push({ x: it.x, y: best, r: it.r, data: it.data });
  }
  return placed;
}
