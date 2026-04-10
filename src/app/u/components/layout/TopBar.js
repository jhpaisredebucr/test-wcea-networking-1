"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import NotificationDropdown from "@/app/components/ui/NotifDropdown";
import Profile from "@/app/components/ui/Profile";
import { useRouter } from "next/navigation";
import ProfileDropdown from "@/app/components/ui/ProfileDropdown";

export default function TopBar({ userData }) {

    const router = useRouter();

    const [isNotifDropdownOpen, setIsNotifDropdownOpen] = useState(false);
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

    const notifRef = useRef(null);
    const profileRef = useRef(null);

    const toggleNotifDropdown = () => {
        setIsNotifDropdownOpen(prev => !prev);
        setIsProfileDropdownOpen(false);
    };

    const toggleProfileDropdown = () => {
        setIsProfileDropdownOpen(prev => !prev);
        setIsNotifDropdownOpen(false);
    };

    function GoProfile() {
        router.push("/u/profile");
    }

    function GoHome() {
        router.push("/home");
    }

    useEffect(() => {

        function handleClickOutside(event) {

            if (
                notifRef.current &&
                !notifRef.current.contains(event.target)
            ) {
                setIsNotifDropdownOpen(false);
            }

            if (
                profileRef.current &&
                !profileRef.current.contains(event.target)
            ) {
                setIsProfileDropdownOpen(false);
            }

        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };

    }, []);

    return (
        <div className="flex sticky items-center justify-between h-15 px-5 bg-white top-0 z-20">

            {/* LEFT SIDE */}
            <div className="flex items-center">
                <button onClick={GoHome}>
                    <Image
                        src="/images/logo.ico"
                        alt="logo"
                        width={35}
                        height={35}
                        className="object-contain mr-2"
                    />
                </button>

                <span className="text-3xl font-semibold text-blue-500">
                    WC
                </span>

                <span className="text-3xl font-semibold ml-1">
                    EA
                </span>
            </div>


            {/* RIGHT SIDE */}
            <div className="flex items-center px-8">

                {/* NOTIFICATIONS */}
                <div ref={notifRef}>

                    <Image
                        src="/images/notification-icon.png"
                        width={25}
                        height={25}
                        alt="notification icon"
                        className="mr-3 cursor-pointer"
                        onClick={toggleNotifDropdown}
                    />

                    <div
                        className={`transition-all z-11 duration-200 ${
                            isNotifDropdownOpen
                                ? "opacity-100 translate-y-4"
                                : "opacity-0 -translate-y-2 pointer-events-none"
                        }`}
                    >
                        <NotificationDropdown>
                            <p className="text-sm text-gray-500">
                                No new notifications
                            </p>
                        </NotificationDropdown>
                    </div>

                </div>


                {/* PROFILE */}
                <div ref={profileRef}>

                    <Profile GoProfile={toggleProfileDropdown} />

                    <div
                        className={`transition-all z-11 duration-200 ${
                            isProfileDropdownOpen
                                ? "opacity-100 translate-y-4"
                                : "opacity-0 -translate-y-2 pointer-events-none"
                        }`}
                    >
                        <ProfileDropdown userData={userData}>

                            <button
                                className="flex justify-between w-full p-2 rounded-lg hover:bg-gray-100"
                                onClick={GoProfile}
                            >
                                Edit Profile
                            </button>

                            <button
                                className="flex justify-between w-full p-2 rounded-lg hover:bg-gray-100"
                                onClick={GoHome}
                            >
                                Sign Out
                            </button>

                        </ProfileDropdown>

                    </div>

                </div>

            </div>

        </div>
    );
}