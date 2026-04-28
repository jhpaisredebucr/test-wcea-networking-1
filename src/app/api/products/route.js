import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import jwt from "jsonwebtoken";

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

export async function POST(req) {
  try {
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      return NextResponse.json(
        { success: false, message: "Invalid token" },
        { status: 401 }
      );
    }

    const userResult = await query(
      "SELECT id, role FROM users WHERE id = $1 LIMIT 1",
      [decoded.id]
    );

    if (!userResult.length || userResult[0].role !== "admin") {
      return NextResponse.json(
        { success: false, message: "Forbidden" },
        { status: 403 }
      );
    }

    const body = await req.json();
    const product_name = body.product_name?.trim();
    const description = body.description?.trim() || "";
    const price = Number(body.price);
    const img_url = body.img_url?.trim();

    if (!product_name || !img_url || Number.isNaN(price) || price <= 0) {
      return NextResponse.json(
        { success: false, message: "Invalid product payload" },
        { status: 400 }
      );
    }

    const createdProduct = await query(
      `INSERT INTO products (user_id, product_name, description, price, img_url)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [userResult[0].id, product_name, description, price, img_url]
    );

    return NextResponse.json({
      success: true,
      product: {
        ...createdProduct[0],
        price: Number(createdProduct[0].price)
      }
    });
  } catch (err) {
    console.error("[POST /api/products] error:", err);
    return NextResponse.json(
      { success: false, message: "Failed to create product" },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  try {
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      return NextResponse.json(
        { success: false, message: "Invalid token" },
        { status: 401 }
      );
    }

    const userResult = await query(
      "SELECT id, role FROM users WHERE id = $1 LIMIT 1",
      [decoded.id]
    );

    if (!userResult.length || userResult[0].role !== "admin") {
      return NextResponse.json(
        { success: false, message: "Forbidden" },
        { status: 403 }
      );
    }

    const body = await req.json();
    const productId = Number(body?.id);

    if (!Number.isInteger(productId) || productId <= 0) {
      return NextResponse.json(
        { success: false, message: "Invalid product id" },
        { status: 400 }
      );
    }

    const deletedProducts = await query(
      "DELETE FROM products WHERE id = $1 RETURNING id",
      [productId]
    );

    if (!deletedProducts.length) {
      return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      deletedId: deletedProducts[0].id
    });
  } catch (err) {
    console.error("[DELETE /api/products] error:", err);
    return NextResponse.json(
      { success: false, message: "Failed to delete product" },
      { status: 500 }
    );
  }
}