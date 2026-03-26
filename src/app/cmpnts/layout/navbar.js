"use client"
import { useRouter } from "next/navigation"
import Image from "next/image";

export default function Navbar() {
    const router = useRouter();

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
            <img src="/images/logo.ico" alt="logo" className="w-10"/>
            <h1 className="text-lg">Health and Wellness Hatdog</h1>
            <div className="transition duration-50">
                <button onClick={Home} className="mx-2 p-2 rounded-2xl transition duration-50 hover:bg-(--background) hover:text-(--foreground)">Home</button>
                <button onClick={About} className="mx-2 p-2 rounded-2xl transition duration-100 hover:bg-gray-100">About Us</button>
                <button onClick={Register} className="mx-2 p-2 rounded-2xl  transition duration-100 hover:bg-gray-100">Register</button>
                <button onClick={Contacts} className="mx-2 p-2 rounded-2xl  transition duration-100 hover:bg-gray-100">Contacts</button>
            </div>
      </nav>
    )
}