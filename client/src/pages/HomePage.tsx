import { useState } from "react";
import { Link } from "react-router";
import { BlogList } from "@/features/blog/BlogList";
import { useBlogPosts } from "@/features/blog/useBlog";
import { Bookmark } from "lucide-react";
import { HomepagePagination } from "@/components/HomepagePagination";

export function HomePage() {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, error, refetch } = useBlogPosts(currentPage, 6);
  const randomNumber =
    data?.data &&
    Math.floor(Math.random() * (data?.data.length - 0 - 3 + 1)) + 0;
  const featuredPost = data?.data[randomNumber || 0];

  return (
    <div className="min-h-screen bg-[#fafaf9]">
      {/* Hero Featured Post */}
      <section className="relative overflow-hidden bg-white border-b border-stone-200/60">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            {/* Featured Image */}
            <div className="group relative overflow-hidden rounded-2xl">
              <img
                src={
                  featuredPost?.coverImage ||
                  `https://picsum.photos/seed/${randomNumber}/800/600`
                }
                alt="Featured post"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <span
                  className="inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-sm"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  Featured
                </span>
              </div>
            </div>

            {/* Featured Content */}
            <div className="flex flex-col justify-center">
              <div
                className="mb-4 flex items-center gap-3 text-sm text-stone-500"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                <span>•</span>
                <time>
                  {new Date(
                    featuredPost?.createdAt || new Date().getDate(),
                  ).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
                <span>•</span>
                <span>5 min read</span>
              </div>

              <h2
                className="mb-4 text-4xl font-light leading-tight tracking-tight text-stone-900 lg:text-5xl"
                style={{ fontFamily: "'Crimson Pro', serif" }}
              >
                {featuredPost?.title}
              </h2>

              <p
                className="mb-6 text-lg leading-relaxed text-stone-600"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {featuredPost?.excerpt}
              </p>

              <div className="flex items-center gap-4">
                <Link
                  to={`/blog/${featuredPost?.slug}`}
                  className="inline-flex items-center gap-2 rounded-xl bg-stone-900 px-6 py-3 font-medium text-white transition-all hover:bg-stone-800"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  Read Article
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Link>

                <button className="flex h-10 w-10 items-center justify-center rounded-full border border-stone-200 bg-white transition-colors hover:border-stone-300 group">
                  <Bookmark className="h-5 w-5 text-stone-600 transition-colors group-hover:text-black group-hover:fill-black" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 ">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="grid gap-12 lg:grid-cols-[1fr_300px]">
            {/* Blog Posts */}
            <div>
              <div className="mb-8 flex items-center justify-between">
                <h2
                  className="text-3xl font-light tracking-tight text-stone-900"
                  style={{ fontFamily: "'Crimson Pro', serif" }}
                >
                  Latest Articles
                </h2>
                <div className="flex gap-2">
                  <button
                    className="rounded-lg border border-stone-200 bg-white px-4 py-2 text-sm font-medium text-stone-700 transition-colors hover:bg-stone-50"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    All
                  </button>
                  <button
                    className="rounded-lg px-4 py-2 text-sm font-medium text-stone-500 transition-colors hover:text-stone-900"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    Tech
                  </button>
                  <button
                    className="rounded-lg px-4 py-2 text-sm font-medium text-stone-500 transition-colors hover:text-stone-900"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    Design
                  </button>
                </div>
              </div>
              <BlogList
                data={data}
                error={error}
                isLoading={isLoading}
                refetch={refetch}
              />
              {/* Pagination */}
              <div>
                <HomepagePagination
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  totalPages={data?.totalPages || 0}
                />
              </div>
            </div>

            {/* Sidebar */}
            <aside className="space-y-8">
              {/* Search */}
              <div className="rounded-2xl border border-stone-200/80 bg-white p-6">
                <h3
                  className="mb-4 text-xl font-medium text-stone-900"
                  style={{ fontFamily: "'Crimson Pro', serif" }}
                >
                  Search
                </h3>
                <div className="relative">
                  <input
                    type="search"
                    placeholder="Search articles..."
                    className="w-full rounded-xl border border-stone-200 bg-stone-50 py-3 pl-10 pr-4 text-sm outline-none transition-colors focus:border-stone-400 focus:bg-white"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  />
                  <svg
                    className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-stone-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>

              {/* Categories */}
              <div className="rounded-2xl border border-stone-200/80 bg-white p-6">
                <h3
                  className="mb-4 text-xl font-medium text-stone-900"
                  style={{ fontFamily: "'Crimson Pro', serif" }}
                >
                  Categories
                </h3>
                <ul
                  className="space-y-2"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {[
                    "Technology",
                    "Design",
                    "Business",
                    "Lifestyle",
                    "Travel",
                    "Food",
                  ].map((category) => (
                    <li key={category}>
                      <a
                        href="#"
                        className="flex items-center justify-between rounded-lg p-2 text-sm text-stone-700 transition-colors hover:bg-stone-50"
                      >
                        <span>{category}</span>
                        <span className="text-xs text-stone-400">12</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Popular Posts */}
              <div className="rounded-2xl border border-stone-200/80 bg-white p-6">
                <h3
                  className="mb-4 text-xl font-medium text-stone-900"
                  style={{ fontFamily: "'Crimson Pro', serif" }}
                >
                  Popular Posts
                </h3>
                <div className="space-y-4">
                  {data?.data.slice(0, 3).map((post, index) => (
                    <Link
                      key={post.id}
                      to={`/blog/${featuredPost?.slug}`}
                      className="group flex gap-3 transition-transform duration-300 hover:scale-105"
                    >
                      <img
                        src={
                          post.coverImage ||
                          `https://picsum.photos/seed/${index + 1}}/400`
                        }
                        alt="Post thumbnail"
                        className="h-16 w-16 shrink-0 rounded-lg object-cover"
                      />
                      <div className="min-w-0 flex-1">
                        <p
                          className="mb-1 line-clamp-2 text-sm font-medium text-stone-900 group-hover:text-stone-700"
                          style={{ fontFamily: "'DM Sans', sans-serif" }}
                        >
                          {post.title}
                        </p>
                        <time className="text-xs text-stone-500">
                          {new Date(
                            featuredPost?.createdAt || new Date().getDate(),
                          ).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </time>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Newsletter */}
              <div className="rounded-2xl border border-stone-200/80 bg-linear-to-br from-stone-900 to-stone-800 p-6 text-white">
                <h3
                  className="mb-2 text-xl font-medium"
                  style={{ fontFamily: "'Crimson Pro', serif" }}
                >
                  Newsletter
                </h3>
                <p
                  className="mb-4 text-sm text-stone-300"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  Get the latest articles delivered to your inbox.
                </p>
                <form className="space-y-2">
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-sm text-white placeholder-white/60 outline-none backdrop-blur-sm transition-colors focus:border-white/40 focus:bg-white/20"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  />
                  <button
                    type="submit"
                    className="w-full rounded-xl bg-white px-4 py-2.5 text-sm font-medium text-stone-900 transition-colors hover:bg-stone-100"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    Subscribe
                  </button>
                </form>
              </div>

              {/* Tags */}
              {/* <div className="rounded-2xl border border-stone-200/80 bg-white p-6">
                  <h3 
                    className="mb-4 text-xl font-medium text-stone-900"
                    style={{ fontFamily: "'Crimson Pro', serif" }}
                  >
                    Popular Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {['React', 'TypeScript', 'CSS', 'JavaScript', 'Node.js', 'Design', 'UI/UX', 'Web Dev'].map((tag) => (
                      <a
                        key={tag}
                        href="#"
                        className="rounded-lg border border-stone-200 bg-stone-50 px-3 py-1.5 text-xs font-medium text-stone-700 transition-colors hover:border-stone-300 hover:bg-white"
                        style={{ fontFamily: "'DM Sans', sans-serif" }}
                      >
                        {tag}
                      </a>
                    ))}
                  </div>
                </div> */}
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
