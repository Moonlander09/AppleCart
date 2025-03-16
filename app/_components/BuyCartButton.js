"use client";

import { addToCartHandler } from "@/lib/axiosHandler";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

function BuyCartButton({ id }) {
  const router = useRouter();
  async function cartHandler() {
    if (id) {
      const cartData = await addToCartHandler(id);

      if (cartData.status === "success") {
        toast.success(cartData.message);
      } else {
        toast.error(cartData.response.data.message);
      }
    }
  }

  async function getCart() {
    if (id) {
      const cartData = await addToCartHandler(id);

      if (cartData.status === "success") {
        toast.success(cartData.message);
        router.push("/checkout");
      } else {
        toast.error(cartData.response.data.message);
      }
    }
  }

  return (
    <>
      <button
        className="bg-[#bba07a] text-white py-2 px-4 cursor-pointer rounded hover:bg-[#aa8d65]"
        onClick={getCart}
      >
        Buy Now
      </button>
      <button
        className="bg-[#0f345b] hover:bg-[#0c2948] text-white py-2 px-4 cursor-pointer rounded"
        onClick={cartHandler}
      >
        Add to Cart
      </button>
    </>
  );
}

export default BuyCartButton;
