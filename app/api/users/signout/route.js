import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = NextResponse.json({
      message: "Logged out successfully",
      status: "success",
    });

    // Remove the token cookie
    response.cookies.delete("token");

    return response;
  } catch (error) {
    return NextResponse.json(
      { status: "fail", message: "Problem in logout" },
      { status: 500 }
    );
  }
}