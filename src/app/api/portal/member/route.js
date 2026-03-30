import { NextResponse } from "next/server";
import { query } from "../../../../../lib/db";

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const userReferralCode = searchParams.get("userReferralCode");

    //TOTAL REFERRED MEMBER
    const referredMembers = await query(
        `
            SELECT 
                u.username,
                u.status,
                u.created_at,
                p.first_name,
                p.last_name,
                COUNT(*) OVER() AS total_count
            FROM users u
            JOIN user_profiles p ON p.user_id = u.id
            WHERE u.referred_by = $1
        `
        ,[userReferralCode]
    );

    const totalBalance = await query(
        `
            SELECT SUM(reward_amount) AS totalBalance FROM referral_rewards
            WHERE referrer_id = (SELECT id FROM users WHERE referral_code = $1);
        `
        ,[userReferralCode]
    )

    const totalReferredMembers = referredMembers.length? Number(referredMembers[0].total_count) : 0;
    const pendingCount = referredMembers.filter(member => member.status === 'pending').length;

    const dashboardData = {totalReferredMembers, pendingCount, totalBalance: Number(totalBalance[0]?.totalbalance ?? 0), referredMembers };
    
    return NextResponse.json({dashboardData});
}