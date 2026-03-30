import { NextResponse } from "next/server";
import { query } from "../../../../lib/db";

export async function GET(req) {
    const maxAnnouncementsPerLoad= 5 
    const announcements = await query(`SELECT * FROM announcement ORDER BY id DESC LIMIT ${maxAnnouncementsPerLoad}`); 

    return NextResponse.json({announcements});
}