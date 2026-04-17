import { query } from "@/lib/db";
    import { NextResponse } from "next/server";

    export async function GET(req) {
        try {
            //Total Members
            const totalUser = await query("SELECT COUNT(*) FROM users WHERE status=$1", ["approved"]);
            const totalMembers = Number(totalUser[0].count);
            const totalOrders = await query("SELECT COUNT(*) FROM orders WHERE status=$1", ["pending"])
            const totalPendingOrders = Number(totalOrders[0].count);

            //Pending Request
            const pendingRequest = await query(
                `
                    SELECT 
                        u.id,
                        u.username,
                        u.status,
                        u.plan,
                        u.referred_by,
                        u.created_at,
                        p.first_name,
                        p.last_name
                    FROM users u
                    JOIN user_profiles p ON p.user_id = u.id
                    WHERE u.status = $1
                `
                ,["pending"]
            );

            const approvedMembers = await query(
                `
                    SELECT 
                        u.id,
                        u.username,
                        u.status,
                        u.plan,
                        u.referred_by,
                        u.created_at,
                        p.first_name,
                        p.last_name
                    FROM users u
                    JOIN user_profiles p ON p.user_id = u.id
                    WHERE u.status = $1
                `
                ,["approved"]
            );

            const bannedMembers = await query(
                `
                    SELECT 
                        u.id,
                        u.username,
                        u.status,
                        u.plan,
                        u.referred_by,
                        u.created_at,
                        p.first_name,
                        p.last_name
                    FROM users u
                    JOIN user_profiles p ON p.user_id = u.id
                    WHERE u.status = $1
                `
                ,["banned"]
            );

            const topReferrer = await query(
                `
                    SELECT 
                        u.username,
                        COUNT(r.id) AS total_referred
                    FROM users u
                    JOIN users r ON r.referred_by = u.referral_code
                    GROUP BY u.username
                    ORDER BY total_referred DESC
                    LIMIT 1;
                `
            );
            
           const revenueResult = await query(`
                SELECT
                    COALESCE(
                        (
                            SELECT SUM(amount)
                            FROM transactions
                            WHERE status = 'approved'
                        ), 0
                    )
                    -
                    COALESCE(
                        (
                            SELECT SUM(reward_amount)
                            FROM referral_rewards
                        ), 0
                    )::float AS admin_revenue;
            `);
            const revenue = revenueResult[0];

            const totalPendingRequest = await query("SELECT COUNT(*) FROM users where status=$1",["pending"]);
            const totalRequest = Number(totalPendingRequest[0].count);

            const dashboardData = {totalMembers, totalRequest, topReferrer, revenue, pendingRequest, approvedMembers, bannedMembers, totalPendingOrders}
            
            return NextResponse.json({ dashboardData });
        } catch (error) {
            console.error("[portal/admin/analytics/route.js] error:", error);
            return NextResponse.json({ error: "Internal server error" }, { status: 500 });
        }
    }