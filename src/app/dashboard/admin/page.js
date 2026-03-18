"use client"
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Dashboard() {
    const router = useRouter();

    function GoProfile() {
        router.push("/profile");
    }

    return (
        <div className="w-full flex">
            {/* SIDEBAR */}
            <div className="fixed left-0 top-0 h-screen w-56 bg-white p-6 shadow-md">
                <p className="text-3xl font-semibold mb-6">Admin</p>

                <div className="space-y-2">
                    <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 transition">
                        Analytics
                    </button>
                    <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 transition">
                        Products
                    </button>
                </div>

                <hr className="my-6" />

                <div className="space-y-2">
                    <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 transition">
                        Settings
                    </button>
                    <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 transition text-red-500">
                        Sign Out
                    </button>
                </div>
            </div>

            {/* MAIN CONTENT */}
            <div className="w-full ml-56 px-20 py-7 bg-gray-100 min-h-screen">
                <div className="flex items-center justify-between mb-6">
                    <p className="text-3xl font-semibold">Analytics</p>

                    <button onClick={GoProfile} className="flex items-center gap-2 hover:opacity-80 transition">
                        <Image
                            src="/images/no-profile.png"
                            alt="profile picture"
                            width={40}
                            height={40}
                            className="rounded-full"
                        />
                        <p>Placeholder Name</p>
                    </button>
                </div>

                {/* DASHBOARD BOXES */}
                <div className="grid grid-cols-4 auto-rows-[130px] gap-5 w-full">
                    <div className="bg-white rounded-2xl shadow-sm"></div>
                    <div className="bg-white rounded-2xl shadow-sm"></div>
                    <div className="bg-white rounded-2xl row-span-2 shadow-sm"></div>
                    <div className="bg-white rounded-2xl row-span-2 shadow-sm"></div>
                    <div className="bg-white rounded-2xl shadow-sm"></div>
                    <div className="bg-white rounded-2xl shadow-sm"></div>
                    <div className="bg-white rounded-2xl col-span-2 row-span-2 shadow-sm"></div>
                    <div className="bg-white rounded-2xl shadow-sm"></div>
                    <div className="bg-white rounded-2xl shadow-sm"></div>
                    <div className="bg-white rounded-2xl shadow-sm"></div>
                    <div className="bg-white rounded-2xl shadow-sm"></div>
                </div>
            </div>
        </div>
    );
}