import { cx } from "../styles/classes";
// Shared field parts: label row, description and error, focus handle, and the calendar grid.
// Internal to Plumb (not exported from the package index).
import { CircleAlert } from "../icons";
import { type ReactNode } from "react";
import {
FieldError,
Text
} from "react-aria-components";
import type { FieldChrome } from "./types";

/** `hiddenDescription` is read by screen readers only (e.g. a field's unit) and takes no space. */
export function FieldFoot({ description, errorMessage, hiddenDescription }: Pick<FieldChrome, "description" | "errorMessage"> & { hiddenDescription?: ReactNode }) {
  return (
    <>
      {description ? (
        <Text slot="description" className={cx("plumb-description")}>
          {description}{hiddenDescription && <span className={cx("plumb-element-span", "plumb-sr-only")}> {hiddenDescription}</span>}
        </Text>
      ) : hiddenDescription ? <Text slot="description" className={cx("plumb-sr-only")}>{hiddenDescription}</Text> : null}
      <FieldError className={cx("plumb-field-error")}>
        {(v) => (
          <>
            <CircleAlert aria-hidden />
            {errorMessage ?? v.validationErrors.join(" ")}
          </>
        )}
      </FieldError>
    </>
  );
}
