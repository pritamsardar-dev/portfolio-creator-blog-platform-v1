import clsx from "clsx";

// Fallback UI shown when a list or page has no content to display
function EmptyState({ title = "No Data Found", description = "Nothing to show right now." }) {
  return (
    <div
      className={clsx(
        "rounded-3xl border",
        "border-[var(--color-border)]",
        "bg-[var(--color-card)]",
        "px-6 py-14 text-center",
      )}
    >
      <h2 className={clsx("text-2xl font-bold sm:text-3xl", "text-[var(--color-text)]")}>
        {title}
      </h2>

      <p
        className={clsx(
          "mx-auto mt-4 max-w-xl",
          "text-sm leading-7 sm:text-base",
          "text-[var(--color-text-muted)]",
        )}
      >
        {description}
      </p>
    </div>
  );
}

export default EmptyState;
