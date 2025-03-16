"use client";
import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="flex flex-col md:flex-row md:gap-2  items-center justify-between lg:justify-center px-6 py-14 lg:pb-20 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)]">
    {/* Hero Content */}
    <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0">
      <h1 className="text-4xl font-bold mb-4">
        Welcome to Our Store
      </h1>
      <p className="text-lg mb-6">
        Discover amazing products and find the best deals tailored just for
        you.
      </p>
      <Link href="/products" className="inline-block bg-[#0f345b] text-white px-6 py-3 rounded-md hover:bg-[#0c2948] transition">
        Explore Products
      </Link>
    </div>

    {/* Image Section */}
  <div>

      <Image
        src='/bg-hero.png'
        alt="Hero Image"
        width={500}
        height={500}
        className="object-cover rounded-lg shadow-lg "
        />
        </div>
    
  </section>
  );
}



// className="relative h-screen bg-cover bg-center flex items-center justify-center text-white"
// style={{ backgroundImage: "url('/bg-hero-1.jpg')" }}