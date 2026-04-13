'use client';

import { useEffect, useState } from "react";
import AnnouncementMember from "@/app/components/ui/member/Announcement";
import Image from "next/image";
import AddAnnouncementModal from "@/app/components/ui/AddAnnouncementModal";

export default function AnnouncementAdminPage() {
    const [openModal, setOpenModal] = useState(false);
    const [announcements, setData] = useState([]);

    useEffect(() => {
        fetch("/api/announcement")
        .then(res => res.json())
        .then(d => setData(d.announcements));
    }, []);

    return (
        <>
            <div className={`flex justify-between items-center mb-5`}>
                <h1 className="text-3xl font-semibold mb-6">Announcement</h1>
                <button onClick={() => setOpenModal(true)}>
                    <Image src="/icons/plus-circle.svg" alt="plus icon" width={50} height={50}/>
                </button>
            </div>
        
        <AddAnnouncementModal
                isOpen={openModal}
                onClose={() => setOpenModal(false)}
            />
        <AnnouncementMember announcements={announcements} />
        </>
    );
}