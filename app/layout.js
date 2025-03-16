import "./globals.css";
import Navbar from "./_components/Navbar";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/helper/authContext";

import { Josefin_Sans } from "next/font/google";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "AppleCart – Your One-Stop Shop for Apple Products",
  description: "AppleCart is your ultimate destination for premium Apple products, offering a seamless shopping experience for iPhones, iPads, MacBooks, Apple Watches. Whether you’re looking for the latest Apple devices or trusted classics, we provide a curated selection with detailed specifications, secure checkout, and fast delivery. Shop with confidence and elevate your tech experience with AppleCart – where innovation meets convenience.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${josefin.className} antialiased transition ease-in bg-background text-primary`}
      >
        <main>
          <AuthProvider>
            <Navbar />
            {children}
          </AuthProvider>
        </main>
        <Toaster />
      </body>
    </html>
  );
}