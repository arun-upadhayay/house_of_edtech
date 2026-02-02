"use client";

import Link from "next/link";

type Task = {
  id: string;
  title: string;
  description: string | null;
  status: "todo" | "in_progress" | "done";
  createdAt: string;
};

export default function TaskList({
  tasks,
  onDelete,
}: {
  tasks: Task[];
  onDelete: (id: string) => Promise<void>;
}) {
  return (
    <div className="space-y-3">
      {tasks.map((t) => (
        <div key={t.id} className="rounded-2xl border bg-white p-4 shadow-sm">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h3 className="text-base font-semibold">{t.title}</h3>
              <p className="mt-1 text-sm text-zinc-600">
                Status: <span className="font-medium">{t.status}</span>
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href={`/tasks/${t.id}/edit`}
                className="rounded-xl border px-3 py-2 text-sm hover:bg-zinc-50"
              >
                Edit
              </Link>
              <button
                onClick={() => onDelete(t.id)}
                className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 hover:bg-red-100"
              >
                Delete
              </button>
            </div>
          </div>

          {t.description && <p className="mt-3 text-sm text-zinc-700">{t.description}</p>}
        </div>
      ))}
    </div>
  );
}
