import mongoose from "mongoose";

const productsSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true },
   images: [
  {
    secure_url: String,
    public_id: String,
  }
],
  
    price: { type: Number, min: 250, max: 2500, required: true },
   description: { type: String, required: true },
    discount: { type: Number, required: true },
    isPublish: { type: Boolean, default: false },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

export const Product =
  mongoose.models.Product || mongoose.model("Product", productsSchema);
