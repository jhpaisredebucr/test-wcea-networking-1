"use client"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import SideBar from "../sidebar";
import Profile from "@/app/cmpnts/common/profile";
import DashboardAdmin from "./dashboard";
import MembersAdmin from "./members";

export default function AdminDashboard({dashboardData, userData}) {
    const [profile, setUserProfile] = useState(null);

    const [page, setPage] = useState(1);
    const router = useRouter();

    function GoProfile() {
        router.push("/profile");
    }

    function Debug() {
        console.log(dashboardData);
        console.log(userData);
    }

    useEffect(() => {
        const userID = localStorage.getItem("userID");
        if (!userID) return;

        fetch(`/api/users?user-id=${userID}`)
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setUserProfile(data.profile);
                }
            });
    }, []);

    return (
        <>
            <SideBar page={page} setPage={setPage} role="admin"/>
            <div className="w-full flex">
                {/* MAIN CONTENT */}
                <div className="w-full ml-56 px-20 py-7  min-h-screen">
                    <div className="flex items-center justify-between mb-6">
                        {page === 1 && <p className="text-3xl font-semibold">Dashboard</p>}
                        {page === 2 && <p className="text-3xl font-semibold">Members</p>}
                        {page === 3 && <p className="text-3xl font-semibold">Transactions</p>}
                        {page === 4 && <p className="text-3xl font-semibold">Announcement</p>}
                        {page === 5 && <p className="text-3xl font-semibold">Actions</p>}

                        <Profile GoProfile={GoProfile} first_name={userData?.profile?.first_name} last_name={userData?.profile?.last_name}/>
                    </div>

                    {page === 1 && <DashboardAdmin dashboardData={dashboardData}/>}
                    {page === 2 && <MembersAdmin dashboardData={dashboardData}/>}
                    <button onClick={Debug} className="w-20 h-20 bg-gray-400">TEST DEBUG</button>
                </div>
            </div>
        </>
    );
}