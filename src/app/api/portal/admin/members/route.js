import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function PATCH(req) {
    try {
        const { userId } = await req.json();

        await query(
            "UPDATE users SET status = $1 WHERE id = $2",
            ["approved", userId]
        );

        return NextResponse.json({ message: "User approved successfully", userId: userId });
    } catch (error) {
        console.error("[portal/admin/members/route.js] error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}