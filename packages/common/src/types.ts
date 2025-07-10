import z from "zod";

export const SignupZodSchema = z.object({
  email: z.string(),
  name: z.string().optional(),
  password: z.string(),
});

export const SigninZodSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export const CreateRoomZodSchema = z.object({
  name: z.string().min(3).max(20),
});
