import { isAuthenticated } from "@/app/api/middleware/isAuthenticated"; 
import { connectDB } from "@/lib/database";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  await connectDB();

  try {
    const auth = await isAuthenticated(req, ["user", "admin"]);
    if (auth.status !== 200) {
      return NextResponse.json(
        { message: auth.message },
        {
          status: auth.status,
        }
      );
    }

    const {
      products,
      deliveryInfo,
      itemsTotal,
      discountTotal,
      subtotal,
      deleveryCost,
    } = await req.json();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        // Map products normally
        ...products.map((p) => ({
          price_data: {
            currency: "usd",
            product_data: { name: p.name },
            unit_amount: Math.round(p.price * 100), // product price
          },
          quantity: p.quantity, // cart quantity
        })),
        // Add delivery cost as separate line item
        {
          price_data: {
            currency: "usd",
            product_data: { name: "Delivery Cost" },
            unit_amount: Math.round(deleveryCost * 100),
          },
          quantity: 1, // delivery cost একবারই charge হবে
        },
      ],
      mode: "payment",
      success_url: `http://localhost:3000/product/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `http://localhost:3000/user/dashboard/cancel`,
      metadata: {
        userId: auth.userId,
        deliveryInfo: JSON.stringify(deliveryInfo),
        itemsTotal,
        discountTotal,
        subtotal,
        deleveryCost,
        products: JSON.stringify(products),
      },
    });

    return NextResponse.json({ id: session.id }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Stripe checkout failed" },
      { status: 500 }
    );
  }
};
