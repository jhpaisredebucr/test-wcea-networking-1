import SidebarButton from "./sidebar_button"
import Image from "next/image"

export default function SideBar({ page, setPage, userInfo, role="member" }) {

    return (
        <div className="fixed left-0 top-0 h-[calc(100vh-60px)] mt-15 w-56 bg-white p-6 border-r-2 border-gray-200">
            {/* <Image src="/images/logo.ico" alt="logo" width={40} height={40} className="mb-4" /> */}
            

            {role === "member" && 
                <div className="space-y-2">
                    <SidebarButton buttonID={1} page={page} setPage={() => setPage(1)}>Announcement</SidebarButton>
                    <SidebarButton buttonID={2} page={page} setPage={() => setPage(2)}>Dashboard</SidebarButton>
                    <SidebarButton buttonID={3} page={page} setPage={() => setPage(3)}>Product Shop</SidebarButton>
                    <SidebarButton buttonID={4} page={page} setPage={() => setPage(4)}>My Orders</SidebarButton>
                    <SidebarButton buttonID={5} page={page} setPage={() => setPage(5)}>Referrals</SidebarButton>
                </div>
            }
            {role === "admin" && 
                <div className="space-y-2">
                    <SidebarButton buttonID={1} page={page} setPage={() => setPage(1)}>Dashboard</SidebarButton>
                    <SidebarButton buttonID={2} page={page} setPage={() => setPage(2)}>Members</SidebarButton>
                    <SidebarButton buttonID={3} page={page} setPage={() => setPage(3)}>Transactions</SidebarButton>
                    <SidebarButton buttonID={4} page={page} setPage={() => setPage(4)}>Announcement</SidebarButton>
                    <SidebarButton buttonID={5} page={page} setPage={() => setPage(5)}>Actions</SidebarButton>
                </div>
            }

            <hr className="my-6 border-t-2 border-gray-200" />

            <div className="space-y-2">
                <SidebarButton buttonID={6} page={page} setPage={() => setPage(6)}>About</SidebarButton>
                <SidebarButton buttonID={7} page={page} setPage={() => setPage(7)}>Setting</SidebarButton>
                <SidebarButton buttonID={8} page={page} setPage={() => setPage(8)}>Sign Out</SidebarButton>

            </div>
        </div>
    )
}