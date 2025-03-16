import Link from "next/link";

export default function Footer() {
    return (
      <footer className="py-6 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] ">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center text-center md:text-left px-4">
          
          {/* Branding */}
          <div className="text-lg font-semibold">AppleCart</div>
          {/* Contact Info */}
          <div className="text-sm mt-4 md:mt-0">
            &copy; {new Date().getFullYear()} AppleCart. All rights reserved.
          </div>
        </div>
      </footer>
    );
  }