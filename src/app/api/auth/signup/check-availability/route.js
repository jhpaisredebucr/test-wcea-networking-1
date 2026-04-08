import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function POST(req) {
    try {

        const body = await req.json();
        let {
            username,
            password
            // email,
            // contactNumber,
        } = body;

        if (password.length < 6) {
            return NextResponse.json({ success: false, message: "Password too short" },{status: 400});
        }

        username = username.toLowerCase();

        const existing = await query(
            `SELECT * FROM users WHERE username=$1`,
            [username]
        );

        if (existing.length > 0) {
            return NextResponse.json({
                success: false,
                message: "Username already exists"
            });
        } else {
            return Response.json({
                success: true,
                message: "Username is available"
            });
        }
        
    } catch (err) {
        console.error("Error checking username availability:", err);
        return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
    }
}