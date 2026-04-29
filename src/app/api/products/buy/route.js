import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function POST(req) {
  try {
    const body = await req.json();
    const { user_id, cart } = body;

    if (!user_id || !cart || cart.length === 0) {
      return NextResponse.json(
        { message: "Invalid request" },
        { status: 400 }
      );
    }

    let totalAmount = 0;
    const insertedOrders = [];

    // ----------------------------
    // INSERT ORDERS + CALCULATE TOTAL
    // ----------------------------
    for (const item of cart) {
      const product_id = item.product_id;
      const quantity = item.quantity || 1;
      const price = Number(item.price) || 0;

      totalAmount += price * quantity;

      const result = await query(
        `
        INSERT INTO orders (user_id, product_id, quantity, status)
        VALUES ($1, $2, $3, 'pending')
        RETURNING *
        `,
        [user_id, product_id, quantity]
      );

      insertedOrders.push(result[0]);
    }

    // ----------------------------
    // INSERT TRANSACTION (linked to first order)
    // ----------------------------
    const firstOrderId = insertedOrders[0].id;
    const transactionResult = await query(
      `
      INSERT INTO transactions (user_id, order_id, type, amount, status)
      VALUES ($1, $2, 'purchase', $3, 'pending')
      RETURNING *
      `,
      [user_id, firstOrderId, totalAmount]
    );

    return NextResponse.json({
      success: true,
      orders: insertedOrders,
      transaction: transactionResult[0],
      total: totalAmount
    });

  } catch (err) {
    console.error(err);

    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}