// Working together: threads and RFIs, tasks and punch lists, assistant task progress, notifications
// (F-S12, F-S14, F-C39, F-C40, F-C41, F-C42, F-C59, F-M24).
import {
Bell,CalendarClock,Check,
ClipboardCheck,Gavel,
MessageSquare
} from "../../lib/icons";

export const isPast = (d: Date | string) => new Date(typeof d === "string" && /^\d{4}-\d{2}-\d{2}$/.test(d) ? `${d}T23:59:59` : d) < new Date();
export const notificationIcons = { assignment: ClipboardCheck, deadline: CalendarClock, comment: MessageSquare, approval: Check, reminder: Bell, bid: Gavel };
