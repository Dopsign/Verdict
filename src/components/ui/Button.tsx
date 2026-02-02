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
      "inline-flex items-center justify-center font-semibold rounded-xl transition-smooth focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
    const variants = {
      primary:
        "bg-verdict-red text-white hover:bg-verdict-red-hover focus:ring-verdict-red focus:ring-offset-white shadow-soft",
      secondary:
        "bg-white text-verdict-gray-700 border border-verdict-gray-200 hover:bg-verdict-gray-50 focus:ring-verdict-blue focus:ring-offset-white",
      ghost:
        "text-verdict-gray-600 hover:text-verdict-gray-900 hover:bg-verdict-gray-100 focus:ring-verdict-gray-300 focus:ring-offset-white",
      danger:
        "bg-red-50 text-red-700 hover:bg-red-100 focus:ring-red-500 focus:ring-offset-white",
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
