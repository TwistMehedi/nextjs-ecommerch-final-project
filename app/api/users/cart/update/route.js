import { NextResponse } from "next/server";
import { isAuthenticated } from "@/app/api/middleware/isAuthenticated";
import { connectDB } from "@/lib/database";
import { Cart } from "@/models/cartModel";
 
export async function PUT(req) {

  await connectDB();

  try {
    const auth = await isAuthenticated(req, ["user", "admin"]);
    if (auth.status !== 200) {
      return NextResponse.json(
        { message: auth.message },
        { status: auth.status }
      );
    };

    const { itemId, quantity, price, total } = await req.json();
    

    if (!itemId || quantity == null || price == null || total == null) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    };

    const updatedCart = await Cart.findOneAndUpdate(
      { userId: auth.userId, "items._id": {_id: itemId} },
      {
        $set: {
          "items.$.quantity": quantity,
          "items.$.price": price,
          "items.$.total": total,
        },
      },
      { new: true }
    );

    if (!updatedCart) {
      return NextResponse.json(
        { message: "Cart item not found" },
        { status: 404 }
      );
    };

    // console.log(updatedCart)

    return NextResponse.json(
      {
        message: "Cart updated successfully",
        cart: updatedCart,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating quantity:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
};
