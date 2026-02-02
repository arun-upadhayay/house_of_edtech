"use client";

import { useEffect, useMemo, useState } from "react";
import TaskForm from "@/components/TaskForm";

type Task = {
  title: string;
  description: string | null;
  status: "todo" | "in_progress" | "done";
};

export default function EditTaskPage(props: { params: Promise<{ id: string }> | { id: string } }) {
  // ✅ Next 16: params may be Promise, so handle both cases safely
  const [taskId, setTaskId] = useState<string>("");

  useEffect(() => {
    (async () => {
      const p = await (props.params as any);
      setTaskId(String(p?.id || ""));
    })();
  }, [props.params]);

  const [task, setTask] = useState<Task | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    if (!taskId) return;

    fetch(`/api/tasks/${taskId}`)
      .then(async (r) => {
        const j = await r.json().catch(() => null);
        if (!r.ok || !j?.ok) throw new Error(j?.message || "Load failed");
        setTask(j.task);
      })
      .catch((e) => setErr(e?.message || "Failed"));
  }, [taskId]);

  const update = async (payload: any) => {
    if (!taskId) throw new Error("Missing task id");

    const r = await fetch(`/api/tasks/${taskId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const j = await r.json().catch(() => null);
    if (!r.ok || !j?.ok) throw new Error(j?.message || "Update failed");

    window.location.href = "/tasks";
  };

  if (err) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
        {err}
      </div>
    );
  }

  if (!taskId) return <div className="text-sm text-zinc-600">Loading...</div>;
  if (!task) return <div className="text-sm text-zinc-600">Loading task...</div>;

  return (
    <div className="max-w-xl space-y-4">
      <h2 className="text-2xl font-semibold">Edit Task</h2>
      <div className="rounded-2xl border bg-white p-5 shadow-sm">
        <TaskForm initial={task} submitText="Save changes" onSubmit={update} />
      </div>
    </div>
  );
}
