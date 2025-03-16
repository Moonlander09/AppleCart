import connectDB from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import Products from "@/model/productSchema";
import APIFeatures from "@/lib/APIFeatures";

export async function GET(req) {
  try {
    await connectDB();
    // Extract pagination parameters from URL
    const page = parseInt(req.nextUrl.searchParams.get('page')) || 1;
    const limit = parseInt(req.nextUrl.searchParams.get('limit')) || 9;
    
    // Get category filter if present
    const category = req.nextUrl.searchParams.get('category');
    
    // Create query based on category filter
    const filterQuery = category ? { category } : {};
    
    // Count total matching documents before pagination
    const totalDocs = await Products.countDocuments(filterQuery);
    
    // Calculate total pages
    const totalPages = Math.ceil(totalDocs / limit);

    const features = new APIFeatures(Products.find(), req.nextUrl.searchParams)
      .filter()
      .paginate();

    const products = await features.query;

    if (!products.length) {
      return NextResponse.json(
        { success: false, message: "No products found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { 
        status: "success", 
        data: products,
        pagination: {
          totalProducts: totalDocs,
          currentPage: page,
          totalPages: totalPages,
          limit: limit,
  
        }
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: "fail", message: error.message },
      { status: 500 }
    );
  }
}
