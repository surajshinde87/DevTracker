"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import {
  FaUserPlus,
  FaTools,
  FaMapMarkedAlt,
  FaRegStickyNote,
  FaBrain,
  FaVial,
  FaChartLine,
  FaRobot,
  FaMedal,
} from "react-icons/fa";

// Step-by-step roadmap steps with icon, title, and description
const steps = [
  { icon: FaUserPlus, title: "Sign up & choose your role", desc: "Frontend, Full Stack, Backend, DSA, DevOps…" },
  { icon: FaTools, title: "Tell us what you know", desc: "Select your existing skills – we’ll build your roadmap." },
  { icon: FaMapMarkedAlt, title: "Get your personalized roadmap", desc: "AI guides your learning with clear steps & goals." },
  { icon: FaRegStickyNote, title: "Track skills & save notes", desc: "Organize topics, add notes, and attach resources." },
  { icon: FaBrain, title: "Revise smarter with AI", desc: "Flashcards, quizzes, and AI-generated revision help." },
  { icon: FaVial, title: "Test & improve", desc: "Take quizzes, answer theory questions, and learn from feedback." },
  { icon: FaChartLine, title: "Analyze your growth", desc: "Progress charts show your strengths & improvement areas." },
  { icon: FaRobot, title: "Ask the AI assistant anytime", desc: "Clear doubts, get examples, or generate notes instantly." },
  { icon: FaMedal, title: "Earn badges & build your journey!", desc: "Stay motivated with streaks, XP, and achievements." },
];

// Form validation schema using Yup
const schema = yup.object().shape({
  fullName: yup.string().required("Full Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
  confirmPassword: yup.string().oneOf([yup.ref("password")], "Passwords must match").required("Confirm Password is required"),
});

// Type definition for form data
interface FormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Register = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // React Hook Form setup
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  // Form submit handler
  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      console.log("User Data:", data);
      setTimeout(() => {
        setLoading(false);
        router.push("/onboarding"); // Redirect to onboarding after signup
      }, 1500);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  return (
    <div className="h-screen flex overflow-hidden bg-white text-gray-800 dark:bg-[#27282a] dark:text-white transition-colors duration-500">
      
      {/* Left Side - Steps Guide Section */}
      <div className="hidden lg:flex flex-col justify-center items-center w-1/2 px-10 py-12 bg-[#6c4bc8] text-white dark:text-gray-200 shadow-xl">
        <h1 className="text-4xl font-bold mb-4">Your Dev Journey, Simplified with AI</h1>
        
        {/* Steps rendered two per row */}
        <div className="relative flex flex-col items-center space-y-8 mt-4 text-purple-100">
          {Array.from({ length: Math.ceil(steps.length / 2) }).map((_, rowIndex) => {
            const firstIndex = rowIndex * 2;
            const stepsInRow = steps.slice(firstIndex, firstIndex + 2);

            return (
              <div key={rowIndex} className="flex w-full max-w-6xl justify-center space-x-6">
                {stepsInRow.map((step, indexInRow) => {
                  const actualIndex = firstIndex + indexInRow;
                  const Icon = step.icon;

                  return (
                    <div key={actualIndex} className="relative w-1/2 bg-[#f4f4f4] dark:bg-[#333537] rounded-xl p-4 shadow-lg">
                      
                      {/* Step number circle */}
                      <div className="absolute -top-4 -left-4 bg-white dark:bg-gray-200 text-[#6c4bc8] font-extrabold rounded-full w-8 h-8 flex items-center justify-center shadow-md">
                        {actualIndex + 1}
                      </div>

                      {/* Icon and step content */}
                      <div className="flex items-start space-x-4">
                        <Icon className="text-2xl flex-shrink-0 text-[#6c4bc8] dark:text-gray-200 mt-1" />
                        <div>
                          <strong className="text-[#6c4bc8] dark:text-gray-200">{step.title}</strong>
                          <p className="text-sm text-[#6c4bc8] dark:text-gray-400">{step.desc}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>

      {/* Right Side - Signup Form */}
      <div className="flex flex-col justify-center items-center w-full lg:w-1/2 px-6 sm:px-10 py-12">
        <h2 className="text-4xl font-extrabold mb-10 text-[#6c4bc8] dark:text-purple-400">DevTracker</h2>

        {/* Signup Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md space-y-4">
          
          {/* Input Fields */}
          {["fullName", "email", "password", "confirmPassword"].map((field) => (
            <div key={field}>
              <label className="block mb-1 font-medium capitalize">
                {field.replace(/([A-Z])/g, " $1")}
              </label>
              <input
                type={field.toLowerCase().includes("password") ? "password" : "text"}
                {...register(field as keyof FormData)}
                className="w-full py-2.5 px-4 rounded-lg focus:outline-0 focus:ring-0 bg-[#f4f4f4] dark:bg-[#333537] dark:border-[#27282a] dark:text-white"
                placeholder={
                  field === "fullName"
                    ? "John Doe"
                    : field.includes("email")
                    ? "you@example.com"
                    : "••••••••"
                }
              />
              <p className="text-red-500 text-sm">{errors[field as keyof FormData]?.message}</p>
            </div>
          ))}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full mt-2 py-2 rounded-xl font-semibold transition ${
              loading
                ? "bg-purple-300 cursor-not-allowed"
                : "bg-[#6c4bc8] hover:bg-purple-600 text-white"
            }`}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>

          {/* Link to Login */}
          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-[#6c4bc8] dark:text-purple-400 hover:underline">
              Log In
            </Link>
          </p>

          {/* Social Auth Buttons */}
          <div className="flex items-center justify-center mt-4 space-x-4">
            <button
              type="button"
              className="flex items-center px-4 py-2 border border-purple-400 rounded-lg text-[#6c4bc8] dark:text-purple-400 hover:bg-[#f4f4f4] dark:hover:bg-[#333537] transition"
            >
              <FcGoogle className="mr-2 text-xl" />
              Google
            </button>
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
    </div>
  );
};

export default Register;
