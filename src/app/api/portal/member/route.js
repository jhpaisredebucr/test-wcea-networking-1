import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const userReferralCode = searchParams.get("userReferralCode");

        //TOTAL REFERRED MEMBER
        const referredMembers = await query(
            `
                SELECT 
                    u.username,
                    u.status,
                    u.referral_code,
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

        const totalCommission = await query(
            `
                SELECT SUM(reward_amount) AS totalCommission FROM referral_rewards
                WHERE referrer_id = (SELECT id FROM users WHERE referral_code = $1);
            `
            ,[userReferralCode]
        )

        const totalOrder = await query(
            `
                SELECT COALESCE(SUM(p.price), 0) AS totalSpent
                FROM orders o
                JOIN products p ON o.product_id = p.id
                WHERE o.user_id = (
                SELECT id FROM users WHERE referral_code = $1);
            `,
            [userReferralCode]
        )

        const totalSpent = Number(totalOrder?.[0]?.totalspent || 0);
        const totalCommissionValue = Number(totalCommission?.[0]?.totalcommission || 0);

        const userBalance = totalCommissionValue - totalSpent;

        const totalReferredMembers = referredMembers.length? Number(referredMembers[0].total_count) : 0;
        const pendingCount = referredMembers.filter(member => member.status === 'pending').length;

        const dashboardData = {totalReferredMembers, pendingCount, totalCommissionValue, userBalance, referredMembers };
        
        return NextResponse.json({dashboardData});
    } catch (error) {
        console.error("[portal/member/route.js] error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}