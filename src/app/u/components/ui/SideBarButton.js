export default function SidebarButton({ children, buttonID, page, setPage }) {
    return (
        <button onClick={setPage} className={`w-full text-left px-7 py-3 rounded-lg hover:bg-(--primary)/50 transition border-l-2
         ${buttonID === page ? "border-(--primary) border font-semibold " : "border-transparent"}`}>            {children}
        </button>
    )
}