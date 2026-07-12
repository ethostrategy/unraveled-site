"use client";

import { useEffect, useState } from "react";
import { Marker, shapeForStream } from "../marker";

type Task = { id: string; task: string; stream: string; status: string; due: string; order: number };

const STREAMS: Record<string, string> = {
  Framework: "#6f8fd8",
  Intelligence: "#9a7fe0",
  Operations: "#b884d8",
  Brand: "#e273ac",
  B2C: "#c768c6",
  B2B: "#f0a0b8",
};

const COLUMNS = ["Up next", "In progress", "Done"] as const;

export default function BoardColumns() {
  const [tasks, setTasks] = useState<Task[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [dragId, setDragId] = useState<string | null>(null);
  const [overCol, setOverCol] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    fetch("/api/hq-board")
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((d: { tasks: Task[] }) => alive && setTasks(d.tasks))
      .catch(() => alive && setError("Couldn't load the board."));
    return () => {
      alive = false;
    };
  }, []);

  function move(id: string, status: string) {
    if (!tasks) return;
    const t = tasks.find((x) => x.id === id);
    if (!t || t.status === status) return;
    const order = Math.max(0, ...tasks.filter((x) => x.status === status).map((x) => x.order)) + 10;
    const prev = tasks;
    setTasks(tasks.map((x) => (x.id === id ? { ...x, status, order } : x))); // optimistic
    fetch("/api/hq-board", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status, order }),
    })
      .then((r) => {
        if (!r.ok) {
          setTasks(prev);
          setError("That move didn't save. Try again.");
        } else {
          setError(null);
        }
      })
      .catch(() => {
        setTasks(prev);
        setError("That move didn't save. Try again.");
      });
  }

  if (error && !tasks) return <p className="mt-8 text-[13px] text-white/50">{error}</p>;
  if (!tasks) return <p className="mt-8 text-[13px] text-white/40">Loading the board…</p>;

  return (
    <>
      {error && <p className="mt-4 text-[12px] text-[#f6b0d3]">{error}</p>}
      <div className="mt-6 flex gap-3 overflow-x-auto pb-4">
        {COLUMNS.map((col) => {
          const items = tasks.filter((t) => t.status === col).sort((a, b) => a.order - b.order);
          return (
            <div
              key={col}
              className="w-[260px] shrink-0"
              onDragOver={(e) => {
                e.preventDefault();
                setOverCol(col);
              }}
              onDragLeave={() => setOverCol((c) => (c === col ? null : c))}
              onDrop={(e) => {
                e.preventDefault();
                if (dragId) move(dragId, col);
                setDragId(null);
                setOverCol(null);
              }}
            >
              <div className="flex items-center justify-between px-1 pb-2">
                <span className="text-[12px] font-semibold uppercase tracking-[0.14em] text-white/70">{col}</span>
                <span className="text-[11px] text-white/35">{items.length}</span>
              </div>
              <div
                className={`min-h-[80px] space-y-2 rounded-2xl border bg-white/[0.02] p-2 transition ${
                  overCol === col ? "border-white/25 bg-white/[0.04]" : "border-white/[0.07]"
                }`}
              >
                {items.map((t) => {
                  const c = STREAMS[t.stream] ?? "#9a7fe0";
                  return (
                    <div
                      key={t.id}
                      draggable
                      onDragStart={(e) => {
                        e.dataTransfer.setData("text/plain", t.id);
                        e.dataTransfer.effectAllowed = "move";
                        setDragId(t.id);
                      }}
                      onDragEnd={() => {
                        setDragId(null);
                        setOverCol(null);
                      }}
                      className={`cursor-grab rounded-xl border border-white/10 bg-white/[0.03] p-3 transition active:cursor-grabbing ${
                        dragId === t.id ? "opacity-40" : ""
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Marker color={c} shape={shapeForStream(t.stream)} size={11} glow={false} />
                        <span className="text-[10px] font-medium uppercase tracking-wide" style={{ color: c }}>
                          {t.stream}
                        </span>
                        <span className="ml-auto text-[10px] text-white/40">{t.due}</span>
                      </div>
                      <p className="mt-1.5 text-[13px] leading-snug text-white/85">{t.task}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
