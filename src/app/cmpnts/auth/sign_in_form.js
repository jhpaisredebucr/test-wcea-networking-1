"use client"
import Input from "../common/input"
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignInForm() {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    async function HandleSignIn() {
        console.log(username);
        console.log(password);
        const res = await fetch("/api/login", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({username, password})
        });
        

        const data = await res.json();

        if (data.success) {
            console.log("Logged In: ", data.user.username);
            localStorage.setItem("userID", data.user.id);
            if (data.user.role === "admin") {
                router.replace("/u/dashboard/admin");
            } else {
                router.replace("/u/dashboard/member");
            }
        } else {
            console.log("Login Failed");
            alert(data.message);
        }
    }

    function HandleSignUp() {
        router.push("/home/signup");
    }

    return (
        <div className="flex w-[60%] flex-col items-center justify-center p-30 col-span-2">
            <div className="w-full mb-10">
                <p className="font-semibold text-2xl text-gray-600">Log In</p>
                <p className="text-gray-600">Sign in to access your account profile.</p>
            </div>
            <div className="w-full grid grid-cols-2 gap-x-5">
                <Input label="Username" type="text" value={username} onChange={setUsername} require={true}/>
                <Input label="Password" type="text" value={password} onChange={setPassword} />
                <button onClick={HandleSignIn} className="w-full h-13 bg-blue-400 col-span-2 p-2 rounded-md text-white">Sign In</button>
                <div className="col-span-2 flex flex-col my-2">
                    <p className="text-gray-600">
                        Don`t have an account?
                        <button onClick={HandleSignUp} className="inline ml-2 text-blue-500 hover:underline">
                            Sign Up Here
                        </button>
                    </p>
                </div>
            </div>
        </div>
    )
}