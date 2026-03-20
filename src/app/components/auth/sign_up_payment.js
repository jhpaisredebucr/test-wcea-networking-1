"use client"
import { useRouter } from "next/navigation";

export default function SignUpPayment({ formData, setFormData, nextStep, prevStep }) {
    const router = useRouter();

    async function HandleSignUp() {
        const res = await fetch("/api/signup", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(formData)
        });

        const data = await res.json();

        if (data.success) {
            console.log("Logged In: ", data.user.username);
            if (data.user.role === "admin") {
                router.replace("/user-page/dashboard/admin");
            } else {
                router.replace("/user-page/dashboard/member");
            }
        } else {
            console.log("Login Failed");
            console.log(data.message);
        }
    }  

    function Next() {
        console.log(formData);
        const isMissing = CheckMissingFields();
        if (isMissing) {
            return;
        }
        nextStep();
        HandleSignUp();
    }

    function Prev() {
        console.log(formData);
        prevStep();
    }   

    function CheckMissingFields() {
        const { paymentMethod } = formData;

        if (!paymentMethod) {
            alert("Please fill in all required fields.");
            return true;
        }
    }

    function SetPlan(paymentMethod) {
        switch (paymentMethod) {
            case 1:
                setFormData(prev => ({ ...prev, paymentMethod: "BANK" }));
                break;
            case 2:
                setFormData(prev => ({ ...prev, paymentMethod: "GCASH" }));
                break;
            case 3:
                setFormData(prev => ({ ...prev, paymentMethod: "PAYMAYA" }));
                break;
        }
        
    }

    let planPrice;

    switch (formData.planId) {
        case 1:
            planPrice = 300;
            break;
        case 2:
            planPrice = 900;
            break;
        case 3:
            planPrice = 1500;
            break;
    }

    return (
        <div className="flex w-[60%] flex-col items-center justify-center p-30 col-span-2">
            <div className="w-full mb-10">
                <p className="font-semibold text-2xl text-gray-600">Create Account</p>
                <p className="text-gray-600">Please fill in your details to join our community portal.</p>
            </div>
            <p className="w-full justify-self-start mb-5">Amount: {planPrice}</p>
            <div className="w-full grid grid-cols-3 gap-x-5">
                <button onClick={() => SetPlan(1)} className={`w-40 h-40 rounded-full flex justify-center items-center ${formData.paymentMethod === "BANK" ? "bg-blue-400 text-white" : "bg-gray-200 hover:bg-gray-100"}`}>
                    <p>BANK</p>
                </button>
                <button onClick={() => SetPlan(2)} className={`w-40 h-40 rounded-full flex justify-center items-center ${formData.paymentMethod === "GCASH" ? "bg-blue-400 text-white" : "bg-gray-200 hover:bg-gray-100"}`}>
                    <p>GCASH</p>
                </button>
                <button onClick={() => SetPlan(3)} className={`w-40 h-40 rounded-full flex justify-center items-center ${formData.paymentMethod === "PAYMAYA" ? "bg-blue-400 text-white" : "bg-gray-200 hover:bg-gray-100"}`}>
                    <p>PAYMAYA</p>
                </button>
                <div className="flex mt-5">
                    <button onClick={Prev} className="w-full mx-2 h-13 bg-blue-400 p-2 rounded-full text-white">Back</button>
                    <button onClick={Next} className="w-full mx-2 h-13 bg-blue-400 p-2 rounded-full text-white">Submit</button>
                </div>
            </div>
        </div>
    )
}