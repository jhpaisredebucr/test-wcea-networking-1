"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import NotificationDropdown from "@/app/components/ui/NotifDropdown";
import Profile from "@/app/components/ui/Profile";
import { useRouter } from "next/navigation";
import ProfileDropdown from "@/app/components/ui/ProfileDropdown";

export default function TopBar({ userData, onMenuToggle, isMobileMenuOpen = false }) {

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

const handleSignOut = async () => {
        try {
            const res = await fetch("/api/auth/signout", {
                method: "POST",
                credentials: "include"
            });
            if (!res.ok) throw new Error('Signout failed');
        } catch (error) {
            console.error("Sign out error:", error);
        }
        window.location.href = '/';
    };

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
        <div className="relative z-20 flex h-15 items-center justify-between border-b border-gray-100 bg-white px-3 sm:px-5">

            {/* LEFT SIDE */}
            <div className="flex items-center">
                <button
                    type="button"
                    onClick={onMenuToggle}
                    className="mr-2 rounded-md border border-gray-200 px-2 py-1 text-gray-700 md:hidden"
                    aria-label="Toggle navigation menu"
                    aria-expanded={isMobileMenuOpen}
                >
                    ☰
                </button>
                <button onClick={GoHome}>
                    <Image
                        src="/images/logo.ico"
                        alt="logo"
                        width={35}
                        height={35}
                        className="object-contain mr-2 cursor-pointer"
                    />
                </button>

                <span className="text-2xl font-semibold text-blue-500 sm:text-3xl">
                    WC
                </span>

                <span className="text-2xl font-semibold sm:text-3xl">
                    EA
                </span>
            </div>


            {/* RIGHT SIDE */}
            <div className="flex items-center gap-2 px-1 sm:px-4">

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

                    <Profile GoProfile={toggleProfileDropdown} profile={userData.profile.img_url} />

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
                                onClick={handleSignOut}
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