"use client"
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

import SideBar from "../layout/SideBar";
import Profile from "@/app/components/ui/Profile";
import DashboardAdmin from "./Dashboard";
import MembersAdmin from "./Members";

export default function AdminDashboard({ dashboardData, userData }) {
    const [page, setPage] = useState(1);
    const router = useRouter();

    function GoProfile() {
        router.push("/profile");
    }

    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <SideBar page={page} setPage={setPage} role="admin" />

            {/* Main Content */}
            <div className="flex-1 flex flex-col bg-[#f5f6fa]">
                
                {/* Top Bar */}
                <div className="flex items-center justify-between h-15 px-10 bg-white sticky top-0 z-20">
                    <div className="flex items-center">
                        <Image 
                            src="/images/logo.ico" 
                            alt="logo" 
                            width={35} 
                            height={35} 
                            className="object-contain mr-2" 
                        />
                        <span className="text-3xl font-semibold text-blue-500">WC</span>
                        <span className="text-3xl font-semibold ml-1">EA</span>
                    </div>

                    <div className="flex items-center">
                        <Image 
                            src="/images/notification-icon.png" 
                            width={25} 
                            height={25} 
                            alt="notification icon" 
                            className="mr-3"
                        />
                        <Profile 
                            GoProfile={GoProfile} 
                            first_name={userData?.profile?.first_name} 
                            last_name={userData?.profile?.last_name} 
                            profile="no-profile.png"
                        >
                            <p className="text-sm">Admin</p>
                        </Profile>
                    </div>
                </div>

                {/* Page Content */}
                <div className="flex-1 ml-56 px-10 py-6">
                    <h1 className="text-3xl font-semibold mb-6">
                        {page === 1 && "Dashboard"}
                        {page === 2 && "Members"}
                        {page === 3 && "Transactions"}
                        {page === 4 && "Announcement"}
                        {page === 5 && "Actions"}
                    </h1>

                    {page === 1 && <DashboardAdmin dashboardData={dashboardData} />}
                    {page === 2 && <MembersAdmin dashboardData={dashboardData} />}
                    {/* Add more page components as needed */}
                </div>
            </div>
        </div>
    );
}