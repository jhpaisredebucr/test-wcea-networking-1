export default function SidebarButton({ children }) {
    return (
        <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 transition">
            {children}
        </button>
    )
}