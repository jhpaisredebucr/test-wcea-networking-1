"use client"
import Input from "../common/input"
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function SignInForm() {
    const router = useRouter();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [errors, setErrors] = useState({
        username: "",
        password: "",
        general: ""
    });

    const [loading, setLoading] = useState(false);

    function validate() {
        let newErrors = { username: "", password: "", general: "" };

        if (!username) newErrors.username = "Username is required";
        if (!password) newErrors.password = "Password is required";

        setErrors(newErrors);
        return !newErrors.username && !newErrors.password;
    }

    async function HandleSignIn() {
        if (!validate()) return;

        setLoading(true);

        try {
            const res = await fetch("/api/signin", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password })
            });

            const data = await res.json();

            if (data.success) {
                localStorage.setItem("userID", data.user.id);

                router.replace(
                    data.user.role === "admin"
                        ? "/u/dashboard/admin"
                        : "/u/dashboard/member"
                );
            } else {
                setErrors(prev => ({
                    ...prev,
                    general: data.message || "Login failed"
                }));
            }
        } catch {
            setErrors(prev => ({
                ...prev,
                general: "Something went wrong. Try again."
            }));
        }

        setLoading(false);
    }

    function HandleSignUp() {
        router.push("/home/signup");
    }

    return (
        <div className="w-full h-screen grid grid-cols-5">

            {/* LEFT CONTAINER (sign in) */}
            <div className="col-span-3 flex items-center justify-center p-12">
                <div className="w-full max-w-md">

                    {/* Header */}
                    <div className="mb-8">
                        <p className="font-semibold text-2xl text-gray-700">Log In</p>
                        <p className="text-gray-500 text-sm">
                            Sign in to access your account profile.
                        </p>
                    </div>

                    {/* Error */}
                    {errors.general && (
                        <div className="mb-4 p-3 rounded-md bg-red-100 text-red-600 text-sm">
                            {errors.general}
                        </div>
                    )}

                    {/* Inputs */}
                    <Input
                        label="Username"
                        value={username}
                        onChange={(val) => {
                            setUsername(val);
                            setErrors(prev => ({ ...prev, username: "", general: "" }));
                        }}
                        error={errors.username}
                    />

                    <Input
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(val) => {
                            setPassword(val);
                            setErrors(prev => ({ ...prev, password: "", general: "" }));
                        }}
                        error={errors.password}
                    />

                    {/* Button */}
                    <button
                        onClick={HandleSignIn}
                        disabled={loading}
                        className={`
                            w-full h-12 rounded-md text-white mt-2
                            transition duration-200
                            ${loading
                                ? "bg-blue-300 cursor-not-allowed"
                                : "bg-blue-500 hover:bg-blue-600"
                            }
                        `}
                    >
                        {loading ? "Signing in..." : "Sign In"}
                    </button>

                    {/* Sign up */}
                    <p className="text-gray-600 text-sm mt-4">
                        Don’t have an account?
                        <button
                            onClick={HandleSignUp}
                            className="ml-2 text-blue-500 hover:underline"
                        >
                            Sign Up
                        </button>
                    </p>

                </div>
            </div>
            
            {/* RIGHT SIE IMAGE */}
            <div className="col-span-2 relative">
                <img
                    src="/images/test-splash.jpg" // REPLACE WITH ANY IMAGE
                    alt="Sign in visual"
                    className="w-full h-full object-cover"
                />

                {/* Optional overlay */}
                <div className="absolute inset-0 bg-black/20"></div>
            </div>

        </div>
    );
}