import { useNavigate, useParams } from "react-router";
import { useBlogPost, useUpdateBlog } from "@/features/blogs/useBlogs";
import { BlogForm } from "@/features/blogs/BlogForm";
import { Card, CardBody, Button, PageLoader } from "@/components";
import type { CreateBlogDto } from "@/types";
import { useState } from "react";

export function EditBlogPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: post, isLoading } = useBlogPost(id!);
  const updateBlog = useUpdateBlog();

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [generalError, setGeneralError] = useState("");

  const handleSubmit = async (data: CreateBlogDto) => {
    if (!id) return;

    try {
      await updateBlog.mutateAsync({ id, ...data });
      navigate("/dashboard/blogs");
    } catch (error: any) {
      if (error.status === 400 && fieldErrors) {
        setFieldErrors(error.fieldErrors);
      } else {
        setGeneralError(error.message);
      }
    }
  };

  if (isLoading) {
    return <PageLoader />;
  }

  if (!post) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-600">Blog post not found</p>
        <Button onClick={() => navigate("/dashboard/blogs")} className="mt-4">
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-gray-900">
            Edit Post
          </h1>
          <p className="text-gray-600 mt-2">Update your blog content</p>
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
            initialData={post}
            onSubmit={handleSubmit}
            isLoading={updateBlog.isPending}
            errors={{ fieldErrors }}
          />
        </CardBody>
      </Card>
    </div>
  );
}
