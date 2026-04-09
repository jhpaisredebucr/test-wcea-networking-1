import Image from "next/image"

export default function TopBar() {  
    return (
        <div className="flex sticky items-center justify-between h-15 px-10 bg-white top-0 z-20">
            <div className="flex items-center">
                <Image 
                    src="/images/logo.ico" 
                    alt="logo" 
                    width={35} 
                    height={35} 
                    className="object-contain mr-2" 
                />
                <span className="text-3xl font-semibold text-blue-500">WC</span>
                <span className="text-3xl font-semibold ml-1">EA</span>
            </div>

        <div className="flex items-center">
            <Image 
                src="/images/notification-icon.png" 
                width={25} 
                height={25} 
                alt="notification icon" 
                className="mr-3"
            />
        </div>
    </div>                      
)}