import { NextResponse } from "next/server";
import connectDB from "@/lib/dbConnect";
import Cart from "@/model/cartSchema";
import { getUser } from "@/helper/getUser";

export async function PATCH(req) {
  try {
    await connectDB();
    const userId = getUser(req);

    if (!userId) {
      return NextResponse.json(
        { success: "fail", message: "User not authenticated" },
        { status: 401 }
      );
    }

    const { productId, action } = await req.json();

    if (!productId || !action) {
      return NextResponse.json(
        { success: "fail", message: "Product ID and action are required" },
        { status: 400 }
      );
    }

    const cartItem = await Cart.findOne({ userId, productId });
  
   

    if (!cartItem) {
      return NextResponse.json(
        { success: "fail", message: "Product not found in cart" },
        { status: 404 }
      );
    }

    if (action === "increase") {
      if (cartItem.quantity < 5) {
        cartItem.quantity += 1;
        cartItem.totalPrice = cartItem.price * cartItem.quantity;
        await cartItem.save();
      } else {
        return NextResponse.json(
          { success: "fail", message: "Maximum quantity reached for this product" },
          { status: 201 }
        );
      }
    } else if (action === "decrease") {
      if (cartItem.quantity > 1) {
        cartItem.quantity -= 1;
        cartItem.totalPrice = cartItem.price * cartItem.quantity;
        await cartItem.save();
      } else {
        await Cart.deleteOne({ _id: cartItem._id });
      }
    } else {
      return NextResponse.json(
        { success: "fail", message: "Invalid action" },
        { status: 400 }
      );
    }

    const updatedCart = await Cart.find({ userId });

    return NextResponse.json(
      { success: "success", message: "Cart updated successfully" ,updatedCart},
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: "fail", message: error.message },
      { status: 500 }
    );
  }
}
