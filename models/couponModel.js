import mongoose from "mongoose";

export const couponSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, trim: true },
    discountPercentage: { 
      type: Number, 
      required: true, 
      min: [0, "Discount cannot be less than 0%"], 
      max: [100, "Discount cannot be more than 100%"]
    },
    minShoppingPrice: { type: Number, required: true, min: [0, "Price cannot be negative"] },
    validity: { type: Date, required: true },
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  },
  { timestamps: true }
);

export const Coupon =
  mongoose.models.Coupon || mongoose.model("Coupon", couponSchema);
