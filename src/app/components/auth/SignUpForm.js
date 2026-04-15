"use client"
import { useState } from "react";
import SignUpInfo from "./SignUpInfo";
import SignUpBackgroundInfo from "./SignUpBackgroundInfo";
import SignUpPlan from "./SignUpPlan";
import SignUpPayment from "./SignUpPayment";
import SignUpApproval from "./SignUpApproval";

// 🔧 Toggle this ON/OFF for debugging
const DEBUG_PRESET = true;

export default function SignUpForm({ refCode }) {
const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const generatePresetData = () => {
    const randomNumber = Math.floor(1000 + Math.random() * 9000);
    const randomPhone = `09${Math.floor(100000000 + Math.random() * 900000000)}`;

    return {
      username: `user${randomNumber}`,
      email: `user${randomNumber}@test.com`,
      contactNumber: randomPhone,
      referralCode: refCode || `MEM-N_2UUB`,
      password: "yeolswi",
      confirmPassword: "yeolswi",

      firstName: "Paulo Reeve",
      middleName: "Castillano",
      lastName: "Buta",
      dob: "1995-05-15",
      city: "Imus",
      barangay: "Alapan",
      streetAddress: `${randomNumber} Sample Street`,
      postalCode: "4103",

      planId: Math.floor(Math.random() * 3) + 1,

      paymentMethod: "gcash",
      paymentProof: null,
      paymentUrl: "",

      status: "pending"
    };
  };

  const generateEmptyData = () => ({
    username: "",
    email: "",
    contactNumber: "",
    referralCode: refCode || "",
    password: "",
    confirmPassword: "",

    firstName: "",
    middleName: "",
    lastName: "",
    dob: "",
    city: "",
    barangay: "",
    streetAddress: "",
    postalCode: "",

    planId: null,

    paymentMethod: "",
    paymentProof: null,
    paymentUrl: "",

    status: "pending"
  });

  const [formData, setFormData] = useState(() =>
    DEBUG_PRESET ? generatePresetData() : generateEmptyData()
  );

  return (
    <>
{step === 1 && (
        <SignUpInfo
          formData={formData}
          setFormData={setFormData}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          nextStep={() => !isLoading && setStep(prev => prev + 1)}
          prevStep={() => !isLoading && setStep(prev => prev - 1)}
          refCode={refCode}
        />
      )}
      {step === 2 && (
        <SignUpBackgroundInfo
          formData={formData}
          setFormData={setFormData}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          nextStep={() => !isLoading && setStep(prev => prev + 1)}
          prevStep={() => !isLoading && setStep(prev => prev - 1)}
        />
      )}
      {step === 3 && (
        <SignUpPlan
          formData={formData}
          setFormData={setFormData}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          nextStep={() => !isLoading && setStep(prev => prev + 1)}
          prevStep={() => !isLoading && setStep(prev => prev - 1)}
        />
      )}
      {step === 4 && (
        <SignUpPayment
          formData={formData}
          setFormData={setFormData}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          nextStep={() => !isLoading && setStep(prev => prev + 1)}
          prevStep={() => !isLoading && setStep(prev => prev - 1)}
        />
      )}
      {step === 5 && (
        <SignUpApproval
          formData={formData}
          setFormData={setFormData}
          nextStep={() => setStep(prev => prev + 1)}
          prevStep={() => setStep(prev => prev - 1)}
        />
      )}
    </>
  );
}