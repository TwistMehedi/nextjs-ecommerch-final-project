import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
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
        total: Number,
        image: {
          secure_url: String,
          public_id: String,
        },
        quantity: { type: Number, default: 1 },
      },
    ],
     finalPrice:{type: Number, default:0},
     discountAmount:{type: Number, default:0}
  },
  { timestamps: true }
);

export const Cart = mongoose.models.Cart || mongoose.model("Cart", cartSchema);
