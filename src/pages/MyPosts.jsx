import { useEffect, useState } from "react";

import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import appwriteService from "../appwrite/config";
import {
  Container,
  PostCard,
  PostCardSkeleton,
  EmptyState,
  GuestGate,
  Button,
} from "../components";

// Dashboard page showing the current user's posts
function MyPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const isGuest = !userData;

  useEffect(() => {
    if (!userData) {
      setLoading(false);
      return;
    }

    // Fetch all posts belonging to the current user
    appwriteService
      .getUserPosts(userData.$id)
      .then((postsData) => {
        if (postsData) setPosts(postsData.documents);
      })
      .finally(() => setLoading(false));
  }, [userData]);

  // Guest State
  if (isGuest) {
    return (
      <section className="py-16">
        <Container>
          <div className="mx-auto max-w-md px-4 sm:px-0">
            <GuestGate
              title="Sign in to view your posts"
              description="You need an account to access your dashboard. Sign in or create a new account to continue."
            />
          </div>
        </Container>
      </section>
    );
  }

  // Loading State
  if (loading) {
    return (
      <section className="py-10 sm:py-12 lg:py-14">
        <Container>
          {/* Loading Header */}
          <div
            className={clsx(
              "mx-auto mb-10 flex flex-col gap-4",
              "sm:flex-row sm:items-end sm:justify-between",
            )}
          >
            <div className="space-y-4">
              <div className="skeleton h-4 w-28 rounded-full" />
              <div className="skeleton h-10 w-52 rounded-2xl" />
            </div>
            <div className="skeleton h-5 w-28 rounded-full" />
          </div>

          {/* Loading Posts Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
      <section className="py-16">
        <Container>
          <div className="mx-auto max-w-md px-4 sm:px-0">
            <EmptyState
              title="No Posts Yet"
              description="You haven't created any posts yet. Start writing your first blog post."
            />

            {/* Empty Actions */}
            <div className="mt-8 flex justify-center">
              <Button
                onClick={() => navigate("/add-post")}
                className="bg-[var(--color-primary)] text-white"
              >
                Create Post
              </Button>
            </div>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-14">
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
              Dashboard
            </p>

            <h1 className={clsx("mt-3 text-3xl font-bold sm:text-4xl", "text-[var(--color-text)]")}>
              My Posts
            </h1>
          </div>

          <p className="text-sm text-[var(--color-text-muted)]">
            Total Posts : {posts.length} / 12
          </p>
        </div>

        {/* Posts Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.$id} {...post} />
          ))}
        </div>
      </Container>
    </section>
  );
}

export default MyPosts;
