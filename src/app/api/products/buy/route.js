import { NextResponse } from "next/server";
import { query } from "../../../../../lib/db";

export async function POST(req) {
    const body = await req.json();
    const { user_id, product_id, product_name } = body;

    const res = await query(
        `
            INSERT INTO orders (user_id, product_id, product_name)
            VALUES ($1, $2, $3)
            RETURNING *
        `,
        [user_id, product_id, product_name]
    )

    return NextResponse.json({order: res[0]});
}