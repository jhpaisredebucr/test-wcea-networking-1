import Image from "next/image"

export default function Profile({GoProfile, first_name, last_name}) {
    if (GoProfile === null) {
        return;
    }
    return (
        <button onClick={GoProfile} className="flex items-center gap-2 hover:opacity-80 transition">
            <Image
                src="/images/no-profile.png"
                alt="profile picture"
                width={40}
                height={40}
                className="rounded-full"
            />
            <p>{first_name} {last_name}</p>
        </button>
    )
}