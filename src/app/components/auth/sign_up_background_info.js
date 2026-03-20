import Input from "../ui/input"

export default function SignUpBackgroundInfo({ formData, setFormData, nextStep  }) {
    function HandleSignUp() {
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
                <Input label="First Name" type="text" value={formData.username} onChange={(val) => setFormData({ ...formData, username: val })} />
                <Input label="Last Name" type="text" value={formData.email} onChange={(val) => setFormData({ ...formData, email: val })} />
                <Input label="Middle Name" type="text" value={formData.contactNumber} onChange={(val) => setFormData({ ...formData, contactNumber: val })} />
                <Input label="Date of Birth" type="text" value={formData.referralCode} onChange={(val) => setFormData({ ...formData, referralCode: val })} />
                <Input label="City" type="text" value={formData.password} onChange={(val) => setFormData({ ...formData, password: val })} />
                <Input label="Baranggay" type="text" value={formData.confirmPassword} onChange={(val) => setFormData({ ...formData, confirmPassword: val })} />
                <Input label="Street Address" type="text" value={formData.streetAddress} onChange={(val) => setFormData({ ...formData, streetAddress: val })} />
                <Input label="Postal Code" type="text" value={formData.postalCode} onChange={(val) => setFormData({ ...formData, postalCode: val })} />

                <button onClick={HandleSignUp} className="w-full h-13 bg-blue-400 col-span-2 p-2 rounded-md text-white">Next Step</button>
                {/* <div className="col-span-2 flex flex-col my-2">
                    <p className="text-gray-600">
                        Already have an account?
                        <button onClick={HandleSignIn} className="inline ml-2 text-blue-500 hover:underline">
                            Sign In Here
                        </button>
                    </p>
                </div> */}
            </div>
        </div>
    )
}