import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function POST(req) {
  try {
    const body = await req.json();
    const { newUserId, referrerId } = body;

    if (referrerId) {
      await query(`
        INSERT INTO referrals (ancestor_id, descendant_id, depth)

        SELECT ancestor_id, $1::int, depth + 1
        FROM referrals
        WHERE descendant_id = $2::int

        UNION ALL

        SELECT $2::int, $1::int, 1
        `, [newUserId, referrerId]);
    }

    return NextResponse.json({ message: "working" });

  } catch (error) {
    return NextResponse.json(
      { message: "not working", errors: error.message },
      { status: 500 }
    );
  }
}