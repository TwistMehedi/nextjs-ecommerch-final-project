import { User } from "@/models/userModel";
import { NextResponse } from "next/server";
import { isAuthenticated } from "../../middleware/isAuthenticated";
import { connectDB } from "@/lib/database";

export async function GET(req) {
    await connectDB();

  try {
    const auth = await isAuthenticated(req, ["admin"]);
    if (auth.status !== 200) {
      return NextResponse.json(
        { message: auth.message },
        { status: auth.status }
      );
    }

    const customers = await User.find({ role: { $ne: "admin" } });
    // console.log(customers);

    return NextResponse.json(
      {
        message: "Customers fetched successfully",
        success: true,
        data: customers,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching customers:", error);
    return NextResponse.json(
      {
        message: "Customers fetch server error",
        success: false,
      },
      { status: 500 }
    );
  }
}
