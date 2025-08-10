import { connectDB } from "@/lib/database";
import { Product } from "@/models/productmodel";
import { NextResponse } from "next/server";

export async function GET(req) {
  await connectDB();

  try {
    const { searchParams } = new URL(req.url);

    const category = searchParams.get("category");
    const priceMin = searchParams.get("priceMin");
    const priceMax = searchParams.get("priceMax");
    const search = searchParams.get("name");

    // Pagination params
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = 10; // per page

    const filter = {};

    if (category && category !== "all") {
      filter.category = category;
    }

    if (priceMin || priceMax) {
      filter.price = {};
      if (priceMin) filter.price.$gte = Number(priceMin);
      if (priceMax) filter.price.$lte = Number(priceMax);
    }

    if (search && search.trim() !== "") {
      filter.$or = [
        { name: { $regex: search.trim(), $options: "i" } },
        { descrption: { $regex: search.trim(), $options: "i" } },
      ];
    }

    const totalProducts = await Product.countDocuments(filter);

    const products = await Product.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    return NextResponse.json({
      success: true,
      products,
      totalProducts,
      totalPages: Math.ceil(totalProducts / limit),
      currentPage: page,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { message: "Products fetch server problem", success: false },
      { status: 500 }
    );
  }
}
