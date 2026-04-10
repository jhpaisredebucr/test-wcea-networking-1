import { query } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PUT(req) {
  try {
    const body = await req.json();

    const {
      userInfo,
      profile,
      contacts,
      address
    } = body;

    if (!userInfo?.id) {
      return NextResponse.json(
        {
          success: false,
          message: "User ID required"
        },
        { status: 400 }
      );
    }

    const userID = userInfo.id;

    // UPDATE USERS TABLE
    await query(
      `
      UPDATE users
      SET username = $1
      WHERE id = $2
      `,
      [userInfo.username, userID]
    );

    // UPDATE PROFILE TABLE
    await query(
      `
      UPDATE user_profiles
      SET first_name = $1,
          middle_name = $2,
          last_name = $3,
          dob = $4,
          img_url = $5
      WHERE user_id = $6
      `,
      [
        profile.first_name,
        profile.middle_name,
        profile.last_name,
        profile.dob,
        profile.img_url,
        userID
      ]
    );

    // UPDATE CONTACT TABLE
    await query(
      `
      UPDATE user_contacts
      SET email = $1,
          contact_no = $2
      WHERE user_id = $3
      `,
      [
        contacts.email,
        contacts.contact_no,
        userID
      ]
    );

    // UPDATE ADDRESS TABLE
    await query(
      `
      UPDATE user_addresses
      SET city = $1,
          barangay = $2,
          postal_code = $3,
          street_address = $4
      WHERE user_id = $5
      `,
      [
        address.city,
        address.barangay,
        address.postal_code,
        address.street_address,
        userID
      ]
    );

    return NextResponse.json({
      success: true,
      message: "Profile updated successfully"
    });

  } catch (err) {
    console.error(err);

    return NextResponse.json(
      {
        success: false,
        message: "Update failed"
      },
      { status: 500 }
    );
  }
}