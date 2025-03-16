"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  getAllOrdersHandler,
  updateOrderStatusHandler,
} from "@/lib/axiosHandler";
import Loader from "./Loader";

export default function OrderManagement() {
  const [orders, setOrders] = useState([]);

  // ✅ Fetch All Orders
  async function fetchOrders() {
    try {
      const ordersDetail = await getAllOrdersHandler();
      
      if (ordersDetail.status === "success") {
        setOrders(ordersDetail.data);
      } else {
        toast.error("Failed to fetch orders");
      }
    } catch (error) {
      toast.error("Error fetching orders");
    }
  }

  // ✅ Mark Order as Delivered
  async function markAsDelivered(orderId) {
    try {
      const response = await updateOrderStatusHandler(orderId);

      if (response.status === "success") {
        toast.success("Order marked as delivered");
        fetchOrders();
      } else {
        toast.error("Failed to update status");
      }
    } catch (error) {
      toast.error("Error updating order status");
    }
  }

  useEffect(() => {
    fetchOrders();
  }, []);
  if (orders.length === 0) {
    return <Loader />;
  }
  return (
    <div className="p-5">
      <h2 className="text-2xl font-semibold mb-4">Manage Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order._id}
              className="border p-4 rounded-md shadow-sm bg-white"
            >
              <p className="text-sm">User Name: {order.userId.userName}</p>
              <p className="text-sm">Email ID: {order.userId.email}</p>
              <p className="text-sm">Order ID: {order.orderId}</p>
              <p className="text-sm">Payment ID: {order.paymentId}</p>
              <p className="text-sm">Amount: ₹{order.amount / 100}</p>
              <p className="text-sm">Quantity: {order.quantity}</p>
              <p className="text-sm">Status: {order.status}</p>
              <p className="text-sm">
                Date: {new Date(order.createdAt).toLocaleString()}
              </p>

              <button
                onClick={() => markAsDelivered(order._id)}
                className={`mt-3 px-4 py-2 text-white rounded-md ${
                  order.status === "delivered"
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
                disabled={order.status === "delivered"}
              >
                {order.status === "delivered"
                  ? "Already Delivered"
                  : "Mark as Delivered"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
