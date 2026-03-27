import { query } from "../../../../lib/db";
import bcrypt from "bcryptjs";

export async function POST(req) {
    try {
        const body = await req.json();
        const {
            //users
            username,
            referralCode,
            password,
            //user_contacts
            email,
            contactNumber,
            // user_profiles
            firstName,
            middleName,
            lastName,
            dob,
            city,
            barangay,
            streetAddress,
            postalCode,
            // Step 3
            plan,
            // Step 4
            paymentMethod,
            // Step 5
            status
        } = body;

        const hashedPass = await bcrypt.hash(password, 10);

        //user referral code
        function generateReferralCode() {
            const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

            let code = "MEM-";

            for (let i = 0; i < 6; i++) {
                code += chars[Math.floor(Math.random() * chars.length)];
            }

            return code;
        }

        const code = generateReferralCode();

        //users
        const result = await query(
            `
                INSERT INTO users (username, password, referred_by, referral_code, plan)
                VALUES ($1, $2, $3, $4, $5)
                RETURNING *
            `,
            [username, hashedPass, referralCode, code, plan]
        );

        const user = result[0];
        const userID = user.id;

        //user contacts
        await query(
            `
                INSERT INTO user_contacts (user_id, email, contact_no)
                VALUES ($1, $2, $3)
            `,
            [userID, email, contactNumber]
        );

        //user profiles
        await query(
            `
                INSERT INTO user_profiles (user_id, first_name, middle_name, last_name, dob)
                VALUES ($1, $2, $3, $4, $5)
            `,
            [userID, firstName, middleName, lastName, dob]
        );

        //user addresses
        await query(
            `
                INSERT INTO user_addresses (user_id, city, barangay, postal_code, street_address)
                VALUES ($1, $2, $3, $4, $5)
            `,
            [userID, city, barangay, postalCode, streetAddress]
        );

        return Response.json({
            success: true,
            message: "Successfully signed up",
            user: {
                id: user.id,
                username: user.username,
                role: user.role,
                referral_code: user.referral_code
            }
        });

    } catch (err) {
        return Response.json({
            success: false,
            message: err.message
        });
    }
}