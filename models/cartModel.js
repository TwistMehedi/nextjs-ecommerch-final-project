import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      name: String,
      price: Number,
      image: String,
      quantity: { type: Number, default: 1 },
    },
  ],
}, { timestamps: true });

export const Cart = mongoose.models.Cart || mongoose.model("Cart", cartSchema);
