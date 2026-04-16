import { NextResponse } from "next/server.js";
import { query } from "@/lib/db";
import jwt from "jsonwebtoken";

export async function GET(req) {
  try {
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    // Verify JWT early
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

    // Safe SELECT * JOIN - let PG handle column resolution, no assumed cols
    const userData = await query(`
      SELECT u.*, p.*, c.*, a.*
      FROM users u
      LEFT JOIN user_profiles p ON p.user_id = u.id
      LEFT JOIN user_contacts c ON c.user_id = u.id
      LEFT JOIN user_addresses a ON a.user_id = u.id
      WHERE u.id = $1
      LIMIT 1
    `, [userID]);

    if (!userData.length) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
    }

    const rawUser = userData[0];

    // Optional: fetch who referred this user
    let referredBy = null;
    if (rawUser.referred_by) {
      const referredByUser = await query(
        "SELECT id, username, referral_code FROM users WHERE referral_code = $1 LIMIT 1", 
        [rawUser.referred_by]
      );
      referredBy = referredByUser[0];
    }

    // Map to original structure (flexible for missing cols)
    const userInfo = rawUser;
    const profile = {
      first_name: rawUser.first_name,
      last_name: rawUser.last_name
      // PG will have null if cols missing, no crash
    };
    const contacts = {
      email: rawUser.email,
      phone: rawUser.phone
    };
    const address = {
      street: rawUser.street,
      city: rawUser.city,
      state: rawUser.state,
      country: rawUser.country,
      zip_code: rawUser.zip_code
    };

    return NextResponse.json(
      { 
        userInfo, 
        profile, 
        contacts, 
        address, 
        referredBy, 
        success: true 
      },
      { 
        status: 200, 
        headers: { "Cache-Control": "private, s-maxage=300, stale-while-revalidate=59" } 
      }
    );

  } catch (err) {
    console.error("Error fetching user:", err);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
