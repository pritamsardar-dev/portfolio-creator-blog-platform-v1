import { forwardRef, useId } from "react";

import clsx from "clsx";

// Accessible labeled input with validation error support
const Input = forwardRef(function Input(
  { label, type = "text", className = "", error, ...props },
  ref,
) {
  const id = useId();

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="mb-2 block text-sm font-medium text-[var(--color-text)]">
          {label}
        </label>
      )}

      <input
        id={id}
        ref={ref}
        type={type}
        className={clsx(
          "w-full rounded-xl",
          "border border-[var(--color-border)]",
          "bg-[var(--color-card)]",
          "px-4 py-3 text-sm",
          "text-[var(--color-text)]",
          "outline-none",
          "transition-all duration-200",
          "placeholder:text-[var(--color-text-muted)]",
          type === "file" ? "cursor-pointer" : "cursor-text",
          "hover:border-[var(--color-primary)] hover:bg-[var(--color-card-hover)]",
          "focus:border-[var(--color-primary)]",
          "focus:ring-4 focus:ring-[var(--color-primary)]/10",
          error && "border-red-500",
          className,
        )}
        {...props}
      />

      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  );
});

export default Input;
