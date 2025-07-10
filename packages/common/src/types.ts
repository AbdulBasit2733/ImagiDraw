import z from "zod";

export const SignupZodSchema = z.object({
  username: z.string(),
  name: z.string(),
  password: z.string(),
});

export const SigninZodSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export const CreateRoomZodSchema = z.object({
  name: z.string().min(3).max(20),
});
