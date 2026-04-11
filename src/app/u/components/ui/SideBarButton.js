import Image from "next/image"

export default function SidebarButton({ className, children, setPage, icon }) {
    return (
        <button 
            onClick={setPage}
            className={`flex gap-x-4 items-center cursor-pointer w-full text-left px-3 py-4  
            hover:bg-(--primary)/50 transition pl-6 ${className}`}
        >
            <Image src={icon} alt="hatdog" width={15} height={15}></Image> {children}
        </button>
    );
}