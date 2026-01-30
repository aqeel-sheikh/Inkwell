import z from "zod";

export const signUpSchema = z
  .object({
    name: z.string().trim().min(4, "Name should contain at least 4 characters"),
    email: z.email("Invalid email address"),
    username: z.string().min(1, "Username is required"),
    password: z
      .string()
      .min(8, "Password should contain at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  })
  .refine((data) => /^[A-Za-z]+( [A-Za-z]+)+$/.test(data.name), {
    message: "Enter a valid full name. e.g John Doe",
    path: ["name"],
  });

export const UserSchema = z
  .object({
    id: z.string(),
    name: z.string().min(4, "Fullname should contain at least 4 characters"),
    username: z.string().trim().min(1, "Username is required"),
    email: z.email(),
    image: z.string().optional(),
    coverImage: z.string().optional(),
    website: z.union([z.url(), z.literal("")]).optional(),
    bio: z
      .string()
      .trim()
      .max(180, "Bio cannot be longer than 180 characters")
      .optional(),
  })
  .refine((data) => /^[A-Za-z]+( [A-Za-z]+)+$/.test(data.name), {
    message: "Enter a valid full name e.g John Doe",
    path: ["name"],
  });
