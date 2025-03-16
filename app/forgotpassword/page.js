"use client";
import { useState } from "react";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/api/users/forgotpassword", { email });
      if (res.data.status === "success") {
        toast.success("Link send Successfully!");
        router.push("/signin");
      }
    } catch (error) {
      
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-4">
          Forgot Password
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
          <button
            type="submit"
            className="w-full  text-white py-2 rounded bg-[#0f345b] hover:bg-[#0c2948] transition cursor-pointer disabled:opacity-50"
          >
            Send Reset Link
          </button>
        </form>

        <p className="text-center mt-4">
          Remember your password?{" "}
          <Link href="/signin" className="text-heading hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
