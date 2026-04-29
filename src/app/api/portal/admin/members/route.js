import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function PATCH(req) {
  try {
    const { userId } = await req.json();

    // 1. Approve user + get referral code
    const updated = await query(
      `
      UPDATE users
      SET status = $1
      WHERE id = $2
      RETURNING id, referred_by
      `,
      ["approved", userId]
    );

    const user = updated[0];

    let referrerId = null;

    // 2. If user has a referral code, find owner ID
    if (user?.referred_by) {
      const referrer = await query(
        `
        SELECT id
        FROM users
        WHERE referral_code = $1
        LIMIT 1
        `,
        [user.referred_by]
      );

      referrerId = referrer[0]?.id || null;
    }

    return NextResponse.json({
      message: "User approved successfully",
      userId: user.id,
      referredByCode: user.referred_by,
      referrerId: referrerId,
    });

  } catch (error) {
    console.error("[portal/admin/members/route.js] error:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}