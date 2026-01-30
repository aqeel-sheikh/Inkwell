import {
  Dispatch,
  MouseEventHandler,
  RefObject,
  SetStateAction,
  useState,
} from "react";
import { signIn } from "@/auth/auth-client";
import { Button, Input } from "@/components";
import { BookOpen, Eye, EyeOff, TriangleAlert } from "lucide-react";
import { ModelCloseButton } from "./Model";

interface LoginFormProps {
  setModel: Dispatch<SetStateAction<boolean>>;
  onClose: MouseEventHandler<HTMLButtonElement>;
  myRef: RefObject<HTMLDivElement> | null;
  registerFormRef: RefObject<HTMLDivElement> | null;
}

export function LoginForm({
  setModel,
  onClose,
  myRef,
  registerFormRef,
}: LoginFormProps) {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

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
        rememberMe: true,
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
    <div ref={myRef} className="rounded-xl">
      <div className="w-full max-w-md">
        {/* Model close button */}
        <ModelCloseButton onClose={onClose} />
        {/* Content */}
        <div className="bg-white rounded-xl shadow-lg px-8 pb-8">
          {/* Logo */}
          <div className="mb-8 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-700 shadow-2xl">
              <BookOpen className="h-8 w-8 text-white" strokeWidth={2} />
            </div>
          </div>

          <h1 className="text-2xl font-display font-bold text-center text-gray-900 mb-2">
            Welcome Back
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Sign in to engage in conversations
          </p>

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
            <Input
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="you@example.com"
              autoComplete="email"
              required
            />
            <div className="relative">
              <Input
                label="Password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                placeholder="••••••••"
                autoComplete="current-password"
                required
              />
              <div
                className="absolute top-[55%] right-2 text-primary-500 cursor-pointer hover:text-primary-700"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </div>
            </div>
            <div className="flex justify-center items-center">
              <Button
                type="submit"
                isLoading={isLoading}
                className="cursor-pointer"
              >
                Sign In
              </Button>
            </div>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <button
              onClick={showRegisterForm}
              className="text-primary-900 hover:underline cursor-pointer font-medium"
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
