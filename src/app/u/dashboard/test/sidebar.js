import SidebarButton from "./sidebar_button";

export default function SideBar({ page, setPage, role = "member", collapsed, setCollapsed }) {
    return (
        <div
            className={`
                fixed top-0 left-0 h-screen bg-gray-50 p-6 z-20 transition-transform duration-300
                w-56
                ${collapsed ? '-translate-x-full' : 'translate-x-0'}
                lg:translate-x-0
            `}
        >
            <p className="text-3xl font-semibold mb-6">{role === "member" ? "Member" : "Admin"}</p>

            {role === "member" && (
                <div className="space-y-2">
                    <SidebarButton buttonID={1} page={page} setPage={() => setPage(1)}>Announcement</SidebarButton>
                    <SidebarButton buttonID={2} page={page} setPage={() => setPage(2)}>Dashboard</SidebarButton>
                    <SidebarButton buttonID={3} page={page} setPage={() => setPage(3)}>Product Shop</SidebarButton>
                    <SidebarButton buttonID={4} page={page} setPage={() => setPage(4)}>My Orders</SidebarButton>
                    <SidebarButton buttonID={5} page={page} setPage={() => setPage(5)}>Referrals</SidebarButton>
                </div>
            )}

            {role === "admin" && (
                <div className="space-y-2">
                    <SidebarButton buttonID={1} page={page} setPage={() => setPage(1)}>Dashboard</SidebarButton>
                    <SidebarButton buttonID={2} page={page} setPage={() => setPage(2)}>Members</SidebarButton>
                    <SidebarButton buttonID={3} page={page} setPage={() => setPage(3)}>Transactions</SidebarButton>
                    <SidebarButton buttonID={4} page={page} setPage={() => setPage(4)}>Announcement</SidebarButton>
                    <SidebarButton buttonID={5} page={page} setPage={() => setPage(5)}>Actions</SidebarButton>
                </div>
            )}

            <hr className="my-6" />

            <div className="space-y-2">
                <SidebarButton buttonID={6} page={page} setPage={() => setPage(6)}>About</SidebarButton>
                <SidebarButton buttonID={7} page={page} setPage={() => setPage(7)}>Setting</SidebarButton>
                <SidebarButton buttonID={8} page={page} setPage={() => setPage(8)}>Sign Out</SidebarButton>
            </div>
        </div>
    );
}