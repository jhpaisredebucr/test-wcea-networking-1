import { NextResponse } from "next/server";
import { query } from "../../../../../../lib/db";

export async function PATCH(req) {
    const { userId } = await req.json();

    await query(
        "UPDATE users SET status = $1 WHERE id = $2",
        ["approved", userId]
    );

    return NextResponse.json({ message: "User approved successfully", userId: userId });
}