import { useState } from "react";
import { useCreateComment } from "./useComments";
import { Button, Textarea } from "@/components";
import AuthModel from "@/components/AuthModel";
import { MessageSquareLock } from "lucide-react";

interface CommentFormProps {
  postId: string;
  isAuthenticated?: boolean;
}

export function CommentForm({
  postId,
  isAuthenticated = false,
}: CommentFormProps) {
  const [content, setContent] = useState("");
  const createComment = useCreateComment();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!content.trim()) return;

    try {
      await createComment.mutateAsync({ content, postId });
      setContent("");
    } catch (error) {
      console.error("Failed to create comment:", error);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="bg-primary-100 border border-primary-200 rounded-lg p-8 text-center">
        <MessageSquareLock className="w-12 h-12 text-primary-400 mx-auto mb-4" />
        <h3 className="font-display text-xl font-semibold text-primary-900 mb-2">
          Sign in to comment
        </h3>
        <p className="text-primary-600 mb-4">
          Join the conversation by logging in or creating an account
        </p>
        <AuthModel />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Textarea
        label="Share your thoughts"
        placeholder="Write a thoughtful comment..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={4}
        required
      />
      <div className="flex justify-end">
        <Button
          type="submit"
          isLoading={createComment.isPending}
          disabled={!content.trim() || createComment.isPending}
          className="cursor-pointer"
        >
          Post Comment
        </Button>
      </div>
      {createComment.isError && (
        <p className="text-sm text-red-600">
          Failed to post comment. Please try again.
        </p>
      )}
    </form>
  );
}
