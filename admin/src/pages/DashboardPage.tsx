import { useDashboardStats } from "@/features/dashboard/useDashboard";
import { Card, CardBody, LoadingSpinner } from "@/components";
import { Link } from "react-router";

function StatCard({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  color: string;
}) {
  return (
    <Card className="group relative h-full overflow-hidden border border-stone-200/80 bg-white/90 backdrop-blur-sm shadow-lg transition-all duration-700 hover:border-stone-300 hover:shadow-2xl hover:shadow-stone-900/10 hover:-translate-y-2">
      {/* Decorative gradient overlay */}
      <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-amber-50/0 via-transparent to-stone-50/0 opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

      {/* Top accent line */}
      <div
        className={`absolute left-0 right-0 top-0 h-1 ${color} opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
      />

      <CardBody className="relative flex h-full flex-col justify-between gap-6 p-8">
        <div className="flex items-start justify-between">
          <div
            className={`flex h-16 w-16 items-center justify-center rounded-2xl ${color} shadow-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-3`}
          >
            {icon}
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium uppercase tracking-[0.15em] text-stone-500">
            {label}
          </p>
          <p
            className="text-5xl font-light tracking-tight text-stone-900 transition-all duration-500 group-hover:scale-105"
            style={{ fontFamily: "'Crimson Pro', serif" }}
          >
            {value.toLocaleString()}
          </p>
        </div>
      </CardBody>
    </Card>
  );
}

export function DashboardPage() {
  const { data: stats, isLoading } = useDashboardStats();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#fafaf9]">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <>
      <div
        className="relative min-h-screen bg-[#fafaf9]"
        style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
      >
        {/* Sophisticated ambient background */}
        <div className="pointer-events-none fixed inset-0 overflow-hidden">
          <div
            className="absolute -right-64 -top-64 h-[800px] w-[800px] rounded-full bg-linear-to-br from-amber-100/40 via-rose-100/30 to-transparent opacity-60 blur-3xl animate-float"
            style={{ animationDelay: "0s" }}
          />
          <div
            className="absolute -bottom-64 -left-64 h-[700px] w-[700px] rounded-full bg-linear-to-tr from-indigo-100/40 via-purple-100/30 to-transparent opacity-50 blur-3xl animate-float"
            style={{ animationDelay: "2s" }}
          />
          <div
            className="absolute right-1/4 top-1/3 h-[500px] w-[500px] rounded-full bg-linear-to-bl from-emerald-100/30 via-teal-100/20 to-transparent opacity-40 blur-3xl animate-float"
            style={{ animationDelay: "4s" }}
          />
        </div>

        {/* Content Container */}
        <div className="relative mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12">
          {/* Header Section */}
          <header
            className="mb-16 animate-fadeInUp"
            style={{ animationDelay: "0.1s", animationFillMode: "both" }}
          >
            <div className="space-y-4">
              <div className="inline-flex items-center gap-3 rounded-full border border-stone-200/80 bg-white/60 px-4 py-2 shadow-sm">
                <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-linear-to-r from-amber-500 to-rose-500" />
                <span className="text-xs font-medium uppercase tracking-[0.2em] text-stone-600">
                  Overview
                </span>
              </div>

              <h1
                className="text-shadow-sm text-balance text-6xl font-light tracking-tight text-stone-900 sm:text-7xl lg:text-8xl"
                style={{ fontFamily: "'Crimson Pro', serif" }}
              >
                Dashboard
              </h1>

              <p className="max-w-2xl text-lg leading-relaxed text-stone-600 sm:text-xl">
                Welcome back! Here's an overview of your blog's performance and
                quick access to your tools
              </p>
            </div>
          </header>

          {/* Stats Grid */}
          <section className="mb-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div
              className="animate-fadeInUp"
              style={{ animationDelay: "0.15s", animationFillMode: "both" }}
            >
              <StatCard
                icon={
                  <svg
                    className="h-7 w-7 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                    />
                  </svg>
                }
                label="Total Posts"
                value={stats?.totalPosts || 0}
                color="bg-linear-to-br from-stone-700 to-stone-900"
              />
            </div>

            <div
              className="animate-fadeInUp"
              style={{ animationDelay: "0.2s", animationFillMode: "both" }}
            >
              <StatCard
                icon={
                  <svg
                    className="h-7 w-7 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                }
                label="Published"
                value={stats?.publishedPosts || 0}
                color="bg-linear-to-br from-emerald-600 to-emerald-700"
              />
            </div>

            <div
              className="animate-fadeInUp"
              style={{ animationDelay: "0.25s", animationFillMode: "both" }}
            >
              <StatCard
                icon={
                  <svg
                    className="h-7 w-7 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                    />
                  </svg>
                }
                label="Drafts"
                value={stats?.draftPosts || 0}
                color="bg-linear-to-br from-amber-500 to-amber-600"
              />
            </div>

            <div
              className="animate-fadeInUp"
              style={{ animationDelay: "0.3s", animationFillMode: "both" }}
            >
              <StatCard
                icon={
                  <svg
                    className="h-7 w-7 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                }
                label="Total Views"
                value={stats?.totalViews || 0}
                color="bg-linear-to-br from-indigo-600 to-purple-600"
              />
            </div>
          </section>

          {/* Quick Actions */}
          <div
            className="animate-fadeInUp"
            style={{ animationDelay: "0.35s", animationFillMode: "both" }}
          >
            <Card className="relative overflow-hidden border border-stone-200/80 bg-white/90 backdrop-blur-sm shadow-xl">
              {/* Decorative corner accents */}
              <div className="pointer-events-none absolute left-0 top-0 h-32 w-32 bg-linear-to-br from-amber-100/30 to-transparent" />
              <div className="pointer-events-none absolute bottom-0 right-0 h-32 w-32 bg-linear-to-tl from-rose-100/30 to-transparent" />

              <CardBody className="relative p-10">
                <div className="mb-10 flex items-center gap-4">
                  <div className="h-1 w-12 rounded-full bg-linear-to-r from-amber-500 via-rose-500 to-purple-500" />
                  <h2
                    className="text-3xl font-light tracking-tight text-stone-900"
                    style={{ fontFamily: "'Crimson Pro', serif" }}
                  >
                    Quick Actions
                  </h2>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                  {/* Action 1 - Create New Post */}
                  <Link
                    to="/dashboard/blogs/new"
                    className="group relative overflow-hidden rounded-2xl border border-stone-200/80 bg-white/80 p-8 backdrop-blur-sm shadow-lg transition-all duration-500 hover:border-stone-300 hover:shadow-2xl hover:shadow-stone-900/10 hover:-translate-y-1"
                  >
                    <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-amber-50/0 via-transparent to-stone-50/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                    {/* Top accent line */}
                    <div className="absolute left-0 right-0 top-0 h-1 bg-linear-to-r from-amber-500 to-rose-500 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                    <div className="relative space-y-6">
                      <div className="flex items-start justify-between">
                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-stone-900 to-stone-700 shadow-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
                          <svg
                            className="h-7 w-7 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M12 4v16m8-8H4"
                            />
                          </svg>
                        </div>
                      </div>

                      <div>
                        <p
                          className="mb-2 text-2xl font-light tracking-tight text-stone-900 transition-colors duration-300"
                          style={{ fontFamily: "'Crimson Pro', serif" }}
                        >
                          Create New Post
                        </p>
                        <p className="text-sm leading-relaxed text-stone-600">
                          Start writing and share your thoughts with the world
                        </p>
                      </div>
                    </div>
                  </Link>

                  {/* Action 2 - Manage Posts */}
                  <Link
                    to="/dashboard/blogs"
                    className="group relative overflow-hidden rounded-2xl border border-stone-200/80 bg-white/80 p-8 backdrop-blur-sm shadow-lg transition-all duration-500 hover:border-stone-300 hover:shadow-2xl hover:shadow-stone-900/10 hover:-translate-y-1"
                  >
                    <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-amber-50/0 via-transparent to-stone-50/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                    {/* Top accent line */}
                    <div className="absolute left-0 right-0 top-0 h-1 bg-linear-to-r from-indigo-500 to-purple-500 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                    <div className="relative space-y-6">
                      <div className="flex items-start justify-between">
                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-indigo-600 to-purple-600 shadow-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
                          <svg
                            className="h-7 w-7 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={1.5}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                            />
                          </svg>
                        </div>
                      </div>

                      <div>
                        <p
                          className="mb-2 text-2xl font-light tracking-tight text-stone-900 transition-colors duration-300"
                          style={{ fontFamily: "'Crimson Pro', serif" }}
                        >
                          Manage Posts
                        </p>
                        <p className="text-sm leading-relaxed text-stone-600">
                          Edit, organize, and optimize your existing content
                        </p>
                      </div>
                    </div>
                  </Link>

                  {/* Action 3 - View Blog */}
                  <a
                    href={import.meta.env.VITE_CLIENT_FRONTEND_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative overflow-hidden rounded-2xl border border-stone-200/80 bg-white/80 p-8 backdrop-blur-sm shadow-lg transition-all duration-500 hover:border-stone-300 hover:shadow-2xl hover:shadow-stone-900/10 hover:-translate-y-1"
                  >
                    <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-amber-50/0 via-transparent to-stone-50/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                    {/* Top accent line */}
                    <div className="absolute left-0 right-0 top-0 h-1 bg-linear-to-r from-emerald-500 to-teal-500 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                    <div className="relative space-y-6">
                      <div className="flex items-start justify-between">
                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-emerald-600 to-teal-600 shadow-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
                          <svg
                            className="h-7 w-7 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={1.5}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                            />
                          </svg>
                        </div>
                      </div>

                      <div>
                        <p
                          className="mb-2 text-2xl font-light tracking-tight text-stone-900 transition-colors duration-300"
                          style={{ fontFamily: "'Crimson Pro', serif" }}
                        >
                          View Blog
                        </p>
                        <p className="text-sm leading-relaxed text-stone-600">
                          Visit your live site and see it in action
                        </p>
                      </div>
                    </div>
                  </a>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
