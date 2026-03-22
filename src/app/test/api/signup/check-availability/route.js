import { query } from "../../../../../../lib/db";

export async function POST(req) {
    const body = await req.json();
    let {
        username,
        password
        // email,
        // contactNumber,
    } = body;

    if (password.length < 6) {
        return Response.json({ success: false, message: "Password too short" });
    }

    username = username.toLowerCase();

    const existing = await query(
        `SELECT * FROM users WHERE username=$1`,
        [username]
    );

    if (existing.length > 0) {
        return Response.json({
            success: false,
            message: "Username already exists"
        });
    } else {
        return Response.json({
            success: true,
            message: "Username is available"
        });
    }
}