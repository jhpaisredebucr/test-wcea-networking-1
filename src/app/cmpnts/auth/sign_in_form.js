"use client"
import Input from "../common/input"
import { useState } from "react";
import { useRouter } from "next/navigation";

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
        let newErrors = {
            username: "",
            password: "",
            general: ""
        };

        if (!username) newErrors.username = "Username is required";
        if (!password) newErrors.password = "Password is required";

        setErrors(newErrors);

        return !newErrors.username && !newErrors.password;
    }

    async function HandleSignIn() {
        if (!validate()) return;

        setLoading(true);

        try {
            const res = await fetch("/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password })
            });

            const data = await res.json();

            if (data.success) {
                localStorage.setItem("userID", data.user.id);

                if (data.user.role === "admin") {
                    router.replace("/u/dashboard/admin");
                } else {
                    router.replace("/u/dashboard/member");
                }
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
        }

        setLoading(false);
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

                {errors.general && (
                    <div className="col-span-2 mb-2 p-3 rounded-md bg-red-100 text-red-600 text-sm">
                        {errors.general}
                    </div>
                )}

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
                <button
                    onClick={HandleSignIn}
                    disabled={loading}
                    className={`
                        w-full h-13 col-span-2 rounded-md text-white
                        transition duration-200

                        ${loading
                            ? "bg-blue-300 cursor-not-allowed"
                            : "bg-blue-500 hover:bg-blue-600"
                        }
                    `}
                >
                    {loading ? "Signing in..." : "Sign In"}
                </button>

                <div className="col-span-2 flex flex-col my-2">
                    <p className="text-gray-600">
                        Don’t have an account?
                        <button
                            onClick={HandleSignUp}
                            className="inline ml-2 text-(--primary-color) hover:underline"
                        >
                            Sign Up Here
                        </button>
                    </p>
                </div>

            </div>
        </div>
    );
}