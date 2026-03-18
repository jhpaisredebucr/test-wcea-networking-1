import { query } from "../../../../lib/db";
import bcrypt from "bcrypt";

export async function POST(req) {
    try {
        const body = await req.json();
        let { username, password } = body;

        if (!username || !password) {
            return Response.json({
                success: false,
                message: "Missing fields"
            });
        }

        username = username.toLowerCase();

        const users = await query(
            "SELECT * FROM users WHERE username=$1",
            [username]
        );

        if (users.rows.length === 0) {
            return Response.json({
                success: false,
                message: "Invalid credentials"
            });
        }

        const user = users[0];

        const valid = await bcrypt.compare(password, user.password);

        if (!valid) {
            return Response.json({
                success: false,
                message: "Invalid credentials"
            });
        }

        return Response.json({
            success: true,
            message: "Successfully logged in",
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