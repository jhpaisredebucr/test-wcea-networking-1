import { query } from "@/lib/db";

export async function getAdminAnalytics() {
  // -----------------------
  // TOTAL MEMBERS
  // -----------------------
  const totalUser = await query(
    "SELECT COUNT(*) FROM users WHERE status=$1 AND role=$2",
    ["approved", "member"]
  );

  const totalMembers = Number(totalUser[0].count);

  // -----------------------
  // TOTAL ORDERS
  // -----------------------
  const totalOrders = await query(
    "SELECT COUNT(*) FROM orders WHERE status=$1",
    ["pending"]
  );

  const totalPendingOrders = Number(totalOrders[0].count);

  // -----------------------
  // PENDING REQUEST
  // -----------------------
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
    AND u.role = $2
    `,
    ["pending", "member"]
  );

  // -----------------------
  // APPROVED MEMBERS
  // -----------------------
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
    AND u.role = $2
    `,
    ["approved", "member"]
  );

  // -----------------------
  // BANNED MEMBERS
  // -----------------------
  const bannedMembers = await query(
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
    AND u.role = $2
    `,
    ["banned", "member"]
  );

  // -----------------------
  // TOP REFERRER
  // -----------------------
  const topReferrer = await query(`
    SELECT 
        u.username,
        up.first_name,
        up.middle_name,
        up.last_name,
        COUNT(r.id) AS total_referred
    FROM users u
    JOIN users r 
        ON r.referred_by = u.referral_code
    JOIN user_profiles up 
        ON up.user_id = u.id
    GROUP BY 
        u.username,
        up.first_name,
        up.middle_name,
        up.last_name
    ORDER BY total_referred DESC
    LIMIT 1;
  `);

  // -----------------------
  // REVENUE
  // -----------------------
  const revenueResult = await query(`
    SELECT
        COALESCE(
            (
                SELECT SUM(amount)
                FROM transactions
                WHERE status = 'approved'
            ), 0
        )
        -
        COALESCE(
            (
                SELECT SUM(reward_amount)
                FROM referral_rewards
            ), 0
        )::float AS admin_revenue;
  `);

  const revenue = revenueResult[0];

  // -----------------------
  // TOTAL REQUESTS
  // -----------------------
  const totalPendingRequest = await query(
    "SELECT COUNT(*) FROM users WHERE status=$1",
    ["pending"]
  );

  const totalRequest = Number(totalPendingRequest[0].count);

  // -----------------------
  // FINAL RESPONSE
  // -----------------------
  return {
    totalMembers,
    totalRequest,
    topReferrer,
    revenue,
    pendingRequest,
    approvedMembers,
    bannedMembers,
    totalPendingOrders,
  };
}