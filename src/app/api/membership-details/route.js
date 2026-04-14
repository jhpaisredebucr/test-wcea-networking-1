// app/api/membership/route.js
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();

    const {
      name,
      birthday,
      age,
      completeAddress,
      nationality,
      gender,
      cpNumber,
      email,
      facebook,
      endorsedBy,
      nominatedBy,
      dateOfPayment,
      modeOfPayment,
      selectedOptions,
      date,
    } = body;

    // ── Validate required fields ──────────────────────────────────────────────
    const errors = [];
    if (!name?.trim())            errors.push("Name is required.");
    if (!birthday?.trim())        errors.push("Birthday is required.");
    if (!age?.trim())             errors.push("Age is required.");
    if (!completeAddress?.trim()) errors.push("Complete address is required.");
    if (!cpNumber?.trim())        errors.push("CP number is required.");
    if (!email?.trim())           errors.push("Email is required.");
    if (!selectedOptions?.length) errors.push("Please select at least one option.");

    if (errors.length > 0) {
      return NextResponse.json({ success: false, errors }, { status: 400 });
    }

    // ── Build the membership record ───────────────────────────────────────────
    const membershipRecord = {
      id: `MND-${Date.now()}`,
      submittedAt: new Date().toISOString(),
      formDate: date,
      personalInfo: {
        name:            name.trim(),
        birthday:        birthday.trim(),
        age:             age.trim(),
        completeAddress: completeAddress.trim(),
        nationality:     nationality?.trim() ?? "",
        gender:          gender?.trim() ?? "",
        cpNumber:        cpNumber.trim(),
        email:           email.trim(),
        facebook:        facebook?.trim() ?? "",
      },
      referral: {
        endorsedBy:   endorsedBy?.trim()   ?? "",
        nominatedBy:  nominatedBy?.trim()  ?? "",
      },
      payment: {
        mode:          modeOfPayment ?? "",
        dateOfPayment: dateOfPayment?.trim() ?? "",
      },
      selectedOptions: selectedOptions ?? [],
      status: "pending",
    };

    // ── In a real app: persist to DB, send email, etc. ────────────────────────
    // e.g. await db.memberships.create({ data: membershipRecord });
    console.log("New membership submission:", membershipRecord);

    return NextResponse.json({
      success: true,
      message: "Membership form submitted successfully.",
      referenceId: membershipRecord.id,
      data: membershipRecord,
    });
  } catch (error) {
    console.error("Membership API error:", error);
    return NextResponse.json(
      { success: false, errors: ["Internal server error. Please try again."] },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    success: true,
    message: "Memo Ni Dok Membership API is running.",
    endpoints: {
      POST: "/api/membership — Submit a membership form",
    },
  });
}