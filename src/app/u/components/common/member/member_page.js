"use client"
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

import AnouncementMember from "./anouncement";
import DashboardMember from "./dashboard";
import ProductsMember from "./product_shop";
import OrdersMember from "./my_orders";
import ReferralsMember from "./referrals";
import SideBar from "../sidebar";
import Profile from "@/app/components/common/profile";

export default function MemberDashboard({ userData, dashboardData, announcements, products, orders }) {
    const [page, setPage] = useState(1);
    const router = useRouter();

    function GoProfile() {
        router.push("/profile");
    }

    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <SideBar page={page} setPage={setPage} userData={userData}/>

            {/* Main Content */}
            <div className="flex-1 flex flex-col bg-[#f5f6fa]">
                
                {/* Top Bar */}
                <div className="flex items-center justify-between h-15 px-10 bg-white sticky top-0 z-20">
                    <div className="flex items-center">
                        <Image src="/images/logo.ico" alt="logo" width={35} height={35} className="object-contain mr-2"/>
                        <span><p className="text-3xl text-blue-500 font-semibold">WC</p></span><p className="text-3xl font-semibold">EA</p>
                    </div>
                    <div className="flex items-center">
                        <Image src="/images/notification-icon.png" width={25} height={25} alt="notification icon" className="mr-3"/>
                        <Profile 
                            GoProfile={GoProfile} 
                            first_name={userData?.profile?.first_name} 
                            last_name={userData?.profile?.last_name} 
                            profile="no-profile.png"
                        > <p className="text-sm">Member</p> </Profile>
                    </div>
                </div>

                {/* Page Content */}
                <div className="flex-1 ml-56 px-10 py-6">
                    <h1 className="text-3xl font-semibold mb-6">
                        {page === 1 && "Announcement"}
                        {page === 2 && "Dashboard"}
                        {page === 3 && "Product Shop"}
                        {page === 4 && "My Orders"}
                        {page === 5 && "Referrals"}
                    </h1>

                    {page === 1 && <AnouncementMember announcements={announcements} />}
                    {page === 2 && <DashboardMember dashboardData={dashboardData} userData={userData} />}
                    {page === 3 && <ProductsMember products={products} userData={userData} dashboardData={dashboardData}/>}
                    {page === 4 && <OrdersMember orders={orders} products={products} userData={userData} />}
                    {page === 5 && <ReferralsMember userData={userData} dashboardData={dashboardData} />}
                </div>
            </div>
        </div>
    );
}