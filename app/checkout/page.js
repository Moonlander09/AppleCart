"use client";
import {
  getCheckoutHandler,
  paymentHandler,
  verifyPaymentHandler,
} from "@/lib/axiosHandler";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Loader from "../_components/Loader";

export default function CheckoutPage() {
  const [cart, setCart] = useState([]);

  const router = useRouter();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  function cancelPayment() {
    router.push("/");
  }

  async function createPayment() {
    try {
      // ✅ Step 1: Hit the Payment API to generate Order ID
      const data = await paymentHandler();
      const {
        orderId,
        amount,
        currency,
        totalQuantity,
        userName,
        email,
        productInfo,
      } = data;

      // ✅ Step 2: Prepare the Razorpay Options
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
        amount,
        currency: currency,
        name: "AppleCart Store",
        description: "Payment for your cart products",
        order_id: orderId,
        handler: async function (response) {
          // ✅ Step 3: After successful payment, send Payment Details to Backend
          const body = {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            amount,
            products: productInfo,
            quantity: totalQuantity,
          };

          // ✅ Step 4: Verify the payment with your backend

          const result = await verifyPaymentHandler(body);

          if (result.status === "success") {
            toast.success(result.message);
            router.push("/");
          } else {
            toast.error("Payment Verification Failed!");
          }
        },
        prefill: {
          name: userName,
          email: email,
          contact: "9999999999",
        },
        theme: {
          color: "#007bff",
        },
      };

      // ✅ Step 5: Open Razorpay Popup
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      toast.error("Payment failed. Try again!");
    }
  }

  useEffect(() => {
    async function fetchCart() {
      try {
        const { cart } = await getCheckoutHandler();
        setCart(cart);
      } catch (error) {
        toast.error("Failed to fetch cart");
      }
    }

    fetchCart();
  }, []);

  if (cart.length === 0) {
    return <Loader />;
  }

  return (
    <div className="max-w-3xl mx-auto p-2 sm:p-6 bg-white rounded-lg shadow-lg mt-10">
      {/* Checkout Heading */}
      <h2 className="text-2xl font-semibold mb-6  text-center text-heading">
        Checkout
      </h2>

      {/* Order Summary */}
      <div className="border-b pb-4 mb-4 ">
        <h3 className="text-lg font-semibold mb-3 ">Order Summary</h3>

        {/* Cart Items */}
        <div className="space-y-4">
          {cart.map((item) => (
            <div
              key={item.productId}
              className="flex flex-row items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <Image
                  priority
                  width={80}
                  height={80}
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div className="text-left">
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-500">Color: {item.color}</p>
                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                </div>
              </div>
              <p className="font-medium text-lg sm:text-base">
                ₹{item.totalPrice}
              </p>
            </div>
          ))}
        </div>

        {/* Total Price */}
        <div className="flex flex-row justify-between mt-4 border-t pt-4 text-center sm:text-left">
          <p className="font-semibold text-gray-800">Total:</p>
          <p className="font-semibold text-gray-800 text-lg sm:text-base">
            ₹{cart.reduce((total, item) => total + item.totalPrice, 0)}
          </p>
        </div>
      </div>

      {/* User Info */}
      <div className="border-b pb-4 mb-4">
        <h3 className="text-lg font-bold mb-3 ">User Information</h3>

        <p className="text-gray-700">
          Name: <span className="font-bold">{cart[0]?.userId.userName}</span>
        </p>
        <p className="text-gray-700">
          Email: <span className="font-bold">{cart[0]?.userId.email}</span>
        </p>
      </div>

      {/* Payment Section */}
      <div className="pb-4 mb-4">
        <h3 className="text-lg font-bold mb-3">Payment Method</h3>
        <p>Proceed to Razorpay for secure payment.</p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row justify-end gap-4">
        <button
          className="px-6 py-2 bg-[#bba07a] text-white rounded hover:bg-[#aa8d65] w-full sm:w-auto cursor-pointer"
          onClick={cancelPayment}
        >
          Cancel
        </button>
        <button
          className="px-6 py-2 text-white rounded  w-full sm:w-auto bg-[#0f345b] hover:bg-[#0c2948] transition cursor-pointer"
          onClick={createPayment}
        >
          Proceed to Payment
        </button>
      </div>
    </div>
  );
}
