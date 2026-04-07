import { query } from "../../../../lib/db";
import bcrypt from "bcrypt";
import { serialize } from "cookie"; // helper to format cookie
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { id } from "date-fns/locale";

export async function POST(req) {
    try {
        const body = await req.json();
        let { username, password } = body;

        if (!username || !password) {
            return NextResponse.json(
                {success: false, message: "Missing fields"},
                {status: 400}            
            );
        }

        username = username.toLowerCase();

        if (users.length === 0) {
            return NextResponse.json(
                { success: false, message: "Invalid credentials" },
                { status: 401 }
            );
        }

        const user = users[0];

        if (user.status === "pending") {
            return NextResponse.json(
                { success: false, message: "Still waiting for approvement" },
                { status: 403 }
            );
        }

        const valid = await bcrypt.compare(password, user.password);

        if (!valid) {
            return NextResponse.json(
                { success: false, message: "Invalid credentials" },
                { status: 401 }
            );
        }
        



        const token = jwt.sign(
            { id: user.id, username: user.username, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "2d"}
        )

        const res = NextResponse.json({
            success: true,
            message: "Successfully logged in",
            user: {
                id: user.id,
                username: user.username,
                role: user.role
            }
        });

        res.cookies.set("token", token, {
            httpOnly: true,
            path: "/",
            maxAge: 60 * 60 * 24,
            secure: process.env.NODE_ENV === "production",
        });

        return res;

    } catch (err) {
        return NextResponse.json(
            { success: false, message: "Server error" },
            { status: 500 }
        );
    }
}