import { createContext } from "react";
import type { ThemeSettings } from "./types";

export const ThemeContext = createContext<Required<ThemeSettings>>({
  theme: "light",
  brand: "denim",
  neutral: "cream",
  density: "comfortable",
});
