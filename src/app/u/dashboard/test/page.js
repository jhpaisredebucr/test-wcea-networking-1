"use client"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AnouncementMember from "../../components/common/member/Announcement";
import DashboardMember from "../../components/common/member/Dashboard";
import ProductsMember from "../../components/common/member/ProductShop";
import OrdersMember from "../../components/common/member/MyOrders";
import ReferralsMember from "../../components/common/member/Referrals";
import SideBar from "./sidebar";
import Profile from "@/app/components/ui/Profile";

export default function Dashboard() {
    const [userInfo, setUserInfo] = useState(null);
    const [profile, setUserProfile] = useState(null);
    const [dashboardData, setDashboardData] = useState(null);
    const [announcements, setAnouncement] = useState(null);
    const [products, setProducts] = useState(null);
    const [orders, setOrders] = useState(null);

    const [page, setPage] = useState(1);
    const [sidebarCollapsed, setSidebarCollapsed] = useState(true); // auto collapse on mobile !

    const router = useRouter();

    function GoProfile() {
        router.push("/profile");
    }

    useEffect(() => {
        const userID = localStorage.getItem("userID");
        if (!userID) return;

        fetch(`/api/users?user-id=${userID}`)
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setUserInfo(data.userInfo);
                    setUserProfile(data.profile);
                }
            });

        async function fetchData(endpoint, setter) {
            const res = await fetch(endpoint);
            const data = await res.json();
            setter(data?.[Object.keys(data)[0]]);
        }

        fetchData("/api/announcement", setAnouncement);
        fetchData("/api/products", setProducts);
        fetchData("/api/products/orders", setOrders);
    }, []);

    useEffect(() => {
        if (!userInfo?.referral_code) return;

        async function GetDashboardData() {
            const res = await fetch(`/api/portal/member?userReferralCode=${userInfo.referral_code}`);
            const data = await res.json();
            setDashboardData(data.dashboardData);
        }

        GetDashboardData();
    }, [userInfo]);

    return (
        <div className="flex h-screen overflow-x-hidden">
            <SideBar
                page={page}
                setPage={setPage}
                collapsed={sidebarCollapsed}
                setCollapsed={setSidebarCollapsed}
            />

            {/* MAIN CONTENT */}
            <div className={`
                flex-1 transition-all duration-300
                bg-gray-100 min-h-screen
                px-4 sm:px-6 py-6
                ${sidebarCollapsed ? 'ml-0 lg:ml-56' : 'ml-56'}
            `}>
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                        {/* HAMBORGER BUTTON */}
                        <button
                            className="lg:hidden p-2 bg-gray-200 rounded-md"
                            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        </button>

                        <p className="text-2xl sm:text-3xl font-semibold">
                            {page === 1 && "Announcement"}
                            {page === 2 && "Dashboard"}
                            {page === 3 && "Product Shop"}
                            {page === 4 && "My Orders"}
                            {page === 5 && "Referrals"}
                        </p>
                    </div>

                    <Profile
                        GoProfile={GoProfile}
                        first_name={profile?.first_name}
                        last_name={profile?.last_name}
                    />
                </div>

                {/* Pages */}
                {page === 1 && <AnouncementMember announcements={announcements} />}
                {page === 2 && <DashboardMember dashboardData={dashboardData} />}
                {page === 3 && <ProductsMember products={products} userInfo={userInfo} />}
                {page === 4 && <OrdersMember orders={orders} products={products} userInfo={userInfo} />}
                {page === 5 && <ReferralsMember userInfo={userInfo} dashboardData={dashboardData} />}
            </div>
        </div>
    );
}