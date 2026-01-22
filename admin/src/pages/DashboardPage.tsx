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
    <Card className="group relative overflow-hidden hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-linear-to-br from-transparent via-transparent to-slate-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <CardBody className="relative flex items-center gap-4 p-6">
        <div
          className={`shrink-0 w-12 h-12 ${color} rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}
        >
          {icon}
        </div>
        <div className="flex-1 overflow-hidden">
          <p className="text-sm font-medium text-slate-500 tracking-wide uppercase mb-1">
            {label}
          </p>
          <p className="text-3xl font-bold text-slate-900 tracking-tight group-hover:scale-105 transition-transform duration-300 inline-block group-hover:animate-cycle">
            {value.toLocaleString()}
          </p>
        </div>
      </CardBody>

      {/* Animated progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-100">
        <div
          className={`h-full ${color.replace("shadow-lg", "").replace(/shadow-\w+-\d+/, "")} transition-all duration-1000 ease-out group-hover:w-full w-0`}
        />
      </div>
    </Card>
  );
}

export function DashboardPage() {
  const { data: stats, isLoading } = useDashboardStats();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-linear-to-br from-slate-50 via-white to-slate-50">
      {/* Decorative background elements */}
      <div className="fixed top-0 left-0 w-96 h-96 bg-indigo-100/40 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 animate-pulse" />
      <div
        className="fixed top-20 right-0 w-72 h-72 bg-purple-100/30 rounded-full blur-3xl translate-x-1/2 animate-pulse"
        style={{ animationDelay: "1s" }}
      />

      <div className="relative max-w-7xl mx-auto space-y-12 p-6 lg:p-8">
        {/* Header Section */}
        <header className="pt-4">
          <div className="relative">
            <h1 className="text-5xl font-display font-bold tracking-tight text-slate-900 mb-3">
              Dashboard
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl">
              Welcome back! Here's an overview of your blog's performance and
              quick access to your tools.
            </p>
          </div>
        </header>

        {/* Stats Grid with staggered animations */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Total posts card */}
          <div
            className="animate-fadeInUp"
            style={{ animationDelay: "0.1s", animationFillMode: "both" }}
          >
            <StatCard
              icon={
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              }
              label="Total Posts"
              value={stats?.totalPosts || 0}
              color="bg-indigo-600 shadow-lg shadow-indigo-200"
            />
          </div>
          {/* Published Posts Card */}
          <div
            className="animate-fadeInUp"
            style={{ animationDelay: "0.2s", animationFillMode: "both" }}
          >
            <StatCard
              icon={
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              }
              label="Published"
              value={stats?.publishedPosts || 0}
              color="bg-emerald-500 shadow-lg shadow-emerald-200"
            />
          </div>
          {/* Drafts Card */}
          <div
            className="animate-fadeInUp"
            style={{ animationDelay: "0.3s", animationFillMode: "both" }}
          >
            <StatCard
              icon={
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              }
              label="Drafts"
              value={stats?.draftPosts || 0}
              color="bg-amber-500 shadow-lg shadow-amber-200"
            />
          </div>
          {/* Views Card */}
          <div
            className="animate-fadeInUp"
            style={{ animationDelay: "0.4s", animationFillMode: "both" }}
          >
            <StatCard
              icon={
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              }
              label="Total Views"
              value={stats?.totalViews || 0}
              color="bg-slate-700 shadow-lg shadow-slate-200"
            />
          </div>
        </section>

        {/* Quick Actions */}
        <div
          className="animate-fadeInUp"
          style={{ animationDelay: "0.5s", animationFillMode: "both" }}
        >
          <Card className="relative border-none shadow-xl shadow-slate-200/50 bg-white overflow-hidden">
            {/* Decorative background pattern */}
            <div className="absolute top-0 right-0 w-64 h-64 opacity-5 pointer-events-none">
              <svg
                viewBox="0 0 200 200"
                xmlns="http://www.w3.org/2000/svg"
                className="text-slate-900"
              >
                <path
                  fill="currentColor"
                  d="M45.7,-58.9C57.6,-50.1,64.4,-34.1,67.8,-17.2C71.2,-0.3,71.2,17.5,64.4,32.1C57.6,46.7,44,58.1,28.3,64.3C12.6,70.5,-5.2,71.5,-21.4,66.8C-37.6,62.1,-52.2,51.7,-60.5,37.4C-68.8,23.1,-70.8,4.9,-67.3,-11.9C-63.8,-28.7,-54.8,-44.1,-42.1,-52.7C-29.4,-61.3,-14.7,-63.1,1.4,-65C17.5,-66.9,33.8,-67.7,45.7,-58.9Z"
                  transform="translate(100 100)"
                />
              </svg>
            </div>

            <CardBody className="relative p-8">
              <div className="flex items-center gap-3 mb-7">
                <div className="w-1.5 h-7 bg-linear-to-b from-accent-coral to-amber-500 rounded-full" />
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                  Quick Actions
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {/* Action 1 */}
                <Link
                  to="/dashboard/blogs/new"
                  className="group relative flex items-center gap-4 p-6 rounded-2xl border-2 border-slate-200 bg-linear-to-br from-white to-slate-50/50 hover:border-accent-coral hover:shadow-lg hover:shadow-accent-coral/10 transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-linear-to-br from-accent-coral/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300" />
                  <div className="relative shrink-0 w-12 h-12 bg-linear-to-br from-accent-coral to-orange-500 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </div>
                  <div className="relative">
                    <p className="font-bold text-slate-900 group-hover:text-accent-coral transition-colors">
                      Create New Post
                    </p>
                    <p className="text-sm text-slate-500">
                      Share your thoughts
                    </p>
                  </div>
                  <svg
                    className="absolute right-5 w-5 h-5 text-slate-400 group-hover:text-accent-coral group-hover:translate-x-1 transition-all duration-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>

                {/* Action 2 */}
                <Link
                  to="/dashboard/blogs"
                  className="group relative flex items-center gap-4 p-6 rounded-2xl border-2 border-slate-200 bg-linear-to-br from-white to-slate-50/50 hover:border-indigo-500 hover:shadow-lg hover:shadow-indigo-100 transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-linear-to-br from-indigo-50/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300" />
                  <div className="relative shrink-0 w-12 h-12 bg-linear-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                  <div className="relative">
                    <p className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                      Manage Posts
                    </p>
                    <p className="text-sm text-slate-500">Edit and organize</p>
                  </div>
                  <svg
                    className="absolute right-5 w-5 h-5 text-slate-400 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all duration-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>

                {/* Action 3 */}
                <a
                  href={import.meta.env.VITE_CLIENT_FRONTEND_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex items-center gap-4 p-6 rounded-2xl border-2 border-slate-200 bg-linear-to-br from-white to-slate-50/50 hover:border-emerald-500 hover:shadow-lg hover:shadow-emerald-100 transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-linear-to-br from-emerald-50/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300" />
                  <div className="relative shrink-0 w-12 h-12 bg-linear-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </div>
                  <div className="relative">
                    <p className="font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                      View Blog
                    </p>
                    <p className="text-sm text-slate-500">Visit live site</p>
                  </div>
                  <svg
                    className="absolute right-5 w-5 h-5 text-slate-400 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all duration-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </a>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
