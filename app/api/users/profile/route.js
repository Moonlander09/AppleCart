import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import Users from "@/model/userSchema";
import connectDB from "@/lib/dbConnect";

export async function GET(req) {
  try {
    await connectDB(); // Connect to MongoDB

    // Get token from cookies
    const token = req.cookies.get("token")?.value;

    

    if (!token) {
      return NextResponse.json(
        { status: "fail", message: "Unauthorized" },
        { status: 401 }
      );
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);

    // Fetch user from database (excluding password)
    const user = await Users.findById(decoded.id).select("-password");

    if (!user) {
      return NextResponse.json(
        { status: "fail", message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      status: "success",
      user, // Sends full user document (without password)
    });
  } catch (error) {
    return NextResponse.json(
      { status: "fail", message: "Invalid or expired token" },
      { status: 401 }
    );
  }
}
