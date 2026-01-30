import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { signIn } from "@/auth/authClient";
import { Button, Input } from "@/components";
import { BookOpen, TriangleAlert, Eye, EyeOff } from "lucide-react";

export function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

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
        <div className="relative w-full max-w-md animate-slideUp">
          <div className="overflow-hidden rounded-2xl border border-stone-200/80 bg-white/90 shadow-2xl backdrop-blur-xl">
            {/* Decorative top gradient */}
            <div className="h-2 bg-stone-900" />

            <div className="p-10">
              {/* Logo */}
              <div className="mb-8 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-stone-900">
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
                <div className="mb-3 rounded-xl border border-red-100 bg-red-50/80 p-2 animate-slideInRight">
                  <div className="flex items-start gap-3">
                    <TriangleAlert className="text-red-600 h-5 w-5" />
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
                <div className="relative">
                  <Input
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    placeholder="••••••••"
                    autoComplete="current-password"
                    required
                    className="border-stone-200 transition-all duration-300 focus:border-stone-400"
                  />
                  <div
                    className="absolute top-[55%] right-2 text-stone-600 cursor-pointer hover:text-stone-800"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  fullWidth
                  isLoading={isLoading}
                  className="mt-6 border-0 bg-linear-to-br from-stone-900 via-stone-800 to-stone-900 py-3 font-medium text-white shadow-lg transition-all duration-500 hover:shadow-xl hover:scale-105 cursor-pointer"
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
                  className="font-medium text-stone-900 transition-colors hover:underline"
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
