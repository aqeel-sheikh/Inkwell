import { useComments } from "./useComments";
import { LoadingSpinner, ErrorMessage, EmptyState } from "@/components";
import type { Comment } from "@/types";

interface CommentListProps {
  postId: string;
}

function CommentItem({ comment }: { comment: Comment }) {
  const formattedDate = new Date(comment.createdAt).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "short",
      day: "numeric",
    },
  );

  return (
    <div className="flex gap-4 p-6 bg-white rounded-lg border border-brand-200">
      {comment.author.avatar ? (
        <img
          src={comment.author.avatar}
          alt={comment.author.name}
          className="w-12 h-12 rounded-full object-cover shrink-0"
        />
      ) : (
        <div className="w-12 h-12 rounded-full bg-accent-lavender/20 flex items-center justify-center shrink-0">
          <span className="text-accent-lavender font-semibold">
            {comment.author.name.charAt(0).toUpperCase()}
          </span>
        </div>
      )}

      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2 mb-2">
          <p className="font-semibold text-brand-900">{comment.author.name}</p>
          <span className="text-sm text-brand-500">·</span>
          <p className="text-sm text-brand-500">{formattedDate}</p>
        </div>
        <p className="text-brand-700 leading-relaxed whitespace-pre-wrap">
          {comment.content}
        </p>
      </div>
    </div>
  );
}

export function CommentList({ postId }: CommentListProps) {
  const { data: comments, isLoading, error } = useComments(postId);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message="Failed to load comments" />;
  }

  if (!comments || comments.length === 0) {
    return (
      <EmptyState
        title="No comments yet"
        message="Be the first to share your thoughts"
        icon={
          <svg
            className="w-10 h-10 text-brand-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        }
      />
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="font-display text-2xl font-bold text-brand-900 mb-6">
        Comments ({comments.length})
      </h3>
      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </div>
  );
}
