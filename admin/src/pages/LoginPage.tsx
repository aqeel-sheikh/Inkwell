import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { signIn } from "@/auth/authClient";
import { Button, Input } from "@/components";
import { BookOpen } from "lucide-react";

export function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    await signIn.email(
      {
        email: formData.email,
        password: formData.password,
      },
      {
        onRequest: () => setIsLoading(true),
        onSuccess: () => {
          setIsLoading(false);
          setError("");
          navigate("/dashboard");
        },
        onError: (ctx) => {
          setIsLoading(false);
          setError(ctx.error.message);
        },
      },
    );
  };

  return (
    <>
      <div className="relative flex min-h-screen items-center justify-center bg-[#fafaf9] p-6">
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

        <div className="relative w-full max-w-md animate-slideUp">
          <div className="overflow-hidden rounded-2xl border border-stone-200/80 bg-white/90 shadow-2xl backdrop-blur-xl">
            {/* Decorative top gradient */}
            <div className="h-2 bg-linear-to-r from-amber-500 via-rose-500 to-purple-500" />

            <div className="p-10">
              {/* Logo */}
              <div className="mb-8 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-amber-500 to-rose-500 shadow-2xl">
                  <BookOpen className="h-8 w-8 text-white" strokeWidth={2} />
                </div>
              </div>

              {/* Heading */}
              <div className="mb-8 text-center">
                <h1
                  className="mb-3 text-4xl font-light tracking-tight text-stone-900"
                  style={{ fontFamily: "'Crimson Pro', serif" }}
                >
                  Welcome Back
                </h1>
                <p
                  className="text-base text-stone-600"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  Sign in to manage your blog
                </p>
              </div>

              {/* Error message */}
              {error && (
                <div className="mb-6 rounded-xl border-2 border-red-100 bg-red-50/80 p-4">
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
                      {error}
                    </p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Email */}
                <Input
                  label="Email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="yourname@example.com"
                  required
                  autoFocus
                  className="border-stone-200 transition-all duration-300 focus:border-stone-400"
                />

                {/* Password */}
                <Input
                  label="Password"
                  type="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  placeholder="••••••••"
                  required
                  className="border-stone-200 transition-all duration-300 focus:border-stone-400"
                />

                {/* Submit Button */}
                <Button
                  type="submit"
                  fullWidth
                  isLoading={isLoading}
                  className="mt-6 border-0 bg-linear-to-br from-stone-900 via-stone-800 to-stone-900 py-3 font-medium text-white shadow-lg transition-all duration-500 hover:shadow-xl hover:scale-105"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  Sign In
                </Button>
              </form>

              {/* Sign up link */}
              <p
                className="mt-8 text-center text-sm text-stone-600"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="font-medium text-stone-900 transition-colors hover:text-stone-700"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </div>

          {/* Decorative text at bottom */}
          <p
            className="mt-6 text-center text-xs text-stone-500"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Secure sign in with encrypted connection
          </p>
        </div>
      </div>
    </>
  );
}
