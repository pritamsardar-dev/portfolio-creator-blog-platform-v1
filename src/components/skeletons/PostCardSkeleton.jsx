import clsx from "clsx";

// Placeholder card shown while post data is loading
function PostCardSkeleton() {
  return (
    <div
      className={clsx(
        "overflow-hidden rounded-3xl",
        "border border-[var(--color-border)]",
        "bg-[var(--color-card)]",
      )}
    >
      {/* Image */}
      <div className="aspect-[16/10] skeleton" />

      {/* Content */}
      <div className="p-5">
        <div className="h-5 w-20 rounded-full skeleton" />

        {/* Title */}
        <div className="mt-4 space-y-3">
          <div className="h-6 w-full rounded-lg skeleton" />
          <div className="h-6 w-3/4 rounded-lg skeleton" />
        </div>

        {/* Meta */}
        <div className="mt-6 h-4 w-32 rounded-lg skeleton" />
      </div>
    </div>
  );
}

export default PostCardSkeleton;
