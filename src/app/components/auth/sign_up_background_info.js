import Input from "../ui/input"

export default function SignUpBackgroundInfo({ formData, setFormData, nextStep, prevStep }) {
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
            <div className="w-full grid grid-cols-2 gap-x-5">
                <Input label="First Name" type="text" value={formData.firstName} onChange={(val) => setFormData({ ...formData, firstName: val })} />
                <Input label="Last Name" type="text" value={formData.lastName} onChange={(val) => setFormData({ ...formData, lastName: val })} />
                <Input label="Middle Name" type="text" value={formData.middleName} onChange={(val) => setFormData({ ...formData, middleName: val })} />
                <Input label="Date of Birth" type="text" value={formData.dob} onChange={(val) => setFormData({ ...formData, dob: val })} />
                <Input label="City" type="text" value={formData.city} onChange={(val) => setFormData({ ...formData, city: val })} />
                <Input label="Baranggay" type="text" value={formData.barangay} onChange={(val) => setFormData({ ...formData, barangay: val })} />
                <Input label="Street Address" type="text" value={formData.streetAddress} onChange={(val) => setFormData({ ...formData, streetAddress: val })} />
                <Input label="Postal Code" type="text" value={formData.postalCode} onChange={(val) => setFormData({ ...formData, postalCode: val })} />
                <div className="flex">
                    <button onClick={Prev} className="w-full mx-2 h-13 bg-blue-400 p-2 rounded-full text-white">Back</button>
                    <button onClick={Next} className="w-full mx-2 h-13 bg-blue-400 p-2 rounded-full text-white">Next</button>
                </div>
            </div>
        </div>
    )
}