import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const user_id = searchParams.get("user_id");

        let queryText = "SELECT * FROM orders";
        let params = [];

        if (user_id) {
            queryText += " WHERE user_id = $1";
            params.push(user_id);
        }

        const res = await query(queryText, params);

        if (!res || res.length === 0) {
            return NextResponse.json({ orders: [] }, { status: 200 });
        }

        return NextResponse.json({ orders: res }, { status: 200 });

    } catch (err) {
        console.error("Failed to fetch package orders:", err);
        return NextResponse.json(
            { message: "Failed to fetch package orders. Please try again." },
            { status: 500 }
        );
    }
}
