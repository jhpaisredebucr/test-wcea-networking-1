import { userInfo } from "node:os";
import Profile from "./Profile";
import { useRouter } from "next/navigation";

export default function ProfileDropdown( { userData, children} ){

    const router = useRouter()

    function GoProfile() {
        router.push("/profile");
    }

    return (
        <div className="absolute top-full right-2 mt-2 w-75 px-7 bg-white/70 backdrop-blur-md  
        rounded-lg shadow-xl z-10">
            <div className="flex">
                <Profile 
                    GoProfile={GoProfile} 
                    first_name={userData?.profile?.first_name} 
                    last_name={userData?.profile?.last_name}
                    hideName={true}
                />
                            
                <p className="p-4">{userData?.profile?.first_name} {userData?.profile?.last_name}</p>   
            </div>
            
            <hr></hr>
            <div className="py-5 gap-2 flex flex-col">
                {children}
            </div>
        </div>
    )
}