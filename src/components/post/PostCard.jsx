import clsx from "clsx";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import appwriteService from "../../appwrite/config";

// Blog post preview card with owner-aware actions
function PostCard({ $id, title, content, featuredImage, $updatedAt, authorName, status, userId }) {
  const userData = useSelector((state) => state.auth.userData);

  const formattedDate = new Date($updatedAt).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  // Strip HTML tags for plain text preview
  const previewText = content?.replace(/<[^>]+>/g, "")?.slice(0, 110);

  const isInactive = status === "inactive";
  const isOwner = userData && userId === userData.$id;

  return (
    <Link to={`/post/${$id}`} className="group block h-full">
      <article
        className={clsx(
          "flex h-full flex-col",
          "overflow-hidden rounded-2xl",
          "border border-[var(--color-border)]",
          "bg-[var(--color-card)]",
          "transition-all duration-300",
          "hover:-translate-y-1 hover:border-white/10 hover:bg-[var(--color-card-hover)]",
        )}
      >
        {/* Image Section */}
        <div className="relative aspect-[16/9] overflow-hidden">
          <img
            src={appwriteService.getFileView(featuredImage)}
            alt={title}
            className={clsx(
              "h-full w-full object-cover",
              "transition-transform duration-500",
              "group-hover:scale-105",
            )}
          />

          {/* Status Badge */}
          {isInactive && (
            <div
              className={clsx(
                "absolute left-3 top-3",
                "rounded-full",
                "bg-black/70 backdrop-blur-md",
                "px-3 py-1",
                "text-[11px] font-medium uppercase tracking-wide text-white",
              )}
            >
              Private
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="flex flex-1 flex-col p-4">
          {/* Meta Info */}
          <div
            className={clsx(
              "mb-4 flex flex-wrap items-center gap-2",
              "text-xs text-[var(--color-text-muted)]",
            )}
          >
            <span>Author: {isOwner ? "You" : authorName || "Anonymous"}</span>
            <span className="opacity-50">•</span>
            <span>{formattedDate}</span>
          </div>

          {/* Post Title */}
          <h2
            className={clsx(
              "line-clamp-2",
              "text-base font-semibold leading-6 sm:text-lg",
              "text-[var(--color-text)]",
              "transition-colors duration-200",
              "group-hover:text-[var(--color-primary)]",
            )}
          >
            {title}
          </h2>

          {/* Post Preview */}
          <p
            className={clsx(
              "mt-3 line-clamp-2",
              "text-sm leading-6",
              "text-[var(--color-text-muted)]",
            )}
          >
            {previewText}...
          </p>

          {/* Footer Section */}
          <div className="mt-auto flex items-center justify-between pt-4">
            {/* Left Actions */}
            <div className="flex items-center gap-3">
              <span className="text-sm text-[var(--color-text-muted)]">
                {isInactive ? "Private post" : "Read article"}
              </span>

              {isOwner && (
                <>
                  <span className="text-sm font-semibold text-blue-500">Edit</span>

                  <span className="text-sm font-semibold text-red-500">Delete</span>
                </>
              )}
            </div>

            {/* Arrow Icon */}
            <span
              className={clsx(
                "text-lg text-[var(--color-text-muted)]",
                "transition-transform duration-300",
                "group-hover:translate-x-1",
              )}
            >
              →
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}

export default PostCard;
