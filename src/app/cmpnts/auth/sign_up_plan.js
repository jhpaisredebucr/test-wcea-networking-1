"use client"

export default function SignUpPlan({ formData, setFormData, nextStep, prevStep }) {
    function Next() {
        console.log(formData);
        const isMissing = CheckMissingFields();
        if (isMissing) {
            return;
        }
        nextStep();
    }

    function Prev() {
        console.log(formData);
        prevStep();
    }   

    function SetPlan(plan) {
        setFormData(prev => ({ ...prev, plan: plan }));
    }

    function CheckMissingFields() {
        const { plan} = formData;

        if (!plan) {
            alert("Please fill in all required fields.");
            return true;
        }
    }

    return (
        <div className="flex w-[60%] flex-col items-center justify-center p-30 col-span-2">
            <div className="w-full mb-10">
                <p className="font-semibold text-2xl text-gray-600">Create Account</p>
                <p className="text-gray-600">Please fill in your details to join our community portal.</p>
            </div>
            <div className="w-full grid grid-cols-3 gap-x-5">
                <button onClick={() => SetPlan(1)} className={`w-40 h-40 rounded-full flex flex-col justify-center items-center ${formData.planId === 1 ? "bg-blue-400 text-white" : "bg-gray-200 hover:bg-gray-100"}`}>
                    <p>Plan 1</p>
                    <p>Price: 300</p>
                </button>
                <button onClick={() => SetPlan(2)} className={`w-40 h-40 rounded-full flex flex-col justify-center items-center ${formData.planId === 2 ? "bg-blue-400 text-white" : "bg-gray-200 hover:bg-gray-100"}`}>
                    <p>Plan 2</p>
                    <p>Price: 900</p>
                </button>
                <button onClick={() => SetPlan(3)} className={`w-40 h-40 rounded-full flex flex-col justify-center items-center ${formData.planId === 3 ? "bg-blue-400 text-white" : "bg-gray-200 hover:bg-gray-100"}`}>
                    <p>Plan 3</p>
                    <p>price: 1500</p>
                </button>
                <div className="flex mt-5">
                    <button onClick={Prev} className="w-full mx-2 h-13 bg-blue-500 p-2 rounded-full text-white">Back</button>
                    <button onClick={Next} className="w-full mx-2 h-13 bg-blue-500 p-2 rounded-full text-white">Next</button>
                </div>
            </div>
        </div>
    )
}