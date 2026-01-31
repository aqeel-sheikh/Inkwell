import { useNavigate } from "react-router";
import { useCreateBlog } from "@/features/blogs/useBlogs";
import { BlogForm } from "@/features/blogs/BlogForm";
import type { CreateBlogDto } from "@/types";
import { useState } from "react";

export function CreateBlogPage() {
  const navigate = useNavigate();
  const createBlog = useCreateBlog();
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [generalError, setGeneralError] = useState("");

  const handleSubmit = async (data: CreateBlogDto) => {
    setFieldErrors({});
    setGeneralError("");

    try {
      await createBlog.mutateAsync(data);
      navigate("/dashboard/blogs");
    } catch (error) {
      if (
        typeof error === "object" &&
        error !== null &&
        "status" in error &&
        (error as { status: number }).status === 400 &&
        "fieldErrors" in error
      ) {
        setFieldErrors(
          (error as { fieldErrors: Record<string, string> }).fieldErrors,
        );
      } else if (
        typeof error === "object" &&
        error !== null &&
        "message" in error &&
        typeof (error as { message: unknown }).message === "string"
      ) {
        setGeneralError((error as { message: string }).message);
      } else {
        setGeneralError("An unexpected error occurred.");
      }
    }
  };

  return (
    <BlogForm
      onSubmit={handleSubmit}
      isLoading={createBlog.isPending}
      errors={{ fieldErrors }}
      generalError={generalError}
      onCancel={() => navigate("/dashboard/blogs")}
    />
  );
}
