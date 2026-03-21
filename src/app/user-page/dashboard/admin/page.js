"use client"
import Image from "next/image";
import { useRouter } from "next/navigation";

import Card from "../../components/card";

export default function Dashboard() {
    const router = useRouter();

    function GoProfile() {
        router.push("/profile");
    }

    return (
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
                        <p>Placeholder Name</p>
                    </button>
                </div>

                {/* DASHBOARD BOXES */}
                <div className="grid grid-cols-4 auto-rows-[130px] gap-5 w-full">
                    <Card title="Total Members" value="1,254" info="+12% from last week"/>
                    <Card title="Active Users" value="389" info="+8% today"/>
                    <Card title="Total Members" value="1,254" info="+12% from last week" rowSpan={2}/>
                    <Card title="Total Members" value="1,254" info="+12% from last week" rowSpan={2}/>
                    <Card title="System Alerts" value="No alerts" info=" "/>
                    <Card title="Revenue" value="$12,430" info="+5% from last month"/>
                    <Card title="Top Referrers" value="1,254" info="+12% from last week" colSpan={2} rowSpan={2}/>
                    <Card title="Pending Requests" value="8" info="2 approved today"/>
                    <Card title="Recent Activity" value="JohnDoe signed in" info=" "/>
                    <Card title="Total Members" value="1,254" info="+12% from last week"/>
                    <Card title="Server Status" value="All Green" info="No downtime"/>
                </div>
            </div>
        </div>
    );
}