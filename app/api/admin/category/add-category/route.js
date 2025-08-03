import { connectDB } from "@/lib/database";
import { Category } from "@/models/categoryModel.js";
import { NextResponse } from "next/server";

export async function POST(req) {
    await connectDB();

  const body = await req.json();

  const { title, slug } = body;

  if (!title || !slug) {
    return NextResponse.json(
      { message: "All fields are required", success: false },
      { status: 400 }
    );
  };

  try {
    const createCategory = await Category.create({ title, slug });

    return NextResponse.json(
      {
        message: "Category created successfully",
        success: true,
        category: createCategory,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Category server error", success: false, error: error.message },
      { status: 500 }
    );
  }
};
