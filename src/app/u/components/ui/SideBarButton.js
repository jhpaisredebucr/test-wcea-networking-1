import Image from "next/image"

export default function SidebarButton({ children, id, page, setPage, icon }) {
    const isActive = page === id;

    return (
        <button 
            onClick={setPage}
            className={`flex gap-x-2 items-center cursor-pointer w-full text-left px-3 py-3 rounded-lg 
            hover:bg-(--primary)/50 transition border-l-2 
            ${isActive ? "border-(--primary) font-semibold" : "border-transparent"}`}
        >
            <Image src={icon} alt="hatdog" width={15} height={15}></Image> {children}
        </button>
    );
}