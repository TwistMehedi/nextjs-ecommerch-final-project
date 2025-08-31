import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        name: String,
        price: Number,
        quantity: Number,
        discount: Number,
        total: Number,  
      },
    ],
    status:{type: String, enum:["Pending", "On The Way", "Delivered", "Cancelled"], default: "Pending"},
    deliveryInfo: {
      fullName: { type: String, required: true },
      phone: { type: String, required: true },
      district: { type: String, required: true },
      thana: { type: String, required: true },
      address: { type: String, required: true },
    },
    itemsTotal: { type: Number, required: true },
    deliveryFee: { type: Number, default: 0 },
    discountTotal: { type: Number, default: 0 },
    subtotal: { type: Number, required: true },
    paymentStatus: { type: String, enum:["Pending", "Paid"], default: "Pending" },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.models.Order || mongoose.model("Order", orderSchema);
