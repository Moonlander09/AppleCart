import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required for this field"],
    unique: true,
  },
  category: {
    type: String,
    enum: ["iPhone", "iPad", "Mac", "Watch"],
    required: [
      true,
      "Choose one between these categories: iPhone, iPad, Mac, Watch",
    ],
  },
  price: { type: Number, required: [true, "Price is required for this field"] },
  description: { type: String, required: [true, "Description is required"] },
  image: { type: String, required: [true, "Image is required"] },
  color: { type: String, required: [true, "Color is required"] },
  stock: { type: Boolean, default: true },

  specsId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Specs",
    required: true,
  },
});

const Products =
  mongoose.models.Products || mongoose.model("Products", productSchema);
export default Products;
