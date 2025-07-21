
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";



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

const RegisterForm = () => {

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
        router.push("/auth/onboarding"); // Redirect to onboarding after signup
      }, 1500);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  return(
    <>
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
                ? "bg-[#6c4bc8] cursor-not-allowed"
                : "bg-[#6c4bc8] hover:bg-purple-600 text-white"
            }`}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>

          {/* Link to Login */}
          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            Already have an account?{" "}
            <Link href="/auth/login" className="font-medium text-[#6c4bc8] dark:text-purple-400 hover:underline">
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
    </>
  );
};

export default RegisterForm;
