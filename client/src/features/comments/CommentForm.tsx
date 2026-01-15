import { useState } from 'react'
import { useCreateComment } from './useComments'
import { Button, Textarea } from '@/components'

interface CommentFormProps {
  postId: string
  isAuthenticated?: boolean
}

export function CommentForm({ postId, isAuthenticated = false }: CommentFormProps) {
  const [content, setContent] = useState('')
  const createComment = useCreateComment()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!content.trim()) return

    try {
      await createComment.mutateAsync({ content, postId })
      setContent('')
    } catch (error) {
      console.error('Failed to create comment:', error)
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="bg-brand-100 border border-brand-200 rounded-lg p-8 text-center">
        <svg className="w-12 h-12 text-brand-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
        <h3 className="font-display text-xl font-semibold text-brand-900 mb-2">
          Sign in to comment
        </h3>
        <p className="text-brand-600 mb-4">
          Join the conversation by logging in or creating an account
        </p>
        <Button variant="primary">Sign In</Button>
      </div>
    )
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
  )
}
