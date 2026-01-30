import { useMemo, useState } from "react";
import { Link } from "react-router";
import {
  useBlogPosts,
  useDeleteBlog,
  useChangePublishStatus,
} from "@/features/blogs/useBlogs";
import {
  Card,
  CardBody,
  Button,
  LoadingSpinner,
  EmptyState,
  Modal,
  BlogFilterButtons,
  BlogArticleCard,
} from "@/components";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  ChevronLeft,
  ChevronRight,
  FileText,
  PlusIcon,
  TriangleAlert,
} from "lucide-react";

export function BlogListPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading } = useBlogPosts(currentPage, 9);
  const deleteBlog = useDeleteBlog();
  const changePostPublishStatus = useChangePublishStatus();
  const [filterPosts, setFilterPosts] = useState("All");

  const publishedPosts = useMemo(
    () => data?.data?.filter((post) => post.published) ?? [],
    [data],
  );
  const draftPosts = useMemo(
    () => data?.data?.filter((post) => !post.published) ?? [],
    [data],
  );

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

  const togglePostPublishStatus = async (
    postId: string,
    publishStatus: boolean,
  ) => {
    try {
      await changePostPublishStatus.mutateAsync({ postId, publishStatus });
    } catch (err) {
      console.log(err);
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
      <style>
        {`
        .status-btn:hover .published{
        border-color: #00bc7d
        }
        .status-btn:hover .draft{
        border-color: #fe9a00
        }
        
        `}
      </style>
      <div
        className="relative min-h-screen bg-[#fafaf9]"
        style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
      >
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
                  <div className="relative z-10 flex items-center gap-3">
                    <PlusIcon className="h-5 w-5 transition-transform duration-500 group-hover:rotate-90" />
                    <span>New Post</span>
                  </div>
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
                    <FileText className="h-7 w-7 text-white" />
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
                  <div className="flex gap-3 rounded-xl border border-stone-200 bg-white/80 px-1 py-1 shadow-sm">
                    <BlogFilterButtons
                      setFilterPosts={setFilterPosts}
                      filterPosts={filterPosts}
                    />{" "}
                  </div>
                  <div className="h-6 w-px bg-stone-300" />
                  <div className="rounded-xl border border-stone-200 bg-white/80 px-5 py-2.5 shadow-sm">
                    <span className="text-sm font-medium text-stone-700">
                      Page {data.page} / {data.totalPages}
                    </span>
                  </div>
                  <div className="h-6 w-px bg-stone-300" />
                  <div className="rounded-xl border border-stone-200 bg-white/80 p-1 shadow-sm">
                    <PaginationButton tooltip="Prev page">
                      <Button
                        disabled={data.page === 1}
                        onClick={handlePrev}
                        variant="ghost"
                        size="icon"
                        className="cursor-pointer"
                      >
                        <ChevronLeft />
                      </Button>
                    </PaginationButton>

                    <PaginationButton tooltip="Next page">
                      <Button
                        disabled={data.page === data.totalPages}
                        onClick={handleNext}
                        variant="ghost"
                        size="icon"
                        className="cursor-pointer"
                      >
                        <ChevronRight />
                      </Button>
                    </PaginationButton>
                  </div>
                  <div className="flex gap-3"></div>
                </div>
              </div>

              {/* Blog Posts Grid */}
              <div className="grid gap-8 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                {filterPosts === "Published" ? (
                  !publishedPosts || publishedPosts.length === 0 ? (
                    <div
                      className="animate-fadeInUp col-span-1 md:col-span-2 xl:col-span-3"
                      style={{
                        animationDelay: "0.2s",
                        animationFillMode: "both",
                      }}
                    >
                      <Card className="glass-effect border-2 border-stone-200/60 shadow-xl">
                        <CardBody className="py-24">
                          <EmptyState
                            title="No published posts"
                            message="Publish a blog post to see it listed here"
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
                    publishedPosts.map((post, index) => (
                      <BlogArticleCard
                        key={post.id}
                        post={post}
                        index={index}
                        handleDeleteClick={() =>
                          handleDeleteClick(post.id, post.title)
                        }
                        togglePostPublishStatus={() =>
                          togglePostPublishStatus(post.id, post.published)
                        }
                      />
                    ))
                  )
                ) : filterPosts === "Drafts" ? (
                  !draftPosts || draftPosts.length === 0 ? (
                    <div
                      className="animate-fadeInUp col-span-1 md:col-span-2 xl:col-span-3"
                      style={{
                        animationDelay: "0.2s",
                        animationFillMode: "both",
                      }}
                    >
                      <Card className="glass-effect border-2 border-stone-200/60 shadow-xl">
                        <CardBody className="py-24">
                          <EmptyState
                            title="No drafts"
                            message="Start a new blog post to save it as a draft"
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
                    draftPosts.map((post, index) => (
                      <BlogArticleCard
                        key={post.id}
                        post={post}
                        index={index}
                        handleDeleteClick={() =>
                          handleDeleteClick(post.id, post.title)
                        }
                        togglePostPublishStatus={() =>
                          togglePostPublishStatus(post.id, post.published)
                        }
                      />
                    ))
                  )
                ) : (
                  data.data.map((post, index) => (
                    <BlogArticleCard
                      key={post.id}
                      post={post}
                      index={index}
                      handleDeleteClick={() =>
                        handleDeleteClick(post.id, post.title)
                      }
                      togglePostPublishStatus={() =>
                        togglePostPublishStatus(post.id, post.published)
                      }
                    />
                  ))
                )}
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
                <TriangleAlert className="text-red-500" />
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
                className="border flex-1 cursor-pointer border-stone-200 bg-white font-medium text-stone-700 shadow-sm transition-all duration-300 hover:border-stone-300 hover:bg-stone-50 active:scale-95"
              >
                Cancel
              </Button>
              <Button
                variant="danger"
                onClick={handleDeleteConfirm}
                isLoading={deleteBlog.isPending}
                className="border-2 flex-1 cursor-pointer border-red-600 bg-red-600 font-medium text-white shadow-lg shadow-red-600/30 transition-all duration-300 hover:border-red-700 hover:bg-red-700 hover:shadow-xl hover:shadow-red-600/40 active:scale-95"
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

// Helper
const PaginationButton = ({
  children,
  tooltip,
}: {
  children: React.ReactNode;
  tooltip: string;
}) => {
  return (
    <Tooltip delayDuration={500}>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent>
        <p>{tooltip}</p>
      </TooltipContent>
    </Tooltip>
  );
};
