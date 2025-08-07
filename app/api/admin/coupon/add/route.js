import { isAuthenticated } from "@/app/api/middleware/isAuthenticated";
import { connectDB } from "@/lib/database";
import { Coupon } from "@/models/couponModel";
import { NextResponse } from "next/server";

export async function POST(req) {

    await connectDB();
    
 const auth = await isAuthenticated(req, ["admin"]);
  if (auth.status !== 200) {
     return NextResponse.json({ message: auth.message }, { status: auth.status });
   };

  try {
    const { code } = await req.json();

    if (!code) {
      return NextResponse.json(
        { message: "Code is required", success: false },
        { status: 404 }
      );
    }

    const existCoupon = await Coupon.findOne({code});
    if(existCoupon){
         return NextResponse.json(
        { message: "You have already create this same coupon", success: false },
        { status: 401 }
      );
    };

    const createCoupon = await Coupon.create({ code });

    if (!createCoupon) {
      return NextResponse.json(
        { message: "Coupon create problem", success: false },
        { status: 404 }
      );
    };

    // console.log(createCoupon)
    return NextResponse.json(
      { message: "Coupon added successfully", success: true, createCoupon },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Coupon add server error",
        success: false,
      },
      { status: 500 }
    );
  }
}
