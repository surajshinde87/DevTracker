"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { signIn } from "next-auth/react";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { FiEye, FiEyeOff } from "react-icons/fi";

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

interface FormData {
  email: string;
  password: string;
}

const LoginForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) throw new Error(result.error || "Login failed");

      router.push("/dashboard");
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  // SOCIAL LOGIN: No redirect: false, let next-auth handle full redirect flow
  const handleSocialLogin = (provider: "google" | "github") => {
    setLoading(true);
    signIn(provider, { callbackUrl: "/dashboard" });
    // No manual redirect here because signIn will redirect automatically
  };

  return (
    <div className="flex flex-col justify-center items-center w-full lg:w-1/2 px-6 sm:px-10 py-12">
      <h2 className="text-4xl font-extrabold mb-10 text-[#6c4bc8] dark:text-purple-400">
        DevTracker
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md space-y-4">
        {["email", "password"].map((field) => (
          <div key={field} className="relative">
            <label className="block mb-1 font-medium capitalize">
              {field.replace(/([A-Z])/g, " $1")}
            </label>

            <input
              type={
                field === "password" ? (showPassword ? "text" : "password") : "email"
              }
              {...register(field as keyof FormData)}
              placeholder={field === "email" ? "you@example.com" : "••••••••"}
              className="w-full py-2.5 px-4 pr-10 rounded-lg focus:outline-0 focus:ring-0 bg-[#f4f4f4] dark:bg-[#333537] dark:border-[#27282a] dark:text-white"
            />

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

            <p className="text-red-500 text-sm">{errors[field as keyof FormData]?.message}</p>
          </div>
        ))}

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

        <p className="text-center text-sm text-gray-500 dark:text-gray-400">
          Don&apos;t have an account?{" "}
          <Link
            href="/auth/register"
            className="font-medium text-[#6c4bc8] dark:text-purple-400 hover:underline"
          >
            Register
          </Link>
        </p>

        <div className="flex items-center justify-center mt-4 space-x-4">
          <button
            type="button"
            onClick={() => handleSocialLogin("google")}
            className="flex items-center px-4 py-2 border border-purple-400 rounded-lg text-[#6c4bc8] dark:text-purple-400 hover:bg-[#f4f4f4] dark:hover:bg-[#333537] transition"
            disabled={loading}
          >
            <FcGoogle className="mr-2 text-xl" />
            Google
          </button>

          <button
            type="button"
            onClick={() => handleSocialLogin("github")}
            className="flex items-center px-4 py-2 border border-purple-400 rounded-lg text-[#6c4bc8] dark:text-purple-400 hover:bg-[#f4f4f4] dark:hover:bg-[#333537] transition"
            disabled={loading}
          >
            <FaGithub className="mr-2 text-xl" />
            GitHub
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
