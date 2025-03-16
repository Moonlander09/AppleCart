import { NextResponse } from "next/server";
import connectDB from "@/lib/dbConnect";
import Cart from "@/model/cartSchema";
import { getUser } from "@/helper/getUser";
import razorpay from "@/lib/razorpayInstance";
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

    // Fetch user's cart items
    const cartItems = await Cart.find({ userId }).populate("userId");

    if (cartItems.length === 0) {
      return NextResponse.json(
        { success: "fail", message: "Cart is empty" },
        { status: 400 }
      );
    }

    const userName = cartItems[0].userId.userName;
    const email = cartItems[0].userId.email;

    // Calculate total amount
    const totalAmount = cartItems.reduce(
      (sum, item) => sum + item.totalPrice,
      0
    );

    const totalQuantity = cartItems.reduce(
      (sum, item) => sum + item.quantity,
      0
    );


    const productInfo = cartItems.map((el) => ({
      productName: el.name,
      productPrice: el.price,
      productQuantity: el.quantity,
      productColor: el.color,
      productImage: el.image,
    }));

    

    // Create Razorpay order
    const order = await razorpay.orders.create({
      amount: totalAmount * 100, // Razorpay works in paise, so multiply by 100
      currency: "INR",
      receipt: `order_${userId.slice(0, 6)}_${Date.now()}`,
      payment_capture: 1,
    });

    return NextResponse.json({
      status: "success",
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      totalQuantity,
      userName,
      email,
      productInfo,
    });
  } catch (error) {
    return NextResponse.json(
      { success: "fail", message: error.message },
      { status: 500 }
    );
  }
}
