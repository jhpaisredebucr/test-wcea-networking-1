"use client";

import Input from "../ui/Input";
import { useRouter } from "next/navigation";
import { useState } from "react";
import SemanticCard from "../card/SemanticCard";

export default function SignUpInfo({ formData, setFormData, nextStep, isLoading, setIsLoading }) {
    const router = useRouter();

    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    function validate() {
        const {
            username,
            email,
            contactNumber,
            password,
            confirmPassword
        } = formData;

        const newErrors = {};

        if (!username) newErrors.username = "Username is required.";
        if (!email) newErrors.email = "Email is required.";
        if (!contactNumber) newErrors.contactNumber = "Contact number is required.";
        if (!password) newErrors.password = "Password is required.";
        if (!confirmPassword)
            newErrors.confirmPassword = "Please confirm your password.";

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email && !emailRegex.test(email)) {
            newErrors.email = "Please enter a valid email address.";
        }

        const contactRegex = /^09\d{9}$/;
        if (contactNumber && !contactRegex.test(contactNumber)) {
            newErrors.contactNumber =
                "Enter a valid PH number (e.g. 09XXXXXXXXX).";
        }

        if (password && confirmPassword && password !== confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    async function HandleSignUp() {
        if (isLoading) return;
        if (!validate()) return;

        setIsLoading(true);
        try {
            const res = await fetch(
                "/api/auth/signup/check-availability",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData)
                }
            );

            const data = await res.json();

            if (data.success) {
                nextStep();
            } else {
                setErrors({ api: data.message });
            }
        } finally {
            setIsLoading(false);
        }
    }

    function HandleSignIn() {
        router.push("/home/signin");
    }

    function handleKeyDown(e) {
        if (e.key === "Enter") {
            e.preventDefault();
            HandleSignUp();
        }
    }

    return (
        <div className="w-full flex justify-center">

            {/* FORM CARD */}
            <div className="w-full max-w-md sm:max-w-lg lg:max-w-2xl xl:max-w-4xl mx-auto bg-white shadow-xl rounded-2xl border border-gray-100 p-4 sm:p-6 lg:p-8"> 

                {/* HEADER */}
                <div className="mb-8 text-center md:text-left flex justify-between">
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-800">
                            Create Account
                        </h2>

                        <p className="text-gray-500 mt-1">
                            Please fill in your details to join our community portal.
                        </p>
                    </div>
                    

                    <button
                        onClick={() => router.push("/home")}
                        className="text-sm text-gray-500 hover:text-gray-800 transition mb-4 inline-flex items-center gap-1"
                    >
                        ← Back to Homepage
                    </button>
                </div>

                


                {/* API ERROR */}
                {errors.api && (
                    <div className="mb-6">
                        <SemanticCard semantic="error">
                            {errors.api}
                        </SemanticCard>
                    </div>
                )}


                {/* FORM GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                    {/* Username */}
                    <FormField error={errors.username}>
                        <Input
                            label="Username"
                            type="text"
                            required
                            value={formData.username}
                            onChange={(val) =>
                                setFormData({
                                    ...formData,
                                    username: val
                                })
                            }
                            onKeyDown={handleKeyDown}
                        />
                    </FormField>


                    {/* Email */}
                    <FormField error={errors.email}>
                        <Input
                            label="Email Address"
                            type="text"
                            required
                            value={formData.email}
                            onChange={(val) =>
                                setFormData({
                                    ...formData,
                                    email: val
                                })
                            }
                        />
                    </FormField>


                    {/* Contact */}
                    <FormField error={errors.contactNumber}>
                        <Input
                            label="Contact Number"
                            type="text"
                            required
                            value={formData.contactNumber}
                            onChange={(val) =>
                                setFormData({
                                    ...formData,
                                    contactNumber: val
                                })
                            }
                        />
                    </FormField>


                    {/* Referral */}
                    <FormField>
                        <Input
                            label="Referral Code"
                            type="text"
                            value={formData.referralCode}
                            onChange={(val) =>
                                setFormData({
                                    ...formData,
                                    referralCode: val
                                })
                            }
                        />
                    </FormField>


                    {/* Password */}
                    <FormField error={errors.password}>
                        <PasswordField
                            label="Password"
                            value={formData.password}
                            visible={showPassword}
                            toggle={() =>
                                setShowPassword(!showPassword)
                            }
                            onChange={(val) =>
                                setFormData({
                                    ...formData,
                                    password: val
                                })
                            }
                            onKeyDown={handleKeyDown}
                        />
                    </FormField>


                    {/* Confirm Password */}
                    <FormField error={errors.confirmPassword}>
                        <PasswordField
                            label="Confirm Password"
                            value={formData.confirmPassword}
                            visible={showConfirmPassword}
                            toggle={() =>
                                setShowConfirmPassword(
                                    !showConfirmPassword
                                )
                            }
                            onChange={(val) =>
                                setFormData({
                                    ...formData,
                                    confirmPassword: val
                                })
                            }
                            onKeyDown={handleKeyDown}
                        />
                    </FormField>


                    {/* BUTTON */}
                    <button
                        onClick={HandleSignUp}
                        disabled={isLoading}
                        className="
                        col-span-1 md:col-span-2
                        mt-4 h-12
                        rounded-lg
                        font-semibold
                        text-white
                        bg-[var(--primary)]
                        hover:opacity-90
                        active:scale-[0.98]
                        transition
                        shadow-md
                        disabled:opacity-50 disabled:cursor-not-allowed
                        min-h-[44px]
                        " 
                    >
                        {isLoading ? "Checking..." : "Create Account"}
                    </button>


                    {/* SIGN IN LINK */}
                    <div className="col-span-2 text-center mt-2">
                        <p className="text-sm text-gray-600">
                            Already have an account?
                            <button
                                onClick={HandleSignIn}
                                className="ml-2 font-medium text-blue-600 hover:underline"
                            >
                                Sign In Here
                            </button>
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
}


/* FIELD WRAPPER */

function FormField({ children, error }) {
    return (
        <div className="flex flex-col">
            {children}

            {error && (
                <p className="text-xs text-red-500 mt-1">
                    {error}
                </p>
            )}
        </div>
    );
}


/* PASSWORD FIELD */

function PasswordField({
    label,
    value,
    visible,
    toggle,
    onChange,
    onKeyDown
}) {
    return (
        <div className="relative">

            <Input
                label={label}
                type={visible ? "text" : "password"}
                required
                value={value}
                onChange={onChange}
                onKeyDown={onKeyDown}
            />

            <button
                type="button"
                onClick={toggle}
                className="absolute right-3 top-11 text-xs text-gray-400 hover:text-gray-600"
            >
                {visible ? "Hide" : "Show"}
            </button>

        </div>
    );
}