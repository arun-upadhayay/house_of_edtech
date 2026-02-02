"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Me = {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
};

export default function NavBar() {
  const [me, setMe] = useState<Me | null>(null);

  useEffect(() => {
    fetch("/api/me")
      .then((r) => (r.ok ? r.json() : null))
      .then((j) => {
        if (j?.ok) setMe(j.user);
      })
      .catch(() => {});
  }, []);

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/login";
  };

  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="font-semibold text-black tracking-tight">
          House of EdTech Tasks
        </Link>

        <nav className="flex items-center text-neutral-600 gap-3 text-sm">
          <Link href="/dashboard" className="rounded-lg px-3 py-2 hover:bg-zinc-100">
            Dashboard
          </Link>
          <Link href="/tasks" className="rounded-lg px-3 py-2 hover:bg-zinc-100">
            Tasks
          </Link>

          {me ? (
            <>
              <span className="hidden text-zinc-600 sm:inline">
                {me.name} · <span className="uppercase">{me.role}</span>
              </span>
              <button
                onClick={logout}
                className="rounded-lg bg-zinc-900 px-3 py-2 font-medium text-white hover:bg-zinc-800"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="rounded-lg bg-zinc-900 px-3 py-2 font-medium text-white hover:bg-zinc-800"
            >
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
