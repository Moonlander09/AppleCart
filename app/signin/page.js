"use client";
import { useState } from "react";
import Link from "next/link";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { LogInHandler } from "@/lib/axiosHandler";




export default function SigninPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const data = await LogInHandler(formData);

      // ✅ Success Login - Update user & redirect
      if (data.status === "success") {
        toast.success("Sign In Successfully!");
   
        router.push("/profile");
      }
    } catch (error) {
      // ✅ Error Handling
      toast.error("Invalid email or password");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-4">Sign In</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
          <button
            type="submit"
            className="w-full  text-white py-2 rounded bg-[#0f345b] hover:bg-[#0c2948] transition cursor-pointer"
          >
            Sign In
          </button>
        </form>
        <div className="text-center mt-3">
          <p>
            Create an account?{" "}
            <Link href="/signup" className="text-heading hover:underline">
              Sign Up
            </Link>
          </p>
          <p className="mt-2">
            <Link
              href="/forgotpassword"
              className="text-primary hover:underline"
            >
              Forgot Password?
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
