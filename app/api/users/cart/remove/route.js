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
    };

    const userId = auth.userId;


    const { itemId } = await req.json();
    console.log("Removing item:", itemId);

    //   await Cart.deleteOne({itemId, })
      await Cart.findOneAndUpdate(
      { userId },
      { $pull: { items: { _id: itemId } } },
      { new: true }
    );

    return NextResponse.json({ message: "Item removed", success: true }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Cart remove server error", success: false }, { status: 500 });
  }
}
