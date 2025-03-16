import connectDB from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import Users from "@/model/userSchema";
import { sendEmail } from "@/utils/mailer";

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const userExist = await Users.findOne({ email: body.email });
    if (userExist) {
      return NextResponse.json({
        status: "fail",
        message: "User already exists.",
      });
    }
    const newUser = new Users({
      userName: body.userName,
      email: body.email,
      password: body.password,
    });
    newUser.generateVerificationToken();
    await newUser.save();
    
    sendEmail({
      email:body.email,
      emailType: "verify",
      userId: newUser._id,
    });

    return NextResponse.json(
      { status: "success", message: "SignUp successfully done" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({
      status: "fail",
      message: "SignUp process failed.",
    },{
        status:400
    });
  }
}
