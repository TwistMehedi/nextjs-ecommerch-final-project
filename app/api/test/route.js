import { connectDB } from "@/lib/database";
import { NextResponse } from "next/server";

export async function GET() {
    
    await connectDB();

    return NextResponse({
        success: true,
        message: "Connect database"
    });

};
