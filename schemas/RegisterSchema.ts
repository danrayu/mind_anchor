import * as z from "zod";

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Email is required"
  }),
  name: z.string(),
  password: z.string().min(6, {
    message: "Password is required"
  }),
})