import { z } from "zod";

export const TaskSchema = z.object({
  task: z.string().min(3, "too short"),
});
