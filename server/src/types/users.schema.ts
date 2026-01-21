import z from "zod";

export const UserSchema = z.object({
  id: z.string(),
  name: z.string().min(4, "Name should contain at least 4 characters"),
  username: z.string(),
  email: z.email(),
  image: z.string().optional(),
  coverImage: z.string().optional(),
  website: z.url().or(z.literal("")).optional(),
  bio: z
    .string()
    .max(180, "Bio cannot be longer than 180 characters")
    .optional(),
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
