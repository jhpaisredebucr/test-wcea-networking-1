'use client';
import Image from "next/image"
import { useState } from "react";
import NotificationDropdown from "@/app/components/ui/Dropdown";
import Profile from "@/app/components/ui/Profile";
import { useRouter } from "next/navigation";

export default function TopBar({userData}) {  
    const router = useRouter()
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(prev => !prev);
    };

    function GoProfile() {
        router.push("/profile");
    }
    function GoHome(){
        router.push("/home")
    }

    return (
        <div className="flex sticky items-center justify-between h-15 px-5 bg-white top-0 z-20">
            <div className="flex items-center">
                <button className="cursor-pointer" onClick={GoHome}>
                <Image 
                    src="/images/logo.ico" 
                    alt="logo" 
                    width={35} 
                    height={35} 
                    className="object-contain mr-2" 
                />
                </button>
                <span className="text-3xl font-semibold text-blue-500">WC</span>
                <span className="text-3xl font-semibold ml-1">EA</span>
            </div>

        <div className="flex items-center px-8">
            <Image 
                src="/images/notification-icon.png" 
                width={25} 
                height={25} 
                alt="notification icon" 
                className="mr-3 cursor-pointer" 
                onClick={toggleDropdown}
            />

            <div
            className={`transition-all z-11 duration-200 ${
                isDropdownOpen
                ? "opacity-100 translate-y-4"
                : "opacity-0 -translate-y-2 pointer-events-none"
            }`}
            >
            <NotificationDropdown>
                <p className="text-sm text-gray-500">No new notifications</p>
            </NotificationDropdown>
            </div>

            {/* PROFILE */}
            <Profile 
                GoProfile={GoProfile} 
                first_name={userData?.profile?.first_name} 
                last_name={userData?.profile?.last_name}
                hideName={true}
            />
            </div>
            
    </div>                      
)}