import { query } from "@/lib/db";

export async function getAnnouncements(limit = 5, offset = 0) {
  const announcements = await query(
    `SELECT * 
     FROM announcement 
     ORDER BY id DESC 
     LIMIT $1 OFFSET $2`,
    [limit, offset]
  );

  return announcements;
}