import { Suspense } from "react";
import LoginClient from "./LoginClient";

export const dynamic = "force-dynamic";

export default function LoginPage({
  searchParams,
}: {
  searchParams?: Record<string, string | string[] | undefined>;
}) {
  const next =
    typeof searchParams?.next === "string" && searchParams.next.trim()
      ? searchParams.next
      : "/dashboard";

  return (
    <Suspense fallback={<div className="min-h-screen bg-zinc-50 px-4 py-14">Loading...</div>}>
      <LoginClient nextPath={next} />
    </Suspense>
  );
}
