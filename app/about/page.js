import { FaRegCheckCircle, FaShippingFast, FaStore } from "react-icons/fa";
import Footer from "../_components/Footer";

export default function Page() {
    return (<>
      <div className=" min-h-screen py-12 px-6 md:px-16">
        {/* Hero Section */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-heading">About AppleCart</h1>
          <p className="mt-4 text-lg ">
            Your one-stop store for the latest Apple products at the best prices.
          </p>
        </div>
  
        {/* Mission & Values */}
        <div className="mt-12 max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-semibold text-heading">Our Mission</h2>
          <p className="mt-2 ">
            At AppleCart, we believe in providing the best Apple devices with seamless shopping and secure payments.
          </p>
        </div>
  {/* Why Choose Us? */}
<div className="mt-12 max-w-4xl mx-auto">
  <h2 className="text-2xl font-bold text-heading text-center mb-6">Why Choose Us?</h2>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
    <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
      <FaRegCheckCircle className="text-4xl text-primary mx-auto mb-3" />
      <h3 className="text-xl font-semibold text-gray-800 dark:text-white">100% Authentic</h3>
      <p className="mt-2 text-muted">All products are 100% genuine, sourced directly from Apple.</p>
    </div>
    <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
      <FaShippingFast className="text-4xl text-primary mx-auto mb-3" />
      <h3 className="font-semibold text-lg">Fast & Secure Delivery</h3>
      <p className="mt-2 text-muted">Enjoy fast, reliable, and secure delivery at your doorstep.</p>
    </div>
    <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
      <FaStore className="text-4xl text-primary mx-auto mb-3" />
      <h3 className="font-semibold text-lg">Premium Quality</h3>
      <p className="mt-2 text-muted">We guarantee 100% high-quality Apple products at the best price.</p>
    </div>
  </div> {/* This closing div tag was missing */}
</div>
        {/* Contact Info */}
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-semibold text-heading">Get in Touch</h2>
          <p className="mt-2 ">
            Have questions? Reach out to us at <span className="font-medium ">support@applecart.com</span>
          </p>
        </div>
      </div>
        <Footer/>
        </>
    );
  }