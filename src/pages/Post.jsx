import { useEffect, useState } from "react";

import clsx from "clsx";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import parse from "html-react-parser";

import appwriteService from "../appwrite/config";
import CrossFilledIcon from "../assets/icons/CrossFilledIcon";
import ExpandContentRoundedDiagonalIcon from "../assets/icons/ExpandContentRoundedDiagonalIcon";
import { Button, Container, PostCard, PostPageSkeleton, PostCardSkeleton } from "../components";

// Full post view with image preview, delete confirmation, and related posts
function Post() {
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [imagePreviewOpen, setImagePreviewOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [relatedLoading, setRelatedLoading] = useState(true);

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
      .then(async (postData) => {
        if (!postData) {
          navigate("/");
          return;
        }

        const isOwner = postData.userId === userData?.$id;

        // Block inactive posts for non-owners
        if (postData.status !== "active" && !isOwner) {
          navigate("/");
          return;
        }

        setPost(postData);

        // Fetch related posts excluding current
        const postsData = await appwriteService.getRelatedPosts();
        if (!postsData) return;

        const filteredPosts = postsData.documents.filter((item) => item.$id !== slug);

        setRelatedPosts(filteredPosts);
      })
      .finally(() => {
        setLoading(false);
        setRelatedLoading(false);
      });
  }, [slug, navigate, userData]);

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.featuredImage);
        navigate("/my-posts");
      }
    });
  };

  const isAuthor = post && userData && post.userId === userData.$id;

  if (loading) return <PostPageSkeleton />;
  if (!post) return null;

  const formattedDate = new Date(post.$updatedAt).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <>
      {/* Delete Confirmation Modal */}
      {deleteModalOpen && (
        <div
          className={clsx(
            "fixed inset-0 z-[120]",
            "flex items-center justify-center",
            "bg-black/60 backdrop-blur-sm",
            "p-4",
          )}
        >
          <div
            className={clsx(
              "w-full max-w-md",
              "rounded-3xl border",
              "border-[var(--color-border)]",
              "bg-[var(--color-card)]",
              "p-6 shadow-2xl",
            )}
          >
            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-[var(--color-text)]">Delete Post</h3>

              <p className="text-sm leading-relaxed text-[var(--color-text-muted)]">
                Are you sure you want to delete this post? This action cannot be undone.
              </p>
            </div>

            {/* Modal Actions */}
            <div className="mt-6 flex items-center justify-end gap-3">
              <Button
                onClick={() => setDeleteModalOpen(false)}
                className={clsx(
                  "bg-[var(--color-card-hover)]",
                  "text-[var(--color-text)]",
                  "hover:bg-[var(--color-border)]",
                )}
              >
                Cancel
              </Button>

              <Button onClick={deletePost} className="bg-red-500 text-white hover:bg-red-600">
                Delete Post
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Image Preview Modal */}
      {imagePreviewOpen && (
        <div
          className={clsx(
            "fixed inset-0 z-[100]",
            "flex items-center justify-center",
            "bg-black/90 p-4",
          )}
        >
          <button
            onClick={() => setImagePreviewOpen(false)}
            className={clsx(
              "absolute right-4 top-4",
              "flex h-11 w-11 items-center justify-center",
              "cursor-pointer rounded-full",
              "bg-white/10 backdrop-blur-md",
              "p-2 text-white",
              "transition-all duration-200",
              "hover:bg-white/20",
            )}
          >
            <CrossFilledIcon />
          </button>

          <img
            src={appwriteService.getFileView(post.featuredImage)}
            alt={post.title}
            onClick={() => setImagePreviewOpen(false)}
            className={clsx(
              "max-h-[92vh] max-w-[95vw]",
              "rounded-2xl object-contain",
              "cursor-zoom-out",
            )}
          />
        </div>
      )}

      {/* Main Section */}
      <section className="py-8 sm:py-10 lg:py-14">
        <Container>
          <div className="mx-auto max-w-[760px]">
            {/* Title */}
            <h1
              className={clsx(
                "text-[1.45rem] font-bold leading-[1.25] tracking-[-0.015em]",
                "opacity-90",
                "text-[var(--color-text)]",
                "sm:text-[1.75rem] lg:text-[2rem]",
              )}
            >
              {post.title}
            </h1>

            {/* Meta */}
            <div
              className={clsx(
                "mt-5 flex flex-wrap items-center gap-3",
                "text-sm text-[var(--color-text-muted)] sm:text-base",
              )}
            >
              <span>
                Author:{" "}
                <span className="font-medium text-[var(--color-text)]">
                  {isAuthor ? "You" : post.authorName || "Anonymous"}
                </span>
              </span>

              <span className="opacity-50">•</span>
              <span>Updated on {formattedDate}</span>
              <span className="opacity-50">•</span>

              <span
                className={clsx(
                  "rounded-full",
                  "bg-[var(--color-card-hover)]",
                  "px-3 py-1",
                  "text-xs font-medium uppercase tracking-wide",
                  "text-[var(--color-text)]",
                )}
              >
                {post.status}
              </span>
            </div>

            {/* Author Actions */}
            {isAuthor && (
              <div className="mt-6 flex flex-wrap gap-3">
                <Link to={`/edit-post/${post.$id}`}>
                  <Button className="cursor-pointer bg-blue-600 hover:bg-blue-700">
                    Edit Post
                  </Button>
                </Link>

                <Button
                  onClick={() => setDeleteModalOpen(true)}
                  className="cursor-pointer bg-red-500 hover:bg-red-600"
                >
                  Delete Post
                </Button>
              </div>
            )}

            {/* Featured Image */}
            <div
              className={clsx(
                "group relative mt-8",
                "overflow-hidden rounded-3xl",
                "border border-[var(--color-border)]",
              )}
            >
              <img
                src={appwriteService.getFileView(post.featuredImage)}
                alt={post.title}
                onClick={() => setImagePreviewOpen(true)}
                className={clsx(
                  "max-h-[620px] w-full",
                  "cursor-zoom-in object-cover",
                  "transition-transform duration-500",
                  "group-hover:scale-[1.02]",
                )}
              />

              <button
                onClick={() => setImagePreviewOpen(true)}
                className={clsx(
                  "absolute right-4 top-4",
                  "flex h-11 w-11 items-center justify-center",
                  "cursor-pointer rounded-full",
                  "bg-white/10 backdrop-blur-md",
                  "p-2 text-white",
                  "transition-all duration-200",
                  "hover:bg-white/20",
                )}
              >
                <ExpandContentRoundedDiagonalIcon />
              </button>
            </div>

            {/* Content */}
            <article className="blog-content mt-10 text-base sm:text-lg">
              {parse(post.content)}
            </article>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <div className="mt-20">
                {/* Related Header */}
                <div className="mb-8 flex items-center justify-between">
                  <h2
                    className={clsx("text-2xl font-bold sm:text-3xl", "text-[var(--color-text)]")}
                  >
                    Related Posts
                  </h2>

                  <Link
                    to="/all-posts"
                    className={clsx(
                      "text-sm font-medium",
                      "text-[var(--color-primary)]",
                      "hover:text-[var(--color-primary-hover)]",
                    )}
                  >
                    View All
                  </Link>
                </div>

                {relatedLoading ? (
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {[...Array(3)].map((_, index) => (
                      <PostCardSkeleton key={index} />
                    ))}
                  </div>
                ) : (
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {relatedPosts.map((relatedPost) => (
                      <PostCard key={relatedPost.$id} {...relatedPost} />
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </Container>
      </section>
    </>
  );
}

export default Post;
