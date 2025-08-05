import { connectDB } from "@/lib/database";
import { Product } from "@/models/productmodel";
import { NextResponse } from "next/server";

export async function GET(req) {

    await connectDB();

  try {
    const products = await Product.find({});

    if (!products || products.length === 0) {
      return NextResponse.json(
        { message: "Products not found", success: false },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Products fetched successfully", success: true, data: products },
      { status: 200 }
    );
    
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { message: "Server error while fetching products", success: false },
      { status: 500 }
    );
  }
}
