import { BlogList } from "@/features/blog/BlogList";

export function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-linear-to-br from-primary-100 via-primary-50 to-accent-coral/5 py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="font-display text-5xl md:text-7xl font-bold text-primary-900 mb-6 animate-fade-in leading-tight">
              Stories that <span className="text-accent-coral">inspire</span>,{" "}
              <span className="text-accent-mint">challenge</span>, and{" "}
              <span className="text-accent-amber">transform</span>
            </h1>
            <p className="text-xl md:text-2xl text-primary-600 leading-relaxed animate-fade-in animation-delay-200">
              Discover narratives crafted with care, designed to enrich your
              perspective and fuel your curiosity.
            </p>
          </div>
        </div>
      </section>

      {/* Blog List Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-900 mb-4">
              Latest Stories
            </h2>
            <p className="text-lg text-primary-600">
              Fresh perspectives delivered regularly
            </p>
          </div>
          <BlogList />
        </div>
      </section>
    </div>
  );
}
