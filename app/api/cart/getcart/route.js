import { NextResponse } from "next/server";
import connectDB from "@/lib/dbConnect";
import Cart from "@/model/cartSchema";
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

    const cartItems = await Cart.find({ userId });
    
    return NextResponse.json(
      { success: "success", cart: cartItems },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: "fail", message: error.message },
      { status: 500 }
    );
  }
}
