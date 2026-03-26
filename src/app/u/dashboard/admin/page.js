"use client"
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Card from "../../cmpnts/common/card";
import SideBar from "../../cmpnts/common/sidebar";
import Profile from "@/app/cmpnts/common/profile";
import DashboardAdmin from "../../cmpnts/common/admin/dashboard";
import MembersAdmin from "../../cmpnts/common/admin/members";

export default function Dashboard() {
    //User's Data
    const [userInfo, setUserInfo] = useState(null);
    const [profile, setUserProfile] = useState(null);
    const [contacts, setUserContacts] = useState(null);
    const [address, setUserAddress] = useState(null);

    //Analytics
    const [dashboardData, setDashboardData] = useState(null);

    const [page, setPage] = useState(1);
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
                    setUserContacts(data.contacts);
                    setUserAddress(data.address);
                    console.log(data);
                }
            });

        async function Analytics() {
            const res = await fetch("/api/portal/admin/analytics");
            const data = await res.json();

            setDashboardData(data.dashboardData);
        }

        Analytics();
    }, []);

    // GetUser();

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

                        <Profile GoProfile={GoProfile} first_name={profile?.first_name} last_name={profile?.last_name}/>
                    </div>

                    {page === 1 && <DashboardAdmin dashboardData={dashboardData}/>}
                    {page === 2 && <MembersAdmin dashboardData={dashboardData}/>}
                </div>
            </div>
        </>
    );
}