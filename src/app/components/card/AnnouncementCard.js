"use client";

import { useState } from "react";
import Profile from "@/app/components/ui/Profile";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import ConfirmModal from "../modal/ConfirmModal";

export default function AnnouncementCard({ announcements, role }) {

    const [openDelete, setOpenDelete] = useState(false);

    async function DeletePost(id) {
        try {
            const res = await fetch(`/api/announcement/delete?id=${id}`, {
                method: "DELETE"
            });

            const data = await res.json();

            if (!data.success) {
                alert("Failed to delete");
                return;
            }

            //this aint def right, it reloads the full page lol
            window.location.reload();

        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div>
            <div className="p-5 rounded-lg shadow-[0_0_4px_rgba(0,0,0,0.15)] bg-white">

                <div className="flex justify-between items-center">

                    <Profile
                        first_name="WCEA"
                        last_name=""
                        profile="logo_ett0lg"
                        clickable={false}
                    >
                        <p className="text-sm text-gray-400">
                            {formatDistanceToNow(
                                new Date(announcements?.created_at),
                                { addSuffix: true }
                            )}
                        </p>
                    </Profile>

                    {role === "admin" && (
                        <>
                            <Image
                                src="/icons/delete-circled-outline.svg"
                                alt="icon"
                                width={20}
                                height={20}
                                className="cursor-pointer"
                                onClick={() => setOpenDelete(true)}
                            />

                            <ConfirmModal
                                isOpen={openDelete}
                                onClose={() => setOpenDelete(false)}
                                onConfirm={() => DeletePost(announcements?.id)}
                                title="Delete Announcement?"
                                content="Are you sure you want to delete this post? This action cannot be undone."
                                button="Delete"
                                buttonColor="bg-red-400"
                            />
                        </>
                    )}

                </div>

                <p className="font-semibold my-5">
                    {announcements?.title}
                </p>

                <p>{announcements?.short_description}</p>
            </div>
        </div>
    );
}