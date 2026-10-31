import { cx } from "../cx";
import type { CategoryColor } from "../layout";
import { avatarColors } from "./helpers";

export interface AvatarProps {
  name: string;
  /** Defaults to a stable category colour derived from the name. */
  color?: CategoryColor;
}
/** Initials in a stable category colour; announced as the person's name. */
export function Avatar({ name, color, className }: AvatarProps & { className?: string }) {
  const initials = name.split(/\s+/).map((w) => w[0]).slice(0, 2).join("").toUpperCase();
  const hash = [...name].reduce((h, ch) => h + ch.charCodeAt(0), 0);
  return (
    <span className={cx("plumb-element-span", cx("plumb-avatar", className))} data-color={color ?? avatarColors[hash % avatarColors.length]} data-color-explicit={color ? "" : undefined} role="img" aria-label={name}>
      {initials}
    </span>
  );
}
