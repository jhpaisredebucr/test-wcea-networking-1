"use client"
import Input from "../ui/Input"
import { useRouter } from "next/navigation";
import { useState } from "react";
import SemanticCard from "../ui/SemanticCard";

export default function SignUpInfo({ formData, setFormData, nextStep }) {
    const router = useRouter();
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    function validate() {
        const { username, email, contactNumber, referralCode, password, confirmPassword } = formData;
        const newErrors = {};

        // Required fields
        if (!username) newErrors.username = "Username is required.";
        if (!email) newErrors.email = "Email is required.";
        if (!contactNumber) newErrors.contactNumber = "Contact number is required.";
        if (!password) newErrors.password = "Password is required.";
        if (!confirmPassword) newErrors.confirmPassword = "Please confirm your password.";

        // Email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email && !emailRegex.test(email)) {
            newErrors.email = "Please enter a valid email address.";
        }

        // Contact number — must be 11 digits starting with 09
        const contactRegex = /^09\d{9}$/;
        if (contactNumber && !contactRegex.test(contactNumber)) {
            newErrors.contactNumber = "Enter a valid PH number (e.g. 09XXXXXXXXX).";
        }

        // Password match
        if (password && confirmPassword && password !== confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    async function HandleSignUp() {
        const isValid = validate();
        if (!isValid) return;

        const res = await fetch("/api/auth/signup/check-availability", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        });

        const data = await res.json();
        if (data.success) {
            nextStep();
        } else {
            setErrors({ api: data.message });
        }
    }

    function HandleSignIn() {
        router.push("/home/signin");
    }

    return (
        <div className="flex w-full md:w-full flex-col items-center justify-center p-4 sm:p-6 md:p-20 md:col-span-2">
            <div className="w-full mt-4 md:mt-10">
                <p className="font-semibold text-xl sm:text-2xl">Create Account</p>
                <p className="text-sm sm:text-base text-gray-600">Please fill in your details to join our community portal.</p>
            </div>

            {errors.api && (
                <SemanticCard semantic="error">
                    {errors.api}
                </SemanticCard>
            )}

            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5">
                {/* Username */}
                <div className="flex flex-col">
                    <Input label="Username" type="text" required={true} value={formData.username}
                        onChange={(val) => setFormData({ ...formData, username: val })} />
                    {errors.username && <p className="text-xs text-red-500 mt-1">{errors.username}</p>}
                </div>

                {/* Email */}
                <div className="flex flex-col">
                    <Input label="Email Address" type="text" required={true} value={formData.email}
                        onChange={(val) => setFormData({ ...formData, email: val })} />
                    {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                </div>

                {/* Contact Number */}
                <div className="flex flex-col">
                    <Input label="Contact Number" type="text" required={true} value={formData.contactNumber}
                        onChange={(val) => setFormData({ ...formData, contactNumber: val })} />
                    {errors.contactNumber && <p className="text-xs text-red-500 mt-1">{errors.contactNumber}</p>}
                </div>

                {/* Referral Code */}
                <div className="flex flex-col">
                    <Input label="Referral Code" type="text" value={formData.referralCode}
                        onChange={(val) => setFormData({ ...formData, referralCode: val })} />
                    {errors.referralCode && <p className="text-xs text-red-500 mt-1">{errors.referralCode}</p>}
                </div>

                {/* Password */}
                <div className="flex flex-col">
                    <div className="relative">
                        <Input label="Password" type={showPassword ? "text" : "password"} required={true} value={formData.password}
                            onChange={(val) => setFormData({ ...formData, password: val })} />
                        <button type="button" onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-11 text-xs text-gray-400 hover:text-gray-600">
                            {showPassword ? "Hide" : "Show"}
                        </button>
                    </div>
                    {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
                </div>

                {/* Confirm Password */}
                <div className="flex flex-col">
                    <div className="relative">
                        <Input label="Confirm Password" type={showConfirmPassword ? "text" : "password"} value={formData.confirmPassword}
                            onChange={(val) => setFormData({ ...formData, confirmPassword: val })} />
                        <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-11 text-xs text-gray-400 hover:text-gray-600">
                            {showConfirmPassword ? "Hide" : "Show"}
                        </button>
                    </div>
                    {errors.confirmPassword && <p className="text-xs text-red-500 mt-1">{errors.confirmPassword}</p>}
                </div>

                {/* Create Account Button */}
                <button onClick={HandleSignUp}
                    className="w-full h-13 bg-(--primary) cursor-pointer col-span-1 md:col-span-2 p-2 rounded-md text-white font-medium mt-4 hover:opacity-90 transition-opacity">
                    Create Account
                </button>

                {/* Sign In Link */}
                <div className="col-span-1 md:col-span-2 flex flex-col my-2">
                    <p className="text-sm text-gray-700">
                        Already have an account?
                        <button onClick={HandleSignIn} className="inline cursor-pointer ml-2 text-blue-500 hover:underline font-medium">
                            Sign In Here
                        </button>
                    </p>
                </div>
            </div>
        </div>
    )
}