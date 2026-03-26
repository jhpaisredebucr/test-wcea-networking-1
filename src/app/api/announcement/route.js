import { NextResponse } from "next/server";
import { query } from "../../../../lib/db";

export async function GET(req) {
    const announcements = await query("SELECT * FROM announcement ORDER BY id DESC"); 

    return NextResponse.json({announcements});
}