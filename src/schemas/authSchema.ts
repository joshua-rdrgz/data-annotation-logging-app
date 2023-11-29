import { z } from 'zod';

export type RegisterSchema = z.infer<typeof registerSchema>;

export const registerSchema = z
  .object({
    name: z.string().min(1, 'Please provide your name.'),
    email: z.string().email('Please provide a valid email.'),
    password: z.string().min(8, 'Password must be 8 characters or longer.'),
    passwordConfirm: z.string(),
  })
  .refine((schema) => schema.password === schema.passwordConfirm, {
    message: 'Password and Confirm Password must match.',
    path: ['passwordConfirm'],
  });

export type LoginSchema = z.infer<typeof loginSchema>;

export const loginSchema = z.object({
  email: z.string().email().optional(),
  password: z.string().optional(),
});
