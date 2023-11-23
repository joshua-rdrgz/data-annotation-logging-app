import { z } from 'zod';

export type CreateLogSchema = z.infer<typeof createLogSchema>;

export const createLogSchema = z.object({
  projectName: z.string().min(1),
  tasksCompleted: z.coerce.number().min(1),
  minutesWorked: z.coerce.number().min(1),
  hourlyRate: z.coerce.number().multipleOf(0.01).min(1),
});

export type CreateStopwatchLogSchema = z.infer<typeof createStopwatchLogSchema>;

export const createStopwatchLogSchema = z.object({
  projectName: z.string().min(1),
  tasksCompleted: z.coerce.number().min(1),
  minutesWorked: z.coerce.number().min(1),
  hourlyRate: z.coerce.number().multipleOf(0.01).min(1),
  confirmMinutes: z.boolean(),
  confirmEarnings: z.boolean(),
});

export type EditLogSchema = z.infer<typeof editLogSchema>;

export const editLogSchema = z.object({
  date: z.coerce.date(),
  projectName: z.string().min(1),
  tasksCompleted: z.coerce.number(),
  minutesWorked: z.coerce.number().min(1),
  hourlyRate: z.coerce.number().multipleOf(0.01),
  readyToPayOut: z.boolean(),
  paidOut: z.boolean(),
});
