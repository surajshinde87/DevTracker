"use client"; // Enables client-side rendering in Next.js

// React and Required Libraries
import React, { useState } from "react";
import Link from "next/link"; // For client-side routing
import { useRouter } from "next/navigation"; // Router hook for navigation
import { useForm } from "react-hook-form"; // Handles form state and validation
import { yupResolver } from "@hookform/resolvers/yup"; // Integrates Yup with react-hook-form
import * as yup from "yup"; // For schema-based validation

// Icons
import { FcGoogle } from "react-icons/fc"; // Google logo
import { FaGithub } from "react-icons/fa"; // GitHub logo
import { FiEye, FiEyeOff } from "react-icons/fi"; // Eye icons for toggling password visibility

// Form validation schema using Yup
const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

// TypeScript interface for the form fields
interface FormData {
  email: string;
  password: string;
}

// LoginForm component
const LoginForm = () => {
  const router = useRouter(); // Used for programmatic navigation
  const [loading, setLoading] = useState(false); // Indicates form submission state
  const [showPassword, setShowPassword] = useState(false); // Toggles password visibility

  // Setting up React Hook Form
  const {
    register, // To register input fields
    handleSubmit, // Submits the form
    formState: { errors }, // Access form validation errors
  } = useForm<FormData>({
    resolver: yupResolver(schema), // Attach Yup validation schema
  });

  // Form submit handler
  const onSubmit = async (data: FormData) => {
    setLoading(true); // Enable loading state

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Required for sending/receiving cookies
        body: JSON.stringify(data), // Convert data to JSON
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Login failed");
      }

      // Navigate to dashboard after successful login
      router.push("/dashboard");
    } catch (error: any) {
      console.error("Login error:", error.message);
      alert(error.message); // Optional: show alert to user
    } finally {
      setLoading(false); // Disable loading state
    }
  };

  return (
    <>
      {/* Page Wrapper */}
      <div className="flex flex-col justify-center items-center w-full lg:w-1/2 px-6 sm:px-10 py-12">
        {/* App Title */}
        <h2 className="text-4xl font-extrabold mb-10 text-[#6c4bc8] dark:text-purple-400">
          DevTracker
        </h2>

        {/* Login Form */}
        <form
          onSubmit={handleSubmit(onSubmit)} // Wrap form submission
          className="w-full max-w-md space-y-4"
        >
          {/* Input Fields: email and password */}
          {["email", "password"].map((field) => (
            <div key={field} className="relative">
              {/* Input Label */}
              <label className="block mb-1 font-medium capitalize">
                {field.replace(/([A-Z])/g, " $1")} {/* Format camelCase to normal */}
              </label>

              {/* Input Box */}
              <input
                type={
                  field === "password"
                    ? showPassword
                      ? "text"
                      : "password"
                    : "email"
                }
                {...register(field as keyof FormData)} // Register field for validation
                placeholder={field === "email" ? "you@example.com" : "••••••••"}
                className="w-full py-2.5 px-4 pr-10 rounded-lg focus:outline-0 focus:ring-0 bg-[#f4f4f4] dark:bg-[#333537] dark:border-[#27282a] dark:text-white"
              />

              {/* Password visibility toggle */}
              {field === "password" && (
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-4 top-10 text-gray-500 dark:text-gray-300"
                  tabIndex={-1}
                >
                  {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                </button>
              )}

              {/* Error message */}
              <p className="text-red-500 text-sm">
                {errors[field as keyof FormData]?.message}
              </p>
            </div>
          ))}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            aria-busy={loading}
            className={`w-full mt-2 py-2 rounded-xl font-semibold transition ${
              loading
                ? "bg-[#6c4bc8] cursor-not-allowed text-white"
                : "bg-[#6c4bc8] hover:bg-purple-600 text-white"
            }`}
          >
            {loading ? "Logging In..." : "Login"}
          </button>

          {/* Link to Register Page */}
          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            Don&apos;t have an account?{" "}
            <Link
              href="/auth/register"
              className="font-medium text-[#6c4bc8] dark:text-purple-400 hover:underline"
            >
              Register
            </Link>
          </p>

          {/* Social Login Buttons */}
          <div className="flex items-center justify-center mt-4 space-x-4">
            {/* Google Login */}
            <button
              type="button"
              className="flex items-center px-4 py-2 border border-purple-400 rounded-lg text-[#6c4bc8] dark:text-purple-400 hover:bg-[#f4f4f4] dark:hover:bg-[#333537] transition"
            >
              <FcGoogle className="mr-2 text-xl" />
              Google
            </button>

            {/* GitHub Login */}
            <button
              type="button"
              className="flex items-center px-4 py-2 border border-purple-400 rounded-lg text-[#6c4bc8] dark:text-purple-400 hover:bg-[#f4f4f4] dark:hover:bg-[#333537] transition"
            >
              <FaGithub className="mr-2 text-xl" />
              GitHub
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default LoginForm;
