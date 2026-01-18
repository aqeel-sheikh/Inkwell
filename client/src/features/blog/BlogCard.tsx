import { Link } from 'react-router'
import type { BlogPost } from '@/types'

interface BlogCardProps {
  post: BlogPost
  index?: number
}

export function BlogCard({ post, index = 0 }: BlogCardProps) {
  const formattedDate = new Date(post.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <article 
      className="group animate-slide-up"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <Link to={`/blog/${post.slug}`} className="block">
        {post.coverImage && (
          <div className="aspect-video mb-6 overflow-hidden rounded-lg bg-brand-200">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        )}

        <div className="space-y-3">
          {post.tags && post.tags.length > 0 && (
            <div className="flex gap-2">
              {post.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-medium px-3 py-1 bg-accent-mint/10 text-accent-mint rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <h2 className="font-display text-2xl md:text-3xl font-bold text-brand-900 group-hover:text-accent-coral transition-colors line-clamp-2">
            {post.title}
          </h2>

          <p className="text-brand-600 line-clamp-3 leading-relaxed">
            {post.excerpt}
          </p>

          <div className="flex items-center gap-4 pt-4">
            <div className="flex items-center gap-3">
              {post.author.avatar ? (
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-accent-lavender/20 flex items-center justify-center">
                  <span className="text-accent-lavender font-semibold text-sm">
                    {post.author.name.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
              <div>
                <p className="font-medium text-brand-900 text-sm">{post.author.name}</p>
                <p className="text-brand-500 text-xs">{formattedDate}</p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </article>
  )
}
