import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export function getUser(req) {
  // Get token from cookies
  const token = req.cookies.get("token")?.value;
  if (!token) {
    return null;
  }
  // Decode token to get userId
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    return decoded.id; // Return userId
  } catch (error) {
    return null;
  }
}
