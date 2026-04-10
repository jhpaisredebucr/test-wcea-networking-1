'use client';

import { useRouter, usePathname } from "next/navigation";
import SidebarButton from "../ui/SideBarButton";

export default function SideBar({ role = "member" }) {
    const router = useRouter();
    const pathname = usePathname();

    const memberMenu = [
        { id: "announcement", label: "Announcement", path: "/dashboard/announcement", icon: "/icons/announcement.svg" },
        { id: "dashboard", label: "Dashboard", path: "/dashboard", icon: "/icons/dashboard.svg" },
        { id: "products", label: "Product Shop", path: "/dashboard/products", icon: "/icons/product-shop.svg" },
        { id: "orders", label: "My Orders", path: "/dashboard/orders", icon: "/icons/my-orders.svg" },
        { id: "referrals", label: "Referrals", path: "/dashboard/referrals", icon: "/icons/referrals.svg" },
        { id: "transactions", label: "Transactions", path: "/dashboard/transactions", icon: "/icons/announcement.svg" }
    ];

    const adminMenu = [
        { id: "dashboard", label: "Dashboard", path: "/admin" },
        { id: "members", label: "Members", path: "/admin/members" },
        { id: "transactions", label: "Transactions", path: "/admin/transactions" },
        { id: "announcement", label: "Announcement", path: "/admin/announcement" },
        { id: "actions", label: "Actions", path: "/admin/actions" }
    ];

    const bottomMenu = [
        { id: "about", label: "About", path: "/about", icon: "/icons/announcement.svg" },
        { id: "settings", label: "Setting", path: "/settings", icon: "/icons/announcement.svg" },
        { id: "signout", label: "Sign Out", path: "/signout", icon: "/icons/announcement.svg" }
    ];

    const menu = role === "admin" ? adminMenu : memberMenu;

    const isActive = (path) => pathname === path;

    return (
        <div className="fixed left-0 top-15 h-[calc(100vh-60px)] w-56 bg-gray-50 py-6 z-10 overflow-y-auto no-scrollbar">
            
            <p className="text-3xl font-semibold mb-6 pl-6">
                {role === "admin" ? "Admin" : "Member"}
            </p>

            {/* MAIN MENU */}
            <div>
                {menu.map(item => (
                    <SidebarButton
                        key={item.id}
                        id={item.id}
                        page={pathname}
                        setPage={() => router.push(item.path)}
                        icon={item.icon}
                        active={isActive(item.path)}
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
                        page={pathname}
                        setPage={() => router.push(item.path)}
                        icon={item.icon}
                        active={isActive(item.path)}
                    >
                        {item.label}
                    </SidebarButton>
                ))}
            </div>
        </div>
    );
}