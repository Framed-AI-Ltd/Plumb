// Spatial and media records: floor plans, before/after photos, voice notes, and measured takeoffs
// (F-H12, F-H15, F-H16, F-H18, F-H19, F-H46, F-C07, F-C17, F-C19, F-H48).
import { Mic,Square } from "../../lib/icons";
import { useEffect,useId,useRef,useState } from "react";
import { Button } from "../../lib/actions";
import { cx } from "../../lib/cx";
import { Badge,Callout } from "../../lib/feedback";
import { useMessages } from "../../lib/locale";

/* ---------- Voice notes (F-C07) ---------- */
export interface VoiceNoteProps {
  /** A saved recording to play back. */
  src?: string;
  /** The transcript; shown as an AI draft until `transcriptReviewed`. */
  transcript?: string;
  transcriptReviewed?: boolean;
  /** Called with the finished recording. Recording only starts after the person confirms consent. */
  onRecord?: (audio: Blob) => void;
  /** Wording of the consent the app requires, e.g. that everyone present agreed to be recorded. */
  consentText: string;
  className?: string;
}
/** Record or play a site voice note. Consent is confirmed first; the transcript is a draft until reviewed. */
export function VoiceNote({ src, transcript, transcriptReviewed, onRecord, consentText, className }: VoiceNoteProps) {
  const { t } = useMessages();
  const [state, setState] = useState<"idle" | "consent" | "permission" | "recording" | "error">("idle");
  const [seconds, setSeconds] = useState(0);
  const recorder = useRef<MediaRecorder | null>(null);
  const generation = useRef(0);
  const starting = useRef(false);
  const transcriptId = useId();
  useEffect(() => {
    if (state !== "recording") return;
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [state]);
  const mounted = useRef(true);
  // Going away mid-recording (or mid-permission-prompt) releases the microphone and reports nothing.
  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
      generation.current += 1;
      starting.current = false;
      const rec = recorder.current;
      if (rec && rec.state !== "inactive") rec.stop();
      rec?.stream.getTracks().forEach((track) => track.stop());
    };
  }, []);
  const cancel = () => {
    generation.current += 1;
    starting.current = false;
    setState("idle");
  };
  const start = async () => {
    if (starting.current) return;
    starting.current = true;
    const attempt = ++generation.current;
    setState("permission");
    let stream: MediaStream | undefined;
    let rec: MediaRecorder | undefined;
    try {
      stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      if (!mounted.current || attempt !== generation.current) { stream.getTracks().forEach((track) => track.stop()); return; }
      const chunks: Blob[] = [];
      rec = new MediaRecorder(stream);
      const activeRecorder = rec;
      const activeStream = stream;
      rec.ondataavailable = (e) => chunks.push(e.data);
      rec.onstop = () => {
        activeStream.getTracks().forEach((track) => track.stop());
        if (!mounted.current || attempt !== generation.current) return;
        recorder.current = null;
        setState("idle");
        onRecord?.(new Blob(chunks, { type: activeRecorder.mimeType }));
      };
      recorder.current = rec;
      rec.start();
      setSeconds(0);
      setState("recording");
    } catch {
      // A granted stream must also be released when construction or start fails.
      if (rec) { rec.onstop = null; if (rec.state !== "inactive") rec.stop(); }
      stream?.getTracks().forEach((track) => track.stop());
      if (mounted.current && attempt === generation.current) { recorder.current = null; setState("error"); }
    } finally {
      if (attempt === generation.current) starting.current = false;
    }
  };
  const mmss = `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;
  return (
    <div className={cx("plumb-element-div", cx("plumb-voice", className))}>
      {/* The transcript below is the text alternative for the recording (WCAG 1.2.1). */}
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      {src && <audio className={cx("plumb-element-audio", "plumb-voice-audio")} controls src={src} aria-label={t("voiceNote")} aria-describedby={transcript ? transcriptId : undefined} />}
      {onRecord && state === "idle" && <Button icon={<Mic />} onPress={() => setState("consent")}>{t("recordVoiceNote")}</Button>}
      {(state === "consent" || state === "permission") && (
        <Callout tone="info" title={t("beforeRecording")} actions={<><Button size="sm" variant="primary" icon={<Mic />} isPending={state === "permission"} onPress={start}>{t("everyoneAgreed")}</Button><Button size="sm" variant="ghost" onPress={cancel}>{t("cancel")}</Button></>}>{consentText}</Callout>
      )}
      {state === "recording" && (
        <div className={cx("plumb-element-div", "plumb-voice-recording")}>
          {/* Announce "Recording" once; the ticking timer stays out of the live region. */}
          <span className={cx("plumb-element-span", "plumb-voice-dot")} aria-hidden /> <span role="status" className={cx("plumb-element-span")}>{t("recording")}</span> <span className={cx("plumb-element-span", "plumb-num")} aria-hidden>{mmss}</span>
          <Button size="sm" variant="secondary" icon={<Square />} onPress={() => recorder.current?.stop()}>{t("stopRecording")}</Button>
        </div>
      )}
      {state === "error" && <Callout tone="danger" live title={t("microphoneUnavailable")}>{t("microphoneHelp")}</Callout>}
      {transcript && (
        <div id={transcriptId} className={cx("plumb-element-div", "plumb-voice-transcript")} data-draft={!transcriptReviewed || undefined}>
          {!transcriptReviewed && <Badge tone="accent" variant="dashed">{t("aiDraft")}</Badge>}
          <p className={cx("plumb-element-p")}>{transcript}</p>
        </div>
      )}
    </div>
  );
}
