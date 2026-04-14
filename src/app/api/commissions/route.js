import { query } from "@/lib/db";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(req) {
  try {
    const token = req.cookies.get("token")?.value;

    // No token
    if (!token) {
      return NextResponse.json(
        { success: false, message: "Unauthorized (no token)" },
        { status: 401 }
      );
    }

    let decoded;

    // Verify token
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return NextResponse.json(
        { success: false, message: "Invalid or expired token" },
        { status: 401 }
      );
    }

    const userID = decoded.id;
    const role = decoded.role;

    let commission;

    // ADMIN → get all referral rewards
    if (role === "admin") {
      commission = await query(`
        SELECT 
          rr.*,
          referrer.first_name AS referrer_first_name,
          referrer.last_name AS referrer_last_name,
          referred.first_name AS referred_first_name,
          referred.last_name AS referred_last_name
        FROM referral_rewards rr
        JOIN user_profiles referrer 
          ON rr.referrer_id = referrer.user_id
        JOIN user_profiles referred 
          ON rr.referred_id = referred.user_id
        ORDER BY rr.created_at DESC
      `);
    }

    // MEMBER → only their referral rewards
    else {
      commission = await query(
        `
        SELECT 
          rr.*,
          referrer.first_name AS referrer_first_name,
          referrer.last_name AS referrer_last_name,
          referred.first_name AS referred_first_name,
          referred.last_name AS referred_last_name
        FROM referral_rewards rr
        JOIN user_profiles referrer 
          ON rr.referrer_id = referrer.user_id
        JOIN user_profiles referred 
          ON rr.referred_id = referred.user_id
        WHERE rr.referrer_id = $1
        ORDER BY rr.created_at DESC
        `,
        [userID]
      );
    }

    return NextResponse.json({
      success: true,
      commission,
    });

  } catch (err) {
    console.error("commission API error:", err);

    return NextResponse.json(
      {
        success: false,
        message: err.message,
      },
      { status: 500 }
    );
  }
}