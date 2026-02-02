"use client";

import TaskForm from "@/components/TaskForm";



export default function NewTaskPage() {
  const create = async (payload: any) => {
    const r = await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const j = await r.json().catch(() => null);
    if (!r.ok || !j?.ok) throw new Error(j?.message || "Create failed");
    window.location.href = "/tasks";
  };

  return (
    <div className="max-w-xl space-y-4">
      <h2 className="text-2xl font-semibold">New Task</h2>
      <div className="rounded-2xl border bg-white p-5 shadow-sm">
        <TaskForm submitText="Create task" onSubmit={create} />
      </div>
    </div>
  );
}
