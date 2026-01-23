import z from "zod";

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
    message: "Enter a valid full name",
    path: ["name"],
  });
export type UserDto = z.infer<typeof UserSchema>;

export interface User {
  name: string;
  username: string;
  email: string;
  image?: string;
  coverImage?: string;
  website?: string;
  bio?: string;
}
