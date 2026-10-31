import type en from "../../i18n/en.json";

/* ---------- Component text (F-S19) ---------- */
// Every word a component shows comes from these catalogues. Apps override any key through
// LocaleProvider `messages`; `fr.json` must have every key in `en.json` (checked by TypeScript).
export type PluralForms = Partial<Record<Intl.LDMLPluralRule, string>> & { other: string };
export type Catalogue = typeof en;
export type Messages = { [K in keyof Catalogue]: Catalogue[K] extends string ? string : PluralForms };
