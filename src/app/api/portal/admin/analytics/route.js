    import { query } from "../../../../../../lib/db";
    import { NextResponse } from "next/server";

    export async function GET(req) {
        //Total Members
        const totalUser = await query("SELECT COUNT(*) FROM users");
        const totalMembers = Number(totalUser[0].count);

        //Pending Request
        const pendingRequest = await query("SELECT * FROM users where status=$1",["pending"]);
        const totalPendingRequest = await query("SELECT COUNT(*) FROM users where status=$1",["pending"]);
        const totalRequest = Number(totalPendingRequest[0].count);
        const dashboardData = {totalMembers, pendingRequest, totalRequest}
        
        return NextResponse.json({ dashboardData });
    }