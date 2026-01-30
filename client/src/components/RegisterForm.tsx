import { useState } from "react";
import { signUp } from "@/auth/auth-client";
import { Button, Input } from "@/components";
import { signUpSchema } from "@/schemas/userData.schema";
import {
  Check,
  BookOpen,
  ArrowLeft,
  ArrowRight,
  Eye,
  EyeOff,
  TriangleAlert,
} from "lucide-react";
import { useUsernameValidation } from "@/hooks/useUsernameValidation";
import type {
  RefObject,
  Dispatch,
  SetStateAction,
  MouseEventHandler,
} from "react";
import { ModelCloseButton } from "./Model";

interface RegisterFormProps {
  setModel: Dispatch<SetStateAction<boolean>>;
  onClose: MouseEventHandler<HTMLButtonElement>;
  myRef: RefObject<HTMLDivElement> | null;
  loginFormRef: RefObject<HTMLDivElement> | null;
}

export function RegisterForm({
  setModel,
  onClose,
  myRef,
  loginFormRef,
}: RegisterFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [zodErrors, setZodErrors] = useState<Record<string, string>>({});
  const { usernameError, isValid } = useUsernameValidation(formData.username);
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState(1);

  const handleNext = () => {
    setError("");

    // Validate current step
    if (step === 1 && !formData.name.trim()) {
      setError("Please enter your full name");
      return;
    }
    if (step === 1 && formData.name.length < 4) {
      setError("Fullname should be at least 4 characters long");
      return;
    }
    if (step === 2 && !formData.username.trim()) {
      setError("Please enter a username");
      return;
    }
    if (step === 2 && usernameError) {
      setError(usernameError);
      return;
    }

    setStep(step + 1);
  };

  const handleBack = () => {
    setError("");
    setStep(step - 1);
  };

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
        username: formData.username,
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
    <div ref={myRef} className="hidden rounded-xl items-center justify-center">
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
          {/* Step indicator */}
          <div className="mb-6 flex items-center justify-center gap-2">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`h-2 w-2 rounded-full transition-all duration-300 ${
                  s === step
                    ? "w-8 bg-stone-900"
                    : s < step
                      ? "bg-stone-400"
                      : "bg-stone-200"
                }`}
              />
            ))}
          </div>
          {/* Heading */}
          <div className="mb-4 text-center">
            <h1
              className="mb-3 text-4xl font-light tracking-tight text-stone-900"
              style={{ fontFamily: "'Crimson Pro', serif" }}
            >
              {step === 1 && "Welcome"}
              {step === 2 && "Choose Username"}
              {step === 3 && "Almost Done"}
            </h1>
            <p
              className="text-base text-stone-600"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {step === 1 && "Let's start with your name"}
              {step === 2 && "Pick a unique username"}
              {step === 3 && "Create your credentials"}
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
          {/* Step 1: Full Name */}
          {step === 1 && (
            <div className="space-y-6 animate-slideInRight">
              <Input
                label="Full Name"
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="John Doe"
                required
                name="name"
                autoComplete="name"
                autoFocus
                className="border-stone-200 transition-all duration-300 focus:border-stone-400"
              />
              {zodErrors.name && (
                <p
                  className="text-sm text-red-600"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {zodErrors.name}
                </p>
              )}

              <Button
                type="button"
                onClick={handleNext}
                className="border-0 bg-linear-to-br from-stone-900 via-stone-800 to-stone-900 py-3 font-medium text-white shadow-lg transition-all duration-500 hover:shadow-xl hover:scale-105 cursor-pointer"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Next
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          )}
          {/* Step 2: Username */}
          {step === 2 && (
            <div className="space-y-6 animate-slideInRight">
              <div className="relative">
                <Input
                  label="Username"
                  type="text"
                  value={formData.username}
                  onChange={(e) => {
                    setFormData({ ...formData, username: e.target.value });
                  }}
                  placeholder="john123"
                  required
                  name="username"
                  autoComplete="username"
                  autoFocus
                  error={usernameError}
                  className="border-stone-200 transition-all duration-300 focus:border-stone-400"
                />
                {zodErrors.username && (
                  <p
                    className="mt-1.5 text-sm text-red-600"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {zodErrors.username}
                  </p>
                )}
                {isValid && (
                  <div className="pointer-events-none absolute right-3 top-10 flex items-center justify-center">
                    <Check
                      size={20}
                      strokeWidth={2}
                      className="text-emerald-600"
                      aria-hidden="true"
                    />
                  </div>
                )}
              </div>

              <div className="flex gap-3">
                <Button
                  type="button"
                  onClick={handleBack}
                  variant="ghost"
                  className="border border-stone-200 bg-white font-medium text-stone-700 cursor-pointer"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  <ArrowLeft className="mr-2 h-5 w-5" />
                  Back
                </Button>
                <Button
                  type="button"
                  onClick={handleNext}
                  disabled={!formData.username || !!usernameError}
                  className="border-0 bg-linear-to-br from-stone-900 via-stone-800 to-stone-900 py-3 font-medium text-white shadow-lg transition-all duration-500 hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:scale-100 cursor-pointer"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  Next
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          )}
          {/* Step 3: Email & Password */}
          {step === 3 && (
            <form
              onSubmit={handleSubmit}
              className="space-y-5 animate-slideInRight"
            >
              <div>
                <Input
                  label="Email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="yourname@example.com"
                  required
                  autoComplete="email"
                  autoFocus
                  className="border-stone-200 transition-all duration-300 focus:border-stone-400"
                />
                {zodErrors.email && (
                  <p
                    className="mt-1.5 text-sm text-red-600"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {zodErrors.email}
                  </p>
                )}
              </div>

              <div className="relative">
                <Input
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  placeholder="••••••••"
                  required
                  name="password"
                  autoComplete="new-password"
                  helperText="Minimum 8 characters"
                  className="border-stone-200 transition-all duration-300 focus:border-stone-400"
                />
                {zodErrors.password && (
                  <p
                    className="mt-1.5 text-sm text-red-600"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {zodErrors.password}
                  </p>
                )}
                <div
                  className="absolute top-[45%] right-2 text-primary-500 cursor-pointer hover:text-primary-700"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </div>
              </div>

              <div>
                <Input
                  label="Confirm Password"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    })
                  }
                  placeholder="••••••••"
                  name="password"
                  autoComplete="new-password"
                  required
                  className="border-stone-200 transition-all duration-300 focus:border-stone-400"
                />
                {zodErrors.confirmPassword && (
                  <p
                    className="mt-1.5 text-sm text-red-600"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {zodErrors.confirmPassword}
                  </p>
                )}
              </div>

              <div className="flex gap-3 pt-2">
                <Button
                  type="button"
                  onClick={handleBack}
                  variant="ghost"
                  className="border border-stone-200 bg-white font-medium text-stone-700 cursor-pointer"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  <ArrowLeft className="mr-2 h-5 w-5" />
                  Back
                </Button>
                <Button
                  type="submit"
                  isLoading={isLoading}
                  className="border-0 bg-linear-to-br from-stone-900 via-stone-800 to-stone-900 py-3 font-medium text-white shadow-lg transition-all duration-500 hover:shadow-xl hover:scale-105 cursor-pointer"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  Create Account
                </Button>
              </div>
            </form>
          )}
          {/* Sign in link */}
          <p
            className="mt-8 text-center text-sm text-stone-600"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Already have an account?{" "}
            <button
              onClick={showLoginForm}
              className="text-primary-900 transition-colors hover:underline font-medium cursor-pointer"
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
