import { query } from "../../../../lib/db";
import bcrypt from "bcrypt";

export async function POST(req) {
    const body = await req.json();

    const {username, password} = body;
    const numHash = 10;
    const hashedPass = await bcrypt.hash(password, numHash);

    const existing = await query(`
            SELECT * FROM users WHERE username=$1
        `,
        [username]
    );

    if (existing.length > 0){
        return Response.json({
            success: false,
            message: "Username already exist"
        });
    }

    await query(`
            INSERT INTO users (username, password)
            VALUES($1, $2)
        `, 
        [username, hashedPass]
    );

    return Response.json({
        success: true,
        message: "User created"
    });
}