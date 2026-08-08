import z from "zod";

export const updateTaskSchema = z.object({
  task: z.string().optional(),
  isActive: z.boolean().optional(),
  completedAt: z.string().datetime().nullable().optional(),
});
