import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function DELETE(req) {
    try {
        
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");


        if (!id) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Missing id value"
                },
                { status: 400 }
            );
        }

        await query(
            `DELETE FROM announcement WHERE id = $1`,
            [id]
        );

        return NextResponse.json({
            success: true,
            message: "Announcement deleted successfully"
        });

    } catch (error) {

        console.error(error);

        return NextResponse.json(
            {
                success: false,
                message: error.message
            },
            { status: 500 }
        );
    }
}