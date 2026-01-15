import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/services/api'
import type { CreateBlogDto, UpdateBlogDto } from '@/types'

export function useBlogPosts(page = 1, limit = 20) {
  return useQuery({
    queryKey: ['admin-posts', page, limit],
    queryFn: () => api.posts.list(page, limit),
  })
}

export function useBlogPost(id: string) {
  return useQuery({
    queryKey: ['admin-post', id],
    queryFn: () => api.posts.getById(id),
    enabled: !!id,
  })
}

export function useCreateBlog() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateBlogDto) => api.posts.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-posts'] })
      queryClient.invalidateQueries({ queryKey: ['dashboard-stats'] })
    },
  })
}

export function useUpdateBlog() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: UpdateBlogDto) => api.posts.update(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['admin-posts'] })
      queryClient.invalidateQueries({ queryKey: ['admin-post', variables.id] })
      queryClient.invalidateQueries({ queryKey: ['dashboard-stats'] })
    },
  })
}

export function useDeleteBlog() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => api.posts.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-posts'] })
      queryClient.invalidateQueries({ queryKey: ['dashboard-stats'] })
    },
  })
}
