// lib/db.js
import pkg from "pg";
const { Pool } = pkg;

// Make sure DATABASE_URL exists in your .env file
export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// helper function to query the database
export async function query(text, params) {
  const res = await pool.query(text, params);
  return res.rows;
}