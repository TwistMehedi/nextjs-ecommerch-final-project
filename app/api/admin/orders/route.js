import { connectDB } from "@/lib/database";
import { isAuthenticated } from "../../middleware/isAuthenticated";
import { NextResponse } from "next/server";
import orderModel from "@/models/orderModel";

export async function GET(req) {
  await connectDB();
  try {
    const auth = await isAuthenticated(req, ["admin"]);
    if (auth.status !== 200) {
      return NextResponse.json(
        { message: auth.message },
        { status: auth.status }
      );
    }

    const orders = await orderModel.find();
    // console.log(orders);
    return NextResponse.json(
      { message: "All orders founded", success: true, orders },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      {
        message: "Orders fetch server error",
        success: false,
      },
      { status: 500 }
    );
  }
}
