import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { cookies } from "next/headers";
import { verifySession } from "@/lib/auth";
import { taskUpdateSchema } from "@/lib/validators";

async function getUser() {
  const token = (await cookies()).get("session")?.value;
  if (!token) return null;
  return await verifySession(token);
}

async function getTaskOr404(id: string) {
  return prisma.task.findUnique({ where: { id } });
}

function canAccess(user: { id: string; role: "user" | "admin" }, task: { ownerId: string }) {
  return user.role === "admin" || task.ownerId === user.id;
}

// ✅ Next 16: ctx.params can be Promise, so unwrap it
async function getIdFromCtx(ctx: { params: Promise<{ id: string }> | { id: string } }) {
  const p = await (ctx.params as any);
  const id = String(p?.id || "");
  return id;
}

export async function GET(req: Request, ctx: { params: Promise<{ id: string }> | { id: string } }) {
  const user = await getUser();
  if (!user) return NextResponse.json({ ok: false }, { status: 401 });

  const id = await getIdFromCtx(ctx);
  if (!id) return NextResponse.json({ ok: false, message: "Missing id" }, { status: 400 });

  const task = await getTaskOr404(id);
  if (!task) return NextResponse.json({ ok: false, message: "Not found" }, { status: 404 });

  if (!canAccess(user, task)) return NextResponse.json({ ok: false }, { status: 403 });

  return NextResponse.json({ ok: true, task });
}

export async function PATCH(req: Request, ctx: { params: Promise<{ id: string }> | { id: string } }) {
  const user = await getUser();
  if (!user) return NextResponse.json({ ok: false }, { status: 401 });

  const id = await getIdFromCtx(ctx);
  if (!id) return NextResponse.json({ ok: false, message: "Missing id" }, { status: 400 });

  const task = await getTaskOr404(id);
  if (!task) return NextResponse.json({ ok: false, message: "Not found" }, { status: 404 });

  if (!canAccess(user, task)) return NextResponse.json({ ok: false }, { status: 403 });

  const body = await req.json();
  const parsed = taskUpdateSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, message: "Validation failed", errors: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const updated = await prisma.task.update({
    where: { id },
    data: {
      ...(parsed.data.title !== undefined ? { title: parsed.data.title } : {}),
      ...(parsed.data.description !== undefined ? { description: parsed.data.description } : {}),
      ...(parsed.data.status !== undefined ? { status: parsed.data.status } : {}),
    },
  });

  return NextResponse.json({ ok: true, task: updated });
}

export async function DELETE(req: Request, ctx: { params: Promise<{ id: string }> | { id: string } }) {
  const user = await getUser();
  if (!user) return NextResponse.json({ ok: false }, { status: 401 });

  const id = await getIdFromCtx(ctx);
  if (!id) return NextResponse.json({ ok: false, message: "Missing id" }, { status: 400 });

  const task = await getTaskOr404(id);
  if (!task) return NextResponse.json({ ok: false, message: "Not found" }, { status: 404 });

  if (!canAccess(user, task)) return NextResponse.json({ ok: false }, { status: 403 });

  await prisma.task.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
