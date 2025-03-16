import connectDB from "@/lib/dbConnect";
import Users from "@/model/userSchema";
import { sendEmail } from "@/utils/mailer";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
  
    await connectDB();
    const { email } = await req.json();
    const user = await Users.findOne({ email });

    if (!user) {
      return NextResponse.json(
        {
          status: "fail",
          message: "User doesn't exists",
        },
        {
          status: 400,
        }
      );
    }
    user.generateResetToken();

    await user.save();
    sendEmail({
      email,
      emailType: "reset",
      userId: user._id,
    });
    return NextResponse.json(
      { status: "success", message: "Link send successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        status: "fail",
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}
