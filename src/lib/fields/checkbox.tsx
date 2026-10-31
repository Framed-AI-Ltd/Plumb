import { Check,Minus } from "../icons";
import { type ReactNode } from "react";
import {
Checkbox as AriaCheckbox,
type CheckboxProps as AriaCheckboxProps
} from "react-aria-components";
import { cx } from "../cx";

export interface CheckboxProps extends Omit<AriaCheckboxProps, "className" | "children"> {
  /** Optional only for table selection, where React Aria supplies the accessible name. */
  children?: ReactNode;
  description?: ReactNode;
}
/** A single yes/no choice, or a row's selection checkbox in tables and grids (`slot="selection"`). */
export function Checkbox({ children, description, className, ...props }: CheckboxProps & { className?: string }) {
  return (
    <AriaCheckbox {...props} className={cx("plumb-check-row", className)}>
      {({ isSelected, isIndeterminate }) => (
        <>
          <span className={cx("plumb-element-span", "plumb-box")} aria-hidden>
            {isIndeterminate ? <Minus /> : isSelected ? <Check /> : null}
          </span>
          {(children || description) && (
            <span className={cx("plumb-element-span")}>
              {children}
              {description && <span className={cx("plumb-element-span", "plumb-item-description")}>{description}</span>}
            </span>
          )}
        </>
      )}
    </AriaCheckbox>
  );
}
