import { z } from 'zod';

export type DailyLogSchema = z.infer<typeof dailyLogSchema>;

export const dailyLogSchema = z.object({
  name: z.string().min(1),
  tasksCompleted: z.coerce.number(),
  minutesWorked: z.coerce.number().min(1),
  hourlyRate: z.coerce.number().multipleOf(0.01),
});
