"use client"
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Card from "../../cmpnts/card";
import SideBar from "../../cmpnts/sidebar";

export default function Dashboard() {
    //User's Data
    const [userInfo, setUserInfo] = useState(null);
    const [profile, setUserProfile] = useState(null);
    const [contacts, setUserContacts] = useState(null);
    const [address, setUserAddress] = useState(null);

    //Analytics
    const [dashboardData, setDashboardData] = useState(null);

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
            <SideBar/>
            <div className="w-full flex">
                {/* MAIN CONTENT */}
                <div className="w-full ml-56 px-20 py-7  min-h-screen">
                    <div className="flex items-center justify-between mb-6">
                        <p className="text-3xl font-semibold">Analytics</p>

                        <button onClick={GoProfile} className="flex items-center gap-2 hover:opacity-80 transition">
                            <Image
                                src="/images/no-profile.png"
                                alt="profile picture"
                                width={40}
                                height={40}
                                className="rounded-full"
                            />
                            <p>{profile?.first_name} {profile?.last_name}</p>
                        </button>
                    </div>

                    {/* DASHBOARD BOXES */}
                    <div className="grid grid-cols-4 auto-rows-[130px] gap-5 w-full">
                        <Card title="Total Members" value={dashboardData?.totalMembers} info="+12% from last week"/>
                        <Card title="Active Users" value="0" info="+8% today"/>
                        <Card title="Total Members" value="0" info="+12% from last week" rowSpan={2}/>
                        <Card title="Total Members" value="0" info="+12% from last week" rowSpan={2}/>
                        <Card title="System Alerts" value="No alerts" info=" "/>
                        <Card title="Revenue" value="$0" info="+5% from last month"/>
                        <Card title="Top Referrers" value="0" info="+12% from last week" colSpan={2} rowSpan={2}/>
                        <Card title="Pending Requests" value={dashboardData?.totalRequest} info="0 approved today"/>
                        <Card title="Recent Activity" value="JohnDoe signed in" info=" "/>
                        <Card title="Total Members" value="0" info="+12% from last week"/>
                        <Card title="Server Status" value="All Green" info="No downtime"/>
                    </div>
                </div>
            </div>
        </>
    );
}