import Users from "@/model/userSchema";
import nodemailer from "nodemailer";

export const sendEmail = async ({ email, emailType, userId }) => {
  try {
    const user = await Users.findById(userId);
    if (!user) throw new Error("User not found");

    let token;
    if (emailType === "verify") {
      token = user.verifiedToken;
    } else if (emailType === "reset") {
      token = user.resetPasswordToken;
    }
    const transport = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: "enifenox@gmail.com",
      to: email,
      subject:
        emailType === "verify" ? "Verify your email" : "Reset your Password",
      text: "Hello world?",
      html: `<p>Click <a href='${process.env.NEXT_PUBLIC_DOMAIN}/verifyemail?token=${token}'>here</a> to ${
        emailType === "verify" ? "verify your email" : "reset your password"
      } or copy this link in your browser</p><br/>${process.env.NEXT_PUBLIC_DOMAIN}/${
        emailType === "verify" ? "verifyemail" : "forgotpassword"
      }?token=${token}`,
    };

    const mailResponse = await transport.sendMail(mailOptions);

    return mailResponse;
  } catch (error) {
    throw new Error(error.message);
  }
};