import { connectDB } from "@/lib/database";
import { Category } from "@/models/categoryModel";
import { NextResponse } from "next/server";

export async function GET(req) {
  await connectDB();

  try {
 
    const categories = await Category.distinct("title");

    return NextResponse.json({ success: true, categories });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}
