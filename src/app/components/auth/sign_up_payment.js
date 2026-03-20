import Input from "../ui/input"

export default function SignUpPayment({ formData, setFormData, nextStep, prevStep }) {
    function Next() {
        console.log(formData);
        nextStep();
    }

    function Prev() {
        console.log(formData);
        prevStep();
    }   

    return (
        <div className="flex w-[60%] flex-col items-center justify-center p-30 col-span-2">
            <div className="w-full mb-10">
                <p className="font-semibold text-2xl text-gray-600">Create Account</p>
                <p className="text-gray-600">Please fill in your details to join our community portal.</p>
            </div>
            <div className="w-full grid grid-cols-3 gap-x-5">
                <button className="bg-gray-200 hover:bg-gray-100 w-40 h-40 rounded-full flex justify-center items-center">
                    <p>Plan 1</p>
                </button>
                <button className="bg-gray-200 hover:bg-gray-100 w-40 h-40 rounded-full flex justify-center items-center">
                    <p>Plan 2</p>
                </button>
                <button className="bg-gray-200 hover:bg-gray-100 w-40 h-40 rounded-full flex justify-center items-center">
                    <p>Plan 3</p>
                </button>
                <div className="flex mt-5">
                    <button onClick={Prev} className="w-full mx-2 h-13 bg-blue-400 p-2 rounded-full text-white">Back</button>
                    <button onClick={Next} className="w-full mx-2 h-13 bg-blue-400 p-2 rounded-full text-white">Next</button>
                </div>
            </div>
        </div>
    )
}