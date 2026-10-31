// Finding, viewing, and bringing in information (F-S07, F-S13, F-S15, F-S17, F-C06, F-C20, F-H03, F-H12).
import {
ImageOff
} from "../../lib/icons";
import { useState } from "react";
import { cx } from "../../lib/cx";

/** An image that shows its description in a neutral tile if it fails to load. */
export function MediaImage({ src, alt, className }: { src: string; alt: string; className?: string }) {
  const [failed, setFailed] = useState<string | null>(null);
  if (failed === src) return <span className={cx("plumb-element-span", cx("plumb-media-fallback", className))} role="img" aria-label={alt}><ImageOff aria-hidden /><span aria-hidden className={cx("plumb-element-span")}>{alt}</span></span>;
  return <img src={src} alt={alt} loading="lazy" decoding="async" className={cx("plumb-element-img", className)} onError={() => setFailed(src)} />;
}
