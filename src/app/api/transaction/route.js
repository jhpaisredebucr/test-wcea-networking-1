import { query } from "@/lib/db";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(req) {
  try {
    const token = req.cookies.get("token")?.value

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Unauthorized (no token)" },
        { status: 401 }
      );
    }

    let decoded;

    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return NextResponse.json(
        { success: false, message: "Invalid or expired token" },
        { status: 401 }
      );
    }

    const userID = decoded.id;

    const transactions = await query(
      "SELECT * FROM transactions WHERE user_id = $1",
      [userID]
    );

    return NextResponse.json({
      success: true,
      transactions,
    });

  } catch (err) {
    console.error("Transaction API error:", err);

    return NextResponse.json(
      {
        success: false,
        message: err.message,
      },
      { status: 500 }
    );
  }
}