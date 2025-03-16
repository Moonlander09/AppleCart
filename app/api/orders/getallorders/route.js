import { NextResponse } from "next/server";
import connectDB from "@/lib/dbConnect";
import Orders from "@/model/orderSchema";
import Users from "@/model/userSchema";

export async function GET(req) {
  try {
    await connectDB();

    const orders = await Orders.find().populate("userId", "userName email");
    if (!orders) {
      return NextResponse.json(
        { success: "fail", message: "Orders not found" },
        { status: 401 }
      );
    }
    
    return NextResponse.json({ status: "success", data:orders }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        status: "fail",
        message: "failed in fetching orders",
      },
      { status: 401 }
    );
  }
}
