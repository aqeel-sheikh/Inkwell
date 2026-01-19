import { useState } from "react";
import { signUp } from "@/auth/auth-client";
import { Button, Input } from "@/components";
import { signUpSchema } from "@/schemas/userData.schema";

import type { RefObject, Dispatch, SetStateAction } from "react";

interface RegisterFormProps {
  setModel: Dispatch<SetStateAction<boolean>>;
  myRef: RefObject<HTMLDivElement> | null;
  loginFormRef: RefObject<HTMLDivElement> | null;
}

export function RegisterForm({
  setModel,
  myRef,
  loginFormRef,
}: RegisterFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [zodErrors, setZodErrors] = useState<Record<string, string>>({});

  const showLoginForm = () => {
    const loginForm = loginFormRef?.current;
    const registerForm = myRef?.current;

    if (!loginForm || !registerForm) return;

    registerForm.classList.add("hidden");
    loginForm.classList.remove("hidden");
  };

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
          setModel(false);
        },
        onError: (ctx) => {
          setIsLoading(false);
          setError(ctx.error.message);
        },
      },
    );
  };

  return (
    <div
      ref={myRef}
      className="hidden rounded-xl items-center justify-center bg-linear-to-br from-primary-50 to-primary-100"
    >
      <div className="w-full max-w-md">
        <div className="bg-white rounded-xl shadow-lg px-8 pb-8">
          <h1 className="text-2xl font-display font-bold text-center text-gray-900 mb-2">
            Create Account
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Start engaging in conversations
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
              error={zodErrors.name}
            />

            <Input
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="you@example.com"
              required
              error={zodErrors.email}
            />

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
              error={zodErrors.password}
            />
            <Input
              label="Confirm Password"
              type="password"
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
              placeholder="••••••••"
              required
              error={zodErrors.confirmPassword}
            />
            <div className="flex justify-center items-center">
              <Button type="submit" isLoading={isLoading}>
                Create Account
              </Button>
            </div>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <button
              onClick={showLoginForm}
              className="text-primary-600 hover:text-primary-900 font-medium cursor-pointer"
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
