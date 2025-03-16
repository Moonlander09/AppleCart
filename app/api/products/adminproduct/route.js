import { NextResponse } from "next/server";
import connectDB from "@/lib/dbConnect";
import Products from "@/model/productSchema";
import Specs from "@/model/specsSchema";

export async function GET(req) {
  try {
    await connectDB();

    const products = await Products.find();

    if (!products) {
      return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: "success", totalResults: products.length, data: products },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { status: "fail", message: error.message },
      { status: 500 }
    );
  }
}
