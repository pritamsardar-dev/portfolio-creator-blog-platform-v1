import PostGridSkeleton from "./PostGridSkeleton";

// Placeholder shown while a full post page is loading
function PostPageSkeleton() {
  return (
    <section className="py-8 sm:py-10 lg:py-14">
      <div className="mx-auto max-w-5xl">
        {/* Title */}
        <div className="space-y-4">
          <div className="h-10 w-3/4 rounded skeleton" />
          <div className="h-6 w-1/2 rounded skeleton" />
        </div>

        {/* Image */}
        <div className="mt-8 h-[420px] rounded-3xl skeleton" />

        {/* Content */}
        <div className="mt-10 space-y-4">
          <div className="h-4 w-full rounded skeleton" />
          <div className="h-4 w-[95%] rounded skeleton" />
          <div className="h-4 w-[90%] rounded skeleton" />
          <div className="h-4 w-[85%] rounded skeleton" />
          <div className="h-4 w-[80%] rounded skeleton" />
        </div>

        {/* Related Posts */}
        <div className="mt-20">
          <div className="mb-6 h-6 w-48 rounded skeleton" />
          <PostGridSkeleton count={3} />
        </div>
      </div>
    </section>
  );
}

export default PostPageSkeleton;
