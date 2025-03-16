"use client";

import { useAuth } from "@/helper/authContext";
import {
  getOrderHandler,
  getProfileHandler,
  profileLogoutHandler,
} from "@/lib/axiosHandler";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import MyOrdersPage from "../_components/OrderPage";
import Link from "next/link";
import Loader from "../_components/Loader";

export default function Profile() {
  const [activeTab, setActiveTab] = useState("profile");
  const [orders, setOrders] = useState([]);
  const [profile, setProfile] = useState(null);
 
  const router = useRouter();

  const { setUserData } = useAuth();

  async function logoutHandler() {
    const logout = await profileLogoutHandler();
    if (logout.status === "success") {
      setUserData(null);
      toast.success(logout.message);
      router.push("/");
    }
  }

  useEffect(() => {
    async function fetchCart() {
      try {

        const { user } = await getProfileHandler();
        const { order } = await getOrderHandler();
        setOrders(order);
        setProfile(user);
        setUserData(user);
       
      } catch (error) {
        toast.error("Failed to Get User Profile");
      }
    }

    fetchCart();
  }, [setUserData]);
  if(!profile){
    return <Loader/>
  }



  return (
  <div className="max-w-4xl mx-auto p-6 min-h-screen rounded-lg shadow-lg mt-10">
    <h2 className="text-2xl font-semibold text-center mb-6 text-heading">Your Profile</h2>
    {/* TOP SECTION: Tabs */}
    <div className="flex justify-center border-b-2 border-[#89163c] pb-4 mb-4">
      <button
        onClick={() => setActiveTab("profile")}
        className={`px-6 py-2 text-sm font-medium ${
          activeTab === "profile"
            ? "text-heading border-b-2 border-[#89163c]"
            : "text-primary"
        }`}
      >
        Profile
      </button>
      <button
        onClick={() => setActiveTab("orders")}
        className={`px-6 py-2 text-sm font-medium ${
          activeTab === "orders"
            ? "text-heading border-b-2 border-[#89163c]"
            : "text-primary"
        }`}
      >
        My Orders
      </button>
    </div>

    {/* BOTTOM SECTION: Content */}
    <div className="mt-4">
      {activeTab === "profile" && (
        <div className="space-y-4 ml-4">
          <h2 className="text-xl font-semibold ">My Profile</h2>
          <div className="space-y-3">
            <p >
              <span className="font-extrabold">Username:</span>{" "}
              {profile.userName}
            </p>
            <p >
              <span className="font-extrabold">Email:</span> {profile.email}
            </p>
            <p >
              <span className="font-extrabold">Verified:</span>{" "}
              {profile.isVerified ? (
                <span className="text-green-600 font-medium">Yes</span>
              ) : (
                <span className="text-red-600 font-medium">No</span>
              )}
            </p>
          </div>
          {profile.isAdmin && (
            <Link href="/admin">
              <button className="px-6 py-2 bg-[#bba07a] text-white rounded hover:bg-[#aa8d65] cursor-pointer transition">
                Admin Panel
              </button>
            </Link>
          )}

          {/* Logout Button */}
          <div className="mt-2">
            <button
              className="px-6 py-2 bg-[#0f345b] text-white rounded hover:bg-[#0c2948] cursor-pointer transition"
              onClick={logoutHandler}
            >
              Logout
            </button>
          </div>
        </div>
      )}

      {activeTab === "orders" && <MyOrdersPage orders={orders} />}
    </div>
  </div>
  );
}
