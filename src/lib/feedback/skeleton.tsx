import type { CSSProperties } from "react";
import { cx } from "../cx";

/** A grey placeholder shaped like the content that is loading. */
export function Skeleton({ width = "100%", height = 14, style, className }: { width?: CSSProperties["width"]; height?: CSSProperties["height"]; style?: CSSProperties; className?: string }) {
  return <span className={cx("plumb-element-span", cx("plumb-skeleton", className))} aria-hidden style={{ inlineSize: width, blockSize: height, ...style }} />;
}
