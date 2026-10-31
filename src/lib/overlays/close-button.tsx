import { X } from "../icons";
import { IconButton } from "../actions";
import { useMessages } from "../locale";

/** The standard close (×) button used in dialog, drawer, and popover headers. */
export function CloseButton({ onPress, isDisabled }: { onPress: () => void; isDisabled?: boolean }) {
  const { t } = useMessages();
  return <IconButton label={t("close")} icon={<X />} size="sm" onPress={onPress} isDisabled={isDisabled} />;
}
