import { useState, useEffect } from "react";
import { Input, Textarea, Button } from "@/components";
import type { CreateBlogDto, BlogPost } from "@/types";

interface BlogFormProps {
  initialData?: BlogPost;
  onSubmit: (data: CreateBlogDto) => Promise<void>;
  isLoading?: boolean;
  errors?: { fieldErrors?: Record<string, string> };
}

export function BlogForm({
  initialData,
  onSubmit,
  isLoading,
  errors,
}: BlogFormProps) {
  const fieldErrors = errors?.fieldErrors ?? {};
  const [formData, setFormData] = useState<CreateBlogDto>({
    title: "",
    excerpt: "",
    content: "",
    coverImage: "",
    published: false,
    tags: [],
  });

  const [tagsInput, setTagsInput] = useState("");

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title,
        excerpt: initialData.excerpt,
        content: initialData.content,
        coverImage: initialData.coverImage || "",
        published: initialData.published,
        tags: initialData.tags || [],
      });
      setTagsInput(initialData.tags?.join(", ") || "");
    }
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const tags = tagsInput
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);

    await onSubmit({
      ...formData,
      tags,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        label="Title"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        placeholder="Enter blog title"
        error={fieldErrors.title}
        required
      />

      <Textarea
        label="Excerpt"
        value={formData.excerpt}
        onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
        placeholder="Brief summary of your blog post"
        rows={3}
        error={fieldErrors.excerpt}
        required
        helperText="This will be displayed in the blog list"
      />

      <Textarea
        label="Content"
        value={formData.content}
        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
        placeholder="Write your blog content here (HTML supported)"
        rows={12}
        error={fieldErrors.content}
        required
        helperText="You can use HTML tags for formatting"
      />

      <Input
        label="Cover Image URL"
        value={formData.coverImage}
        onChange={(e) =>
          setFormData({ ...formData, coverImage: e.target.value })
        }
        placeholder="https://example.com/image.jpg"
        type="url"
      />

      <Input
        label="Tags"
        value={tagsInput}
        onChange={(e) => setTagsInput(e.target.value)}
        placeholder="react, typescript, web-development"
        helperText="Separate tags with commas"
      />

      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          id="published"
          checked={formData.published}
          onChange={(e) =>
            setFormData({ ...formData, published: e.target.checked })
          }
          className="w-4 h-4 text-primary-600 bg-white border-gray-300 rounded focus:ring-primary-500"
        />
        <label
          htmlFor="published"
          className="text-sm font-medium text-gray-700"
        >
          Publish immediately
        </label>
      </div>

      <div className="flex gap-3 pt-4">
        <Button type="submit" isLoading={isLoading} fullWidth>
          {initialData ? "Update Blog Post" : "Create Blog Post"}
        </Button>
      </div>
    </form>
  );
}
