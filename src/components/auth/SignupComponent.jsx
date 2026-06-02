import { useState } from "react";

import clsx from "clsx";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

import authService from "../../appwrite/auth";
import { login as authLogin } from "../../store/authSlice";

import Button from "../ui/Button";
import Input from "../ui/Input";
import AuthShell from "./AuthShell";

function SignupComponent() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const createAccount = async (data) => {
    setError("");

    try {
      await authService.createAccount(data);

      // Get current user after signup
      const userData = await authService.getCurrentUser();

      if (userData) {
        dispatch(authLogin({ userData }));
      }

      navigate("/");
    } catch (error) {
      setError(error.message || "Signup failed. Try again.");
    }
  };

  return (
    <AuthShell
      title="Create account"
      subtitle="Start publishing blogs and manage your content easily."
    >
      {/* Signup Form */}
      <form onSubmit={handleSubmit(createAccount)} className="space-y-5">
        <Input
          label="Full Name"
          placeholder="Enter your name"
          error={errors.name?.message}
          {...register("name", {
            required: "Name is required",
          })}
        />

        <Input
          label="Email Address"
          type="email"
          placeholder="Enter your email"
          error={errors.email?.message}
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Enter a valid email address",
            },
          })}
        />

        <Input
          label="Password"
          type="password"
          placeholder="Create a password"
          error={errors.password?.message}
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
          })}
        />

        {/* API Error */}
        {error && (
          <div
            className={clsx(
              "rounded-lg border px-3 py-2",
              "border-red-500/20 bg-red-500/10",
              "text-sm text-red-500",
            )}
          >
            {error}
          </div>
        )}

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Creating account..." : "Create Account"}
        </Button>

        {/* Login Link */}
        <p className="text-center text-sm text-[var(--color-text-muted)]">
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-[var(--color-primary)] hover:underline">
            Sign in
          </Link>
        </p>
      </form>
    </AuthShell>
  );
}

export default SignupComponent;
