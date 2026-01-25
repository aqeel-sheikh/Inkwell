import { useState, useEffect, useRef } from "react";
import { Button } from "@/components";
import type { CreateBlogDto, BlogPost } from "@/types";

interface BlogFormProps {
  initialData?: BlogPost;
  onSubmit: (data: CreateBlogDto) => Promise<void>;
  isLoading?: boolean;
  errors?: { fieldErrors?: Record<string, string> };
  generalError?: string;
  onCancel?: () => void;
}

export function BlogForm({
  initialData,
  onSubmit,
  isLoading,
  errors,
  generalError,
  onCancel,
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
  const [showSettings, setShowSettings] = useState(false);
  const titleRef = useRef<HTMLTextAreaElement>(null);

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
      tags: [...new Set([...(formData.tags || []), ...tags])],
    });
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({ ...formData, title: e.target.value });
    e.target.style.height = "auto";
    e.target.style.height = e.target.scrollHeight + "px";
  };

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && tagsInput.trim()) {
      e.preventDefault();
      const newTags = tagsInput
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean);
      setFormData({
        ...formData,
        tags: [...new Set([...(formData.tags || []), ...newTags])],
      });
      setTagsInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData({
      ...formData,
      tags: formData.tags && formData.tags.filter((tag) => tag !== tagToRemove),
    });
  };

  return (
    <>
      <div className="relative min-h-screen bg-[#fafaf9]">
        {/* Ambient background */}
        <div className="pointer-events-none fixed inset-0 overflow-hidden">
          <div
            className="absolute -right-64 -top-64 h-[800px] w-[800px] rounded-full bg-linear-to-br from-amber-100/40 via-rose-100/30 to-transparent opacity-60 blur-3xl animate-float"
            style={{ animationDelay: "0s" }}
          />
          <div
            className="absolute -bottom-64 -left-64 h-[700px] w-[700px] rounded-full bg-linear-to-tr from-indigo-100/40 via-purple-100/30 to-transparent opacity-50 blur-3xl animate-float"
            style={{ animationDelay: "2s" }}
          />
        </div>
        {/* Aside backdrop close */}
        {showSettings && (
          <div
            onClick={() => setShowSettings(false)}
            className="absolute w-full h-full"
          />
        )}
        {/* Top bar */}
        <header className="border-stone-200/40 backdrop-blur-xl">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 md:px-8 py-4">
            <div className="flex items-center gap-4">
              {onCancel && (
                <button
                  onClick={onCancel}
                  className="rounded-lg p-2 text-stone-600 transition-colors hover:bg-stone-100 cursor-pointer"
                  title="Exit"
                >
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
              <div className="flex items-center gap-2 rounded-full border border-stone-200/60 bg-stone-50/50 px-3 py-1.5">
                <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-500" />
                <span
                  className="text-xs font-medium uppercase tracking-[0.15em] text-stone-600"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {initialData ? "Editing" : "Draft"}
                </span>
              </div>
            </div>

            <FormSubmitButton isLoading={isLoading} initialData={initialData} />
          </div>
        </header>

        {/* Writing canvas */}
        <section className="h-full mx-auto max-w-6xl overflow-y-auto pt-5 pb-32">
          <div className="mx-auto px-6 md:px-8">
            {/* Error */}
            {generalError && (
              <div className="mb-8 rounded-2xl border border-red-200/60 bg-red-50/40 p-6">
                <div className="flex items-start gap-3">
                  <svg
                    className="h-5 w-5 shrink-0 text-red-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                    />
                  </svg>
                  <p
                    className="text-sm text-red-800"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {generalError}
                  </p>
                </div>
              </div>
            )}
            {/* Form */}
            <form id="blog-form" onSubmit={handleSubmit} className="space-y-8">
              {/* Title */}
              <textarea
                ref={titleRef}
                className="text-[3rem] max-md:text-[2rem] font-normal leading-[1.15] text-[#1c1917] border-none outline-none w-full resize-none overflow-hidden bg-transparent p-0"
                style={{ fontFamily: "'Crimson Pro', serif" }}
                placeholder="Article Title..."
                value={formData.title}
                onChange={handleTitleChange}
                required
                rows={1}
              />
              {fieldErrors.title && (
                <p
                  className="text-sm text-red-600 -mt-6"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {fieldErrors.title}
                </p>
              )}

              {/* Cover Image */}
              {formData.coverImage && (
                <div className="relative group rounded-2xl overflow-hidden">
                  <img
                    src={formData.coverImage}
                    alt="Cover"
                    className="w-full h-64 object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, coverImage: "" })}
                    className="absolute top-4 right-4 rounded-lg bg-black/60 px-3 py-2 text-sm text-white opacity-0 transition-opacity group-hover:opacity-100"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    Remove
                  </button>
                </div>
              )}

              {/* Content */}
              <textarea
                className="text-[1.125rem] max-md:text-[1rem] leading-[1.75] text-[#292524] outline-none w-full overflow-hidden resize-none bg-transparent p-0"
                onInput={(e: React.FormEvent<HTMLTextAreaElement>) => {
                  const target = e.currentTarget;
                  target.style.height = "auto";
                  target.style.height = `${target.scrollHeight}px`;
                }}
                placeholder="Tell your story..."
                value={formData.content}
                onChange={(e) =>
                  setFormData({ ...formData, content: e.target.value })
                }
                required
                style={{ fontFamily: "'Lora', 'Georgia', serif" }}
              />
              {fieldErrors.content && (
                <p
                  className="text-sm text-red-600 -mt-6"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {fieldErrors.content}
                </p>
              )}
            </form>
          </div>
        </section>

        {/* Settings panel */}
        {showSettings && (
          <aside className="animate-fadeIn fixed right-0 top-0 z-50 h-full w-96 border-l border-stone-200 bg-white shadow-2xl">
            <div className="flex h-full flex-col">
              <div className="flex items-center justify-between border-b border-stone-200 p-6">
                <h2
                  className="text-xl font-light text-stone-900"
                  style={{ fontFamily: "'Crimson Pro', serif" }}
                >
                  Settings
                </h2>
                <button
                  onClick={() => setShowSettings(false)}
                  className="rounded-lg p-2 text-stone-600 hover:bg-stone-100 cursor-pointer"
                >
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {/* Cover Image */}
                <div className="space-y-2">
                  <label
                    className="text-sm font-medium text-stone-700"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    Cover Image URL
                  </label>
                  <input
                    type="url"
                    className="w-full rounded-xl border border-stone-200 bg-white p-3 text-sm outline-none focus:border-stone-400"
                    placeholder="https://example.com/image.jpg"
                    value={formData.coverImage}
                    onChange={(e) =>
                      setFormData({ ...formData, coverImage: e.target.value })
                    }
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  />
                </div>

                {/* Excerpt */}
                <div className="space-y-2">
                  <label
                    className="text-sm font-medium text-stone-700"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    Excerpt*
                  </label>
                  <textarea
                    className="w-full rounded-xl border border-stone-200 bg-white p-3 text-sm outline-none focus:border-stone-400"
                    placeholder="Brief summary"
                    value={formData.excerpt}
                    onChange={(e) =>
                      setFormData({ ...formData, excerpt: e.target.value })
                    }
                    rows={3}
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  />
                  {fieldErrors.excerpt && (
                    <p
                      className="text-sm text-red-500"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      {fieldErrors.excerpt}
                    </p>
                  )}
                </div>

                {/* Tags */}
                <div className="space-y-2">
                  <label
                    className="text-sm font-medium text-stone-700"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    Tags
                  </label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {formData.tags &&
                      formData.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center gap-2 rounded-lg border border-stone-200 bg-stone-50 px-3 py-1.5 text-sm"
                          style={{ fontFamily: "'DM Sans', sans-serif" }}
                        >
                          {tag}
                          <button
                            type="button"
                            onClick={() => removeTag(tag)}
                            className="text-stone-400 hover:text-stone-600"
                          >
                            <svg
                              className="h-3 w-3"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                        </span>
                      ))}
                  </div>
                  <input
                    type="text"
                    className="w-full rounded-xl border border-stone-200 bg-white p-3 text-sm outline-none focus:border-stone-400"
                    placeholder="Add tags (comma separated)"
                    value={tagsInput}
                    onChange={(e) => setTagsInput(e.target.value)}
                    onKeyDown={handleAddTag}
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  />
                </div>

                {/* Publish */}
                <div className="flex items-center gap-3 rounded-xl border border-stone-200 bg-stone-50 p-4">
                  <input
                    type="checkbox"
                    checked={formData.published}
                    onChange={(e) =>
                      setFormData({ ...formData, published: e.target.checked })
                    }
                    className="h-4 w-4 rounded border-stone-300 text-stone-900 cursor-pointer"
                  />
                  <span
                    className="text-sm text-stone-700"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    Publish immediately
                  </span>
                </div>

                <div className="flex justify-end items-center">
                  <FormSubmitButton
                    isLoading={isLoading}
                    initialData={initialData}
                  />
                </div>
              </div>
            </div>
          </aside>
        )}

        {/* Floating settings button */}
        <button
          type="button"
          onClick={() => setShowSettings(!showSettings)}
          className="fixed bottom-8 right-8 z-40 flex h-14 w-14 items-center justify-center rounded-full border border-stone-200 bg-white shadow-xl transition-all hover:scale-110 hover:shadow-2xl cursor-pointer"
        >
          <svg
            className="h-6 w-6 text-stone-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          {fieldErrors.excerpt && (
            <span className="absolute h-3 w-3 bg-red-500 border border-stone-300 shadow-black shadow-xl top-1 -left-px rounded-full" />
          )}
        </button>
      </div>
    </>
  );
}

// Helper
const FormSubmitButton = ({
  isLoading,
  initialData,
}: {
  isLoading: boolean | undefined;
  initialData: BlogPost | undefined;
}) => (
  <div className="flex items-center gap-3">
    <Button
      type="submit"
      form="blog-form"
      disabled={isLoading}
      className="border-0 bg-linear-to-br from-stone-900 via-stone-800 to-stone-900 font-medium text-white shadow-lg transition-all hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:scale-100 cursor-pointer"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          {initialData ? "Updating..." : "Publishing..."}
        </span>
      ) : initialData ? (
        "Update Post"
      ) : (
        "Publish"
      )}
    </Button>
  </div>
);
