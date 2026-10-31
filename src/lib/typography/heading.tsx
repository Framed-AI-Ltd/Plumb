import type { HTMLAttributes } from "react";
import { cx } from "../cx";

// Card and panel titles sit directly under the page title, so subheading defaults to h2.
export const tags = { display: "h1", title: "h1", heading: "h2", subheading: "h2" } as const;
export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  /** Visual level. */
  level?: keyof typeof tags;
  /** Semantic element; defaults from the visual level. */
  as?: "h1" | "h2" | "h3" | "h4";
}
/** Plus Jakarta Sans headings. */
export function Heading({ level = "heading", as, className, ...props }: HeadingProps) {
  const Tag = as ?? tags[level];
  return <Tag {...props} className={cx("plumb-heading", className)} data-level={level} />;
}
