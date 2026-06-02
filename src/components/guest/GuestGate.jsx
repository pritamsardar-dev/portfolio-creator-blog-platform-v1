import clsx from "clsx";
import { Link } from "react-router-dom";

// Prompts unauthenticated users to sign in or sign up
function GuestGate({ title, description }) {
  return (
    <section className="py-16">
      {/* Content Card */}
      <div
        className={clsx(
          "mx-auto max-w-md",
          "rounded-3xl border",
          "border-[var(--color-border)]",
          "bg-[var(--color-card)]",
          "p-10 text-center sm:p-12",
        )}
      >
        <h2 className={clsx("text-2xl font-bold", "text-[var(--color-text)]")}>{title}</h2>

        <p className={clsx("mt-5", "text-sm leading-7", "text-[var(--color-text-muted)]")}>
          {description}
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex items-center justify-center gap-4">
          <Link to="/login">
            <button
              className={clsx(
                "cursor-pointer rounded-xl",
                "bg-[var(--color-primary)]",
                "px-5 py-2",
                "text-white",
                "transition-all duration-200",
                "hover:scale-[1.02] hover:opacity-90",
                "active:scale-[0.97]",
              )}
            >
              Sign In
            </button>
          </Link>

          <Link to="/signup">
            <button
              className={clsx(
                "cursor-pointer rounded-xl",
                "border border-[var(--color-border)]",
                "px-5 py-2",
                "text-[var(--color-text)]",
                "transition-all duration-200",
                "hover:scale-[1.02] hover:bg-[var(--color-card-hover)]",
                "active:scale-[0.97]",
              )}
            >
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default GuestGate;
