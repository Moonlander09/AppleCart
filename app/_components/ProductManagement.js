"use client";
import { useEffect, useState } from "react";
import { adminProductsHandler, deleteProductHandler } from "@/lib/axiosHandler";
import Image from "next/image";
import toast from "react-hot-toast";
import Loader from "./Loader";

export default function ProductManagement() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const { data } = await adminProductsHandler();
        setProducts(data);
      } catch (error) {
        toast.error("Failed to Get Products");
      }
    }

    fetchProducts();
  }, []);
 

  async function handleDelete(productId) {
    
    try {
      const { data } = await deleteProductHandler(productId);
      setProducts(data);
      toast.success("Product Deleted Successfully");
    } catch (error) {
      toast.error("Failed to delete product");
    }
  }
if(products.length===0){
  return <Loader/>
}
  return (
    <div className="py-6 md:p-6">
      <h2 className="text-2xl font-semibold mb-4">Manage Products</h2>
      <div className="grid grid-cols-1  sm:mx-4 lg:grid-cols-2 gap-4">
        {products.map((product) => (
          <div
            key={product._id}
            className="border-gray-900 md:flex gap-4 md:items-center md:justify-between p-4 rounded-lg shadow-md grid grid-cols-2"
          >
            <Image
              width={80}
              height={80}
              src={product.image}
              alt={product.name}
              className="w-40 h-40 object-cover md:mb-4 mix-blend-multiply rounded"
            />
            <div className="place-content-center">
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-gray-600">Price: ₹{product.price}</p>
              <p className="text-gray-500 text-sm">
                Category: {product.category}
              </p>
            </div>

            <button
              onClick={() => handleDelete(product._id)}
              className="mt-4 col-span-full bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
