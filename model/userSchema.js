import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
import crypto from "crypto";

const userSchema = new mongoose.Schema({
  userName: { type: String, required: [true, "Username is required"] },
  email: { type: String, required: [true, "Email is required"], unique: true },
  password: { type: String, required: [true, "Password is required"] },

  isAdmin: { type: Boolean, default: false },
  isVerified: { type: Boolean, default: false },

  verifiedToken: { type: String, default: null },
  verifiedTokenExpiry: { type: Date, default: null },

  resetPasswordToken: { type: String, default: null },
  resetPasswordExpiry: { type: Date, default: null },
});

userSchema.pre("save", async function (next) {
  console.log("Modified paths:", this.modifiedPaths());
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcryptjs.hash(this.password, 12);
  next();
});

userSchema.methods.generateVerificationToken = function () {
  const token = crypto.randomBytes(32).toString("hex");
  this.verifiedToken = token;
  this.verifiedTokenExpiry = Date.now() + 3600000; // 1 hour expiry
  return token;
};
userSchema.methods.generateResetToken = function () {
    const token = crypto.randomBytes(32).toString("hex");
    this.resetPasswordToken = token;
    this.resetPasswordExpiry = Date.now() + 3600000; // 1 hour expiry
    return token;
  };
const Users = mongoose.models.User || mongoose.model("User", userSchema);

export default Users;
