import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signUp } from "@/auth/authClient";
import { Button, Input } from "@/components";
import { signUpSchema } from "@/schemas/userData.schema";

export function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [zodErrors, setZodErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const result = signUpSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
      });
      setZodErrors(fieldErrors);
      setIsLoading(false);
      return;
    }
    setZodErrors({});

    await signUp.email(
      {
        name: formData.name,
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
      }
    );
  };

  return (
    <div className="min-h-screen p-6 flex items-center justify-center bg-linear-to-br from-primary-50 to-primary-100">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-xl shadow-lg p-8">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center">
              <svg
                className="w-7 h-7 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </div>
          </div>

          <h1 className="text-2xl font-display font-bold text-center text-gray-900 mb-2">
            Create Account
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Start managing your blog today
          </p>

          {error && (
            <div className="mb-6 p-4 bg-danger-light/10 border border-danger-light rounded-lg">
              <p className="text-sm text-danger-dark">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label="Full Name"
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="John Doe"
              required
            />
            {zodErrors.name && (
              <p className="text-sm text-danger-dark">{zodErrors.name}</p>
            )}

            <Input
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="you@example.com"
              required
            />
            {zodErrors.email && (
              <p className="text-sm text-danger-dark">{zodErrors.email}</p>
            )}

            <Input
              label="Password"
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              placeholder="••••••••"
              required
              helperText="Minimum 8 characters"
            />
            {zodErrors.password && (
              <p className="text-sm text-danger-dark">{zodErrors.password}</p>
            )}
            <Input
              label="Confirm Password"
              type="password"
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
              placeholder="••••••••"
              required
            />
            {zodErrors.confirmPassword && (
              <p className="text-sm text-danger-dark">
                {zodErrors.confirmPassword}
              </p>
            )}

            <Button type="submit" fullWidth isLoading={isLoading}>
              Create Account
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-primary-600 hover:text-primary-700 font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
