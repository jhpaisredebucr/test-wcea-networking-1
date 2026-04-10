import Image from "next/image"
import { CldImage } from "next-cloudinary";

export default function Profile({GoProfile, hideName, first_name, last_name, children, profile="no-profile_rfhcxa"}) {
    if (GoProfile === null) {
        return;
    }
    return (
        <button onClick={GoProfile} className="flex items-center gap-2 hover:opacity-80 transition">
            <CldImage
                src={`/${profile}`}
                alt="profile picture"
                width={40}
                height={40}
                className="rounded-full"
            />
            {/* <Image
                src={`/images/${profile}`}
                alt="profile picture"
                width={40}
                height={40}
                className="rounded-full"
            /> */}
            <div className="flex flex-col items-start">
                {!hideName && <p className="font-semibold">{first_name} {last_name}</p>}
                {children}
            </div>
            
        </button>
    )
}