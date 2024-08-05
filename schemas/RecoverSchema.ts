import * as z from "zod";

export const RecoverSchema = z.object({
  email: z.string().email({
    message: "Email is required"
  }),
  password: z.string().min(6, {
    message: "Password is required"
  }),
  repeat_password: z.string().min(6, {
    message: "A repeat Password is required"
  }),
})