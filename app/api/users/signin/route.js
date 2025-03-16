import connectDB from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import Users from "@/model/userSchema";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const userExist = await Users.findOne({ email: body.email });

    if (!userExist) {
      return NextResponse.json(
        { status: "fail", message: "user does not exist" },
        { status: 400 }
      );
    }
    const validPassword = await bcryptjs.compare(
      body.password,
      userExist.password
    );

    if (!validPassword) {
      return NextResponse.json(
        { status: "fail", message: "Invalid credentials" },
        { status: 400 }
      );
    }
    const jwtTokenData = {
      id: userExist._id,
    };
    const jwtToken = jwt.sign(jwtTokenData, process.env.TOKEN_SECRET, {
      expiresIn: "10d",
    });

    const response = NextResponse.json({
      message: "Logged in successfully",
      status: "success",
    });

    response.cookies.set("token", jwtToken, {
      httpOnly: true,
      maxAge: 10 * 24 * 60 * 60, 
    });
    return response;
  } catch (error) {
    return NextResponse.json(
      {
        status: "fail",
        message: "login process failed",
      },
      {
        status: 400,
      }
    );
  }
}
