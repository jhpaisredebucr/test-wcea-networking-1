"use client"
import { useState } from "react";
import SignUpInfo from "./SignUpInfo";
import SignUpBackgroundInfo from "./SignUpBackgroundInfo";
import SignUpPlan from "./SignUpPlan";
import SignUpPayment from "./SignUpPayment";
import SignUpApproval from "./SignUpApproval";

export default function SignUpForm({ refCode }) {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    // Step 1
    username: "",
    email: "",
    contactNumber: "",
    referralCode: refCode || " ",
    password: "",
    confirmPassword: "",
    // Step 2
    firstName: "",
    middleName: "",
    lastName: "",
    dob: "",
    city: "",
    barangay: "",
    streetAddress: "",
    postalCode: "",
    // Step 3
    planId: null,
    // Step 4
    paymentMethod: "",
    paymentProof: null,
    paymentUrl: "",
    // Step 5
    status: "pending"
  });

  return (
    <>
      {step === 1 && (
        <SignUpInfo
          formData={formData}
          setFormData={setFormData}
          nextStep={() => setStep(prev => prev + 1)}
          prevStep={() => setStep(prev => prev - 1)}
          refCode={refCode}
        />
      )}
      {step === 2 && (
        <SignUpBackgroundInfo
          formData={formData}
          setFormData={setFormData}
          nextStep={() => setStep(prev => prev + 1)}
          prevStep={() => setStep(prev => prev - 1)}
        />
      )}
      {step === 3 && (
        <SignUpPlan
          formData={formData}
          setFormData={setFormData}
          nextStep={() => setStep(prev => prev + 1)}
          prevStep={() => setStep(prev => prev - 1)}
        />
      )}
      {step === 4 && (
        <SignUpPayment
          formData={formData}
          setFormData={setFormData}
          nextStep={() => setStep(prev => prev + 1)}
          prevStep={() => setStep(prev => prev - 1)}
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