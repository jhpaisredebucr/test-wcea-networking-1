import Image from "next/image"

export default function Profile({GoProfile, first_name, last_name, children, profile="logo.ico"}) {
    if (GoProfile === null) {
        return;
    }
    return (
        <button onClick={GoProfile} className="flex items-center gap-2 hover:opacity-80 transition">
            <Image
                src={`/images/${profile}`}
                alt="profile picture"
                width={40}
                height={40}
                className="rounded-full"
            />
            <div className="flex flex-col items-start">
                <p className="font-semibold">{first_name} {last_name}</p>
                {children}
            </div>
            
        </button>
    )
}