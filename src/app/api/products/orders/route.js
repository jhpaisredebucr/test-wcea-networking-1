import { NextResponse } from "next/server";
import { query } from "../../../../../lib/db";

export async function GET(req) {
    const res = await query("SELECT * FROM orders");

    return NextResponse.json({orders: res});
}