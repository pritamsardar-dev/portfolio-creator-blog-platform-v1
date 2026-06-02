import clsx from "clsx";

// Reusable button with primary, secondary, and danger variants
function Button({ children, type = "button", className = "", variant = "primary", ...props }) {
  const variants = {
    primary: clsx(
      "bg-[var(--color-primary)]",
      "text-white",
      "hover:bg-[var(--color-primary-hover)]",
      "active:scale-[0.97]",
    ),
    secondary: clsx(
      "bg-[var(--color-card)]",
      "text-[var(--color-text)]",
      "hover:bg-[var(--color-card-hover)]",
      "border border-[var(--color-border)]",
      "active:scale-[0.97]",
    ),
    danger: clsx("bg-red-500", "text-white", "hover:bg-red-600", "active:scale-[0.97]"),
  };

  return (
    <button
      type={type}
      className={clsx(
        "inline-flex items-center justify-center",
        "rounded-xl",
        "px-4 py-2 text-sm md:px-5 md:py-2.5",
        "font-medium",
        "cursor-pointer",
        "transition-all duration-200",
        "hover:-translate-y-[1px]",
        "disabled:cursor-not-allowed disabled:opacity-60",
        "focus:outline-none",
        "focus:ring-2 focus:ring-[var(--color-primary)]",
        "focus:ring-offset-2 focus:ring-offset-[var(--color-bg)]",
        variants[variant],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
