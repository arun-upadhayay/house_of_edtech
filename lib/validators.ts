import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50),
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Password must be at least 8 characters").max(72),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(1, "Password is required").max(72),
});

export const taskCreateSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(120),
  description: z.string().max(1000).optional(),
  status: z.enum(["todo", "in_progress", "done"]).optional(),
});

export const taskUpdateSchema = z.object({
  title: z.string().min(3).max(120).optional(),
  description: z.string().max(1000).optional().nullable(),
  status: z.enum(["todo", "in_progress", "done"]).optional(),
});
