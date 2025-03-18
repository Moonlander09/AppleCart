import Image from "next/image";
import Link from "next/link";
import { productHandler } from "@/lib/axiosHandler";

export default async function StorePage({ searchParams }) {
  const searchQuery = await searchParams;
  const page = searchQuery.page * 1 || 1;
  
  const categoryId = searchQuery.category;
  const { data, pagination } = await productHandler(categoryId, page);
  

  const { totalPages, currentPage } = pagination;
  const categories = ["iPhone", "Watch", "iPad", "Mac"];

  return (
    <div className="my-4 mx-4 md:mx-8 flex flex-col gap-6">
      <h3 className="text-2xl md:text-3xl font-semibold text-center border-b border-gray-200 py-6 md:py-10">
        Our Products
      </h3>
      
      {/* Category Filters */}
      <div className="py-4 flex flex-wrap gap-4 justify-center">
        {categories.map((category) => (
          <Link href={`/products/?category=${category}`} key={category}>
            <button
              className={`px-4 py-2 rounded-lg transition font-medium text-lg md:text-xl ${
                category === categoryId
                  ? "bg-[#0f345b] text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {category}
            </button>
          </Link>
        ))}
        <Link href="/products">
          <button className="px-4 py-2 rounded-lg transition bg-gray-200 hover:bg-gray-300 text-lg md:text-xl">
            Clear Filter
          </button>
        </Link>
      </div>

      {/* Product Grid */}
      <div className="pt-6 px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10 border-t border-gray-200">
        {data.map((product) => (
          <div
            key={product._id}
            className="rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 p-4 bg-white"
          >
            <Link href={`/products/${product._id}`}>
              <div className="relative w-full h-48 flex justify-center bg-gray-100 rounded-lg">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={300}
                  height={300}
                  className="w-full h-full object-contain mix-blend-multiply"
                  priority
                />
              </div>
              <div className="p-2 text-center">
                <h4 className="text-xl font-semibold">{product.name}</h4>
                <p className="text-gray-700 font-bold mt-1">₹{product.price}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="my-6 flex justify-center items-center gap-4">
        <Link
          href={`/products?${categoryId ? `category=${categoryId}&` : ""}page=${page > 1 ? page - 1 : 1}`}
          className={page <= 1 ? "pointer-events-none opacity-50" : ""}
        >
          <button
            className="px-6 py-2 rounded-lg border border-gray-400 text-gray-600 bg-gray-100 hover:bg-gray-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={page <= 1}
          >
            Back
          </button>
        </Link>

        <span className="text-gray-600 text-lg md:text-xl">
          Page {currentPage} of {totalPages}
        </span>

        <Link
          href={`/products?${categoryId ? `category=${categoryId}&` : ""}page=${page < totalPages ? page + 1 : totalPages}`}
          className={page >= totalPages ? "pointer-events-none opacity-50" : ""}
        >
          <button
            className="px-6 py-2 rounded-lg bg-black text-white hover:bg-gray-900 transition disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={page >= totalPages}
          >
            Next
          </button>
        </Link>
      </div>

    
    </div>
  );
}