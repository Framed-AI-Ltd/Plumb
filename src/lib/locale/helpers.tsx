import { createContext } from "react";
import type { Messages } from "./types";

/** Locale and default currency for every formatted number, amount, and date (F-S19). */
export const CurrencyContext = createContext("CAD");
export const MessagesContext = createContext<Partial<Messages>>({});
