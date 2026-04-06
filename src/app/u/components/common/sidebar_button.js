export default function SidebarButton({ children, buttonID, page, setPage }) {
    return (
        <button onClick={setPage} className={`w-full text-left px-7 py-3 rounded-lg hover:bg-blue-200 transition ${buttonID === page && "bg-blue-500 text-white"}`}>
            {children}
        </button>
    )
}