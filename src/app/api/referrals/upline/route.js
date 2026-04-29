import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function POST(req) {
  try {
    const { userId } = await req.json();

    const result = await query(
  `
  SELECT
    r.ancestor_id,
    r.depth,
    u.max_levels,
    CASE
      WHEN r.depth <= u.max_levels
      THEN 0.1 * POWER(0.5, r.depth - 1)
      ELSE 0
    END AS percentage
  FROM referrals r
  JOIN users u ON u.id = r.ancestor_id
  WHERE r.descendant_id = $1
  `,
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