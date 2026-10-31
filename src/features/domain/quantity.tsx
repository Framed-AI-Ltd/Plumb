// Truth primitives: unknowns, money, quantities, sources, lifecycle, visibility, and AI drafts.
import { cx } from "../../lib/cx";
import { useMessages,useNumberFormat } from "../../lib/locale";
import { Unknown } from "./unknown";

export const qtyOptions = { maximumFractionDigits: 2 };
/** A number with its unit; `null` is Unknown, never 0. */
export function Quantity({ value, unit, className }: { value: number | null; unit: string; className?: string }) {
  const fmt = useNumberFormat(qtyOptions);
  const { t } = useMessages();
  if (value === null) return <Unknown className={cx(className)}>{t("unknownUnit", { unit })}</Unknown>;
  return (
    <span className={cx("plumb-element-span", cx("plumb-quantity", className))}>
      {fmt.format(value)}
      <span className={cx("plumb-element-span", "plumb-quantity-unit")}>{unit}</span>
    </span>
  );
}
