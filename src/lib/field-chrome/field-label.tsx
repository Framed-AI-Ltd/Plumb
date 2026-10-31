import { cx } from "../styles/classes";
// Shared field parts: label row, description and error, focus handle, and the calendar grid.
// Internal to Plumb (not exported from the package index).
import {
ButtonContext,
Label,
PopoverContext,
Provider
} from "react-aria-components";
import { useMessages } from "../locale";
import type { FieldChrome } from "./types";

export function FieldLabel({ label, optional, labelAside }: Pick<FieldChrome, "label" | "optional" | "labelAside">) {
  const { t } = useMessages();
  // Fields inside tables pass aria-label instead of a visible label.
  if (!label && !labelAside) return null;
  return (
    <div className={cx("plumb-element-div", "plumb-label-row")}>
      {label ? (
        <Label className={cx("plumb-label")}>
          {label}
          {optional && <span className={cx("plumb-element-span", "plumb-label-optional")}>{t("optional")}</span>}
        </Label>
      ) : <span className={cx("plumb-element-span")} />}
      {/* Isolate the aside from the field's slots so a button in it (e.g. Provenance) stays independent. */}
      {labelAside && <Provider values={[[ButtonContext, null], [PopoverContext, null]]}>{labelAside}</Provider>}
    </div>
  );
}
