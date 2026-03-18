"use client";
import Input from "../ui/input";
import Button from "../ui/button";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignInForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    async function HandleLogIn() {
        const res = await fetch("/api/login", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({username, password})
        });

        const data = await res.json();

        if (data.success) {
            console.log("Logged In: ", data.user.username);
            if (data.user.role === "admin") {
                router.replace("/dashboard/admin");
            } else {
                router.replace("/dashboard/member");
            }
        } else {
            console.log("Login Failed");
        }
    }   
    
    function HandleSignUp() {
        router.push("/auth/signup");
    }

    return (
        <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-xl shadow-md text-center">
            {/* Logo at the top */}
            <div className="flex justify-center mb-6">
                <Image
                    src="/images/wcea-logo.png" // replace with logo 
                    alt="Logo"
                    width={80}
                    height={80}
                />
            </div>

            <p className="text-3xl font-bold mb-10">Sign In</p>

            <Input label="Username" type="text" value={username} onChange={setUsername} />
            <Input label="Password" type="password" value={password} onChange={setPassword} />
            
            <button 
                onClick={HandleSignUp} 
                className="my-2 text-blue-500 flex justify-end"
            >
                Create an account
            </button>
            
            <Button onClick={HandleLogIn}>Log In</Button>
        </div>
    );
}