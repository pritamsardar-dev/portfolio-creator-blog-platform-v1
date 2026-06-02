import { useEffect, useState } from "react";

import clsx from "clsx";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import appwriteService from "../appwrite/config";
import { Container, PostForm, PostFormSkeleton } from "../components";

// Edit page restricted to the post owner
function EditPost() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  const { slug } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    if (!slug) {
      navigate("/");
      return;
    }

    appwriteService
      .getPost(slug)
      .then((postData) => {
        if (!postData) {
          navigate("/");
          return;
        }

        // Redirect if current user is not the post owner
        const isOwner = postData.userId === userData?.$id;
        if (!isOwner) {
          navigate("/");
          return;
        }

        setPost(postData);
      })
      .finally(() => setLoading(false));
  }, [slug, navigate, userData]);

  // Loading State
  if (loading) {
    return (
      <section className="py-8 sm:py-10 lg:py-14">
        <Container>
          <div className="mx-auto max-w-7xl">
            {/* Header Skeleton */}
            <div className="mb-10">
              <div className="skeleton h-3 w-32 rounded" />
              <div className="skeleton mt-4 h-8 w-64 rounded" />
              <div className="skeleton mt-4 h-4 w-full max-w-2xl rounded" />
            </div>

            <PostFormSkeleton />
          </div>
        </Container>
      </section>
    );
  }

  if (!post) return null;

  return (
    <section className="py-8 sm:py-10 lg:py-14">
      <Container>
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-10">
            <p
              className={clsx(
                "mb-3 text-sm font-medium uppercase tracking-[0.2em]",
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
              Edit Post
            </h1>

            <p
              className={clsx(
                "mt-4 max-w-2xl text-sm leading-7 sm:text-base",
                "text-[var(--color-text-muted)]",
              )}
            >
              Update your article content, image, and publishing status.
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
            <PostForm post={post} />
          </div>
        </div>
      </Container>
    </section>
  );
}

export default EditPost;
