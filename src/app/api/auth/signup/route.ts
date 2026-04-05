import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req: NextRequest) {
  await dbConnect();

  const { fullName, email, password, role } = await req.json();

  if (!fullName || !email || !password) {
    return NextResponse.json(
      { error: "Full name, email, and password are required" },
      { status: 400 }
    );
  }

  const existing = await User.findOne({ email });
  if (existing) {
    return NextResponse.json(
      { error: "Email already registered" },
      { status: 409 }
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    fullName,
    email,
    password: hashedPassword,
    role: role === "hr" ? "hr" : "applicant",
  });

  return NextResponse.json(
    {
      message: "Account created successfully",
      user: { _id: user._id, fullName: user.fullName, email: user.email, role: user.role },
    },
    { status: 201 }
  );
}
