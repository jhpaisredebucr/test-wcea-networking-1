"use client";

import Input from "../ui/Input";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUpBackgroundInfo({
    formData,
    setFormData,
    nextStep,
    prevStep,
    isLoading,
    setIsLoading
}) {

    const router = useRouter();
    const [errors, setErrors] = useState({});


    function validate() {

        const {
            firstName,
            middleName,
            lastName,
            dob,
            city,
            barangay,
            streetAddress,
            postalCode
        } = formData;

        const newErrors = {};

        if (!firstName) newErrors.firstName = "Required";
        if (!middleName) newErrors.middleName = "Required";
        if (!lastName) newErrors.lastName = "Required";
        if (!dob) newErrors.dob = "Required";
        if (!city) newErrors.city = "Required";
        if (!barangay) newErrors.barangay = "Required";
        if (!streetAddress) newErrors.streetAddress = "Required";
        if (!postalCode) newErrors.postalCode = "Required";

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    }


    function Next() {
        if (isLoading) return;
        if (!validate()) return;
        setIsLoading(true);
        setTimeout(() => {
            nextStep();
            setIsLoading(false);
        }, 500); // Brief debounce
    }


    function Prev() {
        prevStep();
    }


    return (

        <div className="w-full flex justify-center">

            {/* CARD CONTAINER */}
            <div className="w-full max-w-4xl bg-white shadow-xl rounded-2xl border border-gray-100 p-8 md:p-12">

                {/* HEADER */}
                <div className="mb-8 text-center md:text-left flex justify-between">
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-800">
                            Background Information
                        </h2>

                        <p className="text-gray-500 mt-1">
                            Tell us more about yourself.
                        </p>
                    </div>
                    

                    <button
                        onClick={() => router.push("/home")}
                        className="text-sm text-gray-500 hover:text-gray-800 transition mb-4 inline-flex items-center gap-1"
                    >
                        ← Back to Homepage
                    </button>
                </div>


                {/* FORM GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">


                    <FormField error={errors.firstName}>
                        <Input
                            label="First Name"
                            value={formData.firstName}
                            onChange={(val) =>
                                setFormData({
                                    ...formData,
                                    firstName: val
                                })
                            }
                        />
                    </FormField>


                    <FormField error={errors.lastName}>
                        <Input
                            label="Last Name"
                            value={formData.lastName}
                            onChange={(val) =>
                                setFormData({
                                    ...formData,
                                    lastName: val
                                })
                            }
                        />
                    </FormField>


                    <FormField error={errors.middleName}>
                        <Input
                            label="Middle Name"
                            value={formData.middleName}
                            onChange={(val) =>
                                setFormData({
                                    ...formData,
                                    middleName: val
                                })
                            }
                        />
                    </FormField>


                    <FormField error={errors.dob}>
                        <Input
                            label="Date of Birth"
                            type="date"
                            value={formData.dob}
                            onChange={(val) =>
                                setFormData({
                                    ...formData,
                                    dob: val
                                })
                            }
                        />
                    </FormField>


                    <FormField error={errors.city}>
                        <Input
                            label="City"
                            value={formData.city}
                            onChange={(val) =>
                                setFormData({
                                    ...formData,
                                    city: val
                                })
                            }
                        />
                    </FormField>


                    <FormField error={errors.barangay}>
                        <Input
                            label="Barangay"
                            value={formData.barangay}
                            onChange={(val) =>
                                setFormData({
                                    ...formData,
                                    barangay: val
                                })
                            }
                        />
                    </FormField>


                    <FormField error={errors.streetAddress}>
                        <Input
                            label="Street Address"
                            value={formData.streetAddress}
                            onChange={(val) =>
                                setFormData({
                                    ...formData,
                                    streetAddress: val
                                })
                            }
                        />
                    </FormField>


                    <FormField error={errors.postalCode}>
                        <Input
                            label="Postal Code"
                            value={formData.postalCode}
                            onChange={(val) =>
                                setFormData({
                                    ...formData,
                                    postalCode: val
                                })
                            }
                        />
                    </FormField>


                    {/* BUTTONS */}
                    <div className="col-span-1 md:col-span-2 flex gap-4 mt-4">


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
                            h-12
                            rounded-lg
                            bg-(--primary)
                            text-white
                            font-semibold
                            hover:opacity-90
                            active:scale-[0.98]
                            transition
                            shadow-md
                            disabled:opacity-50 disabled:cursor-not-allowed
                            "
                        >
                            {isLoading ? "Please wait..." : "Next Step"}
                        </button>

                    </div>


                </div>

            </div>

        </div>

    );
}


/* FIELD WRAPPER */

function FormField({ children, error }) {

    return (
        <div className="flex flex-col">

            {children}

            {error && (
                <p className="text-xs text-red-500 mt-1">
                    {error}
                </p>
            )}

        </div>
    );
}