import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function PATCH(req) {
    try {
        const { userId, statusToAdd } = await req.json();

        if (!userId || !statusToAdd) {
            return NextResponse.json(
                {
                    success: false,
                    message: "User ID and status to add are required",
                    userId,
                    statusToAdd
                },
                { status: 400 }
            );
        }

        //  IMPORTANT: add RETURNING *
        const result = await query(
            `
                UPDATE users
                SET status = $1
                WHERE id = $2
                RETURNING *
            `,
            [statusToAdd, userId]
        );

        // query() returns array → so check length
        if (!result || result.length === 0) {
            return NextResponse.json(
                {
                    success: false,
                    message: "User not found or not updated",
                },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            message: "User status changed successfully",
            updatedUser: result[0],
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