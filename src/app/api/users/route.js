// src/app/api/users/route.js
import { query } from "../../../../lib/db.js";

export async function GET(req) {
  const users = await query("SELECT * FROM users");
  return new Response(JSON.stringify(users), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}