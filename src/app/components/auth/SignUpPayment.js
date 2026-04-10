"use client"
import { useRouter } from "next/navigation";
import { useState } from "react";
import UploadImageModal from "../ui/UploadPicture";

export default function SignUpPayment({ formData, setFormData, nextStep, prevStep }) {
    const router = useRouter();

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

    const [isUploadOpen, setIsUploadOpen] = useState(false);
    function handleUpload(file) {
        setFormData(prev => ({
            ...prev,
            paymentProof: file
        }));
    }

    async function HandleSignUp() {

        if (!formData.paymentProof) {
            alert("Please upload proof of payment.");
            return;
        }

        // upload image first
        const uploadData = new FormData();
        uploadData.append("file", formData.paymentProof);

        const cloudinaryRes = await fetch("/api/cloudinary/upload", {
            method: "POST",
            body: uploadData,
        });

        const cloudinaryData = await cloudinaryRes.json();

        if (!cloudinaryData.url) {
            alert("Upload failed");
            return;
        }

        console.log("Cloudinary URL:", cloudinaryData.url);

        // store URL inside formData
        const updatedFormData = {
            ...formData,
            paymentUrl: cloudinaryData.url
        };

        // send signup request
        const res = await fetch("/api/auth/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedFormData)
        });

        const data = await res.json();

        console.log("Signup result:", data);

        console.log("User ID: ", data.user.id, "Plan Price: ", planPrice, "Cloudinary URL: ", cloudinaryData.url);
        //TRANSACTIONS
        const resTransaction  = await fetch("/api/portal/member/transactions", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ user_id: data.user.id, type: "Plan", amount: planPrice, proof: cloudinaryData.url })
        });

        const dataTransaction  = await resTransaction.json();
        console.log(dataTransaction);
    }

    return (
        <div className="flex w-[60%] flex-col items-center justify-center p-30 col-span-2">
            <UploadImageModal
                isOpen={isUploadOpen}
                onClose={() => setIsUploadOpen(false)}
                onUpload={(handleUpload)}
            />
            <div className="w-full mb-10">
                <p className="font-semibold text-2xl text-gray-600">Create Account</p>
                <p className="text-gray-600">Please fill in your details to join our community portal.</p>
            </div>
            <p className="w-full justify-self-start mb-5">Amount: {planPrice}</p>
            <div className="w-full grid grid-cols-3 gap-5">
                <button onClick={() => SetPlan(1)} className={`w-40 h-40 rounded-full flex justify-center items-center ${formData.paymentMethod === "BANK" ? "bg-blue-400 text-white" : "bg-gray-200 hover:bg-gray-100"}`}>
                    <p>BANK</p>
                </button>
                <button onClick={() => SetPlan(2)} className={`w-40 h-40 rounded-full flex justify-center items-center ${formData.paymentMethod === "GCASH" ? "bg-blue-400 text-white" : "bg-gray-200 hover:bg-gray-100"}`}>
                    <p>GCASH</p>
                </button>
                <button onClick={() => SetPlan(3)} className={`w-40 h-40 rounded-full flex justify-center items-center ${formData.paymentMethod === "PAYMAYA" ? "bg-blue-400 text-white" : "bg-gray-200 hover:bg-gray-100"}`}>
                    <p>PAYMAYA</p>
                </button>
                <p>Proof of Payment: </p>
                <button
                    onClick={() => setIsUploadOpen(true)}
                    className="bg-blue-500 text-white px-4 py-1 rounded"
                >
                    Upload
                </button>
                <p></p>
                <div className="flex mt-5">
                    <button onClick={Prev} className="w-full mx-2 h-13 bg-blue-500 p-2 rounded-full text-white">Back</button>
                    <button onClick={Next} className="w-full mx-2 h-13 bg-blue-500 p-2 rounded-full text-white">Submit</button>
                </div>
            </div>
        </div>
    )
}