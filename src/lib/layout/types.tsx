import { type ElementType,type HTMLAttributes,type ReactNode } from "react";

export type Space = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
export type Align = "start" | "center" | "end" | "stretch" | "baseline";
export interface FlexProps extends HTMLAttributes<HTMLElement> {
  gap?: Space;
  align?: Align;
  justify?: "start" | "center" | "end" | "between";
  as?: ElementType;
  children?: ReactNode;
}
