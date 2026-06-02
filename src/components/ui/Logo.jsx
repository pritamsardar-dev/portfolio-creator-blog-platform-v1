import clsx from "clsx";

// Site logo with icon and wordmark
function Logo() {
  return (
    <div className="flex items-center gap-2 font-semibold tracking-tight">
      <div
        className={clsx(
          "flex items-center justify-center",
          "rounded-xl",
          "bg-[var(--color-primary)] text-white",
          "shadow-lg",
          "h-9 w-9 md:h-10 md:w-10",
        )}
      >
        <span className="text-sm font-bold md:text-base">B</span>
      </div>

      <div className="leading-none">
        <p className="text-sm font-semibold text-[var(--color-text)] md:text-base">BlogSpace</p>

        <p className="hidden text-xs text-[var(--color-text-muted)] sm:block">
          Creator Blog Platform
        </p>
      </div>
    </div>
  );
}

export default Logo;
