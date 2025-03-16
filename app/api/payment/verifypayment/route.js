import { NextResponse } from "next/server";
import crypto from "crypto";
import Cart from "@/model/cartSchema";
import { getUser } from "@/helper/getUser";
import connectDB from "@/lib/dbConnect";
import Orders from "@/model/orderSchema";

export async function POST(req) {
  try {
    await connectDB();

    const userId = getUser(req);
    if (!userId) {
      return NextResponse.json(
        { success: "fail", message: "User not authenticated" },
        { status: 401 }
      );
    }

    // ✅ Step 1: Get Razorpay Payment Data from frontend
    const body = await req.json();
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      quantity,
      products,
    } = body;

    

    // ✅ Step 2: Verify Payment Signature (MOST IMPORTANT!!)
    const key_secret = process.env.RAZORPAY_SECRET_KEY;

    // ✅ Generate the signature using HMAC SHA256
    const expectedSignature = crypto
      .createHmac("sha256", key_secret)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    
    // ✅ Compare the generated signature with the Razorpay signature
    if (expectedSignature !== razorpay_signature) {
      return NextResponse.json(
        { success: "fail", message: "Payment verification failed" },
        { status: 400 }
      );
    }

    // ✅ Step 3: Payment is VERIFIED NOW!! 🎉
    // ✅ Create an Order in Database
    const newOrder = await Orders.create({
      userId: userId,
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
      amount: body.amount,
      products,
      quantity,
    });

    // ✅ Step 4: Clear the Cart after successful Payment
    await Cart.deleteMany({ userId });

    // ✅ Step 5: Return Success Response
    return NextResponse.json({
      status: "success",
      message: "Payment Successful!",
      order: newOrder,
    });
  } catch (error) {
    console.error("Payment Verification Error:", error);
    return NextResponse.json(
      { success: "fail", message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
