import Link from "next/link";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-b from-white to-zinc-50">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Secure CRUD App (Next.js 16 + PostgreSQL)
        </h1>
        <p className="mt-3 max-w-2xl text-zinc-600">
          JWT auth, role-based access, Zod validation, Prisma models, and a clean Tailwind UI.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/register"
            className="rounded-xl bg-zinc-900 px-5 py-3 text-sm font-medium text-white hover:bg-zinc-800"
          >
            Create account
          </Link>
          <Link
            href="/login"
            className="rounded-xl border border-zinc-200 bg-white px-5 py-3 text-sm font-medium hover:bg-zinc-50"
          >
            Login
          </Link>
          <Link
            href="/tasks"
            className="rounded-xl border border-zinc-200 bg-white px-5 py-3 text-sm font-medium hover:bg-zinc-50"
          >
            View tasks
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
