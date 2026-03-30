"use client"
import Input from "../common/input"
import { useRouter } from "next/navigation";

export default function SignUpInfo({ formData, setFormData, nextStep }) {
    const router = useRouter();

    function CheckMissingFields() {
        const { username, email, contactNumber, referralCode, password, confirmPassword } = formData;

        if (!username || !email || !contactNumber || !password || !confirmPassword || !referralCode) {
            alert("Please fill in all required fields.");
            return true;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return true;
        }
    }
 
    async function HandleSignUp() {
        const isMissing = CheckMissingFields();
        if (isMissing) {
            return;
        }

        const res = await fetch("/api/signup/check-availability", {
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify(formData)
        });

        const data = await res.json();
        if (data.success) {
            nextStep();
        } else {
            alert(data.message);
        }
        
        console.log(data);
        console.log(formData);
    }

    function HandleSignIn() {
        router.push("/home/signin");
    }   

    return (
        <div className="flex w-[60%] flex-col items-center justify-center p-30 col-span-2">
            <div className="w-full mb-10">
                <p className="font-semibold text-2xl">Create Account</p>
                <p>Please fill in your details to join our community portal.</p>
            </div>
            <div className="w-full grid grid-cols-2 gap-x-5">
                <Input label="Username" type="text" require value={formData.username} onChange={(val) => setFormData({ ...formData, username: val })}/>
                <Input label="Email Address" type="text" require value={formData.email} onChange={(val) => setFormData({ ...formData, email: val })} />
                <Input label="Contact Number" type="text" value={formData.contactNumber} onChange={(val) => setFormData({ ...formData, contactNumber: val })} />
                <Input label="Referral Code" type="text" value={formData.referralCode} onChange={(val) => setFormData({ ...formData, referralCode: val })} />
                <Input label="Password" type="text" value={formData.password} onChange={(val) => setFormData({ ...formData, password: val })} />
                <Input label="Confirm Password" type="text" value={formData.confirmPassword} onChange={(val) => setFormData({ ...formData, confirmPassword: val })} />
                <button onClick={HandleSignUp} className="w-full h-13 bg-blue-400 col-span-2 p-2 rounded-md text-white">Create Account</button>
                <div className="col-span-2 flex flex-col my-2">
                    <p>
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