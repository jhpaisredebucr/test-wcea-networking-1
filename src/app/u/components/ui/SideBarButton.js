export default function SidebarButton({ children, id, page, setPage }) {
    const isActive = page === id;

    return (
        <button 
            onClick={setPage}
            className={`cursor-pointer w-full text-left px-7 py-3 rounded-lg 
            hover:bg-(--primary)/50 transition border-l-2
            ${isActive ? "border-(--primary) font-semibold" : "border-transparent"}`}
        >
            {children}
        </button>
    );
}