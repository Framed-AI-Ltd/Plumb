import { cx } from "../cx";
import { Avatar } from "./avatar";

/** A row of overlapping avatars, announced as one list of names. */
export function AvatarGroup({ names, className }: { names: string[]; className?: string }) {
  return (
    <span className={cx("plumb-element-span", cx("plumb-avatar-group", className))} role="group" aria-label={names.join(", ")}>
      {names.map((n) => <Avatar key={n} name={n} />)}
    </span>
  );
}
