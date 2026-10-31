import { cloneElement, createElement, isValidElement, type ReactNode, type Ref } from "react";
import { Loader as OriginalLoader, CalendarDays as OriginalCalendarDays, Bold as OriginalBold, Italic as OriginalItalic, List as OriginalList, Check as OriginalCheck, ChevronsUpDown as OriginalChevronsUpDown, X as OriginalX, Eye as OriginalEye, EyeOff as OriginalEyeOff, Star as OriginalStar, CircleAlert as OriginalCircleAlert, CircleCheck as OriginalCircleCheck, Info as OriginalInfo, TriangleAlert as OriginalTriangleAlert, ChevronLeft as OriginalChevronLeft, ChevronRight as OriginalChevronRight, Minus as OriginalMinus, Plus as OriginalPlus, Search as OriginalSearch, CircleHelp as OriginalCircleHelp, ArrowDown as OriginalArrowDown, ArrowUp as OriginalArrowUp, ClipboardList as OriginalClipboardList, Lock as OriginalLock, MessageSquare as OriginalMessageSquare, RotateCcw as OriginalRotateCcw, Sparkles as OriginalSparkles, Users as OriginalUsers, Bell as OriginalBell, CalendarClock as OriginalCalendarClock, ClipboardCheck as OriginalClipboardCheck, Gavel as OriginalGavel, CircleSlash as OriginalCircleSlash, CircleDashed as OriginalCircleDashed, ArrowRight as OriginalArrowRight, FileText as OriginalFileText, House as OriginalHouse, MessageCircleQuestion as OriginalMessageCircleQuestion, ImageOff as OriginalImageOff, Maximize as OriginalMaximize, ZoomIn as OriginalZoomIn, ZoomOut as OriginalZoomOut, BadgeCheck as OriginalBadgeCheck, CircleDot as OriginalCircleDot, Link2 as OriginalLink2, Trash2 as OriginalTrash2, Send as OriginalSend, Square as OriginalSquare, Mail as OriginalMail, Phone as OriginalPhone, FileUp as OriginalFileUp, Hourglass as OriginalHourglass, GitBranch as OriginalGitBranch, ShieldCheck as OriginalShieldCheck, Wallet as OriginalWallet, Ruler as OriginalRuler, Megaphone as OriginalMegaphone, Map as OriginalMap, Hash as OriginalHash, MousePointer2 as OriginalMousePointer2, Scaling as OriginalScaling, Spline as OriginalSpline, Mic as OriginalMic, ArrowRightLeft as OriginalArrowRightLeft, Image as OriginalImage, CloudOff as OriginalCloudOff, RefreshCw as OriginalRefreshCw, UserPlus as OriginalUserPlus, History as OriginalHistory, Pencil as OriginalPencil, GripVertical as OriginalGripVertical, Library as OriginalLibrary, Menu as OriginalMenu, type LucideProps } from "lucide-react";
import { cx } from "../styles/classes";

/** Gives authored Lucide icons the same atomic descendant recipes as supplied icons. */
export function icon(Original: typeof OriginalLoader) {
 return function StyledIcon(props: LucideProps & { ref?: Ref<SVGSVGElement> }) {
  return createElement(Original, { ...props, className: cx("plumb-element-svg", props.className) });
 };
}

/** Preserves consumer-provided icons and refs while applying the shared icon recipes. */
export function styleIcon(node: ReactNode): ReactNode {
 if (!isValidElement<{ className?: string }>(node)) return node;
 return cloneElement(node, { className: cx("plumb-element-svg", node.props.className) });
}

export const Loader = icon(OriginalLoader);
export const CalendarDays = icon(OriginalCalendarDays);
export const Bold = icon(OriginalBold);
export const Italic = icon(OriginalItalic);
export const List = icon(OriginalList);
export const Check = icon(OriginalCheck);
export const ChevronsUpDown = icon(OriginalChevronsUpDown);
export const X = icon(OriginalX);
export const Eye = icon(OriginalEye);
export const EyeOff = icon(OriginalEyeOff);
export const Star = icon(OriginalStar);
export const CircleAlert = icon(OriginalCircleAlert);
export const CircleCheck = icon(OriginalCircleCheck);
export const Info = icon(OriginalInfo);
export const TriangleAlert = icon(OriginalTriangleAlert);
export const ChevronLeft = icon(OriginalChevronLeft);
export const ChevronRight = icon(OriginalChevronRight);
export const Minus = icon(OriginalMinus);
export const Plus = icon(OriginalPlus);
export const Search = icon(OriginalSearch);
export const CircleHelp = icon(OriginalCircleHelp);
export const ArrowDown = icon(OriginalArrowDown);
export const ArrowUp = icon(OriginalArrowUp);
export const ClipboardList = icon(OriginalClipboardList);
export const Lock = icon(OriginalLock);
export const MessageSquare = icon(OriginalMessageSquare);
export const RotateCcw = icon(OriginalRotateCcw);
export const Sparkles = icon(OriginalSparkles);
export const Users = icon(OriginalUsers);
export const Bell = icon(OriginalBell);
export const CalendarClock = icon(OriginalCalendarClock);
export const ClipboardCheck = icon(OriginalClipboardCheck);
export const Gavel = icon(OriginalGavel);
export const CircleSlash = icon(OriginalCircleSlash);
export const CircleDashed = icon(OriginalCircleDashed);
export const ArrowRight = icon(OriginalArrowRight);
export const FileText = icon(OriginalFileText);
export const House = icon(OriginalHouse);
export const MessageCircleQuestion = icon(OriginalMessageCircleQuestion);
export const ImageOff = icon(OriginalImageOff);
export const Maximize = icon(OriginalMaximize);
export const ZoomIn = icon(OriginalZoomIn);
export const ZoomOut = icon(OriginalZoomOut);
export const BadgeCheck = icon(OriginalBadgeCheck);
export const CircleDot = icon(OriginalCircleDot);
export const Link2 = icon(OriginalLink2);
export const Trash2 = icon(OriginalTrash2);
export const Send = icon(OriginalSend);
export const Square = icon(OriginalSquare);
export const Mail = icon(OriginalMail);
export const Phone = icon(OriginalPhone);
export const FileUp = icon(OriginalFileUp);
export const Hourglass = icon(OriginalHourglass);
export const GitBranch = icon(OriginalGitBranch);
export const ShieldCheck = icon(OriginalShieldCheck);
export const Wallet = icon(OriginalWallet);
export const Ruler = icon(OriginalRuler);
export const Megaphone = icon(OriginalMegaphone);
export const Map = icon(OriginalMap);
export const Hash = icon(OriginalHash);
export const MousePointer2 = icon(OriginalMousePointer2);
export const Scaling = icon(OriginalScaling);
export const Spline = icon(OriginalSpline);
export const Mic = icon(OriginalMic);
export const ArrowRightLeft = icon(OriginalArrowRightLeft);
export const Image = icon(OriginalImage);
export const CloudOff = icon(OriginalCloudOff);
export const RefreshCw = icon(OriginalRefreshCw);
export const UserPlus = icon(OriginalUserPlus);
export const History = icon(OriginalHistory);
export const Pencil = icon(OriginalPencil);
export const GripVertical = icon(OriginalGripVertical);
export const Library = icon(OriginalLibrary);
export const Menu = icon(OriginalMenu);

export type { LucideIcon, LucideProps } from "lucide-react";
