import Profile from "@/app/components/ui/profile"

export default function AnouncementCard({ annoucements }) {
    return (
        <div>
            <div className="p-5 rounded-lg bg-white">
                <Profile first_name="Keisac" last_name="Dela Cruz"/>
                <p className="font-bold my-5">{annoucements?.title}</p>
                <p>{annoucements?.short_description}</p>
            </div>
        </div>
    )
}