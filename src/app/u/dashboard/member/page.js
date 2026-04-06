"use client"
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AnouncementMember from "../../components/common/member/Announcement";
import DashboardMember from "../../components/common/member/Dashboard";
import ProductsMember from "../../components/common/member/ProductShop";
import OrdersMember from "../../components/common/member/MyOrders";
import ReferralsMember from "../../components/common/member/Referrals";
import SideBar from "../../components/layout/SideBar";
import Profile from "@/app/components/ui/Profile";

export default function Dashboard() {
    // User's Data
    const [userInfo, setUserInfo] = useState(null);
    const [profile, setUserProfile] = useState(null);
    const [contacts, setUserContacts] = useState(null);
    const [address, setUserAddress] = useState(null);
    const [dashboardData, setDashboardData] = useState(null);

    const [announcements, setAnouncement] = useState(null);
    const [products, setProducts] = useState(null);
    const [orders, setOrders] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [page, setPage] = useState(1);

    const router = useRouter();

    function GoProfile() {
        router.push("/profile");
    }

    // Helper function to safely fetch JSON
    const fetchJson = async (url, options = {}) => {
        try {
            const res = await fetch(url, options);
            
            // Check if response is ok
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            // Check if response has content
            const contentLength = res.headers.get('content-length');
            if (contentLength === '0') {
                throw new Error('Empty response');
            }

            const data = await res.json();
            return data;
        } catch (error) {
            if (error.message.includes('Unexpected end of JSON input')) {
                throw new Error('Invalid JSON response from server');
            }
            throw error;
        }
    };

    useEffect(() => {
        const loadUserData = async () => {
            setLoading(true);
            setError(null);

            try {
                const userID = localStorage.getItem("userID");
                if (!userID) {
                    setError("No user ID found. Please log in again.");
                    return;
                }

                // Fetch user data
                const userData = await fetchJson(`/api/users?user-id=${userID}`);
                if (userData.success) {
                    setUserInfo(userData.userInfo);
                    setUserProfile(userData.profile);
                    setUserContacts(userData.contacts);
                    setUserAddress(userData.address);
                    console.log("User data:", userData);
                } else {
                    setError("Failed to load user data");
                }

                // Fetch other data in parallel
                const [announcementsRes, productsRes, ordersRes] = await Promise.all([
                    fetchJson("/api/announcement"),
                    fetchJson("/api/products"),
                    fetchJson("/api/products/orders")
                ]);

                setAnouncement(announcementsRes.announcements);
                setProducts(productsRes.products);
                setOrders(ordersRes.orders);

            } catch (err) {
                console.error("Error loading data:", err);
                setError(err.message || "Failed to load data");
            } finally {
                setLoading(false);
            }
        };

        loadUserData();
    }, []);

    useEffect(() => {
        const loadDashboardData = async () => {
            if (!userInfo?.referral_code) return;

            try {
                const data = await fetchJson(`/api/portal/member?userReferralCode=${userInfo.referral_code}`);
                setDashboardData(data.dashboardData);
            } catch (err) {
                console.error("Error loading dashboard data:", err);
                setError("Failed to load dashboard data");
            }
        };

        loadDashboardData();
    }, [userInfo]);

    // Show loading or error state
    if (loading) {
        return (
            <div className="w-full flex">
                <div className="w-full ml-56 px-20 py-7 bg-gray-100 min-h-screen flex items-center justify-center">
                    <div className="text-xl">Loading...</div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-full flex">
                <div className="w-full ml-56 px-20 py-7 bg-gray-100 min-h-screen flex items-center justify-center">
                    <div className="text-red-500 text-xl max-w-md text-center">
                        <p>{error}</p>
                        <button 
                            onClick={() => window.location.reload()} 
                            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            Retry
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <>
            <SideBar page={page} setPage={setPage}/>
            
            <div className="w-full flex">
                {/* MAIN CONTENT */}
                <div className="w-full ml-56 px-20 py-7 bg-gray-100 min-h-screen">
                    <div className="flex items-center justify-between mb-6">
                        {page === 1 && <p className="text-3xl font-semibold">Announcement</p>}
                        {page === 2 && <p className="text-3xl font-semibold">Dashboard</p>}
                        {page === 3 && <p className="text-3xl font-semibold">Product Shop</p>}
                        {page === 4 && <p className="text-3xl font-semibold">My Orders</p>}
                        {page === 5 && <p className="text-3xl font-semibold">Referrals</p>}

                        <Profile 
                            GoProfile={GoProfile} 
                            first_name={profile?.first_name} 
                            last_name={profile?.last_name}
                        />
                    </div>
                    
                    {page === 1 && <AnouncementMember announcements={announcements}/>}
                    {page === 2 && <DashboardMember dashboardData={dashboardData}/>}
                    {page === 3 && <ProductsMember products={products} userInfo={userInfo}/>}
                    {page === 4 && <OrdersMember orders={orders} products={products} userInfo={userInfo}/>}
                    {page === 5 && <ReferralsMember userInfo={userInfo} dashboardData={dashboardData}/>}
                </div>
            </div>
        </>
    );
}