import { connectDB } from "@/lib/database";
import { Product } from "@/models/productmodel";
import { NextResponse } from "next/server";

 
export async function GET(req, { params }) {
  await connectDB();

  try {
    const { id } = params;
    console.log(id);
    if (!id) {
      return NextResponse.json(
        { message: "Product ID is required", success: false },
        { status: 400 }
      );
    }

    const product = await Product.findById(id);

    if (!product) {
      return NextResponse.json(
        { message: "Product not found", success: false },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Product fetch successful", success: true, product },
      { status: 200 }
    );
  } catch (error) {
    console.error("Product fetch error:", error);
    return NextResponse.json(
      { message: "Product get server problem", success: false },
      { status: 500 }
    );
  }
};
