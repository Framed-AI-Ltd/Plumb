import { type ReactNode } from "react";
import { I18nProvider } from "react-aria-components";
import { CurrencyContext,MessagesContext } from "./helpers";
import type { Messages } from "./types";

export const noMessages = {};
export interface LocaleProviderProps {
  /** BCP 47 locale for numbers, dates, collation, and component text. */
  locale?: string;
  /** ISO 4217 default currency for `Money` and every amount. */
  currency?: string;
  /** Overrides for built-in component text (any key in `en.json`). */
  messages?: Partial<Messages>;
  children: ReactNode;
}
/** Sets the locale, default currency, and text overrides for everything inside. Wrap the app once. */
export function LocaleProvider({ locale = "en-CA", currency = "CAD", messages, children }: LocaleProviderProps) {
  return (
    <I18nProvider locale={locale}>
      <CurrencyContext value={currency}>
        <MessagesContext value={messages ?? noMessages}>{children}</MessagesContext>
      </CurrencyContext>
    </I18nProvider>
  );
}
