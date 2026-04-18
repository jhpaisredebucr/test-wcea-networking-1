import Profile from "./Profile";

export default function ProfileDropdown( { userData, children} ){

    return (
        <div className="absolute top-full right-2 mt-2 w-75 px-7  bg-white
        rounded-lg shadow-xl z-50">
            <div className="flex items-center py-4">
                <Profile clickable={false} profile={userData.profile.img_url}/>
                            
                <p>{userData?.profile?.first_name} {userData?.profile?.last_name}</p>   
            </div>
            
            <hr></hr>
            <div className="py-5 gap-2 flex flex-col">
                {children}
            </div>
        </div>
    )
}