export default function NotificationDropdown( {children} ){

    return (
        <div className="absolute top-full right-2 mt-2 w-64 px-3 bg-white/70 backdrop-blur-md  rounded-lg shadow-xl z-10">
            <p className="p-4">Notifications</p>
            <hr></hr>
            <div className="p-4 flex-row gap-2 flex">
                {children}
            </div>
        </div>
    )
}