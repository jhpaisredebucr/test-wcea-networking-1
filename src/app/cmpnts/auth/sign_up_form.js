"use client"
import { useState } from "react";
import SignUpInfo from "./sign_up_info";
import SignUpBackgroundInfo from "./sign_up_background_info";
import SignUpPlan from "./sign_up_plan";
import SignUpPayment from "./sign_up_payment";
import SignUpApproval from "./sign_up_approval";

export default function SignUpForm({ refCode }) {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    // Step 1
    username: "",
    email: "",
    contactNumber: "",
    referralCode: refCode,
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
    plan: null,
    // Step 4
    paymentMethod: "",
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