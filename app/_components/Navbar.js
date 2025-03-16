"use client";
import { FiUser, FiShoppingCart, FiMenu, FiX } from "react-icons/fi";
import { FaApple } from "react-icons/fa";
import Link from "next/link";
import { useAuth } from "@/helper/authContext";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { LuBadgeInfo } from "react-icons/lu";
import { IoStorefrontOutline } from "react-icons/io5";


export default function Navbar() {
  const { userData } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [router]);

  return (
    <>
      {/* Overlay to prevent background interaction when menu is open */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}

      <nav className=" w-full shadow-md p-4 flex justify-between items-center bg-white z-50">
        {/* Left Side - Logo */}
        <Link href="/" className="flex gap-2">
          <FaApple className="text-2xl" />
          <span className="text-xl font-bold">AppleCart</span>
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-2xl z-50"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>

        {/* Nav Links */}
        <div
          className={`lg:flex gap-6 items-center fixed lg:static top-0 right-0 w-64 h-full lg:w-auto lg:h-auto bg-white shadow-lg lg:shadow-none transition-transform duration-300 z-50 ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          } lg:translate-x-0`}
        >
          <Link
            href="/products"
            className="p-4 flex items-center font-semibold gap-1"
            onClick={() => setMenuOpen(false)}
          >
           <IoStorefrontOutline /> Store
          </Link>
          <Link
            href="/about"
            className="p-4 flex items-center font-semibold gap-1"
            onClick={() => setMenuOpen(false)}
          >
            <LuBadgeInfo/>About Us
          </Link>
          <Link
            href="/cart"
            className="p-4 font-semibold flex gap-1.5 items-center"
            onClick={() => setMenuOpen(false)}
          >
            <FiShoppingCart /> Cart
          </Link>
          {userData ? (
            <Link
              href="/profile"
              className="p-4 flex items-center font-semibold gap-1 "
              onClick={() => setMenuOpen(false)}
            >
              <FiUser /> {userData.userName}
            </Link>
          ) : (
            <Link
              href="/signin"
              className="p-4 flex font-semibold items-center gap-1 "
              onClick={() => setMenuOpen(false)}
            >
              <FiUser /> Sign In
            </Link>
          )}
        </div>
      </nav>
    </>
  );
}
