import { useEffect, useState } from "react";

import clsx from "clsx";

import appwriteService from "../appwrite/config";
import { Container, PostCard, PostCardSkeleton, EmptyState } from "../components";
import ScrollToTop from "../components/common/ScrollToTop";

// Paginated list of all published posts
function AllPosts() {
  const POSTS_PER_PAGE = 9;

  const [posts, setPosts] = useState([]);
  const [totalPosts, setTotalPosts] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    const offset = (currentPage - 1) * POSTS_PER_PAGE;

    appwriteService
      .getPaginatedPosts({ limit: POSTS_PER_PAGE, offset })
      .then((postsData) => {
        if (postsData) {
          setPosts(postsData.documents);
          setTotalPosts(postsData.total);
        }
      })
      .finally(() => setLoading(false));
  }, [currentPage]);

  const totalPages = Math.max(1, Math.ceil(totalPosts / POSTS_PER_PAGE));

  const handlePrevPage = () => {
    if (currentPage === 1) return;
    setCurrentPage((prev) => prev - 1);
  };

  const handleNextPage = () => {
    if (currentPage === totalPages) return;
    setCurrentPage((prev) => prev + 1);
  };

  const paginationButtonClasses = clsx(
    "cursor-pointer rounded-xl",
    "border border-[var(--color-border)]",
    "bg-[var(--color-card)]",
    "px-5 py-2.5",
    "text-sm font-medium text-[var(--color-text)]",
    "transition-all duration-200",
    "hover:bg-[var(--color-card-hover)]",
    "disabled:cursor-not-allowed disabled:opacity-50",
  );

  // Loading State
  if (loading) {
    return (
      <section className="py-10 sm:py-12 lg:py-16">
        <Container>
          {/* Loading Header */}
          <div
            className={clsx(
              "mb-10 flex flex-col gap-4",
              "sm:flex-row sm:items-end sm:justify-between",
            )}
          >
            <div className="space-y-4">
              <div className="skeleton h-4 w-28 rounded-full" />
              <div className="skeleton h-10 w-52 rounded-2xl" />
              <div className="skeleton h-5 w-72 rounded-full" />
            </div>
            <div className="skeleton h-5 w-28 rounded-full" />
          </div>

          {/* Loading Posts Grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, index) => (
              <PostCardSkeleton key={index} />
            ))}
          </div>

          {/* Loading Pagination */}
          <div className="mt-12 flex items-center justify-center gap-4">
            <div className="skeleton h-11 w-28 rounded-xl" />
            <div className="skeleton h-5 w-16 rounded-full" />
            <div className="skeleton h-11 w-28 rounded-xl" />
          </div>
        </Container>
      </section>
    );
  }

  // Empty State
  if (posts.length === 0) {
    return (
      <section className="py-16 sm:py-20">
        <Container>
          <div className="mx-auto max-w-2xl">
            <EmptyState
              title="No Posts Found"
              description="There are no published posts available right now. Please check back later."
            />
          </div>
        </Container>
      </section>
    );
  }

  return (
    <>
      <ScrollToTop trigger={currentPage} />

      <section className="py-10 sm:py-12 lg:py-16">
        <Container>
          {/* Page Header */}
          <div
            className={clsx(
              "mb-10 flex flex-col gap-4",
              "sm:flex-row sm:items-end sm:justify-between",
            )}
          >
            <div>
              <p
                className={clsx(
                  "text-sm font-medium uppercase tracking-[0.2em]",
                  "text-[var(--color-primary)]",
                )}
              >
                Explore
              </p>

              <h1
                className={clsx(
                  "mt-3 text-3xl font-bold tracking-tight sm:text-4xl",
                  "text-[var(--color-text)]",
                )}
              >
                All Posts
              </h1>

              <p
                className={clsx(
                  "mt-3 text-sm leading-7 sm:text-base",
                  "text-[var(--color-text-muted)]",
                )}
              >
                Browse all published articles, blogs, and stories shared by the community.
              </p>
            </div>

            <p className="text-sm text-[var(--color-text-muted)]">Total Posts : {totalPosts}</p>
          </div>

          {/* Posts Grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post.$id} {...post} />
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className={paginationButtonClasses}
            >
              Previous
            </button>

            <p className="text-sm font-medium text-[var(--color-text-muted)]">
              Page {currentPage} of {totalPages}
            </p>

            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={paginationButtonClasses}
            >
              Next
            </button>
          </div>
        </Container>
      </section>
    </>
  );
}

export default AllPosts;
