// src/app/api/users/route.js
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

    // Verify JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userID = decoded.id; // assuming JWT contains user ID as 'id'

    // Fetch user info
    const usersInfo = await query("SELECT * FROM users WHERE id=$1", [userID]);
    const usersProfiles = await query("SELECT * FROM user_profiles WHERE user_id=$1", [userID]);
    const usersContacts = await query("SELECT * FROM user_contacts WHERE user_id=$1", [userID]);
    const usersAddresses = await query("SELECT * FROM user_addresses WHERE user_id=$1", [userID]);

    const userInfo = usersInfo[0];
    const profile = usersProfiles[0];
    const contacts = usersContacts[0];
    const address = usersAddresses[0];

    // Optional: fetch who referred this user
    const referredByUser = await query("SELECT * FROM users WHERE referral_code=$1", [userInfo.referred_by]);
    const referredBy = referredByUser[0];

    return NextResponse.json(
      { userInfo, profile, contacts, address, referredBy, success: true },
      { status: 200, headers: { "Content-Type": "application/json" } }
    );

  } catch (err) {
    console.error("Error fetching user:", err);
    return NextResponse.json(
      { success: false, message: "Invalid or expired token" },
      { status: 401 }
    );
  }
}