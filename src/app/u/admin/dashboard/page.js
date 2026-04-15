

import { cookies, headers } from "next/headers";
import DashboardAdmin from "@/app/components/ui/admin/Dashboard";

export default async function AdminPage() {

    const headersList = headers();
    const host = headersList.get("host");
    const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
    const baseUrl = `${protocol}://${host}`;


    //USER INFO
    async function GetUserData() {
        const cookieStore = await cookies();
        const userID = cookieStore.get("userID")?.value;

        console.log("userID:", userID);

        if (!userID) return null;

        const res = await fetch(`${baseUrl}/api/users?user-id=${userID}`);

        const data = await res.json();

        console.log("User data response:", data);

        return data.success ? data : null;
    }

    async function Analytics() {
        const res = await fetch(`${baseUrl}/api/portal/admin/analytics`);

        const data = await res.json();
        return data.dashboardData;
    }

    // DASHBOARD DATA
    const dashboardData = await Analytics();
    const userData = await GetUserData();

    return (
        <div>
            <DashboardAdmin dashboardData={dashboardData} userData={userData}/>
        </div>
    );
}