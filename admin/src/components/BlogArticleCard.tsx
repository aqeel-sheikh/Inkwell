import { BlogPost } from "@/types";
import { Calendar, SquarePen, Trash2Icon } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardBody } from "./Card";
import { Link } from "react-router";

export const BlogArticleCard = ({
  post,
  index,
  handleDeleteClick,
  togglePostPublishStatus,
}: {
  post: BlogPost;
  index: number;
  handleDeleteClick: (id: string, title: string) => void;
  togglePostPublishStatus: (id: string, status: boolean) => void;
}) => {
  return (
    <article
      key={post.id}
      className="group animate-fadeInUp"
      style={{
        animationDelay: `${0.2 + index * 0.1}s`,
        animationFillMode: "both",
      }}
    >
      <Card className="glass-effect relative h-full overflow-hidden border border-stone-200/80 shadow-lg transition-all duration-700 hover:border-stone-300 hover:shadow-2xl hover:shadow-stone-900/10 hover:-translate-y-2">
        {/* Top accent line */}
        <div className="absolute left-0 right-0 top-0 h-1 bg-linear-to-r from-amber-500 via-rose-500 to-purple-500 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <CardBody className="relative flex h-full flex-col gap-6 p-8">
          {/* Status Badge */}
          <button
            onClick={() => togglePostPublishStatus(post.id, post.published)}
            className="status-btn flex items-start justify-between cursor-pointer w-fit"
          >
            <span
              className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] shadow-sm transition-all duration-300 ${
                post.published
                  ? "border border-emerald-200/80 bg-emerald-50/80 text-emerald-700 published"
                  : "border border-amber-200/80 bg-amber-50/80 text-amber-700 draft"
              }`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${post.published ? "bg-emerald-500" : "bg-amber-500"}`}
              />
              {post.published ? "Published" : "Draft"}
            </span>
          </button>
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
            <div className="flex items-center gap-2 text-sm text-stone-500">
              <Calendar className="h-4 w-4" />
              <time className="font-medium">
                {new Date(post.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "numeric",
                  minute: "2-digit",
                })}
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
            <Link to={`/dashboard/blogs/${post.id}/edit`} className="flex-1">
              <Button
                variant="ghost"
                size="sm"
                className="w-full cursor-pointer justify-center border border-stone-200 bg-white/80 px-4 py-2.5 text-sm font-medium text-stone-700 shadow-sm transition-all duration-300 hover:border-stone-900 hover:bg-stone-900 hover:text-white hover:shadow-md active:scale-95"
              >
                <SquarePen className="mr-1 h-4 w-4 transition-transform duration-300 group-hover:rotate-6" />
                Edit
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleDeleteClick(post.id, post.title)}
              className="group/delete cursor-pointer border border-stone-200 bg-white/80 p-2.5 shadow-sm transition-all duration-300 hover:border-red-300 hover:bg-red-50 hover:shadow-md active:scale-95"
            >
              <Trash2Icon className="h-5 w-5 text-stone-500 transition-all duration-300 group-hover/delete:scale-110 group-hover/delete:text-red-600" />
            </Button>
          </div>
        </CardBody>
      </Card>
    </article>
  );
};
