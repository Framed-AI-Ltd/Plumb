import { useContext } from "react";
import { CurrencyContext } from "./helpers";

/** The default ISO 4217 currency from LocaleProvider. */
export const useCurrency = () => useContext(CurrencyContext);
