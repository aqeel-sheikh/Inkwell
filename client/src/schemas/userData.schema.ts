import z from "zod";

export const signUpSchema = z
  .object({
    name: z.string().min(4, "Name should contain at least 4 characters"),
    email: z.email("Invalid email address"),
    password: z
      .string()
      .min(8, "Password should contain at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });
