"use client";
import Input from "../ui/input"
import Button from "../ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUpForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter()

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
            console.log(data);
        } else {
            console.log("Sign Up Failed");
            console.log(data.message);
        }
        }    

        function HandleSignIn() {
        router.push("/auth/signin")
        }

    return (
        <div>
            <p className="text-3xl font-bold mb-10">Sign Up</p>
            <Input label="Username" type="text" value={username} onChange={setUsername}/>
            <Input label="Password" type="password" value={password} onChange={setPassword}/>
            <button onClick={HandleSignIn} className="my-2 text-blue-500 flex justify-end">Already have an account</button>
            <Button onClick={HandleSignUp}>Sign Up</Button>
        </div>
    )
}