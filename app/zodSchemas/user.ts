import { z } from "zod";

export const UserCreateSchema = z.object({
  email: z.string().min(0).max(80),
  firstName: z.string().min(0).max(80),
  lastName: z.string().min(0).max(80),
  phoneNumber: z.string().min(0).max(10),
  password: z.string().min(0).max(80),
  admin: z.boolean().default(false),
});

export type UserCreate = z.infer<typeof UserCreateSchema>;

export const UserLoginSchema = z.object({
  email: z.string().min(0).max(80),
  password: z.string().min(0).max(80),
});

export type UserLogin = z.infer<typeof UserLoginSchema>;
