"use client";

import { useRouter, usePathname } from "next/navigation";

/* ─────────────────────────────
   NORMAL BUTTON
───────────────────────────── */
function Button({ children, onClick, icon }) {
    return (
        <button
            onClick={onClick}
            className="
                w-full cursor-pointer 
                p-2 bg-(--primary) 
                rounded-2xl text-white 
                font-bold flex gap-4 justify-center
                items-center
                hover:opacity-90
                active:scale-95
                transition
            "
        >
            {icon && (
                <img className="w-5 h-5" src={icon} alt="icon" />
            )}
            {children}
        </button>
    );
}


/* ─────────────────────────────
   NAVBAR BUTTON (ACTIVE UNDERLINE)
───────────────────────────── */
function NavBarButton({ children, href }) {
    const router = useRouter();
    const pathname = usePathname();

    const isActive = pathname === href;

    return (
        <button
            onClick={() => router.push(href)}
            className={`
                relative
                flex-1
                mx-1 p-2 h-10
                cursor-pointer
                transition duration-300
                active:scale-95

                ${isActive
                    ? "text-(--primary)"
                    : "text-gray-700 hover:text-(--primary)"
                }

                after:content-['']
                after:absolute
                after:left-0
                after:-bottom-1
                after:h-[2px]
                after:w-full
                after:bg-(--primary)
                after:origin-left
                after:transition-transform
                after:duration-300

                ${isActive
                    ? "after:scale-x-100"
                    : "after:scale-x-0 hover:after:scale-x-100"
                }
            `}
        >
            {children}
        </button>
    );
}

export default Button;
export { NavBarButton };