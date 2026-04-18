import { query } from "@/lib/db";

export async function getAdminCommissions() {
  return await query(`
    SELECT 
      rr.*,
      referrer.first_name AS referrer_first_name,
      referrer.last_name AS referrer_last_name,
      referred.first_name AS referred_first_name,
      referred.last_name AS referred_last_name
    FROM referral_rewards rr
    JOIN user_profiles referrer 
      ON rr.referrer_id = referrer.user_id
    JOIN user_profiles referred 
      ON rr.referred_id = referred.user_id
    ORDER BY rr.created_at DESC
  `);
}

export async function getUserCommissions(userId) {
  return await query(
    `
    SELECT 
      rr.*,
      referrer.first_name AS referrer_first_name,
      referrer.last_name AS referrer_last_name,
      referred.first_name AS referred_first_name,
      referred.last_name AS referred_last_name
    FROM referral_rewards rr
    JOIN user_profiles referrer 
      ON rr.referrer_id = referrer.user_id
    JOIN user_profiles referred 
      ON rr.referred_id = referred.user_id
    WHERE rr.referrer_id = $1
    ORDER BY rr.created_at DESC
    `,
    [userId]
  );
}