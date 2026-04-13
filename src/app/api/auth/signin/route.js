import { query } from "@/lib/db";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    const body = await req.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json({ success: false, message: "Missing fields" }, { status: 400 });
    }

    const users = await query("SELECT * FROM users WHERE username=$1", [username.toLowerCase()]);

    if (!users || users.length === 0) {
      return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 });
    }

    const user = users[0];

    if (user.status === "pending") {
      return NextResponse.json({ success: false, message: "Still waiting for approval" }, { status: 403 });
    }
    
    if (user.status === "banned") {
      return NextResponse.json({ success: false, message: "Your account was banned" }, { status: 403 });
    }

    if (!user.password) {
      return NextResponse.json({ success: false, message: "No password set" }, { status: 500 });
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 });
    }

    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is missing!");
      return NextResponse.json({ success: false, message: "Server misconfiguration" }, { status: 500 });
    }

    const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, process.env.JWT_SECRET, { expiresIn: "2d" });

    const res = NextResponse.json({
      success: true,
      message: "Successfully logged in",
      user: { id: user.id, username: user.username, role: user.role }
    });

    res.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 2, // 2 days
    });

    return res;
  } catch (err) {
    console.error("SignIn error:", err);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}