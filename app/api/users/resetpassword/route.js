import { NextResponse } from "next/server";
import Users from "@/model/userSchema";
import connectDB from "@/lib/dbConnect";

export async function POST(req) {
  try {
    await connectDB();
    const { password } = await req.json();

    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");

    if (!token) {
      return NextResponse.json(
        { status: "fail", message: "Token is required" },
        { status: 400 }
      );
    }

    const user = await Users.findOne({
      resetPasswordToken: token,
      resetPasswordExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json(
        { status: "fail", message: "Invalid or expired token" },
        { status: 400 }
      );
    }

    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiry = undefined;
    

    await user.save();

    return NextResponse.json(
      { status: "success", message: "Password reset successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { status: "fail", message: error.message },
      { status: 500 }
    );
  }
}
