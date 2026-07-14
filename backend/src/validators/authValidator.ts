import { z } from "zod";

export const signupSchema = z.object({
  email: z
    .string()
    .email()
    .min(5)
    .max(100),

  password: z
    .string()
    .min(8)
    .max(64),

  name: z
    .string()
    .min(2)
    .max(50)
});

export const loginSchema = z.object({
  email: z
    .string()
    .email()
    .min(5)
    .max(100),

  password: z
    .string()
    .min(8)
    .max(64)
});
