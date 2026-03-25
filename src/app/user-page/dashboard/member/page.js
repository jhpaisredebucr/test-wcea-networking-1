"use client"
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AnouncementMember from "../../components/pages/anouncement";
import DashboardMember from "../../components/pages/dashboard";
import ProductsMember from "../../components/pages/product_shop";
import OrdersMember from "../../components/pages/my_orders";
import ReferralsMember from "../../components/pages/referrals";
import SideBar from "../../components/sidebar";
import Profile from "@/app/components/ui/profile";

export default function Dashboard() {
    //User's Data
    const [userInfo, setUserInfo] = useState(null);
    const [profile, setUserProfile] = useState(null);
    const [contacts, setUserContacts] = useState(null);
    const [address, setUserAddress] = useState(null);

    const [announcements, setAnouncement] = useState(null);
    const [products, setProducts] = useState(null);

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

        async function GetAnouncement() {
            const res = await fetch("/api/announcement");
            const data = await res.json();
            setAnouncement(data.announcements);
        }
        
        async function GetProducts() {
            const res = await fetch("/api/products");
            const data = await res.json();
            setProducts(data.products);
        }

        GetAnouncement();
        GetProducts();
    }, []);

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

                        <Profile GoProfile={GoProfile} first_name={profile?.first_name} last_name={profile?.last_name}/>
                    </div>
                    {page === 1 && <AnouncementMember announcements={announcements}/>}
                    {page === 2 && <DashboardMember/>}
                    {page === 3 && <ProductsMember products={products}/>}
                    {page === 4 && <OrdersMember/>}
                    {page === 5 && <ReferralsMember userInfo={userInfo}/>}
                </div>
            </div>
        </>
    );
}