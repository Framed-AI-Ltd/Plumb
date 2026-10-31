import { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { AccessManager, ApprovalRequest, CommentThread, Composer, FactField, LineItemGrid, VoiceNote, type LineItemRow } from "../../src";
import "../../src/styles/index.css";

declare global {
  interface Window {
    fixture: {
      reorder: () => void;
      removeFirst: () => void;
      hideVoice: () => void;
      resolveSend: () => void;
      failSend: () => void;
      changeRevision: () => void;
      changeTerms: () => void;
      resolvePost: () => void;
      failPost: () => void;
    };
  }
}

function Fixture() {
  const [revision, setRevision] = useState("R1");
  const [terms, setTerms] = useState("Original terms");
  const [expiry] = useState(() => new Date(Date.now() + 60000).toISOString());
  const [approved, setApproved] = useState(0);
  const [voice, setVoice] = useState(true);
  const [recordings, setRecordings] = useState(0);
  const [rows, setRows] = useState<LineItemRow[]>([
    { id: "a", label: "Alpha", qty: 1, unit: "ea", rate: 10, rateId: "library-a" },
    { id: "b", label: "Beta", qty: 2, unit: "ea", rate: 20, rateId: "library-b" },
  ]);
  const [postFailure, setPostFailure] = useState(false);
  const [failure, setFailure] = useState(false);
  useEffect(() => { window.fixture = {
    changeRevision: () => setRevision("R2"),
    changeTerms: () => setTerms("Updated terms"),
    reorder: () => setRows((current) => [...current].reverse()),
    removeFirst: () => setRows((current) => current.filter((r) => r.id !== "a")),
    hideVoice: () => setVoice(false),
    resolveSend: () => resolveSend?.(),
    failSend: () => setFailure(true),
    resolvePost: () => resolvePost?.(),
    failPost: () => setPostFailure(true),
  }; }, []);
  return <main>
    <ApprovalRequest revision={revision} option="Fixture option" amount={100} taxBasis="incl" consentText="Fixture consent" conditions={[terms]} expiresAt={expiry} onApprove={() => setApproved((n) => n + 1)} />
    <output data-testid="approved">{approved}</output>
    {voice && <VoiceNote consentText="Consent fixture" onRecord={() => setRecordings((n) => n + 1)} />}
    <output data-testid="recordings">{recordings}</output>
    <LineItemGrid aria-label="Estimate fixture" rows={rows} onRowsChange={setRows} units={["ea"]} />
    <output data-testid="rows">{JSON.stringify(rows)}</output>
    <CommentThread title="Thread fixture" comments={[]} onPost={() => {
      if (postFailure) throw new Error("Fixture post failure");
      return new Promise<void>((resolve) => { resolvePost = resolve; });
    }} />
    <FactField label="Serial fixture" value="Original serial" provenance="supplied" onChange={() => { throw new Error("Fixture correction failure"); }} />
    <AccessManager members={[]} roles={[{ id: "owner", label: "Owner" }, { id: "viewer", label: "Viewer" }]} defaultInviteRole="viewer" onInvite={() => { throw new Error("Fixture invite failure"); }} />
    <Composer label="Message fixture" onSubmit={() => {
      if (failure) throw new Error("Fixture send failure");
      return new Promise<void>((resolve) => { resolveSend = resolve; });
    }} />
  </main>;
}
let resolvePost: (() => void) | undefined;
let resolveSend: (() => void) | undefined;
createRoot(document.getElementById("root")!).render(<Fixture />);
