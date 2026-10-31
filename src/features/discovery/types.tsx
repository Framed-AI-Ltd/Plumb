// Finding, viewing, and bringing in information (F-S07, F-S13, F-S15, F-S17, F-C06, F-C20, F-H03, F-H12).

/* ---------- Photos (F-C06, F-H03, F-H08, F-H48) ---------- */
export interface MediaItem {
  id: string; src: string; alt: string; room?: string; takenAt?: Date | string; source?: string;
  /** AI-generated or edited imagery (concepts, renders). Always labelled so it's never mistaken for a photo (F-H22, F-C66). */
  generated?: { by: string };
}
