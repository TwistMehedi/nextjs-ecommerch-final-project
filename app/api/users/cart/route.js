import { connectDB } from "@/lib/database";
import { Cart } from "@/models/cartModel";
import { isAuthenticated } from "../../middleware/isAuthenticated";
import { NextResponse } from "next/server";

export async function POST(req) {
  await connectDB();

  try {
    const auth = await isAuthenticated(req, ["admin"]);
    if (auth.status !== 200) {
      return NextResponse.json(
        { message: auth.message },
        { status: auth.status }
      );
    }

    const { _id, name, price, images } = await req.json();
    const userId = auth.userId;

    let image =
      Array.isArray(images) && images.length > 0
        ? {
            secure_url: images[0].secure_url,
            public_id: images[0].public_id,
          }
        : null;

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const existingItem = cart.items.find(
      (item) => item.productId.toString() === _id
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.items.push({
        productId: _id,
        name,
        price,
        image,
        quantity: 1,
      });
    }

    await cart.save();

    return NextResponse.json(
      { message: "Product added to cart", success: true },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Add to cart server problem", success: false },
      { status: 500 }
    );
  }
}
