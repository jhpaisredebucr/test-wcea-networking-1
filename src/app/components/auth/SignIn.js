'use client'
import Input from "../ui/Input"
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import SemanticCard from "../ui/SemanticCard";

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

    // Validate inputs
    function validate() {
        let newErrors = { username: "", password: "", general: "" };

        if (!username) newErrors.username = "Username is required";
        if (!password) newErrors.password = "Password is required";

        setErrors(newErrors);
        return !newErrors.username && !newErrors.password;
    }

    // Handle sign in
    async function HandleSignIn() {
        if (!validate()) return;

        setLoading(true);
        setErrors(prev => ({ ...prev, general: "" }));

        try {
            const res = await fetch("/api/auth/signin", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password })
            });

            const data = await res.json();

            if (data.success) {
                // JWT cookie is already set by the API
                // Redirect based on role
                router.replace(
                    data.user.role === "admin"
                        ? "/u/admin/dashboard"
                        : "/u/dashboard"
                );
            } else {
                setErrors(prev => ({
                    ...prev,
                    general: data.message || "Login failed"
                }));
            }
        } catch (err) {
            setErrors(prev => ({
                ...prev,
                general: "Something went wrong. Try again."
            }));
            console.error("SignIn fetch error:", err);
        } finally {
            setLoading(false);
        }
    }

    function HandleSignUp() {
        router.push("/home/signup");
    }

    // Handle Enter key press on inputs
    function handleKeyDown(e) {
        if (e.key === "Enter") {
            e.preventDefault();
            HandleSignIn();
        }
    }

    return (
        <div className="">

            {/* LEFT CONTAINER (sign in) */}
            <div className="flex items-center justify-center p-5">
                <div className="w-full max-w-md">

                    {/* Header */}
                    <div className="mb-4">
                        <p className="font-semibold text-2xl text-gray-700">Log In</p>
                        <p className="text-gray-500 text-sm">
                            Sign in to access your account profile.
                        </p>
                    </div>

                    {/* Error */}
                    {errors.general && (
                        <SemanticCard semantic="error">
                            {errors.general}
                        </SemanticCard>
                    )}

                    {/* Inputs */}
                    <Input
                        label="Username"
                        value={username}
                        onChange={(val) => {
                            setUsername(val);
                            setErrors(prev => ({ ...prev, username: "", general: "" }));
                        }}
                        onKeyDown={handleKeyDown}
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
                        onKeyDown={handleKeyDown}
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
                                : "bg-(--primary) hover:bg-blue-600"
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
                            className="ml-2 text-blue-500 hover:underline cursor-pointer"
                        >
                            Sign Up
                        </button>
                    </p>

                </div>
            </div>
        </div>
    );
}