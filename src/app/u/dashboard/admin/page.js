import AdminDashboard from "../../components/common/admin/AdminPage";
import { cookies } from "next/headers";

export default async function AdminPage() {
    const API_HOST = process.env.NEXT_PUBLIC_API_HOST;
    //USER INFO
    async function GetUserData() {
        const cookieStore = await cookies();
        const userID = cookieStore.get("userID")?.value;

        console.log("userID:", userID);

        if (!userID) return null;

        const res = await fetch(`${API_HOST}/api/users?user-id=${userID}`);
        const data = await res.json();

        console.log("User data response:", data);

        return data.success ? data : null;
    }

    async function Analytics() {
        const res = await fetch(`${API_HOST}/api/portal/admin/analytics`);
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