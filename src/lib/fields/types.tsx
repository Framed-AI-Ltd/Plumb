import { type ReactNode } from "react";
import {
type Key
} from "react-aria-components";

export interface SelectOption {
  id: Key;
  label: string;
  description?: string;
  icon?: ReactNode;
}
