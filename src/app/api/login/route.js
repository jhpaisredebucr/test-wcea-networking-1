import { Result } from "pg";
import { query } from "../../../../lib/db";
import bcrypt from "bcrypt";

export async function POST(req) {
    const body = await req.json();
    const {username, password} = body;

    const users = await query(
        "SELECT * FROM users WHERE username=$1", 
        [username]
    );

    if (users.length === 0) {
        return Response.json({success: false, message: "No user"})
    }

    const valid = await bcrypt.compare(password, users[0].password);

    if (valid) {
        return Response.json({success: true, message: "Successfuly logged in", users})
    }
    return Response.json({success: false, message: "Wrong password", users})
}