import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef } from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm",
        primary: "bg-primary-600 text-white hover:bg-primary-700 focus-visible:ring-primary-500 shadow-sm",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        danger: "bg-danger-DEFAULT text-white hover:bg-danger-dark focus-visible:ring-danger-light",
        success: "bg-success-DEFAULT text-white hover:bg-success-dark focus-visible:ring-success-light",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost:
          "bg-transparent hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 px-3 py-1.5 rounded-md gap-1.5 has-[>svg]:px-2.5",
        md: "h-9 px-4 py-2 has-[>svg]:px-3",
        lg: "h-10 px-6 py-3 rounded-md has-[>svg]:px-4",
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
  fullWidth?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "default",
      size = "default",
      asChild = false,
      isLoading = false,
      fullWidth = false,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        ref={ref}
        data-slot="button"
        data-variant={variant}
        data-size={size}
        className={cn(
          buttonVariants({ variant, size, className }),
          fullWidth && "w-full"
        )}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-current/30 border-t-current rounded-full animate-spin" />
            <span>{children || "Loading..."}</span>
          </div>
        ) : (
          children
        )}
      </Comp>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };