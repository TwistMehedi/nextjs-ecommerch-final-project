import { isAuthenticated } from "@/app/api/middleware/isAuthenticated";
import { connectDB } from "@/lib/database";
import { Product } from "@/models/productmodel";
import { User } from "@/models/userModel";
import { NextResponse } from "next/server";

export async function GET(req) {
  await connectDB();
  
  const auth = await isAuthenticated(req, ["admin"]);
 if (auth.status !== 200) {
    return NextResponse.json({ message: auth.message }, { status: auth.status });
  };

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

  if(products.length < 0){
    return NextResponse.json({
      message: "Products not found",
      success: false,
      products:[]
    })
  ,{status:404}};


  return NextResponse.json(products);
   } catch (error) {
    console.log(error)
    return NextResponse.json({message:"Admin all products server error", success: false},{status:500})
   }
}
