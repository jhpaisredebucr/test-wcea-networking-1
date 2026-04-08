import { query } from "@/lib/db";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req) {
    try {
        const body = await req.json();
        console.log("Request body:", body);

        let { username, password } = body;

        if (!username || !password) {
            console.log("Missing fields");
            return NextResponse.json(
                { success: false, message: "Missing fields" },
                { status: 400 }
            );
        }

        username = username.toLowerCase();

        const result = await query(
            "SELECT * FROM users WHERE username = $1",
            [username]
        );
        console.log("Query result:", result);

        const users = result.rows;

        if (users.length === 0) {
            console.log("No user found");
            return NextResponse.json(
                { success: false, message: "Invalid credentials" },
                { status: 401 }
            );
        }

        const user = users[0];
        console.log("Found user:", user);

        if (user.status === "pending") {
            console.log("User pending");
            return NextResponse.json(
                { success: false, message: "Still waiting for approvement" },
                { status: 403 }
            );
        }

        if (!user.password) {
            console.log("User has no password hash");
            return NextResponse.json(
                { success: false, message: "No password set" },
                { status: 500 }
            );
        }

        const valid = await bcrypt.compare(password, user.password);
        console.log("Password valid:", valid);

        if (!valid) {
            console.log("Invalid password");
            return NextResponse.json(
                { success: false, message: "Invalid credentials" },
                { status: 401 }
            );
        }

        if (!process.env.JWT_SECRET) {
            console.log("JWT_SECRET is undefined!");
        }

        const token = jwt.sign(
            { id: user.id, username: user.username, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "2d" }
        );
        console.log("Generated token");

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
        console.error("ERROR in pos t /api/auth/signin:", err);
        return NextResponse.json(
            { success: false, message: "Server error" },
            { status: 500 }
        );
    }
}