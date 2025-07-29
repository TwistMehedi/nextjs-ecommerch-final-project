import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/database.js";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import { User } from "@/models/userModel.js";
// import { User } from "@/models/userModel.js";
 
const SECRET_KEY = process.env.SECRET_KEY;

export async function POST(req) {
  try {
    const { fullName, email, password } = await req.json();

    if (!fullName || !email || !password) {
      return NextResponse.json(
        { message: "All fields required" },
        { status: 400 }
      );
    }

    await connectDB();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const token = jwt.sign(
      { fullName, email, password: hashedPassword },
      SECRET_KEY,
      { expiresIn: "10m" }
    );

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_PASS,
      },
    });

    const verificationUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/verify-email?token=${token}`;

    await transporter.sendMail({
      from: process.env.USER_EMAIL,
      to: email,
      subject: "MH Store - Verify Your Email",
      html: `<p>Welcome to MH Store, ${fullName}!</p>
             <p>Please verify your email by clicking the link below (valid for 10 minutes):</p>
             <a href="${verificationUrl}">Verify Email</a>`,
    });

    const response = NextResponse.json({
      message: "Verification email sent! Please check your inbox.",
      success: true,
    });

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: true,
      maxAge: 600,
    });

    return response;
  } catch (error) {
    console.error(error);
    console.log(error)
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
};