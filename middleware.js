import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req) {
  const token = req.cookies.get("token")?.value || "";
  
  // Public and Protected Routes
  const protectedRoutes = ["/profile", "/checkout"];
  const authRoutes = ["/signin", "/signup",'/forgotpassword'];
  const adminRoutes = ["/admin"];
  
  // Decode token (if exists)
  let user = null;
  if (token) {
    try {
      // Use jose instead of jsonwebtoken for Edge compatibility
      const secret = new TextEncoder().encode(process.env.TOKEN_SECRET);
      const { payload } = await jwtVerify(token, secret);
      user = payload;
      
    } catch (error) {
      console.error("Invalid Token Error:", error.message);
    }
  }
  
  const pathname = req.nextUrl.pathname;
  
  // Check for admin routes
  if (adminRoutes.some(route => pathname.startsWith(route))) {
    // If not logged in, redirect to signin
    if (!user) {
      return NextResponse.redirect(new URL("/signin", req.url));
    }
    // If logged in but not admin, redirect to home
    if (!user.isAdmin) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }
  
  // If user is not logged in, restrict protected routes
  if (!user && protectedRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }
  
  // If user is logged in, restrict access to authentication routes
  if (user && authRoutes.some(route => pathname === route)) {
    return NextResponse.redirect(new URL("/", req.url));
  }
  
  return NextResponse.next();
}

// Apply middleware to these routes
export const config = {
  matcher: ["/admin", "/profile", "/checkout", "/signin", "/signup",'/forgotpassword'],
};