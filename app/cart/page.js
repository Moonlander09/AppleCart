"use client";
import { useAuth } from "@/helper/authContext";
import {
  deleteCartHandler,
  deleteCartItemHandler,
  getCartHandler,
  updateCartHandler,
} from "@/lib/axiosHandler";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaTrash } from "react-icons/fa";
import Loader from "../_components/Loader";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userData } = useAuth();

  async function updateQuantity(id, action) {
    const cartInfo = {
      productId: id,
      action,
    };
    const updateCart = await updateCartHandler(cartInfo);

    if (updateCart.success === "success") {
      setCartItems(updateCart.updatedCart);
      toast.success("Cart Updated Successfully");
    } else {
      toast.error(updateCart.message);
    }
  }
  async function deleteItem(id) {
    const cartProductId = {
      cartId: id,
    };

    const updateCart = await deleteCartItemHandler(cartProductId);
    setCartItems(updateCart.updatedCart);
  
    if (updateCart.status === "success") {
      setCartItems(updateCart.updatedCart);
      toast.success("Product deleted from Cart");
    } else {
      toast.error("Product is not Deleted");
    }
  }

  async function clearCart() {
    const cart = await deleteCartHandler();
    if ((cart.success = "success")) {
      toast.success(cart.message);
      setCartItems([]);
    }
  }

  useEffect(() => {
    async function fetchCart() {
      if (!userData) {
        setLoading(false);
        return;
      }
      try {
        const { cart } = await getCartHandler();
        setCartItems(cart);
      } catch (error) {
        toast.error("Failed to fetch cart");
      } finally {
        setLoading(false);
      }
    }

    fetchCart();
  }, [userData]);

  if (loading) {
    return <Loader />;
  }

  if (!userData) {
    return (
      <div className="min-h-screen p-4 md:p-6 ">
        <h2 className="text-2xl font-semibold text-center mb-6 py-6 text-heading">
          Your Cart
        </h2>
        <div className="max-w-3xl mx-auto bg-white p-4 md:p-6 rounded-lg shadow-lg">
          <p className="text-center text-lg">
            Your cart is empty. Add products by{" "}
            <Link
              href="/signin"
              className=" font-semibold underline  transition-all duration-300"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen p-2 md:p-6 ">
        <h2 className="text-2xl py-6 font-semibold text-center text-heading mb-6">
          Your Cart
        </h2>

        <div className="max-w-3xl mx-auto bg-white  py-4 px-2 md:p-6 rounded-lg shadow-lg">
          <p className="text-center ">
            Your cart is empty. Add your products from Store.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-2 md:p-6 ">
      <h2 className="text-2xl py-6 font-semibold text-center text-heading mb-6">
        Your Cart
      </h2>

      <div className="max-w-3xl mx-auto bg-white  py-4 px-2 md:p-6 rounded-lg shadow-lg">
        {cartItems.map((item) => (
          <div
            key={item._id}
            className="flex items-center justify-between border-b py-4 gap-1 md:gap-4"
          >
            {/* Product Image */}
            <Image
              width={80}
              height={80}
              priority
              src={item.image}
              alt={item.name}
              className="w-15 h-15 md:w-20 md:h-20 object-cover rounded-lg"
            />

            {/* Product Content */}
            <div className="flex-1">
              <h3 className="text-sm md:text-lg  font-semibold">{item.name}</h3>
              <p className="text-xs md:text-sm">{item.color}</p>
              <p className="text-xs md:text-sm">₹{item.price}</p>
            </div>

            {/* Quantity Buttons */}
            <div className="flex items-center  md:gap-2  border rounded-md px-0.5 md:p-2">
              <button
                onClick={() => updateQuantity(item.productId, "decrease")}
                className="px-2 py-1 text-lg "
              >
                -
              </button>
              <span className="text-sm md:text-lg font-medium">
                {item.quantity}
              </span>
              <button
                onClick={() => updateQuantity(item.productId, "increase")}
                className="px-2 py-1 text-lg "
              >
                +
              </button>
            </div>

            {/* Total Price */}
            <p className="font-semibold text-sm md:text-lg">
              ₹{item.totalPrice}
            </p>

            {/* Delete Button */}
            <button
              onClick={() => deleteItem(item._id)}
              className="p-2 hover:text-[#4d6c8b]"
            >
              <FaTrash size={18} />
            </button>
          </div>
        ))}
      </div>
      {cartItems.length > 0 && (
        <div className="max-w-3xl mx-auto mt-6 flex justify-end gap-4">
          <button
            className="bg-[#bba07a] text-white px-6 py-2 rounded hover:bg-[#aa8d65] transition cursor-pointer"
            onClick={clearCart}
          >
            Clear Cart
          </button>
          <Link href="/checkout">
            <button className="bg-[#0f345b] text-white px-6 py-2 rounded hover:bg-[#0c2948] transition cursor-pointer">
              Proceed to Checkout
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
