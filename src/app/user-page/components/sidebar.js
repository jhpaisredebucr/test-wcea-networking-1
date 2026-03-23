import SidebarButton from "./sidebar_button"

export default function SideBar({ page, setPage, userInfo }) {
    return (
        <div className="fixed left-0 top-0 h-screen w-56 bg-gray-50 p-6">
            <p className="text-3xl font-semibold mb-6">Admin</p>

            <div className="space-y-2">
                <SidebarButton buttonID={1} page={page} setPage={() => setPage(1)}>Anouncement</SidebarButton>
                <SidebarButton buttonID={2} page={page} setPage={() => setPage(2)}>Dashboard</SidebarButton>
                <SidebarButton buttonID={3} page={page} setPage={() => setPage(3)}>Product Shop</SidebarButton>
                <SidebarButton buttonID={4} page={page} setPage={() => setPage(4)}>My Orders</SidebarButton>
                <SidebarButton buttonID={5} page={page} setPage={() => setPage(5)}>Referrals</SidebarButton>
            </div>

            <hr className="my-6" />

            <div className="space-y-2">
                <SidebarButton buttonID={6} page={page} setPage={() => setPage(6)}>About</SidebarButton>
                <SidebarButton buttonID={7} page={page} setPage={() => setPage(7)}>Setting</SidebarButton>
                <SidebarButton buttonID={8} page={page} setPage={() => setPage(8)}>Sign Out</SidebarButton>

            </div>
        </div>
    )
}