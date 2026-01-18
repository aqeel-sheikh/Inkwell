import z from "zod";

export const blogPostSchema = z.object({
  title: z
    .string()
    .trim()
    .min(4, "Title should be at least 4 characters long")
    .max(100, "Title cannot be longer than 100 characters"),
  excerpt: z
    .string()
    .trim()
    .min(10, "Blog summary should be at least 10 characters long")
    .max(500, "Blog summary cannot be longer than 500 characters"),
  content: z.string().trim().min(1, "Blog content cannot be empty"),
  published: z.boolean(),
  tags: z.string().array(),
});
export type BlogPostType = z.infer<typeof blogPostSchema>;
