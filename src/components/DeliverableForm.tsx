"use client";

import { useState, type FormEvent } from "react";
import Confetti from "@/components/Confetti";

/**
 * Deliverable submission form for the intern roadmap. Posts to /api/deliverable,
 * which stores the submission in Airtable. Collapsed behind a button until the
 * intern is ready to submit.
 */
export default function DeliverableForm({
  week,
  folderUrl,
}: {
  week: number;
  folderUrl: string;
}) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");
  const [error, setError] = useState("");

  const [title, setTitle] = useState("");
  const [driveLink, setDriveLink] = useState("");
  const [description, setDescription] = useState("");
  const [processText, setProcessText] = useState("");
  const [aiUsage, setAiUsage] = useState("");
  const [learned, setLearned] = useState("");
  const [didWell, setDidWell] = useState("");
  const [toImprove, setToImprove] = useState("");
  const [hours, setHours] = useState("");
  const [timeNotes, setTimeNotes] = useState("");
  const [company, setCompany] = useState(""); // honeypot

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    if (!title.trim()) return setError("Please give your deliverable a name.");
    if (!/^https?:\/\/\S+/i.test(driveLink.trim()))
      return setError("Please paste a valid Drive link (starting with https://).");

    setStatus("loading");
    try {
      const res = await fetch("/api/deliverable", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          driveLink,
          description,
          process: processText,
          aiUsage,
          learned,
          didWell,
          toImprove,
          hours,
          timeNotes,
          week,
          intern: "Pranav Eppanapally",
          company,
        }),
      });
      const payload = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(payload.error ?? "Could not submit. Please try again.");
      setStatus("done");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("idle");
    }
  }

  function reset() {
    setTitle("");
    setDriveLink("");
    setDescription("");
    setProcessText("");
    setAiUsage("");
    setLearned("");
    setDidWell("");
    setToImprove("");
    setHours("");
    setTimeNotes("");
    setError("");
    setStatus("idle");
  }

  const input =
    "w-full rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-[15px] text-white outline-none transition placeholder:text-white/40 focus:border-white/50";
  const label = "mb-1.5 block text-[13px] font-medium text-white/80";

  if (status === "done") {
    return (
      <>
        <Confetti />
        <div className="glass rounded-2xl p-6 text-center">
        <p className="text-2xl text-white" style={{ fontFamily: "var(--font-instrument)" }}>
          Deliverable submitted.
        </p>
        <p className="mx-auto mt-2 max-w-md text-[14px] text-white/75">
          Nice work. Madhuri will see it in the next check-in.
        </p>
        <button
          type="button"
          onClick={() => {
            reset();
          }}
          className="mt-5 rounded-full border border-white/25 px-5 py-2.5 text-[14px] font-semibold text-white transition-colors hover:bg-white/10"
        >
          Submit another
        </button>
        </div>
      </>
    );
  }

  if (!open) {
    return (
      <div className="glass flex flex-col items-start gap-3 rounded-2xl p-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-[1.2rem] text-white" style={{ fontFamily: "var(--font-instrument)" }}>
            Ready to turn something in?
          </p>
          <p className="mt-1 text-[14px] text-white/75">
            Submit a deliverable and log how it went.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="shrink-0 rounded-full bg-white px-6 py-3 text-[15px] font-semibold text-ink transition-all hover:shadow-lg hover:shadow-black/20 active:scale-[0.98]"
        >
          Submit a deliverable
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="glass rounded-2xl p-6">
      <p className="text-[1.3rem] text-white" style={{ fontFamily: "var(--font-instrument)" }}>
        Submit a deliverable
      </p>
      <p className="mt-1.5 text-[13.5px] text-white/70">
        Save your file to your{" "}
        <a href={folderUrl} target="_blank" rel="noopener noreferrer" className="text-spectrum hover:underline">
          intern folder
        </a>
        , then paste the link below.
      </p>

      <div className="mt-5 space-y-4">
        <div>
          <label className={label} htmlFor="d-title">Deliverable name</label>
          <input id="d-title" className={input} value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Refined assessment model v1" />
        </div>
        <div>
          <label className={label} htmlFor="d-link">Google Drive link</label>
          <input id="d-link" className={input} value={driveLink} onChange={(e) => setDriveLink(e.target.value)} placeholder="https://drive.google.com/..." inputMode="url" />
        </div>
        <div>
          <label className={label} htmlFor="d-desc">What is it?</label>
          <textarea id="d-desc" rows={3} className={input} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe the deliverable." />
        </div>
        <div>
          <label className={label} htmlFor="d-proc">How did you complete it?</label>
          <textarea id="d-proc" rows={3} className={input} value={processText} onChange={(e) => setProcessText(e.target.value)} placeholder="Walk through your process." />
        </div>
        <div>
          <label className={label} htmlFor="d-ai">Did you use AI? Where and how?</label>
          <textarea id="d-ai" rows={3} className={input} value={aiUsage} onChange={(e) => setAiUsage(e.target.value)} placeholder="Which tools, for which parts, and how you used them." />
        </div>
        <div>
          <label className={label} htmlFor="d-learned">What did you learn from this?</label>
          <textarea id="d-learned" rows={3} className={input} value={learned} onChange={(e) => setLearned(e.target.value)} placeholder="What did completing this teach you?" />
        </div>
        <div>
          <label className={label} htmlFor="d-well">What did you do well?</label>
          <textarea id="d-well" rows={2} className={input} value={didWell} onChange={(e) => setDidWell(e.target.value)} placeholder="What are you proud of here?" />
        </div>
        <div>
          <label className={label} htmlFor="d-improve">Where could you have improved?</label>
          <textarea id="d-improve" rows={2} className={input} value={toImprove} onChange={(e) => setToImprove(e.target.value)} placeholder="What would you do differently next time?" />
        </div>
        <div className="grid gap-4 sm:grid-cols-[120px_1fr]">
          <div>
            <label className={label} htmlFor="d-hours">Hours spent</label>
            <input id="d-hours" type="number" min="0" step="0.5" className={input} value={hours} onChange={(e) => setHours(e.target.value)} placeholder="e.g. 4" />
          </div>
          <div>
            <label className={label} htmlFor="d-why">Why did it take that long?</label>
            <input id="d-why" className={input} value={timeNotes} onChange={(e) => setTimeNotes(e.target.value)} placeholder="What made it quick or slow?" />
          </div>
        </div>
      </div>

      {/* honeypot */}
      <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="d-company">Company</label>
        <input id="d-company" tabIndex={-1} autoComplete="off" value={company} onChange={(e) => setCompany(e.target.value)} />
      </div>

      {error && <p className="mt-4 text-[13.5px] text-rose">{error}</p>}

      <div className="mt-6 flex items-center gap-3">
        <button
          type="submit"
          disabled={status === "loading"}
          className="rounded-full bg-white px-6 py-3 text-[15px] font-semibold text-ink transition-all hover:shadow-lg hover:shadow-black/20 active:scale-[0.98] disabled:opacity-70"
        >
          {status === "loading" ? "Submitting..." : "Submit deliverable"}
        </button>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="text-[14px] text-white/70 transition-colors hover:text-white"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
