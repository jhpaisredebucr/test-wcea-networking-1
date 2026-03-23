"use client"
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Card from "../../components/card";

export default function Dashboard() {
    //User's Data
    const [userInfo, setUserInfo] = useState(null);
    const [profile, setUserProfile] = useState(null);
    const [contacts, setUserContacts] = useState(null);
    const [address, setUserAddress] = useState(null);

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
    }, []);

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
                        <p>{profile?.first_name} {profile?.last_name}</p>
                    </button>
                </div>

                {/* DASHBOARD BOXES */}
                <div className="grid grid-cols-4 auto-rows-[130px] gap-5 w-full">
                    <Card title="" value="" info=""/>
                    <Card title="" value="" info=""/>
                    <Card title="" value="" info="" rowSpan={2}/>
                    <Card title="" value="" info="" rowSpan={2}/>
                    <Card title="" value="" info=""/>
                    <Card title="" value="" info=""/>
                    <Card title="" value="" info="" colSpan={2} rowSpan={2}/>
                    <Card title="" value="" info=""/>
                    <Card title="" value="" info=""/>
                    <Card title="" value="" info=""/>
                    <Card title="" value="" info=""/>
                </div>
            </div>
        </div>
    );
}