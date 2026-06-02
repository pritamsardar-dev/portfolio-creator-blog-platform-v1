import clsx from "clsx";
import { useSelector } from "react-redux";

import { Container, PostForm, GuestGate } from "../components";

// Page for creating a new post with guest and post-limit guards
function AddPost() {
  const userData = useSelector((state) => state.auth.userData);
  const userPostCount = useSelector((state) => state.auth.userPostCount);

  const isGuest = !userData;
  const hasReachedLimit = userPostCount >= 10;

  return (
    <section className="py-16 sm:py-16 lg:py-20">
      <Container>
        <div className="mx-auto max-w-7xl">
          {/* Guest State */}
          {isGuest ? (
            <div className="mx-auto max-w-md px-4 sm:px-0">
              <GuestGate
                title="Sign in to create posts"
                description="You need an account to create and publish blog posts. Sign in or create a new account to start writing."
              />
            </div>
          ) : hasReachedLimit ? (
            /* Max Post Limit */
            <div className="mx-auto max-w-md px-4 sm:px-0">
              <GuestGate
                hideActions
                title="Post limit reached"
                description="You have reached the maximum limit of 10 posts for now. Stay tuned — the limit may increase in future updates."
              />
            </div>
          ) : (
            <>
              {/* Header */}
              <div className="mb-10">
                <p
                  className={clsx(
                    "mb-3",
                    "text-sm font-medium uppercase tracking-[0.2em]",
                    "text-[var(--color-primary)]",
                  )}
                >
                  Dashboard
                </p>

                <h1
                  className={clsx(
                    "text-3xl font-bold tracking-tight sm:text-4xl",
                    "text-[var(--color-text)]",
                  )}
                >
                  Create New Post
                </h1>

                <p
                  className={clsx(
                    "mt-4 max-w-2xl",
                    "text-sm leading-7",
                    "text-[var(--color-text-muted)]",
                  )}
                >
                  Write and publish a new article using the editor below.
                </p>
              </div>

              {/* Form Section */}
              <div
                className={clsx(
                  "rounded-3xl border",
                  "border-[var(--color-border)]",
                  "bg-[var(--color-card)]",
                  "p-4 sm:p-6 lg:p-8",
                )}
              >
                <PostForm />
              </div>
            </>
          )}
        </div>
      </Container>
    </section>
  );
}

export default AddPost;
