export const dynamic = "force-dynamic";

import AdminDashboard from "../../cmpnts/common/admin/admin_page";
import { cookies } from "next/headers";

export default async function AdminPage() {
    const baseURL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    //USER INFO
    async function GetUserData() {
        const cookieStore = await cookies();

        const userCookieEntry = Array.from(cookieStore)
            .find(([name]) => name === "userID");

        const userID = userCookieEntry?.[1]?.value;

        console.log("userID:", userID);

        if (!userID) return null;

        const res = await fetch(`${baseURL}/api/users?user-id=${userID}`);
        const data = await res.json();

        if (data.success) {
            return data;
        }
        return null;
    }

    async function Analytics() {
        const res = await fetch(`${baseURL}/api/portal/admin/analytics`);
        const data = await res.json();
        return data.dashboardData;
    }

    // DASHBOARD DATA
    const dashboardData = await Analytics();
    const userData = await GetUserData();

    return (
        <div>
            <AdminDashboard dashboardData={dashboardData} userData={userData}/>
        </div>
    );
}