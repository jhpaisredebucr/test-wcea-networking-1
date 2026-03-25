import { NextResponse } from "next/server";
import { query } from "../../../../lib/db";

export async function GET(req) {
    const products = await query("SELECT * FROM products"); 

    return NextResponse.json({products});
}