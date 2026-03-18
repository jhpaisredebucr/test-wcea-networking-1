import { query } from "../../../../lib/db";
import bcrypt from "bcrypt";

export async function POST(req) {
    try {
        const body = await req.json();
        let { username, password } = body;

        if (!username || !password) {
            return Response.json({ success: false, message: "Missing fields" });
        }

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
        }

        const hashedPass = await bcrypt.hash(password, 10);

        const result = await query(
            `INSERT INTO users (username, password)
            VALUES ($1, $2)
            RETURNING *`,
            [username, hashedPass]
        );

        const user = result[0];

        return Response.json({
            success: true,
            message: "Successfully signed up",
            user: {
                id: user.id,
                username: user.username,
                role: user.role
            }
        });

    } catch (err) {
        return Response.json({
            success: false,
            message: err
        });
    }
}