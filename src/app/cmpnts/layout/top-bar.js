'use client'
import { useRouter } from "next/navigation"

export default function TopBar(){
    const router = useRouter();

    function GoDashboard(){
        router.push(`../../u/dashboard`);
    }
    
    return (
        <div className="h-10 bg-(--primary) text-(--background) font-semibold flex items-center text-sm px-4"> 
            
            <span className="mr-4">☎ +63 999 676 6767</span>
            <span>✉ placeholder@gmail.com</span>
            <a className="hover:scale-104 transition duration-75 ml-auto cursor-pointer" onClick={GoDashboard}>
                Go To Dashboard &gt;
            </a>

        </div>
    )
}