"use client"
import Input from "../ui/input"
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUpInfo({ formData, setFormData, nextStep  }) {
    // const router = useRouter();
    // const [username, setUsername] = useState("");
    // const [email, setEmail] = useState("");
    // const [contactNumber, setContactNum] = useState("");
    // const [referralCode, setReferralCode] = useState("");
    // const [password, setPassword] = useState("");
    // const [confirmPassword, setConfirmPassword] = useState("");

    async function HandleSignUp() {
        // console.log(username);
        // console.log(email);
        // console.log(contactNumber);
        // console.log(referralCode);
        // console.log(password);
        // console.log(confirmPassword);
        // const res = await fetch("/api/signup", {
        //     method: "POST",
        //     headers: {"Content-Type": "application/json"},
        //     body: JSON.stringify({username, email, contactNumber, referralCode, password})
        // });

        // const data = await res.json();

        // if (data.success) {
        //     console.log("Logged In: ", data.user.username);
        //     if (data.user.role === "admin") {
        //         router.replace("/user-page/dashboard/admin");
        //     } else {
        //         router.replace("/user-page/dashboard/member");
        //     }
        // } else {
        //     console.log("Login Failed");
        //     console.log(data.message);
        // }
        console.log(formData);
        nextStep();
    }

    function HandleSignIn() {
        router.push("/landing-page/auth/signin");
    }   

    return (
        <div className="flex w-[60%] flex-col items-center justify-center p-30 col-span-2">
            <div className="w-full mb-10">
                <p className="font-semibold text-2xl text-gray-600">Create Account</p>
                <p className="text-gray-600">Please fill in your details to join our community portal.</p>
            </div>
            <div className="w-full grid grid-cols-2 gap-x-5">
                <Input label="Username" type="text" value={formData.username} onChange={(val) => setFormData({ ...formData, username: val })} />
                <Input label="Email Address" type="text" value={formData.email} onChange={(val) => setFormData({ ...formData, email: val })} />
                <Input label="Contact Number" type="text" value={formData.contactNumber} onChange={(val) => setFormData({ ...formData, contactNumber: val })} />
                <Input label="Referral Code" type="text" value={formData.referralCode} onChange={(val) => setFormData({ ...formData, referralCode: val })} />
                <Input label="Password" type="text" value={formData.password} onChange={(val) => setFormData({ ...formData, password: val })} />
                <Input label="Confirm Password" type="text" value={formData.confirmPassword} onChange={(val) => setFormData({ ...formData, confirmPassword: val })} />
                <button onClick={HandleSignUp} className="w-full h-13 bg-blue-400 col-span-2 p-2 rounded-md text-white">Create Account</button>
                <div className="col-span-2 flex flex-col my-2">
                    <p className="text-gray-600">
                        Already have an account?
                        <button onClick={HandleSignIn} className="inline ml-2 text-blue-500 hover:underline">
                            Sign In Here
                        </button>
                    </p>
                </div>
            </div>
        </div>
    )
}