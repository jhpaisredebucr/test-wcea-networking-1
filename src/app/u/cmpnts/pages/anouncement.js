import AnouncementCard from "../common/announcement_card";

export default function AnouncementMember({announcements}) {
    if (!announcements) {
        return <p>Loading announcements...</p>;
    }

    return (
        <div className="space-y-4">
            {announcements.map((announcement) => (
                <AnouncementCard
                    key={announcement.id}
                    announcements={announcement}
                />
            ))}
        </div>
    )
}