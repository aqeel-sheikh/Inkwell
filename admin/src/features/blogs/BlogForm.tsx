import { useState, useEffect, useRef } from "react";
import { Button } from "@/components";
import type { CreateBlogDto, BlogPost } from "@/types";
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";
import { useEditor } from "@tiptap/react";

// --- Tiptap Core Extensions ---
import { StarterKit } from "@tiptap/starter-kit";
import { TaskItem, TaskList } from "@tiptap/extension-list";
import { TextAlign } from "@tiptap/extension-text-align";
import { Typography } from "@tiptap/extension-typography";
import { Highlight } from "@tiptap/extension-highlight";
import { Subscript } from "@tiptap/extension-subscript";
import { Superscript } from "@tiptap/extension-superscript";
import { Selection } from "@tiptap/extensions";

import { HorizontalRule } from "@/components/tiptap-node/horizontal-rule-node/horizontal-rule-node-extension";
import { CloseIcon } from "@/components/tiptap-icons/close-icon";
import { Settings, TriangleAlert } from "lucide-react";

interface BlogFormProps {
  initialData?: BlogPost;
  onSubmit: (data: CreateBlogDto) => Promise<void>;
  isLoading?: boolean;
  errors?: { fieldErrors?: Record<string, string> };
  generalError?: string;
  onCancel?: () => void;
}

const initialInputErrors = {
  titleError: "",
  contentError: "",
  excerptError: "",
};
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
  const [inputErros, setInputErrors] = useState(initialInputErrors);

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

  const editor = useEditor({
    immediatelyRender: true,
    editorProps: {
      attributes: {
        autocomplete: "off",
        autocorrect: "off",
        autocapitalize: "off",
        "aria-label": "Main content area, start typing to enter text.",
        class: "simple-editor",
      },
    },
    extensions: [
      StarterKit.configure({
        horizontalRule: false,
        link: {
          openOnClick: false,
          enableClickSelection: true,
        },
      }),
      HorizontalRule,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      TaskList,
      TaskItem.configure({ nested: true }),
      Highlight.configure({ multicolor: true }),
      Typography,
      Superscript,
      Subscript,
      Selection,
    ],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setInputErrors(initialInputErrors);
    console.log(inputErros);

    const content = editor.getHTML();

    const tags = tagsInput
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);

    if (formData.title.trim().length < 4) {
      setInputErrors({
        ...initialInputErrors,
        titleError: "Title must be at least 4 characters long !",
      });
      return;
    }
    if (!hasRealContent(content)) {
      setInputErrors({
        ...initialInputErrors,
        contentError: "Blog content cannot be empty !",
      });
      return;
    }
    if (formData.excerpt.trim().length < 10) {
      setInputErrors({
        ...initialInputErrors,
        excerptError: "Blog summary must be at least 10 characters long !",
      });
      return;
    }

    await onSubmit({
      ...formData,
      content,
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
        {/* Aside backdrop close */}
        {showSettings && (
          <div
            onClick={() => setShowSettings(false)}
            className="absolute w-full h-full"
          />
        )}
        {/* Top bar */}
        <header className="border-stone-200/40 backdrop-blur-xl">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-4 md:px-8 py-4">
            <div className="flex items-center gap-4">
              {onCancel && (
                <button
                  onClick={onCancel}
                  className="rounded-lg p-2 text-stone-600 transition-colors hover:bg-stone-100 cursor-pointer"
                  title="Exit"
                >
                  <CloseIcon className="h-5 w-5" />
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
        <section className="h-full mx-auto max-w-5xl overflow-y-auto py-5 ">
          <div className="mx-auto px-6 md:px-8">
            {/* Error */}
            {generalError && (
              <div className="mb-8 rounded-2xl border border-red-200/60 bg-red-50/40 p-6">
                <div className="flex items-start gap-3">
                  <TriangleAlert className="h-5 w-5 shrink-0 text-red-600" />
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
              {fieldErrors.title ||
                (inputErros.titleError && (
                  <p
                    className="text-sm text-red-600 -mt-6 border w-fit p-2 rounded-lg border-red-100 bg-red-50"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {fieldErrors.title || inputErros.titleError}
                  </p>
                ))}

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
              <SimpleEditor
                editor={editor}
                error={fieldErrors.content || inputErros.contentError}
              />
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
                  <CloseIcon className="h-5 w-5" />
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
                  {fieldErrors.excerpt ||
                    (inputErros.excerptError && (
                      <p
                        className="text-sm text-red-600 border w-fit p-2 rounded-lg border-red-100 bg-red-50"
                        style={{ fontFamily: "'DM Sans', sans-serif" }}
                      >
                        {fieldErrors.excerpt || inputErros.excerptError}
                      </p>
                    ))}
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
          <Settings className="h-6 w-6 text-stone-700" />
          {fieldErrors.excerpt ||
            (inputErros.excerptError && (
              <span className="absolute h-3 w-3 bg-red-500 border border-stone-300 shadow-black shadow-xl top-1 -left-px rounded-full" />
            ))}
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

const hasRealContent = (html: string) => {
  const doc = new DOMParser().parseFromString(html, "text/html");

  doc.querySelectorAll("br").forEach((br) => br.remove());

  const text = doc.body.textContent?.replace(/\u00A0/g, "").trim();

  return text.length > 0;
};
