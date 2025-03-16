"use client";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { createProductsHandler } from "@/lib/axiosHandler";

export default function CreateProduct() {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
    image: "",
    color: "",
    stock: true,
    specs: {
      modelName: "",
      weight: "",
      size: "",
      chip: "",
      internal: "",
      battery: "",
      camera: "",
      os: "",
      bluetooth: "",
      sim: "",
      dimensions: "",
      warranty: "",
    },
  });


  const [imageFile, setImageFile] = useState(null); // Store selected image file

  // Handle changes for product details
  function handleChange(e) {
    const { name, value, type, checked } = e.target;

    if (name === "image") {
      // Handle image file selection
      const file = e.target.files[0];
      
      setImageFile(file);
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  }


  // Handle changes for specs
  function handleSpecsChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      specs: { ...prev.specs, [name]: value },
    }));
  }

  // Handle form submit
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      let imageUrl = "";

      // Upload image to Cloudinary if a file is selected
      if (imageFile) {
        const imageData = new FormData();
        imageData.append("file", imageFile);
        imageData.append("upload_preset", "your_upload_preset"); // Set this in Cloudinary

        

        const uploadRes = await axios.post(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
          imageData
        );
      

        imageUrl = uploadRes.data.secure_url;

       
      }

      // Send product data with image URL
      await createProductsHandler({ ...formData, image: imageUrl });

      toast.success("Product Created Successfully!");
      setFormData({
        name: "",
        category: "Mac",
        price: "",
        description: "",
        image: "",
        color: "",
        stock: true,
        specs: {
          modelName: "",
          weight: "",
          size: "",
          chip: "",
          internal: "",
          battery: "",
          camera: "",
          os: "",
          bluetooth: "",
          sim: "",
          dimensions: "",
          warranty: "",
        },
      });
      setImageFile(null); // Reset image selection
    } catch (error) {
      toast.error("Failed to create product");
    }
  }

  return (
    <div className="">
      <h2 className="text-xl font-bold mb-4">Create a New Product</h2>
      <form onSubmit={handleSubmit} className="grid gap-4">
        {/* Product Fields */}
        <input type="text" name="name" placeholder="Product Name" value={formData.name} onChange={handleChange} required className="border w-80 sm:w-full p-2 rounded-md" />
        <select name="category" value={formData.category} onChange={handleChange} className="border p-2 w-80 sm:w-full rounded-md">
          <option value="iPhone">iPhone</option>
          <option value="iPad">iPad</option>
          <option value="Mac">Mac</option>
          <option value="Watch">Watch</option>
        </select>
        <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange}  min="0"
  max="25000" required className="border p-2 rounded-md w-80 sm:w-full" />
        <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required className="border p-2 rounded-md w-80 sm:w-full" />
        <input type="file" name="image" accept="image/*" onChange={handleChange} required className="border p-2 rounded-md w-80 sm:w-full" />
        <input type="text" name="color" placeholder="Color" value={formData.color} onChange={handleChange} required className="border p-2 rounded-md w-80 sm:w-full" />
        <label className="flex items-center">
          <input type="checkbox" name="stock" checked={formData.stock} onChange={handleChange} className="mr-2 " />
          In Stock
        </label>

        {/* Product Specs Section */}
        <h3 className="text-lg font-semibold mt-4">Product Specifications</h3>
        <input type="text" name="modelName" placeholder="Model Name" value={formData.specs.modelName} onChange={handleSpecsChange} required className="border p-2 rounded-md w-80 sm:w-full" />
        <input type="text" name="weight" placeholder="Weight" value={formData.specs.weight} onChange={handleSpecsChange} required className="border p-2 rounded-md w-80 sm:w-full" />
        <input type="text" name="size" placeholder="Size" value={formData.specs.size} onChange={handleSpecsChange} required className="border p-2 rounded-md w-80 sm:w-full" />
        <input type="text" name="chip" placeholder="Chip" value={formData.specs.chip} onChange={handleSpecsChange} required className="border p-2 rounded-md w-80 sm:w-full" />
        <input type="text" name="internal" placeholder="Internal Storage & RAM" value={formData.specs.internal} onChange={handleSpecsChange} required className="border p-2 rounded-md w-80 sm:w-full" />
        <input type="text" name="battery" placeholder="Battery" value={formData.specs.battery} onChange={handleSpecsChange} required className="border p-2 rounded-md w-80 sm:w-full" />
        <input type="text" name="camera" placeholder="Camera" value={formData.specs.camera} onChange={handleSpecsChange} required className="border p-2 rounded-md w-80 sm:w-full" />
        <input type="text" name="os" placeholder="Operating System" value={formData.specs.os} onChange={handleSpecsChange} required className="border p-2 rounded-md w-80 sm:w-full" />
        <input type="number" name="bluetooth" placeholder="Bluetooth Version" value={formData.specs.bluetooth} onChange={handleSpecsChange} required className="border p-2 rounded-md w-80 sm:w-full" />
        <input type="text" name="sim" placeholder="SIM Support" value={formData.specs.sim} onChange={handleSpecsChange} required className="border p-2 rounded-md w-80 sm:w-full" />
        <input type="text" name="dimensions" placeholder="Dimensions" value={formData.specs.dimensions} onChange={handleSpecsChange} required className="border p-2 rounded-md w-80 sm:w-full" />
        <input type="text" name="warranty" placeholder="Warranty" value={formData.specs.warranty} onChange={handleSpecsChange} required className="border p-2 rounded-md w-80 sm:w-full" />

        <button type="submit" className="bg-blue-600 text-white p-2 rounded-md w-80 sm:w-full">Create Product</button>
      </form>
    </div>
  );
}