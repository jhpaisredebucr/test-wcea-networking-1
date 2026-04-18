import DashboardAdmin from "@/app/components/admin/Dashboard";
import { getUserFromToken } from "@/lib/users";
import { getAdminAnalytics } from "@/lib/analytics";
import { cookies } from "next/headers";

export const revalidate = 60;

export default async function AdminPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  // USER
  const userData = await getUserFromToken(token);

  // DASHBOARD
  const dashboardData = await getAdminAnalytics();

  return (
    <DashboardAdmin
      dashboardData={dashboardData}
      userData={userData}
    />
  );
}