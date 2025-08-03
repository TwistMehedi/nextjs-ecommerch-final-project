import { User } from "@/models/userModel";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/database";

// const SECRET_KEY = process.env.SECRET_KEY;

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "All fields are required", success: false },
        { status: 400 }
      );
    }

    await connectDB(); 

    const existingUser = await User.findOne({ email }).select("+password");;

    if (!existingUser) {
      return NextResponse.json(
        { message: "User not found", success: false },
        { status: 401 }
      );
    }

    const isPasswordValid = await bcrypt.compare(password, existingUser.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Invalid password and email", success: false },
        { status: 401 }
      );
    };

    const token = jwt.sign(
      { userId: existingUser._id, role: existingUser.role},
       process.env.SECRET_KEY,
      { expiresIn: "1d" }
    );

    const response = NextResponse.json({
      message: "Login successful",
      success: true,
      user: existingUser
    });
 
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: true,
      maxAge: 86400,  
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { message: "Login server error", success: false },
      { status: 500 }
    );
  }
};
