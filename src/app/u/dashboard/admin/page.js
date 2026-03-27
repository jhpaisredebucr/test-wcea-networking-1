export const dynamic = "force-dynamic";

import AdminDashboard from "../../cmpnts/common/admin/admin_page";
import { cookies } from "next/headers";
import { getAdminAnalytics } from "../../../../../lib/admin_analytics_db";
import { query } from "../../../../../lib/db";

export default async function AdminPage() {
  // --- USER INFO ---
  const cookieStore = await cookies();
  const userCookieEntry = Array.from(cookieStore).find(([name]) => name === "userID");
  const userID = userCookieEntry?.[1]?.value;

  if (!userID) {
    // no user ID cookie → redirect or return null
    return <div>Please log in</div>;
  }

  // Fetch user data directly from DB
  const userResult = await query(
    `
      SELECT u.id, u.username, u.role, p.first_name, p.last_name
      FROM users u
      LEFT JOIN user_profiles p ON p.user_id = u.id
      WHERE u.id = $1
    `,
    [userID]
  );

  const userData = userResult[0] || null;

  // --- DASHBOARD DATA ---
  const dashboardData = await getAdminAnalytics();

  return (
    <AdminDashboard dashboardData={dashboardData} userData={userData} />
  );
}