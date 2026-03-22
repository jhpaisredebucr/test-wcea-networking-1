"use client"
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Dashboard() {
    const router = useRouter();

    function GoProfile() {
        router.push("/profile");
    }

    function GoAdvisoryInfo(){
        router.push("/advisory-info")
    }
    return (
        <div className="w-full flex">

            {/* MAIN CONTENT */}
            <div className="w-full ml-56 px-20 py-7 bg-gray-100 min-h-screen">
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
                        <p>Admin Name</p>
                    </button>
                </div>

                {/* DASHBOARD BOXES */}
                <div className="grid grid-cols-4 auto-rows-[130px] gap-5 w-full">
                    {/* Total Members */}
                    <div className="bg-white rounded-2xl shadow-sm p-5 flex flex-col justify-between">
                        <p className="text-gray-400 text-sm">Total Members</p>
                        <p className="text-2xl font-bold">1,254</p>
                        <p className="text-green-500 text-sm mt-2">+12% from last week</p>
                    </div>

                    {/* Active Users */}
                    <div className="bg-white rounded-2xl shadow-sm p-5 flex flex-col justify-between">
                        <p className="text-gray-400 text-sm">Active Users</p>
                        <p className="text-2xl font-bold">389</p>
                        <p className="text-green-500 text-sm mt-2">+8% today</p>
                    </div>

                    {/* New Signups (row-span 2) */}
                    <div className="bg-white rounded-2xl row-span-2 shadow-sm p-5">
                        <p className="text-gray-400 text-sm mb-2">New Signups</p>
                        <div className="w-full h-full flex items-center justify-center text-gray-300">
                            [Chart Placeholder]
                        </div>
                    </div>

                    {/* Referral Stats (row-span 2) */}
                    <div className="bg-white rounded-2xl row-span-2 shadow-sm p-5">
                        <p className="text-gray-400 text-sm mb-2">Referral Stats</p>
                        <div className="w-full h-full flex items-center justify-center text-gray-300">
                            [Chart Placeholder]
                        </div>
                    </div>

                    {/* System Alerts */}
                    <div className="bg-white rounded-2xl shadow-sm p-5">
                        <p className="text-gray-400 text-sm mb-2">System Alerts</p>
                        <ul className="text-sm space-y-1 text-red-500">
                            <li>No alerts</li>
                        </ul>
                    </div>

                    {/* Revenue / Payments */}
                    <div className="bg-white rounded-2xl shadow-sm p-5 flex flex-col justify-between">
                        <p className="text-gray-400 text-sm">Revenue</p>
                        <p className="text-2xl font-bold">$12,430</p>
                        <p className="text-green-500 text-sm mt-2">+5% from last month</p>
                    </div>

                    {/* Top Referrers (col-span 2 row-span 2) */}
                    <div className="bg-white rounded-2xl col-span-2 row-span-2 shadow-sm p-5">
                        <p className="text-gray-400 text-sm mb-2">Top Referrers</p>
                        <ul className="text-sm space-y-1">
                            <li>JohnDoe – 15 referrals</li>
                            <li>JaneSmith – 12 referrals</li>
                            <li>Mike89 – 9 referrals</li>
                        </ul>
                    </div>

                    {/* Pending Requests */}
                    <div className="bg-white rounded-2xl shadow-sm p-5 flex flex-col justify-between">
                        <p className="text-gray-400 text-sm">Pending Requests</p>
                        <p className="text-2xl font-bold">8</p>
                        <p className="text-green-500 text-sm mt-2">2 approved today</p>
                    </div>

                    {/* Recent Activity */}
                    <div className="bg-white rounded-2xl shadow-sm p-5">
                        <p className="text-gray-400 text-sm mb-2">Recent Activity</p>
                        <ul className="text-sm space-y-1">
                            <li>JohnDoe signed in</li>
                            <li>JaneSmith referred 2 users</li>
                            <li>Mike89 upgraded to premium</li>
                        </ul>
                    </div>

                    {/* Chart Placeholder */}
                    <div className="bg-white rounded-2xl shadow-sm p-5 flex items-center justify-center text-gray-300">
                        [Chart Placeholder]
                    </div>

                    {/* Another Metrics Box */}
                    <div className="bg-white rounded-2xl shadow-sm p-5 flex flex-col justify-between">
                        <p className="text-gray-400 text-sm">Server Status</p>
                        <p className="text-2xl font-bold">All Green</p>
                        <p className="text-green-500 text-sm mt-2">No downtime</p>
                    </div>
                </div>
            </div>
        </div>
    );
}