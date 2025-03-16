import Users from "@/model/userSchema";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

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
 
    const mailResponse = await resend.emails.send({
      from: "yourname@onresend.com", // Must be from your verified Resend domain
      to: email,
      subject: emailType === "verify" ? "Verify your email" : "Reset your Password",
      html: `<p>Click <a href='${process.env.DOMAIN}/${
        emailType === "verify" ? "verifyemail" : "forgotpassword"
      }?token=${token}'>here</a> to ${
        emailType === "verify" ? "verify your email" : "reset your password"
      } or copy this link in your browser</p><br/>${process.env.DOMAIN}/${
        emailType === "verify" ? "verifyemail" : "forgotpassword"
      }?token=${token}`,
    });

    return mailResponse;
  } catch (error) {
    throw new Error(error.message);
  }
};






