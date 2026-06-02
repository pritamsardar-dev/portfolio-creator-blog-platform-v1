import { useCallback, useEffect, useState } from "react";

import clsx from "clsx";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import appwriteService from "../../appwrite/config";
import { Button, RTE, Input, Select } from "../../components";

// Form used for both creating and editing posts
function PostForm({ post }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      slug: "",
      content: "",
      status: "active",
    },
  });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  // Reset form when editing an existing post
  useEffect(() => {
    if (post) {
      reset({
        title: post.title || "",
        slug: post.slug || "",
        content: post.content || "",
        status: post.status || "active",
      });
    }
  }, [post, reset]);

  // Generate an Appwrite-safe slug from a string
  const slugTransform = useCallback((value) => {
    if (!value) return "";

    return value
      .trim()
      .toLowerCase()
      .slice(0, 36)
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  }, []);

  // Auto-generate slug from title on create
  useEffect(() => {
    const sub = watch((value, { name }) => {
      if (name === "title" && !post) {
        setValue("slug", slugTransform(value.title || ""));
      }
    });

    return () => sub.unsubscribe();
  }, [watch, setValue, slugTransform, post]);

  // Generate local preview URL when a new image is selected
  useEffect(() => {
    const sub = watch((value, { name }) => {
      if (name === "image") {
        const file = value.image?.[0];
        if (file instanceof File) {
          setImagePreview(URL.createObjectURL(file));
        }
      }
    });

    return () => sub.unsubscribe();
  }, [watch]);

  // Require image only when creating a new post
  const validateImage = (fileList) => {
    if (post) return true;
    return fileList && fileList.length > 0;
  };

  const submit = async (data) => {
    if (isSubmitting) return;

    setServerError("");

    try {
      setIsSubmitting(true);

      if (data.title.length > 255) throw new Error("Title must be under 255 characters");
      if (data.content.length > 10000) throw new Error("Content must be under 10000 characters");

      if (post) {
        // Update existing post
        const file = data.image?.[0] ? await appwriteService.uploadFile(data.image[0]) : null;

        if (file) await appwriteService.deleteFile(post.featuredImage);

        const dbPost = await appwriteService.updatePost(post.$id, {
          title: data.title,
          content: data.content,
          featuredImage: file ? file.$id : post.featuredImage,
          status: data.status,
        });

        if (dbPost) navigate(`/post/${dbPost.$id}`);
      } else {
        // Create new post
        const file = await appwriteService.uploadFile(data.image[0]);

        const dbPost = await appwriteService.createPost({
          title: data.title,
          slug: data.slug,
          content: data.content,
          featuredImage: file.$id,
          status: data.status,
          userId: userData.$id,
        });

        if (dbPost) navigate("/my-posts");
      }
    } catch (error) {
      const msg = error?.message || "";

      // Map Appwrite errors to user-friendly messages
      if (msg.includes("Maximum post limit") || msg.includes("12 posts")) {
        setServerError(
          "You've reached the current 12 post limit. This helps us maintain platform performance and reduce spam or low quality content. Post limits will be expanded in a future update.",
        );
      } else if (
        msg.includes("documentId") ||
        msg.includes("Invalid") ||
        msg.includes("36 chars")
      ) {
        setServerError(
          "Invalid slug. Use only letters, numbers, hyphens with a maximum of 36 characters.",
        );
      } else if (msg.includes("slug") || msg.includes("exists")) {
        setServerError("Slug already exists. Try a different title.");
      } else if (msg.includes("Title")) {
        setServerError("Title is too long with a maximum of 255 characters.");
      } else if (msg.includes("Content")) {
        setServerError("Content is too long with a maximum of 10000 characters.");
      } else {
        setServerError("Something went wrong. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="grid gap-8 lg:grid-cols-[2fr_1fr]">
      {/* Left Section */}
      <div className="space-y-6">
        {/* Server Error */}
        {serverError && (
          <div
            className={clsx(
              "rounded-xl border",
              "border-red-500/30 bg-red-500/10",
              "p-4 text-sm text-red-500",
            )}
          >
            {serverError}
          </div>
        )}

        <Input label="Title" {...register("title", { required: true })} />
        {errors.title && <p className="text-sm text-red-500">Title is required</p>}

        {!post && <Input label="Slug" {...register("slug", { required: true, maxLength: 36 })} />}
        {errors.slug && (
          <p className="text-sm text-red-500">Slug is required with a maximum of 36 characters</p>
        )}

        <RTE label="Content" name="content" control={control} error={errors.content?.message} />
      </div>

      {/* Right Sidebar */}
      <div
        className={clsx(
          "h-fit space-y-6",
          "rounded-3xl border",
          "border-[var(--color-border)]",
          "bg-[var(--color-card)]",
          "p-5 !cursor-pointer",
        )}
      >
        <Input type="file" accept="image/*" {...register("image", { validate: validateImage })} />
        {errors.image && <p className="text-sm text-red-500">Featured image is required</p>}

        {/* Image Preview */}
        {(imagePreview || post) && (
          <img
            src={imagePreview || appwriteService.getFileView(post.featuredImage)}
            className="h-52 w-full rounded-2xl object-cover"
          />
        )}

        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <Select
              options={["active", "inactive"]}
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 hover:bg-blue-700"
        >
          {isSubmitting
            ? post
              ? "Updating..."
              : "Publishing..."
            : post
              ? "Update Post"
              : "Publish Post"}
        </Button>
      </div>
    </form>
  );
}

export default PostForm;
