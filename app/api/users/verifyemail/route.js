import { NextResponse, NextRequest } from "next/server";
import Users from "@/model/userSchema";
import connectDB from "@/lib/dbConnect";

export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");


    
    if (!token) {
      return NextResponse.json(
        { status: "fail", message: "Token is required" },
        { status: 400 }
      );
    }

    const user = await Users.findOne({
      verifiedToken: token,
      verifiedTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json(
        { status: "fail", message: "Invalid or expired token" },
        { status: 400 }
      );
    }
    user.isVerified = true;
    user.verifiedToken = undefined;
    user.verifiedTokenExpiry = undefined;

    await user.save();

    return NextResponse.json(
      { status: "success", message: "Email verified successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { status: "fail", message: error.message },
      { status: 500 }
    );
  }
}
