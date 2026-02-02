"use client";

import { useState } from "react";

type TaskStatus = "todo" | "in_progress" | "done";

type InitialTask = {
  title: string;
  description?: string | null;
  status?: TaskStatus;
};

type Props = {
  initial?: InitialTask;
  submitText: string;
  onSubmit: (payload: {
    title: string;
    description?: string;
    status: TaskStatus;
  }) => Promise<void>;
};

export default function TaskForm({ initial, submitText, onSubmit }: Props) {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [description, setDescription] = useState<string>(initial?.description ?? "");
  const [status, setStatus] = useState<TaskStatus>(initial?.status ?? "todo");

  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const handle = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    if (loading) return;

    try {
      setLoading(true);

      await onSubmit({
        title,
        description: description.trim() ? description : undefined,
        status,
      });
    } catch (e: any) {
      setErr(e?.message || "Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handle} className="space-y-4">
      <div>
        <label className="text-sm font-medium">Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="mt-1 w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-zinc-900/10"
          placeholder="e.g., Prepare weekly report"
        />
      </div>

      <div>
        <label className="text-sm font-medium">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-zinc-900/10"
          placeholder="Optional details..."
          rows={4}
        />
      </div>

      <div>
        <label className="text-sm font-medium">Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as TaskStatus)}
          className="mt-1 w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-zinc-900/10"
        >
          <option value="todo">To do</option>
          <option value="in_progress">In progress</option>
          <option value="done">Done</option>
        </select>
      </div>

      {err && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {err}
        </div>
      )}

      <button
        disabled={loading}
        className="rounded-xl bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-zinc-800 disabled:opacity-60"
      >
        {loading ? "Saving..." : submitText}
      </button>
    </form>
  );
}
