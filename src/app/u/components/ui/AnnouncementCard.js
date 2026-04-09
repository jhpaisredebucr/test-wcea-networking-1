import Profile from "@/app/components/ui/Profile"
import { formatDistanceToNow } from "date-fns";

export default function AnnouncementCard({ announcements }) {
    return (
        <div>
            <div className="p-5 rounded-lg shadow-[0_0_4px_rgba(0,0,0,0.15)] bg-white">
                <Profile first_name="WCEA" last_name=""><p className="text-sm">{formatDistanceToNow(new Date(announcements?.created_at), { addSuffix: true })}</p></Profile>
                <p className="font-semibold my-5">{announcements?.title}</p>
                <p>{announcements?.short_description}</p>
            </div>
        </div>
    )
}