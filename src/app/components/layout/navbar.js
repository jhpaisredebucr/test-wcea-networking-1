"use client"
import { useRouter } from "next/navigation"
import Image from "next/image";
import { useState } from "react";
import { NavBarButton } from "../ui/Button";

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

    function Memberships() {
        router.push("/home/memberships")

    }
    

    return (
        <nav className="flex 0 w-screen border-b-2 border-(--foreground)/50 border- h-14 items-center justify-between px-5 ">
            <div className="flex items-center">
                <Image src="/images/logo.ico" alt="logo" width={35} height={35}/>
                <h1 className="text-lg ml-3">World Council Excellence Award</h1>
            </div>
            
            <div className="">
                <NavBarButton onClick={Home}>Home</NavBarButton>
                <NavBarButton onClick={About}>About</NavBarButton>
                <NavBarButton onClick={Register}>Register</NavBarButton>
                <NavBarButton onClick={Contacts}>Contacts</NavBarButton>
                <NavBarButton onClick={Memberships}>Memberships</NavBarButton>
            </div>
      </nav>
    )
}