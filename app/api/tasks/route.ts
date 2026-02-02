import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSessionUser } from "@/lib/auth";
import { taskCreateSchema } from "@/lib/validators";

export async function GET() {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ ok: false }, { status: 401 });

  const where =
    user.role === "admin"
      ? {}
      : {
          ownerId: user.id,
        };

  const tasks = await prisma.task.findMany({
    where,
    orderBy: { createdAt: "desc" },
    include: { owner: { select: { id: true, name: true, email: true } } },
  });

  return NextResponse.json({ ok: true, tasks });
}

export async function POST(req: Request) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ ok: false }, { status: 401 });

  const body = await req.json();
  const parsed = taskCreateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, message: "Validation failed", errors: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const created = await prisma.task.create({
    data: {
      title: parsed.data.title,
      description: parsed.data.description ?? null,
      status: parsed.data.status ?? "todo",
      ownerId: user.id,
    },
  });

  return NextResponse.json({ ok: true, task: created }, { status: 201 });
}
