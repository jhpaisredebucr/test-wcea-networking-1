"use client"
import { useRouter } from "next/navigation"

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
        <nav className="flex w-screen h-14 items-center justify-between px-5">
            <h1 className="text-lg text-gray-600">Health and Wellness Hatdog</h1>
            <div>
                <button onClick={Home} className="mx-2 p-2 rounded-2xl text-gray-600 hover:bg-[var(--background)] hover:text-[var(--foreground)]">Home</button>
                <button onClick={About} className="mx-2 p-2 rounded-2xl text-gray-600 hover:bg-gray-100">About Us</button>
                <button onClick={Register} className="mx-2 p-2 rounded-2xl text-gray-600 hover:bg-gray-100">Register</button>
                <button onClick={Contacts} className="mx-2 p-2 rounded-2xl text-gray-600 hover:bg-gray-100">Contacts</button>
            </div>
      </nav>
    )
}