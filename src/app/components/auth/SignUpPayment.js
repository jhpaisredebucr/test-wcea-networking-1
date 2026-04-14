"use client";

import { useState } from "react";
import UploadImageModal from "../ui/UploadPicture";
import { useRouter } from "next/navigation";

export default function SignUpPayment({
    formData,
    setFormData,
    nextStep,
    prevStep
}) {

    const router = useRouter();
    const [error, setError] = useState(null);
    const [isUploadOpen, setIsUploadOpen] = useState(false);


    // 🧠 TRACK STATE CHANGES
    function logState(label, data) {
        console.log(`\n🟡 [${label}]`, data);
    }


    function setPayment(method) {

        const map = {
            1: "BANK",
            2: "GCASH",
            3: "PAYMAYA"
        };

        const selected = map[method];

        setFormData(prev => {
            const updated = {
                ...prev,
                paymentMethod: selected
            };

            logState("PAYMENT METHOD SET", updated.paymentMethod);
            logState("FULL FORM DATA", updated);

            return updated;
        });

        setError(null);
    }


    let planPrice = {
        1: 300,
        2: 900,
        3: 1500
    }[formData.planId];


    function handleUpload(file) {

        console.log("\n📁 FILE RECEIVED:", file);

        setFormData(prev => {
            const updated = {
                ...prev,
                paymentProof: file
            };

            logState("UPLOAD SET", updated.paymentProof);

            return updated;
        });
    }


    async function HandleSignUp() {

        console.log("\n🚀 SUBMIT CLICKED");
        logState("CURRENT FORM DATA", formData);


        if (!formData.paymentMethod) {
            console.warn("❌ Missing payment method");
            setError("Please select a payment method.");
            return;
        }

        if (!formData.paymentProof) {
            console.warn("❌ Missing payment proof");
            setError("Please upload proof of payment.");
            return;
        }


        console.log("✅ Validation passed");


        nextStep();


        // -------------------------
        // CLOUDINARY UPLOAD
        // -------------------------
        const uploadData = new FormData();
        uploadData.append("file", formData.paymentProof);

        console.log("☁️ Uploading to Cloudinary...");
        console.log("FILE BEING SENT:", formData.paymentProof);


        const cloudinaryRes = await fetch(
            "/api/cloudinary/upload",
            {
                method: "POST",
                body: uploadData
            }
        );

        const cloudinaryData = await cloudinaryRes.json();

        console.log("☁️ CLOUDINARY RESPONSE:", cloudinaryData);


        if (!cloudinaryData.url) {
            console.error("❌ Cloudinary upload failed");
            setError("Upload failed.");
            return;
        }


        // -------------------------
        // SIGNUP REQUEST
        // -------------------------
        const updatedFormData = {
            ...formData,
            paymentUrl: cloudinaryData.url
        };

        console.log("📦 FINAL PAYLOAD (SIGNUP):", updatedFormData);


        const res = await fetch(
            "/api/auth/signup",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updatedFormData)
            }
        );

        const data = await res.json();

        console.log("👤 SIGNUP RESPONSE:", data);


        // -------------------------
        // TRANSACTION
        // -------------------------
        console.log("💳 Creating transaction...");

        const transactionPayload = {
            user_id: data.user.id,
            type: "plan",
            amount: planPrice,
            proof: cloudinaryData.url
        };

        console.log("📦 TRANSACTION PAYLOAD:", transactionPayload);


        const transactionRes = await fetch(
            "/api/portal/member/transactions",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(transactionPayload)
            }
        );

        const transactionData = await transactionRes.json();

        console.log("💳 TRANSACTION RESPONSE:", transactionData);
    }


    return (

        <div className="w-full flex justify-center">

            <UploadImageModal
                isOpen={isUploadOpen}
                onClose={() => setIsUploadOpen(false)}
                onUpload={handleUpload}
            />


            {/* CARD */}
            <div className="w-full max-w-5xl bg-white shadow-xl rounded-2xl border border-gray-100 p-8 md:p-12">

                {/* HEADER */}
                <div className="mb-8 text-center md:text-left flex justify-between">
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-800">
                            Payment Details
                        </h2>

                        <p className="text-gray-500 mt-1">
                            Complete your membership payment.
                        </p>
                    </div>
                    

                    <button
                        onClick={() => router.push("/home/main")}
                        className="text-sm text-gray-500 hover:text-gray-800 transition mb-4 inline-flex items-center gap-1"
                    >
                        ← Back to Homepage
                    </button>
                </div>


                {/* AMOUNT */}
                <div className="mb-6">

                    <p className="text-lg text-gray-700">
                        Amount:
                        <span className="ml-2 font-bold text-(--primary)">
                            ₱{planPrice}
                        </span>
                    </p>

                </div>


                {/* ERROR */}
                {error && (
                    <p className="text-sm text-red-500 mb-6">
                        {error}
                    </p>
                )}


                {/* PAYMENT METHODS */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    <PaymentCard
                        label="Bank Transfer"
                        selected={formData.paymentMethod === "BANK"}
                        onClick={() => setPayment(1)}
                    />

                    <PaymentCard
                        label="GCash"
                        selected={formData.paymentMethod === "GCASH"}
                        onClick={() => setPayment(2)}
                    />

                    <PaymentCard
                        label="PayMaya"
                        selected={formData.paymentMethod === "PAYMAYA"}
                        onClick={() => setPayment(3)}
                    />

                </div>


                {/* UPLOAD */}
                <div className="mt-8">

                    <p className="text-sm text-gray-600 mb-2">
                        Proof of Payment
                    </p>

                    <button
                        onClick={() => setIsUploadOpen(true)}
                        className="
                        px-5 py-2 rounded-lg
                        bg-(--primary)
                        text-white font-medium
                        hover:opacity-90 transition
                        "
                    >
                        Upload Screenshot
                    </button>


                    {formData.paymentProof && (
                        <p className="text-xs text-green-600 mt-2">
                            File uploaded ✓
                        </p>
                    )}

                </div>


                {/* BUTTONS */}
                <div className="flex gap-4 mt-10">

                    <button
                        onClick={prevStep}
                        className="flex-1 h-12 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
                    >
                        Back
                    </button>

                    <button
                        onClick={HandleSignUp}
                        className="flex-1 h-12 rounded-lg bg-(--primary) text-white font-semibold hover:opacity-90 active:scale-[0.98] transition shadow-md"
                    >
                        Submit Registration
                    </button>

                </div>

            </div>

        </div>
    );
}


/* PAYMENT CARD */
function PaymentCard({ label, selected, onClick }) {

    return (

        <button
            onClick={onClick}
            className={`
            flex items-center justify-center rounded-xl border p-6 font-semibold transition
            hover:-translate-y-1 hover:shadow-md
            ${selected
                ? "border-(--primary) ring-2 ring-(--primary)"
                : "border-gray-200 hover:border-gray-300"
            }
            `}
        >
            {label}
        </button>

    );
}