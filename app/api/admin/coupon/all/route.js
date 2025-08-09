
import { isAuthenticated } from "@/app/api/middleware/isAuthenticated";
import { connectDB } from "@/lib/database";
import { Coupon } from "@/models/couponModel";
import { NextResponse } from "next/server";

export async function GET(req) {
  await connectDB();

  const auth = await isAuthenticated(req, ["admin"]);
  if (auth.status !== 200) {
    return NextResponse.json({ message: auth.message }, { status: auth.status });
  }

  try {
    const coupons = await Coupon.find().sort({ createdAt: -1 });
    // console.log(coupons);

    return NextResponse.json({ success: true,data: coupons }, { status: 200 });
  } catch (error) {
    console.error("Error fetching coupons:", error);
    return NextResponse.json(
      { message: "Error fetching coupons", success: false },
      { status: 500 }
    );
  }
}
