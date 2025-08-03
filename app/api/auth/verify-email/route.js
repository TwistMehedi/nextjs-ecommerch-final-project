import { connectDB } from "@/lib/database";
import { User } from "@/models/userModel";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");
    

    if (!token) {
      return NextResponse.json(
        { message: "Token is required" },
        { status: 400 }
      );
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    const { fullName, email, password } = decoded;

    await connectDB();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already verified or already exists" },
        { status: 409 }
      );
    }

   const newUser = await User.create({
      fullName,
      email,
      password,
      isVerified:true
    });

    const verifyToken = jwt.sign({ userId: newUser._id, role: newUser.role }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    const response = NextResponse.json(
      { message: "Email verified and user created successfully!" , success: true, user:newUser},
      { status: 201 }
    );

    response.cookies.set("token", verifyToken, {
      httpOnly: true,
      secure: true,
      maxAge: 86400,
      path: "/",
    });
    return response;
  } catch (err) {
    return NextResponse.json(
      { message: "Invalid or expired token", error: err.message },
      { status: 401 }
    );
  }
}
