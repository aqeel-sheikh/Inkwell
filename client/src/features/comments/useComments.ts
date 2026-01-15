import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/services/api'
import type { CreateCommentDto } from '@/types'

export function useComments(postId: string) {
  return useQuery({
    queryKey: ['comments', postId],
    queryFn: () => api.comments.list(postId),
    enabled: !!postId,
  })
}

export function useCreateComment() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateCommentDto) => api.comments.create(data),
    onSuccess: (_, variables) => {
      // Invalidate and refetch comments for this post
      queryClient.invalidateQueries({ queryKey: ['comments', variables.postId] })
    },
  })
}
