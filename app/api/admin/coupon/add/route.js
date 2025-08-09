import { isAuthenticated } from "@/app/api/middleware/isAuthenticated";
import { connectDB } from "@/lib/database";
import { Coupon } from "@/models/couponModel";
import { NextResponse } from "next/server";

export async function POST(req) {
  await connectDB();

  const auth = await isAuthenticated(req, ["admin"]);
  if (auth.status !== 200) {
    return NextResponse.json({ message: auth.message }, { status: auth.status });
  }

  try {
    const { code, discountPercentage, minShoppingPrice, validity } = await req.json();

     if (!code || !discountPercentage || !minShoppingPrice || !validity) {
      return NextResponse.json(
        { message: "All fields are required", success: false },
        { status: 400 }
      );
    }

     const existCoupon = await Coupon.findOne({ code: code.trim() });
    if (existCoupon) {
      return NextResponse.json(
        { message: "You have already created this same coupon", success: false },
        { status: 409 }
      );
    }

     const createCoupon = await Coupon.create({
      code: code.trim(),
      discountPercentage: Number(discountPercentage),
      minShoppingPrice: Number(minShoppingPrice),
      validity: new Date(validity),
    });

    // console.log(createCoupon);
    
    return NextResponse.json(
      { message: "Coupon added successfully", success: true, createCoupon },
      { status: 201 }
    );
  } catch (error) {
    console.error("Coupon creation error:", error);
    return NextResponse.json(
      { message: "Coupon add server error", success: false },
      { status: 500 }
    );
  }
}
