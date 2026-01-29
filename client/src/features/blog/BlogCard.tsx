import { Link } from "react-router";
import type { BlogPost } from "@/types";

interface BlogCardProps {
  post: BlogPost;
  index?: number;
}

export function BlogCard({ post, index = 0 }: BlogCardProps) {
  const formattedDate = new Date(post.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <article
        className="animate-slide-up"
        style={{ animationDelay: `${index * 100}ms` }}
      >
        <Link to={`/blog/${post.slug}`} className="block">
          {post.coverImage && (
            <div className="aspect-video mb-6 overflow-hidden rounded-lg bg-primary-200">
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          )}

          <div className="space-y-3 border border-primary-100 h-[300px] p-4 bg-white/80 rounded-2xl flex flex-col transition-colors hover:bg-primary-700 group">
            {post.tags && post.tags.length > 0 ? (
              <div className="flex gap-2 overflow-x-hidden whitespace-nowrap">
                {post.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-medium px-3 py-1 bg-primary-100 text-primary-500 rounded-full  transition-colors group-hover:text-primary-300 group-hover:bg-primary-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            ) : (
              <div className="py-1 text-xs text-black/30 group-hover:text-primary-500">
                No tags
              </div>
            )}

            <h2 className="font-display text-2xl md:text-3xl font-bold text-primary-900 group-hover:text-white transition-colors line-clamp-2">
              {post.title}
            </h2>

            <p className="text-primary-600 line-clamp-3 leading-relaxed transition-colors group-hover:text-white/70">
              {post.excerpt}
            </p>

            <div className="flex items-center gap-4 pt-4 mt-auto">
              <div className="flex items-center gap-3">
                {post.author?.avatar ? (
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-primary-200 flex items-center justify-center transition-colors group-hover:bg-primary-600">
                    <span className="text-primary-400 font-semibold text-sm transition-colors">
                      {post.author.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
                <div>
                  <p className="font-medium text-primary-900 text-sm transition-colors group-hover:text-white">
                    {post.author.name}
                  </p>
                  <p className="text-primary-500 text-xs transition-colors group-hover:text-white/60">
                    {formattedDate}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </article>
    </>
  );
}
