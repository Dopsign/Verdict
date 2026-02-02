import { forwardRef } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  fullWidth?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      loading = false,
      fullWidth,
      className = "",
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const base =
      "inline-flex items-center justify-center font-semibold rounded-lg transition-smooth focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-verdict-black disabled:opacity-50 disabled:cursor-not-allowed";
    const variants = {
      primary:
        "bg-verdict-red text-white hover:bg-verdict-red-dim focus:ring-verdict-red",
      secondary:
        "bg-verdict-charcoal text-white border border-white/10 hover:border-white/20 focus:ring-white/30",
      ghost:
        "text-white/90 hover:text-white hover:bg-white/5 focus:ring-white/20",
      danger:
        "bg-red-900/50 text-red-300 hover:bg-red-900/70 focus:ring-red-500",
    };
    const sizes = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-5 py-2.5 text-base",
      lg: "px-8 py-3.5 text-lg",
    };

    return (
      <button
        ref={ref}
        className={`${base} ${variants[variant]} ${sizes[size]} ${fullWidth ? "w-full" : ""} ${className}`}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
