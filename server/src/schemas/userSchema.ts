import { z } from "zod";

export const userSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string(),
});

export const loginSchema = userSchema.pick({ email: true, password: true });

export const registerSchema = userSchema.pick({
  email: true,
  password: true,
  name: true,
});

export type User = z.infer<typeof userSchema>;
