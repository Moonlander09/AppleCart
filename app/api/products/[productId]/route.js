import { NextResponse } from "next/server";
import connectDB from "@/lib/dbConnect";
import Products from "@/model/productSchema";
import Specs from "@/model/specsSchema";

export async function GET(req, { params }) {
  try {
    await connectDB();
    const { productId } =await params;

    const product = await Products.findById(productId).populate("specsId");

    if (!product) {
      return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: "success", data: product },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { status: "fail", message: error.message },
      { status: 500 }
    );
  }
}
