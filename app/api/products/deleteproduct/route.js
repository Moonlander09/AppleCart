import { NextResponse } from "next/server";
import connectDB from "@/lib/dbConnect";
import Products from "@/model/productSchema";
import Specs from "@/model/specsSchema";

export async function DELETE(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const productId = searchParams.get("productId");

    const product = await Products.findById(productId);
    if (!product) {
      return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 }
      );
    }
    if (product.specsId) {
      await Specs.findByIdAndDelete(product.specsId);
    }

    // ✅ Delete the product
    await Products.findByIdAndDelete(productId);

    const products = await Products.find();
    return NextResponse.json(
      {
        success: "success",
        data: products,
        message: "Product deleted successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
