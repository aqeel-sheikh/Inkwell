import { useState } from "react";
import { Link } from "react-router-dom";
import { useBlogPosts, useDeleteBlog } from "@/features/blogs/useBlogs";
import {
  Card,
  CardBody,
  Button,
  LoadingSpinner,
  EmptyState,
  Modal,
} from "@/components";

export function BlogListPage() {
  const { data, isLoading } = useBlogPosts();
  const deleteBlog = useDeleteBlog();
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    postId: string;
    postTitle: string;
  }>({
    isOpen: false,
    postId: "",
    postTitle: "",
  });

  const handleDeleteClick = (postId: string, postTitle: string) => {
    setDeleteModal({ isOpen: true, postId, postTitle });
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteBlog.mutateAsync(deleteModal.postId);
      setDeleteModal({ isOpen: false, postId: "", postTitle: "" });
    } catch (error) {
      console.error("Failed to delete post:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-gray-900">
            Blog Posts
          </h1>
          <p className="text-gray-600 mt-2">Manage your blog content</p>
        </div>
        <Link to="/dashboard/blogs/new">
          <Button>
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            New Post
          </Button>
        </Link>
      </div>

      {!data?.data || data.data.length === 0 ? (
        <Card>
          <CardBody>
            <EmptyState
              title="No blog posts yet"
              message="Create your first blog post to get started"
              action={{
                label: "Create Post",
                onClick: () => (window.location.href = "/dashboard/blogs/new"),
              }}
            />
          </CardBody>
        </Card>
      ) : (
        <div className="space-y-4">
          {data.data.map((post) => (
            <Card key={post.id} className="hover:shadow-md transition-shadow">
              <CardBody className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 truncate">
                      {post.title}
                    </h3>
                    <span
                      className={`badge ${post.published ? "badge-success" : "badge-warning"}`}
                    >
                      {post.published ? "Published" : "Draft"}
                    </span>
                  </div>
                  <p className="text-gray-600 line-clamp-2 mb-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>
                      {new Date(post.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                    {post.tags && post.tags.length > 0 && (
                      <span className="flex gap-1">
                        {post.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="badge badge-primary text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <Link to={`/dashboard/blogs/${post.id}/edit`}>
                    <Button variant="ghost" size="sm">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                      Edit
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteClick(post.id, post.title)}
                  >
                    <svg
                      className="w-4 h-4 text-danger-DEFAULT"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </Button>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={deleteModal.isOpen}
        onClose={() =>
          setDeleteModal({ isOpen: false, postId: "", postTitle: "" })
        }
        title="Delete Blog Post"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-gray-700">
            Are you sure you want to delete{" "}
            <strong>"{deleteModal.postTitle}"</strong>? This action cannot be
            undone.
          </p>
          <div className="flex gap-3">
            <Button
              variant="ghost"
              onClick={() =>
                setDeleteModal({ isOpen: false, postId: "", postTitle: "" })
              }
              fullWidth
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={handleDeleteConfirm}
              isLoading={deleteBlog.isPending}
              fullWidth
            >
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
