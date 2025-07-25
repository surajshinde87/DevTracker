// Import React and necessary hooks
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { yupResolver } from "@hookform/resolvers/yup"; // Integrates Yup with React Hook Form
import * as yup from "yup"; // For schema-based form validation
import { FcGoogle } from "react-icons/fc"; // Google icon
import { FaGithub } from "react-icons/fa"; // GitHub icon
import { FiEye, FiEyeOff } from "react-icons/fi"; // Password show/hide icons

// Form validation schema using Yup
const schema = yup.object().shape({
  fullName: yup.string().required("Full Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
});

// TypeScript interface to define structure of form data
interface FormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// Main component
const RegisterForm = () => {
  const router = useRouter(); // Used for redirecting
  const [loading, setLoading] = useState(false); // Button loading state
  const [showPassword, setShowPassword] = useState(false); // Toggle password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Toggle confirm password visibility
  const [socialLoading, setSocialLoading] = useState("");

  // Setup React Hook Form with Yup validation
  const {
    register, 
    handleSubmit, 
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema), 
  });

  // Form submission handler
  const onSubmit = async (data: FormData) => {
    setLoading(true); 

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: data.fullName,
          email: data.email,
          password: data.password,
          role: "user", // You can let the user choose this if needed
          skills: [], // Also can be customized by user input
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Signup failed");
      }
      router.push("/auth/login");
    } catch (error: any) {
      console.error("[Signup Error]", error.message);
      alert(error.message); // Show alert for user-friendly error
    } finally {
      setLoading(false); // Stop loading state
    }
  };

  // Social login handler with loading and error handling
  const handleSocialLogin = async (provider: "google" | "github") => {
    setSocialLoading(provider);
    try {
      const res = await signIn(provider, { redirect: false });

      if (res?.error) {
        alert(`Error signing in with ${provider}: ${res.error}`);
        setSocialLoading("");
      } else if (res?.url) {
        // Redirect manually since redirect: false
        window.location.href = res.url;
      } else {
        setSocialLoading("");
      }
    } catch (error: any) {
      alert(`Error signing in with ${provider}`);
      setSocialLoading("");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-full lg:w-1/2 px-6 sm:px-10 py-12">
      {/* App Title */}
      <h2 className="text-4xl font-extrabold mb-10 text-[#6c4bc8] dark:text-purple-400">
        DevTracker
      </h2>

      {/* Signup Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md space-y-4"
      >
        {/* Input Fields: Full Name, Email, Password, Confirm Password */}
        {["fullName", "email", "password", "confirmPassword"].map((field) => {
          const isPassword = field === "password";
          const isConfirmPassword = field === "confirmPassword";
          const isSecure = isPassword || isConfirmPassword;
          const show = isPassword ? showPassword : showConfirmPassword;

          return (
            <div key={field} className="relative">
              {/* Input Label */}
              <label className="block mb-1 font-medium capitalize">
                {field.replace(/([A-Z])/g, " $1")}
              </label>

              {/* Input Box */}
              <input
                type={
                  isSecure
                    ? show
                      ? "text"
                      : "password"
                    : field === "email"
                    ? "email"
                    : "text"
                }
                {...register(field as keyof FormData)} // Register input
                className="w-full py-2.5 px-4 pr-10 rounded-lg focus:outline-0 focus:ring-0 bg-[#f4f4f4] dark:bg-[#333537] dark:border-[#27282a] dark:text-white"
                placeholder={
                  field === "fullName"
                    ? "John Doe"
                    : field === "email"
                    ? "you@example.com"
                    : "••••••••"
                }
              />

              {/* Toggle password visibility button */}
              {isSecure && (
                <button
                  type="button"
                  onClick={() =>
                    isPassword
                      ? setShowPassword((prev) => !prev)
                      : setShowConfirmPassword((prev) => !prev)
                  }
                  className="absolute right-4 top-10 text-gray-500 dark:text-gray-300"
                  tabIndex={-1}
                >
                  {show ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                </button>
              )}

              {/* Error Message */}
              <p className="text-red-500 text-sm">
                {errors[field as keyof FormData]?.message}
              </p>
            </div>
          );
        })}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full mt-2 py-2 rounded-xl font-semibold transition ${
            loading
              ? "bg-[#6c4bc8] cursor-not-allowed text-white"
              : "bg-[#6c4bc8] hover:bg-purple-600 text-white"
          }`}
        >
          {loading ? "Signing Up..." : "Sign Up"}
        </button>

        {/* Redirect to Login */}
        <p className="text-center text-sm text-gray-500 dark:text-gray-400">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="font-medium text-[#6c4bc8] dark:text-purple-400 hover:underline"
          >
            Log In
          </Link>
        </p>

        {/* Social Login Buttons */}
        <div className="flex items-center justify-center mt-4 space-x-4">
          <button
            type="button"
            onClick={() => handleSocialLogin("google")}
            disabled={socialLoading === "google"}
            className={`flex items-center px-4 py-2 border border-purple-400 rounded-lg text-[#6c4bc8] ${
              socialLoading === "google" ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <FcGoogle className="mr-2 text-xl" />
            {socialLoading === "google" ? "Loading..." : "Google"}
          </button>

          <button
            type="button"
            onClick={() => handleSocialLogin("github")}
            disabled={socialLoading === "github"}
            className={`flex items-center px-4 py-2 border border-purple-400 rounded-lg text-[#6c4bc8] ${
              socialLoading === "github" ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <FaGithub className="mr-2 text-xl" />
            {socialLoading === "github" ? "Loading..." : "GitHub"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
