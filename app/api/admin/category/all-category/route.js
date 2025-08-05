  import { connectDB } from "@/lib/database";
import { Category } from "@/models/categoryModel";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);

    const sortType = searchParams.get("sort");  

    let categories;

    if (sortType === "asc" || sortType === "desc") {

       categories = await Category.aggregate([
        {
          $addFields: {
            nameLength: { $strLenCP: "$title" }, 
          },
        },
        {
          $sort: {
            nameLength: sortType === "asc" ? 1 : -1,
          },
        },
      ]);
    } else {
     
      categories = await Category.find({}).sort({ createdAt: -1 });
      // console.log(categories)
    }

    return NextResponse.json(
      {
        message: "Categories fetched successfully",
        success: true,
        data: categories,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error.message);
    return NextResponse.json(
      {
        message: "Category fetch server error",
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}
