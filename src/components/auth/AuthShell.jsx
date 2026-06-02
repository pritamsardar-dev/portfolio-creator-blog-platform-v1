import clsx from "clsx";

import Logo from "../ui/Logo";

function AuthShell({ title, subtitle, children }) {
  return (
    <section
      className={clsx(
        "flex min-h-[calc(100vh-64px)] items-center justify-center",
        "px-4 py-10 sm:px-6 lg:px-8",
      )}
    >
      {/* Auth Card */}
      <div
        className={clsx(
          "w-full max-w-md",
          "rounded-3xl border p-6 shadow-[0_10px_40px_rgba(0,0,0,0.15)] sm:p-8",
          "bg-[var(--color-card)]",
          "border-[var(--color-border)]",
        )}
      >
        {/* Header */}
        <div className="mb-8">
          {/* Logo */}
          <div className="mb-6 flex justify-center">
            <Logo />
          </div>

          {/* Title and Subtitle */}
          <div className="text-center">
            <h1
              className={clsx(
                "text-2xl font-bold tracking-tight sm:text-3xl",
                "text-[var(--color-text)]",
              )}
            >
              {title}
            </h1>

            <p
              className={clsx(
                "mx-auto mt-3 max-w-sm text-sm leading-6",
                "text-[var(--color-text-muted)]",
              )}
            >
              {subtitle}
            </p>
          </div>
        </div>

        {children}
      </div>
    </section>
  );
}

export default AuthShell;
