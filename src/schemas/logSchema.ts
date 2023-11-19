import { z } from 'zod';

export type LogSchema = z.infer<typeof logSchema>;

export const logSchema = z.object({
  projectName: z.string().min(1),
  tasksCompleted: z.coerce.number(),
  minutesWorked: z.coerce.number().min(1),
  hourlyRate: z.coerce.number().multipleOf(0.01),
});
