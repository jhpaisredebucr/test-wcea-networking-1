import { query } from "../../../../lib/db";
import bcrypt from "bcrypt";

export async function POST(req) {
    try {
        const body = await req.json();
        let { username, email, contactNumber, referralCode, password } = body;

        if (!username || !email || !contactNumber || !referralCode || !password) {
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
            `
                INSERT INTO users (username, referred_by, password)
                VALUES ($1, $2, $3)
                RETURNING *
            `,
            [username, referralCode, hashedPass]
        );

        const user = result[0];

        await query(
            `
                INSERT INTO user_contacts (user_id, email, contact_no)
                VALUES ($1, $2, $3)
            `,
            [user.id, email, contactNumber]
        )

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