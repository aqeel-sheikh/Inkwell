import { useNavigate } from "react-router-dom";
import { useCreateBlog } from "@/features/blogs/useBlogs";
import { BlogForm } from "@/features/blogs/BlogForm";
import { Card, CardBody, Button } from "@/components";
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
        // Zod validation errors
        setFieldErrors(error.fieldErrors);
      } else {
        // Other errors (401, 500, etc)
        setGeneralError(error.message);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-gray-900">
            Create New Post
          </h1>
          <p className="text-gray-600 mt-2">
            Share your thoughts with the world
          </p>
        </div>
        <Button variant="ghost" onClick={() => navigate("/dashboard/blogs")}>
          Cancel
        </Button>
      </div>
      <Card>
        {generalError && (
          <div className=" p-4 bg-danger-light/10 border border-danger-light rounded-lg">
            <p className="text-sm text-danger-dark">{generalError}</p>
          </div>
        )}
        <CardBody>
          <BlogForm
            onSubmit={handleSubmit}
            isLoading={createBlog.isPending}
            errors={{ fieldErrors }}
          />
        </CardBody>
      </Card>
    </div>
  );
}
