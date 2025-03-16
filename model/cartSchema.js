import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Products",
    required: true,
  },
  name: String,
  image: String,
  price: Number,
  quantity: { type: Number, default: 1 },
  totalPrice: Number,
  color: String,
});

const Cart = mongoose.models.Cart || mongoose.model("Cart", cartSchema);
export default Cart;
