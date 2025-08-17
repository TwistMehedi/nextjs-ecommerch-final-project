import { connectDB } from "@/lib/database";
import orderModel from "@/models/orderModel";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function GET(req) {
  await connectDB();

  try {
    const url = new URL(req.url);
    const paths = url.pathname.split("/");
    const id = paths[paths.length - 1];
    
    const session = await stripe.checkout.sessions.retrieve(id);

    if (session.payment_status === "paid") {
      const {
        userId,
        deliveryInfo,
        itemsTotal,
        discountTotal,
        subtotal,
        deliveryFee,
        products,
      } = session.metadata;

      const order = await orderModel.create({
        user: userId,
        products: JSON.parse(products),
        deliveryInfo: JSON.parse(deliveryInfo),
        itemsTotal,
        discountTotal,
        subtotal,
        deliveryFee,
        paymentStatus: "On The Way",
        stripeSessionId: session.id,
      });

      return NextResponse.json({ success: true, order }, { status: 200 });

    } else {
      return NextResponse.json(
        { success: false, message: "Payment not completed" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Order save failed" }, { status: 500 });
  }
};
