import { isAuthenticated } from "@/app/api/middleware/isAuthenticated";
import { connectDB } from "@/lib/database";
import { Cart } from "@/models/cartModel";
import { NextResponse } from "next/server";

export async function GET(req) {
  await connectDB();
  try {

   const auth = await isAuthenticated(req, ["user","admin"]);
    if (auth.status !== 200) {
      return NextResponse.json(
        { message: auth.message },
        { status: auth.status }
      );
    };

    const userId = auth.userId;

    const cartsItems = await Cart.find({userId});
    return NextResponse.json(
      { message: "Cart items fetched", success: true, cartsItems },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse(
      { message: "Failed to fetch cart items", success: false },
      { status: 500 }
    );
  }
}
