import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function PATCH(req) {
    try {
        const { userId, plan } = await req.json();

        // -----------------------
        // VALIDATION
        // -----------------------
        if (!userId || !plan) {
            return NextResponse.json(
                {
                    success: false,
                    message: "User ID and plan are required",
                },
                { status: 400 }
            );
        }

        const cleanUserId = Number(userId);
        const cleanPlan = String(plan).trim();

        console.log("INPUT:", {
            userId: cleanUserId,
            plan: cleanPlan
        });

        // -----------------------
        // DEBUG BEFORE UPDATE (IMPORTANT)
        // -----------------------
        const before = await query(
            `SELECT * FROM transactions WHERE user_id = $1`,
            [cleanUserId]
        );

        console.log("BEFORE UPDATE:", before.rows || before);

        // -----------------------
        // UPDATE QUERY
        // -----------------------
        const result = await query(
            `
            UPDATE transactions
            SET status = 'approved'
            WHERE user_id = $1
              AND status = 'pending'
              AND type = $2
            RETURNING *;
            `,
            [cleanUserId, cleanPlan]
        );

        const rows = result.rows || [];

        console.log("AFTER UPDATE ROWS:", rows);

        // -----------------------
        // IF NOTHING UPDATED
        // -----------------------
        if (rows.length === 0) {
            return NextResponse.json(
                {
                    success: false,
                    message: "No matching pending transaction found",
                    debug: {
                        userId: cleanUserId,
                        plan: cleanPlan
                    }
                },
                { status: 404 }
            );
        }

        // -----------------------
        // SUCCESS RESPONSE
        // -----------------------
        return NextResponse.json({
            success: true,
            message: "User approved successfully",
            updated: rows[0]
        });

    } catch (error) {
        console.error("Approval error:", error);

        return NextResponse.json(
            {
                success: false,
                message: error.message,
            },
            { status: 500 }
        );
    }
}