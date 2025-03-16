import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: [Object],
    orderId: {
      type: String,
      required: true,
    },
    paymentId: {
      type: String,
      default: null, // Will only be filled when payment is successful
    },
    amount: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "delivered"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Orders = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default Orders;
