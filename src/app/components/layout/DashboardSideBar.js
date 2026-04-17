'use client';

import { useRouter, usePathname } from "next/navigation";
import SidebarButton from "../ui/SideBarButton";
import { useState } from "react";

export default function SideBar({ role = "member" }) {
    const router = useRouter();
    const pathname = usePathname();

    const memberMenu = [
        { id: "announcement", label: "Announcement", path: "/u/announcements", icon: "/icons/announcement.svg" },
        { id: "dashboard", label: "Dashboard", path: "/u/dashboard", icon: "/icons/dashboard.svg" },
        { id: "products", label: "Product Shop", path: "/u/products", icon: "/icons/product-shop.svg" },
        { id: "orders", label: "My Orders", path: "/u/orders", icon: "/icons/my-orders.svg" },
        { id: "referrals", label: "Referrals", path: "/u/referrals", icon: "/icons/referrals.svg" },
        { id: "transactions", label: "Transactions", path: "/u/transactions", icon: "/icons/page-flip.svg" },
        { id: "commissions", label: "Commissions", path: "/u/commissions", icon: "/icons/money.svg" },
        { id: "withdraw", label: "Withdraw", path: "/u/withdraw", icon: "/icons/wallet.svg" },
        { id: "deposit", label: "Deposit", path: "/u/deposit", icon: "/icons/building-bank.svg" },
    ];

    const adminMenu = [
        { id: "dashboard", label: "Dashboard", path: "/u/admin/dashboard ", icon: "/icons/dashboard.svg" },
        { id: "members", label: "Members", path: "/u/admin/members", icon: "/icons/referrals.svg" },
        { id: "transactions", label: "Transactions", path: "/u/admin/transactions", icon: "/icons/money-thin.svg" },
        { id: "announcement", label: "Announcement", path: "/u/admin/announcements", icon: "/icons/announcement.svg" }
    ];

const bottomMenu = [
        { id: "about", label: "About", path: "/about", icon: "/icons/more.svg" },
        { id: "settings", label: "Setting", path: "/settings", icon: "/icons/settings.svg" }
    ];

    const menu = role === "admin" ? adminMenu : memberMenu;

    const [menuActive, setMenu] = useState(true);

const handleSignOut = async () => {
        try {
            const res = await fetch("/api/auth/signout", {
                method: "POST",
                credentials: "include"
            });
            if (!res.ok) throw new Error('Signout failed');
        } catch (error) {
            console.error("Sign out error:", error);
        }
        // Hard reload to clear all client state
        window.location.href = '/';
    }

    return (
        <div className={`fixed left-0 top-15 h-[calc(100vh-60px)] w-56
            md:${menuActive ? "bg-amber-600":"bg-amber-200"}
            bg-white py-6 z-10 overflow-y-auto no-scrollbar`}>
            
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
                        className={`block px-5 py-3 transition ${
                        pathname.startsWith(item.path)
                            ? "border-r-4 border-(--primary) bg-(--primary)/30 font-semibold"
                            : ""
                        }`}
                    >
                        {item.label}
                    </SidebarButton>
                    ))}
            </div>
            
            <br></br>
            {/* BOTTOM MENU */}
            <div className="space-y-2">
                {bottomMenu.map(item => (
                    <SidebarButton
                        key={item.id}
                        setPage={item.id === "signout" ? handleSignOut : () => router.push(item.path)}
                        icon={item.icon}
                    >
                        {item.label}
                    </SidebarButton>
                ))}
            </div>
        </div>
    );
}