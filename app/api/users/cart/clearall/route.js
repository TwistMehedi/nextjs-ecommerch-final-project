import { isAuthenticated } from "@/app/api/middleware/isAuthenticated";
import { connectDB } from "@/lib/database";
import { Cart } from "@/models/cartModel";
import { NextResponse } from "next/server";

export async function DELETE(req) {
  await connectDB();

  try {
    const auth = await isAuthenticated(req, ["user", "admin"]);
    if (auth.status !== 200) {
      return NextResponse.json({ message: auth.message }, { status: 401 });
    }

    const { cartId } = await req.json();

    const cart = await Cart.findOne({ _id: cartId, userId: auth.userId });

    if (!cart) {
      return NextResponse.json({ message: "Cart not found" }, { status: 404 });
    }

    await cart.deleteOne();

    return NextResponse.json(
      { message: "Cart deleted", success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Clear cart server error", success: false },
      { status: 500 }
    );
  }
};
