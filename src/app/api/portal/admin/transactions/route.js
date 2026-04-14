import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function PATCH(req) {
    // const { userId, plan } = await req.json();

    // const result = await query("SELECT * FROM transactions WHERE user_id =$1", [userId])
    // return NextResponse.json({result});

    try {
        const { userId, plan } = await req.json();

        // Validate input
        if (!userId || !plan) {
            return NextResponse.json(
                {
                    success: false,
                    message: "User ID and plan are required", userId, plan,
                },
                { status: 400 }
            );
        }

        // Update only if status is pending AND plan matches "Plan"
        const result = await query(
            `
            UPDATE transactions
            SET status = $1
            WHERE user_id = $2
            AND status = $3
            AND type = $4
            RETURNING user_id, status
            `,
            ["approved", userId, "Pending", plan]
        );

        // If no rows updated
        if (result.rowCount === 0) {
            return NextResponse.json(
                {
                    success: false,
                    message: "User not eligible for approval",
                },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            message: "User approved successfully",
            updatedUser: result[0],
        });

    } catch (error) {
        console.error("Approval error:", error);

        return NextResponse.json(
            {
                success: false,
                message: error.message, // show actual error temporarily
            },
            { status: 500 }
        );
    }
}