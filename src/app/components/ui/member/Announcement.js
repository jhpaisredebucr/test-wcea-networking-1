import AnnouncementCard from "../AnnouncementCard";

export default function AnnouncementMember({announcements, userData}) {
    if (!announcements) {
        return <p>Loading announcements...</p>;
    }

    const role = userData?.userInfo?.role ?? "member";

    return (
        <div className="grid grid-cols-3 gap-5">
            <div className="space-y-4 col-span-2">
                {announcements.map((announcement) => (
                    <AnnouncementCard
                        key={announcement.id}
                        announcements={announcement}
                        role={role}
                    />
                ))}
            </div>
{/* 
            <div className="bg-white rounded-lg p-5">
                API
            </div> */}
        </div>
    )
}