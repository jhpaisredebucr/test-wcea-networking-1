import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function POST(req) {
    const { user_id, type, amount, proof } = await req.json();

    await query(
        `
            INSERT INTO transactions (user_id, type, amount, proof)
            VALUES ($1, $2, $3, $4)
        `,
        [user_id, type, amount, proof]
    );

    return NextResponse.json({ message: "transaction successful", amount });
}