import AnouncementCard from "../ui/AnnouncementCard";

export default function AnouncementMember({announcements}) {
    if (!announcements) {
        return <p>Loading announcements...</p>;
    }

    return (
        <div className="grid grid-cols-3 gap-5">
            <div className="space-y-4 col-span-2">
                {announcements.map((announcement) => (
                    <AnouncementCard
                        key={announcement.id}
                        announcements={announcement}
                    />
                ))}
            </div>

            <div className="bg-white rounded-lg p-5">
                API
            </div>
        </div>
    )
}