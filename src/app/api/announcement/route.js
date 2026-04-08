import { NextResponse } from "next/server";
import { query } from "@/lib/db";
export async function GET(req) {
    const limit = 5 
    const offset = 0
    const announcements = await query(`SELECT * FROM announcement ORDER BY id DESC LIMIT ${limit} OFFSET ${offset}`); 

    return NextResponse.json({announcements});
}