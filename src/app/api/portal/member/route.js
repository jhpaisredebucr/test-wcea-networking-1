import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const userReferralCode = searchParams.get("userReferralCode");
        const limit = Math.min(parseInt(searchParams.get("limit") || "20"), 100);
        const offset = parseInt(searchParams.get("offset") || "0");

        if (!userReferralCode) {
            return NextResponse.json({ error: "userReferralCode required" }, { status: 400 });
        }

        // Single query for referred members with pagination and aggregates
        const referredMembers = await query(`
            SELECT 
                u.id, u.username, u.status, u.referral_code, u.created_at,
                p.first_name, p.last_name,
                COUNT(*) OVER() AS total_count
            FROM users u
            JOIN user_profiles p ON p.user_id = u.id
            WHERE u.referred_by = $1
            ORDER BY u.created_at DESC
            LIMIT $2 OFFSET $3
        `, [userReferralCode, limit, offset]);

        const totalReferredMembers = referredMembers.length ? Number(referredMembers[0].total_count) : 0;
        const pendingCount = referredMembers.filter(member => member.status === 'pending').length;

        // Optimized aggregates with single queries using JOINs (no subqueries)
        const totalCommissionRes = await query(`
            SELECT COALESCE(SUM(rr.reward_amount), 0) AS total_commission
            FROM referral_rewards rr
            JOIN users u ON u.id = rr.referrer_id
            WHERE u.referral_code = $1
        `, [userReferralCode]);

        const totalOrderRes = await query(`
            SELECT COALESCE(SUM(p.price), 0) AS total_spent
            FROM orders o
            JOIN products p ON o.product_id = p.id
            JOIN users u ON u.id = o.user_id
            WHERE u.referral_code = $1
        `, [userReferralCode]);

        const totalCommissionValue = Number(totalCommissionRes[0]?.total_commission || 0);
        const totalSpent = Number(totalOrderRes[0]?.total_spent || 0);
        const userBalance = totalCommissionValue - totalSpent;

        const dashboardData = {
            totalReferredMembers, 
            pendingCount, 
            totalCommissionValue, 
            userBalance, 
            referredMembers 
        };
        
        return NextResponse.json({ 
            dashboardData,
            pagination: { limit, offset, total: totalReferredMembers, hasMore: referredMembers.length === limit }
        }, {
            headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=59" }
        });

    } catch (error) {
        console.error("[portal/member/route.js] error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
