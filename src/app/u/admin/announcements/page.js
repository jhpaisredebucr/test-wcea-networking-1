'use client';

import { useEffect, useState } from "react";
import AnnouncementMember from "@/app/components/ui/member/Announcement";
import Image from "next/image";
import AddAnnouncementModal from "@/app/components/ui/AddAnnouncementModal";

export default function AnnouncementAdminPage() {

    const [openModal, setOpenModal] = useState(false);
    const [announcements, setAnnouncements] = useState([]);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {

        const loadData = async () => {

            try {
                setLoading(true);

                // 1. Get user (server should read cookies)
                const userRes = await fetch("/api/users");
                const userJson = await userRes.json();

                if (!userJson.success) {
                    throw new Error("Failed to load user");
                }

                setUserData(userJson);
                console.log("user json: ", userJson);
                

                // 2. Get announcements
                const announcementRes = await fetch("/api/announcement");
                const announcementJson = await announcementRes.json();

                setAnnouncements(announcementJson.announcements || []);

            } catch (err) {
                console.error(err);
                setError(err.message);

            } finally {
                setLoading(false);
            }
        };

        loadData();

    }, []);

    return (
        <>
        {/* <button onClick={() => {console.log("user data: ", userData)}}>DEBUGGGGG</button> */}
            <div className="flex justify-between items-center mb-5">
                <h1 className="text-3xl font-semibold">Announcement</h1>

                <button onClick={() => setOpenModal(true)} className="flex items-center bg-(--primary) py-2 px-5 rounded-lg text-white gap-2 cursor-pointer">
                    <Image
                        src="/icons/plus-circle.svg"
                        alt="plus icon"
                        width={20}
                        height={20}
                    />
                    Post
                </button>
            </div>

            <AddAnnouncementModal
                isOpen={openModal}
                onClose={() => setOpenModal(false)}
            />

            <AnnouncementMember
                announcements={announcements}
                userData={userData}
            />

            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}
        </>
    );
}