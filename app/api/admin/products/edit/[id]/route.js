import { connectDB } from "@/lib/database";
import { Product } from "@/models/productmodel";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
  await connectDB();

  const id = params?.id;
// console.log(id)
  try {
    const body = await req.json();
    const { name, mrp, price } = body;
    
    const product = await Product.findById(id);
    // console.log(product);

    if (!product) {
      return NextResponse.json(
        { message: "Product not found", success: false },
        { status: 404 }
      );
    }

    if (name) product.name = name;
    if (mrp) product.mrp = mrp;
    if (price) product.price = price;
    // if (description) product.descrption = description;

    const res = await product.save();
console.log(res);

    return NextResponse.json(
      { message: "Product updated successfully", success: true, product },
      { status: 200 }
    );
  } catch (error) {
     return NextResponse.json(
      { message: "Product edit server error", success: false },
      { status: 500 }
    );
  }
}
