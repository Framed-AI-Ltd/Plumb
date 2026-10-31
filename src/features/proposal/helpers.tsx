import { cx } from "../../lib/styles/classes";
// Proposal document and payment schedule (F-C29, F-C30, F-C26, F-S11).
import type { Letterhead } from "./types";

/** The firm's identity at the top of customer documents. Renders nothing without a letterhead. */
export function DocumentLetterhead({ firm, letterhead }: { firm: string; letterhead?: Letterhead }) {
  if (!letterhead) return null;
  return (
    <div className={cx("plumb-element-div", "plumb-letterhead")}>
      {letterhead.logo && <span className={cx("plumb-element-span", "plumb-letterhead-logo")}>{letterhead.logo}</span>}
      <div className={cx("plumb-element-div", "plumb-letterhead-text")}>
        <span className={cx("plumb-element-span", "plumb-label")}>{firm}</span>
        {letterhead.address && <span className={cx("plumb-element-span", "plumb-item-description")}>{letterhead.address}</span>}
        {(letterhead.registration || letterhead.contact) && <span className={cx("plumb-element-span", "plumb-item-description")}>{[letterhead.registration, letterhead.contact].filter(Boolean).map((x, k) => <span key={k} className={cx("plumb-element-span")}>{k > 0 && " · "}{x}</span>)}</span>}
      </div>
    </div>
  );
}
export const pctOptions: Intl.NumberFormatOptions = { style: "percent", maximumFractionDigits: 2 };
