import { useState } from "react";
import { Link } from "react-router";
import { useBlogPosts, useDeleteBlog } from "@/features/blogs/useBlogs";
import {
  Card,
  CardBody,
  Button,
  LoadingSpinner,
  EmptyState,
  Modal,
} from "@/components";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function BlogListPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading } = useBlogPosts(currentPage, 10);
  const deleteBlog = useDeleteBlog();

  const [deleteModal, setDeleteModal] = useState({
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
      <div className="flex min-h-screen items-center justify-center bg-[#fafaf9]">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  const handleNext = () => {
    setCurrentPage((prev) => prev + 1);
  };
  const handlePrev = () => {
    setCurrentPage((prev) => prev - 1);
  };

  return (
    <>
      <div
        className="relative min-h-screen bg-[#fafaf9]"
        style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
      >
        {/* Sophisticated ambient background */}
        <div className="pointer-events-none fixed inset-0 overflow-hidden">
          <div
            className="absolute -right-64 -top-64 h-[800px] w-[800px] rounded-full bg-linear-to-br from-amber-100/40 via-rose-100/30 to-transparent opacity-60 blur-3xl animate-float"
            style={{ animationDelay: "0s" }}
          />
          <div
            className="absolute -bottom-64 -left-64 h-[700px] w-[700px] rounded-full bg-linear-to-tr from-indigo-100/40 via-purple-100/30 to-transparent opacity-50 blur-3xl animate-float"
            style={{ animationDelay: "2s" }}
          />
          <div
            className="absolute right-1/4 top-1/3 h-[500px] w-[500px] rounded-full bg-linear-to-bl from-emerald-100/30 via-teal-100/20 to-transparent opacity-40 blur-3xl animate-float"
            style={{ animationDelay: "4s" }}
          />
        </div>

        {/* Content Container */}
        <div className="relative mx-auto max-w-[1300px] px-6 py-16 sm:px-8 lg:px-12">
          {/* Header Section */}
          <header
            className="mb-16 animate-fadeInUp"
            style={{ animationDelay: "0.1s", animationFillMode: "both" }}
          >
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-3 rounded-full border border-stone-200/80 bg-white/60 px-4 py-2 shadow-sm">
                  <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-linear-to-r from-amber-500 to-rose-500" />
                  <span className="text-xs font-medium uppercase tracking-[0.2em] text-stone-600">
                    Editorial
                  </span>
                </div>

                <h1
                  className="text-shadow-sm text-balance text-6xl font-light tracking-tight text-stone-900 sm:text-7xl lg:text-8xl"
                  style={{ fontFamily: "'Crimson Pro', serif" }}
                >
                  Blog Posts
                </h1>

                <p className="max-w-2xl text-lg leading-relaxed text-stone-600 sm:text-xl">
                  Curate your stories, share your vision, and inspire the world
                  with thoughtfully crafted content
                </p>
              </div>

              <Link to="/dashboard/blogs/new" className="group shrink-0">
                <Button className="relative cursor-pointer overflow-hidden border-0 bg-linear-to-br from-stone-900 via-stone-800 to-stone-900 px-8 py-6 text-base font-medium text-white shadow-lg shadow-stone-900/25 transition-all duration-500 hover:shadow-xl hover:shadow-stone-900/40 hover:scale-105 active:scale-100">
                  <span className="relative z-10 flex items-center gap-3">
                    <svg
                      className="h-5 w-5 transition-transform duration-500 group-hover:rotate-90"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                    <span>New Post</span>
                  </span>
                  <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent bg-size-[200%_auto] opacity-0 transition-opacity duration-500 group-hover:animate-shimmer group-hover:opacity-100" />
                </Button>
              </Link>
            </div>
          </header>

          {!data?.data || data.data.length === 0 ? (
            <div
              className="animate-fadeInUp"
              style={{ animationDelay: "0.2s", animationFillMode: "both" }}
            >
              <Card className="glass-effect border-2 border-stone-200/60 shadow-xl">
                <CardBody className="py-24">
                  <EmptyState
                    title="No blog posts yet"
                    message="Create your first blog post to get started"
                    action={{
                      label: "Create Post",
                      onClick: () =>
                        (window.location.href = "/dashboard/blogs/new"),
                    }}
                  />
                </CardBody>
              </Card>
            </div>
          ) : (
            <div className="space-y-12">
              {/* Stats Bar */}
              <div
                className="glass-effect animate-fadeInUp flex flex-col items-start justify-between gap-6 rounded-2xl border border-stone-200/80 p-8 shadow-lg sm:flex-row sm:items-center"
                style={{ animationDelay: "0.15s", animationFillMode: "both" }}
              >
                <div className="flex items-center gap-5">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-stone-900 to-stone-700 shadow-lg">
                    <svg
                      className="h-7 w-7 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium uppercase tracking-[0.15em] text-stone-500">
                      Total Posts
                    </p>
                    <p
                      className="text-4xl font-light tracking-tight text-stone-900"
                      style={{ fontFamily: "'Crimson Pro', serif" }}
                    >
                      {data.total}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="rounded-xl border border-stone-200 bg-white/80 px-5 py-2.5 shadow-sm">
                    <span className="text-sm font-medium text-stone-700">
                      Page {data.page} / {data.totalPages}
                    </span>
                  </div>
                  <div className="h-6 w-px bg-stone-300" />
                  <div className="rounded-xl border border-stone-200 bg-white/80 p-1 shadow-sm">
                    <Button
                      disabled={data.page === 1}
                      onClick={handlePrev}
                      variant="ghost"
                      size="icon"
                      className="cursor-pointer"
                    >
                      <ChevronLeft />
                    </Button>
                    <Button
                      disabled={data.page === data.totalPages}
                      onClick={handleNext}
                      variant="ghost"
                      size="icon"
                      className="cursor-pointer"
                    >
                      <ChevronRight />
                    </Button>
                  </div>
                  <div className="flex gap-3"></div>
                </div>
              </div>

              {/* Blog Posts Grid */}
              <div className="grid gap-8 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                {data.data.map((post, index) => (
                  <article
                    key={post.id}
                    className="group animate-fadeInUp"
                    style={{
                      animationDelay: `${0.2 + index * 0.1}s`,
                      animationFillMode: "both",
                    }}
                  >
                    <Card className="glass-effect relative h-full overflow-hidden border border-stone-200/80 shadow-lg transition-all duration-700 hover:border-stone-300 hover:shadow-2xl hover:shadow-stone-900/10 hover:-translate-y-2">
                      {/* Decorative gradient overlay */}
                      <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-amber-50/0 via-transparent to-stone-50/0 opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

                      {/* Top accent line */}
                      <div className="absolute left-0 right-0 top-0 h-1 bg-linear-to-r from-amber-500 via-rose-500 to-purple-500 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                      <CardBody className="relative flex h-full flex-col gap-6 p-8">
                        {/* Status Badge */}
                        <div className="flex items-start justify-between">
                          <span
                            className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] shadow-sm transition-all duration-300 ${
                              post.published
                                ? "border border-emerald-200/80 bg-emerald-50/80 text-emerald-700"
                                : "border border-amber-200/80 bg-amber-50/80 text-amber-700"
                            }`}
                          >
                            <span
                              className={`h-1.5 w-1.5 rounded-full ${post.published ? "bg-emerald-500" : "bg-amber-500"}`}
                            />
                            {post.published ? "Published" : "Draft"}
                          </span>
                        </div>

                        {/* Title */}
                        <h2
                          className="text-shadow-sm line-clamp-2 text-3xl font-light leading-tight tracking-tight text-stone-900 transition-colors duration-300 group-hover:text-stone-700"
                          style={{ fontFamily: "'Crimson Pro', serif" }}
                        >
                          {post.title}
                        </h2>

                        {/* Excerpt */}
                        <p className="line-clamp-3 wrap-break-word grow text-base leading-relaxed text-stone-600">
                          {post.excerpt}
                        </p>

                        {/* Metadata */}
                        <div className="space-y-4 border-t border-stone-200/60 pt-6">
                          {/* Date */}
                          <div className="flex items-center gap-2.5 text-sm text-stone-500">
                            <svg
                              className="h-4 w-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={1.5}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                              />
                            </svg>
                            <time className="font-medium">
                              {new Date(post.createdAt).toLocaleDateString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                  hour: "numeric",
                                  minute: "2-digit",
                                },
                              )}
                            </time>
                          </div>

                          {/* Tags */}
                          {post.tags && post.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                              {post.tags.slice(0, 3).map((tag, index) => (
                                <span
                                  key={index}
                                  className="inline-flex items-center rounded-lg border border-stone-200 bg-white/80 px-3 py-1 text-xs font-medium text-stone-700 shadow-sm transition-colors duration-200 hover:border-stone-300 hover:bg-stone-50"
                                >
                                  {tag}
                                </span>
                              ))}
                              {post.tags.length > 3 && (
                                <span className="inline-flex items-center px-2 text-xs font-medium text-stone-400">
                                  +{post.tags.length - 3}
                                </span>
                              )}
                            </div>
                          )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-3 border-t border-stone-200/60 pt-6">
                          <Link
                            to={`/dashboard/blogs/${post.id}/edit`}
                            className="flex-1"
                          >
                            <Button
                              variant="ghost"
                              size="sm"
                              className="w-full cursor-pointer justify-center border border-stone-200 bg-white/80 px-4 py-2.5 text-sm font-medium text-stone-700 shadow-sm transition-all duration-300 hover:border-stone-900 hover:bg-stone-900 hover:text-white hover:shadow-md active:scale-95"
                            >
                              <svg
                                className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:rotate-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                                />
                              </svg>
                              Edit
                            </Button>
                          </Link>

                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              handleDeleteClick(post.id, post.title)
                            }
                            className="group/delete cursor-pointer border border-stone-200 bg-white/80 p-2.5 shadow-sm transition-all duration-300 hover:border-red-300 hover:bg-red-50 hover:shadow-md active:scale-95"
                          >
                            <svg
                              className="h-5 w-5 text-stone-500 transition-all duration-300 group-hover/delete:scale-110 group-hover/delete:text-red-600"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                              />
                            </svg>
                          </Button>
                        </div>
                      </CardBody>
                    </Card>
                  </article>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Delete Confirmation Modal */}
        <Modal
          isOpen={deleteModal.isOpen}
          onClose={() =>
            setDeleteModal({ isOpen: false, postId: "", postTitle: "" })
          }
          title="Delete Blog Post"
          size="sm"
        >
          <div className="space-y-6">
            <div className="flex items-start gap-4 rounded-2xl border-2 border-red-100 bg-red-50/80 p-6">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-100">
                <svg
                  className="h-6 w-6 text-red-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                  />
                </svg>
              </div>
              <div className="min-w-0 flex-1 overflow-auto wrap-break-word">
                <p className="mb-2 text-sm font-semibold text-red-900">
                  This action cannot be undone
                </p>
                <p className="text-sm leading-relaxed text-red-700">
                  Are you sure you want to permanently delete{" "}
                  <strong className="font-bold">
                    "{deleteModal.postTitle}"
                  </strong>
                  ?
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <Button
                variant="ghost"
                onClick={() =>
                  setDeleteModal({ isOpen: false, postId: "", postTitle: "" })
                }
                fullWidth
                className="border cursor-pointer border-stone-200 bg-white font-medium text-stone-700 shadow-sm transition-all duration-300 hover:border-stone-300 hover:bg-stone-50 active:scale-95"
              >
                Cancel
              </Button>
              <Button
                variant="danger"
                onClick={handleDeleteConfirm}
                isLoading={deleteBlog.isPending}
                fullWidth
                className="border-2 cursor-pointer border-red-600 bg-red-600 font-medium text-white shadow-lg shadow-red-600/30 transition-all duration-300 hover:border-red-700 hover:bg-red-700 hover:shadow-xl hover:shadow-red-600/40 active:scale-95"
              >
                {deleteBlog.isPending ? "Deleting..." : "Delete Forever"}
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
}
