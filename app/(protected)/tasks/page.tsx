"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import TaskList from "@/components/TaskList";

type Task = {
  id: string;
  title: string;
  description: string | null;
  status: "todo" | "in_progress" | "done";
  createdAt: string;
};

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  const load = async () => {
    setErr(null);
    setLoading(true);
    try {
      const r = await fetch("/api/tasks");
      const j = await r.json();
      if (!r.ok || !j?.ok) throw new Error(j?.message || "Failed to load");
      setTasks(j.tasks);
    } catch (e: any) {
      setErr(e?.message || "Failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const onDelete = async (id: string) => {
    await fetch(`/api/tasks/${id}`, { method: "DELETE" });
    await load();
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-semibold">Tasks</h2>
          <p className="text-zinc-600">Create, update, and track work items.</p>
        </div>
        <Link
          href="/tasks/new"
          className="rounded-xl bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-zinc-800"
        >
          New task
        </Link>
      </div>

      {loading ? (
        <div className="text-sm text-zinc-600">Loading...</div>
      ) : err ? (
        <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {err}
        </div>
      ) : tasks.length ? (
        <TaskList tasks={tasks} onDelete={onDelete} />
      ) : (
        <div className="rounded-2xl border bg-white p-6 text-sm text-zinc-600">
          No tasks yet. Create your first task.
        </div>
      )}
    </div>
  );
}
