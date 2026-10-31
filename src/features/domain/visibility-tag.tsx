// Truth primitives: unknowns, money, quantities, sources, lifecycle, visibility, and AI drafts.
import {
Lock,
Users
} from "../../lib/icons";
import { Badge } from "../../lib/feedback";
import { useMessages } from "../../lib/locale";

/** Marks whether content is contractor-private or shared with the customer (principle 11). */
export function VisibilityTag({ kind }: { kind: "private" | "shared" }) {
  const { t } = useMessages();
  return kind === "private" ? (
    <Badge tone="neutral" icon={<Lock aria-hidden />}>{t("contractorOnly")}</Badge>
  ) : (
    <Badge tone="accent" icon={<Users aria-hidden />}>{t("sharedWithCustomer")}</Badge>
  );
}
