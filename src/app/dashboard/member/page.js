"use client"
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Dashboard(){

    const router = useRouter();
    function GoProfile() {
        router.push("/profile")
    }

    return (
        <div className="w-full flex ">
            <div className="fixed left-0 top-0 h-screen w-55 bg-white p-7 shadow-md">
                <p className="text-3xl font-semibold mb-5">Member</p>
                <p className="mb-2">Analytics</p>
                <p>Products</p>
                <hr className="my-4"/>
                <p className="mb-2">Settings</p>
                <p>Sign Out</p>
            </div>
            <div className="w-full ml-50 px-20 py-7 bg-gray-100">
                <div className="flex items-center justify-between mb-5">
                    <p className="text-3xl font-semibold">Analytics</p>
                        <button onClick={GoProfile} className="flex items-center">
                            <Image src="/images/no-profile.png" alt="profile picture" width={40} height={40} className="mr-2"/>
                            <p>Paulo Reeve Buta</p>
                        </button>
                </div>
                <div className="grid grid-cols-4 auto-rows-[130px] gap-5 w-full">
                    <div className="bg-white rounded-2xl"></div>
                    <div className="bg-white rounded-2xl"></div>
                    <div className="bg-white rounded-2xl row-span-2"></div>
                    <div className="bg-white rounded-2xl row-span-2"></div>
                    <div className="bg-white rounded-2xl"></div>
                    <div className="bg-white rounded-2xl"></div>
                    <div className="bg-white rounded-2xl col-span-2 row-span-2"></div>
                    <div className="bg-white rounded-2xl"></div>
                    <div className="bg-white rounded-2xl"></div>
                    <div className="bg-white rounded-2xl"></div>
                    <div className="bg-white rounded-2xl"></div>
                </div>
            </div>
        </div>
    );
}