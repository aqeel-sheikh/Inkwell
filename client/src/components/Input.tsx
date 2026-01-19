import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label?: string;
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", error, label, helperText, id, ...props }, ref) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-left text-sm font-medium text-primary-800 mb-2"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={`w-full px-4 py-2.5 bg-white border border-primary-300 rounded-lg text-primary-900 placeholder:text-primary-400 focus:outline-none focus:ring-2 focus:ring-accent-coral focus:border-transparent transition-all ${
            error ? "border-red-500 focus:ring-red-500" : ""
          } ${className}`}
          {...props}
        />
        {helperText && !error && (
          <p className="text-left mt-1 text-xs text-gray-500">{helperText}</p>
        )}
        {error && (
          <p className="text-left mt-1 text-sm text-red-600">{error}</p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";
