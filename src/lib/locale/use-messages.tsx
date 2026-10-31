import { Fragment,useContext,useMemo,type ReactNode } from "react";
import { useLocale } from "react-aria-components";
import en from "../../i18n/en.json";
import fr from "../../i18n/fr.json";
import { MessagesContext } from "./helpers";
import type { Catalogue,Messages,PluralForms } from "./types";

export type MessageKey = { [K in keyof Catalogue]: Catalogue[K] extends string ? K : never }[keyof Catalogue];
export type PluralKey = Exclude<keyof Catalogue, MessageKey>;
export const catalogues: Record<string, Messages> = { en, fr: fr satisfies Messages };
export type Vars = Record<string, string | number>;
export const fill = (text: string, vars?: Vars) => (vars ? text.replace(/\{(\w+)\}/g, (m, k: string) => (k in vars ? String(vars[k]) : m)) : text);
/**
 * `t("optional")`, `t("removeName", { name })`, `plural("filesAdded", 3)`, and `rich("validUntil", { date: <DateTime …/> })`
 * for sentences with elements inside. Unknown locales fall back to English.
 */
export function useMessages() {
  const { locale } = useLocale();
  const overrides = useContext(MessagesContext);
  return useMemo(() => {
    const lang = locale.split("-")[0];
    const base = { ...catalogues.en, ...catalogues[lang], ...overrides } as Messages;
    const rules = new Intl.PluralRules(locale);
    const nf = new Intl.NumberFormat(locale);
    return {
      t: (key: MessageKey, vars?: Vars) => fill(base[key] as string, vars),
      plural: (key: PluralKey, n: number, vars?: Vars) => {
        const forms = base[key] as PluralForms;
        return fill(forms[rules.select(n)] ?? forms.other, { ...vars, n: nf.format(n) });
      },
      rich: (key: MessageKey, vars: Record<string, ReactNode>) =>
        (base[key] as string).split(/(\{\w+\})/).map((part, i) => {
          const name = /^\{(\w+)\}$/.exec(part)?.[1];
          return <Fragment key={i}>{name && name in vars ? vars[name] : part}</Fragment>;
        }),
    };
  }, [locale, overrides]);
}
