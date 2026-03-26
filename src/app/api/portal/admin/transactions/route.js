import { NextResponse } from "next/server";
import { query } from "../../../../../../lib/db";

export async function POST(req) {
    const { user_id, type, amount } = await req.json();

    await query(
        `
            INSERT INTO transactions (user_id, type, amount)
            VALUES ($1, $2, $3)
        `,
        [user_id, type, amount]
    );

    return NextResponse.json({ message: "transaction successful" });
}