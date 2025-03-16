import { NextResponse } from "next/server";
import connectDB from "@/lib/dbConnect";
import Orders from "@/model/orderSchema";

export async function PATCH(req) {
  try {
    await connectDB();

    const { orderId } = await req.json(); // Extract orderId from request body

    if (!orderId) {
      return NextResponse.json(
        { status: "fail", message: "Order ID is required" },
        { status: 400 }
      );
    }

    // Find and update the order status to 'delivered'
    const updatedOrder = await Orders.findOneAndUpdate(
      { _id: orderId }, 
      { status: "delivered" }, 
      { new: true } // Return updated document
    );

    if (!updatedOrder) {
      return NextResponse.json(
        { status: "fail", message: "Order not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { status: "success", message: "Order updated successfully", data: updatedOrder },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { status: "fail", message: "Error updating order", error: error.message },
      { status: 500 }
    );
  }
}