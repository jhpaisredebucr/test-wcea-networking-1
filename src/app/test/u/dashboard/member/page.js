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