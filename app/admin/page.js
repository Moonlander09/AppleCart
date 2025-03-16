'use client'
import ProductManagement from "@/app/_components/ProductManagement";
import OrderManagement from "@/app/_components/OrderManagement";
import {  useState } from "react";
import CreateProduct from "../_components/CreateProduct";


export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("products");

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
      <div className="flex gap-2 mx-3 md:mx-0 md:gap-4 mb-6">
        <button
          className={`px-4 py-2 rounded ${
    activeTab === "products" ? "bg-[#0f345b] text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("products")}
        >
          Manage Products
        </button>
        <button
          className={`px-4 py-2 rounded ${
    activeTab === "orders" ? "bg-[#0f345b] text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("orders")}
        >
          Manage Orders
        </button>
        <button
          className={`px-4 py-2 rounded ${
    activeTab === "create" ? "bg-[#0f345b] text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("create")}
        >
          Create Product
        </button>
      </div>

      {/* Render Component Based on Active Tab */}
      {activeTab === "products" && <ProductManagement />}
      {activeTab === "orders" && <OrderManagement />}
      {activeTab === "create" && <CreateProduct/>}
    </div>
  );
}