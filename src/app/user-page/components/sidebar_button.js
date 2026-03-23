export default function SidebarButton({ children, buttonID, page, setPage }) {
    return (
        <button onClick={setPage} className={`w-full text-left px-3 py-2 rounded-lg hover:bg-gray-200 transition ${buttonID === page && "bg-gray-200"}`}>
            {children}
        </button>
    )
}