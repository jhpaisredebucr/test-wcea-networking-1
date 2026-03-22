    import { query } from "../../../../../../lib/db";
    import { NextResponse } from "next/server";

    export async function GET(req) {
        //Total Members
        const result = await query("SELECT COUNT(*) FROM users");
        const totalMembers = Number(result[0].count);

        //Total Active Users
        
        return NextResponse.json({ totalMembers });
    }