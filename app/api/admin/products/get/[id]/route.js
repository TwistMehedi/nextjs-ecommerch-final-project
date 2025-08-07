import { connectDB } from "@/lib/database";
import { Product } from "@/models/productmodel";
import { NextResponse } from "next/server";

export async function GET(req, {params }){
    await connectDB();

    
    const id = params.id;

    

  if (!id) {
    return NextResponse.json({ message: "Missing ID" }, { status: 400 });
  }

    try {
        const product = await Product.findById(id);

        if(!product){
          return NextResponse.json({message:"Product not found", success: false},{status:404})
        };

        return NextResponse.json({message:"Product found successfull", success: true, product},{status:200})
    } catch (error) {
        return NextResponse.json({message:"Admin single product server error", success: false},{status:500})
    }
}