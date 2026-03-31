import { NextResponse } from "next/server";
import { query } from "../../../../../lib/db";

export async function POST(req) {
    const body = await req.json();
    const { user_id, product_id} = body;

    const buyRes = await query(
        `
            INSERT INTO orders (user_id, product_id)
            VALUES ($1, $2)
            RETURNING *
        `,
        [user_id, product_id]
    )

    // const balanceRes = await query(
    //     `

    //     `
    // )

    const products = await query("SELECT * FROM products WHERE id=$1", [product_id])

    return NextResponse.json({order: buyRes[0], products: products});
}