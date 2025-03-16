import Link from "next/link";
import { SlScreenTablet } from "react-icons/sl";
import { IoWatchOutline } from "react-icons/io5";
import { MdOutlineLaptopMac } from "react-icons/md";
import { HiOutlineDevicePhoneMobile } from "react-icons/hi2";

const categories = [
  { name: "iPhone", icon: <HiOutlineDevicePhoneMobile size={40} />, href: "/products?category=iPhone" },
  { name: "Mac", icon: <MdOutlineLaptopMac size={40} />, href: "/products?category=Mac" },
  { name: "iPad", icon: <SlScreenTablet size={40} />, href: "/products?category=iPad" },
  { name: "Watch", icon: <IoWatchOutline size={40} />, href: "/products?category=Watch" },
];

export default function CategoryGrid() {
  return (
    <div className="flex flex-col items-center text-center py-12 lg:py-20">
      {/* Title */}
      <p className=" text-3xl text-heading font-bold mb-6 lg:mb-16">Shop By Category</p>

      {/* Category Grid */}
      <div className="grid grid-cols-1 px-14 md:px-0 md:grid-cols-2 gap-6 lg:gap-14 w-full max-w-lg">
        {categories.map((category) => (
          <Link key={category.name} href={category.href}>
            <div className="bg-gray-100 flex flex-col items-center justify-center p-6 rounded-2xl text-xl font-semibold shadow-md cursor-pointer hover:scale-105 transition-transform">
              {category.icon}
              <span className="mt-2">{category.name} →</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}