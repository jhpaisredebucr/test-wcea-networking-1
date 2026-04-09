"use client"
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AnnouncementMember from "../../components/member/Announcement";
import DashboardMember from "../../components/member/Dashboard";
import ProductsMember from "../../components/member/ProductShop";
import OrdersMember from "../../components/member/MyOrders";
import ReferralsMember from "../../components/member/Referrals";
import SideBar from "../../components/layout/SideBar";
import Profile from "@/app/components/ui/Profile";
import Transactions from "../../components/member/Transactions";

export default function Dashboard() {
    // User's Data
    const [dashboardData, setDashboardData] = useState(null);

    const [user, setUser] = useState({
        info: null,
        profile: null,
        contacts: null,
        address: null
    });

    const titles = {
        announcement: "Announcement",
        dashboard: "Dashboard",
        products: "Product Shop",
        orders: "My Orders",
        referrals: "Referrals",
        transactions: "Transactions"
    };


    const [announcements, setAnnouncement] = useState(null);
    const [products, setProducts] = useState(null);
    const [orders, setOrders] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [page, setPage] = useState("dashboard");

    const router = useRouter();

    function GoProfile() {
        router.push("/profile");
    }

    // Helper function to safely fetch JSON
    const fetchJson = async (url, options = {}) => {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 10000);

        try {
            const res = await fetch(url, {
                ...options,
                signal: controller.signal
            });

            if (!res.ok) throw new Error(`HTTP ${res.status}`);

            return await res.json();
        } catch (err) {
            if (err.name === "AbortError") {
                throw new Error("Request timed out");
            }
            throw err;
        } finally {
            clearTimeout(timeout);
        }
    };

    useEffect(() => {
        const loadUserData = async () => {
            setLoading(true);
            setError(null);

            try {
                // const userID = localStorage.getItem("userID");
                // if (!userID) {
                //     setError("No user ID found. Please log in again.");
                //     return;
                // }

                // const userData = await fetchJson(`/api/users?user-id=${userID}`);


                // Fetch user data
                const userData = await fetchJson("/api/users", { credentials: "include" });

                if (userData.success) {
                    setUser({
                        info: userData.userInfo,
                        profile: userData.profile,
                        contacts: userData.contacts,
                        address: userData.address
                    });
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

                setAnnouncement(announcementsRes.announcements);
                setProducts(productsRes.products);
                setOrders(ordersRes.orders);

            } catch (err) {
                console.error("Error loading data:", err);

                // Map some common errors to friendly messages
                let friendlyMessage = "Failed to load data. Please try again.";
                if (err.message.includes("Request timed out")) {
                    friendlyMessage = "Server is taking too long to respond. Try again later.";
                } else if (err.message.includes("Failed to fetch")) {
                    friendlyMessage = "Unable to connect to the server. Check your internet connection.";
                } else if (err.message.includes("No user ID")) {
                    friendlyMessage = "You are not logged in. Please log in to continue.";
                }

                setError(friendlyMessage);
            } finally {
                setLoading(false);
            }
        };

        loadUserData();
    }, []);

    useEffect(() => {
        const loadDashboardData = async () => {
            if (!user.info?.referral_code) return;

            try {
                const data = await fetchJson(`/api/portal/member?userReferralCode=${user.info.referral_code}`);
                setDashboardData(data.dashboardData);
            } catch (err) {
                console.error("Error loading dashboard data:", err);
                setError("Failed to load dashboard data");
            }
        };

        loadDashboardData();
    }, [user.info]);

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
                    <div className="text-red-500 text-xl max-w-md text-center flex flex-col items-center gap-4 ">
                        <p>{error}</p>
                        <button 
                            onClick={() => window.location.reload()} 
                            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            Retry
                        </button>
                        <button
                            onClick={() => router.push("/")}
                            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600/50"
                        >
                            Go Back to Home
                        </button>

                    </div>
                </div>
            </div>
        );
    }

    const pages = {
        announcement: <AnnouncementMember announcements={announcements} />,
        dashboard: <DashboardMember dashboardData={dashboardData} />,
        products: <ProductsMember products={products} userInfo={user.info} />,
        orders: <OrdersMember orders={orders} products={products} userInfo={user.info} />,
        referrals: <ReferralsMember userInfo={user.info} dashboardData={dashboardData} />,
        transactions: <Transactions />
    };

   return (
        <>
            <SideBar page={page} setPage={setPage}/>

            <div className="w-full flex">
                <div className="w-full ml-56 px-20 py-7 bg-gray-100 min-h-screen">
                    
                    {/* HEADER */}
                    <div className="flex items-center justify-between mb-6">
                        
                        {/* TITLE */}
                        <p className="text-3xl font-semibold">
                            {titles[page] || "Dashboard"}
                        </p>

                        {/* PROFILE */}
                        <Profile 
                            GoProfile={GoProfile} 
                            first_name={user.profile?.first_name} 
                            last_name={user.profile?.last_name}
                        />
                    </div>

                    {/* PAGE CONTENT */}
                    {pages[page] ?? <div>Page not found</div>}

                </div>
            </div>  
        </>
    );
}