import AnouncementCard from "../anouncement_card";

export default function AnouncementMember({announcements}) {
    function GetAnouncement() {
        console.log(anouncements);
    }

    function RenderAnouncement() {
        announcements.array.forEach(anouncement => {
            
        });
    }

    if (!announcements) {
        return <p>Loading announcements...</p>;
    }

    return (
        <div className="space-y-4">
            {announcements.map((announcement) => (
                <AnouncementCard
                    key={announcement.id}
                    annoucements={announcement}
                />
            ))}
        </div>
    )
}