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

function LoginComponent() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const login = async (data) => {
    setError("");

    try {
      await authService.login(data);

      const userData = await authService.getCurrentUser();

      if (userData) {
        dispatch(authLogin({ userData }));
      }

      navigate("/");
    } catch (error) {
      setError(error.message || "Login failed. Try again.");
    }
  };

  return (
    <AuthShell title="Welcome back" subtitle="Sign in to manage your posts and continue writing.">
      {/* Login Form */}
      <form onSubmit={handleSubmit(login)} className="space-y-5">
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
          placeholder="Enter your password"
          error={errors.password?.message}
          {...register("password", {
            required: "Password is required",
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
          {isSubmitting ? "Signing in..." : "Sign In"}
        </Button>

        {/* Signup Link */}
        <p className="text-center text-sm text-[var(--color-text-muted)]">
          Don&apos;t have an account?{" "}
          <Link to="/signup" className="font-medium text-[var(--color-primary)] hover:underline">
            Create account
          </Link>
        </p>
      </form>
    </AuthShell>
  );
}

export default LoginComponent;
