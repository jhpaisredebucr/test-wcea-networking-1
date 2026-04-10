import { query } from "@/lib/db";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(req) {

    const token = req.cookies.get("token")?.value;

    // Verify JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userID = decoded.id;

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const transactions = await query("SELECT * FROM transactions WHERE user_id =$1", [userID])
    return NextResponse.json({transactions})
}