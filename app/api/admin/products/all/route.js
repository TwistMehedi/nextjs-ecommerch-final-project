import { connectDB } from "@/lib/database";
import { Product } from "@/models/productmodel";
import { User } from "@/models/userModel";
import { NextResponse } from "next/server";

export async function GET(req) {
  await connectDB();

   try {
    const { searchParams } = new URL(req.url);

  const name = searchParams.get("name")?.toLowerCase();
  const price = searchParams.get("price");

  let query = {};
 
  if (name) {
    query.name = { $regex: name, $options: "i" };
  }
 
  if (price.includes("-")) {
  const [min, max] = price.split("-").map(Number);
  query.price = {
    $gte: isNaN(min) ? 0 : min,
    $lte: isNaN(max) ? Number.MAX_SAFE_INTEGER : max,
  };
} else {
  const maxPrice = parseFloat(price);
  if (!isNaN(maxPrice)) {
    query.price = { $lte: maxPrice };
  }
}


  const products = await Product.find(query).populate("user", ["name", "image"]);

  return NextResponse.json(products);
   } catch (error) {
    console.log(error)
   }
}
