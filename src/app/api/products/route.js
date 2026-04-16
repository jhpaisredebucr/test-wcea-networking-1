import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET(req) {
    try {
        const products = await query("SELECT * FROM products");

        const formattedProducts = products.map(product => ({
            ...product,
            price: Number(product.price)
        }));

        return NextResponse.json({ products: formattedProducts });
    } catch (err) {
        return NextResponse.json({status: 400})
    }
} 