"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUpPlan({
    formData,
    setFormData,
    nextStep,
    prevStep,
    isLoading,
    setIsLoading
}) {

    const router = useRouter();
    const [error, setError] = useState(null);


    function SetPlan(planId) {
        setFormData(prev => ({
            ...prev,
            planId
        }));

        setError(null);
    }


    function Next() {
        if (isLoading) return;

        if (!formData.planId) {
            setError("Please select a membership plan.");
            return;
        }

        setIsLoading(true);
        setTimeout(() => {
            nextStep();
            setIsLoading(false);
        }, 300);
    }


    function Prev() {
        prevStep();
    }


    return (

        <div className="w-full flex justify-center">

            {/* CARD */}
            <div className="w-full max-w-md sm:max-w-lg lg:max-w-2xl xl:max-w-4xl mx-auto bg-white shadow-xl rounded-2xl border border-gray-100 p-4 sm:p-6 lg:p-8"> 

                {/* HEADER */}
                <div className="mb-8 text-center md:text-left flex justify-between">
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-800">
                            Choose Your Membership Plan
                        </h2>

                        <p className="text-gray-500 mt-1">
                            Select the plan that best fits your needs.
                        </p>
                    </div>
                    

                    <button
                        onClick={() => router.push("/home")}
                        className="mb-4 inline-flex items-center gap-1 rounded-md border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors"
                    >
                        ← Back to Homepage
                    </button>
                </div>


                {/* ERROR MESSAGE */}
                {error && (
                    <p className="text-sm text-red-500 mb-6">
                        {error}
                    </p>
                )}


                {/* PLAN GRID */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">


                    <PlanCard
                        title="Community Basic"
                        price="₱300"
                        selected={formData.planId === 1}
                        onClick={() => SetPlan(1)}
                    />


                    <PlanCard
                        title="Community Elite"
                        price="₱900"
                        selected={formData.planId === 2}
                        highlight
                        onClick={() => SetPlan(2)}
                    />


                    <PlanCard
                        title="Community Premium"
                        price="₱1500"
                        selected={formData.planId === 3}
                        onClick={() => SetPlan(3)}
                    />


                </div>


                {/* BUTTONS */}
                <div className="flex gap-4 mt-10">


                    <button
                        onClick={Prev}
                        className="
                        flex-1
                        h-12
                        rounded-lg
                        border
                        border-gray-300
                        text-gray-700
                        hover:bg-gray-100
                        transition
                        "
                    >
                        Back
                    </button>


                    <button
                        onClick={Next}
                        disabled={isLoading}
                        className="
                        flex-1
                        min-h-[44px] h-12
                        rounded-lg
                        bg-[var(--primary)]
                        text-white
                        font-semibold
                        hover:opacity-90
                        active:scale-[0.98]
                        transition
                        shadow-md
                        disabled:opacity-50 disabled:cursor-not-allowed
                        " 
                    >
                        {isLoading ? "Please wait..." : "Continue"}
                    </button>


                </div>

            </div>

        </div>

    );
}


/* PLAN CARD COMPONENT */

function PlanCard({
    title,
    price,
    selected,
    highlight = false,
    onClick
}) {

    return (

        <button
            onClick={onClick}
            className={`
            relative
            flex flex-col
            items-center
            justify-center
            text-center
            rounded-xl
            border
            p-6
            transition
            hover:-translate-y-1
            hover:shadow-md
            
            ${selected
                ? "border-(--primary) ring-2 ring-(--primary)"
                : "border-gray-200 hover:border-gray-300"
            }

            ${highlight
                ? "shadow-lg"
                : ""
            }
            `}
        >

            {highlight && (
                <span className="
                absolute
                top-0
                right-6
                -translate-y-1/2
                bg-[#ffddaf]
                text-xs
                px-3
                py-1
                rounded-full
                font-semibold
                ">
                    Most Popular
                </span>
            )}


            <p className="text-lg font-semibold text-gray-800">
                {title}
            </p>


            <p className="
            text-3xl
            font-bold
            text-(--primary)
            mt-2
            ">
                {price}
            </p>


        </button>

    );
}