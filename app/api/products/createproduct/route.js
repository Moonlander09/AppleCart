import { NextResponse, NextRequest } from "next/server";
import connectDB from "@/lib/dbConnect";
import Products from "@/model/productSchema";
import Specs from "@/model/specsSchema";

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();

    const product = await Products.findOne({ name: body.name });

    if (product) {
      return NextResponse.json(
        { success: "fail", message: "product is already in db" },
        { status: 400 }
      );
    }
    const newSpecs = await Specs.create(body.specs);

    await Products.create({
      name: body.name,
      category: body.category,
      price: body.price,
      description: body.description,
      image: body.image,
      stock: body.stock,
      color:body.color,
      specsId: newSpecs._id,
    });

    return NextResponse.json(
      { status: "success", message: "product created successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: "fail", message: error.message },
      { status: 500 }
    );
  }
}
