import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { signUp } from "@/auth/authClient";
import { Button, Input } from "@/components";
import { signUpSchema } from "@/schemas/userData.schema";
import { Check, BookOpen, ArrowRight, ArrowLeft } from "lucide-react";
import { useUsernameValidation } from "@/hooks/useUsernameValidation";

export function RegisterPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
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

  const handleNext = () => {
    setError("");

    // Validate current step
    if (step === 1 && !formData.name.trim()) {
      setError("Please enter your full name");
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
            {/* Progress bar */}
            <div className="h-2 bg-stone-100">
              <div
                className="h-full bg-linear-to-r from-amber-500 via-rose-500 to-purple-500 transition-all duration-500"
                style={{ width: `${(step / 3) * 100}%` }}
              />
            </div>

            <div className="p-10">
              {/* Logo */}
              <div className="mb-8 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-amber-500 to-rose-500 shadow-2xl">
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
              <div className="mb-8 text-center">
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
                <div className="mb-6 rounded-xl border-2 border-red-100 bg-red-50/80 p-4 animate-slideInRight">
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
                    fullWidth
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
                      fullWidth
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
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="yourname@example.com"
                      required
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

                  <div>
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
                      fullWidth
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
                <Link
                  to="/login"
                  className="font-medium text-stone-900 transition-colors hover:text-stone-700"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>

          {/* Step description */}
          <p
            className="mt-6 text-center text-xs text-stone-500"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Step {step} of 3
          </p>
        </div>
      </div>
    </>
  );
}
