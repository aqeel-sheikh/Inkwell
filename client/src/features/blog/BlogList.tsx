import { useBlogPosts } from './useBlog'
import { BlogCard } from './BlogCard'
import { LoadingSpinner, ErrorMessage, EmptyState } from '@/components'

export function BlogList() {
  const { data, isLoading, error, refetch } = useBlogPosts()

  if (isLoading) {
    return <LoadingSpinner size="lg" />
  }

  if (error) {
    return (
      <ErrorMessage
        message="Failed to load blog posts. Please try again."
        onRetry={() => refetch()}
      />
    )
  }

  if (!data?.data || data.data.length === 0) {
    return (
      <EmptyState
        title="No stories yet"
        message="Check back soon for inspiring content"
      />
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
      {data.data.map((post, index) => (
        <BlogCard key={post.id} post={post} index={index} />
      ))}
    </div>
  )
}
