"use client";
import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function VerifyEmail() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");
  

  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);

  const handleVerify = async () => {
    if (!token) return toast.error("Invalid token!");

    setLoading(true);
    try {
      const res = await axios.get(`/api/users/verifyemail?token=${token}`);
      console.log("getting res", res);
      setVerified(true);

      setTimeout(() => {
        router.push("/signin"); // Redirect to signin page
      }, 2000);
    } catch (error) {
      toast.error("Verification failed. Try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md text-center">
        <h2 className="text-2xl font-semibold mb-4">Email Verification</h2>
        <button
          onClick={handleVerify}
          disabled={loading || verified}
          className={`w-full py-2 text-white rounded ${
            verified
              ? "bg-green-500"
              : loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {verified
            ? "Email Verified"
            : loading
            ? "Verifying..."
            : "Verify Email"}
        </button>
      </div>
    </div>
  );
}
