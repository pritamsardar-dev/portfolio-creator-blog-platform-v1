import clsx from "clsx";

// Placeholder grid shown while post listings are loading
function PostGridSkeleton({ count = 6 }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {[...Array(count)].map((_, index) => (
        <div
          key={index}
          className={clsx(
            "h-[340px] rounded-3xl",
            "border border-[var(--color-border)]",
            "bg-[var(--color-card)]",
            "skeleton",
          )}
        />
      ))}
    </div>
  );
}

export default PostGridSkeleton;
