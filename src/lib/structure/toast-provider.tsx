import { cx } from "../styles/classes";
import { CircleAlert,CircleCheck,Info,X } from "../icons";
import {
Button as AriaButton,
Text as AriaText,
UNSTABLE_Toast as AriaToast,
UNSTABLE_ToastContent as ToastContent,
UNSTABLE_ToastRegion as ToastRegion
} from "react-aria-components";
import { useMessages } from "../locale";
import { toasts } from "./toasts";

export const toastIcon = { neutral: Info, success: CircleCheck, danger: CircleAlert };
/** Renders the toast region. Mount once near the root; show toasts with `toast()`. */
export function ToastProvider() {
  const { t } = useMessages();
  return (
    <ToastRegion queue={toasts} className={cx("plumb-toast-region")}>
      {({ toast }) => {
        const Icon = toastIcon[toast.content.tone ?? "neutral"];
        return (
          <AriaToast toast={toast} className={cx("plumb-toast")} data-tone={toast.content.tone ?? "neutral"}>
            <Icon className={cx("plumb-toast-icon")} aria-hidden />
            <ToastContent className={cx("plumb-toast-content")}>
              <AriaText slot="title" className={cx("plumb-toast-title")}>{toast.content.title}</AriaText>
              {toast.content.description && <AriaText slot="description" className={cx("plumb-toast-description")}>{toast.content.description}</AriaText>}
            </ToastContent>
            {toast.content.action && (
              <AriaButton className={cx("plumb-button plumb-focusable")} data-variant="ghost" data-size="sm" onPress={() => { toast.content.action!.onAction(); toasts.close(toast.key); }}>
                {toast.content.action.label}
              </AriaButton>
            )}
            <AriaButton slot="close" className={cx("plumb-button plumb-focusable")} data-variant="ghost" data-size="sm" data-icon-only aria-label={t("dismiss")}><X aria-hidden /></AriaButton>
          </AriaToast>
        );
      }}
    </ToastRegion>
  );
}
