import { useNavigate } from 'react-router-dom'
import { useCreateBlog } from '@/features/blogs/useBlogs'
import { BlogForm } from '@/features/blogs/BlogForm'
import { Card, CardBody, Button } from '@/components'
import type { CreateBlogDto } from '@/types'

export function CreateBlogPage() {
  const navigate = useNavigate()
  const createBlog = useCreateBlog()

  const handleSubmit = async (data: CreateBlogDto) => {
    try {
      await createBlog.mutateAsync(data)
      navigate('/dashboard/blogs')
    } catch (error) {
      console.error('Failed to create blog:', error)
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-gray-900">Create New Post</h1>
          <p className="text-gray-600 mt-2">Share your thoughts with the world</p>
        </div>
        <Button variant="ghost" onClick={() => navigate('/dashboard/blogs')}>
          Cancel
        </Button>
      </div>

      <Card>
        <CardBody>
          <BlogForm onSubmit={handleSubmit} isLoading={createBlog.isPending} />
        </CardBody>
      </Card>
    </div>
  )
}
