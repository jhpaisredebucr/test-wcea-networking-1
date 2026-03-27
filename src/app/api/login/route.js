import { query } from "../../../../lib/db";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";

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

        if (users.length === 0) {
            return Response.json({
                success: false,
                message: "Invalid credentials"
            });
        }

        const user = users[0];

        if (user.status === "pending") {
            return Response.json({
                success: false,
                message: "Still waiting for approvement"
            });
        }

        const valid = await bcrypt.compare(password, user.password);

        if (!valid) {
            return Response.json({
                success: false,
                message: "Invalid credentials"
            });
        }

        // ✅ Correct cookie method (Next.js App Router)
        const cookieStore = await cookies();

        cookieStore.set("userID", String(user.id), {
            httpOnly: true,
            path: "/",
            maxAge: 60 * 60 * 24 // 1 day
        });

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
        console.error(err); // helpful for Railway logs

        return Response.json({
            success: false,
            message: "Server error"
        });
    }
}