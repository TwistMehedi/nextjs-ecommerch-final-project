import mongoose from "mongoose";

export const couponSchema = new mongoose.Schema({
    code:{type:String, required: true},
    product:{type: mongoose.Schema.Types.ObjectId, ref: "Product"}
},{timestamps: true});

export const Coupon = mongoose.models.Coupon || mongoose.model("Coupon", couponSchema)