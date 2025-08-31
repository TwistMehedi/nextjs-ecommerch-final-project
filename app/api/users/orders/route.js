import { connectDB } from "@/lib/database";
import { NextResponse } from "next/server";
import { isAuthenticated } from "../../middleware/isAuthenticated";
import orderModel from "@/models/orderModel";

export async function GET(req) {
  await connectDB();

  try {

    const auth = await isAuthenticated(req, ["user", "admin"]);
    if (auth.status !== 200) {
      return NextResponse.json(
        { message: auth.message },
        { status: auth.status }
      );
    };

    const orders = await orderModel
      .find({ user: auth.userId })
      .populate("products.productId")
      .lean();


      const ordersWithProducts = orders.map(order => ({
      ...order,
      products: order.products.map(item => ({
        ...item,
        product: item.productId,  
        productId: undefined,
      })),
    }));

    return NextResponse.json(
      {
        message: "Orders fetched successfully",
        success: true,
        orders: ordersWithProducts,
      },
      { status: 200 }
    );

  } catch (error) {
    return NextResponse.json(
      { message: "Orsers fetch server problem", success: false },
      { status: 500 }
    );
  }
};
