import MemberDashboard from "../../cmpnts/common/member/member_page";
import { cookies } from "next/headers";

export default async function MemberPage() {
    const API_HOST = process.env.NEXT_PUBLIC_API_HOST;

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

    async function GetAnouncement() {
        const res = await fetch(`${API_HOST}/api/announcement`);
        const data = await res.json();
        return data.announcements;
    }
    
    async function GetProducts() {
        const res = await fetch(`${API_HOST}/api/products`);
        const data = await res.json();
        return data.products;
    }

    async function GetOrders() {
        const res = await fetch(`${API_HOST}/api/products/orders`);
        const data = await res.json();
        return data.orders;
    }

    async function GetDashboardData(userReferralCode) {
        const res = await fetch(`${API_HOST}/api/portal/member?userReferralCode=${userReferralCode?.userInfo?.referral_code}`);
        const data = await res.json();
        return data.dashboardData;
    }

    const userData = await GetUserData();
    const announcements = await GetAnouncement();
    const products = await GetProducts();
    const orders = await GetOrders();
    const dashboardData = await GetDashboardData(userData);

    return (
        <MemberDashboard userData={userData} announcements={announcements} products={products} orders={orders} dashboardData={dashboardData}/>
    )
}