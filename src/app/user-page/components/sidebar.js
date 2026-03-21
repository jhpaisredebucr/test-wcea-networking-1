import SidebarButton from "./sidebar_button"

export default function SideBar() {
    return (
        <div className="fixed left-0 top-0 h-screen w-56 bg-gray-50 p-6">
            <p className="text-3xl font-semibold mb-6">Admin</p>

            <div className="space-y-2">
                <SidebarButton>Analytics</SidebarButton>
                <SidebarButton>Products</SidebarButton>
                <SidebarButton>Referral</SidebarButton>
                <SidebarButton>Members</SidebarButton>
            </div>

            <hr className="my-6" />

            <div className="space-y-2">
                <SidebarButton>About</SidebarButton>
                <SidebarButton>Setting</SidebarButton>
                <SidebarButton>Sign Out</SidebarButton>

            </div>
        </div>
    )
}