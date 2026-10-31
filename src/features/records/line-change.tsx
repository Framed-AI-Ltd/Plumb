// Revisions, facts, and access (F-S01, F-S03, F-S04, F-S06, F-S07, F-C05, F-C34, F-C38, F-H10, F-H35, F-M19).
import { same } from "./helpers";
import type { DiffLine,LineChange } from "./types";

/** How one line changed between revisions. */
export const lineChange = (l: DiffLine): LineChange => (!l.before ? "added" : !l.after ? "removed" : same(l.before, l.after) ? "unchanged" : "changed");
