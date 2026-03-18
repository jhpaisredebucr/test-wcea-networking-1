"use client";
import Input from "../ui/input";
import Button from "../ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function SignUpForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    async function HandleSignUp() {
        const res = await fetch("/api/signup", {
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
            console.log(data.message);
        }
    }    

    function HandleSignIn() {
        router.push("/auth/signin");
    }

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md">
            {/* Logo at the top */}
            <div className="flex justify-center mb-6">
                <Image
                    src="/images/wcea-logo.png" // replace with logo 
                    alt="Logo"
                    width={80}
                    height={80}
                />
            </div>

            <p className="text-3xl font-bold mb-10 text-center">Sign Up</p>
            <Input label="Username" type="text" value={username} onChange={setUsername} />
            <Input label="Password" type="password" value={password} onChange={setPassword} />
            
            <button 
                onClick={HandleSignIn} 
                className="my-2 text-blue-500 flex justify-end"
            >
                Already have an account
            </button>
            
            <Button onClick={HandleSignUp}>Sign Up</Button>
        </div>
    );
}