import { query } from "@/lib/db";

export async function getMemberDashboardData({
  userReferralCode,
  limit = 20,
  offset = 0,
}) {
  try {
    if (!userReferralCode) {
      throw new Error("userReferralCode required");
    }

    const safeLimit = Math.min(parseInt(limit), 100);
    const safeOffset = parseInt(offset);

    // Get referred members
    const referredMembers = await query(
      `
      SELECT 
          u.id,
          u.username,
          u.status,
          u.referral_code,
          u.created_at,
          p.first_name,
          p.last_name,
          (
            SELECT COUNT(*) 
            FROM users u2 
            WHERE u2.referred_by = u.referral_code
          ) AS total_count
      FROM users u
      JOIN user_profiles p ON p.user_id = u.id
      WHERE u.referred_by = $1
      ORDER BY u.created_at DESC
      LIMIT $2 OFFSET $3
      `,
      [userReferralCode, safeLimit, safeOffset]
    );

    const totalReferredMembers =
      referredMembers.length > 0
        ? Number(referredMembers[0].total_count)
        : 0;

    const pendingCount = referredMembers.filter(
      (member) => member.status === "pending"
    ).length;

    // Total commission
    const totalCommissionRes = await query(
      `
      SELECT COALESCE(SUM(rr.reward_amount), 0) AS total_commission
      FROM referral_rewards rr
      JOIN users u ON u.id = rr.referrer_id
      WHERE u.referral_code = $1
      `,
      [userReferralCode]
    );

    // Total spent
    const totalOrderRes = await query(
      `
      SELECT COALESCE(SUM(p.price), 0) AS total_spent
      FROM orders o
      JOIN products p ON o.product_id = p.id
      JOIN users u ON u.id = o.user_id
      WHERE u.referral_code = $1
      `,
      [userReferralCode]
    );

    const totalCommissionValue = Number(
      totalCommissionRes[0]?.total_commission || 0
    );

    const totalSpent = Number(
      totalOrderRes[0]?.total_spent || 0
    );

    const userBalance = totalCommissionValue - totalSpent;

    return {
      dashboardData: {
        totalReferredMembers,
        pendingCount,
        totalCommissionValue,
        userBalance,
        referredMembers,
      },
      pagination: {
        limit: safeLimit,
        offset: safeOffset,
        total: totalReferredMembers,
        hasMore: referredMembers.length === safeLimit,
      },
    };
  } catch (error) {
    console.error("[getReferralDashboardData] error:", error);
    throw error;
  }
}
