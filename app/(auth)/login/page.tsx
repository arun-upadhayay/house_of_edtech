import { Suspense } from "react";
import LoginClient from "./LoginClient";

export const dynamic = "force-dynamic";

type SP = Record<string, string | string[] | undefined>;

export default async function LoginPage(props: { searchParams?: Promise<SP> | SP }) {
  const sp = (await (props.searchParams as any)) as SP | undefined;

  const next =
    typeof sp?.next === "string" && sp.next.trim()
      ? sp.next
      : "/dashboard";

  return (
    <Suspense fallback={<div className="min-h-screen bg-zinc-50 px-4 py-14">Loading...</div>}>
      <LoginClient nextPath={next} />
    </Suspense>
  );
}
