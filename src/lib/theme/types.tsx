
export type PlumbTheme = "light" | "dark";
/** Denim is the only brand colour. */
export type PlumbBrand = "denim";
export interface ThemeSettings {
  theme?: PlumbTheme;
  brand?: PlumbBrand;
  /** `cream` (default) is warm and homey; `grey` is Ant's neutral grey. */
  neutral?: "cream" | "grey";
  density?: "comfortable" | "compact";
}
