import { NextResponse } from "next/server";
import Cart from "@/model/cartSchema";
import connectDB from "@/lib/dbConnect";
import Products from "@/model/productSchema";

import { getUser } from "@/helper/getUser";

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

    // Get productId from request body
    const { productId } = await req.json();
    const quantityToAdd = 1; // Always add 1 per click

    // Validate product exists
    const product = await Products.findById(productId);
   
    if (!product) {
      return NextResponse.json(
        { success: "fail", message: "Product not found" },
        { status: 404 }
      );
    }

    // Check if product already exists in cart
    const existingCartItem = await Cart.findOne({ userId, productId });

    if (existingCartItem) {
      // Prevent quantity from exceeding 5
      if (existingCartItem.quantity >= 5) {
        return NextResponse.json(
          { success: "fail", message: "Max 5 items allowed in cart" },
          { status: 400 }
        );
      }

      // Increase quantity by 1
      existingCartItem.quantity += quantityToAdd;
      existingCartItem.totalPrice =
        existingCartItem.price * existingCartItem.quantity;
      await existingCartItem.save();
    } else {
      // Create a new cart entry with quantity 1
      await Cart.create({
        userId,
        productId,
        name: product.name,
        image: product.image,
        price: product.price,
        color: product.color,
        quantity: quantityToAdd,
        totalPrice: product.price * quantityToAdd,
      });
    }

    return NextResponse.json(
      { status: "success", message: "Cart updated successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: "fail", message: error.message },
      { status: 500 }
    );
  }
}
