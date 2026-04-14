import Image from "next/image"

export default function SidebarButton({ className, children, setPage, icon }) {
    return (
        <button 
            onClick={setPage}
className={`flex gap-x-3 items-center cursor-pointer w-full text-left h-full px-4 py-3 
            hover:bg-(--primary)/50 transition ${className || ''}`}
        >
            <Image src={icon} alt="Sidebar Icon" width={15} height={15}></Image> {children}
        </button>
    );
}