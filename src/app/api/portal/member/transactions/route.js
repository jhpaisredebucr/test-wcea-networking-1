import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function POST(req) {
    try {
        const { user_id, type, amount, proof, payment_method } = await req.json();

        await query(
            `
                INSERT INTO transactions (user_id, type, amount, proof, payment_method)
                VALUES ($1, $2, $3, $4, $5)
            `,
            [user_id, type, amount, proof, payment_method]
        );

        return NextResponse.json({
            success: true,
            message: "transaction successful",
            amount,
            payment_method
        });

    } catch (error) {
        console.error("Transaction error:", error);

        return NextResponse.json(
            {
                success: false,
                message: error.message
            },
            { status: 500 }
        );
    }
}