import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function POST(req) {
    const { referral_code, referred_id, reward_amount } = await req.json();

    const referrerIDResult = await query(
        `
            SELECT * FROM users WHERE referral_code=$1
        `,
        [referral_code]
    )

    const referrerIDRes = referrerIDResult[0];

    await query(
        `
            INSERT INTO referral_rewards (referrer_id, referred_id, reward_amount)
            VALUES ($1, $2, $3)
        `,
        [referrerIDRes.id, referred_id, reward_amount]
    );

    return NextResponse.json({ message: "referral transaction successful", reward_amount });
}