import * as z from "zod";

export const RegisterSchema = z.object({
  name: z.string(),
  password: z.string().min(6, {
    message: "Password is required"
  }),
  
})