import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function POST(req) {
  try {
    const { userId } = await req.json();

    const result = await query(
      `SELECT descendant_id, depth
       FROM referrals
       WHERE ancestor_id = $1
       ORDER BY depth ASC`,
      [userId]
    );

    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json(
      { message: "error", error: err.message },
      { status: 500 }
    );
  }
}