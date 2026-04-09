import SidebarButton from "../ui/SideBarButton"

export default function SideBar({ page, setPage, role = "member" }) {

    const memberMenu = [
        { id: "announcement", label: "Announcement", icon: "/icons/announcement.svg"},
        { id: "dashboard", label: "Dashboard", icon: "/icons/dashboard.svg" },
        { id: "products", label: "Product Shop", icon: "/icons/product-shop.svg" },
        { id: "orders", label: "My Orders", icon: "/icons/my-orders.svg" },
        { id: "referrals", label: "Referrals", icon: "/icons/referrals.svg" },
        { id: "transactions", label: "Transactions", icon: "/icons/announcement.svg" }
    ];

    const adminMenu = [
        { id: "dashboard", label: "Dashboard" },
        { id: "members", label: "Members" },
        { id: "transactions", label: "Transactions" },
        { id: "announcement", label: "Announcement" },
        { id: "actions", label: "Actions" }
    ];

    const bottomMenu = [
        { id: "about", label: "About" },
        { id: "settings", label: "Setting" },
        { id: "signout", label: "Sign Out" }
    ];

    const menu = role === "admin" ? adminMenu : memberMenu;

    return (
        <div className="fixed left-0 top-15 h-screen w-56 bg-gray-50 p-6 z-1">
            <p className="text-3xl font-semibold mb-6">
                {role === "admin" ? "Admin" : "Member"}
            </p>

            {/* MAIN MENU */}
            <div className="space-y-2">
                {menu.map(item => (
                    <SidebarButton
                        key={item.id}
                        id={item.id}
                        page={page}
                        setPage={() => setPage(item.id)}
                        icon={item.icon}
                    >
                        {item.label}
                    </SidebarButton>
                ))}
            </div>

            <hr className="my-6" />

            {/* BOTTOM MENU */}
            <div className="space-y-2">
                {bottomMenu.map(item => (
                    <SidebarButton
                        key={item.id}
                        id={item.id}
                        page={page}
                        setPage={() => setPage(item.id)}
                    >
                        {item.label}
                    </SidebarButton>
                ))}
            </div>
        </div>
    );
}