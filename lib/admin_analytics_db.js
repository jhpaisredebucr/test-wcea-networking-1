import { query } from "./db";

/**
 * Fetch admin dashboard analytics.
 * Returns the same structure as your old API route.
 */
export async function getAdminAnalytics() {
  // Total approved members
  const totalUser = await query("SELECT COUNT(*) AS count FROM users WHERE status=$1", ["approved"]);
  const totalMembers = Number(totalUser[0].count);

  // Pending requests
  const pendingRequest = await query(
    `
      SELECT 
        u.id,
        u.username,
        u.status,
        u.plan,
        u.referred_by,
        u.created_at,
        p.first_name,
        p.last_name
      FROM users u
      JOIN user_profiles p ON p.user_id = u.id
      WHERE u.status = $1
    `,
    ["pending"]
  );

  // Approved members
  const approvedMembers = await query(
    `
      SELECT 
        u.id,
        u.username,
        u.status,
        u.plan,
        u.referred_by,
        u.created_at,
        p.first_name,
        p.last_name
      FROM users u
      JOIN user_profiles p ON p.user_id = u.id
      WHERE u.status = $1
    `,
    ["approved"]
  );

  // Top referrer
  const topReferrer = await query(
    `
      SELECT 
        u.username,
        COUNT(r.id) AS total_referred
      FROM users u
      JOIN users r ON r.referred_by = u.referral_code
      GROUP BY u.username
      ORDER BY total_referred DESC
      LIMIT 1;
    `
  );

  // Revenue
  const result = await query(`
    SELECT
      users_total_money::float,
      admin_total_money::float,
      (admin_total_money - users_total_money)::float AS admin_revenue
    FROM (
      SELECT
        COALESCE((SELECT SUM(reward_amount) FROM referral_rewards), 0) AS users_total_money,
        COALESCE((SELECT SUM(amount) FROM transactions), 0) AS admin_total_money
    ) totals;
  `);

  const revenue = result[0];

  // Total pending requests count
  const totalPendingRequest = await query("SELECT COUNT(*) AS count FROM users WHERE status=$1", ["pending"]);
  const totalRequest = Number(totalPendingRequest[0].count);

  // Final dashboard object
  return {
    totalMembers,
    totalRequest,
    topReferrer,
    revenue,
    pendingRequest,
    approvedMembers,
  };
}