import { useParams, Link } from "react-router";
import { useBlogPost } from "@/features/blog/useBlog";
import { CommentList } from "@/features/comments/CommentList";
import { CommentForm } from "@/features/comments/CommentForm";
import { PageLoader } from "@/components/LoadingSpinner";
import { ErrorMessage } from "@/components";
import { useSession } from "@/auth/auth-client";
import { ChevronLeft, Clock, Calendar } from "lucide-react";
import { calculateReadingTime } from "@/lib/utils";
import parse from "html-react-parser"

export function BlogDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { data: post, isLoading, error, refetch } = useBlogPost(slug!);
  const { data } = useSession();

  const isAuthenticated = data?.session ? true : false;

  if (isLoading) {
    return <PageLoader />;
  }

  if (error || !post) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <ErrorMessage
          message="Failed to load this story. It may have been removed or the URL is incorrect."
          onRetry={() => refetch()}
        />
      </div>
    );
  }

  const formattedDate = new Date(post.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const randomNumber = Math.floor(Math.random() * (1000 - 1 + 1)) + 1;

  return (
    <div className="min-h-screen bg-[#fafaf9]">
      <article className="bg-white py-12 md:py-16">
        <div className="mx-auto max-w-4xl px-6 sm:px-8 lg:px-12">
          {/* Back Navigation */}
          <Link
            to="/"
            className="group mb-8 inline-flex items-center gap-2 text-stone-600 transition-colors hover:text-stone-900"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            <ChevronLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
            Back to stories
          </Link>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="animate-fadeIn mb-6 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-lg border border-stone-200 bg-stone-50 px-3 py-1.5 text-xs font-medium text-stone-700 transition-colors hover:border-stone-300 hover:bg-white"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h1
            className="animate-fadeIn delay-100 mb-6 text-4xl font-light leading-tight tracking-tight text-stone-900 md:text-5xl lg:text-6xl"
            style={{ fontFamily: "'Crimson Pro', serif" }}
          >
            {post.title}
          </h1>

          {/* Author & Meta */}
          <div className="animate-fadeIn delay-200 mb-12 flex flex-wrap items-center gap-6 border-b border-stone-200/60 pb-8">
            <div className="flex items-center gap-3">
              {post.author?.image ? (
                <img
                  src={post.author.image}
                  alt={post.author.name}
                  className="h-12 w-12 rounded-full object-cover"
                />
              ) : (
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-300">
                  <span className="text-lg font-semibold text-white">
                    {post.author.name.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
              <div>
                <p
                  className="text-base font-medium text-stone-900"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {post.author.name}
                </p>
                <p
                  className="text-sm text-stone-500"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  @{post.author.username}
                </p>
              </div>
            </div>

            <div
              className="flex items-center gap-4 text-sm text-stone-500"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              <div className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                <time>{formattedDate}</time>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                <span>{calculateReadingTime(post.content)} min read</span>
              </div>
            </div>
          </div>

          {/* Cover Image */}
          <div className="mb-12 overflow-hidden rounded-2xl">
            <img
              src={
                post.coverImage ||
                `https://picsum.photos/seed/${randomNumber}/800/450`
              }
              alt={post.title}
              className="h-full w-full object-cover"
            />
          </div>
          {/* Content */}
          <div
            className="prose prose-lg prose-stone mx-auto max-w-none"
            style={{ fontFamily: "'Lora', 'Georgia', serif" }}
          >
            <div className="whitespace-pre-wrap wrap-break-word break-all leading-relaxed text-stone-800">
              {parse(post.content)}
            </div>
          </div>

          {/* Author Bio */}
          {post.author.bio && (
            <div className="mt-16 overflow-hidden rounded-2xl border border-stone-200/80 bg-stone-50/50 p-8">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
                {post.author.image ? (
                  <img
                    src={post.author.image}
                    alt={post.author.name}
                    className="h-20 w-20 shrink-0 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-primary-300">
                    <span className="text-2xl font-semibold text-white">
                      {post.author.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
                <div className="flex-1">
                  <p
                    className="mb-3 text-xl font-light text-stone-900"
                    style={{ fontFamily: "'Crimson Pro', serif" }}
                  >
                    About{" "}
                    <span className="font-semibold bg-red-100">{post.author.name}</span>
                  </p>
                  <p
                    className="mb-3 leading-relaxed text-stone-700"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {post.author.bio}
                  </p>
                  {post.author.website && (
                    <a
                      href={post.author.website}
                      className="inline-flex items-center gap-2 text-sm font-medium text-stone-900 transition-colors hover:text-stone-700"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                        />
                      </svg>
                      Visit website
                    </a>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </article>

      {/* Comments Section */}
      <section className="border-t border-stone-200/60 bg-white py-16">
        <div className="mx-auto max-w-4xl px-6 sm:px-8 lg:px-12">
          <h2
            className="mb-8 text-3xl font-light tracking-tight text-stone-900"
            style={{ fontFamily: "'Crimson Pro', serif" }}
          >
            Comments
          </h2>
          <div className="space-y-8">
            <CommentForm postId={post.id} isAuthenticated={isAuthenticated} />
            <CommentList postId={post.id} />
          </div>
        </div>
      </section>
    </div>
  );
}
