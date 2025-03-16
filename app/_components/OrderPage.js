"use client";

import Image from "next/image";

export default function MyOrdersPage({ orders }) {

  return (
    <div className="max-w-5xl mx-auto p-6 mt-10">
      <h2 className="text-2xl font-semibold mb-6">My Orders</h2>

      {orders.length === 0 ? (
        <p>You have no orders yet.</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="bg-white p-4 rounded-lg mb-6 shadow-lg">
            {/* Order Details */}
            <div className="flex flex-col gap-2 mb-4">
              <p>
                <strong>Order ID:</strong> {order.orderId}
              </p>
              <p>
                <strong>Payment ID:</strong> {order.paymentId}
              </p>
              <p>
                <strong>Quantity:</strong> {order.quantity}
              </p>
              <p>
                <strong>Amount:</strong> ₹{order.amount}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                <span
                  className={`${
                    order.status === "delivered"
                      ? "text-green-600"
                      : "text-orange-500"
                  } font-semibold`}
                >
                  {order.status}
                </span>
              </p>
              <p>
                <strong>Order Date:</strong> {new Date(order.createdAt).toLocaleString()}
              </p>
            </div>

            {/* Product Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {order.products.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-3 rounded-lg"
                >
                  <Image
                    src={item.productImage}
                    width={80}
                    height={80}
                    className="rounded-lg object-cover"
                    alt={item.productName}
                  />
                  <div>
                    <p className="font-medium">{item.productName}</p>
                    <p className="text-sm">
                      Price: ₹{item.productPrice}
                    </p>
                    <p className="text-sm">
                      Quantity: {item.productQuantity}
                    </p>
                    <p className="text-sm">
                      Color: {item.productColor}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
