import { NextResponse } from "next/server";
import { query } from "../../../../../lib/db";

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const userReferralCode = searchParams.get("userReferralCode");

    //TOTAL REFERRED MEMBER
    const referedMembers = await query("SELECT COUNT(*) FROM users WHERE referred_by=$1", [userReferralCode]);
    const totalReferredMembers = Number(referedMembers[0].count)

    const dashboardData = {totalReferredMembers};
    
    return NextResponse.json({dashboardData});
}