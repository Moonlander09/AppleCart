import { NextResponse } from "next/server";
import connectDB from "@/lib/dbConnect";
import Orders from "@/model/orderSchema";
import { getUser } from "@/helper/getUser";

export async function GET(req) {
  try {
    await connectDB();

    const userId = getUser(req);
    if (!userId) {
      return NextResponse.json(
        { success: "fail", message: "User not authenticated" },
        { status: 401 }
      );
    }
    
    const order = await Orders.find({ userId });
    
    return NextResponse.json({ status: "success", order }, { status: 200 });
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
