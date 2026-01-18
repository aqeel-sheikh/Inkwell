import { useParams, Link } from 'react-router'
import { useBlogPost } from '@/features/blog/useBlog'
import { CommentList } from '@/features/comments/CommentList'
import { CommentForm } from '@/features/comments/CommentForm'
import { PageLoader } from '@/components/LoadingSpinner'
import { ErrorMessage } from '@/components'

export function BlogDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const { data: post, isLoading, error, refetch } = useBlogPost(slug!)
  
  if (isLoading) {
    return <PageLoader />
  }
  
  if (error || !post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <ErrorMessage
          message="Failed to load this story. It may have been removed or the URL is incorrect."
          onRetry={() => refetch()}
        />
      </div>
    )
  }

  const formattedDate = new Date(post.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div className="min-h-screen">
      <article className="py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Navigation */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-brand-600 hover:text-accent-coral transition-colors mb-8 group"
          >
            <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to stories
          </Link>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex gap-2 mb-6 animate-fade-in">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-sm font-medium px-4 py-1.5 bg-accent-mint/10 text-accent-mint rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h1 className="font-display text-4xl md:text-6xl font-bold text-brand-900 mb-6 leading-tight animate-fade-in animation-delay-200">
            {post.title}
          </h1>

          {/* Author & Date */}
          <div className="flex items-center gap-4 pb-8 mb-8 border-b border-brand-200 animate-fade-in animation-delay-400">
            <div className="flex items-center gap-3">
              {post.author?.avatar ? (
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-accent-lavender/20 flex items-center justify-center">
                  <span className="text-accent-lavender font-semibold text-lg">
                    {post.author.name.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
              <div>
                <p className="font-semibold text-brand-900">{post.author.name}</p>
                <p className="text-sm text-brand-500">{formattedDate}</p>
              </div>
            </div>
          </div>

          {/* Cover Image */}
          {post.coverImage && (
            <div className="aspect-21/9 mb-12 overflow-hidden rounded-xl animate-scale-in">
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Content */}
          <div className="prose prose-lg max-w-none animate-fade-in animation-delay-600">
            {post.content}
          </div>

          {/* Author Bio */}
          {post?.author?.bio && (
            <div className="mt-16 p-8 bg-brand-100 rounded-xl border border-brand-200">
              <div className="flex items-start gap-4">
                {post.author.avatar ? (
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="w-16 h-16 rounded-full object-cover shrink-0"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-accent-lavender/20 flex items-center justify-center shrink-0">
                    <span className="text-accent-lavender font-semibold text-xl">
                      {post?.author?.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
                <div>
                  <p className="font-display text-xl font-semibold text-brand-900 mb-2">
                    About {post?.author?.name}
                  </p>
                  <p className="text-brand-700 leading-relaxed">{post?.author?.bio}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </article>

      {/* Comments Section */}
      <section className="py-16 bg-brand-50 border-t border-brand-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            <CommentForm postId={post.id} isAuthenticated={false} />
            <CommentList postId={post.id} />
          </div>
        </div>
      </section>
    </div>
  )
}
