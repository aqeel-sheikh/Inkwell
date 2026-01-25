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
    } catch (error: any) {
      if (error.status === 400 && error.fieldErrors) {
        setFieldErrors(error.fieldErrors);
      } else {
        setGeneralError(error.message);
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
