import { useEffect, useState } from "react";

import clsx from "clsx";
import { useNavigate } from "react-router-dom";

import appwriteService from "../appwrite/config";
import heroImage from "../assets/images/hero-image-blog post-cuate.svg";
import Container from "../components/layout/Container";
import PostCard from "../components/post/PostCard";
import PostCardSkeleton from "../components/skeletons/PostCardSkeleton";
import { EmptyState } from "../components";

// Home page with hero section and featured posts
function Home() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    appwriteService
      .getFeaturedPosts()
      .then((postsData) => {
        if (postsData) setPosts(postsData.documents);
      })
      .finally(() => setLoading(false));
  }, []);

  // Loading State
  if (loading) {
    return (
      <section className="py-10 sm:py-12 lg:py-16">
        <Container>
          {/* Hero Skeleton */}
          <div
            className={clsx(
              "mb-12 rounded-3xl border",
              "border-[var(--color-border)]",
              "bg-[var(--color-card)]",
              "p-6 sm:p-8 lg:p-10",
            )}
          >
            <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-2">
              <div className="max-w-3xl space-y-6">
                <div className="skeleton h-4 w-40 rounded-full" />
                <div className="space-y-4">
                  <div className="skeleton h-10 w-full rounded-xl" />
                  <div className="skeleton h-10 w-3/4 rounded-xl" />
                </div>
                <div className="space-y-3">
                  <div className="skeleton h-4 w-full rounded-lg" />
                  <div className="skeleton h-4 w-5/6 rounded-lg" />
                </div>
              </div>

              {/* Image Skeleton */}
              <div className="hidden h-[300px] rounded-2xl skeleton lg:block" />
            </div>
          </div>

          {/* Posts Skeleton Grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, index) => (
              <PostCardSkeleton key={index} />
            ))}
          </div>
        </Container>
      </section>
    );
  }

  // Empty State
  if (posts.length === 0) {
    return (
      <section className="py-20">
        <Container>
          <EmptyState
            title="No Posts Available"
            description="No blog posts have been published yet. Login and start creating your first article."
          />
        </Container>
      </section>
    );
  }

  return (
    <section className="py-10 sm:py-12 lg:py-16">
      <Container>
        {/* Hero Section */}
        <div
          className={clsx(
            "mb-8 rounded-2xl border",
            "border-[var(--color-border)]",
            "bg-[var(--color-card)]",
            "px-5 py-6 sm:px-6 sm:py-7 lg:px-8 lg:py-8",
          )}
        >
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[65%_35%]">
            {/* Text Content */}
            <div className="flex h-full max-w-3xl flex-col justify-center">
              <p
                className={clsx(
                  "inline-flex w-fit items-center",
                  "rounded-full border",
                  "border-[var(--color-border)]",
                  "bg-[var(--color-bg-secondary)]",
                  "px-3 py-1",
                  "text-xs font-medium text-[var(--color-primary)]",
                )}
              >
                ✦ Creator Blog Platform
              </p>

              <h1
                className={clsx(
                  "mt-4 text-2xl font-bold leading-tight tracking-tight sm:text-3xl lg:text-4xl",
                  "text-[var(--color-text)]",
                )}
              >
                Publish Stories, Share Ideas, Build Presence
              </h1>

              <p
                className={clsx(
                  "mt-4 max-w-2xl text-sm leading-7 sm:text-base",
                  "text-[var(--color-text-muted)]",
                )}
              >
                A modern blogging platform where users can write, publish, and explore community
                posts through a clean and responsive publishing experience.
              </p>

              {/* Hero Actions */}
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => navigate("/all-posts")}
                  className={clsx(
                    "cursor-pointer rounded-xl",
                    "bg-[var(--color-primary)]",
                    "px-4 py-2 text-sm text-white",
                    "transition-all",
                    "hover:bg-[var(--color-primary-hover)]",
                  )}
                >
                  Explore Posts
                </button>

                <button
                  onClick={() => navigate("/add-post")}
                  className={clsx(
                    "cursor-pointer rounded-xl",
                    "border border-[var(--color-border)]",
                    "px-4 py-2 text-sm",
                    "text-[var(--color-text)]",
                    "transition-all",
                    "hover:bg-[var(--color-card-hover)]",
                  )}
                >
                  Write a Post
                </button>
              </div>
            </div>

            {/* Hero Image */}
            <div className="mt-6 flex items-center justify-center lg:mt-0">
              <img
                src={heroImage}
                alt="Hero"
                className={clsx(
                  "w-full rounded-2xl object-contain",
                  "max-h-[200px] sm:max-h-[210px] lg:max-h-[220px]",
                )}
              />
            </div>
          </div>
        </div>

        {/* Section Header */}
        <div className="mb-8">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-[var(--color-primary)]">
            Latest Posts
          </p>

          <h2 className={clsx("mt-2 text-2xl font-bold sm:text-3xl", "text-[var(--color-text)]")}>
            Featured Articles
          </h2>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.$id} {...post} />
          ))}
        </div>

        {/* View More */}
        <div className="mt-10 flex justify-center">
          <button
            onClick={() => navigate("/all-posts")}
            className={clsx(
              "cursor-pointer rounded-xl",
              "border border-[var(--color-border)]",
              "bg-[var(--color-card)]",
              "px-5 py-2 text-sm",
              "text-[var(--color-text)]",
              "transition-all",
              "hover:bg-[var(--color-card-hover)]",
            )}
          >
            View More Posts
          </button>
        </div>
      </Container>
    </section>
  );
}

export default Home;
