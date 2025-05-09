import { NextResponse } from "next/server";
import connectDB from "@/lib/dbConnect";
import Cart from "@/model/cartSchema";
import { getUser } from "@/helper/getUser";
import Users from "@/model/userSchema";

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

    // Fetch the user's cart
    const cartItems = await Cart.find({ userId }).populate({
      path: "userId",
      select: "userName email",
    });

   

    if (cartItems.length === 0) {
      return NextResponse.json(
        { success: "fail", message: "Cart is empty" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: "success",
        cart: cartItems,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: "fail", message: error.message },
      { status: 500 }
    );
  }
}
