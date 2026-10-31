import { type ElementType,type HTMLAttributes } from "react";
import { cx } from "../cx";

/** Decorative ramps for categories (trades, rooms, people). Never for status. */
export type CategoryColor = "rose" | "clay" | "honey" | "sage" | "lake" | "spruce" | "brand" | "gray";
export interface CardProps extends HTMLAttributes<HTMLElement> {
  padding?: "none" | "sm" | "md";
  /** `default` floats on a soft shadow; `tinted` is a light category panel; `paper` lifts documents. */
  variant?: "default" | "subtle" | "tinted" | "paper";
  /** Category colour for the `tinted` variant. */
  color?: CategoryColor;
  as?: ElementType;
}
/** Opaque content surface separated by soft depth, never by an outline. */
export function Card({ padding = "md", variant = "default", color, as: As = "section", className, ...props }: CardProps) {
  return (
    <As
      {...props}
      className={cx("plumb-card", className)}
      data-padding={padding}
      data-variant={variant}
      data-color={variant === "tinted" ? (color ?? "brand") : undefined}
    />
  );
}
