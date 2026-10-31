import { useContext } from "react";
import { ThemeContext } from "./helpers";

/** The current ThemeProvider settings. */
export const useTheme = () => useContext(ThemeContext);
