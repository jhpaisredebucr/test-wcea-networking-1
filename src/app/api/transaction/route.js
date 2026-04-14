import { query } from "@/lib/db";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(req) {
  try {
    const token = req.cookies.get("token")?.value;

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
    const role = decoded.role; // must exist inside JWT payload

    let transactions;

    // If admin → get ALL transactions
    if (role === "admin") {
      transactions = await query(
        "SELECT * FROM transactions ORDER BY created_at DESC"
      );
    } 
    // If regular user → get only their transactions
    else {
      transactions = await query(
        "SELECT * FROM transactions WHERE user_id = $1 ORDER BY created_at DESC",
        [userID]
      );
    }

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