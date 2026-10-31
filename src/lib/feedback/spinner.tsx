import { Loader } from "../icons";
import { cx } from "../cx";
import { useMessages } from "../locale";

/** Inline busy indicator for a region that has no better skeleton. Announces its label once. */
export function Spinner({ label, size = "md", className }: { label?: string; size?: "sm" | "md"; className?: string }) {
  const { t } = useMessages();
  return (
    <span className={cx("plumb-element-span", cx("plumb-spinner", className))} data-size={size} role="status">
      <Loader className={cx("plumb-spin")} aria-hidden />
      <span className={cx("plumb-element-span", "plumb-sr-only")}>{label ?? t("loading")}</span>
    </span>
  );
}
