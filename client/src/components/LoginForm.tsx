import { Dispatch, RefObject, SetStateAction, useState } from "react";
import { signIn } from "@/auth/auth-client";
import { Button, Input } from "@/components";

interface LoginFormProps {
  setModel: Dispatch<SetStateAction<boolean>>;
  myRef: RefObject<HTMLDivElement> | null;
  registerFormRef: RefObject<HTMLDivElement> | null;
}

export function LoginForm({
  setModel,
  myRef,
  registerFormRef,
}: LoginFormProps) {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const showRegisterForm = () => {
    const registerForm = registerFormRef?.current;
    const loginForm = myRef?.current;

    if (!loginForm || !registerForm) return;

    loginForm.classList.add("hidden");
    registerForm.classList.remove("hidden");
  };

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
      className="flex rounded-xl items-center justify-center bg-linear-to-br from-primary-50 to-primary-100"
    >
      <div className="w-full max-w-md">
        <div className="bg-white rounded-xl shadow-lg px-8 pb-8">
          <h1 className="text-2xl font-display font-bold text-center text-gray-900 mb-2">
            Welcome Back
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Sign in to engage in conversations
          </p>

          {error && (
            <div className="mb-6 py-2 bg-red-100 border border-red-300 rounded-lg">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
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

            <Input
              label="Password"
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              placeholder="••••••••"
              required
            />
            <div className="flex justify-center items-center">
              <Button type="submit" isLoading={isLoading}>
                Sign In
              </Button>
            </div>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <button
              onClick={showRegisterForm}
              className="text-primary-600 hover:text-primary-900 cursor-pointer font-medium"
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
