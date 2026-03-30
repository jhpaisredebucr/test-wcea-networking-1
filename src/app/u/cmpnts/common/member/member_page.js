"use client"
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AnouncementMember from "./anouncement";
import DashboardMember from "./dashboard";
import ProductsMember from "./product_shop";
import OrdersMember from "./my_orders";
import ReferralsMember from "./referrals";
import SideBar from "../sidebar";
import Profile from "@/app/cmpnts/common/profile";

export default function MemberDashboard({ userData, dashboardData, announcements, products, orders }) {

    const [page, setPage] = useState(1);

    const router = useRouter();


    function GoProfile() {
        router.push("/profile");
    }

    function Debug() {
        console.log("dashboard data: ", dashboardData);
        console.log("user data: ",userData);
        console.log("announcement data: ",announcements);
        console.log("products data: ",products);
        console.log("orders data: ",orders);
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

                        <Profile GoProfile={GoProfile} first_name={userData?.profile?.first_name} last_name={userData?.profile?.last_name}/>
                    </div>
                    {page === 1 && <AnouncementMember announcements={announcements}/>}
                    {page === 2 && <DashboardMember dashboardData={dashboardData}/>}
                    {page === 3 && <ProductsMember products={products} userData={userData}/>}
                    {page === 4 && <OrdersMember orders={orders} products={products} userData={userData}/>}
                    {page === 5 && <ReferralsMember userData={userData} dashboardData={dashboardData}/>}
                </div>
                {/* <button onClick={Debug} className="w-20 h-20 bg-gray-400">TEST DEBUG</button> */}
            </div>
        </>
    );
}