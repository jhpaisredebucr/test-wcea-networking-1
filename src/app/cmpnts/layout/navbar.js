"use client"
import { useRouter } from "next/navigation"
import Image from "next/image";
import { useState } from "react";

export default function Navbar() {
    const router = useRouter();
    const [open, setOpen] = useState(false);


    function Home() {
        router.push("/home")
    }

    function About() {
        router.push("/home/about")
    }

    function Register() {
        router.push("/home/signup")
    }

    function Contacts() {
        router.push("/home/contacts")
    }

    
    

    return (
        <nav className="flex 0 w-screen border-b-2 border-(--foreground)/50 border- h-14 items-center justify-between px-5 ">
            <div className="flex items-center">
                <Image src="/images/logo.ico" alt="logo" width={35} height={35}/>
                <h1 className="text-lg ml-3">World Council Excellence Award</h1>
            </div>
            
            <div className="">
               <button onClick={Home} className="
                    active:scale-95 active:bg-gray-200
                    mx-1 p-2 
                    border-b-2 border-transparent 
                    hover:border-(--primary)
                    transition duration-200
                ">
                Home
                </button>

                <button onClick={About} className="
                    active:scale-95 active:bg-gray-200
                    mx-1 p-2 
                    border-b-2 border-transparent 
                    hover:border-(--primary)
                    transition duration-200
                ">
                About
                </button>

                <button onClick={Register} className="
                    active:scale-95 active:bg-gray-200
                    mx-1 p-2 
                    border-b-2 border-transparent 
                    hover:border-(--primary)
                    transition duration-200
                ">
                Register
                </button>

                <button onClick={Contacts} className="
                    active:scale-95 active:bg-gray-200
                    mx-1 p-2 
                    border-b-2 border-transparent 
                    hover:border-(--primary)
                    transition duration-200
                ">
                Contacts
                </button>
            </div>
      </nav>
    )
}